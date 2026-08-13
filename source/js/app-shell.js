(() => {
  const 视图类名前缀 = 'app-view-';
  const 下一页回顶标记 = 'app-scroll-top-on-next-page';

  function 读取根路径() {
    const root = window.CONFIG && CONFIG.root ? String(CONFIG.root) : '/';
    return root.endsWith('/') ? root : `${root}/`;
  }

  function 读取页面配置() {
    const 节点 = document.querySelector('.next-config[data-name="page"]');
    if (!节点) return {};

    try {
      return JSON.parse(节点.textContent || '{}');
    } catch {
      return {};
    }
  }

  function 是桌面固定左栏模式() {
    return Boolean(window.matchMedia && window.matchMedia('(min-width: 1024px)').matches);
  }

  function 规范路径(pathname, root) {
    let 路径 = pathname || root;
    if (!路径.startsWith('/')) {
      路径 = `/${路径}`;
    }
    路径 = 路径.replace(/index\.html$/u, '').replace(/\/+$/u, '/');
    if (!路径.startsWith(root)) {
      return `${root}${路径.replace(/^\/+/u, '')}`.replace(/\/+$/u, '/');
    }
    return 路径;
  }

  function 规范标题(rawTitle) {
    return String(rawTitle || document.title || '')
      .replace(/\s*\|\s*川下の楠木\s*$/u, '')
      .trim();
  }

  function 确保桌面内容容器() {
    const 主容器 = document.querySelector('.main');
    if (!主容器) return null;

    const 列容器 = 主容器.querySelector('.column');
    const 页头容器 = 列容器 && 列容器.querySelector('.header');
    const 品牌容器 = document.querySelector('.site-brand-container');
    const 主内容区 = 主容器.querySelector('.main-inner');
    let 桌面壳层 = 主容器.querySelector('.app-desktop-shell');
    let 右侧内容壳层 = 桌面壳层 && 桌面壳层.querySelector('.app-desktop-content-shell');

    if (是桌面固定左栏模式()) {
      if (!桌面壳层) {
        桌面壳层 = document.createElement('div');
        桌面壳层.className = 'app-desktop-shell';
      }

      if (!右侧内容壳层) {
        右侧内容壳层 = document.createElement('div');
        右侧内容壳层.className = 'app-desktop-content-shell';
        桌面壳层.appendChild(右侧内容壳层);
      }

      if (桌面壳层.parentElement !== 主容器) {
        主容器.appendChild(桌面壳层);
      }

      if (品牌容器) {
        if (品牌容器.parentElement !== 主容器) {
          主容器.insertBefore(品牌容器, 桌面壳层);
        } else if (品牌容器.nextElementSibling !== 桌面壳层) {
          主容器.insertBefore(品牌容器, 桌面壳层);
        }
      }

      if (主内容区 && 主内容区.parentElement !== 右侧内容壳层) {
        右侧内容壳层.appendChild(主内容区);
      }

      return { 桌面壳层, 右侧内容壳层 };
    }

    if (品牌容器 && 页头容器 && 品牌容器.parentElement !== 页头容器) {
      页头容器.insertBefore(品牌容器, 页头容器.firstChild || null);
    }

    if (主内容区 && 主内容区.parentElement !== 主容器) {
      主容器.appendChild(主内容区);
    }

    if (桌面壳层) {
      桌面壳层.remove();
    }

    return null;
  }

  function 读取文章类型() {
    if (document.querySelector('.app-card--daily')) {
      return 'daily-post';
    }

    const 分类链接 = Array.from(document.querySelectorAll('.post-category a, .post-meta a[href*="/categories/"]'))
      .map(link => decodeURIComponent(link.getAttribute('href') || ''));

    if (分类链接.some(href => href.includes('/daily-news/') || href.includes('每日资讯') || href.includes('AI 日报'))) {
      return 'daily-post';
    }
    if (分类链接.some(href => href.includes('/july-notes/') || href.includes('july笔记') || href.includes('AI 笔记'))) {
      return 'note-post';
    }
    return 'post';
  }

  function 识别视图(root, pageConfig) {
    const 当前路径 = 规范路径(window.location.pathname, root);

    if (当前路径 === 规范路径(root, root)) return 'home';
    if (当前路径.startsWith(规范路径(`${root}categories/daily-news/`, root))) return 'daily-list';
    if (当前路径.startsWith(规范路径(`${root}categories/july-notes/`, root))) return 'note-list';
    if (当前路径.startsWith(规范路径(`${root}iteration-log/`, root))) return 'iteration-log';
    if (pageConfig && pageConfig.isPost) return 读取文章类型();
    return 'page';
  }

  function 读取页头标题(view, pageConfig) {
    switch (view) {
      case 'home':
        return '川下の楠木';
      case 'daily-list':
        return 'AI 日报';
      case 'note-list':
        return 'AI 笔记';
      case 'daily-post':
        return 'AI 日报';
      case 'note-post':
        return 'AI 笔记';
      case 'iteration-log':
        return '迭代记录';
      default:
        return 规范标题(pageConfig.title);
    }
  }

  function 确保遮罩层() {
    let 遮罩层 = document.querySelector('.app-mask');
    if (!遮罩层) {
      遮罩层 = document.createElement('div');
      遮罩层.className = 'app-mask';
      document.body.appendChild(遮罩层);
    }
    return 遮罩层;
  }

  function 生成抽屉菜单(root) {
    return `
      <div class="app-drawer-title">川下の楠木</div>
      <nav class="app-drawer-menu" aria-label="站点主菜单">
        <a href="${root}" class="app-drawer-menu-item" data-path="${root}">
          <i class="fa fa-home" aria-hidden="true"></i><span>首页</span>
        </a>
        <a href="${root}categories/daily-news/" class="app-drawer-menu-item" data-path="${root}categories/daily-news/">
          <i class="fa fa-rss" aria-hidden="true"></i><span>AI 日报</span>
        </a>
        <a href="${root}categories/july-notes/" class="app-drawer-menu-item" data-path="${root}categories/july-notes/">
          <i class="fa fa-pen" aria-hidden="true"></i><span>AI 笔记</span>
        </a>
        <a href="${root}iteration-log/" class="app-drawer-menu-item" data-path="${root}iteration-log/">
          <i class="fa fa-history" aria-hidden="true"></i><span>迭代记录</span>
        </a>
      </nav>
    `;
  }

  function 确保左侧抽屉(root) {
    let 抽屉 = document.querySelector('.app-drawer');
    if (!抽屉) {
      抽屉 = document.createElement('aside');
      抽屉.className = 'app-drawer';
    }
    const 桌面容器 = 是桌面固定左栏模式() ? document.querySelector('.app-desktop-shell') : null;
    const 目标容器 = 桌面容器 || document.body;
    if (抽屉.parentElement !== 目标容器) {
      if (桌面容器) {
        桌面容器.insertBefore(抽屉, 桌面容器.firstChild || null);
      } else {
        目标容器.appendChild(抽屉);
      }
    }
    抽屉.innerHTML = 生成抽屉菜单(root);
    return 抽屉;
  }

  function 确保目录抽屉() {
    let 抽屉 = document.querySelector('.app-toc-drawer');
    if (!抽屉) {
      抽屉 = document.createElement('aside');
      抽屉.className = 'app-toc-drawer';
      document.body.appendChild(抽屉);
    }
    return 抽屉;
  }

  function 确保页头操作区() {
    const 品牌容器 = document.querySelector('.site-brand-container');
    if (!品牌容器) return {};
    const 定位容器 = 品牌容器;

    let 左按钮 = 定位容器.querySelector('.app-header-action-left') || 品牌容器.querySelector('.app-header-action-left');
    if (!左按钮) {
      左按钮 = document.createElement('button');
      左按钮.type = 'button';
      左按钮.className = 'app-header-action app-header-action-left';
    }
    if (左按钮.parentElement !== 定位容器) {
      定位容器.appendChild(左按钮);
    }

    let 右按钮 = 定位容器.querySelector('.app-header-action-right') || 品牌容器.querySelector('.app-header-action-right');
    if (!右按钮) {
      右按钮 = document.createElement('button');
      右按钮.type = 'button';
      右按钮.className = 'app-header-action app-header-action-right';
    }
    if (右按钮.parentElement !== 定位容器) {
      定位容器.appendChild(右按钮);
    }

    let 次按钮 = 定位容器.querySelector('.app-header-action-secondary') || 品牌容器.querySelector('.app-header-action-secondary');
    if (!次按钮) {
      次按钮 = document.createElement('button');
      次按钮.type = 'button';
      次按钮.className = 'app-header-action app-header-action-secondary';
    }
    if (次按钮.parentElement !== 定位容器) {
      定位容器.appendChild(次按钮);
    }

    return { 左按钮, 次按钮, 右按钮 };
  }

  function 关闭所有抽屉() {
    document.querySelectorAll('.app-drawer, .app-toc-drawer').forEach(node => {
      node.classList.remove('app-drawer-open');
    });
    const 遮罩层 = document.querySelector('.app-mask');
    if (遮罩层) {
      遮罩层.classList.remove('app-mask-visible');
    }
    document.body.classList.remove('app-noscroll');
    document.querySelectorAll('.app-header-action-right').forEach(node => {
      node.setAttribute('aria-expanded', 'false');
    });
  }

  function 打开抽屉(node, 遮罩层) {
    if (!node || !遮罩层) return;
    关闭所有抽屉();
    node.classList.add('app-drawer-open');
    遮罩层.classList.add('app-mask-visible');
    document.body.classList.add('app-noscroll');
  }

  function 同步页头标题(title) {
    const 标题节点 = document.querySelector('.site-title');
    if (!标题节点) return;
    标题节点.textContent = title;
    标题节点.setAttribute('data-app-title', title);
  }

  function 打开菜单(左侧抽屉, 遮罩层) {
    打开抽屉(左侧抽屉, 遮罩层);
  }

  function 返回首页或上一页(root) {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.assign(root);
    }
  }

  function 获取滚动偏移() {
    const 顶栏 = document.querySelector('.site-brand-container');
    const 顶栏高度 = 顶栏 ? 顶栏.getBoundingClientRect().height : 56;
    return 顶栏高度 + 14;
  }

  function 滚动到目录目标(hash) {
    const 原始锚点 = String(hash || '').trim();
    if (!原始锚点 || !原始锚点.startsWith('#')) return;

    const 锚点 = decodeURIComponent(原始锚点.slice(1));
    const 目标节点 = document.getElementById(锚点);
    if (!目标节点) return;

    const 滚动容器 = document.scrollingElement || document.documentElement || document.body;
    const 执行滚动 = () => {
      if (typeof 目标节点.scrollIntoView === 'function') {
        目标节点.scrollIntoView({
          block: 'start',
          inline: 'nearest',
          behavior: 'auto',
        });
      }

      const 当前滚动 = typeof 滚动容器.scrollTop === 'number'
        ? 滚动容器.scrollTop
        : (window.scrollY || window.pageYOffset || 0);
      const 目标位置 = Math.max(
        0,
        当前滚动 + 目标节点.getBoundingClientRect().top - 获取滚动偏移()
      );

      滚动容器.scrollTop = 目标位置;
      window.scrollTo({
        top: 目标位置,
        behavior: 'smooth',
      });
    };

    window.setTimeout(() => {
      if (window.location.hash !== 原始锚点) {
        const 基础路径 = `${window.location.pathname}${window.location.search}`;
        window.history.replaceState(window.history.state, '', `${基础路径}${原始锚点}`);
      }

      window.requestAnimationFrame(() => {
        执行滚动();
      });
    }, 80);
  }

  function 标记下一页回顶() {
    try {
      window.sessionStorage.setItem(下一页回顶标记, '1');
    } catch {
      // ignore sessionStorage errors
    }
  }

  function 处理下一页回顶() {
    let 需要回顶 = false;
    try {
      需要回顶 = window.sessionStorage.getItem(下一页回顶标记) === '1';
      if (需要回顶) {
        window.sessionStorage.removeItem(下一页回顶标记);
      }
    } catch {
      需要回顶 = false;
    }

    if (!需要回顶) return;

    const 执行回顶 = () => {
      const 滚动容器 = document.scrollingElement || document.documentElement || document.body;
      if (滚动容器) {
        滚动容器.scrollTop = 0;
      }
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    };

    window.requestAnimationFrame(() => {
      执行回顶();
      window.setTimeout(执行回顶, 60);
    });
  }

  function 同步左侧按钮(view, 左按钮, 次按钮, root, 左侧抽屉, 遮罩层) {
    if (!左按钮) return;

    if (是桌面固定左栏模式()) {
      左按钮.hidden = true;
      左按钮.onclick = null;
      if (次按钮) {
        次按钮.hidden = true;
        次按钮.onclick = null;
      }
      return;
    }

    if (view === 'home' || view === 'daily-list' || view === 'note-list' || view === 'iteration-log') {
      左按钮.hidden = false;
      左按钮.setAttribute('aria-label', '打开菜单');
      左按钮.innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"></i>';
      左按钮.onclick = () => 打开菜单(左侧抽屉, 遮罩层);
      if (次按钮) {
        次按钮.hidden = true;
        次按钮.onclick = null;
      }
      return;
    }

    左按钮.hidden = false;
    左按钮.setAttribute('aria-label', '返回上一页');
    左按钮.innerHTML = '<i class="fa fa-angle-left" aria-hidden="true" style="font-size: 1.5rem; transform: translateY(-1px);"></i>';
    左按钮.onclick = () => 返回首页或上一页(root);
    if (次按钮) {
      次按钮.hidden = true;
      次按钮.onclick = null;
    }
  }

  function 同步侧边栏目录(view, 左侧抽屉) {
    const 旧目录 = 左侧抽屉 && 左侧抽屉.querySelector('.app-sidebar-toc');
    if (旧目录) 旧目录.remove();

    if (!是桌面固定左栏模式() || !左侧抽屉) return;

    const 目录容器 = document.querySelector('.post-toc-wrap');
    const 目录主体 = 目录容器 && 目录容器.querySelector('.post-toc, .nav');
    const 有目录 = Boolean(目录主体 && 目录主体.querySelector('a[href^="#"]'));
    const 允许展示 = view === 'daily-post' || view === 'note-post' || view === 'post';

    if (!有目录 || !允许展示) return;

    const 侧边栏目录 = document.createElement('div');
    侧边栏目录.className = 'app-sidebar-toc';
    侧边栏目录.innerHTML = `
      <div class="app-sidebar-toc-title">目录</div>
      ${目录容器.querySelector('.post-toc')?.outerHTML || ''}
    `;
    左侧抽屉.appendChild(侧边栏目录);

    侧边栏目录.addEventListener('click', event => {
      const 链接 = event.target.closest('a[href^="#"]');
      if (!链接) return;
      event.preventDefault();
      滚动到目录目标(链接.getAttribute('href') || '');
    });
  }

  function 同步右按钮(view, 右按钮, 目录抽屉, 遮罩层) {
    if (!右按钮) return;

    if (是桌面固定左栏模式()) {
      右按钮.hidden = true;
      右按钮.onclick = null;
      右按钮.setAttribute('aria-expanded', 'false');
      目录抽屉.innerHTML = '';
      return;
    }

    const 目录容器 = document.querySelector('.post-toc-wrap');
    const 目录主体 = 目录容器 && 目录容器.querySelector('.post-toc, .nav');
    const 有目录 = Boolean(目录主体 && 目录主体.querySelector('a[href^="#"]'));
    const 允许展示 = view === 'daily-post' || view === 'note-post' || view === 'post';

    if (!有目录 || !允许展示) {
      右按钮.hidden = true;
      右按钮.onclick = null;
      右按钮.setAttribute('aria-expanded', 'false');
      目录抽屉.innerHTML = '';
      return;
    }

    目录抽屉.innerHTML = `
      <div class="app-toc-drawer-title">目录</div>
      ${目录容器.querySelector('.post-toc')?.outerHTML || 目录容器.innerHTML}
    `;

    右按钮.hidden = false;
    右按钮.setAttribute('aria-label', '打开目录');
    右按钮.setAttribute('aria-expanded', 'false');
    右按钮.innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"></i>';
    右按钮.onclick = () => {
      const 已打开 = 目录抽屉.classList.contains('app-drawer-open');
      已打开 ? 关闭所有抽屉() : 打开抽屉(目录抽屉, 遮罩层);
      右按钮.setAttribute('aria-expanded', 已打开 ? 'false' : 'true');
    };
  }

  function 同步菜单高亮(root) {
    const 当前路径 = 规范路径(window.location.pathname, root);
    document.querySelectorAll('.app-drawer-menu-item').forEach(link => {
      const 目标路径 = 规范路径(link.getAttribute('data-path') || link.getAttribute('href') || root, root);
      const 是否命中 = 当前路径 === 目标路径 || (目标路径 !== 规范路径(root, root) && 当前路径.startsWith(目标路径));
      link.classList.toggle('active', 是否命中);
    });
  }

  function 同步视图类名(view) {
    const 旧类名 = Array.from(document.body.classList).filter(className => className.startsWith(视图类名前缀));
    if (旧类名.length) {
      document.body.classList.remove(...旧类名);
    }
    document.body.classList.add(`${视图类名前缀}${view}`);
  }

  function 初始化遮罩关闭(遮罩层) {
    if (!遮罩层 || 遮罩层.dataset.bound === 'true') return;
    遮罩层.dataset.bound = 'true';
    遮罩层.addEventListener('click', 关闭所有抽屉);
    window.addEventListener('popstate', 关闭所有抽屉);
    document.addEventListener('pjax:send', 关闭所有抽屉);
  }

  function 初始化页面跳转回顶() {
    if (document.body.dataset.scrollTopBound === 'true') return;

    document.body.dataset.scrollTopBound = 'true';
    document.addEventListener('click', event => {
      const 链接 = event.target.closest('a[data-scroll-top="true"]');
      if (!链接) return;
      标记下一页回顶();
    });
  }

  function 初始化目录抽屉交互(目录抽屉) {
    if (!目录抽屉 || 目录抽屉.dataset.bound === 'true') return;

    目录抽屉.dataset.bound = 'true';
    目录抽屉.addEventListener('click', event => {
      const 链接 = event.target.closest('a[href^="#"]');
      if (!链接) return;

      event.preventDefault();
      const hash = 链接.getAttribute('href') || '';
      关闭所有抽屉();
      滚动到目录目标(hash);
    });
  }

  function 初始化AppShell() {
    const root = 读取根路径();
    const pageConfig = 读取页面配置();
    const view = 识别视图(root, pageConfig);
    同步视图类名(view);
    确保桌面内容容器();
    const 遮罩层 = 确保遮罩层();
    const 左侧抽屉 = 确保左侧抽屉(root);
    const 目录抽屉 = 确保目录抽屉();
    const { 左按钮, 次按钮, 右按钮 } = 确保页头操作区();

    初始化遮罩关闭(遮罩层);
    初始化目录抽屉交互(目录抽屉);
    初始化页面跳转回顶();
    同步页头标题(读取页头标题(view, pageConfig));
    同步左侧按钮(view, 左按钮, 次按钮, root, 左侧抽屉, 遮罩层);
    同步右按钮(view, 右按钮, 目录抽屉, 遮罩层);
    同步侧边栏目录(view, 左侧抽屉);
    同步菜单高亮(root);
    if (是桌面固定左栏模式()) {
      document.body.classList.remove('app-noscroll');
    }
    处理下一页回顶();
  }

  document.addEventListener('DOMContentLoaded', 初始化AppShell);
  document.addEventListener('pjax:success', 初始化AppShell);
})();
