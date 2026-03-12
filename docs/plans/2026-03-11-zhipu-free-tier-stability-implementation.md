# Zhipu Free-Tier Stability Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Zhipu free-tier usage stable for digest generation and optional live tests by adding a unified LLM gateway, deterministic cache reuse, strict live-test queueing, and resumable execution.

**Architecture:** All Zhipu calls will route through one cache-aware gateway in `tools/digest.mjs`. The gateway will own pacing, retry handling, deterministic cache keys, and runtime metrics. Existing digest steps will keep their behavior, but they will stop calling the raw API directly.

**Tech Stack:** Node.js, `tools/digest.mjs`, Node test runner, GitHub Actions

---

### Task 1: Design Docs

**Files:**
- Create: `docs/plans/2026-03-11-zhipu-free-tier-stability-design.md`
- Create: `docs/plans/2026-03-11-zhipu-free-tier-stability-implementation.md`

**Step 1: Save the approved design**

Write the design doc describing queueing, cache reuse, live-test isolation, and workflow updates.

**Step 2: Save this implementation plan**

Write a stepwise plan that can be executed with TDD.

### Task 2: Write Failing LLM Gateway Tests

**Files:**
- Create: `tests/digest/llm-gateway.test.mjs`

**Step 1: Write a failing cache-key stability test**

Cover deterministic hash generation for equivalent request payloads.

**Step 2: Run it and verify failure**

Run:

```bash
node --test tests/digest/llm-gateway.test.mjs
```

Expected: missing export or assertion failure.

**Step 3: Add failing cache-hit and retry tests**

Cover:

- cached response skips live executor
- successful live call writes cache
- transient error retries and then succeeds

### Task 3: Implement Unified LLM Gateway

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/llm-gateway.test.mjs`

**Step 1: Add deterministic cache helpers**

Implement stable stringify, cache key generation, and `cache.llm` normalization.

**Step 2: Add runtime metrics and extended transient-error detection**

Track cache hits/misses, retries, and transient failures.

**Step 3: Implement the cache-aware gateway**

Add a reusable function that:

- computes cache key
- returns cached content when present
- otherwise executes live call with retry
- stores successful result

**Step 4: Run targeted tests**

Run:

```bash
node --test tests/digest/llm-gateway.test.mjs
```

Expected: PASS

### Task 4: Rewire Digest LLM Call Sites

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/*.test.mjs`

**Step 1: Route clustering and topic-merge calls through the gateway**

Update cluster chunk, merge, singleton recluster, and shortlist requests.

**Step 2: Route final summary and ref translation through the gateway**

Remove redundant nested retries where the gateway now owns retry behavior.

**Step 3: Persist and prune `cache.llm`**

Keep retention bounded and include LLM metrics in audit output.

### Task 5: Add Strict Live-Test Entry

**Files:**
- Create: `tests/digest/live-zhipu-smoke.test.mjs`
- Modify: `package.json`

**Step 1: Add gated live smoke test**

The test should skip unless `DIGEST_RUN_LIVE_LLM_TESTS=1` and `ZHIPU_API_KEY` exist.

**Step 2: Add strict-queue npm script**

Provide a script that forces serial queueing for live tests.

### Task 6: Update Workflow Defaults

**Files:**
- Modify: `.github/workflows/digest.yml`

**Step 1: Set explicit production pacing env**

Set:

- `DIGEST_LLM_MAX_CONCURRENCY=2`
- `DIGEST_LLM_CACHE_RETENTION_DAYS`

Keep live tests out of default CI.

### Task 7: Verify End-to-End

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/digest.yml`
- Create: `tests/digest/llm-gateway.test.mjs`
- Create: `tests/digest/live-zhipu-smoke.test.mjs`

**Step 1: Run the full digest suite**

```bash
npm run test:digest
```

Expected: PASS

**Step 2: Run targeted smoke verification**

```bash
node --test tests/digest/llm-gateway.test.mjs
```

Expected: PASS

**Step 3: If credentials are available, run live strict-queue smoke test**

```bash
npm run test:digest:live
```

Expected: PASS or SKIP when credentials / flag are absent
