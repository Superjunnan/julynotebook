import test from "node:test";
import assert from "node:assert/strict";

import {
  scoreDailyNewsEntry,
  scoreTopicForSelection,
} from "../../tools/digest.mjs";

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

test("scoreTopicForSelection prefers domestic AI company topics in evening mode", () => {
  const base = {
    topic_type: "news",
    mention_count: 2,
    source_diversity: 1,
    cross_source_score: 66,
    avg_candidate_score: 14,
    newest_pub_date: "2026-03-20T00:00:00.000Z",
    top_source_groups: ["domestic_media"],
  };

  const domesticTopic = {
    ...base,
    topic_title: "阿里发布通义多模态升级",
    sample_titles: ["阿里通义推出新一代多模态能力"],
    top_sources: ["36Kr AI", "阿里技术"],
  };

  const foreignTopic = {
    ...base,
    topic_title: "OpenAI升级桌面端代理能力",
    sample_titles: ["OpenAI upgrades Codex desktop flows"],
    top_sources: ["AIBase", "36Kr AI"],
  };

  const domesticScore = scoreTopicForSelection(domesticTopic, { edition: "evening" });
  const foreignScore = scoreTopicForSelection(foreignTopic, { edition: "evening" });

  assert.equal(domesticScore > foreignScore, true);
  assert.equal(domesticScore - foreignScore >= 20, true);
});

test("scoreTopicForSelection strongly boosts core head AI entities", () => {
  const base = {
    topic_type: "news",
    mention_count: 1,
    source_diversity: 1,
    cross_source_score: 52,
    avg_candidate_score: 12,
    newest_pub_date: "2026-03-22T08:00:00.000Z",
    top_source_groups: ["foreign_media"],
  };

  const headEntity = {
    ...base,
    topic_title: "OpenAI 发布企业级推理与 Agent 平台更新",
    sample_titles: ["OpenAI expands enterprise reasoning agent platform"],
    top_sources: ["OpenAI News"],
  };

  const ordinary = {
    ...base,
    topic_title: "某创业团队发布通用数据可视化组件",
    sample_titles: ["Startup ships analytics dashboard update"],
    top_sources: ["TechCrunch AI"],
  };

  const headScore = scoreTopicForSelection(headEntity);
  const ordinaryScore = scoreTopicForSelection(ordinary);

  assert.equal(headScore > ordinaryScore, true);
  assert.equal(headScore - ordinaryScore >= 12, true);
});

test("scoreTopicForSelection boosts high-value AI industry event types", () => {
  const base = {
    topic_type: "news",
    mention_count: 1,
    source_diversity: 1,
    cross_source_score: 50,
    avg_candidate_score: 11,
    newest_pub_date: "2026-03-22T08:00:00.000Z",
    top_source_groups: ["domestic_media"],
    top_sources: ["AIBase"],
  };

  const highValue = {
    ...base,
    topic_title: "阿里发布新推理模型并同步开放 API 平台",
    sample_titles: ["阿里通义发布新推理模型并开放 API"],
  };

  const lowValue = {
    ...base,
    topic_title: "某公司将参加 AI 峰会并开启直播报名",
    sample_titles: ["AI 峰会直播报名开启"],
  };

  const highScore = scoreTopicForSelection(highValue, { edition: "evening" });
  const lowScore = scoreTopicForSelection(lowValue, { edition: "evening" });

  assert.equal(highScore > lowScore, true);
  assert.equal(highScore - lowScore >= 14, true);
});

test("scoreDailyNewsEntry treats company_view as company evidence", () => {
  const entry = {
    refs: [1, 2],
    crossVerifyScore: 74,
    mentionCount: 2,
  };

  const companyViewScore = scoreDailyNewsEntry(entry, {
    1: {
      refId: 1,
      sourceGroup: "company_view",
      trustTier: "high",
      domain: "kimi.ai",
      text: "Kimi 发布新模型。",
    },
    2: {
      refId: 2,
      sourceGroup: "domestic_media",
      trustTier: "medium",
      domain: "aibase.com",
      text: "媒体跟进报道。",
    },
  });

  const plainMediaScore = scoreDailyNewsEntry(entry, {
    1: {
      refId: 1,
      sourceGroup: "domestic_media",
      trustTier: "high",
      domain: "aibase.com",
      text: "媒体报道。",
    },
    2: {
      refId: 2,
      sourceGroup: "domestic_media",
      trustTier: "medium",
      domain: "36kr.com",
      text: "媒体跟进报道。",
    },
  });

  assert.equal(companyViewScore > plainMediaScore, true);
});
