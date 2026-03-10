# News Pool Relaxation And Topic Evidence Design

**Status:** Approved for implementation on 2026-03-10

**Problem**

The current digest pipeline removes too many news candidates before topic clustering. On sparse news days this prevents `重点资讯` from forming even when the broader web contains multiple reports or meaningful follow-up coverage.

The main failure modes are:
- news and papers share the same preprocess and clustering path, so paper volume overwhelms news volume
- `page_scrape` and `api_json` items without a resolved publish date are dropped before deeper enrichment
- history filtering runs before topic qualification, which suppresses ongoing stories with new developments
- early dedupe keeps one representative item but discards corroborating evidence instead of preserving it for topic scoring

**Goals**

- Preserve more legitimate news evidence before clustering
- Separate news and paper pools so papers cannot crowd out news topics
- Allow ongoing stories with new developments to remain eligible for today's topic construction
- Keep `重点资讯` as topic-level multi-source narratives
- Keep final output non-redundant even when evidence retention is loosened

**Non-Goals**

- Rewriting the LLM summarization contract from scratch
- Changing the current frontend or menu code
- Removing all filtering safeguards; stale and clearly irrelevant items should still be filtered

## Design

### 1. Split The Candidate Pipeline By Content Type

After fetch and AI relevance filtering, split candidates into:
- `newsCandidates`
- `paperCandidates`

Each pool gets its own preprocessing rules:
- news uses relaxed recency handling and evidence-preserving history logic
- papers keep the stricter freshness gate

The two pools are only recombined after pool-level scoring and pool-level caps are applied.

### 2. Relax News Freshness Without Removing Freshness Scoring

News should move from a hard `lookback_days=2` gate to a softer policy:
- allow a wider lookback window for news
- continue to score newer news higher
- still reject obviously stale material

This keeps follow-up coverage alive while preserving a freshness preference.

### 3. Do Not Hard-Drop High-Value News With Missing Dates

For high-trust news sources, missing publish dates should trigger a fallback path:
- try URL/title inference
- if missing, optionally fetch article HTML early and extract date from metadata
- if still missing, keep the item in a lower-confidence bucket instead of deleting it immediately

Papers can remain stricter because paper timestamps are usually available and comparable.

### 4. Separate Evidence Retention From Output Deduplication

Current history filtering happens too early. Replace it with two layers:

- `evidence retention`
  - used for topic construction and cross-source confirmation
  - allows previously reported stories to remain in the pool if they represent new reporting, a new source, or a new development

- `output deduplication`
  - applied only at final rendering time
  - prevents publishing the same unchanged story again

This preserves topic-level evidence without sacrificing daily output quality.

### 5. Preserve Corroborating Evidence During Early Dedupe

Early dedupe should stop throwing away all duplicates. Instead it should:
- keep a representative item
- attach evidence metadata:
  - `evidence_count`
  - `evidence_links`
  - `evidence_sources`
  - `evidence_source_groups`

Topic scoring can then use actual cross-source evidence instead of relying only on post-cluster membership count.

### 6. Separate News And Paper Cluster Capacity

The current cluster input can be dominated by papers. Introduce pool-specific caps:
- news cap sized to preserve enough headline breadth
- paper cap sized independently

This guarantees a minimum viable news pool on heavy paper days.

## Expected Result

On a day like 2026-03-10:
- news candidates should survive preprocessing in larger numbers
- follow-up reports should remain available as evidence
- news topics should have a better chance to become multi-source clusters
- `重点资讯` remains topic-level and multi-source
- `其他快讯` still accepts high-value single-source items when needed

## Verification

Implementation is acceptable only if:
- unit tests cover relaxed news filtering and split pool behavior
- audit output shows where candidates are retained or dropped by pool
- a rerun for `2026-03-10` demonstrates a larger news input pool than the current `input_news_count = 8`
- build and digest tests pass
