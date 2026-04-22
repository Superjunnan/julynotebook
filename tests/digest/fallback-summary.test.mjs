import test from "node:test";
import assert from "node:assert/strict";

import { normalizeDailySummary } from "../../tools/digest.mjs";

test("normalizeDailySummary can backfill hot news to at least three entries", () => {
  const materials = [
    { refId: 1, title: "OpenAI ships Operator API", source: "TechCrunch AI", bucketHint: "hot_news" },
    { refId: 2, title: "Anthropic expands Claude enterprise agent access", source: "The Verge AI", bucketHint: "hot_news" },
    { refId: 3, title: "Google Gemini adds coding workflow support", source: "Google AI Blog", bucketHint: "hot_news" },
    { refId: 4, title: "Sparse reasoning paper", source: "arXiv cs.AI", bucketHint: "core_tech", sourceGroup: "paper" },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          topic_id: 1,
          insight: "OpenAI 更新 Operator API",
          narrative: "OpenAI 面向企业扩展了 Operator API。",
          refs: [1],
          mention_count: 1,
          cross_verify_score: 60,
        },
      ],
      other_news: [
        {
          topic_id: 2,
          insight: "Anthropic 扩展企业 Agent 访问",
          narrative: "Anthropic 更新了 Claude 企业 Agent 访问能力。",
          refs: [2],
          mention_count: 1,
          cross_verify_score: 68,
        },
        {
          topic_id: 3,
          insight: "Google Gemini 强化代码工作流",
          narrative: "Google 为 Gemini 加强了 coding workflow 支持。",
          refs: [3],
          mention_count: 1,
          cross_verify_score: 66,
        },
      ],
      core_tech: [
        {
          topic_id: 4,
          title: "Sparse reasoning paper",
          summary: "paper",
          refs: [4],
        },
      ],
    },
    materials
  );

  assert.equal(daily.hotNews.length >= 3, true);
  assert.equal(daily.hotNews.some((item) => (item.refs || [])[0] === 2), true);
  assert.equal(daily.hotNews.some((item) => (item.refs || [])[0] === 3), true);
});

test("normalizeDailySummary should replace generic hot news placeholders with translated reference titles", () => {
  const daily = normalizeDailySummary(
    {
      hot_news: [
        {
          topic_id: 1,
          insight: "海外科技媒体动态 3",
          narrative: "Google adds AI Skills to Chrome to help you save favorite workflows.",
          refs: [1, 2],
          mention_count: 2,
          cross_verify_score: 78,
        },
      ],
      other_news: [],
      core_tech: [],
      ref_translations: [
        {
          id: 1,
          zh_title: "谷歌在Chrome中添加AI技能以帮助保存常用工作流",
        },
      ],
    },
    [
      {
        refId: 1,
        title: "Google adds AI Skills to Chrome to help you save favorite workflows",
        source: "TechCrunch AI",
        link: "https://example.com/1",
        bucketHint: "hot_news",
      },
      {
        refId: 2,
        title: "Chrome now lets you turn AI prompts into reusable skills",
        source: "The Verge AI",
        link: "https://example.com/2",
        bucketHint: "hot_news",
      },
      {
        refId: 3,
        title: "Anthropic expands Claude enterprise agent access",
        source: "Anthropic News",
        link: "https://example.com/3",
        bucketHint: "hot_news",
      },
      {
        refId: 4,
        title: "Google Gemini adds coding workflow support",
        source: "Google AI Blog",
        link: "https://example.com/4",
        bucketHint: "hot_news",
      },
    ]
  );

  assert.equal(daily.hotNews[0]?.insight, "谷歌在Chrome中添加AI技能以帮助保存常用工作流");
});

test("normalizeDailySummary does not backfill low-value community entries into hot news", () => {
  const materials = [
    {
      refId: 1,
      title: "社区用户讨论 Claude 好不好用",
      source: "Hacker News AI",
      sourceGroup: "community",
      bucketHint: "hot_news",
      trustTier: "low",
      domain: "news.ycombinator.com",
      text: "用户在社区里讨论体验，没有新增事实。",
    },
    {
      refId: 2,
      title: "OpenAI 发布企业级推理平台",
      source: "OpenAI News",
      sourceGroup: "company_view",
      trustTier: "high",
      domain: "openai.com",
      text: "官方发布企业级推理平台。",
      bucketHint: "core_tech",
    },
    {
      refId: 3,
      title: "Anthropic 发布新版 Claude 企业能力",
      source: "Anthropic News",
      sourceGroup: "company_view",
      trustTier: "high",
      domain: "anthropic.com",
      text: "官方发布新版 Claude 企业能力。",
      bucketHint: "hot_news",
    },
    {
      refId: 4,
      title: "Google Gemini 更新开发者平台",
      source: "Google AI Blog",
      sourceGroup: "company_view",
      trustTier: "high",
      domain: "blog.google",
      text: "Gemini 开发者平台更新。",
      bucketHint: "hot_news",
    },
  ];

  const daily = normalizeDailySummary(
    {
      hot_news: [],
      other_news: [
        { topic_id: 1, insight: "社区讨论", narrative: "社区讨论", refs: [1], mention_count: 1, cross_verify_score: 40 },
        { topic_id: 2, insight: "OpenAI 发布平台", narrative: "OpenAI 发布平台", refs: [2], mention_count: 1, cross_verify_score: 72 },
        { topic_id: 3, insight: "Anthropic 企业能力", narrative: "Anthropic 企业能力", refs: [3], mention_count: 1, cross_verify_score: 70 },
        { topic_id: 4, insight: "Gemini 平台更新", narrative: "Gemini 平台更新", refs: [4], mention_count: 1, cross_verify_score: 68 },
      ],
      core_tech: [],
    },
    materials
  );

  assert.equal(daily.hotNews.length >= 3, true);
  assert.equal(daily.hotNews.some((item) => (item.refs || [])[0] === 1), false);
});

test("normalizeDailySummary can backfill multi-source hot news when similar domestic topics cluster together", () => {
  const daily = normalizeDailySummary(
    {
      hot_news: [],
      other_news: [
        {
          topic_id: 11,
          insight: "阿里云与 AI 商业化收入目标",
          narrative: "阿里云与 AI 商业化收入目标。",
          refs: [1, 2],
          mention_count: 2,
          cross_verify_score: 82,
        },
        {
          topic_id: 12,
          insight: "字节短剧 Agent 小云雀",
          narrative: "字节发布短剧 Agent 小云雀。",
          refs: [3],
          mention_count: 1,
          cross_verify_score: 66,
        },
      ],
      core_tech: [],
    },
    [
      {
        refId: 1,
        title: "阿里云与AI商业化收入目标剑指千亿美元",
        source: "AIBase",
        sourceGroup: "domestic_media",
        trustTier: "medium",
        link: "https://news.aibase.com/1",
        domain: "aibase.com",
        text: "媒体报道。",
        bucketHint: "hot_news",
        score: 26,
        pubDate: "2026-03-20",
      },
      {
        refId: 2,
        title: "吴泳铭：阿里云与AI商业收入未来五年冲刺千亿美元",
        source: "36Kr AI",
        sourceGroup: "domestic_media",
        trustTier: "medium",
        link: "https://36kr.com/2",
        domain: "36kr.com",
        text: "媒体跟进报道。",
        bucketHint: "hot_news",
        score: 25,
        pubDate: "2026-03-20",
      },
      {
        refId: 3,
        title: "字节发布短剧Agent小云雀，基于Seedance 2.0",
        source: "AITNT 资讯",
        sourceGroup: "domestic_media",
        trustTier: "medium",
        link: "https://aitntnews.com/3",
        domain: "aitntnews.com",
        text: "媒体报道。",
        bucketHint: "hot_news",
        score: 24,
        pubDate: "2026-03-20",
      },
    ]
  );

  assert.equal(daily.hotNews.length >= 1, true);
  assert.equal((daily.hotNews[0].refs || []).length >= 2, true);
  assert.equal((daily.hotNews[0].crossVerifyScore || 0) >= 82, true);
});
