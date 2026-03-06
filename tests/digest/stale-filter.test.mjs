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
