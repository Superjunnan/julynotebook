/**
 * scripts/auto-description.js
 * ------------------------------------------------------------
 * 目标：
 * - 首页显示“标题 + 摘要 + 阅读原文”
 * - 摘要尽量保留原文换行语义（不合并成一整段）
 * - 摘要自动忽略链接地址（只保留可读文本）
 */

"use strict";

function stripHtml(html) {
  const s = String(html || "");

  // 先移除 script/style，避免摘要里夹杂代码
  const noScripts = s
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");

  // 再移除所有标签
  return noScripts.replace(/<[^>]+>/g, " ");
}

function stripLinksKeepText(html) {
  return String(html || "")
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/https?:\/\/\S+/gi, " ");
}

function extractLeadLines(html) {
  const s = String(html || "");
  const withoutLinks = stripLinksKeepText(s);
  const withLineBreaks = withoutLinks
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6|blockquote)>/gi, "\n");

  const text = stripHtml(withLineBreaks).replace(/\r/g, "");
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function getCategoryNames(categories) {
  if (!categories) return [];

  if (Array.isArray(categories)) {
    return categories
      .map((item) => (typeof item === "string" ? item : item?.name))
      .map((name) => String(name || "").trim())
      .filter(Boolean);
  }

  if (typeof categories.toArray === "function") {
    return categories
      .toArray()
      .map((item) => String(item?.name || "").trim())
      .filter(Boolean);
  }

  if (typeof categories === "string") {
    return [categories.trim()].filter(Boolean);
  }

  return [];
}

function isDailyDigestPost(data) {
  const names = getCategoryNames(data?.categories);
  if (names.includes("每日资讯")) return true;

  const sourcePath = String(data?.source || "");
  if (/source[\\/]+_posts[\\/]+digest-\d{4}-\d{2}-\d{2}\.md$/i.test(sourcePath)) return true;

  const slug = String(data?.slug || "");
  return /^digest-\d{4}-\d{2}-\d{2}$/i.test(slug);
}

hexo.extend.filter.register("after_post_render", function (data) {
  try {
    if (!data || data.layout !== "post") return data;

    const existing = String(data.description || "").trim();
    if (existing) return data;

    // 每日资讯不再截取正文前两三行，直接给出稳定摘要，避免低价值拼接文本
    if (isDailyDigestPost(data)) {
      data.description = "AI日报：当日要点、重点关注与参考来源。";
      return data;
    }

    const sourceHtml = String(data.excerpt || "").trim() ? data.excerpt : data.content;
    if (!sourceHtml) return data;

    const lines = extractLeadLines(sourceHtml);
    if (!lines.length) return data;

    const maxLines = Number(process.env.AUTO_DESCRIPTION_MAX_LINES || 3);
    const maxChars = Number(process.env.AUTO_DESCRIPTION_MAX_CHARS || 240);
    const lineLimit = Number.isFinite(maxLines) ? Math.max(1, Math.min(6, maxLines)) : 3;
    const charLimit = Number.isFinite(maxChars) ? Math.max(60, Math.min(600, maxChars)) : 240;

    const picked = lines.slice(0, lineLimit);
    let text = picked.join("\n");
    if (text.length > charLimit) text = `${text.slice(0, charLimit).trim()}…`;

    data.description = text;
    return data;
  } catch {
    return data;
  }
});
