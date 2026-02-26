/**
 * source/js/cite-tooltip.js
 * ------------------------------------------------------------
 * 用于实现引用编号 [1] 悬浮时出现预览浮层（tooltip）
 * 预览内容来自 <a class="cite" data-cite="...">
 */

(() => {
  // 创建一个全局浮层 DOM
  const tooltip = document.createElement("div");
  tooltip.className = "cite-tooltip";
  document.body.appendChild(tooltip);

  function show(e) {
    const el = e.target.closest("a.cite");
    if (!el) return;

    const text = el.getAttribute("data-cite");
    if (!text) return;

    tooltip.textContent = text;
    tooltip.style.display = "block";

    // 计算位置：放在引用编号上方，避免遮挡正文
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY - tooltip.offsetHeight - 10;
    const left = rect.left + window.scrollX;

    tooltip.style.top = `${Math.max(8, top)}px`;
    tooltip.style.left = `${Math.min(left, window.innerWidth - tooltip.offsetWidth - 12)}px`;
  }

  function hide() {
    tooltip.style.display = "none";
  }

  // 鼠标进入引用编号时显示
  document.addEventListener("mouseover", show);
  // 鼠标离开引用编号时隐藏
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a.cite")) hide();
  });
})();
