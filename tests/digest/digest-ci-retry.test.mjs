import test from "node:test";
import assert from "node:assert/strict";

import {
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
