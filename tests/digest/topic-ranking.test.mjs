import test from "node:test";
import assert from "node:assert/strict";

import { scoreTopicForSelection } from "../../tools/digest.mjs";

test("scoreTopicForSelection penalizes weak AI-related news topics", () => {
  const base = {
    topic_type: "news",
    mention_count: 1,
    source_diversity: 1,
    cross_source_score: 58,
    avg_candidate_score: 12,
    newest_pub_date: "2026-03-10T00:00:00.000Z",
    top_source_groups: ["foreign_media"],
  };

  const aiTopic = {
    ...base,
    topic_title: "OpenAI发布代理安全平台",
    sample_titles: ["OpenAI acquires Promptfoo to secure its AI agents"],
    top_sources: ["TechCrunch AI", "OpenAI News"],
  };

  const offTopic = {
    ...base,
    topic_title: "Feeld约会应用争议",
    sample_titles: ["Feeld Was a Dating App for the Freaks"],
    top_sources: ["WIRED AI"],
  };

  const aiScore = scoreTopicForSelection(aiTopic);
  const offTopicScore = scoreTopicForSelection(offTopic);

  assert.equal(aiScore > offTopicScore, true);
  assert.equal(aiScore - offTopicScore >= 8, true);
});
