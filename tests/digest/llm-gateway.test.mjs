import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

import {
  buildTopicScorecard,
  buildLlmCacheKey,
  requestDigestLlmJson,
} from "../../tools/digest.mjs";

test("buildLlmCacheKey stays stable for equivalent request payloads", () => {
  const a = buildLlmCacheKey({
    operation: "shortlist_topics",
    model: "glm-4.7-flash",
    messages: [
      { role: "system", content: "只输出 JSON" },
      { content: "{\"topic\":1}", role: "user" },
    ],
  });

  const b = buildLlmCacheKey({
    model: "glm-4.7-flash",
    operation: "shortlist_topics",
    messages: [
      { content: "只输出 JSON", role: "system" },
      { role: "user", content: "{\"topic\":1}" },
    ],
  });

  assert.equal(a, b);
});

test("requestDigestLlmJson returns cached content without invoking executor", async () => {
  const cache = {
    llm: {
      cached_key: {
        operation: "topic_merge",
        model: "glm-4.7-flash",
        content: "{\"mapping\":[]}",
        at: "2026-03-11",
      },
    },
  };

  let called = 0;
  const result = await requestDigestLlmJson({
    cache,
    operation: "topic_merge",
    model: "glm-4.7-flash",
    messages: [{ role: "user", content: "hello" }],
    cacheKey: "cached_key",
    execute: async () => {
      called += 1;
      return "{\"mapping\":[1]}";
    },
  });

  assert.equal(result.content, "{\"mapping\":[]}");
  assert.equal(result.meta.cached, true);
  assert.equal(called, 0);
});

test("requestDigestLlmJson stores live responses into cache", async () => {
  const cache = { llm: {} };

  const result = await requestDigestLlmJson({
    cache,
    operation: "daily_summary",
    model: "glm-4.7-flash",
    messages: [{ role: "user", content: "hello" }],
    execute: async () => "{\"day_overview\":\"ok\"}",
  });

  assert.equal(result.content, "{\"day_overview\":\"ok\"}");
  assert.equal(result.meta.cached, false);
  assert.equal(typeof result.meta.cacheKey, "string");
  assert.equal(cache.llm[result.meta.cacheKey].content, "{\"day_overview\":\"ok\"}");
});

test("requestDigestLlmJson persists successful live responses via cache hook", async () => {
  const cache = { llm: {} };
  let persistCalls = 0;
  Object.defineProperty(cache, "__persistDigestCache", {
    value: () => {
      persistCalls += 1;
    },
    enumerable: false,
  });

  await requestDigestLlmJson({
    cache,
    operation: "cluster_chunk",
    model: "glm-4.7-flash",
    messages: [{ role: "user", content: "cluster" }],
    execute: async () => "{\"assignments\":[]}",
  });

  assert.equal(persistCalls, 1);
});

test("requestDigestLlmJson retries transient failures and eventually succeeds", async () => {
  const cache = { llm: {} };
  let attempts = 0;

  const result = await requestDigestLlmJson({
    cache,
    operation: "ref_translation",
    model: "glm-4.7-flash",
    messages: [{ role: "user", content: "translate" }],
    retryOptions: {
      sleepFn: async () => {},
      minIntervalMs: 1,
      maxWaitMs: 1,
    },
    execute: async () => {
      attempts += 1;
      if (attempts === 1) {
        const error = new Error("智谱接口请求失败：HTTP 503 Service Unavailable");
        throw error;
      }
      return "{\"items\":[]}";
    },
  });

  assert.equal(result.content, "{\"items\":[]}");
  assert.equal(attempts, 2);
});

test("llm queue waits for previous response to finish before starting next request when concurrency is 1", () => {
  const script = `
    process.env.ZHIPU_API_KEY = 'dummy-key';
    process.env.DIGEST_LLM_MAX_CONCURRENCY = '1';
    process.env.DIGEST_LLM_MIN_INTERVAL_MS = '50';
    process.env.DIGEST_LLM_INTERVAL_JITTER_MS = '1';

    const starts = [];
    const ends = [];

    globalThis.fetch = async () => {
      starts.push(Date.now());
      await new Promise((resolve) => setTimeout(resolve, 25));
      ends.push(Date.now());
      return {
        ok: true,
        async json() {
          return {
            choices: [
              {
                message: { content: '{"items":[]}' },
                finish_reason: 'stop'
              }
            ]
          };
        }
      };
    };

    const { requestDigestLlmJson } = await import('./tools/digest.mjs');

    await Promise.all([
      requestDigestLlmJson({
        operation: 'first',
        model: 'glm-4.7-flash',
        messages: [{ role: 'user', content: 'first' }],
        forceRefresh: true,
      }),
      requestDigestLlmJson({
        operation: 'second',
        model: 'glm-4.7-flash',
        messages: [{ role: 'user', content: 'second' }],
        forceRefresh: true,
      }),
    ]);

    process.stdout.write(JSON.stringify({ starts, ends }));
  `;

  const result = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
    cwd: process.cwd(),
    encoding: "utf-8",
  });

  assert.equal(result.status, 0, result.stderr);
  const timing = JSON.parse(result.stdout);
  assert.equal(timing.starts.length, 2);
  assert.equal(timing.ends.length, 2);
  assert.ok(
    timing.starts[1] >= timing.ends[0] + 40,
    `expected second request to start after first response plus interval, got starts=${JSON.stringify(timing.starts)} ends=${JSON.stringify(timing.ends)}`
  );
});

test("llm queue serializes requests across parallel node processes when concurrency is 1", async () => {
  const statePath = path.join(process.cwd(), "data", "llm-pacing-state.json");
  const lockPath = path.join(process.cwd(), "data", ".llm-pacing.lock");
  fs.rmSync(statePath, { force: true });
  fs.rmSync(lockPath, { recursive: true, force: true });

  const script = `
    import process from 'node:process';
    process.env.ZHIPU_API_KEY = 'dummy-key';
    process.env.DIGEST_LLM_MAX_CONCURRENCY = '1';
    process.env.DIGEST_LLM_MIN_INTERVAL_MS = '80';
    process.env.DIGEST_LLM_INTERVAL_JITTER_MS = '1';
    globalThis.fetch = async () => {
      const start = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 60));
      const end = Date.now();
      process.stdout.write(JSON.stringify({ start, end }));
      return {
        ok: true,
        async json() {
          return {
            choices: [{ message: { content: '{"items":[]}' }, finish_reason: 'stop' }]
          };
        }
      };
    };
    const { requestDigestLlmJson } = await import('./tools/digest.mjs');
    await requestDigestLlmJson({
      operation: 'cross_process_test',
      model: 'glm-4.7-flash',
      messages: [{ role: 'user', content: 'cross-process' }],
      forceRefresh: true,
    });
  `;

  const runChild = () =>
    new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ["--input-type=module", "-e", script], {
        cwd: process.cwd(),
        encoding: "utf-8",
      });
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (chunk) => {
        stdout += String(chunk);
      });
      child.stderr.on("data", (chunk) => {
        stderr += String(chunk);
      });
      child.on("error", reject);
      child.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(stderr || `child exited with code ${code}`));
          return;
        }
        resolve(JSON.parse(stdout));
      });
    });

  try {
    const [first, second] = await Promise.all([runChild(), runChild()]);
    const [earlier, later] = [first, second].sort((a, b) => a.start - b.start);
    assert.ok(
      later.start >= earlier.end + 60,
      `expected cross-process serialization, got first=${JSON.stringify(earlier)} second=${JSON.stringify(later)}`
    );
  } finally {
    fs.rmSync(statePath, { force: true });
    fs.rmSync(lockPath, { recursive: true, force: true });
  }
});

test("buildTopicScorecard returns explainable component scores", () => {
  const scorecard = buildTopicScorecard({
    topic_type: "news",
    topic_title: "OpenAI 发布新的推理模型与 API 平台",
    sample_titles: ["OpenAI launches new reasoning model and API platform"],
    mention_count: 2,
    source_diversity: 2,
    cross_source_score: 74,
    avg_candidate_score: 18,
    newest_pub_date: "2026-03-23T08:00:00.000Z",
    top_source_groups: ["company_view", "foreign_media"],
    top_sources: ["OpenAI News", "TechCrunch AI"],
  });

  assert.equal(typeof scorecard.total, "number");
  assert.equal(scorecard.entity_priority > 0, true);
  assert.equal(scorecard.industry_value > 0, true);
  assert.equal(scorecard.recency >= 0, true);
  assert.equal(Array.isArray(scorecard.signals), true);
});
