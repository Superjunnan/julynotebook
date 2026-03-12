import test from "node:test";
import assert from "node:assert/strict";

import { applyClusterEnrichmentToCard } from "../../tools/digest.mjs";

test("applyClusterEnrichmentToCard backfills pub_date snippet and score from detail extraction", () => {
  const card = {
    candidate_id: 209,
    title: "腾讯全系“龙虾”产品矩阵发布",
    snippet: "",
    cluster_text: "腾讯全系“龙虾”产品矩阵发布",
    source: "AIBase",
    source_group: "domestic_media",
    trust_tier: "medium",
    bucket_hint: "",
    pub_date: "",
    domain: "news.aibase.com",
    score: 10,
    link: "https://news.aibase.com/zh/news/26088",
    _item: {
      title: "腾讯全系“龙虾”产品矩阵发布",
      contentSnippet: "",
      pubDate: null,
      trustTier: "medium",
      weight: 7,
      sourceGroup: "domestic_media",
      link: "https://news.aibase.com/zh/news/26088",
    },
  };

  applyClusterEnrichmentToCard(
    card,
    {
      lead: "腾讯发布龙虾特工队产品矩阵，WorkBuddy 与 QClaw 等产品面向个人和企业提供具备记忆与执行能力的自动化行动特工。",
      pubDate: "2026-03-10",
    },
    []
  );

  assert.equal(card.pub_date, "2026-03-10");
  assert.match(card.snippet, /腾讯发布龙虾特工队产品矩阵/);
  assert.match(card.cluster_text, /自动化行动特工/);
  assert.equal(card._item.pubDate, "2026-03-10");
  assert.match(card._item.contentSnippet, /WorkBuddy 与 QClaw/);
  assert.ok(card.score > 10);
});
