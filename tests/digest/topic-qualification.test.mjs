import test from "node:test";
import assert from "node:assert/strict";

import { normalizeDailySummary } from "../../tools/digest.mjs";

test("normalizeDailySummary keeps multi-source narratives first and can backfill high-value single-source items to meet hot minimum", () => {
  const materials = [
    {
      refId: 1,
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      title: "OpenAI and Anthropic race to ship enterprise agent controls",
      text: "Enterprise buyers are asking for more observability, auditing and control layers.",
      link: "https://techcrunch.com/2026/03/10/enterprise-agent-controls",
      trustTier: "high",
      score: 19,
      bucketHint: "hot_news",
      pubDate: "2026-03-10T08:00:00.000Z",
    },
    {
      refId: 2,
      source: "The Verge AI",
      sourceGroup: "foreign_media",
      title: "Anthropic updates enterprise rollout policy for agents",
      text: "The Verge confirms enterprise deployment guardrails are becoming central to model sales.",
      link: "https://www.theverge.com/2026/03/10/anthropic-enterprise-agents",
      trustTier: "high",
      score: 18,
      bucketHint: "hot_news",
      pubDate: "2026-03-10T08:20:00.000Z",
    },
    {
      refId: 3,
      source: "OpenAI News",
      sourceGroup: "company",
      title: "Official update on enterprise agent controls",
      text: "OpenAI details auditing primitives, access scopes and rollout boundaries.",
      link: "https://openai.com/news/enterprise-agent-controls",
      trustTier: "high",
      score: 17,
      bucketHint: "hot_news",
      pubDate: "2026-03-10T08:40:00.000Z",
    },
    {
      refId: 4,
      source: "The Verge AI",
      sourceGroup: "foreign_media",
      title: "AI job scam targets candidates through automated interviews",
      text: "A job seeker was funneled into a suspicious AI interview workflow tied to an external service.",
      link: "https://www.theverge.com/2026/03/10/ai-job-scam",
      trustTier: "high",
      score: 17,
      bucketHint: "hot_news",
      pubDate: "2026-03-10T07:00:00.000Z",
    },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          topic_id: 101,
          insight: "企业级代理治理进入产品主战场",
          narrative: "多家来源共同显示，模型厂商开始把可审计、可控和权限治理作为企业代理产品的默认能力。",
          refs: [1, 2, 3],
          mention_count: 3,
          cross_verify_score: 88,
        },
        {
          topic_id: 102,
          insight: "AI 面试流程开始被用于招聘诈骗",
          narrative: "单篇报道揭示自动化面试环节可能成为求职诈骗的新入口。",
          refs: [4],
          mention_count: 1,
          cross_verify_score: 69,
        },
      ],
      other_news: [],
      core_tech: [],
      ai_rumor: [],
      ref_translations: [],
    },
    materials
  );

  assert.deepEqual(daily.hotNews.map((item) => item.refs), [[1, 2, 3], [4]]);
  assert.equal(daily.otherNews.some((item) => (item.refs || []).includes(4)), false);
});

test("normalizeDailySummary allows a high-value single-source community item in quick news but not in hot news", () => {
  const materials = [
    {
      refId: 1,
      source: "Hugging Face Posts",
      sourceGroup: "community",
      title: "Isaacus releases legal-domain reranker for professional search workflows",
      text: "The post introduces a legal reranker optimized for retrieval tasks in professional legal research settings.",
      link: "https://huggingface.co/posts/isaacus/123",
      trustTier: "medium",
      score: 17,
      bucketHint: "hot_news",
      pubDate: "2026-03-10T07:30:00.000Z",
    },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          topic_id: 201,
          insight: "法律检索出现专门化重排序模型",
          narrative: "社区作者发布面向法律工作流的重排序模型，显示垂直专业检索工具链继续细分。",
          refs: [1],
          mention_count: 1,
          cross_verify_score: 66,
        },
      ],
      other_news: [],
      core_tech: [],
      ai_rumor: [],
      ref_translations: [],
    },
    materials
  );

  assert.equal(daily.hotNews.some((item) => (item.refs || []).includes(1)), false);
  assert.equal(daily.otherNews.some((item) => (item.refs || []).includes(1)), true);
});

test("normalizeDailySummary uses single-source official fallback in hot news only when no multi-source hot topic exists", () => {
  const materials = [
    {
      refId: 1,
      source: "OpenAI News",
      sourceGroup: "company",
      title: "OpenAI releases new enterprise governance controls",
      text: "The official post introduces governance controls, auditing primitives and staged rollout notes.",
      link: "https://openai.com/news/new-governance-controls",
      trustTier: "high",
      score: 19,
      bucketHint: "hot_news",
      pubDate: "2026-03-10T07:30:00.000Z",
    },
    {
      refId: 2,
      source: "Hugging Face Posts",
      sourceGroup: "community",
      title: "Interesting prompt compression trick",
      text: "A personal post sharing a prompt compression trick.",
      link: "https://huggingface.co/posts/user/456",
      trustTier: "medium",
      score: 8,
      bucketHint: "hot_news",
      pubDate: "2026-03-10T06:30:00.000Z",
    },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          topic_id: 301,
          insight: "OpenAI 推出企业治理控制项",
          narrative: "官方博客披露新的治理控制能力，涉及审计、权限与上线边界。",
          refs: [1],
          mention_count: 1,
          cross_verify_score: 78,
        },
        {
          topic_id: 302,
          insight: "提示词压缩技巧",
          narrative: "社区用户分享压缩提示词的经验。",
          refs: [2],
          mention_count: 1,
          cross_verify_score: 48,
        },
      ],
      other_news: [],
      core_tech: [],
      ai_rumor: [],
      ref_translations: [],
    },
    materials
  );

  assert.equal(daily.hotNews.some((item) => (item.refs || []).includes(1)), true);
  assert.equal(daily.hotNews.some((item) => (item.refs || []).includes(2)), false);
});
