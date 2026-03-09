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

test("normalizeDailySummary rewrites community quick-news template to content narrative", () => {
  const materials = [
    {
      refId: 1,
      source: "Simon Willison",
      sourceGroup: "community",
      title: "Quoting Joseph Weizenbaum",
      text: "What I had not realized is that extremely short exposures to a relatively simple computer program could induce powerful delusional thinking.",
      link: "https://simonwillison.net/2026/Mar/8/joseph-weizenbaum/",
      trustTier: "medium",
      score: 7,
      pubDate: "2026-03-08T06:00:00.000Z",
      bucketHint: "other_news",
    },
    {
      refId: 2,
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      title: "OpenAI expands enterprise controls",
      text: "OpenAI introduced more enterprise control layers and auditing tools.",
      link: "https://techcrunch.com/2026/03/08/openai-enterprise-controls/",
      trustTier: "high",
      score: 11,
      pubDate: "2026-03-08T07:00:00.000Z",
      bucketHint: "hot_news",
    },
    {
      refId: 3,
      source: "The Verge AI",
      sourceGroup: "foreign_media",
      title: "Anthropic releases updated Claude safety policy",
      text: "Anthropic updated policy controls and deployment guidance for Claude.",
      link: "https://www.theverge.com/2026/03/08/anthropic-claude-policy",
      trustTier: "high",
      score: 10,
      pubDate: "2026-03-08T07:30:00.000Z",
      bucketHint: "hot_news",
    },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          insight: "企业级模型治理升级",
          narrative: "企业侧开始把模型审计和可控性治理纳入默认流程。",
          refs: [2, 3],
        },
      ],
      other_news: [
        {
          insight: "社区来源快讯更新",
          narrative: "社区来源发布了“Quoting Joseph Weizenbaum”相关动态，已纳入当日快讯，建议结合原文核对关键细节。",
          refs: [1],
        },
      ],
      core_tech: [],
      ai_rumor: [],
      ref_translations: [
        { id: 1, zh_title: "约瑟夫·魏岑鲍姆关于AI拟人误判的警示摘录" },
      ],
    },
    materials
  );

  const target = (daily.otherNews || []).find((item) => (item.refs || []).includes(1));
  assert.ok(target);
  assert.doesNotMatch(target.insight || "", /社区来源快讯更新/);
  assert.doesNotMatch(target.narrative || "", /已纳入当日快讯|建议结合原文核对关键细节/);
});
