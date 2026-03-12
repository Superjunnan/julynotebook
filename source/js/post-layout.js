/**
 * source/js/post-layout.js
 * ------------------------------------------------------------
 * 详情页布局增强：
 * - 把左下角悬浮目录入口迁到右上角
 * - 移动端详情页顶部显示当前页面标题
 * - 压缩历史 digest 中的“关键信号”展示
 */

(() => {
  function readPageConfig() {
    const el = document.querySelector('.next-config[data-name="page"]');
    if (!el) return {};

    try {
      return JSON.parse(el.textContent || "{}");
    } catch {
      return {};
    }
  }

  function normalizePageTitle(rawTitle) {
    return String(rawTitle || document.title || "")
      .replace(/\s*\|\s*川下の楠木\s*$/u, "")
      .trim();
  }

  function isDetailPage(pageConfig) {
    if (!pageConfig || pageConfig.isHome) return false;
    return Boolean(pageConfig.isPost || pageConfig.title || pageConfig.path);
  }

  function bindSidebarTrigger(pageConfig) {
    if (!isDetailPage(pageConfig)) return;

    const navRight = document.querySelector(".site-nav-right");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    if (!navRight || !sidebarToggle) return;

    const trigger = navRight.querySelector(".popup-trigger") || document.createElement("div");
    trigger.classList.add("detail-toc-trigger");
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", "切换目录");
    trigger.innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"></i>';

    const toggleSidebar = (event) => {
      event.preventDefault();
      sidebarToggle.click();
    };

    trigger.addEventListener("click", toggleSidebar);
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        toggleSidebar(event);
      }
    });

    if (!trigger.parentNode) {
      navRight.appendChild(trigger);
    }
  }

  function applyMobilePageTitle(pageConfig) {
    if (!isDetailPage(pageConfig)) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const pageTitle = normalizePageTitle(pageConfig.title);
    if (!pageTitle) return;

    document.body.classList.add("detail-page-mobile");
    const siteTitle = document.querySelector(".site-title");
    if (siteTitle) {
      siteTitle.textContent = pageTitle;
    }
  }

  function compactLegacyDigestSignals(pageConfig) {
    if (!pageConfig?.isPost) return;

    const markers = Array.from(document.querySelectorAll(".post-body p"))
      .filter((node) => String(node.textContent || "").trim() === "关键信号：");

    markers.forEach((marker) => {
      const list = marker.nextElementSibling;
      if (!list || list.tagName !== "UL") return;

      const items = Array.from(list.querySelectorAll("li"));
      if (!items.length) {
        marker.remove();
        list.remove();
        return;
      }

      const compact = document.createElement("div");
      compact.className = "digest-signal-compact";
      items.slice(0, 6).forEach((_, index) => {
        const chip = document.createElement("span");
        chip.className = "digest-signal-chip";
        chip.textContent = String(index + 1).padStart(2, "0");
        compact.appendChild(chip);
      });

      marker.replaceWith(compact);
      list.remove();
    });
  }

  function initPostLayout() {
    const pageConfig = readPageConfig();
    if (isDetailPage(pageConfig)) {
      document.body.classList.add("detail-page");
    }

    bindSidebarTrigger(pageConfig);
    applyMobilePageTitle(pageConfig);
    compactLegacyDigestSignals(pageConfig);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPostLayout, { once: true });
  } else {
    initPostLayout();
  }
})();
