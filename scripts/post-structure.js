function 是否日报(data) {
  return Boolean(
    data.categories
    && data.categories.data
    && data.categories.data.some(category => category.name === '每日资讯' || category.name === 'AI 日报')
  );
}

function 提取候选总数(html) {
  const match = String(html || '').match(/今日候选总数[^\d]*(\d+)/u);
  return match ? match[1] : '';
}

hexo.extend.filter.register('after_post_render', function(data) {
  if (data.layout !== 'post' || !是否日报(data)) return data;

  try {
    const 候选总数 = 提取候选总数(data.content || '');
    if (候选总数 && (!data.app_daily_candidates || data.app_daily_candidates === '0')) {
      data.app_daily_candidates = 候选总数;
    }
  } catch (error) {
    console.error('post-structure error:', error);
  }

  return data;
});
