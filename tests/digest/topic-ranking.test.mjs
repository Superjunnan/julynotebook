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

test("scoreTopicForSelection strongly prefers corroborated news over singleton community items", () => {
  const corroborated = {
    topic_type: "news",
    topic_title: "OpenAI与Anthropic新代理协议获多源交叉报道",
    sample_titles: [
      "OpenAI expands agent tooling for enterprises",
      "Anthropic responds with enterprise agent update",
    ],
    mention_count: 4,
    source_diversity: 3,
    cross_source_score: 84,
    avg_candidate_score: 18,
    newest_pub_date: "2026-03-10T00:00:00.000Z",
    top_source_groups: ["foreign_media", "company"],
  };

  const singletonCommunity = {
    topic_type: "news",
    topic_title: "Hugging Face社区提示",
    sample_titles: ["Upload TensorBoard logs while fine-tuning your model"],
    mention_count: 1,
    source_diversity: 1,
    cross_source_score: 60,
    avg_candidate_score: 12,
    newest_pub_date: "2026-03-10T00:00:00.000Z",
    top_source_groups: ["community"],
  };

  const corroboratedScore = scoreTopicForSelection(corroborated);
  const singletonScore = scoreTopicForSelection(singletonCommunity);

  assert.equal(corroboratedScore > singletonScore, true);
  assert.equal(corroboratedScore - singletonScore >= 50, true);
});
