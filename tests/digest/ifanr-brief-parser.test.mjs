import test from "node:test";
import assert from "node:assert/strict";

import {
  extractIfanrMorningBriefArticleLinks,
  extractIfanrMorningBriefItems,
} from "../../tools/digest.mjs";

test("extractIfanrMorningBriefArticleLinks finds roundup article urls from ifanr category page", () => {
  const html = `
    <html><body>
      <a href="https://www.ifanr.com/category/ifanrnews">早报</a>
      <a href="https://www.ifanr.com/1659650">早报｜小米汽车收入超千亿元/OpenAI 关停 Sora</a>
      <a href="https://www.ifanr.com/1659467">早报｜iOS 27 将公布 AI 最新进展</a>
      <a href="https://www.ifanr.com/1656500">普通文章｜非早报</a>
    </body></html>
  `;

  const links = extractIfanrMorningBriefArticleLinks(html, "https://www.ifanr.com/category/ifanrnews");

  assert.deepEqual(links, [
    "https://www.ifanr.com/1659650",
    "https://www.ifanr.com/1659467",
  ]);
});

test("extractIfanrMorningBriefItems splits roundup sections and keeps only AI-relevant items", () => {
  const html = `
    <html><body>
      <article>
        <h3>OpenAI 关停 Sora</h3>
        <p>OpenAI 宣布关停 Sora 平台，并调整视频生成能力路线。</p>
        <p>🔗 相关阅读：<a href="https://example.com/openai-sora">原文</a></p>

        <h3>小米 2025 年汽车收入超千亿元</h3>
        <p>小米财报提到汽车收入增长，但本段没有 AI 核心信息。</p>

        <h3>腾讯挖来多位字节 Seed 骨干</h3>
        <p>腾讯加大混元团队投入，继续强化大模型与智能体布局。</p>
      </article>
    </body></html>
  `;

  const items = extractIfanrMorningBriefItems(
    html,
    {
      id: "ifanr-brief",
      name: "爱范儿早报",
      group: "domestic_media",
      bucket_hint: "quick_news",
      trust_tier: "medium",
      weight: 3,
      mode: "auto",
      ingestion_mode: "page_scrape",
    },
    "https://www.ifanr.com/1659650"
  );

  assert.equal(items.length, 2);
  assert.equal(items[0].title, "OpenAI 关停 Sora");
  assert.match(items[0].link, /https:\/\/www\.ifanr\.com\/1659650#__brief-1/);
  assert.match(items[0].contentSnippet, /OpenAI 宣布关停 Sora 平台/);
  assert.equal(items[0].sourceId, "ifanr-brief");
  assert.equal(items[0].sourceGroup, "domestic_media");

  assert.equal(items[1].title, "腾讯挖来多位字节 Seed 骨干");
  assert.match(items[1].contentSnippet, /混元团队投入/);
});
