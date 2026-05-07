const { parse } = require('node-html-parser');

function 是否日报(data) {
  return data.app_type === 'daily'
    || Boolean(
      data.categories
      && data.categories.data
      && data.categories.data.some(c => c.name === '每日资讯' || c.name === 'AI 日报')
    );
}

function 去除标题序号(text) {
  return String(text || '')
    .replace(/^\s*(?:\d+|[一二三四五六七八九十]+)\s*[·.、:：-]\s*/u, '')
    .trim();
}

function 从引用提取标题(dataCite, options = {}) {
  const { 优先取冒号后半段 = false } = options;
  const 原始文本 = String(dataCite || '').replace(/^\s*\d+\.\s*/, '').trim();
  const 标题主体 = 原始文本.split('｜')[0].trim();
  if (!标题主体) return '';

  if (优先取冒号后半段) {
    const 分段 = 标题主体.split(/[:：]/u).map(part => part.trim()).filter(Boolean);
    if (分段.length > 1) return 分段[分段.length - 1];
  }

  return 标题主体;
}

function 归一化标题用于比对(text) {
  return String(text || '')
    .replace(/…/gu, '')
    .replace(/[“”"'`‘’]/gu, '')
    .replace(/[（）()【】\[\]·•,，。:：;；!?！？\-–—_/\\\s]/gu, '')
    .toLowerCase();
}

function 是否标题前缀残缺(标题, 候选标题) {
  const 当前 = 归一化标题用于比对(标题);
  const 候选 = 归一化标题用于比对(候选标题);
  if (!当前 || !候选 || 当前 === 候选) return false;
  return 候选.startsWith(当前) && 候选.length >= 当前.length + 4;
}

function 选取更完整引用标题(标题, 完整引用标题, 引用前段标题, 引用尾段标题, 类型 = 'news') {
  const 候选列表 = 类型 === 'paper'
    ? [引用尾段标题, 完整引用标题, 引用前段标题]
    : [完整引用标题, 引用前段标题, 引用尾段标题];

  return 候选列表.find(候选 => 是否标题前缀残缺(标题, 候选)) || '';
}

function 是占位标题(text, 类型 = 'news') {
  const 标题 = 去除标题序号(text)
    .replace(/\s+/gu, ' ')
    .trim();
  if (!标题) return true;
  if (类型 === 'paper') {
    return /^(?:论文进展)(?:\s*\d+)?$/u.test(标题);
  }
  if (/^(?:当日(?:AI)?(?:关键)?动态|当日重点|当日快讯|快讯更新|来源快讯|社区来源快讯)(?:\s*\d+)?$/u.test(标题)) {
    return true;
  }
  return /^(?:海外科技媒体|国内人工智能媒体|社区来源|来源|媒体)(?:动态|新动向|快讯|进展|重点更新)(?:\s*\d+)?$/u.test(标题);
}

function 清洗标题(text, dataCite = '', options = {}) {
  const { 类型 = 'news' } = options;
  let 标题 = 去除标题序号(text)
    .replace(/^[.&,:：\-–—\s]+/u, '')
    .replace(/\s+/gu, ' ')
    .trim();

  const 引用完整标题 = 从引用提取标题(dataCite);
  const 引用尾段标题 = 从引用提取标题(dataCite, { 优先取冒号后半段: true });
  const 引用前段标题 = 引用完整标题.split(/[:：]/u)[0]?.trim() || '';
  const 标题异常 =
    !标题
    || /让AI$/u.test(标题)
    || /^[.&,:：\-–—\s]+/u.test(text)
    || (/[&]/u.test(标题) && !/AI/u.test(标题))
    || 是占位标题(标题, 类型);
  const 更完整引用标题 = 选取更完整引用标题(标题, 引用完整标题, 引用前段标题, 引用尾段标题, 类型);

  if (标题异常) {
    if (类型 === 'paper' && 引用尾段标题) {
      return 引用尾段标题;
    }
    if (类型 !== 'paper' && 引用前段标题 && 引用前段标题.length >= 8) {
      return 引用前段标题;
    }
    if (引用完整标题) {
      return 引用完整标题;
    }
  }

  if (更完整引用标题) {
    return 更完整引用标题;
  }

  return 标题;
}

function 收集后续同级节点(h2) {
  const 节点列表 = [];
  let 当前节点 = h2.nextElementSibling;
  while (当前节点 && 当前节点.tagName !== 'H2') {
    节点列表.push(当前节点);
    当前节点 = 当前节点.nextElementSibling;
  }
  return 节点列表;
}

function 规范化引用文本(root) {
  root.querySelectorAll('a.cite').forEach(aEl => {
    const citeText = aEl.getAttribute('data-cite') || '';
    const 原始文本 = citeText.replace(/^\s*\d+\.\s*/, '');
    const 来源 = 原始文本.split('｜')[1]?.trim();
    if (来源) {
      aEl.innerHTML = 来源;
    }
  });
}

function 移除导语块并提取候选数(root, data) {
  let 候选数 = data.app_daily_candidates || '';

  root.querySelectorAll('blockquote').forEach(bq => {
    const text = (bq.innerText || bq.text || '').trim().replace(/\s+/g, ' ');
    const match = text.match(/今日候选总数[^\d]*(\d+)/u);
    if (match) {
      候选数 = match[1];
      bq.remove();
      return;
    }

    if (text.includes('主线：') || text.includes('今日主线')) {
      bq.remove();
    }
  });

  if (候选数 && (!data.app_daily_candidates || data.app_daily_candidates === '0')) {
    data.app_daily_candidates = 候选数;
  }
}

function 移除参考来源章节(root) {
  root.querySelectorAll('h2').forEach(h2 => {
    const text = (h2.text || '').trim();
    if (!text.includes('参考')) return;

    const 后续节点 = 收集后续同级节点(h2);
    后续节点.forEach(node => {
      if (node.tagName === 'UL' || node.tagName === 'OL') {
        node.remove();
      }
    });
    h2.remove();
  });
}

function 构建二级标题节点(h2) {
  const id = h2.getAttribute('id') || '';
  const title = (h2.text || '').trim();
  return `<h2 class="daily-section-title" id="${id}">${title}</h2>`;
}

function 构建参考来源HTML(anchors) {
  if (!anchors || anchors.length === 0) return '';
  const chips = anchors.map(anchor => anchor.toString()).join('');
  return `<div class="daily-news-card-refs"><span class="refs-label">参考：</span><span class="refs-chips">${chips}</span></div>`;
}

function 提取区块空态文本(节点列表) {
  const 文本片段 = 节点列表
    .filter(node => node.tagName !== 'UL' && node.tagName !== 'OL')
    .map(node => (node.innerText || node.text || '').trim())
    .filter(Boolean);

  if (!文本片段.length) return '';
  return 文本片段.join(' ').replace(/\s+/g, ' ').trim();
}

function 清理正文HTML(html) {
  return String(html || '')
    .trim()
    .replace(/（参考[:：][^）]*）/gu, '')
    .replace(/\(参考[:：][^)]*\)/gu, '')
    .replace(/^[：:\s]+/u, '')
    .trim();
}

function 编号文本(index) {
  return String(index + 1).padStart(2, '0');
}

function 构建条目标题HTML(titleId, 序号, 显示标题) {
  return `<h3 class="daily-news-card-title" id="${titleId}">${序号} · ${显示标题}</h3>`;
}

function 构建重点资讯区块(h2) {
  const 节点列表 = 收集后续同级节点(h2);
  const 卡片列表 = [];

  节点列表.forEach(node => {
    if (node.tagName !== 'H3') return;

    const titleNode = node;
    const bodyNodes = [];
    let refsNode = null;
    let 当前节点 = node.nextElementSibling;

    while (当前节点 && 当前节点.tagName !== 'H2' && 当前节点.tagName !== 'H3') {
      if ((当前节点.tagName === 'P' || 当前节点.tagName === 'DIV') && /参考[:：]/u.test(当前节点.text || '')) {
        refsNode = 当前节点;
      } else {
        bodyNodes.push(当前节点.toString());
      }
      当前节点 = 当前节点.nextElementSibling;
    }

    const 首个引用 = refsNode?.querySelector('a.cite');
    const 显示标题 = 清洗标题(titleNode.text || '', 首个引用?.getAttribute('data-cite') || '');
    const titleId = titleNode.getAttribute('id') || '';
    const bodyHtml = 清理正文HTML(bodyNodes.join(''));
    const refsHtml = 构建参考来源HTML(refsNode ? refsNode.querySelectorAll('a.cite') : []);
    const 序号 = 编号文本(卡片列表.length);

    卡片列表.push(
      `<article class="daily-news-card">`
      + 构建条目标题HTML(titleId, 序号, 显示标题)
      + `<div class="daily-news-card-body">${bodyHtml}</div>`
      + refsHtml
      + `</article>`
    );
  });

  节点列表.forEach(node => node.remove());
  h2.parentNode.exchangeChild(h2, parse(`<section class="daily-section-block">${构建二级标题节点(h2)}${卡片列表.join('')}</section>`).firstChild);
}

function 提取列表正文HTML(li, strong, refsNode) {
  const bodyPieces = [];
  li.childNodes.forEach(node => {
    if (node === strong) return;
    if (refsNode && node === refsNode) return;
    if (!refsNode && node.nodeType === 1 && node.tagName === 'A' && node.classList.contains('cite')) return;
    bodyPieces.push(node.toString());
  });
  return 清理正文HTML(bodyPieces.join(''));
}

function 构建列表区块(h2, options = {}) {
  const { 类型 = 'news', 前缀 = 'daily-item' } = options;
  const 节点列表 = 收集后续同级节点(h2);
  const 列表节点 = 节点列表.find(node => node.tagName === 'UL' || node.tagName === 'OL');
  const 空态文本 = 提取区块空态文本(节点列表);
  const 卡片列表 = [];

  if (列表节点) {
    列表节点.querySelectorAll('li').forEach((li, index) => {
      const strong = li.querySelector('strong');
      const refsNode = li.querySelector('.daily-news-card-refs');
      const 全部引用 = refsNode ? refsNode.querySelectorAll('a.cite') : li.querySelectorAll('a.cite');
      const 首个引用 = 全部引用[0];
      const titleId = `${前缀}-${String(index + 1).padStart(2, '0')}`;
      const 显示标题 = 清洗标题(strong?.text || li.text || '', 首个引用?.getAttribute('data-cite') || '', {
        类型,
      });
      const bodyHtml = 提取列表正文HTML(li, strong, refsNode);
      const refsHtml = 构建参考来源HTML(全部引用);
      const 序号 = 编号文本(index);

      卡片列表.push(
        `<article class="daily-news-card daily-news-card--${类型}">`
        + 构建条目标题HTML(titleId, 序号, 显示标题)
        + `<div class="daily-news-card-body">${bodyHtml}</div>`
        + refsHtml
        + `</article>`
      );
    });
  }

  节点列表.forEach(node => node.remove());
  const 空态HTML = !卡片列表.length && 空态文本
    ? `<p class="daily-section-empty">${空态文本}</p>`
    : '';
  h2.parentNode.exchangeChild(h2, parse(`<section class="daily-section-block">${构建二级标题节点(h2)}${卡片列表.join('')}${空态HTML}</section>`).firstChild);
}

hexo.extend.filter.register('after_post_render', function(data) {
  if (data.layout !== 'post' || !是否日报(data)) return data;

  try {
    const root = parse(data.content || '');

    移除导语块并提取候选数(root, data);
    规范化引用文本(root);
    移除参考来源章节(root);

    root.querySelectorAll('h2').forEach(h2 => {
      const text = (h2.text || '').trim();
      if (text === '重点资讯') {
        构建重点资讯区块(h2);
        return;
      }
      if (text === '其他快讯') {
        构建列表区块(h2, { 类型: 'news', 前缀: 'daily-news' });
        return;
      }
      if (text === '核心论文') {
        构建列表区块(h2, { 类型: 'paper', 前缀: 'core-paper' });
      }
    });

    data.content = root.toString();
  } catch (error) {
    console.error('daily-detail-formatter error:', error);
  }

  return data;
}, 20);
