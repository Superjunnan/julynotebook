# Topic-Tiered Digest Selection Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework digest topic selection so `重点资讯` only contains topic-level multi-source narratives, while `其他快讯` can include high-value single-source items such as official or community posts.

**Architecture:** Keep the existing fetch, preprocess, clustering, and deep-read pipeline, but add an explicit topic qualification layer after clustering and before final rendering. Separate `hot news qualification` from `quick news qualification`, and treat community items as eligible for quick news when their value is high enough instead of downgrading them globally.

**Tech Stack:** Node.js, Hexo, native `node:test`, existing `tools/digest.mjs` audit pipeline.

---

### Task 1: Lock the new output policy with failing tests

**Files:**
- Modify: `tests/digest/news-buckets.test.mjs`
- Modify: `tests/digest/topic-ranking.test.mjs`
- Create: `tests/digest/topic-qualification.test.mjs`

**Step 1: Write the failing test**

Add tests that prove:
- multi-source news topics qualify for `重点资讯`
- single-source community items can survive as `其他快讯` when value is high
- low-value community tips do not occupy `重点资讯`
- official single-source fallback is only allowed when no hot-news-qualified topic exists

**Step 2: Run test to verify it fails**

Run:

```bash
npm run test:digest -- tests/digest/topic-qualification.test.mjs tests/digest/news-buckets.test.mjs tests/digest/topic-ranking.test.mjs
```

Expected: FAIL on at least one new qualification expectation.

**Step 3: Write minimal implementation**

Do not change rendering yet. Only add tests and confirm the current behavior does not satisfy them.

**Step 4: Run test to verify it fails**

Run the same command again and confirm the failure is deterministic.

**Step 5: Commit**

```bash
git add tests/digest/topic-qualification.test.mjs tests/digest/news-buckets.test.mjs tests/digest/topic-ranking.test.mjs
git commit -m "test: cover topic-tiered digest selection"
```

### Task 2: Implement topic qualification and tiered selection

**Files:**
- Modify: `tools/digest.mjs`

**Step 1: Write the failing test**

Use the tests from Task 1 as the red state. Do not add production code before confirming failure.

**Step 2: Run test to verify it fails**

Run:

```bash
npm run test:digest -- tests/digest/topic-qualification.test.mjs tests/digest/news-buckets.test.mjs tests/digest/topic-ranking.test.mjs
```

Expected: FAIL with missing qualification behavior.

**Step 3: Write minimal implementation**

Implement:
- topic-level qualification helpers for `hot` vs `quick`
- official single-source fallback only when no hot-qualified topic remains
- multi-dimensional scoring inputs for authority, officiality, freshness, diversity, and impact proxies
- final normalization that promotes only qualified hot topics into `hotNews`
- quick-news backfill that allows high-value single-source official/community items

Keep the existing LLM summarization contract, but post-process the output against the new topic qualification rules.

**Step 4: Run test to verify it passes**

Run:

```bash
npm run test:digest -- tests/digest/topic-qualification.test.mjs tests/digest/news-buckets.test.mjs tests/digest/topic-ranking.test.mjs
```

Expected: PASS.

**Step 5: Commit**

```bash
git add tools/digest.mjs
git commit -m "feat: tier digest topics into hot news and quick news"
```

### Task 3: Verify with a real digest rerun and audit output

**Files:**
- Modify: `tools/digest.mjs` (only if audit fields are missing)
- Update generated artifacts under: `data/digest-reports/2026-03-10/`
- Update generated post: `source/_posts/digest-2026-03-10.md`

**Step 1: Write the failing test**

Use the real rerun as the regression check: the result should not place low-value single-source community tips into `重点资讯`, and should preserve only high-value single-source items in `其他快讯` if no stronger multi-source topic exists.

**Step 2: Run test to verify it fails**

If audit fields are added, write a focused unit test first; otherwise treat the real rerun diff as the failing state and inspect `05-topic-shortlist.json` and `07-final-selection.json`.

**Step 3: Write minimal implementation**

Add any missing audit fields needed to explain:
- hot-qualified topic count
- quick-qualified topic count
- whether official single-source fallback triggered
- which selected topics were downgraded from hot to quick

**Step 4: Run verification**

Run:

```bash
npm run test:digest -- --runInBand
DIGEST_DATE=2026-03-10 npm run digest
npm run build
```

Expected:
- digest tests all pass
- rerun completes successfully
- generated article and audit files reflect the new tiering logic
- build exits 0

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/*.test.mjs data/digest-reports/2026-03-10 source/_posts/digest-2026-03-10.md
git commit -m "chore: verify tiered digest selection with 2026-03-10 rerun"
```
