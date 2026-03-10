import test from "node:test";
import assert from "node:assert/strict";

import { isLikelyAiCandidate } from "../../tools/digest.mjs";

test("isLikelyAiCandidate keeps clear AI news and papers", () => {
  assert.equal(
    isLikelyAiCandidate({
      title: "Anthropic sues Defense Department over supply chain risk designation",
      contentSnippet: "AI model governance dispute escalates",
      link: "https://techcrunch.com/example",
      sourceGroup: "foreign_media",
    }),
    true
  );

  assert.equal(
    isLikelyAiCandidate({
      title: "Uncertainty Quantification in LLM Agents",
      link: "https://arxiv.org/abs/2602.05073",
      sourceGroup: "paper",
      bucketHint: "core_tech",
    }),
    true
  );
});

test("isLikelyAiCandidate drops non-AI generic stories", () => {
  assert.equal(
    isLikelyAiCandidate({
      title: "Bay Area hotel is bought through foreclosure of failed property loan",
      contentSnippet: "hospitality sector remains under pressure",
      link: "https://www.siliconvalley.com/2026/03/09/bay-area-hotel-marin-property-travel-loan-real-estate-economy-tiburon/",
      sourceGroup: "foreign_media",
      bucketHint: "hot_news",
    }),
    false
  );
});
