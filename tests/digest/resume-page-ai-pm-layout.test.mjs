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

test("简历页应切换为 AI 产品经理导向的双端结构", () => {
  const { html } = readResumeArtifacts();

  assert.match(html, /resume-hero/);
  assert.match(html, /resume-position-callout/);
  assert.match(html, /resume-strength-grid/);
  assert.match(html, /resume-experience-timeline/);
  assert.match(html, /resume-entry resume-entry--featured/);
  assert.match(html, /resume-entry-impact/);
  assert.match(html, /resume-project-grid/);
  assert.match(html, /AI 产品经理/);
  assert.doesNotMatch(html, /<pre><code>/);
  assert.doesNotMatch(html, /<aside class="sidebar">/);
});

test("简历页样式应为桌面文档化与移动端卡片化分别提供兼容策略", () => {
  const { css } = readResumeArtifacts();

  assert.match(
    css,
    /@media \(min-width: 1024px\)\s*\{[\s\S]*\.resume-hero\s*\{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*minmax\(0,\s*1\.45fr\) minmax\(280px,\s*0\.95fr\);/
  );
  assert.match(
    css,
    /@media \(max-width: 767px\)\s*\{[\s\S]*\.resume-entry-head\s*\{[\s\S]*flex-direction:\s*column;/
  );
  assert.match(css, /\.resume-entry-impact\s*\{[\s\S]*border-left:/);
  assert.match(css, /\.resume-strength-grid\s*\{[\s\S]*display:\s*grid;/);
});
