import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const require = createRequire(import.meta.url);
const formatter = require(path.join(repoRoot, "scripts/daily-detail-formatter.js"));

test("日报详情格式化应修正模型名中的异常英文空格", () => {
  assert.equal(
    formatter.规范英文空格("Gemma-4-E2 B Brain Atlas"),
    "Gemma-4-E2B Brain Atlas"
  );
  assert.equal(
    formatter.清理正文HTML("<p>发布 Gemma-4-E2 B Brain Atlas，用于脑图谱分析。</p>"),
    "<p>发布 Gemma-4-E2B Brain Atlas，用于脑图谱分析。</p>"
  );
});
