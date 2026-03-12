import test from "node:test";
import assert from "node:assert/strict";

import {
  extractPublishedDateFromHtml,
  inferPubDateFromUrlAndTitle,
} from "../../tools/digest.mjs";

test("inferPubDateFromUrlAndTitle parses Chinese dates that use 号 instead of 日", () => {
  const iso = inferPubDateFromUrlAndTitle("发布时间 :2026年3月10号 15:40", "");
  assert.equal(iso, "2026-03-10");
});

test("extractPublishedDateFromHtml can recover publish date from raw HTML payloads", () => {
  const html = `
    <html>
      <head>
        <script type="application/json">
          {"createTime":"2026-03-10 15:40:09","title":"腾讯全系龙虾产品矩阵发布"}
        </script>
      </head>
      <body>
        <article>
          <h1>腾讯全系龙虾产品矩阵发布</h1>
          <p>正文首段。</p>
        </article>
      </body>
    </html>
  `;

  const iso = extractPublishedDateFromHtml(
    html,
    "https://news.aibase.com/zh/news/26088",
    "腾讯全系龙虾产品矩阵发布"
  );

  assert.equal(iso, "2026-03-10");
});
