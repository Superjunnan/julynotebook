# Zhipu Adaptive Cluster Stability Design

**Problem**

The live run on `2026-03-31` showed that serialized Zhipu requests are working as intended, but `cluster_assignments_chunk` requests are still unstable on the free tier. The failure pattern is:

1. A large cluster chunk request runs for a long time.
2. The local request times out with `AbortError`.
3. The next retry is sent after a short cooldown while the provider may still be processing the previous request.
4. The retry then hits `HTTP 429 Too Many Requests`.

This means the remaining instability is caused by heavy single requests plus retry amplification, not by client-side concurrency.

**Approaches**

1. Reduce the global cluster batch size.
   This is simple but regresses the normal success path by increasing request count for every run.

2. Keep large batches on the normal path, but adapt only after failure.
   This preserves the fast path and only pays the cost when a heavy chunk actually proves unstable.

3. Increase timeout again without changing fallback behavior.
   This may help some runs, but it does not address the retry-after-timeout pattern that still produces `429`.

**Recommendation**

Use approach 2.

**Design**

- Keep `CLUSTER_BATCH_SIZE` unchanged for the initial cluster pass.
- Add timeout-aware retry cooldown so `AbortError` waits materially longer than the base pacing interval.
- When a cluster chunk still fails after the normal internal retry budget, split only that failed chunk into smaller subchunks and retry sequentially.
- Stop splitting once a minimum chunk size is reached; if the smallest chunk still fails, bubble the error.
- Add logs showing when adaptive splitting is triggered, how the chunk was split, and which depth is running.

**Why this should work**

- Successful heavy chunks still use the original large batch size.
- Failed chunks stop retrying the same oversized prompt forever.
- Timeout-driven cooldown becomes long enough to avoid immediate re-entry into the provider's rate window.
- The change is local to cluster assignment and does not disturb the rest of the digest pipeline.

**Testing**

- Unit test the timeout-aware retry delay calculation.
- Unit test adaptive cluster splitting with a stub executor that fails on the large chunk and succeeds on smaller chunks.
- Re-run targeted digest tests, the full digest test suite, site build, and local server accessibility checks.
