import test from "node:test";
import assert from "node:assert/strict";

import {
  buildCandidateSignature,
  dedupeCandidatesEarly,
  filterPreviouslyPublished,
  normalizeCandidateUrl,
} from "../../tools/digest.mjs";

test("normalizeCandidateUrl strips common tracking params", () => {
  const normalized = normalizeCandidateUrl(
    "https://example.com/post?id=1&utm_source=x&utm_medium=y&fbclid=abc#section"
  );
  assert.equal(normalized, "https://example.com/post?id=1");
});

test("dedupeCandidatesEarly merges same url with tracking variants", () => {
  const deduped = dedupeCandidatesEarly([
    {
      title: "OpenAI launches GPT-5.4",
      link: "https://example.com/post?id=1&utm_source=newsletter",
      pubDate: "2026-03-04T10:00:00.000Z",
      weight: 6,
    },
    {
      title: "OpenAI launches GPT-5.4",
      link: "https://example.com/post?id=1",
      pubDate: "2026-03-04T11:00:00.000Z",
      weight: 6,
    },
  ]);

  assert.equal(deduped.length, 1);
  assert.equal(normalizeCandidateUrl(deduped[0].link), "https://example.com/post?id=1");
});

test("filterPreviouslyPublished drops repeated signature even if link changed", () => {
  const item = {
    title: "OpenAI launches GPT-5.4 with thinking mode",
    link: "https://news.example.com/openai-gpt54",
    pubDate: "2026-03-04",
  };
  const signature = buildCandidateSignature(item);

  const filtered = filterPreviouslyPublished(
    [item],
    {
      published: {},
      publishedSignatures: {
        [signature]: { at: "2026-03-03" },
      },
    },
    { runDate: "2026-03-04" }
  );

  assert.equal(filtered.length, 0);
});
