const { parse } = require('node-html-parser');

function 读取分类(data) {
  if (!data.categories || !data.categories.data) return [];
  return data.categories.data.map(category => category.name);
}

function 读取标签数组(data) {
  if (!data.tags || typeof data.tags.toArray !== 'function') return [];
  return data.tags.toArray().map(tag => tag.name);
}

function 推断摘要(data, htmlContent, isDaily, isNote) {
  if (isDaily) {
    const root = parse(htmlContent);
    const headings = root.querySelectorAll('h2, h3');
    if (headings.length > 0) {
      let listContent = '<ol class="daily-highlights-list">';
      headings.forEach(h => {
        const text = h.text.trim();
        // Ignore "今日重点", "重点资讯", etc.
        if (text && !text.includes('今日重点') && !text.includes('今日主线') && !text.includes('资讯') && !text.includes('快讯')) {
          listContent += `<li>${text}</li>`;
        }
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
    const htmlContent = data.content || '';

    data.app_type = isDaily ? 'daily' : (isNote ? 'note' : 'default');

    if (isDaily) {
      data.app_badge = { text: 'AI 日报', color: '#9d473d', bg: '#f8d9d4', icon: '🤖' };
    } else if (isNote) {
      data.app_badge = { text: 'AI 笔记', color: '#8d7630', bg: '#f6ebbf', icon: '📔' };
    } else {
      data.app_badge = { text: '文章', color: '#596073', bg: '#eef1f7', icon: '📄' };
    }

    data.tagsList = 标签数组;
    data.app_tags_str = 标签数组.join(',');
    data.app_entry_count = (htmlContent.match(/<h2/gi) || []).length;
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
