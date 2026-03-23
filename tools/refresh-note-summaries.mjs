import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { requestDigestLlmJson } from "./digest.mjs";

const REPO_ROOT = process.cwd();
const POSTS_DIR = path.join(REPO_ROOT, "source/_posts");
const DEFAULT_MODEL = String(process.env.ZHIPU_MODEL || "glm-4.7-flash").trim() || "glm-4.7-flash";
const FORCE = process.argv.includes("--force");

function loadDotEnvIfNeeded() {
  if (process.env.ZHIPU_API_KEY) return;
  const envPath = path.join(REPO_ROOT, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf-8").split(/\r?\n/u);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    if (!key || process.env[key]) continue;
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/u);
  if (!match) {
    return {
      data: {},
      body: raw,
    };
  }
  return {
    data: yaml.load(match[1]) || {},
    body: match[2] || "",
  };
}

function stringifyFrontMatter(data, body) {
  const frontMatter = yaml.dump(data, {
    lineWidth: -1,
    noRefs: true,
    quotingType: "'",
    forceQuotes: false,
  }).trimEnd();

  return `---\n${frontMatter}\n---\n${body.replace(/^\n+/u, "")}`;
}

function getCategoryNames(data) {
  const categories = data.categories;
  if (!categories) return [];
  if (Array.isArray(categories)) return categories.map(String);
  return [String(categories)];
}

function isNotePost(data) {
  return getCategoryNames(data).some((name) => name === "july笔记" || name === "AI 笔记");
}

function stripMarkdown(text) {
  return String(text || "")
    .replace(/```[\s\S]*?```/gu, " ")
    .replace(/`[^`]+`/gu, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, "$1")
    .replace(/^#{1,6}\s*/gmu, "")
    .replace(/^[>\-\*\+\d.、\s]+/gmu, "")
    .replace(/<[^>]+>/gu, " ")
    .replace(/\|/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

function 提取标题结构(bodyText) {
  return String(bodyText || "")
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => /^(#{1,6}\s+|[一二三四五六七八九十]+\s*[、.．]|[0-9]+\s*[、.．])/u.test(line))
    .map((line) => line.replace(/^#{1,6}\s*/u, "").replace(/^[一二三四五六七八九十0-9]+\s*[、.．]\s*/u, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

function 构建兜底摘要(title, bodyText) {
  const headings = 提取标题结构(bodyText);
  const topicText = headings.slice(0, 4).join("、");
  const trimmedTitle = String(title || "").replace(/\s+/gu, " ").trim();

  if (topicText) {
    return `这篇笔记围绕${topicText}等主题展开，系统梳理了 ${trimmedTitle} 涉及的核心概念、常见方法与落地要点，适合作为后续查阅与搭建 AI 工作流时的快速参考。`;
  }

  const plain = stripMarkdown(bodyText).slice(0, 180).replace(/\s+/gu, " ").trim();
  if (!plain) {
    return `这篇笔记总结了 ${trimmedTitle} 相关的核心概念、关键流程与实际应用场景，适合作为快速理解与后续实践时的参考索引。`;
  }

  return `这篇笔记聚焦 ${trimmedTitle}，结合正文内容梳理了核心知识点、实际应用与后续延伸方向，帮助快速建立整体理解并作为后续查阅的简明索引。`;
}

function buildSummaryPrompt(title, bodyText) {
  return [
    "你是中文技术编辑，请为一篇 AI 笔记生成首页卡片摘要。",
    "要求：",
    "1. 输出 1 段中文，90-140 字。",
    "2. 不要分点、不要标题、不要引号、不要 Markdown。",
    "3. 不要直接抄正文开头，也不要罗列章节名。",
    "4. 强调整篇文章的核心范围、适合读者和能获得的价值。",
    `标题：${title}`,
    `正文：${bodyText.slice(0, 4200)}`,
  ].join("\n");
}

async function requestSummary(title, bodyText) {
  const apiKey = process.env.ZHIPU_API_KEY;
  if (!apiKey) {
    throw new Error("缺少 ZHIPU_API_KEY，无法生成笔记摘要。");
  }
  const { content } = await requestDigestLlmJson({
    operation: "note_card_summary",
    model: DEFAULT_MODEL,
    cache: { llm: {} },
    messages: [
      {
        role: "system",
        content: "你负责为技术博客首页卡片生成简洁、自然、信息密度高的中文摘要。你必须只输出 JSON。",
      },
      {
        role: "user",
        content: `${buildSummaryPrompt(title, bodyText)}\n\n请严格返回 JSON：{\"summary\":\"摘要内容\"}`,
      },
    ],
    extra: {
      title: String(title || "").trim(),
      kind: "note_summary",
    },
  });

  let parsed = null;
  try {
    parsed = JSON.parse(String(content || "{}"));
  } catch {
    parsed = null;
  }

  const summary = String(parsed?.summary || "").replace(/\s+/gu, " ").trim();
  if (!summary) {
    throw new Error("摘要生成返回为空。");
  }

  return summary;
}

async function main() {
  loadDotEnvIfNeeded();

  const files = fs.readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") && !file.startsWith("digest-"))
    .sort((a, b) => a.localeCompare(b, "zh-Hans-CN"));

  let updated = 0;
  for (const file of files) {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, body } = parseFrontMatter(raw);
    if (!isNotePost(data)) continue;
    if (!FORCE && String(data.description || "").trim()) continue;

    const text = stripMarkdown(body);
    if (!text) continue;

    console.log(`正在生成笔记摘要：${file}`);
    let summary = "";
    try {
      summary = await requestSummary(String(data.title || file), text);
    } catch (error) {
      console.warn(`笔记摘要调用大模型失败，改用兜底摘要：${file}\n${error.message}`);
      summary = 构建兜底摘要(String(data.title || file), body);
    }
    if (!summary) continue;

    data.description = summary;
    fs.writeFileSync(fullPath, stringifyFrontMatter(data, body), "utf-8");
    updated += 1;
    console.log(`已更新笔记摘要：${file}`);
  }

  if (updated === 0) {
    console.log(FORCE ? "未找到可更新的笔记摘要。" : "所有 AI 笔记都已有摘要，无需更新。");
  }
}

main().catch((error) => {
  console.error("笔记摘要生成失败：", error);
  process.exit(1);
});
