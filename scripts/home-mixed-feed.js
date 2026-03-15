const 首页混合流分类 = new Set(['每日资讯', 'AI 日报', 'july笔记', 'AI 笔记']);

function 读取分类名称(post) {
  if (!post.categories || typeof post.categories.toArray !== 'function') return [];
  return post.categories.toArray().map(category => category.name);
}

hexo.extend.filter.register('before_generate', function() {
  const 当前实例 = this;

  当前实例.locals.set('latest_mixed_posts', function() {
    return 当前实例.locals.get('posts')
      .sort('-date')
      .toArray()
      .filter(post => 读取分类名称(post).some(name => 首页混合流分类.has(name)))
      .slice(0, 20);
  });
});
