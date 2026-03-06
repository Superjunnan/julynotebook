import test from "node:test";
import assert from "node:assert/strict";

import { normalizeDailySummary } from "../../tools/digest.mjs";

function domain(url) {
  return new URL(url).hostname.replace(/^www\./, "");
}

test("normalizeDailySummary backfills hot news refs to multi-source evidence when possible", () => {
  const materials = [
    {
      refId: 1,
      source: "TechCrunch AI",
      title: "OpenAI launches GPT-5.4 with thinking variants",
      text: "OpenAI released GPT-5.4 with pro and thinking variants for enterprise users.",
      link: "https://techcrunch.com/2026/03/05/openai-gpt-5-4-launch/",
      trustTier: "high",
      score: 12,
      pubDate: "2026-03-05T10:00:00.000Z",
      bucketHint: "hot_news",
    },
    {
      refId: 2,
      source: "The Verge AI",
      title: "OpenAI says GPT-5.4 improves reasoning and controllability",
      text: "The new GPT-5.4 model improves reasoning consistency and benchmark performance.",
      link: "https://www.theverge.com/2026/03/05/openai-gpt-5-4-reasoning",
      trustTier: "high",
      score: 11,
      pubDate: "2026-03-05T09:30:00.000Z",
      bucketHint: "hot_news",
    },
    {
      refId: 3,
      source: "arXiv cs.AI",
      title: "A separate paper on multimodal retrieval",
      text: "Unrelated research topic to avoid accidental merge.",
      link: "https://arxiv.org/abs/2603.09999",
      trustTier: "high",
      score: 8,
      pubDate: "2026-03-05T08:00:00.000Z",
      bucketHint: "core_tech",
    },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          insight: "OpenAI发布GPT-5.4",
          briefing: "模型能力继续提升，企业侧应用范围扩大。",
          evaluation: "需要持续观察实际成本与稳定性。",
          refs: [1],
        },
      ],
      core_tech: [],
      ai_rumor: [],
      ref_translations: [],
    },
    materials
  );

  assert.equal(daily.hotNews.length >= 1, true);
  const hasMultiSource = daily.hotNews.some((entry) => {
    const refs = entry.refs || [];
    if (refs.length < 2) return false;
    const domains = new Set(refs.map((id) => domain(materials.find((m) => m.refId === id)?.link)));
    return domains.size >= 2;
  });
  assert.equal(hasMultiSource, true);
});
