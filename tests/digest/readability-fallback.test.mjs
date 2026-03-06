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
