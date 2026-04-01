import test from "node:test";
import assert from "node:assert/strict";

import {
  buildPreclusterCandidateGroups,
  preprocessCandidatePools,
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
