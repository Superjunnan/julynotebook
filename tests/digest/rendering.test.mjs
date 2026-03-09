import test from "node:test";
import assert from "node:assert/strict";

import { buildDigestMarkdown, buildFallbackDailySummary } from "../../tools/digest.mjs";

test("buildDigestMarkdown renders key news, quick news, core papers, and rumors", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-03",
    {
      overview: "模型能力提速和商业化渗透同步发生，行业从性能竞争转向工作流重构。",
      candidateTotal: 123,
      hotNews: [
        {
          insight: "OpenAI发布新模型",
          narrative: "OpenAI发布新模型并同步优化推理与稳定性指标，企业接入门槛继续下降，但规模化场景的可控性与成本边界仍需持续验证。",
          refs: [1, 2],
          mentionCount: 2,
          crossVerifyScore: 81,
        },
      ],
      otherNews: [
        {
          insight: "Cursor发布新代理编程机制",
          narrative: "编程代理流程更稳定，企业侧试点提速。",
          refs: [2],
        },
      ],
      coreTech: [{ title: "New paper", summary: "Technique summary.", refs: [2] }],
      aiRumor: [{ title: "Possible launch signal", summary: "Credible but early.", refs: [3] }],
      refTranslations: {},
    },
    [
      { refId: 1, title: "A", source: "TechCrunch", link: "https://example.com/1" },
      { refId: 2, title: "B", source: "36Kr", link: "https://example.com/2" },
      { refId: 3, title: "C", source: "Karpathy", link: "https://example.com/3" },
    ]
  );

  assert.match(markdown, /## 重点资讯/);
  assert.match(markdown, /## 其他快讯/);
  assert.match(markdown, /## 核心论文/);
  assert.match(markdown, /## 小道消息/);
  assert.match(markdown, /## 参考来源/);
  assert.equal(markdown.indexOf("## 小道消息") < markdown.indexOf("## 核心论文"), true);
  assert.equal(markdown.indexOf("## 核心论文") < markdown.indexOf("## 参考来源"), true);
  assert.match(markdown, /今日候选总数：123 条/);
  assert.match(markdown, /模型能力提速和商业化渗透同步发生/);
  assert.match(markdown, /### 01 · OpenAI发布新模型/);
  assert.match(markdown, /参考：/);
  assert.match(markdown, />1<\/a>/);
  assert.match(markdown, />2<\/a>/);
  assert.doesNotMatch(markdown, /5W1H：|Who\/What：|When\/Where：|Why\/How：/);
  assert.doesNotMatch(markdown, /简报：|研判：|综合来源：/);
  assert.doesNotMatch(markdown, /importance-note|重要性：/);
  assert.doesNotMatch(markdown, /…|\.{3,}/);
});

test("fallback markdown avoids untranslated placeholders and raw English titles", () => {
  const materials = [
    {
      refId: 1,
      title: "Why AI startups are selling the same equity at two different prices",
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      bucketHint: "hot_news",
      trustTier: "high",
      link: "https://example.com/1",
    },
    {
      refId: 2,
      title: "Reasoning as Gradient: Scaling MLE Agents Beyond Tree Search",
      source: "arXiv cs.AI",
      sourceGroup: "paper",
      bucketHint: "core_tech",
      trustTier: "high",
      link: "https://example.com/2",
    },
  ];

  const markdown = buildDigestMarkdown(
    "2026-03-03",
    buildFallbackDailySummary(materials),
    materials
  );

  assert.doesNotMatch(markdown, /等待模型总结|人工复核|标题待翻译/);
  assert.doesNotMatch(markdown, /importance-note|重要性：/);
  assert.match(markdown, /参考：/);
  assert.doesNotMatch(markdown, /简报：|研判：|综合来源：/);
  assert.doesNotMatch(markdown, /5W1H：|Who\/What：|When\/Where：|Why\/How：/);
  assert.match(markdown, />1<\/a>/);
  assert.match(markdown, />2<\/a>/);
  assert.match(markdown, /重点更新｜TechCrunch AI/);
  assert.match(markdown, /论文平台重点更新｜arXiv cs\.AI/);
  assert.doesNotMatch(markdown, /海外科技媒体原文|论文平台原文/);
});

test("references render as Chinese title plus source and truncate long titles", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-03",
    {
      hotNews: [
        {
          insight: "模型治理新进展",
          narrative: "多源信息显示治理框架正在快速收敛。",
          refs: [1],
        },
      ],
      otherNews: [],
      coreTech: [],
      aiRumor: [],
      refTranslations: {
        1: "这是一个非常非常长的中文标题用于验证截断逻辑是否生效",
      },
    },
    [
      {
        refId: 1,
        title: "Long English headline for verification",
        source: "TechCrunch",
        link: "https://example.com/long",
      },
    ]
  );

  assert.match(markdown, /这是一个非常非常长的中文标题用于验证截断…｜TechCrunch/);
  assert.doesNotMatch(markdown, /Long English headline for verification<\/a>/);
});

test("core paper block prefers translated Chinese title over original English title", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-03",
    {
      hotNews: [],
      otherNews: [],
      coreTech: [
        {
          title: "FeatureBench: Benchmarking Agentic Coding for Complex Feature Development",
          summary: "该论文提出了复杂功能交付评测框架。",
          refs: [2],
        },
      ],
      aiRumor: [],
      refTranslations: {
        2: "FeatureBench复杂功能交付评测框架",
      },
    },
    [
      {
        refId: 2,
        title: "FeatureBench: Benchmarking Agentic Coding for Complex Feature Development",
        source: "arXiv cs.SE",
        link: "https://example.com/paper",
      },
    ]
  );

  assert.match(markdown, /复杂功能交付评测框架/);
  assert.doesNotMatch(markdown, /\*\*FeatureBench: Benchmarking Agentic Coding/);
});
