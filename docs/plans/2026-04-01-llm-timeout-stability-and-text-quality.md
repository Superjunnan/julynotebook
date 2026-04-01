# LLM Timeout Stability & Text Quality Fix

**Date:** 2026-04-01

**Goal:** Fix recurring LLM timeout/429 cascade failures on the Zhipu free tier, and fix three text rendering bugs that cause garbled headlines and truncated narratives.

---

## Background

Live digest runs on 2026-03-31 showed:
- `cluster_assignments_chunk` timing out repeatedly (485s for chunk 1/3)
- Final crash in `mergeTopicRowsWithLLM` (no adaptive split, no retry protection)
- `99-runtime-error.json`: `timeout_errors: 3, retry_count: 3`

Root cause analysis identified that:
1. The adaptive split mechanism already existed for clusters but NOT for topic merge
2. The `withRateLimitRetry` loop exhausted all 3 retries before the adaptive split could trigger — causing 8+ minute waits for a single chunk
3. `AbortError` from `AbortController` has `e.name === "AbortError"` but the message body says "This operation was aborted", causing `isTransientNetworkError` to miss it in some edge cases

Additionally, text rendering audits found:
- `clipToSentence` had an off-by-one (`punct + 2` for Chinese `。！？`) that pulled the next character into the result, creating garbage like `...额度。火。`
- `buildHotNewsEntryFromLLM` (and `buildFallbackHotNewsEntry`) capped insight to 36 chars via `clipToChars`, causing truncation at English word-boundary spaces (`"To B"` → `"To"`)
- `cleanTemplateNarrative` regex `[A-Za-z][A-Za-z0-9\s-]{1,18}$` would strip legitimate product names ("Claude Code", "To B", "GPT 4o") at sentence end

---

## Changes

### A — Timeout & Stability (`tools/digest.mjs`)

| Location | Change |
|---|---|
| `isTransientNetworkError` | Add `e?.name === "AbortError"` check to catch `AbortController`-triggered errors correctly |
| Constants (L213) | `TOPIC_MERGE_BATCH_SIZE` default 60→30; add `TOPIC_MERGE_ADAPTIVE_MIN_CHUNK_SIZE=10`, `TOPIC_MERGE_ADAPTIVE_MAX_DEPTH=3` |
| `withRateLimitRetry` | Support `options.maxRetries` override so callers can bypass global `LLM_MAX_RETRIES` |
| `requestClusterAssignmentsChunk` | Add 4th `retryOptions` param, pass through to `requestDigestLlmJson` |
| `requestClusterAssignmentsChunkWithAdaptiveSplit` | Inject `{ maxRetries: innerMaxRetries }` (default 0) into default `executeChunk` — first timeout immediately throws and triggers adaptive split rather than waiting for 3 full retry cycles |
| New: `mergeTopicRowsWithLLMAdaptiveSplit` | Adaptive split for topic merge path (mirrors `requestClusterAssignmentsChunkWithAdaptiveSplit`); merges results with `{ ...left, ...right }` |
| `mergeTopicKeysWithLLM` | Replace bare `mergeTopicRowsWithLLM(chunk, model, cache)` call with `mergeTopicRowsWithLLMAdaptiveSplit` |

### B — Text Quality (`tools/digest.mjs`)

| Location | Bug | Fix |
|---|---|---|
| `clipToSentence` L2869 | `punct + 2` for `。！？` pulled the next char into result → `...额度。火。` | Changed to `punct + 1` (Chinese punctuation is a single code unit) |
| `buildHotNewsEntryFromLLM` L3393-3394 | `clipToChars(insight, 36)` truncated at spaces in English phrases → `...与To` | Changed to `clipHeadline(insight, 56)` |
| `buildFallbackHotNewsEntry` L3295 | Same 36-char `clipToChars` pattern on fallback insight | Changed to `clipHeadline(..., 56)` |
| `cleanTemplateNarrative` L2936 | Regex `[A-Za-z][A-Za-z0-9\s-]{1,18}$` allowed spaces → stripped "Claude Code", "To B" | Removed `\s`, shortened to `{1,8}` — only catches short single-word dangling fragments |

### C — Tests (`tests/digest/llm-gateway.test.mjs`)

- Import `mergeTopicRowsWithLLMAdaptiveSplit`
- Add 4 new tests:
  1. `mergeTopicRowsWithLLMAdaptiveSplit` splits failed oversized chunk and merges object results
  2. Stops splitting at `minChunkSize` and rethrows
  3. Stops splitting at `maxDepth` and rethrows
  4. `withRateLimitRetry` with `maxRetries: 0` fails immediately on first error without retrying

---

## Test Results

```
# tests 136
# pass 135
# fail 0
# skipped 1   (live-zhipu-smoke, requires credentials)
```

## Live Run Verification (2026-04-01 evening digest)

```
live_calls: 9, retry_count: 0, timeout_errors: 0, rate_limit_errors: 0
cluster chunks: 3 (elapsed: 18s / 101s / 42s — all pass, no splits triggered)
```
