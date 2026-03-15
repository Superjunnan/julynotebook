function 读取笔记分类(hexo) {
  return hexo.locals.get('categories').findOne({ name: 'july笔记' })
    || hexo.locals.get('categories').findOne({ name: 'AI 笔记' });
}

hexo.extend.filter.register('before_generate', function() {
  const 当前实例 = this;

  当前实例.locals.set('notes_archive_view', function() {
    const 分类 = 读取笔记分类(当前实例);
    if (!分类 || !分类.posts) {
      return { tags: [], posts: [] };
    }

    const posts = 分类.posts.sort('-date').toArray();
    const 标签集合 = new Set();

    posts.forEach(post => {
      if (!post.tags || typeof post.tags.toArray !== 'function') return;
      post.tags.toArray().forEach(tag => 标签集合.add(tag.name));
    });

    return {
      tags: Array.from(标签集合).sort((前项, 后项) => 前项.localeCompare(后项, 'zh-Hans-CN')),
      posts
    };
  });
});
