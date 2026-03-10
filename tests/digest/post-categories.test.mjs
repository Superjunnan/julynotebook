import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

function readFrontMatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, `missing front matter in ${filePath}`);
  return yaml.load(match[1]) || {};
}

test("AI practice note is categorized under july笔记", () => {
  const filePath = path.resolve("source/_posts/AI-开发项目实践分享记录.md");
  const frontMatter = readFrontMatter(filePath);
  const categories = Array.isArray(frontMatter.categories) ? frontMatter.categories : [];

  assert.equal(categories.includes("july笔记"), true);
});
