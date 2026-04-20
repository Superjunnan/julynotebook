#!/usr/bin/env node

import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(TOOL_DIR, "..");
const DIGEST_ENTRY = path.join(ROOT, "tools", "digest.mjs");

function readPositiveIntEnv(name, fallback) {
  const raw = String(process.env[name] || "").trim();
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function shouldRetryDigestRunOutput(output) {
  const text = String(output || "").toLowerCase();
  if (!text) return false;

  const fatalPatterns = [
    "缺少环境变量 zhipu_api_key",
    "unsafe deletion detected under source/_posts",
    "cannot find module",
    "err_module_not_found",
    "syntaxerror",
    "referenceerror",
    "yaml",
  ];
  if (fatalPatterns.some((pattern) => text.includes(pattern))) {
    return false;
  }

  const retryablePatterns = [
    "http 429",
    "1302",
    "速率限制",
    "http 500",
    "http 502",
    "http 503",
    "http 504",
    "service unavailable",
    "timed out",
    "aborterror",
    "aborted",
    "fetch failed",
    "econnreset",
    "etimedout",
    "und_err_connect_timeout",
    "und_err_headers_timeout",
    "und_err_socket",
  ];
  return retryablePatterns.some((pattern) => text.includes(pattern));
}

export function computeDigestRetryDelayMs(attempt, options = {}) {
  const baseDelayMs = Number.isFinite(options?.baseDelayMs) ? Number(options.baseDelayMs) : 20_000;
  const maxDelayMs = Number.isFinite(options?.maxDelayMs) ? Number(options.maxDelayMs) : 90_000;
  const boundedAttempt = Math.max(1, Number.parseInt(String(attempt || 1), 10) || 1);
  return Math.min(maxDelayMs, baseDelayMs * Math.pow(2, boundedAttempt - 1));
}

export function buildDigestAttemptLogLine(options = {}) {
  const attempt = Math.max(1, Number.parseInt(String(options?.attempt || 1), 10) || 1);
  const maxAttempts = Math.max(attempt, Number.parseInt(String(options?.maxAttempts || attempt), 10) || attempt);
  const profile = String(options?.profile || "").trim();
  const date = String(options?.date || "").trim();
  const model = String(options?.model || "").trim();
  const baseDelayMs = Number.isFinite(options?.baseDelayMs) ? Number(options.baseDelayMs) : 0;
  const maxDelayMs = Number.isFinite(options?.maxDelayMs) ? Number(options.maxDelayMs) : 0;
  const parts = ["[ci-retry] digest attempt", `attempt=${attempt}/${maxAttempts}`];
  if (profile) parts.push(`profile=${profile}`);
  if (date) parts.push(`date=${date}`);
  if (model) parts.push(`model=${model}`);
  if (baseDelayMs > 0) parts.push(`base_delay_ms=${Math.round(baseDelayMs)}`);
  if (maxDelayMs > 0) parts.push(`max_delay_ms=${Math.round(maxDelayMs)}`);
  return parts.join(" ");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runDigestAttempt() {
  return await new Promise((resolve) => {
    const child = spawn(process.execPath, [DIGEST_ENTRY], {
      cwd: ROOT,
      env: process.env,
      stdio: ["inherit", "pipe", "pipe"],
    });
    let combinedOutput = "";

    const append = (chunk) => {
      combinedOutput = `${combinedOutput}${String(chunk || "")}`.slice(-24_000);
    };

    child.stdout.on("data", (chunk) => {
      process.stdout.write(chunk);
      append(chunk);
    });
    child.stderr.on("data", (chunk) => {
      process.stderr.write(chunk);
      append(chunk);
    });
    child.on("error", (error) => {
      append(error?.stack || error?.message || error);
      resolve({ code: 1, signal: null, output: combinedOutput });
    });
    child.on("close", (code, signal) => {
      resolve({ code: code ?? 1, signal: signal || null, output: combinedOutput });
    });
  });
}

async function main() {
  const maxAttempts = readPositiveIntEnv("DIGEST_CI_MAX_ATTEMPTS", 3);
  const baseDelayMs = readPositiveIntEnv("DIGEST_CI_RETRY_BASE_DELAY_MS", 20_000);
  const maxDelayMs = readPositiveIntEnv("DIGEST_CI_RETRY_MAX_DELAY_MS", 90_000);
  const profile = String(process.env.DIGEST_PROFILE || process.env.DIGEST_EDITION || "morning").trim() || "morning";
  const date = String(process.env.DIGEST_DATE || "").trim();
  const model = String(process.env.ZHIPU_MODEL || "glm-4.7-flash").trim() || "glm-4.7-flash";

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    console.log(buildDigestAttemptLogLine({ attempt, maxAttempts, profile, date, model, baseDelayMs, maxDelayMs }));

    const result = await runDigestAttempt();
    if (result.code === 0) return;

    const retryable = shouldRetryDigestRunOutput(result.output);
    if (!retryable || attempt >= maxAttempts) {
      if (!retryable) {
        console.error("[ci-retry] 检测到非瞬时失败，停止重试。");
      } else {
        console.error("[ci-retry] 已达到最大重试次数，停止重试。");
      }
      process.exitCode = result.code || 1;
      return;
    }

    const waitMs = computeDigestRetryDelayMs(attempt, { baseDelayMs, maxDelayMs });
    console.warn(`[ci-retry] 检测到瞬时失败，将在 ${waitMs}ms 后重试。`);
    await sleep(waitMs);
  }
}

const ENTRY_FILE = fileURLToPath(import.meta.url);
const IS_DIRECT_RUN =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(ENTRY_FILE);

if (IS_DIRECT_RUN) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("[ci-retry] digest wrapper 执行失败：", error);
      process.exit(1);
    });
}
