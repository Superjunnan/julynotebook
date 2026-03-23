import test from "node:test";
import assert from "node:assert/strict";

import { getRunnableSources, normalizeSources } from "../../tools/digest.mjs";

test("getRunnableSources includes public auto sources and excludes restricted sources without input", () => {
  const sources = normalizeSources([
    {
      id: "techcrunch-ai",
      enabled: true,
      mode: "auto",
      ingestion_mode: "direct_feed",
      parser: "rss",
      url: "https://example.com",
      feed_url: "https://example.com/feed",
    },
    {
      id: "huggingface-posts",
      enabled: true,
      mode: "auto",
      ingestion_mode: "api_json",
      parser: "huggingface_posts_api",
      url: "https://huggingface.co/posts",
      api_url: "https://huggingface.co/api/posts?limit=80",
    },
    {
      id: "the-information-ai",
      enabled: true,
      mode: "restricted",
      ingestion_mode: "inbox_digest",
      parser: "inbox_yaml",
      url: "https://example.com/newsletter",
    },
  ]);

  const runnable = getRunnableSources(sources);
  assert.deepEqual(runnable.map((item) => item.id), ["techcrunch-ai", "huggingface-posts"]);
});

test("normalizeSources keeps restricted manual sources even when they do not have a public url yet", () => {
  const sources = normalizeSources([
    {
      id: "ali-tech",
      enabled: true,
      mode: "restricted",
      ingestion_mode: "manual_capture",
      parser: "local_yaml",
      url: "",
    },
  ]);

  assert.equal(sources.length, 1);
  assert.equal(sources[0].id, "ali-tech");
});

test("getRunnableSources keeps preferred evening domestic sources available to both editions", () => {
  const sources = normalizeSources([
    {
      id: "techcrunch-ai",
      enabled: true,
      mode: "auto",
      ingestion_mode: "direct_feed",
      parser: "rss",
      url: "https://example.com",
      feed_url: "https://example.com/feed",
    },
    {
      id: "aibase-news",
      enabled: true,
      mode: "auto",
      ingestion_mode: "page_scrape",
      parser: "generic_links",
      url: "https://example.com/aibase",
      preferred_in: "evening",
    },
    {
      id: "baidu-qianfan",
      enabled: true,
      mode: "auto",
      ingestion_mode: "page_scrape",
      parser: "generic_links",
      url: "https://example.com/baidu",
      preferred_in: "evening",
    },
    {
      id: "kimi",
      enabled: true,
      mode: "auto",
      ingestion_mode: "page_scrape",
      parser: "generic_links",
      url: "https://example.com/kimi",
      preferred_in: "both",
    },
  ]);

  const morning = getRunnableSources(sources, { edition: "morning" });
  const evening = getRunnableSources(sources, { edition: "evening" });

  assert.deepEqual(
    morning.map((item) => item.id),
    ["techcrunch-ai", "aibase-news", "baidu-qianfan", "kimi"]
  );
  assert.deepEqual(
    evening.map((item) => item.id),
    ["techcrunch-ai", "aibase-news", "baidu-qianfan", "kimi"]
  );
});
