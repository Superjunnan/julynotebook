import test from "node:test";
import assert from "node:assert/strict";

import {
  buildDigestTimeWindow,
  buildPreclusterCandidateGroups,
  preprocessCandidatePools,
  selectDigestCandidatePool,
  splitCandidatesByPool,
} from "../../tools/digest.mjs";

test("splitCandidatesByPool separates news and papers before clustering", () => {
  const candidates = [
    {
      title: "OpenAI publishes new governance note",
      link: "https://openai.com/news/governance-note",
      source: "OpenAI News",
      sourceGroup: "company",
      trustTier: "high",
      bucketHint: "hot_news",
      ingestionMode: "page_scrape",
    },
    {
      title: "A new agent benchmark",
      link: "https://arxiv.org/abs/2603.12345",
      source: "arXiv cs.AI",
      sourceGroup: "paper",
      trustTier: "high",
      bucketHint: "core_tech",
      ingestionMode: "direct_feed",
    },
  ];

  const pools = splitCandidatesByPool(candidates);
  assert.equal(pools.news.length, 1);
  assert.equal(pools.papers.length, 1);
});

test("selectDigestCandidatePool caps the formal pool while keeping news and paper balance", () => {
  const news = Array.from({ length: 260 }, (_, idx) => ({
    title: `News ${idx}`,
    link: `https://source${idx % 40}.example.com/news/${idx}`,
    source: `Source ${idx % 40}`,
    sourceGroup: "foreign_media",
    trustTier: "high",
    score: 400 - idx,
  }));
  const papers = Array.from({ length: 90 }, (_, idx) => ({
    title: `Paper ${idx}`,
    link: `https://arxiv.org/abs/2605.${String(idx).padStart(5, "0")}`,
    source: "arXiv cs.AI",
    sourceGroup: "paper",
    trustTier: "high",
    score: 300 - idx,
  }));

  const selected = selectDigestCandidatePool([...news, ...papers], {
    limit: 250,
    newsCap: 200,
    paperCap: 50,
    newsPerSourceCap: 8,
  });
  const pools = splitCandidatesByPool(selected);

  assert.equal(selected.length, 250);
  assert.equal(pools.news.length, 200);
  assert.equal(pools.papers.length, 50);
  assert.equal(Math.max(...selected.map((item) => item.score)), 400);
});

test("preprocessCandidatePools retains high-trust news with missing dates for later enrichment", () => {
  const candidates = [
    {
      title: "Meta AI launches enterprise safety controls",
      link: "https://ai.meta.com/blog/enterprise-safety-controls",
      source: "Meta AI Blog",
      sourceGroup: "company",
      trustTier: "high",
      bucketHint: "hot_news",
      ingestionMode: "page_scrape",
      pubDate: null,
      contentSnippet: "",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-03-10",
    newsLookbackDays: 5,
    paperLookbackDays: 2,
  });

  assert.equal(result.news.length, 1);
  assert.equal(result.stats.news_retained_missing_date, 1);
  assert.equal(result.stats.news_dropped_missing_date, 0);
});

test("preprocessCandidatePools applies separate recency windows to news and papers", () => {
  const candidates = [
    {
      title: "Company follow-up on last week's AI model outage",
      link: "https://example.com/news/follow-up",
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      trustTier: "high",
      bucketHint: "hot_news",
      ingestionMode: "direct_feed",
      pubDate: "2026-03-06T09:00:00.000Z",
      contentSnippet: "A follow-up report with new AI operational details.",
    },
    {
      title: "Older paper should still be filtered more strictly",
      link: "https://arxiv.org/abs/2603.00001",
      source: "arXiv cs.AI",
      sourceGroup: "paper",
      trustTier: "high",
      bucketHint: "core_tech",
      ingestionMode: "direct_feed",
      pubDate: "2026-03-06T09:00:00.000Z",
      contentSnippet: "Paper abstract.",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-03-10",
    newsLookbackDays: 5,
    paperLookbackDays: 2,
  });

  assert.equal(result.news.length, 1);
  assert.equal(result.papers.length, 0);
  assert.equal(result.stats.news_dropped_by_time, 0);
  assert.equal(result.stats.paper_dropped_by_time, 1);
});

test("preprocessCandidatePools keeps boundary-day papers within the configured calendar window", () => {
  const candidates = [
    {
      title: "Boundary-day paper should stay eligible",
      link: "https://huggingface.co/papers/2603.99999",
      source: "Hugging Face Papers",
      sourceGroup: "paper",
      trustTier: "high",
      bucketHint: "core_tech",
      ingestionMode: "api_json",
      pubDate: "2026-03-27",
      contentSnippet: "Paper abstract.",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-03-29",
    newsLookbackDays: 5,
    paperLookbackDays: 2,
  });

  assert.equal(result.papers.length, 1);
  assert.equal(result.stats.paper_dropped_by_time, 0);
});

test("preprocessCandidatePools applies morning news window between prior evening and morning stats", () => {
  const newsTimeWindow = buildDigestTimeWindow("2026-06-02", "morning", {
    timeZone: "Asia/Shanghai",
    morningTime: "06:00:00",
    eveningTime: "19:40:00",
  });
  const candidates = [
    {
      title: "Inside-window AI model launch",
      link: "https://example.com/news/in-window",
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-06-01T12:00:00.000Z",
      contentSnippet: "AI model launch details.",
    },
    {
      title: "Old morning AI model launch",
      link: "https://example.com/news/old",
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-06-01T02:00:00.000Z",
      contentSnippet: "AI model launch details.",
    },
    {
      title: "Paper outside news window should stay on paper lookback",
      link: "https://huggingface.co/papers/2606.00001",
      source: "Hugging Face Papers",
      sourceGroup: "paper",
      trustTier: "high",
      bucketHint: "core_tech",
      ingestionMode: "api_json",
      pubDate: "2026-06-02T00:00:00.000Z",
      contentSnippet: "Paper abstract.",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-06-02",
    newsLookbackDays: 5,
    paperLookbackDays: 2,
    newsTimeWindow,
    applyAiGate: false,
  });

  assert.deepEqual(result.news.map((item) => item.link), ["https://example.com/news/in-window"]);
  assert.equal(result.papers.length, 1);
  assert.equal(result.stats.news_dropped_by_edition_window, 1);
});

test("preprocessCandidatePools applies evening news window between morning and evening stats", () => {
  const newsTimeWindow = buildDigestTimeWindow("2026-06-02", "evening", {
    timeZone: "Asia/Shanghai",
    morningTime: "06:00:00",
    eveningTime: "19:40:00",
  });
  const candidates = [
    {
      title: "Evening-window AI product update",
      link: "https://example.com/news/evening",
      source: "36Kr AI",
      sourceGroup: "domestic_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-06-02T02:00:00.000Z",
      contentSnippet: "AI product update details.",
    },
    {
      title: "Prior-night AI product update",
      link: "https://example.com/news/prior-night",
      source: "36Kr AI",
      sourceGroup: "domestic_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-06-01T12:00:00.000Z",
      contentSnippet: "AI product update details.",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-06-02",
    newsLookbackDays: 5,
    paperLookbackDays: 2,
    newsTimeWindow,
    applyAiGate: false,
  });

  assert.deepEqual(result.news.map((item) => item.link), ["https://example.com/news/evening"]);
  assert.equal(result.stats.news_dropped_by_edition_window, 1);
});

test("preprocessCandidatePools drops old trusted news when English month dates can be inferred", () => {
  const candidates = [
    {
      title: "Announcements Feb 26, 2026 Statement from Dario Amodei on our discussions with the Department of War",
      link: "https://www.anthropic.com/news/statement-department-of-war",
      source: "Anthropic News",
      sourceGroup: "company",
      trustTier: "high",
      bucketHint: "hot_news",
      ingestionMode: "page_scrape",
      pubDate: null,
      contentSnippet: "A statement from our CEO on national security uses of AI.",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-03-10",
    newsLookbackDays: 5,
    paperLookbackDays: 2,
  });

  assert.equal(result.news.length, 0);
  assert.equal(result.stats.news_dropped_by_time, 1);
});

test("preprocessCandidatePools drops items matching NSFW keywords and increments dropped_by_nsfw_gate", () => {
  const candidates = [
    {
      title: "麻豆传媒停运，AI干碎2000亿成人内容行业",
      contentSnippet: "华语圈最大的成人内容制作平台正式停止运营。",
      link: "https://example.com/nsfw-1",
      source: "某媒体",
      sourceGroup: "domestic_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-04-10T10:00:00.000Z",
    },
    {
      title: "AI妓馆爆了，成人行业彻底变天",
      contentSnippet: "全球首家赛博亲密体验空间在柏林开业。",
      link: "https://example.com/nsfw-2",
      source: "某媒体",
      sourceGroup: "domestic_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-04-10T10:00:00.000Z",
    },
    {
      title: "Anthropic Claude 发布 Managed Agents 功能",
      contentSnippet: "Anthropic 推出新的 Agent 托管平台。",
      link: "https://example.com/ok-1",
      source: "TechCrunch",
      sourceGroup: "foreign_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-04-10T10:00:00.000Z",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-04-11",
    applyAiGate: false,
  });

  assert.equal(result.stats.dropped_by_nsfw_gate, 2);
  assert.equal(result.news.length + result.papers.length, 1);
  assert.equal(result.news[0]?.title, "Anthropic Claude 发布 Managed Agents 功能");
});

test("preprocessCandidatePools does not false-positive on '成人礼' or '成人教育'", () => {
  const candidates = [
    {
      title: "2026年第一季度，AI Agent完成了它的成人礼",
      contentSnippet: "OpenClaw 快速普及，Agent 进入主流。",
      link: "https://example.com/ok-2",
      source: "36Kr",
      sourceGroup: "domestic_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-04-10T10:00:00.000Z",
    },
    {
      title: "教育部推进AI成人教育改革",
      contentSnippet: "终身学习体系建设。",
      link: "https://example.com/ok-3",
      source: "新华社",
      sourceGroup: "domestic_media",
      trustTier: "high",
      bucketHint: "hot_news",
      pubDate: "2026-04-10T10:00:00.000Z",
    },
  ];

  const result = preprocessCandidatePools(candidates, {
    runDate: "2026-04-11",
    applyAiGate: false,
  });

  assert.equal(result.stats.dropped_by_nsfw_gate, 0);
  assert.equal(result.news.length, 2);
});

test("buildPreclusterCandidateGroups does not treat non-paper core_tech cards as paper-only material", () => {
  const groups = buildPreclusterCandidateGroups([
    {
      candidate_id: 1,
      title: "MiniMax 发布企业 Agent 平台",
      snippet: "MiniMax 发布企业 Agent 平台并开放接入。",
      cluster_text: "MiniMax 发布企业 Agent 平台并开放接入。",
      source: "36Kr AI",
      source_group: "domestic_media",
      bucket_hint: "hot_news",
      pub_date: "2026-03-29",
      domain: "36kr.com",
      score: 92,
      link: "https://www.36kr.com/p/1",
      _item: {
        title: "MiniMax 发布企业 Agent 平台",
        contentSnippet: "MiniMax 发布企业 Agent 平台并开放接入。",
        sourceGroup: "domestic_media",
        bucketHint: "hot_news",
        pubDate: "2026-03-29",
        link: "https://www.36kr.com/p/1",
      },
    },
    {
      candidate_id: 2,
      title: "MiniMax 发布企业 Agent 平台",
      snippet: "MiniMax 发布企业 Agent 平台并开放接入。",
      cluster_text: "MiniMax 发布企业 Agent 平台并开放接入。",
      source: "Latent Space",
      source_group: "newsletter",
      bucket_hint: "core_tech",
      pub_date: "2026-03-29",
      domain: "latent.space",
      score: 88,
      link: "https://www.latent.space/p/minimax-agent-platform",
      _item: {
        title: "MiniMax 发布企业 Agent 平台",
        contentSnippet: "MiniMax 发布企业 Agent 平台并开放接入。",
        sourceGroup: "newsletter",
        bucketHint: "core_tech",
        pubDate: "2026-03-29",
        link: "https://www.latent.space/p/minimax-agent-platform",
      },
    },
  ]);

  assert.equal(groups.length, 1);
  assert.deepEqual(groups[0]?.member_ids, [1, 2]);
});
