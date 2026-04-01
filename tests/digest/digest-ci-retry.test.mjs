import test from "node:test";
import assert from "node:assert/strict";

import {
  buildDigestAttemptLogLine,
  computeDigestRetryDelayMs,
  shouldRetryDigestRunOutput,
} from "../../tools/run-digest-with-retry.mjs";

test("shouldRetryDigestRunOutput retries transient digest failures", () => {
  assert.equal(shouldRetryDigestRunOutput("❌ digest 生成失败：HTTP 429 Too Many Requests"), true);
  assert.equal(shouldRetryDigestRunOutput("智谱接口请求失败：HTTP 503 Service Unavailable"), true);
  assert.equal(shouldRetryDigestRunOutput("fetch failed: UND_ERR_CONNECT_TIMEOUT"), true);
  assert.equal(shouldRetryDigestRunOutput("AbortError: This operation was aborted"), true);
});

test("shouldRetryDigestRunOutput refuses fatal configuration and script failures", () => {
  assert.equal(shouldRetryDigestRunOutput("缺少环境变量 ZHIPU_API_KEY"), false);
  assert.equal(shouldRetryDigestRunOutput("SyntaxError: Unexpected token '}'"), false);
  assert.equal(shouldRetryDigestRunOutput("Unsafe deletion detected under source/_posts"), false);
});

test("computeDigestRetryDelayMs uses bounded backoff", () => {
  assert.equal(computeDigestRetryDelayMs(1, { baseDelayMs: 20_000, maxDelayMs: 90_000 }), 20_000);
  assert.equal(computeDigestRetryDelayMs(2, { baseDelayMs: 20_000, maxDelayMs: 90_000 }), 40_000);
  assert.equal(computeDigestRetryDelayMs(4, { baseDelayMs: 20_000, maxDelayMs: 90_000 }), 90_000);
});

test("buildDigestAttemptLogLine prints attempt context for CI investigation", () => {
  const line = buildDigestAttemptLogLine({
    attempt: 2,
    maxAttempts: 3,
    profile: "morning",
    date: "2026-03-31",
    model: "glm-4.7-flash",
    baseDelayMs: 60_000,
    maxDelayMs: 240_000,
  });

  assert.match(line, /^\[ci-retry\] digest attempt /);
  assert.match(line, /attempt=2\/3/);
  assert.match(line, /profile=morning/);
  assert.match(line, /date=2026-03-31/);
  assert.match(line, /model=glm-4\.7-flash/);
  assert.match(line, /base_delay_ms=60000/);
  assert.match(line, /max_delay_ms=240000/);
});
