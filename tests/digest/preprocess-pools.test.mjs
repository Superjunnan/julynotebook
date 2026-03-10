import test from "node:test";
import assert from "node:assert/strict";

import {
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
