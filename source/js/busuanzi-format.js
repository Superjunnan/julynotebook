/**
 * source/js/busuanzi-format.js
 * ------------------------------------------------------------
 * 对不蒜子统计数字做前端格式化：
 * - 数字加千分位（例如 78117430 -> 78,117,430）
 * - 兼容其异步注入（延时轮询一段时间）
 */

(() => {
  const targetIds = [
    "busuanzi_value_site_uv",
    "busuanzi_value_site_pv",
    "busuanzi_value_page_pv",
  ];

  function formatCounterValue(el) {
    const raw = String(el?.textContent || "").trim().replace(/,/g, "");
    if (!/^\d+$/.test(raw)) return false;

    const value = Number(raw);
    if (!Number.isFinite(value)) return false;

    const formatted = new Intl.NumberFormat("zh-CN").format(value);
    if (el.textContent !== formatted) el.textContent = formatted;
    return true;
  }

  function formatAllCounters() {
    let updated = 0;
    for (const id of targetIds) {
      const el = document.getElementById(id);
      if (el && formatCounterValue(el)) updated += 1;
    }
    return updated;
  }

  function runWithPolling() {
    formatAllCounters();

    let tries = 0;
    const maxTries = 30;
    const timer = window.setInterval(() => {
      tries += 1;
      formatAllCounters();
      if (tries >= maxTries) window.clearInterval(timer);
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runWithPolling, { once: true });
  } else {
    runWithPolling();
  }
})();
