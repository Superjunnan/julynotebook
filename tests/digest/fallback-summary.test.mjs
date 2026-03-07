import test from "node:test";
import assert from "node:assert/strict";

import { buildFallbackDailySummary } from "../../tools/digest.mjs";

test("buildFallbackDailySummary groups materials by bucket hint", () => {
  const daily = buildFallbackDailySummary([
    { refId: 1, title: "OpenAI ships Operator API", source: "TechCrunch AI", bucketHint: "hot_news" },
    { refId: 2, title: "Sparse reasoning paper", source: "arXiv cs.AI", bucketHint: "core_tech" },
    { refId: 3, title: "Karpathy hints at new coding loop", source: "Andrej Karpathy", sourceGroup: "opinion", bucketHint: "ai_rumor" },
  ]);

  assert.equal(daily.hotNews.length, 2);
  assert.equal(Array.isArray(daily.otherNews), true);
  assert.equal(daily.coreTech.length, 1);
  assert.equal(daily.aiRumor.length, 1);
});

test("buildFallbackDailySummary uses concise Chinese fallback copy", () => {
  const daily = buildFallbackDailySummary([
    {
      refId: 1,
      title: "Why AI startups are selling the same equity at two different prices",
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      bucketHint: "hot_news",
      trustTier: "high",
    },
    {
      refId: 2,
      title: "Reasoning as Gradient: Scaling MLE Agents Beyond Tree Search",
      source: "arXiv cs.AI",
      sourceGroup: "paper",
      bucketHint: "core_tech",
      trustTier: "high",
    },
  ]);

  assert.equal(daily.hotNews[0].title, "海外科技媒体动态 1");
  assert.equal(daily.coreTech[0].title, "论文平台论文进展 1");
  assert.match(daily.hotNews[0].insight || "", /^海外科技媒体动态 1/);
  assert.equal((daily.hotNews[0].briefing || "").length > 20, true);
  assert.doesNotMatch(daily.hotNews[0].briefing || "", /5W1H：|Who\/What：|When\/Where：|Why\/How：/);
  assert.equal((daily.hotNews[0].evaluation || "").length > 8, true);
  assert.doesNotMatch(daily.hotNews[0].evaluation || "", /客观评估：/);
  assert.equal(daily.coreTech[0].summary, "该论文条目已纳入跟踪，建议通过引用原文核对方法与结论。");
  assert.doesNotMatch(daily.hotNews[0].briefing || "", /等待模型总结|人工复核/);
});
