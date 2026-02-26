/**
 * scripts/auto-hashtag-tags.js
 * ------------------------------------------------------------
 * 自动从正文里的 #标签 提取 tags（示例：#AI #工作流 #Prompt）
 * - 会与 front-matter tags 合并，不覆盖已有标签
 * - 忽略 Markdown 标题（# 标题）和代码块中的内容
 */

"use strict";

function normalizeExistingTags(tagsValue) {
  if (!tagsValue) return [];
  if (Array.isArray(tagsValue)) return tagsValue.map((x) => String(x || "").trim()).filter(Boolean);
  if (typeof tagsValue === "string") {
    return tagsValue
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return [];
}

function extractHashTags(rawText) {
  const source = String(rawText || "");
  if (!source) return [];

  // 先移除 fenced code block，避免误提取代码中的 # 符号
  const withoutCodeBlocks = source.replace(/```[\s\S]*?```/g, " ");
  const lines = withoutCodeBlocks.split(/\r?\n/);
  const byLower = new Map();

  const hashtagPattern = /(^|[\s([{\u3000，。；、,:：!！?？"“”'‘’/])#([A-Za-z0-9_\-\u4e00-\u9fa5]{1,30})/g;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 忽略 Markdown 标题（如：## 标题）
    if (/^#{1,6}\s/.test(trimmed)) continue;

    // 忽略行内代码
    const withoutInlineCode = trimmed.replace(/`[^`]*`/g, " ");

    let match;
    while ((match = hashtagPattern.exec(withoutInlineCode))) {
      const tag = String(match[2] || "").trim();
      if (!tag || /^\d+$/.test(tag)) continue;

      const key = tag.toLowerCase();
      if (!byLower.has(key)) byLower.set(key, tag);
    }
  }

  return Array.from(byLower.values());
}

hexo.extend.filter.register("before_post_render", function (data) {
  try {
    if (!data || data.layout !== "post") return data;

    const currentTags = normalizeExistingTags(data.tags);
    const detectedTags = extractHashTags(data.raw || data.content || "");
    if (!detectedTags.length) return data;

    const byLower = new Map();
    for (const t of currentTags) byLower.set(t.toLowerCase(), t);
    for (const t of detectedTags) {
      const key = t.toLowerCase();
      if (!byLower.has(key)) byLower.set(key, t);
    }

    data.tags = Array.from(byLower.values());
    return data;
  } catch {
    return data;
  }
});
