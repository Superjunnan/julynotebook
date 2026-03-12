import test from "node:test";
import assert from "node:assert/strict";

import {
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
