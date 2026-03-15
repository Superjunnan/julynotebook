const 卡片区块配置 = [
  { title: '重点资讯', className: 'app-section-card' },
  { title: '其他快讯', className: 'app-section-card app-section-card--bullet' },
  { title: '核心论文', className: 'app-section-card app-section-card--bullet' }
];

function 是否日报(data) {
  return Boolean(
    data.categories
    && data.categories.data
    && data.categories.data.some(category => category.name === '每日资讯' || category.name === 'AI 日报')
  );
}

function 提取候选总数(html) {
  let totalCandidates = '';

  const 输出内容 = html.replace(/<(blockquote|p|li)[^>]*>[\s\S]*?(候选总数|今日共筛选)[\s\S]*?(\d+)[\s\S]*?<\/\1>/gu, (matched, _tag, _label, count) => {
    if (!totalCandidates) {
      totalCandidates = count;
    }
    return '';
  });

  return { html: 输出内容, totalCandidates };
}

function 标记主线摘要(html) {
  return html.replace(
    /<blockquote>\s*<p>(主线[:：][\s\S]*?)<\/p>\s*<\/blockquote>/u,
    '<blockquote class="app-daily-abstract"><p>$1</p></blockquote>'
  );
}

function 包装卡片区块(html) {
  let 输出内容 = html;

  卡片区块配置.forEach(section => {
    const pattern = new RegExp(
      `(<h2 id="[^"]*"><a[^>]*><\\/a>${section.title}<\\/h2>[\\s\\S]*?)(?=<h2 id="|$)`,
      'u'
    );
    输出内容 = 输出内容.replace(pattern, `<section class="${section.className}">$1</section>`);
  });

  return 输出内容;
}

function 标记参考列表(html) {
  return html.replace(
    /(<h2 id="[^"]*"><a[^>]*><\/a>(参考内容|参考来源)<\/h2>\s*)<ul>/gu,
    '$1<ul class="app-ref-links">'
  );
}

function 清理空节点(html) {
  return html
    .replace(/<blockquote>\s*<\/blockquote>/gu, '')
    .replace(/^\s+$/gmu, '');
}

hexo.extend.filter.register('after_post_render', function(data) {
  if (data.layout !== 'post' || !是否日报(data)) return data;

  try {
    const 提取结果 = 提取候选总数(data.content || '');
    if (提取结果.totalCandidates) {
      data.total_candidates = 提取结果.totalCandidates;
    }

    let 内容 = 提取结果.html;
    内容 = 标记主线摘要(内容);
    内容 = 包装卡片区块(内容);
    内容 = 标记参考列表(内容);
    内容 = 清理空节点(内容);

    data.content = 内容;
  } catch (error) {
    console.error('post-structure error:', error);
  }

  return data;
});
