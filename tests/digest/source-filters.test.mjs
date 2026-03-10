import test from "node:test";
import assert from "node:assert/strict";

import { shouldSkipScrapedLink, sourceMatchesFilters } from "../../tools/digest.mjs";

test("sourceMatchesFilters requires article-style paths when include_url_patterns are configured", () => {
  const source = {
    url: "https://www.theverge.com/ai-artificial-intelligence",
    include_url_patterns: ["/20"],
    include_keywords: ["ai", "artificial intelligence"],
    exclude_keywords: ["podcast"],
  };

  assert.equal(
    sourceMatchesFilters("https://www.theverge.com/ai-artificial-intelligence#content", "AI", source),
    false
  );
  assert.equal(
    sourceMatchesFilters("https://www.theverge.com/", "AI news homepage", source),
    false
  );
  assert.equal(
    sourceMatchesFilters("https://www.theverge.com/2026/03/04/example-story", "AI story", source),
    true
  );
  assert.equal(
    sourceMatchesFilters("https://x.com/sama/status/2028640354912923739?s=20", "AI", source),
    false
  );
});

test("sourceMatchesFilters avoids short keyword false positives like ai in failed", () => {
  const source = {
    url: "https://www.siliconvalley.com/",
    include_keywords: ["ai", "artificial intelligence"],
  };

  assert.equal(
    sourceMatchesFilters(
      "https://www.siliconvalley.com/2026/03/09/bay-area-hotel-marin-property-travel-loan-real-estate-economy-tiburon/",
      "Bay Area hotel is bought through foreclosure of failed property loan",
      source
    ),
    false
  );

  assert.equal(
    sourceMatchesFilters(
      "https://www.siliconvalley.com/2026/03/10/ai-startup-rolls-out-new-model/",
      "AI startup rolls out new model",
      source
    ),
    true
  );
});

test("shouldSkipScrapedLink filters same-page anchors and normalized list root links", () => {
  assert.equal(
    shouldSkipScrapedLink("https://ai.meta.com/blog/", "https://ai.meta.com/blog/#"),
    true
  );
  assert.equal(
    shouldSkipScrapedLink("https://ai.meta.com/blog/", "https://ai.meta.com/blog/"),
    true
  );
  assert.equal(
    shouldSkipScrapedLink("https://ai.meta.com/blog/", "https://ai.meta.com/blog/sam-audio/"),
    false
  );
});
