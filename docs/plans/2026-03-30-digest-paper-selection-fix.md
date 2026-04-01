# Digest Paper Selection Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix digest paper selection so only real paper sources enter the paper pipeline, paper windows keep valid boundary-day items, and daily topic selection no longer forces paper slots.

**Architecture:** Separate "paper source" from generic `core_tech` editorial hints, then propagate that distinction through preprocessing, clustering, shortlist, and final rendering. Keep evening digest as a ranking preference for domestic AI signals instead of a hard filter, and allow the paper module to render an explicit empty state when no high-quality papers survive.

**Tech Stack:** Node.js, Hexo, `node:test`, digest pipeline in `tools/digest.mjs`, source registry in `sources.yml`

---

### Task 1: Lock failing tests for paper source classification and date boundaries

**Files:**
- Modify: `tests/digest/preprocess-pools.test.mjs`
- Modify: `tests/digest/ai-relevance-gate.test.mjs`

**Step 1: Write the failing test**

Add coverage for:
- `2026-03-27` paper entries remaining valid for the `2026-03-29` paper window
- community/newsletter entries with `bucketHint: "core_tech"` staying in the news pool unless `sourceGroup === "paper"` or the link is paper-like

**Step 2: Run test to verify it fails**

Run: `node --test tests/digest/preprocess-pools.test.mjs tests/digest/ai-relevance-gate.test.mjs`

Expected: FAIL because boundary-day papers are dropped and `core_tech` non-paper entries are still treated as papers.

### Task 2: Lock failing tests for empty paper states and shortlist quotas

**Files:**
- Modify: `tests/digest/rendering.test.mjs`
- Modify: `tests/digest/daily-post-ui-regression.test.mjs`

**Step 1: Write the failing test**

Add coverage for:
- digest rules allowing `coreTechMin: 0`
- markdown empty state rendering `当日无优质论文`
- shortlist quota helper counting `10` news topics independently from optional paper topics

**Step 2: Run test to verify it fails**

Run: `node --test tests/digest/rendering.test.mjs tests/digest/daily-post-ui-regression.test.mjs`

Expected: FAIL because rules still require 3 papers and the empty-state text is still the older wording.

### Task 3: Implement minimal source and classification fixes

**Files:**
- Modify: `sources.yml`
- Modify: `tools/digest.mjs`

**Step 1: Update source semantics**

Remove `bucket_hint: core_tech` from non-paper editorial/community/newsletter feeds that should not enter the paper pool by default.

**Step 2: Update classification helpers**

Change preprocessing and clustering paper detection to use true paper signals only:
- `sourceGroup === "paper"`
- arXiv/Hugging Face paper URLs
- explicit paper source metadata

**Step 3: Re-run targeted tests**

Run: `node --test tests/digest/preprocess-pools.test.mjs tests/digest/ai-relevance-gate.test.mjs`

Expected: PASS

### Task 4: Implement shortlist and evening-priority fixes

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/rendering.test.mjs`

**Step 1: Fix date-window handling**

Treat date-only publication values as day-level entries so `2026-03-27` remains eligible for the `2026-03-29` two-day paper window.

**Step 2: Fix shortlist quotas**

Make the topic shortlist target count only news topics, with optional paper topics selected separately and never forced.

**Step 3: Relax evening logic**

Keep domestic AI weighting as a score preference only; remove the hard deep-read exclusion for non-domestic material.

**Step 4: Re-run targeted tests**

Run: `node --test tests/digest/rendering.test.mjs`

Expected: PASS

### Task 5: Implement final paper rendering behavior

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `tests/digest/daily-post-ui-regression.test.mjs`

**Step 1: Update digest rules and fallback behavior**

Allow zero papers in final output, avoid force-filling from weak materials, and render `当日无优质论文` when no qualified papers remain.

**Step 2: Verify page-specific regression**

Run: `node --test tests/digest/daily-post-ui-regression.test.mjs`

Expected: PASS

### Task 6: Full verification and local site check

**Files:**
- No code changes expected

**Step 1: Run digest test suite**

Run: `npm run test:digest`

Expected: all digest tests pass

**Step 2: Build site**

Run: `npm run build`

Expected: Hexo generate exits 0

**Step 3: Start local server and verify page**

Run: `npm run server -- --port 4010`

Then request:
- `http://127.0.0.1:4010/2026/03/29/evening-digest-2026-03-29/`

Expected:
- paper module shows either real papers or `当日无优质论文`
- 10-topic shortlist logic no longer loses news coverage to forced paper slots
