# Zhipu Adaptive Cluster Stability Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Zhipu cluster assignment more stable on the free tier without shrinking the normal success-path cluster batch size.

**Architecture:** Keep the existing serialized LLM pacing and large initial cluster chunks. Add timeout-aware retry cooldowns and an adaptive split fallback that only applies after a cluster chunk exhausts its normal retry budget.

**Tech Stack:** Node.js, Hexo, `tools/digest.mjs`, Node test runner

---

### Task 1: Add failing tests for the new recovery behavior

**Files:**
- Modify: `tests/digest/llm-gateway.test.mjs`

**Step 1: Write the failing test**

- Add a test for a new retry-delay helper that proves timeout/abort errors wait longer than the normal interval.
- Add a test for a new adaptive cluster helper that:
  - first attempts a large chunk,
  - simulates failure,
  - splits the chunk,
  - retries smaller chunks successfully,
  - preserves all candidate assignments.

**Step 2: Run test to verify it fails**

Run: `node --test tests/digest/llm-gateway.test.mjs`

Expected: FAIL because the new helper exports and behaviors do not exist yet.

### Task 2: Implement the minimal adaptive retry logic

**Files:**
- Modify: `tools/digest.mjs`

**Step 1: Add retry-delay helper**

- Extract retry delay computation into a testable helper.
- Extend timeout/abort retries so their cooldown floor is materially higher than the default pacing interval.

**Step 2: Add adaptive cluster split helper**

- Wrap cluster assignment chunk execution in a helper that can catch retryable failures and recursively split the failed chunk.
- Keep the original chunk size on the first attempt.
- Add a minimum split size guard and structured logs.

**Step 3: Wire the helper into the cluster loop**

- Replace the direct `requestClusterAssignmentsChunk(...)` call with the adaptive helper.
- Keep existing partial fallback recovery for parse gaps and missing assignments.

### Task 3: Verify the implementation

**Files:**
- Verify: `tests/digest/llm-gateway.test.mjs`
- Verify: `tests/digest/*.test.mjs`

**Step 1: Run targeted tests**

Run: `node --test tests/digest/llm-gateway.test.mjs`

Expected: PASS

**Step 2: Run full digest tests**

Run: `npm run test:digest`

Expected: PASS with the existing live smoke skipped unless credentials are explicitly enabled.

**Step 3: Run build**

Run: `npm run build`

Expected: PASS

**Step 4: Run local server and request pages**

Run: `npm run server -- --port 4011`

Then verify:
- `curl -I http://127.0.0.1:4011/julynotebook/`
- `curl -I http://127.0.0.1:4011/julynotebook/2026/03/23/digest-2026-03-23/`

Expected: `200 OK`
