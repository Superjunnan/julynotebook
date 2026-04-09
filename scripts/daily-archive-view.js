function 读取日报分类(hexo) {
  return hexo.locals.get('categories').findOne({ name: '每日资讯' })
    || hexo.locals.get('categories').findOne({ name: 'AI 日报' });
}

hexo.extend.filter.register('before_generate', function() {
  const 当前实例 = this;

  function 构建日报数据() {
    const 分类 = 读取日报分类(当前实例);
    if (!分类 || !分类.posts) return { groups: [], years: [] };

    const 分组映射 = new Map();

    分类.posts.sort('-date').toArray().forEach(post => {
      const 月份 = post.date.format('YYYY.MM');
      if (!分组映射.has(月份)) {
        分组映射.set(月份, []);
      }
      分组映射.get(月份).push(post);
    });

    const groups = Array.from(分组映射.entries())
      .sort((前项, 后项) => 后项[0].localeCompare(前项[0]))
      .map(([月份, posts], index) => {
        const 展开状态 = index < 2;
        return {
          month: 月份,
          year: 月份.slice(0, 4),
          is_expanded: 展开状态,
          posts: posts.map(post => Object.assign({}, post, {
            is_compact: !展开状态
          }))
        };
      });

    const yearSet = new Set(groups.map(g => g.year));
    const years = Array.from(yearSet).sort((a, b) => b.localeCompare(a));

    return { groups, years };
  }

  当前实例.locals.set('daily_archive_view', function() {
    return 构建日报数据().groups;
  });

  当前实例.locals.set('daily_years_view', function() {
    return 构建日报数据().years;
  });
});
