import test from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

let cachedArtifacts;

function readResumeArtifacts() {
  if (cachedArtifacts) return cachedArtifacts;

  execSync("rm -rf public db.json && npm run build", {
    cwd: repoRoot,
    stdio: "pipe",
    encoding: "utf-8",
  });

  cachedArtifacts = {
    html: readFileSync(path.join(repoRoot, "public/resume/index.html"), "utf-8"),
    css: readFileSync(path.join(repoRoot, "public/css/main.css"), "utf-8"),
  };

  return cachedArtifacts;
}

test("简历页应为传统文档风格结构", () => {
  const { html } = readResumeArtifacts();

  assert.match(html, /rv-header/);
  assert.match(html, /rv-name/);
  assert.match(html, /rv-section-title/);
  assert.match(html, /rv-entry/);
  assert.match(html, /rv-label/);
  assert.match(html, /rv-project/);
  assert.match(html, /AI 产品经理/);
  assert.match(html, /【工作职责】/);
  assert.match(html, /【主要业绩】/);
  assert.doesNotMatch(html, /<pre><code>/);
  assert.doesNotMatch(html, /<aside class="sidebar">/);
});

test("简历页样式应为桌面文档化与移动端响应式提供策略", () => {
  const { css } = readResumeArtifacts();

  assert.match(css, /\.rv-section-title/);
  assert.match(css, /\.rv-entry-head/);
  assert.match(css, /\.rv-header/);
  assert.match(
    css,
    /@media \(max-width: 767px\)\s*\{[\s\S]*\.rv-header\s*\{[\s\S]*flex-direction:\s*column;/
  );
  assert.match(
    css,
    /@media \(min-width: 1024px\)\s*\{[\s\S]*\.resume-page--ai-pm\s*\{[\s\S]*background:\s*#fff;/
  );
});
