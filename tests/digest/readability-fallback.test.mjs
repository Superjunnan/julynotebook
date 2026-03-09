import test from "node:test";
import assert from "node:assert/strict";

import { extractReadableFromHtml } from "../../tools/digest.mjs";

test("extractReadableFromHtml tolerates cssstyle border shorthand bug and still extracts text", () => {
  const html = `<!doctype html>
<html>
  <head>
    <style>
      .x { border-bottom: var(--border-width, 1px); border-color: rgba(117, 117, 117, 1); }
    </style>
  </head>
  <body>
    <article>
      <h1>OpenAI Policy Update</h1>
      <p>The Department reviewed model usage boundaries and updated safeguards.</p>
      <p>The update clarifies enterprise deployment and compliance expectations.</p>
    </article>
  </body>
</html>`;

  const parsed = extractReadableFromHtml(html, "https://example.com/story");
  assert.match(parsed.title, /OpenAI Policy Update/);
  assert.match(parsed.text, /updated safeguards/i);
  assert.match(parsed.text, /compliance expectations/i);
});

test("extractReadableFromHtml uses aitnt-specific content block and trims noisy suffix", () => {
  const html = `<!doctype html>
<html>
  <head><title>Anthropic失业报告炸场</title></head>
  <body>
    <h1>Anthropic失业报告炸场</h1>
    <div class="new-content">
      <p>程序员约75%的任务已被模型覆盖，客服与数据录入岗位紧随其后。</p>
      <p>报告指出，真实覆盖率仍低于理论上限，未来十年冲击将持续扩大。</p>
      <p>AITNT资源拓展 根据文章内容，系统为您匹配了更多资源信息。</p>
    </div>
  </body>
</html>`;

  const parsed = extractReadableFromHtml(html, "https://aitntnews.com/newDetail.html?newId=22861");
  assert.match(parsed.title, /Anthropic失业报告炸场/);
  assert.match(parsed.text, /75%的任务已被模型覆盖/);
  assert.match(parsed.text, /未来十年冲击将持续扩大/);
  assert.doesNotMatch(parsed.text, /AITNT资源拓展/);
});
