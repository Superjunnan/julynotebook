import test from "node:test";
import assert from "node:assert/strict";

import { normalizeDailySummary } from "../../tools/digest.mjs";

test("normalizeDailySummary keeps core papers pure and removes rumor module", () => {
  const materials = [
    {
      refId: 1,
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      title: "Major model launch",
      text: "A major model launch with enterprise impact.",
      link: "https://techcrunch.com/a",
      trustTier: "high",
      score: 18,
      bucketHint: "hot_news",
      pubDate: "2026-03-06T08:00:00.000Z",
    },
    {
      refId: 2,
      source: "arXiv cs.AI",
      sourceGroup: "paper",
      title: "New retrieval paper",
      text: "Paper contribution and evaluation setup.",
      link: "https://arxiv.org/abs/2603.12345",
      trustTier: "high",
      score: 14,
      bucketHint: "core_tech",
      pubDate: "2026-03-06T07:30:00.000Z",
    },
    {
      refId: 3,
      source: "Hugging Face Posts",
      sourceGroup: "community",
      title: "Personal post about early model behavior",
      text: "Forum-like personal post.",
      link: "https://huggingface.co/posts/u/123",
      trustTier: "medium",
      score: 9,
      bucketHint: "ai_rumor",
      pubDate: "2026-03-06T07:00:00.000Z",
    },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          insight: "模型发布进入新阶段",
          narrative: "模型升级带来部署效率提升。",
          refs: [1],
          mention_count: 1,
          cross_verify_score: 70,
        },
      ],
      other_news: [],
      core_tech: [
        {
          title: "Paper mixed with non-paper ref",
          summary: "Should only keep paper refs.",
          refs: [1, 2],
        },
      ],
      ai_rumor: [],
      ref_translations: [],
    },
    materials
  );

  assert.equal(daily.hotNews.length >= 1, true);
  assert.equal(daily.hotNews.length + daily.otherNews.length <= 10, true);
  assert.deepEqual(daily.coreTech[0].refs, [2]);
  assert.equal(Array.isArray(daily.aiRumor), true);
  assert.equal(daily.aiRumor.length, 0);
});
