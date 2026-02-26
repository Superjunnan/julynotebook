/**
 * source/js/home-tabs.js
 * ------------------------------------------------------------
 * 首页文章分类筛选 Tab：
 * - 全部
 * - 每日资讯
 * - july笔记
 */

(() => {
  function getCategoryFromPost(postBlock) {
    const categoryNameEl = postBlock.querySelector(
      '.post-meta .post-meta-item a[rel="index"] span[itemprop="name"]'
    );
    return String(categoryNameEl?.textContent || "").trim();
  }

  function normalizeCategoryKey(name) {
    if (name === "每日资讯") return "daily-news";
    if (name === "july笔记") return "july-notes";
    return "other";
  }

  function buildTab(label, key, active) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `home-tab-btn${active ? " is-active" : ""}`;
    btn.dataset.tab = key;
    btn.textContent = label;
    return btn;
  }

  function setFilter(tabKey, tabBar, posts) {
    tabBar.querySelectorAll(".home-tab-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === tabKey);
    });

    posts.forEach((post) => {
      const postKey = post.dataset.categoryTab || "other";
      const visible = tabKey === "all" || postKey === tabKey;
      post.style.display = visible ? "" : "none";
    });
  }

  function initHomeTabs() {
    const isHome = document.body.classList.contains("home");
    if (!isHome) return;

    const posts = Array.from(document.querySelectorAll(".main .post-block"));
    if (!posts.length) return;

    posts.forEach((post) => {
      const name = getCategoryFromPost(post);
      post.dataset.categoryTab = normalizeCategoryKey(name);
    });

    const hasDaily = posts.some((p) => p.dataset.categoryTab === "daily-news");
    const hasNotes = posts.some((p) => p.dataset.categoryTab === "july-notes");
    if (!hasDaily && !hasNotes) return;

    const tabBar = document.createElement("div");
    tabBar.className = "home-post-tabs";
    tabBar.appendChild(buildTab("全部", "all", true));
    if (hasDaily) tabBar.appendChild(buildTab("每日资讯", "daily-news", false));
    if (hasNotes) tabBar.appendChild(buildTab("july笔记", "july-notes", false));

    tabBar.addEventListener("click", (event) => {
      const btn = event.target.closest(".home-tab-btn");
      if (!btn) return;
      setFilter(btn.dataset.tab || "all", tabBar, posts);
    });

    const firstPost = posts[0];
    firstPost.parentNode?.insertBefore(tabBar, firstPost);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeTabs, { once: true });
  } else {
    initHomeTabs();
  }
})();
