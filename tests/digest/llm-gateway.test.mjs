import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";

import {
  buildLlmPacingLogLine,
  buildTopicScorecard,
  buildLlmCacheKey,
  computeLlmRetryDelayMs,
  requestDigestLlmJson,
  requestClusterAssignmentsChunkWithAdaptiveSplit,
  mergeTopicRowsWithLLMAdaptiveSplit,
  resolveLlmExecutionConfig,
  resolveLlmPacingConfig,
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

test("resolveLlmPacingConfig keeps free-tier calls serialized and enforces a conservative minimum interval", () => {
  const config = resolveLlmPacingConfig({
    DIGEST_LLM_MAX_CONCURRENCY: "2",
    DIGEST_LLM_MIN_INTERVAL_MS: "20000",
    DIGEST_LLM_INTERVAL_JITTER_MS: "600",
  });

  assert.equal(config.maxConcurrency, 1);
  assert.equal(config.minIntervalMs, 35000);
  assert.equal(config.intervalJitterMs, 600);
});

test("resolveLlmExecutionConfig prefers longer timeouts and fewer internal retries by default", () => {
  const defaults = resolveLlmExecutionConfig({});
  assert.equal(defaults.timeoutMs, 240000);
  assert.equal(defaults.maxRetries, 3);

  const custom = resolveLlmExecutionConfig({
    DIGEST_TIMEOUT_ZHIPU_MS: "300000",
    DIGEST_LLM_MAX_RETRIES: "2",
  });
  assert.equal(custom.timeoutMs, 300000);
  assert.equal(custom.maxRetries, 2);
});

test("computeLlmRetryDelayMs gives timeout aborts a materially longer cooldown than the base interval", () => {
  const timeoutError = new Error("This operation was aborted");
  timeoutError.name = "AbortError";

  const timeoutWait = computeLlmRetryDelayMs(timeoutError, {
    attempt: 1,
    minIntervalMs: 35000,
    maxWaitMs: 300000,
    timeoutMs: 240000,
  });
  const rateLimitWait = computeLlmRetryDelayMs(
    new Error("智谱接口请求失败：HTTP 429 Too Many Requests"),
    {
      attempt: 1,
      minIntervalMs: 35000,
      maxWaitMs: 300000,
      timeoutMs: 240000,
    }
  );

  assert.ok(timeoutWait >= 120000, `expected timeout wait >= 120000ms, got ${timeoutWait}`);
  assert.ok(timeoutWait > rateLimitWait, `expected timeout wait > rate-limit wait, got timeout=${timeoutWait} rate=${rateLimitWait}`);
});

test("requestClusterAssignmentsChunkWithAdaptiveSplit splits only the failed oversized chunk and preserves assignments", async () => {
  const chunk = Array.from({ length: 8 }, (_, idx) => ({
    candidate_id: idx + 1,
    title: `Candidate ${idx + 1}`,
    cluster_text: `Candidate ${idx + 1} cluster text`,
    snippet: `Candidate ${idx + 1} snippet`,
    source: "Test Source",
    source_group: "media",
    bucket_hint: "news",
    trust_tier: 2,
    pub_date: `2026-03-${String(idx + 1).padStart(2, "0")}`,
    domain: "example.com",
  }));

  const callSizes = [];
  const executeChunk = async (currentChunk) => {
    callSizes.push(currentChunk.map((item) => item.candidate_id));
    if (currentChunk.length > 4) {
      const error = new Error("This operation was aborted");
      error.name = "AbortError";
      throw error;
    }
    return currentChunk.map((item) => ({
      candidate_id: item.candidate_id,
      topic_key: `topic-${item.candidate_id}`,
      topic_title: `Topic ${item.candidate_id}`,
      topic_type: "news",
      confidence: 0.92,
    }));
  };

  const assignments = await requestClusterAssignmentsChunkWithAdaptiveSplit(chunk, {
    executeChunk,
    minChunkSize: 2,
    maxDepth: 3,
  });

  assert.deepEqual(
    callSizes,
    [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]
  );
  assert.deepEqual(
    assignments.map((item) => item.candidate_id),
    [1, 2, 3, 4, 5, 6, 7, 8]
  );
  assert.ok(assignments.every((item) => item.topic_key.startsWith("topic-")));
});

test("requestClusterAssignmentsChunkWithAdaptiveSplit can split an odd-sized chunk once it exceeds the adaptive threshold", async () => {
  const chunk = Array.from({ length: 17 }, (_, idx) => ({
    candidate_id: idx + 1,
    title: `Candidate ${idx + 1}`,
    cluster_text: `Candidate ${idx + 1} cluster text`,
    snippet: `Candidate ${idx + 1} snippet`,
    source: "Test Source",
    source_group: "media",
    bucket_hint: "news",
    trust_tier: 2,
    pub_date: `2026-03-${String((idx % 9) + 1).padStart(2, "0")}`,
    domain: "example.com",
  }));

  const callSizes = [];
  const executeChunk = async (currentChunk) => {
    callSizes.push(currentChunk.map((item) => item.candidate_id));
    if (currentChunk.length > 9) {
      const error = new Error("This operation was aborted");
      error.name = "AbortError";
      throw error;
    }
    return currentChunk.map((item) => ({
      candidate_id: item.candidate_id,
      topic_key: `topic-${item.candidate_id}`,
      topic_title: `Topic ${item.candidate_id}`,
      topic_type: "news",
      confidence: 0.88,
    }));
  };

  const assignments = await requestClusterAssignmentsChunkWithAdaptiveSplit(chunk, {
    executeChunk,
    minChunkSize: 10,
    maxDepth: 2,
  });

  assert.deepEqual(
    callSizes,
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16, 17],
    ]
  );
  assert.equal(assignments.length, 17);
});

test("buildLlmPacingLogLine exposes retry cooldown diagnostics for CI debugging", () => {
  const nextAllowedAt = Date.parse("2026-03-31T05:30:00.000Z");
  const line = buildLlmPacingLogLine("retry_cooldown_extended", {
    operation: "cluster_chunk",
    model: "glm-4.7-flash",
    attempt: 2,
    reason: "rate_limit",
    requested_wait_ms: 35000,
    cooldown_ms: 70000,
    failure_streak: 2,
    next_allowed_at: nextAllowedAt,
  });

  assert.match(line, /^\[llm-pacing\] retry_cooldown_extended /);
  assert.match(line, /operation=cluster_chunk/);
  assert.match(line, /model=glm-4\.7-flash/);
  assert.match(line, /attempt=2/);
  assert.match(line, /reason=rate_limit/);
  assert.match(line, /requested_wait_ms=35000/);
  assert.match(line, /cooldown_ms=70000/);
  assert.match(line, /failure_streak=2/);
  assert.match(line, /next_allowed_at=2026-03-31T05:30:00\.000Z/);
});

test("llm queue waits for previous response to finish before starting next request when concurrency is 1", () => {
  const statePath = path.join(process.cwd(), "data", "llm-pacing-state.json");
  const lockPath = path.join(process.cwd(), "data", ".llm-pacing.lock");
  fs.rmSync(statePath, { force: true });
  fs.rmSync(lockPath, { recursive: true, force: true });

  const script = `
    process.env.ZHIPU_API_KEY = 'dummy-key';
    process.env.DIGEST_LLM_DISABLE_SAFE_FLOOR = '1';
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

  try {
    assert.equal(result.status, 0, result.stderr);
    const timing = JSON.parse(result.stdout);
    assert.equal(timing.starts.length, 2);
    assert.equal(timing.ends.length, 2);
    assert.ok(
      timing.starts[1] >= timing.ends[0] + 40,
      `expected second request to start after first response plus interval, got starts=${JSON.stringify(timing.starts)} ends=${JSON.stringify(timing.ends)}`
    );
  } finally {
    fs.rmSync(statePath, { force: true });
    fs.rmSync(lockPath, { recursive: true, force: true });
  }
});

test("llm queue serializes requests across parallel node processes when concurrency is 1", async () => {
  const statePath = path.join(process.cwd(), "data", "llm-pacing-state.json");
  const lockPath = path.join(process.cwd(), "data", ".llm-pacing.lock");
  fs.rmSync(statePath, { force: true });
  fs.rmSync(lockPath, { recursive: true, force: true });

  const script = `
    import process from 'node:process';
    process.env.ZHIPU_API_KEY = 'dummy-key';
    process.env.DIGEST_LLM_DISABLE_SAFE_FLOOR = '1';
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

test("mergeTopicRowsWithLLMAdaptiveSplit splits failed oversized chunk and merges object results", async () => {
  const rows = Array.from({ length: 8 }, (_, i) => ({
    topic_key: `key-${i + 1}`,
    topic_title: `Topic ${i + 1}`,
    topic_type: "news",
    count: 1,
    sample_titles: [],
  }));

  const callSizes = [];
  const executeChunk = async (currentChunk) => {
    callSizes.push(currentChunk.map((r) => r.topic_key));
    if (currentChunk.length > 4) {
      const error = new Error("This operation was aborted");
      error.name = "AbortError";
      throw error;
    }
    const out = {};
    for (const r of currentChunk) {
      out[r.topic_key] = { merged_key: r.topic_key, merged_title: r.topic_title, merged_type: "news" };
    }
    return out;
  };

  const result = await mergeTopicRowsWithLLMAdaptiveSplit(rows, { executeChunk, minChunkSize: 2, maxDepth: 3 });

  assert.deepEqual(callSizes, [
    ["key-1", "key-2", "key-3", "key-4", "key-5", "key-6", "key-7", "key-8"],
    ["key-1", "key-2", "key-3", "key-4"],
    ["key-5", "key-6", "key-7", "key-8"],
  ]);
  assert.equal(Object.keys(result).length, 8);
  for (let i = 1; i <= 8; i++) {
    assert.equal(result[`key-${i}`].merged_key, `key-${i}`);
  }
});

test("mergeTopicRowsWithLLMAdaptiveSplit rethrows when chunk size reaches minChunkSize", async () => {
  const rows = Array.from({ length: 3 }, (_, i) => ({
    topic_key: `k-${i}`,
    topic_title: `T${i}`,
    topic_type: "news",
    count: 1,
    sample_titles: [],
  }));

  const executeChunk = async () => {
    const error = new Error("This operation was aborted");
    error.name = "AbortError";
    throw error;
  };

  await assert.rejects(
    () => mergeTopicRowsWithLLMAdaptiveSplit(rows, { executeChunk, minChunkSize: 3, maxDepth: 5 }),
    (err) => err.name === "AbortError"
  );
});

test("mergeTopicRowsWithLLMAdaptiveSplit rethrows when maxDepth is reached", async () => {
  const rows = Array.from({ length: 20 }, (_, i) => ({
    topic_key: `k-${i}`,
    topic_title: `T${i}`,
    topic_type: "news",
    count: 1,
    sample_titles: [],
  }));

  const executeChunk = async () => {
    const error = new Error("This operation was aborted");
    error.name = "AbortError";
    throw error;
  };

  await assert.rejects(
    () => mergeTopicRowsWithLLMAdaptiveSplit(rows, { executeChunk, minChunkSize: 1, maxDepth: 0 }),
    (err) => err.name === "AbortError"
  );
});

test("withRateLimitRetry honours maxRetries:0 and does not retry on first failure", async () => {
  const cache = { llm: {} };
  let attempts = 0;

  await assert.rejects(
    () => requestDigestLlmJson({
      cache,
      operation: "cluster_assignments_chunk",
      model: "glm-4.7-flash",
      messages: [{ role: "user", content: "test" }],
      retryOptions: {
        sleepFn: async () => { throw new Error("sleep should not be called"); },
        maxRetries: 0,
      },
      execute: async () => {
        attempts += 1;
        throw new Error("智谱接口请求失败：HTTP 503 Service Unavailable");
      },
    }),
    (err) => err.message.includes("503")
  );

  assert.equal(attempts, 1);
});

test("requestClusterAssignmentsChunkWithAdaptiveSplit degrades single offending card to fallback on 1301 content filter", async () => {
  // chunk 含 3 条，id=2 触发 1301，期望 id=2 降级为 fallback，id=1/3 正常返回
  const mockChunk = [
    { candidate_id: 1, title: "Anthropic Claude Managed Agents", cluster_text: "Claude 发布新功能", source: "test", source_group: "foreign_media", bucket_hint: "", trust_tier: "high", pub_date: "2026-04-10", domain: "example.com" },
    { candidate_id: 2, title: "AI干碎成人内容行业", cluster_text: "成人内容平台关停", source: "test", source_group: "domestic_media", bucket_hint: "", trust_tier: "high", pub_date: "2026-04-10", domain: "example.com" },
    { candidate_id: 3, title: "OpenAI GPT-5 发布", cluster_text: "最新模型发布", source: "test", source_group: "foreign_media", bucket_hint: "", trust_tier: "high", pub_date: "2026-04-10", domain: "example.com" },
  ];

  const result = await requestClusterAssignmentsChunkWithAdaptiveSplit(mockChunk, {
    minChunkSize: 1,
    maxDepth: 3,
    executeChunk: async (chunk) => {
      if (chunk.some((c) => c.candidate_id === 2)) {
        const err = new Error(
          '智谱接口请求失败：HTTP 400 Bad Request\n{"contentFilter":[{"level":1,"role":"assistant"}],"error":{"code":"1301","message":"系统检测到输入或生成内容可能包含不安全或敏感内容"}}'
        );
        throw err;
      }
      return chunk.map((c) => ({
        candidate_id: c.candidate_id,
        topic_key: `topic_${c.candidate_id}`,
        topic_title: c.title,
        topic_type: "news",
        confidence: 0.9,
        is_pr: false,
        fallback: false,
      }));
    },
  });

  assert.equal(result.length, 3, "所有条目均应有返回（含降级）");

  const id2 = result.find((r) => r.candidate_id === 2);
  assert.equal(id2?.fallback, true, "id=2 应降级为 fallback");

  const id1 = result.find((r) => r.candidate_id === 1);
  const id3 = result.find((r) => r.candidate_id === 3);
  assert.equal(id1?.fallback, false, "id=1 不应是 fallback");
  assert.equal(id3?.fallback, false, "id=3 不应是 fallback");
});
