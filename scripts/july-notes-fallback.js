/**
 * scripts/july-notes-fallback.js
 * ------------------------------------------------------------
 * 目标：
 * - 当 `july笔记` 分类还没有任何文章时，`/categories/july-notes/` 不返回 404
 * - 自动生成一个占位页面，提示“暂无内容”及创建方式
 */

"use strict";

function getCategoryNames(post) {
  const categories = post?.categories;
  if (!categories) return [];

  if (typeof categories.toArray === "function") {
    return categories
      .toArray()
      .map((cat) => String(cat?.name || "").trim())
      .filter(Boolean);
  }

  if (Array.isArray(categories)) {
    return categories
      .map((cat) => (typeof cat === "string" ? cat : String(cat?.name || "").trim()))
      .filter(Boolean);
  }

  return [];
}

function hasJulyNotes(posts) {
  return posts.some((post) => getCategoryNames(post).includes("july笔记"));
}

hexo.extend.generator.register("july-notes-fallback", function (locals) {
  try {
    const allPosts = typeof locals?.posts?.toArray === "function" ? locals.posts.toArray() : [];
    if (hasJulyNotes(allPosts)) return [];

    return {
      path: "categories/july-notes/index.html",
      data: {
        title: "july笔记",
        content: [
          "<p>暂无内容</p>",
          "<p>你可以执行 <code>npm run new:note -- \"你的标题\"</code> 创建第一篇笔记。</p>",
        ].join(""),
      },
      layout: ["page"],
    };
  } catch (error) {
    hexo.log.warn(`[july-notes-fallback] 生成占位页失败：${error?.message || error}`);
    return [];
  }
});
