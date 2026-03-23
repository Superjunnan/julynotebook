import test from "node:test";
import assert from "node:assert/strict";

import {
  buildPreclusterCandidateGroups,
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

test("filterPreviouslyPublished keeps follow-up coverage even if another edition already published it", () => {
  const items = [
    {
      title: "阿里云更新通义千问商业化计划",
      link: "https://example.com/qwen-follow-up",
      pubDate: "2026-03-20",
      source: "36Kr AI",
      sourceGroup: "domestic_media",
      contentSnippet: "新增财报口径与商业化目标说明。",
      followUpSignals: {
        newDevelopment: true,
      },
    },
  ];

  const filtered = filterPreviouslyPublished(
    items,
    {
      publishedByEdition: {
        morning: {
          "https://example.com/qwen-follow-up": { at: "2026-03-20", edition: "morning" },
        },
        evening: {},
      },
      publishedSignaturesByEdition: {
        morning: {},
        evening: {},
      },
    },
    {
      runDate: "2026-03-20",
      edition: "evening",
      keepFollowUpEvidence: true,
    }
  );

  assert.equal(filtered.length, 1);
});

test("buildPreclusterCandidateGroups groups same-day near-duplicate event cards before llm clustering", () => {
  const groups = buildPreclusterCandidateGroups([
    {
      candidate_id: 1,
      title: "OpenAI 发布企业级 Agent 控制台",
      snippet: "OpenAI 发布企业级 Agent 控制台。",
      pub_date: "2026-03-23",
      source: "TechCrunch AI",
      source_group: "foreign_media",
      link: "https://techcrunch.com/a",
    },
    {
      candidate_id: 2,
      title: "OpenAI 推出企业 Agent 控制台，支持团队治理",
      snippet: "媒体跟进报道 OpenAI 企业 Agent 控制台。",
      pub_date: "2026-03-23",
      source: "The Verge AI",
      source_group: "foreign_media",
      link: "https://theverge.com/b",
    },
  ]);

  assert.equal(groups.length, 1);
  assert.deepEqual(groups[0].member_ids.sort((a, b) => a - b), [1, 2]);
});

test("buildPreclusterCandidateGroups does not merge likely follow-up cards", () => {
  const groups = buildPreclusterCandidateGroups([
    {
      candidate_id: 1,
      title: "OpenAI 发布企业级 Agent 控制台",
      snippet: "OpenAI 发布企业级 Agent 控制台。",
      pub_date: "2026-03-23",
      source: "OpenAI News",
      source_group: "company_view",
      link: "https://openai.com/a",
    },
    {
      candidate_id: 2,
      title: "OpenAI 企业 Agent 控制台上线后新增收入与客户细节",
      snippet: "新增收入与客户 follow-up。",
      pub_date: "2026-03-23",
      source: "TechCrunch AI",
      source_group: "foreign_media",
      link: "https://techcrunch.com/b",
    },
  ]);

  assert.equal(groups.length, 2);
});
