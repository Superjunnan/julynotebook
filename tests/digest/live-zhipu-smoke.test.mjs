import test from "node:test";
import assert from "node:assert/strict";

import { requestDigestLlmJson } from "../../tools/digest.mjs";

const liveEnabled =
  String(process.env.DIGEST_RUN_LIVE_LLM_TESTS || "").trim() === "1" &&
  Boolean(String(process.env.ZHIPU_API_KEY || "").trim());

test(
  "live zhipu smoke returns legal json under strict queue",
  {
    skip: liveEnabled ? false : "set DIGEST_RUN_LIVE_LLM_TESTS=1 and ZHIPU_API_KEY to run live smoke",
  },
  async () => {
    const cache = { llm: {} };
    const model = process.env.ZHIPU_MODEL || "glm-4.7-flash";

    const { content } = await requestDigestLlmJson({
      cache,
      forceRefresh: true,
      operation: "live_zhipu_smoke",
      model,
      messages: [
        {
          role: "system",
          content: "你是严格的 JSON 助手。只输出合法 JSON，不要附加解释。",
        },
        {
          role: "user",
          content: '请返回 {"ok": true, "service": "zhipu", "mode": "digest"}',
        },
      ],
    });

    const parsed = JSON.parse(content);
    assert.equal(parsed.ok, true);
    assert.equal(parsed.service, "zhipu");
    assert.equal(parsed.mode, "digest");
  }
);
