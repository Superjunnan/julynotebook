import test from "node:test";
import assert from "node:assert/strict";

import {
  dedupeCandidatesEarly,
  filterPreviouslyPublished,
} from "../../tools/digest.mjs";

test("dedupeCandidatesEarly preserves corroborating evidence metadata", () => {
  const deduped = dedupeCandidatesEarly([
    {
      title: "OpenAI launches new enterprise agent controls",
      link: "https://techcrunch.com/openai-agent-controls",
      pubDate: "2026-03-10T08:00:00.000Z",
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      weight: 6,
    },
    {
      title: "OpenAI launches new enterprise agent controls",
      link: "https://www.theverge.com/openai-agent-controls",
      pubDate: "2026-03-10T08:10:00.000Z",
      source: "The Verge AI",
      sourceGroup: "foreign_media",
      weight: 6,
    },
  ]);

  assert.equal(deduped.length, 1);
  assert.equal(deduped[0].evidenceCount, 2);
  assert.deepEqual(deduped[0].evidenceSources.sort(), ["TechCrunch AI", "The Verge AI"]);
});

test("filterPreviouslyPublished keeps follow-up coverage with new developments as evidence", () => {
  const items = [
    {
      title: "OpenAI expands agent controls after enterprise rollback",
      link: "https://techcrunch.com/openai-agent-controls-follow-up",
      pubDate: "2026-03-10",
      source: "TechCrunch AI",
      sourceGroup: "foreign_media",
      contentSnippet: "The follow-up adds enterprise rollback details and deployment scope.",
      followUpSignals: {
        newDevelopment: true,
        newSource: true,
      },
    },
  ];

  const filtered = filterPreviouslyPublished(
    items,
    {
      published: {
        "https://techcrunch.com/openai-agent-controls-follow-up": { at: "2026-03-09" },
      },
      publishedSignatures: {},
    },
    {
      runDate: "2026-03-10",
      keepFollowUpEvidence: true,
    }
  );

  assert.equal(filtered.length, 1);
});
