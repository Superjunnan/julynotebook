import test from "node:test";
import assert from "node:assert/strict";

import { normalizeHuggingFaceApiItems } from "../../tools/digest.mjs";

test("normalizeHuggingFaceApiItems parses posts payload", () => {
  const source = {
    id: "huggingface-posts",
    name: "Hugging Face Posts",
    group: "community",
    display_name_zh: "Hugging Face 社区",
    bucket_hint: "ai_rumor",
    trust_tier: "medium",
    mode: "auto",
    weight: 6,
    parser: "huggingface_posts_api",
    include_url_patterns: ["huggingface.co/posts/"],
  };

  const payload = {
    socialPosts: [
      {
        url: "/posts/SeaWolf-AI/450372716500859",
        publishedAt: "2026-03-03T12:00:00.000Z",
        content: [
          { type: "text", value: "ALL Bench — Global AI Model Unified Leaderboard" },
        ],
      },
    ],
  };

  const items = normalizeHuggingFaceApiItems(source, payload);
  assert.equal(items.length, 1);
  assert.equal(items[0].source, "Hugging Face Posts");
  assert.equal(items[0].link, "https://huggingface.co/posts/SeaWolf-AI/450372716500859");
  assert.match(items[0].title, /ALL Bench/);
  assert.equal(items[0].bucketHint, "ai_rumor");
});

test("normalizeHuggingFaceApiItems parses papers payload", () => {
  const source = {
    id: "huggingface-papers",
    name: "Hugging Face Papers",
    group: "paper",
    display_name_zh: "Hugging Face 论文",
    bucket_hint: "core_tech",
    trust_tier: "high",
    mode: "auto",
    weight: 9,
    parser: "huggingface_papers_api",
    include_url_patterns: ["huggingface.co/papers/"],
  };

  const payload = [
    {
      title: "Reasoning as Gradient: Scaling MLE Agents Beyond Tree Search",
      summary: "A new method for scalable reasoning agents.",
      publishedAt: "2026-03-03T09:00:00.000Z",
      submittedOnDailyAt: "2026-03-04T00:00:00.000Z",
      paper: { id: "2603.01692" },
    },
  ];

  const items = normalizeHuggingFaceApiItems(source, payload);
  assert.equal(items.length, 1);
  assert.equal(items[0].source, "Hugging Face Papers");
  assert.equal(items[0].link, "https://huggingface.co/papers/2603.01692");
  assert.match(items[0].title, /Reasoning as Gradient/);
  assert.equal(items[0].pubDate, "2026-03-04T00:00:00.000Z");
  assert.equal(items[0].bucketHint, "core_tech");
});
