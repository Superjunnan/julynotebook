function 读取日报分类(hexo) {
  return hexo.locals.get('categories').findOne({ name: '每日资讯' })
    || hexo.locals.get('categories').findOne({ name: 'AI 日报' });
}

hexo.extend.filter.register('before_generate', function() {
  const 当前实例 = this;

  当前实例.locals.set('daily_archive_view', function() {
    const 分类 = 读取日报分类(当前实例);
    if (!分类 || !分类.posts) return [];

    const 分组映射 = new Map();

    分类.posts.sort('-date').toArray().forEach(post => {
      const 月份 = post.date.format('YYYY.MM');
      if (!分组映射.has(月份)) {
        分组映射.set(月份, []);
      }
      分组映射.get(月份).push(post);
    });

    return Array.from(分组映射.entries())
      .sort((前项, 后项) => 后项[0].localeCompare(前项[0]))
      .map(([月份, posts], index) => {
        const 展开状态 = index < 2;
        return {
          month: 月份,
          is_expanded: 展开状态,
          posts: posts.map(post => Object.assign({}, post, {
            is_compact: !展开状态
          }))
        };
      });
  });
});
