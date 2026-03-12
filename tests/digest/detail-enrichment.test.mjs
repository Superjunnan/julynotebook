import test from "node:test";
import assert from "node:assert/strict";

import { enrichCandidatesBeforeScoring } from "../../tools/digest.mjs";

test("enrichCandidatesBeforeScoring backfills page_scrape candidates from cached detail pages", async () => {
  const candidates = [
    {
      title: "腾讯全系“龙虾”产品矩阵发布",
      link: "https://news.aibase.com/zh/news/26088",
      pubDate: null,
      contentSnippet: "",
      weight: 7,
      trustTier: "medium",
      sourceGroup: "domestic_media",
      ingestionMode: "page_scrape",
      source: "AIBase",
      score: 10,
    },
  ];

  const cache = {
    fetched: {
      "https://news.aibase.com/zh/news/26088": {
        title: "腾讯全系“龙虾”产品矩阵发布",
        text: "腾讯发布龙虾特工队产品矩阵，WorkBuddy 与 QClaw 等产品面向个人和企业提供具备记忆与执行能力的自动化行动特工。",
        pubDate: "2026-03-10",
        at: "2026-03-11",
      },
    },
  };

  const result = await enrichCandidatesBeforeScoring(candidates, cache, { boostKeywords: [] });

  assert.equal(result.candidates[0].pubDate, "2026-03-10");
  assert.match(result.candidates[0].contentSnippet, /腾讯发布龙虾特工队产品矩阵/);
  assert.ok(result.candidates[0].score > 10);
  assert.equal(result.stats.cache_hits, 1);
  assert.equal(result.stats.updated_pub_dates, 1);
  assert.equal(result.stats.updated_snippets, 1);
});
