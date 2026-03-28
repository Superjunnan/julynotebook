(() => {
  function 读取页面配置() {
    const 节点 = document.querySelector('.next-config[data-name="page"]');
    if (!节点) return {};

    try {
      return JSON.parse(节点.textContent || '{}');
    } catch {
      return {};
    }
  }

  function 识别详情页类型() {
    const 分类链接 = Array.from(document.querySelectorAll('.post-category a, .post-meta a[href*="/categories/"]'))
      .map(link => decodeURIComponent(link.getAttribute('href') || ''));

    if (分类链接.some(href => href.includes('/daily-news/') || href.includes('每日资讯') || href.includes('AI 日报'))) {
      return 'daily';
    }
    if (分类链接.some(href => href.includes('/july-notes/') || href.includes('july笔记') || href.includes('AI 笔记'))) {
      return 'note';
    }
    return 'default';
  }

  function 压缩历史关键信号() {
    const 标记节点 = Array.from(document.querySelectorAll('.post-body p'))
      .filter(node => String(node.textContent || '').trim() === '关键信号：');

    标记节点.forEach(marker => {
      if (marker.dataset.compacted === 'true') return;

      const 列表节点 = marker.nextElementSibling;
      if (!列表节点 || 列表节点.tagName !== 'UL') return;

      const 条目列表 = Array.from(列表节点.querySelectorAll('li'));
      if (!条目列表.length) {
        marker.remove();
        列表节点.remove();
        return;
      }

      const 容器 = document.createElement('div');
      容器.className = 'digest-signal-compact';

      条目列表.slice(0, 4).forEach((_, index) => {
        const 标签 = document.createElement('span');
        标签.className = 'digest-signal-chip';
        标签.textContent = String(index + 1).padStart(2, '0');
        容器.appendChild(标签);
      });

      marker.dataset.compacted = 'true';
      marker.replaceWith(容器);
      列表节点.remove();
    });
  }

  function 初始化详情页布局() {
    const pageConfig = 读取页面配置();
    if (!pageConfig || !pageConfig.isPost) return;

    document.body.classList.add('detail-page');
    document.body.classList.toggle('detail-page-mobile', window.matchMedia('(max-width: 767px)').matches);
    document.body.classList.toggle('detail-page--daily', 识别详情页类型() === 'daily');
    document.body.classList.toggle('detail-page--note', 识别详情页类型() === 'note');

    压缩历史关键信号();
  }

  document.addEventListener('DOMContentLoaded', 初始化详情页布局);
  document.addEventListener('pjax:success', 初始化详情页布局);
})();
