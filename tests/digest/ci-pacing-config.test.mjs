import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

function readWorkflow(name) {
  return readFileSync(path.join(repoRoot, ".github", "workflows", name), "utf-8");
}

function extractQuotedNumber(workflow, key) {
  const match = workflow.match(new RegExp(`${key}:\\s*"?(\\d+)"?`));
  return match ? Number(match[1]) : null;
}

test("digest workflows pin serialized LLM pacing with a conservative interval", () => {
  for (const file of ["digest.yml", "evening-digest.yml"]) {
    const workflow = readWorkflow(file);
    assert.match(workflow, /DIGEST_LLM_MAX_CONCURRENCY:\s*"1"/);
    assert.ok(
      extractQuotedNumber(workflow, "DIGEST_LLM_MIN_INTERVAL_MS") >= 35000,
      `${file} should keep at least a 35s LLM interval`
    );
    assert.ok(
      extractQuotedNumber(workflow, "DIGEST_CI_RETRY_BASE_DELAY_MS") >= 60000,
      `${file} should wait at least 60s before retrying the whole digest run`
    );
    assert.ok(
      extractQuotedNumber(workflow, "DIGEST_TIMEOUT_ZHIPU_MS") >= 240000,
      `${file} should allow at least 240s for a heavy LLM request before aborting`
    );
    assert.ok(
      extractQuotedNumber(workflow, "DIGEST_LLM_MAX_RETRIES") <= 3,
      `${file} should keep internal LLM retries capped at 3 or fewer`
    );
    assert.ok(
      extractQuotedNumber(workflow, "DIGEST_TOPIC_MERGE_BATCH_SIZE") <= 60,
      `${file} should keep topic merge batches at 60 items or fewer`
    );
  }
});

test("digest workflows bind resolved date to generation and fail when post output is missing", () => {
  for (const file of ["digest.yml", "evening-digest.yml"]) {
    const workflow = readWorkflow(file);
    assert.match(workflow, /DIGEST_DATE:\s*\$\{\{\s*steps\.digest_meta\.outputs\.date\s*\}\}/);
    assert.match(workflow, /name:\s*Verify digest output/);
    assert.match(workflow, /Digest output missing or empty/);
    assert.match(workflow, /exit 1/);
  }
});
