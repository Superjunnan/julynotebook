import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTopicDeepReadPlan,
  resolveTopicShortlistQuota,
} from "../../tools/digest.mjs";

test("resolveTopicShortlistQuota keeps the 10-topic target for news and treats papers as optional extras", () => {
  const topicCards = [
    ...Array.from({ length: 12 }, (_, idx) => ({
      topic_id: idx + 1,
      topic_type: "news",
    })),
    ...Array.from({ length: 4 }, (_, idx) => ({
      topic_id: idx + 101,
      topic_type: "paper",
    })),
  ];

  const quota = resolveTopicShortlistQuota(topicCards, 10);

  assert.equal(quota.news_target, 10);
  assert.equal(quota.min_papers, 0);
  assert.equal(quota.preferred_papers, 4);
  assert.equal(quota.max_papers, 4);
  assert.equal(quota.total_cap, 14);
});

test("buildTopicDeepReadPlan keeps high-quality foreign material in evening mode as a bias rather than a hard filter", () => {
  const plan = buildTopicDeepReadPlan(
    [1],
    [
      {
        topic_id: 1,
        topic_title: "Anthropic releases new agent runtime",
        topic_type: "news",
        member_candidate_ids: [11],
        cross_source_score: 84,
      },
    ],
    [
      {
        candidate_id: 11,
        title: "Anthropic releases new agent runtime",
        snippet: "Anthropic ships a new runtime for enterprise agent deployment.",
        cluster_text: "Anthropic ships a new runtime for enterprise agent deployment.",
        source: "Anthropic News",
        source_group: "company",
        pub_date: "2026-03-29",
        domain: "anthropic.com",
        score: 90,
        link: "https://www.anthropic.com/news/agent-runtime",
        _item: {
          title: "Anthropic releases new agent runtime",
          contentSnippet: "Anthropic ships a new runtime for enterprise agent deployment.",
          source: "Anthropic News",
          sourceGroup: "company",
          pubDate: "2026-03-29",
          link: "https://www.anthropic.com/news/agent-runtime",
          score: 90,
        },
      },
    ],
    {
      edition: "evening",
    }
  );

  assert.equal(plan.targets.length, 1);
  assert.equal(plan.targets[0]?.candidateId, 11);
});
