# GitHub Digest Build Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Harden the GitHub digest pipeline so transient Zhipu failures are retried conservatively, successful LLM work is persisted for reruns, and failed CI runs leave actionable diagnostics.

**Architecture:** Keep `tools/digest.mjs` as the core runtime, but add a CI-only wrapper and best-effort cache persistence hooks. Workflow changes should be limited to compatibility upgrades, calling the CI wrapper, and artifact upload on failure.

**Tech Stack:** Node.js, GitHub Actions, Hexo, Node test runner

---

### Task 1: Add Failing Tests For Remaining Hardening Gaps

**Files:**
- Modify: `tests/digest/llm-gateway.test.mjs`
- Create: `tests/digest/digest-ci-retry.test.mjs`
- Test: `tests/digest/*.test.mjs`

**Step 1: Add a failing persistence-hook test**

Verify that `requestDigestLlmJson` persists a successful live response when a cache persistence hook is attached.

**Step 2: Add failing CI retry classification tests**

Cover transient LLM/network failures vs. fatal configuration failures.

**Step 3: Run targeted tests and confirm failure**

Run:

```bash
node --test tests/digest/llm-gateway.test.mjs tests/digest/digest-ci-retry.test.mjs
```

Expected: FAIL because the hook / helper logic does not exist yet.

### Task 2: Implement Cache Persistence Hooks

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/llm-gateway.test.mjs`

**Step 1: Add cache persistence helpers**

Implement a non-enumerable persistence hook on the runtime cache and a best-effort save helper.

**Step 2: Persist LLM and daily cache writes**

Trigger best-effort cache flush after successful live LLM responses and after storing a daily summary cache entry.

**Step 3: Add fatal runtime error audit output**

Write `99-runtime-error.json` on top-level failure with stack and `llm_stats`.

### Task 3: Add CI Retry Wrapper

**Files:**
- Create: `tools/run-digest-with-retry.mjs`
- Modify: `package.json`
- Test: `tests/digest/digest-ci-retry.test.mjs`

**Step 1: Implement retry classification helpers**

Export pure helpers for retryable output detection and retry delay calculation.

**Step 2: Implement the wrapper runner**

Run `tools/digest.mjs`, stream logs, retry only for retryable transient failures, and stop on fatal failures.

**Step 3: Add npm script**

Expose a `digest:ci` command for workflow usage.

### Task 4: Update GitHub Workflows

**Files:**
- Modify: `.github/workflows/digest.yml`
- Modify: `.github/workflows/deploy.yml`

**Step 1: Upgrade action versions**

Use `actions/checkout@v5` and `actions/setup-node@v5`.

**Step 2: Switch digest workflow to the CI wrapper**

Replace direct `npm run digest` with `npm run digest:ci`.

**Step 3: Upload diagnostics on failure**

Upload digest reports and cache artifacts when the build fails.

### Task 5: Verify End-to-End

**Files:**
- Modify: `tools/digest.mjs`
- Create: `tools/run-digest-with-retry.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/digest.yml`
- Modify: `.github/workflows/deploy.yml`

**Step 1: Run targeted hardening tests**

```bash
node --test tests/digest/llm-gateway.test.mjs tests/digest/digest-ci-retry.test.mjs
```

Expected: PASS

**Step 2: Run the full digest suite**

```bash
npm run test:digest
```

Expected: PASS

**Step 3: Run the site build**

```bash
npx hexo clean && npx hexo generate
```

Expected: PASS

**Step 4: If credentials and quota allow, run the live smoke test**

```bash
npm run test:digest:live
```

Expected: PASS or SKIP only when live testing is not enabled
