import test from "node:test";
import assert from "node:assert/strict";

import { filterPreviouslyPublished } from "../../tools/digest.mjs";

test("filterPreviouslyPublished removes items already published recently", () => {
  const filtered = filterPreviouslyPublished(
    [
      { title: "OpenAI ships Operator API", link: "https://example.com/op", pubDate: "2026-03-02" },
      { title: "Fresh item", link: "https://example.com/new", pubDate: "2026-03-03" },
    ],
    {
      published: {
        "https://example.com/op": { at: "2026-03-02" },
      },
    }
  );

  assert.deepEqual(filtered.map((item) => item.link), ["https://example.com/new"]);
});

test("filterPreviouslyPublished keeps same-day items during rerun", () => {
  const filtered = filterPreviouslyPublished(
    [
      { title: "Same day item", link: "https://example.com/same", pubDate: "2026-03-04" },
      { title: "Old item", link: "https://example.com/old", pubDate: "2026-03-03" },
    ],
    {
      published: {
        "https://example.com/same": { at: "2026-03-04" },
        "https://example.com/old": { at: "2026-03-01" },
      },
    },
    { runDate: "2026-03-04" }
  );

  assert.deepEqual(filtered.map((item) => item.link), ["https://example.com/same"]);
});

test("filterPreviouslyPublished removes same-day items already published by another edition", () => {
  const filtered = filterPreviouslyPublished(
    [
      { title: "Same topic in evening", link: "https://example.com/same", pubDate: "2026-03-04" },
    ],
    {
      publishedByEdition: {
        morning: {
          "https://example.com/same": { at: "2026-03-04", edition: "morning" },
        },
        evening: {},
      },
      publishedSignaturesByEdition: {
        morning: {},
        evening: {},
      },
    },
    { runDate: "2026-03-04", edition: "evening" }
  );

  assert.deepEqual(filtered, []);
});

test("filterPreviouslyPublished removes same-day cross-edition repeat even with corroborating evidence", () => {
  const filtered = filterPreviouslyPublished(
    [
      {
        title: "OpenAI launches new voice intelligence features in its API",
        link: "https://example.com/voice",
        pubDate: "2026-05-08",
        evidenceCount: 2,
        evidenceSources: ["TechCrunch AI", "The Verge AI"],
      },
    ],
    {
      publishedByEdition: {
        morning: {
          "https://example.com/voice": { at: "2026-05-08", edition: "morning" },
        },
        evening: {},
      },
      publishedSignaturesByEdition: {
        morning: {},
        evening: {},
      },
    },
    { runDate: "2026-05-08", edition: "evening", keepFollowUpEvidence: true }
  );

  assert.deepEqual(filtered, []);
});

test("filterPreviouslyPublished removes prior cross-edition repeat when strict history filtering is used", () => {
  const filtered = filterPreviouslyPublished(
    [
      {
        title: "Anthropic files IPO documents",
        link: "https://example.com/anthropic-ipo-follow",
        pubDate: "2026-06-02T01:00:00.000Z",
        evidenceCount: 3,
        evidenceSources: ["TechCrunch AI", "The Verge AI", "36Kr AI"],
        followUpSignals: {
          newDevelopment: true,
        },
      },
    ],
    {
      publishedByEdition: {
        morning: {},
        evening: {
          "https://example.com/anthropic-ipo-follow": { at: "2026-06-01", edition: "evening" },
        },
      },
      publishedSignaturesByEdition: {
        morning: {},
        evening: {},
      },
    },
    { runDate: "2026-06-02", edition: "morning", keepFollowUpEvidence: false }
  );

  assert.deepEqual(filtered, []);
});

test("filterPreviouslyPublished can still keep explicit follow-up when caller opts in", () => {
  const filtered = filterPreviouslyPublished(
    [
      {
        title: "Anthropic files IPO documents with new valuation details",
        link: "https://example.com/anthropic-ipo-follow",
        pubDate: "2026-06-02T01:00:00.000Z",
        contentSnippet: "New valuation details were added after the first report.",
        followUpSignals: {
          newDevelopment: true,
        },
      },
    ],
    {
      publishedByEdition: {
        morning: {},
        evening: {
          "https://example.com/anthropic-ipo-follow": { at: "2026-06-01", edition: "evening" },
        },
      },
      publishedSignaturesByEdition: {
        morning: {},
        evening: {},
      },
    },
    { runDate: "2026-06-02", edition: "morning", keepFollowUpEvidence: true }
  );

  assert.equal(filtered.length, 1);
});

test("filterPreviouslyPublished removes same-day cross-edition topic repeat from daily cache", () => {
  const filtered = filterPreviouslyPublished(
    [
      {
        title: "OpenAI 推出 GPT-Realtime-2 语音模型",
        link: "https://news.example.com/openai-gpt-realtime-2",
        pubDate: "2026-05-08",
        contentSnippet: "OpenAI 在 API 中新增语音智能功能，发布 GPT-Realtime-2。",
      },
    ],
    {
      daily: {
        "morning:2026-05-08": {
          at: "2026-05-08",
          daily: {
            hotNews: [
              {
                insight: "OpenAI发布GPT-Realtime-2语音模型",
                narrative: "OpenAI周四宣布API将新增语音智能功能，并推出GPT-Realtime-2模型。",
              },
            ],
            otherNews: [],
          },
        },
      },
      publishedByEdition: { morning: {}, evening: {} },
      publishedSignaturesByEdition: { morning: {}, evening: {} },
    },
    { runDate: "2026-05-08", edition: "evening", keepFollowUpEvidence: true }
  );

  assert.deepEqual(filtered, []);
});
