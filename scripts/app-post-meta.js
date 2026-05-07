const { parse } = require('node-html-parser');

function 标准化时区(raw) {
  const value = String(raw || '').trim();
  return value || 'Asia/Shanghai';
}

const DIGEST_TZ = 标准化时区(
  process.env.DIGEST_TZ
  || process.env.TZ
  || Intl.DateTimeFormat().resolvedOptions().timeZone
);

function 从日报标题提取日期(text) {
  const match = String(text || '').match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return '';
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function 格式化日报展示日期(dateInput, timeZone = DIGEST_TZ) {
  if (!dateInput) return '';

  let iso = '';
  if (dateInput instanceof Date && !Number.isNaN(dateInput.getTime())) {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(dateInput);
    const y = parts.find((part) => part.type === 'year')?.value;
    const m = parts.find((part) => part.type === 'month')?.value;
    const d = parts.find((part) => part.type === 'day')?.value;
    if (y && m && d) {
      iso = `${y}-${m}-${d}`;
    }
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(String(dateInput || '').trim())) {
    iso = String(dateInput).trim();
  }

  if (!iso) return '';
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return '';

  const date = new Date(`${match[1]}-${match[2]}-${match[3]}T12:00:00Z`);
  const weekday = new Intl.DateTimeFormat('zh-CN', {
    weekday: 'short',
    timeZone,
  }).format(date);
  return `${match[2]}.${match[3]} ${weekday}`;
}

function 读取分类(data) {
  if (!data.categories || !data.categories.data) return [];
  return data.categories.data.map(category => category.name);
}

function 读取标签数组(data) {
  if (!data.tags || typeof data.tags.toArray !== 'function') return [];
  return data.tags.toArray().map(tag => tag.name);
}

function 生成显示标题(data, isDaily, digestEdition = '') {
  const 原始标题 = String(data.title || '').trim();
  if (!isDaily) return 原始标题;
  const digestDateISO = 从日报标题提取日期(原始标题);
  const 展示日期 = digestDateISO
    ? 格式化日报展示日期(digestDateISO)
    : 格式化日报展示日期(data.date);
  if (!展示日期) return 原始标题;
  if (digestEdition === 'evening') {
    return `AI晚报 · ${展示日期}`;
  }
  return `AI早报 · ${展示日期}`;
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
    if (分段.length > 1) {
      return 分段[分段.length - 1];
    }
  }

  return 标题主体;
}

function 归一化日报标题用于比对(text) {
  return String(text || '')
    .replace(/…/gu, '')
    .replace(/[“”"'`‘’]/gu, '')
    .replace(/[（）()【】\[\]·•,，。:：;；!?！？\-–—_/\\\s]/gu, '')
    .toLowerCase();
}

function 是否日报标题前缀残缺(标题, 候选标题) {
  const 当前 = 归一化日报标题用于比对(标题);
  const 候选 = 归一化日报标题用于比对(候选标题);
  if (!当前 || !候选 || 当前 === 候选) return false;
  return 候选.startsWith(当前) && 候选.length >= 当前.length + 4;
}

function 选取更完整日报引用标题(标题, 完整引用标题, 冒号前标题, 冒号后标题, 类型 = 'news') {
  const 候选列表 = 类型 === 'paper'
    ? [冒号后标题, 完整引用标题, 冒号前标题]
    : [完整引用标题, 冒号前标题, 冒号后标题];

  return 候选列表.find(候选 => 是否日报标题前缀残缺(标题, 候选)) || '';
}

function 是占位日报标题(text, 类型 = 'news') {
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

function 清洗日报标题(text, dataCite = '', options = {}) {
  const { 类型 = 'news' } = options;
  let 标题 = 去除标题序号(text)
    .replace(/^[.&,:：\-–—\s]+/u, '')
    .replace(/\s+/gu, ' ')
    .trim();

  const 冒号后标题 = 从引用提取标题(dataCite, { 优先取冒号后半段: true });
  const 完整引用标题 = 从引用提取标题(dataCite);
  const 冒号前标题 = 完整引用标题.split(/[:：]/u)[0]?.trim() || '';
  const 标题异常 =
    !标题
    || /让AI$/u.test(标题)
    || /^[.&,:：\-–—\s]+/u.test(text)
    || (/[&]/u.test(标题) && !/AI/u.test(标题))
    || 是占位日报标题(标题, 类型);
  const 更完整引用标题 = 选取更完整日报引用标题(标题, 完整引用标题, 冒号前标题, 冒号后标题, 类型);

  if (标题异常) {
    if (类型 === 'paper' && 冒号后标题) {
      return 冒号后标题;
    }
    if (类型 !== 'paper' && 冒号前标题 && 冒号前标题.length >= 8) {
      return 冒号前标题;
    }
    if (完整引用标题) {
      return 完整引用标题;
    }
  }

  if (更完整引用标题) {
    return 更完整引用标题;
  }

  return 标题;
}

function 收集同级节点(h2) {
  const 节点列表 = [];
  let 当前节点 = h2.nextElementSibling;
  while (当前节点 && 当前节点.tagName !== 'H2') {
    节点列表.push(当前节点);
    当前节点 = 当前节点.nextElementSibling;
  }
  return 节点列表;
}

function 解析日报结构(htmlContent) {
  const root = parse(htmlContent || '');
  const 结果 = {
    重点资讯: [],
    其他快讯: [],
    核心论文: [],
  };

  root.querySelectorAll('h2').forEach(h2 => {
    const 标题 = String(h2.text || '').trim();
    const 节点列表 = 收集同级节点(h2);

    if (标题 === '重点资讯') {
      节点列表.forEach((node, index) => {
        if (node.tagName !== 'H3') return;

        let 引用标记 = '';
        let 探测节点 = node.nextElementSibling;
        while (探测节点 && 探测节点.tagName !== 'H2' && 探测节点.tagName !== 'H3') {
          if (
            (探测节点.tagName === 'P' || 探测节点.tagName === 'DIV')
            && /参考[:：]/u.test(探测节点.text || '')
          ) {
            const 首个引用 = 探测节点.querySelector('a.cite');
            引用标记 = 首个引用?.getAttribute('data-cite') || '';
            break;
          }
          探测节点 = 探测节点.nextElementSibling;
        }

        结果.重点资讯.push({
          index,
          title: 清洗日报标题(node.text || '', 引用标记),
        });
      });
    }

    if (标题 === '其他快讯' || 标题 === '核心论文') {
      const 列表节点 = 节点列表.find(node => node.tagName === 'UL' || node.tagName === 'OL');
      if (!列表节点) return;

      const 目标数组 = 标题 === '其他快讯' ? 结果.其他快讯 : 结果.核心论文;
      列表节点.querySelectorAll('li').forEach((li, index) => {
        const 首个引用 = li.querySelector('a.cite');
        const 原始标题 = li.querySelector('strong')?.text || li.text || '';
        目标数组.push({
          index,
          title: 清洗日报标题(原始标题, 首个引用?.getAttribute('data-cite') || '', {
            类型: 标题 === '核心论文' ? 'paper' : 'news',
          }),
        });
      });
    }
  });

  return 结果;
}

function 推断摘要(data, htmlContent, isDaily, isNote) {
  if (isDaily) {
    const 章节 = 解析日报结构(htmlContent);
    if (章节.重点资讯.length > 0) {
      let listContent = '<ol class="daily-highlights-list">';
      章节.重点资讯.slice(0, 3).forEach(item => {
        listContent += `<li>${item.title}</li>`;
      });
      listContent += '</ol>';
      return listContent;
    }
  }

  if (data.app_excerpt) return data.app_excerpt;
  if (data.description) return data.description;
  if (data.excerpt && data.excerpt.trim()) return data.excerpt;

  const 纯文本 = htmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!纯文本) return '暂无摘要';
  
  // Note AI overview logic could be refined if tags/structure are known,
  // but fallback to a pure text truncate if nothing else is provided.
  return 纯文本.substring(0, 160) + (纯文本.length > 160 ? '...' : '');
}

function 格式化数字(num) {
  if (!num) return '0';
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

hexo.extend.filter.register('after_post_render', function(data) {
  if (data.layout !== 'post') return data;

  try {
    const 分类名称 = 读取分类(data);
    const 标签数组 = 读取标签数组(data);
    const isDaily = 分类名称.some(name => name === '每日资讯' || name === 'AI 日报');
    const isNote = 分类名称.some(name => name === 'july笔记' || name === 'AI 笔记');
    const digestEdition = String(data.digest_edition || '').trim().toLowerCase();
    const htmlContent = data.content || '';

    data.app_type = isDaily ? 'daily' : (isNote ? 'note' : 'default');

    if (isDaily) {
      if (digestEdition === 'evening') {
        data.app_badge = { text: 'AI 晚报', color: '#8a5a2b', bg: '#fde7cc', icon: '🤖' };
      } else {
        data.app_badge = { text: 'AI早报', color: '#9d473d', bg: '#f8d9d4', icon: '🤖' };
      }
    } else if (isNote) {
      data.app_badge = { text: 'AI 笔记', color: '#8d7630', bg: '#f6ebbf', icon: '📔' };
    } else {
      data.app_badge = { text: '文章', color: '#596073', bg: '#eef1f7', icon: '📄' };
    }

    data.tagsList = 标签数组;
    data.app_tags_str = 标签数组.join(',');
    data.app_display_title = 生成显示标题(data, isDaily, digestEdition);
    if (isDaily) {
      data.title = data.app_display_title;
    }
    if (isDaily) {
      const 章节 = 解析日报结构(htmlContent);
      data.app_entry_count = 章节.重点资讯.length + 章节.其他快讯.length + 章节.核心论文.length;
    } else {
      data.app_entry_count = (htmlContent.match(/<h2/gi) || []).length;
    }
    data.app_has_toc = (htmlContent.match(/<h[123]/gi) || []).length > 0;
    data.app_excerpt = 推断摘要(data, htmlContent, isDaily, isNote);
    
    // Parse wordcount if string or number
    let rawWordCount = String(data.wordcount || htmlContent.replace(/<[^>]+>/g, '').length);
    let rawWordCountNum = parseInt(rawWordCount.replace(/k/i, '000').replace(/[^0-9]/g, ''), 10) || 0;
    data.app_wordcount_fmt = 格式化数字(rawWordCountNum);
    data.app_reading_time = Math.max(1, Math.ceil(rawWordCountNum / 300));

  } catch (error) {
    console.error('app-post-meta error:', error);
  }

  return data;
});
