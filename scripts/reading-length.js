/**
 * scripts/reading-length.js
 * ------------------------------------------------------------
 * 重新计算文章长度与阅读时长基数：
 * - 去掉 URL 地址本体
 * - 对 Digest 去掉“参考内容/参考内容地址”段落（不计入正文阅读时长）
 * - 最终写回 data.length，供 hexo-word-counter 的 symbolsTime 使用
 */

"use strict";

function removeDigestReferenceSection(markdown) {
  const text = String(markdown || "");
  const marker = text.search(/^\s*##\s+参考内容(?:地址)?\s*$/m);
  if (marker < 0) return text;
  return text.slice(0, marker);
}

function toReadableText(markdownOrHtml) {
  const raw = String(markdownOrHtml || "");

  const withoutReferenceSection = removeDigestReferenceSection(raw);
  const withLinkTextOnly = withoutReferenceSection
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/gi, "$1")
    .replace(/<https?:\/\/[^>]+>/gi, " ")
    .replace(/https?:\/\/\S+/gi, " ");

  const withoutHtml = withLinkTextOnly
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  return withoutHtml
    .replace(/[`>*_~#\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countSymbolsLikeWordCounter(text) {
  const source = String(text || "");
  if (!source) return 0;

  const cjkChars = (source.match(/[\u3400-\u9fff]/g) || []).length;
  const latinWords = (source.match(/[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*/g) || []).length;
  return cjkChars + latinWords;
}

hexo.extend.filter.register("after_post_render", function (data) {
  try {
    if (!data || data.layout !== "post") return data;

    const base = data.raw || data.content || data._content || "";
    const readableText = toReadableText(base);
    const customLength = countSymbolsLikeWordCounter(readableText);

    // 至少保留 1，避免显示 0 分钟
    data.length = Math.max(1, customLength);
    return data;
  } catch {
    return data;
  }
}, 30);
