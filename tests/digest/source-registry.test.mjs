import test from "node:test";
import assert from "node:assert/strict";

import { loadSourceRegistry } from "../../tools/intel/source-registry.mjs";

test("source registry contains all required user-requested sources", () => {
  const registry = loadSourceRegistry(new URL("../../sources.yml", import.meta.url));
  const ids = new Set(registry.sources.map((source) => source.id));

  [
    "techcrunch-ai",
    "siliconvalley-ai",
    "the-verge-ai",
    "openai-news",
    "anthropic-news",
    "google-ai-blog",
    "deepmind-blog",
    "meta-engineering-ai",
    "nvidia-generative-ai",
    "mit-technology-review-ai",
    "ars-technica-ai",
    "wired-ai",
    "media-404-ai",
    "aibase-news",
    "36kr-ai",
    "aitnt-news",
    "leiphone-ai",
    "jiqizhixin-articles",
    "volcengine-articles",
    "stratechery",
    "ben-evans-newsletter",
    "the-information-ai",
    "techcrunch-newsletter",
    "import-ai",
    "tldr-ai",
    "ai-breakfast",
    "the-neuron",
    "not-a-bot",
    "the-sequence",
    "bens-bites",
    "latent-space",
    "interconnects",
    "ai-snake-oil",
    "one-useful-thing",
    "simon-willison-weblog",
    "elon-musk",
    "andrej-karpathy",
    "ethan-mollick",
    "dan-shipper",
    "gabrie",
    "justine-moore",
    "greg-isenberg",
    "lenny-podcast",
    "minimax",
    "kimi",
    "zhipu",
    "deepseek",
    "seed",
    "ali-tech",
    "stepfun",
    "baidu-qianfan",
    "tencent-hunyuan",
    "xiaomi-hyperai",
    "qwen-blog",
    "qbitai-news",
    "ifanr-brief",
    "hacker-news-ai",
    "huggingface-posts",
    "huggingface-papers",
    "arxiv-cs-ai",
    "aitnt-papers",
  ].forEach((id) => assert.equal(ids.has(id), true, `${id} missing`));
});

test("official company channels are configured for auto crawling when available", () => {
  const registry = loadSourceRegistry(new URL("../../sources.yml", import.meta.url));
  const expectedAuto = [
    "minimax",
    "kimi",
    "zhipu",
    "deepseek",
    "seed",
    "ali-tech",
    "baidu-qianfan",
    "tencent-hunyuan",
    "qwen-blog",
  ];

  for (const id of expectedAuto) {
    const source = registry.sources.find((item) => item.id === id);
    assert.equal(Boolean(source), true, `${id} missing`);
    assert.equal(source?.enabled, true, `${id} should be enabled`);
    assert.equal(source?.mode, "auto", `${id} should be auto`);
    assert.equal(source?.ingestion_mode, "page_scrape", `${id} should use page_scrape`);
    assert.equal(Boolean(source?.url), true, `${id} missing url`);
  }
});

test("domestic evening digest sources retain evening preference metadata", () => {
  const registry = loadSourceRegistry(new URL("../../sources.yml", import.meta.url));
  const eveningPreferredIds = new Set(
    registry.sources
      .filter((source) => source.preferred_in === "evening" || source.preferred_in === "both")
      .map((source) => source.id)
  );

  [
    "aibase-news",
    "36kr-ai",
    "aitnt-news",
    "leiphone-ai",
    "jiqizhixin-articles",
    "volcengine-articles",
    "minimax",
    "kimi",
    "zhipu",
    "deepseek",
    "seed",
    "ali-tech",
    "stepfun",
    "baidu-qianfan",
    "tencent-hunyuan",
    "xiaomi-hyperai",
    "qwen-blog",
    "qbitai-news",
    "ifanr-brief",
  ].forEach((id) => assert.equal(eveningPreferredIds.has(id), true, `${id} should prefer evening digest`));
});

test("new domestic public sources are runnable for evening digest", () => {
  const registry = loadSourceRegistry(new URL("../../sources.yml", import.meta.url));
  const expected = {
    "leiphone-ai": "page_scrape",
    "jiqizhixin-articles": "page_scrape",
    "volcengine-articles": "page_scrape",
    "qbitai-news": "direct_feed",
    "ifanr-brief": "page_scrape",
  };

  for (const [id, mode] of Object.entries(expected)) {
    const source = registry.sources.find((item) => item.id === id);
    assert.equal(Boolean(source), true, `${id} missing`);
    assert.equal(source?.enabled, true, `${id} should be enabled`);
    assert.equal(source?.mode, "auto", `${id} should be auto`);
    assert.equal(source?.ingestion_mode, mode, `${id} should use ${mode}`);
    assert.equal(source?.preferred_in, "evening", `${id} should prefer evening digest`);
    if (mode === "direct_feed") {
      assert.equal(Boolean(source?.feed_url), true, `${id} missing feed_url`);
    } else {
      assert.equal(Boolean(source?.url), true, `${id} missing url`);
    }
  }
});

test("duplicate newsletter source is disabled by default", () => {
  const registry = loadSourceRegistry(new URL("../../sources.yml", import.meta.url));
  const techCrunchNewsletter = registry.sources.find((item) => item.id === "techcrunch-newsletter");
  assert.equal(Boolean(techCrunchNewsletter), true, "techcrunch-newsletter missing");
  assert.equal(techCrunchNewsletter?.enabled, false);
});

test("source registry keeps huggingface api configuration", () => {
  const registry = loadSourceRegistry(new URL("../../sources.yml", import.meta.url));
  const posts = registry.sources.find((source) => source.id === "huggingface-posts");
  const papers = registry.sources.find((source) => source.id === "huggingface-papers");

  assert.equal(posts?.ingestion_mode, "api_json");
  assert.equal(posts?.parser, "huggingface_posts_api");
  assert.equal(Boolean(posts?.api_url), true);

  assert.equal(papers?.ingestion_mode, "api_json");
  assert.equal(papers?.parser, "huggingface_papers_api");
  assert.equal(Boolean(papers?.api_url), true);
});

test("reference-site public sources are runnable in auto mode", () => {
  const registry = loadSourceRegistry(new URL("../../sources.yml", import.meta.url));
  const requiredPublicIds = [
    "openai-news",
    "anthropic-news",
    "google-ai-blog",
    "deepmind-blog",
    "meta-engineering-ai",
    "nvidia-generative-ai",
    "mit-technology-review-ai",
    "ars-technica-ai",
    "wired-ai",
    "media-404-ai",
    "hacker-news-ai",
    "bens-bites",
    "latent-space",
    "interconnects",
    "ai-snake-oil",
    "one-useful-thing",
    "simon-willison-weblog",
  ];

  for (const id of requiredPublicIds) {
    const source = registry.sources.find((item) => item.id === id);
    assert.equal(Boolean(source), true, `${id} missing`);
    assert.equal(source?.enabled, true, `${id} should be enabled`);
    assert.equal(source?.mode, "auto", `${id} should be auto`);
    assert.match(
      source?.ingestion_mode || "",
      /^(direct_feed|page_scrape)$/,
      `${id} ingestion mode not runnable`
    );

    if (source?.ingestion_mode === "direct_feed") {
      assert.equal(Boolean(source?.feed_url), true, `${id} missing feed_url`);
    }
  }
});
