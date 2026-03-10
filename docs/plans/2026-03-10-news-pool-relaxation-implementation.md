# News Pool Relaxation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce false negatives in the news pipeline by relaxing early filtering, separating news and paper pools, and preserving corroborating evidence for topic-level hot-news selection.

**Architecture:** Keep the existing fetch -> preprocess -> clustering -> shortlist -> deep-read pipeline, but split candidates into independent news and paper pools before clustering. Move history suppression from a preprocess-stage hard filter into an evidence-aware layer, preserve duplicate evidence metadata, and add audit output so the user can see where candidates are lost by pool.

**Tech Stack:** Node.js, Hexo, native `node:test`, existing `tools/digest.mjs` audit reports.

---

### Task 1: Lock the new preprocess policy with failing tests

**Files:**
- Modify: `tests/digest/topic-ranking.test.mjs`
- Modify: `tests/digest/news-buckets.test.mjs`
- Create: `tests/digest/preprocess-pools.test.mjs`
- Create: `tests/digest/history-evidence.test.mjs`

**Step 1: Write the failing test**

Add tests that prove:
- news and paper candidates are split into separate pools
- news candidates can survive missing publish dates when source trust is high
- previously published stories with new developments can remain as evidence candidates
- duplicate news evidence is preserved in metadata instead of being fully discarded

**Step 2: Run test to verify it fails**

Run:

```bash
npm run test:digest -- tests/digest/preprocess-pools.test.mjs tests/digest/history-evidence.test.mjs tests/digest/news-buckets.test.mjs tests/digest/topic-ranking.test.mjs
```

Expected: FAIL on at least one new expectation because the current preprocess path drops these cases.

**Step 3: Write minimal implementation**

Do not change production code yet. Only add the tests and ensure they describe the approved policy.

**Step 4: Run test to verify it fails**

Run the same command again and confirm deterministic failure.

**Step 5: Commit**

```bash
git add tests/digest/preprocess-pools.test.mjs tests/digest/history-evidence.test.mjs tests/digest/news-buckets.test.mjs tests/digest/topic-ranking.test.mjs
git commit -m "test: cover relaxed news preprocess policy"
```

### Task 2: Split news and paper pools in preprocess and cluster input

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/preprocess-pools.test.mjs`

**Step 1: Write the failing test**

Use `tests/digest/preprocess-pools.test.mjs` as the red state.

**Step 2: Run test to verify it fails**

Run:

```bash
npm run test:digest -- tests/digest/preprocess-pools.test.mjs
```

Expected: FAIL because news and paper candidates still share a single pipeline and a single cluster cap path.

**Step 3: Write minimal implementation**

Implement:
- explicit `newsCandidates` and `paperCandidates`
- pool-specific freshness handling
- pool-specific cluster caps and audit counts
- recombination only after pool-level preprocessing

**Step 4: Run test to verify it passes**

Run:

```bash
npm run test:digest -- tests/digest/preprocess-pools.test.mjs
```

Expected: PASS.

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/preprocess-pools.test.mjs
git commit -m "feat: split digest preprocess into news and paper pools"
```

### Task 3: Preserve evidence for follow-up reporting and duplicate corroboration

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/history-evidence.test.mjs`

**Step 1: Write the failing test**

Use `tests/digest/history-evidence.test.mjs` as the red state.

**Step 2: Run test to verify it fails**

Run:

```bash
npm run test:digest -- tests/digest/history-evidence.test.mjs
```

Expected: FAIL because history filtering still removes follow-up evidence and early dedupe still discards corroborating metadata.

**Step 3: Write minimal implementation**

Implement:
- evidence-aware dedupe metadata
- history retention rules that keep candidates with new developments or new source evidence
- final output dedupe separated from topic evidence eligibility

**Step 4: Run test to verify it passes**

Run:

```bash
npm run test:digest -- tests/digest/history-evidence.test.mjs
```

Expected: PASS.

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/history-evidence.test.mjs
git commit -m "feat: preserve topic evidence for follow-up reporting"
```

### Task 4: Verify full pipeline behavior and audit output

**Files:**
- Modify: `tools/digest.mjs` (only if audit fields are missing)
- Update generated artifacts under: `data/digest-reports/2026-03-10/`
- Update generated post: `source/_posts/digest-2026-03-10.md`

**Step 1: Write the failing test**

If audit shape changes, add a focused test. Otherwise use the rerun as the regression check.

**Step 2: Run test to verify it fails**

Inspect current audit output and confirm it does not yet expose separate pool losses or evidence retention counts.

**Step 3: Write minimal implementation**

Add audit fields for:
- news/paper counts before and after each gate
- retained follow-up evidence count
- missing-date news retained count
- evidence-merged duplicate count

**Step 4: Run verification**

Run:

```bash
npm run test:digest -- --runInBand
DIGEST_DATE=2026-03-10 DIGEST_FORCE_LLM=1 DIGEST_TIMEOUT_ZHIPU_MS=240000 npm run digest
npm run build
```

Expected:
- digest tests pass
- rerun completes successfully
- `03-cluster-input.json` shows a materially larger news input pool than the current baseline
- audit output explains retained vs dropped news evidence by stage
- build exits 0

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/*.test.mjs data/digest-reports/2026-03-10 source/_posts/digest-2026-03-10.md
git commit -m "chore: verify relaxed news pipeline with 2026-03-10 rerun"
```
