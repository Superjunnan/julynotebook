(() => {
  const 首页筛选缓存键 = 'app-home-filter';
  const 笔记筛选缓存键 = 'app-note-filter';

  function 读取缓存(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function 写入缓存(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      // 忽略无痕模式等场景下的存储异常。
    }
  }

  function 切换标签激活状态(标签列表, 当前值, 字段名) {
    标签列表.forEach(tab => {
      const 命中 = tab.getAttribute(字段名) === 当前值;
      tab.classList.toggle('is-active', 命中);
      tab.setAttribute('aria-selected', 命中 ? 'true' : 'false');
    });
  }

  function 初始化首页筛选() {
    const 标签容器 = document.querySelector('.home-top-tabs');
    const 卡片列表 = Array.from(document.querySelectorAll('#home-posts-container [data-app-type]'));
    if (!标签容器 || !卡片列表.length) return;

    const 标签列表 = Array.from(标签容器.querySelectorAll('.home-tab'));
    const 可用筛选 = new Set(标签列表.map(tab => tab.getAttribute('data-filter')));
    const 默认值 = 可用筛选.has(读取缓存(首页筛选缓存键)) ? 读取缓存(首页筛选缓存键) : 'all';

    const 应用筛选 = value => {
      const 当前值 = 可用筛选.has(value) ? value : 'all';
      切换标签激活状态(标签列表, 当前值, 'data-filter');
      卡片列表.forEach(card => {
        const 命中 = 当前值 === 'all' || card.getAttribute('data-app-type') === 当前值;
        card.classList.toggle('app-filter-hidden', !命中);
      });
      写入缓存(首页筛选缓存键, 当前值);
    };

    if (标签容器.dataset.bound !== 'true') {
      标签容器.dataset.bound = 'true';
      标签容器.addEventListener('click', event => {
        const tab = event.target.closest('.home-tab');
        if (!tab) return;
        应用筛选(tab.getAttribute('data-filter'));
      });
    }

    应用筛选(默认值);
  }

  function 初始化笔记筛选() {
    const 标签容器 = document.querySelector('.note-top-tabs');
    const 卡片列表 = Array.from(document.querySelectorAll('#note-posts-container [data-tags]'));
    if (!标签容器 || !卡片列表.length) return;

    const 标签列表 = Array.from(标签容器.querySelectorAll('.note-tab'));
    const 可用筛选 = new Set(标签列表.map(tab => tab.getAttribute('data-tag')));
    const 默认值 = 可用筛选.has(读取缓存(笔记筛选缓存键)) ? 读取缓存(笔记筛选缓存键) : 'all';

    const 应用筛选 = value => {
      const 当前值 = 可用筛选.has(value) ? value : 'all';
      切换标签激活状态(标签列表, 当前值, 'data-tag');
      卡片列表.forEach(card => {
        const tags = String(card.getAttribute('data-tags') || '')
          .split(',')
          .map(item => item.trim())
          .filter(Boolean);
        const 命中 = 当前值 === 'all' || tags.includes(当前值);
        card.classList.toggle('app-filter-hidden', !命中);
      });
      写入缓存(笔记筛选缓存键, 当前值);
    };

    if (标签容器.dataset.bound !== 'true') {
      标签容器.dataset.bound = 'true';
      标签容器.addEventListener('click', event => {
        const tab = event.target.closest('.note-tab');
        if (!tab) return;
        应用筛选(tab.getAttribute('data-tag'));
      });
    }

    应用筛选(默认值);
  }

  function 初始化日报筛选() {
    const 标签容器 = document.querySelector('.daily-top-tabs');
    const 月份组列表 = Array.from(document.querySelectorAll('.app-view-daily .app-month-group[data-year]'));
    if (!标签容器 || !月份组列表.length) return;

    const 标签列表 = Array.from(标签容器.querySelectorAll('.daily-tab'));
    const 可用年份 = new Set(标签列表.map(tab => tab.getAttribute('data-year')));

    const 应用筛选 = value => {
      const 当前值 = 可用年份.has(value) ? value : 'all';
      切换标签激活状态(标签列表, 当前值, 'data-year');
      月份组列表.forEach(group => {
        const 命中 = 当前值 === 'all' || group.getAttribute('data-year') === 当前值;
        group.classList.toggle('app-filter-hidden', !命中);
      });
    };

    if (标签容器.dataset.bound !== 'true') {
      标签容器.dataset.bound = 'true';
      标签容器.addEventListener('click', event => {
        const tab = event.target.closest('.daily-tab');
        if (!tab) return;
        应用筛选(tab.getAttribute('data-year'));
      });
    }

    应用筛选('all');
  }

  function 清理列表页主题残留类() {
    const 列表容器 = document.querySelector('.main-inner.category.category-app-list');
    if (!列表容器) return;

    列表容器.classList.remove('posts-collapse');
    列表容器.querySelectorAll('.posts-collapse').forEach(node => {
      node.classList.remove('posts-collapse');
    });
    列表容器.querySelectorAll('.post-content').forEach(node => {
      node.classList.remove('post-content');
    });
    列表容器.querySelectorAll('.post-block').forEach(node => {
      node.classList.remove('post-block');
    });
  }

  function 初始化视图脚本() {
    清理列表页主题残留类();
    初始化首页筛选();
    初始化笔记筛选();
    初始化日报筛选();
  }

  document.addEventListener('DOMContentLoaded', 初始化视图脚本);
  document.addEventListener('pjax:success', 初始化视图脚本);
})();
