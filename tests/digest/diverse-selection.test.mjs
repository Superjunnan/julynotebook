import test from "node:test";
import assert from "node:assert/strict";

import { selectDiverseCandidates } from "../../tools/digest.mjs";

test("selectDiverseCandidates reserves room for hot news and rumor candidates", () => {
  const selected = selectDiverseCandidates(
    [
      ...Array.from({ length: 10 }, (_, index) => ({
        title: `paper-${index}`,
        score: 100 - index,
        bucketHint: "core_tech",
      })),
      ...Array.from({ length: 5 }, (_, index) => ({
        title: `news-${index}`,
        score: 20 - index,
        bucketHint: "hot_news",
      })),
      ...Array.from({ length: 3 }, (_, index) => ({
        title: `rumor-${index}`,
        score: 10 - index,
        bucketHint: "ai_rumor",
      })),
    ],
    9
  );

  const buckets = new Set(selected.map((item) => item.bucketHint));
  assert.equal(buckets.has("hot_news"), true);
  assert.equal(buckets.has("core_tech"), true);
  assert.equal(buckets.has("ai_rumor"), true);
});
