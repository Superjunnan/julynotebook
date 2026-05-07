import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

import {
  DIGEST_NEWS_RULES,
  buildDigestMarkdown,
  buildFallbackDailySummary,
} from "../../tools/digest.mjs";

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
      aiRumor: [],
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
  assert.match(markdown, /## 参考来源/);
  assert.equal(markdown.indexOf("## 核心论文") < markdown.indexOf("## 参考来源"), true);
  assert.match(markdown, /今日候选总数：123 条/);
  assert.match(markdown, /模型能力提速和商业化渗透同步发生/);
  assert.match(markdown, /description: "今日主线：\\n- 模型能力提速和商业化渗透同步发生/);
  assert.doesNotMatch(markdown, /description: "热门资讯：/);
  assert.match(markdown, /### 01 · OpenAI发布新模型/);
  assert.match(markdown, /参考：/);
  assert.match(markdown, />1<\/a>/);
  assert.match(markdown, />2<\/a>/);
  assert.doesNotMatch(markdown, /关键信号：/);
  assert.doesNotMatch(markdown, /5W1H：|Who\/What：|When\/Where：|Why\/How：/);
  assert.doesNotMatch(markdown, /简报：|研判：|综合来源：/);
  assert.doesNotMatch(markdown, /importance-note|重要性：/);
  assert.doesNotMatch(markdown, /…|\.{3,}/);
});

test("digest news rules align with confirmed 3 to 15 total range", () => {
  assert.deepEqual(DIGEST_NEWS_RULES, {
    hotMin: 3,
    hotMax: 4,
    quickMin: 0,
    quickMax: 15,
    totalMin: 4,
    totalMax: 15,
    coreTechMin: 0,
    coreTechMax: 6,
  });
});

test("buildDigestMarkdown renders the optional paper module empty state when no paper survives", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-29",
    {
      overview: "当日产业与产品更新较多，但没有满足要求的论文材料。",
      hotNews: [],
      otherNews: [],
      coreTech: [],
      aiRumor: [],
      refTranslations: {},
    },
    []
  );

  assert.match(markdown, /## 核心论文/);
  assert.match(markdown, /当日无优质论文/);
  assert.doesNotMatch(markdown, /今日暂无有价值论文更新/);
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

test("references render as Chinese title plus source and keep longer titles in data-cite labels", () => {
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

  assert.match(markdown, /这是一个非常非常长的中文标题用于验证截断逻辑是否生效｜TechCrunch/);
  assert.doesNotMatch(markdown, /Long English headline for verification<\/a>/);
});

test("quick news should prefer fuller translated reference title when generated insight is only a truncated prefix", () => {
  const markdown = buildDigestMarkdown(
    "2026-04-22",
    {
      hotNews: [],
      otherNews: [
        {
          insight: "OpenAI最强对手",
          narrative: "Anthropic 获得亚马逊追加投资。",
          refs: [1],
        },
      ],
      coreTech: [],
      aiRumor: [],
      refTranslations: {
        1: "OpenAI最强对手，被亚马逊追投2249亿",
      },
    },
    [
      {
        refId: 1,
        title: "OpenAI rival gets another Amazon investment",
        source: "36Kr AI",
        link: "https://example.com/anthropic",
      },
    ]
  );

  assert.match(markdown, /\*\*01 · OpenAI最强对手，被亚马逊追投2249亿\*\*/);
  assert.doesNotMatch(markdown, /\*\*01 · OpenAI最强对手\*\*/);
});

test("core paper block should keep full translated paper titles instead of clipping to a short prefix", () => {
  const markdown = buildDigestMarkdown(
    "2026-04-22",
    {
      hotNews: [],
      otherNews: [],
      coreTech: [
        {
          title: "面向程序化超声理解的视",
          summary: "该论文条目已纳入跟踪。",
          refs: [1],
        },
      ],
      aiRumor: [],
      refTranslations: {
        1: "Re XSono VQA：面向程序化超声理解的视频问答基准",
      },
    },
    [
      {
        refId: 1,
        title: "Re XSono VQA: Video question answering benchmark for programmatic ultrasound understanding",
        source: "arXiv cs.AI",
        link: "https://example.com/paper",
      },
    ]
  );

  assert.match(markdown, /面向程序化超声理解的视频问答基准/);
  assert.doesNotMatch(markdown, /\*\*面向程序化超声理解的视\*\*/);
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

test("core paper block seeds Chinese title from material title even when refTranslations is empty", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-03",
    {
      hotNews: [],
      otherNews: [],
      coreTech: [
        {
          title: "EDM-ARS: A Domain-Specific Multi-Agent System for Automated Educational Data Mining Research",
          summary: "该论文提出了面向教育数据挖掘研究的多智能体系统。",
          refs: [16],
        },
      ],
      aiRumor: [],
      refTranslations: {},
    },
    [
      {
        refId: 16,
        title: "EDM-ARS：面向自动化教育数据挖掘研究的领域特定多智能体系统",
        source: "arXiv cs.AI",
        link: "https://example.com/paper-16",
      },
    ]
  );

  assert.match(markdown, /面向自动化教育数据挖掘研究的领域特定多智能体系统/);
  assert.doesNotMatch(markdown, /\*\*论文研究进展\*\*/);
  assert.doesNotMatch(markdown, /\*\*论文进展/);
});

test("material Chinese title should override stale existing translated title when rendering references", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-29",
    {
      hotNews: [],
      otherNews: [
        {
          insight: "华为诺亚方舟实验室主任王云鹤辞去主任职位，华为AI迎来人事变动。",
          narrative: "王云鹤官宣离职，华为 AI 研究体系出现人事变化。",
          refs: [1],
        },
      ],
      coreTech: [],
      aiRumor: [],
      refTranslations: {
        1: "字节跳动新AI视频生成模型Dreamina Seedance 2.0登陆CapCut",
      },
    },
    [
      {
        refId: 1,
        title: "深度｜华为 AI，迎来大变",
        source: "36Kr AI",
        link: "https://36kr.com/p/3742379822399492",
      },
    ]
  );

  assert.match(markdown, /深度｜华为 AI，迎来大变｜36Kr AI/);
  assert.doesNotMatch(markdown, /Dreamina Seedance 2\.0登陆CapCut｜36Kr AI/);
});

test("buildDigestMarkdown should replace generic hot news placeholders with translated reference titles", () => {
  const markdown = buildDigestMarkdown(
    "2026-04-15",
    {
      hotNews: [
        {
          insight: "海外科技媒体动态 3",
          narrative: "Google adds AI Skills to Chrome to help you save favorite workflows.",
          refs: [1, 2],
          mentionCount: 2,
          crossVerifyScore: 78,
        },
      ],
      otherNews: [],
      coreTech: [],
      aiRumor: [],
      refTranslations: {
        1: "谷歌在Chrome中添加AI技能以帮助保存常用工作流",
      },
    },
    [
      {
        refId: 1,
        title: "Google adds AI Skills to Chrome to help you save favorite workflows",
        source: "TechCrunch AI",
        link: "https://example.com/1",
      },
      {
        refId: 2,
        title: "Chrome now lets you turn AI prompts into reusable skills",
        source: "The Verge AI",
        link: "https://example.com/2",
      },
    ]
  );

  assert.match(markdown, /### 01 · 谷歌在Chrome中添加AI技能以帮助保存常用工作流/);
  assert.doesNotMatch(markdown, /### 01 · 海外科技媒体动态 3/);
});

test("buildDigestMarkdown should replace generic hot news key update placeholders", () => {
  const markdown = buildDigestMarkdown(
    "2026-05-07",
    {
      hotNews: [
        {
          insight: "海外科技媒体重点更新",
          narrative: "Apple to pay $250M to settle lawsuit over Siri's delayed AI features.",
          refs: [15, 16],
          mentionCount: 2,
          crossVerifyScore: 82,
        },
      ],
      otherNews: [],
      coreTech: [],
      aiRumor: [],
      refTranslations: {
        15: "苹果将支付2.5亿美元和解Siri延迟AI功能的诉讼",
      },
    },
    [
      {
        refId: 15,
        title: "Apple to pay $250M to settle lawsuit over Siri's delayed AI features",
        source: "TechCrunch AI",
        link: "https://example.com/apple-siri",
      },
      {
        refId: 16,
        title: "Apple pay iPhone buyers $250 million lawsuit AI",
        source: "SiliconValley.com",
        link: "https://example.com/apple-lawsuit",
      },
    ]
  );

  assert.match(markdown, /### 01 · 苹果将支付2\.5亿美元和解Siri延迟AI功能的诉讼/);
  assert.doesNotMatch(markdown, /### 01 · 海外科技媒体重点更新/);
});

test("buildDigestMarkdown should replace community-discussion narrative placeholders with core summaries", () => {
  const markdown = buildDigestMarkdown(
    "2026-05-07",
    {
      hotNews: [
        {
          insight: "DeepSeek首轮融资或达450亿美元估值",
          narrative: "该条社区讨论提到“In Brief Posted: 10:20 AM PDT · May 6, 2026 Image Credits:CN-STR/AFP / Getty Images”，核心信号更偏观点与风险提示，需结合后续实证数据判断真实影响。",
          refs: [7],
          mentionCount: 1,
          crossVerifyScore: 78,
        },
      ],
      otherNews: [
        {
          insight: "Anthropic的Claude托管智能体现在可以“做梦”了",
          narrative: "该条社区讨论提到“SAN FRANCISCO—At its Code with Claude developers’ conference, Anthropic has introduced”，核心信号更偏观点与风险提示，需结合后续实证数据判断真实影响。",
          refs: [2],
        },
      ],
      coreTech: [],
      aiRumor: [],
      refTranslations: {
        7: "DeepSeek首轮融资或达450亿美元估值",
        2: "Anthropic的Claude托管智能体现在可以“做梦”了",
      },
    },
    [
      {
        refId: 7,
        title: "DeepSeek could hit $45B valuation from its first investment round",
        source: "TechCrunch AI",
        link: "https://example.com/deepseek",
        text: "In Brief Posted: 10:20 AM PDT · May 6, 2026 Image Credits:CN-STR/AFP / Getty Images",
      },
      {
        refId: 2,
        title: "Anthropic's Claude can now dream, sort of",
        source: "Ars Technica AI",
        link: "https://example.com/claude-dream",
        text: "SAN FRANCISCO—At its Code with Claude developers’ conference, Anthropic has introduced a new feature.",
      },
    ]
  );

  assert.doesNotMatch(markdown, /该条社区讨论提到/);
  assert.doesNotMatch(markdown, /核心信号更偏观点与风险提示/);
  assert.match(markdown, /据TechCrunch AI报道，DeepSeek首轮融资或达450亿美元估值。核心看点在于资本市场正在重新定价/);
  assert.match(markdown, /据Ars Technica AI报道，Anthropic的Claude托管智能体现在可以“做梦”了。核心看点在于新能力已经从概念进入产品或开发者场景/);
});

test("evening digest markdown uses dedicated title, metadata, and domestic tags", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-20",
    {
      overview: "国内模型公司在产品发布、开放平台和商业化协同上继续加速。",
      candidateTotal: 66,
      hotNews: [
        {
          insight: "Kimi 发布新能力",
          narrative: "Moonshot 面向国内开发者推出新版本能力，重点强调开放平台调用与场景适配。",
          refs: [1],
        },
      ],
      otherNews: [],
      coreTech: [
        {
          title: "国内多模态评测更新",
          summary: "研究进一步补齐了中文多模态能力的评测基线。",
          refs: [2],
        },
      ],
      aiRumor: [],
      refTranslations: {},
    },
    [
      { refId: 1, title: "Kimi release", source: "Kimi", link: "https://example.com/1" },
      { refId: 2, title: "Paper", source: "arXiv cs.AI", link: "https://example.com/2" },
    ],
    {
      edition: "evening",
      region: "domestic",
    }
  );

  assert.match(markdown, /title: "AI晚报 · 03\.20 周五"/);
  assert.match(markdown, /digest_edition: evening/);
  assert.match(markdown, /digest_region: domestic/);
  assert.match(markdown, /tags: \[人工智能, 每日资讯, AI 晚报, 国内AI\]/);
  assert.match(markdown, /国内模型公司在产品发布、开放平台和商业化协同上继续加速/);
});

test("buildDigestMarkdown uses current local time when same-day manual run is earlier than configured post time", () => {
  const markdown = buildDigestMarkdown(
    "2026-03-20",
    {
      overview: "国内模型公司在产品发布、开放平台和商业化协同上继续加速。",
      hotNews: [],
      otherNews: [],
      coreTech: [],
      aiRumor: [],
    },
    [],
    {
      edition: "evening",
      region: "domestic",
      postTime: "19:40:00",
      timeZone: "Asia/Shanghai",
      now: new Date("2026-03-20T09:19:35.000Z"),
    }
  );

  assert.match(markdown, /date: 2026-03-20 17:19:35/);
});

test("evening digest ignores legacy generic local post time and falls back to evening default", () => {
  const output = execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
        import { buildDigestMarkdown } from './tools/digest.mjs';
        const md = buildDigestMarkdown(
          '2026-03-20',
          { overview: 'x', hotNews: [], otherNews: [], coreTech: [], aiRumor: [] },
          [],
          { edition: 'evening', region: 'domestic', timeZone: 'Asia/Shanghai', now: new Date('2026-03-20T09:19:35.000Z') }
        );
        process.stdout.write(md);
      `,
    ],
    {
      cwd: new URL("../..", import.meta.url),
      env: {
        ...process.env,
        DIGEST_PROFILE: "evening",
        DIGEST_POST_TIME: "09:00:00",
        DIGEST_EVENING_POST_TIME: "",
        DIGEST_MORNING_POST_TIME: "",
      },
      encoding: "utf8",
    }
  );

  assert.match(output, /title: "AI晚报 · 03\.20 周五"/);
  assert.match(output, /date: 2026-03-20 17:19:35/);
});

test("morning digest uses current completion time and renders early-edition display title", () => {
  const output = execFileSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `
        import { buildDigestMarkdown } from './tools/digest.mjs';
        const md = buildDigestMarkdown(
          '2026-03-20',
          { overview: 'x', hotNews: [], otherNews: [], coreTech: [], aiRumor: [] },
          [],
          { edition: 'morning', region: 'global', timeZone: 'Asia/Shanghai', now: new Date('2026-03-20T09:19:35.000Z') }
        );
        process.stdout.write(md);
      `,
    ],
    {
      cwd: new URL("../..", import.meta.url),
      env: {
        ...process.env,
        DIGEST_PROFILE: "morning",
        DIGEST_POST_TIME: "09:00:00",
        DIGEST_EVENING_POST_TIME: "",
        DIGEST_MORNING_POST_TIME: "",
      },
      encoding: "utf8",
    }
  );

  assert.match(output, /title: "AI早报 · 03\.20 周五"/);
  assert.match(output, /date: 2026-03-20 17:19:35/);
});
