function 读取关注分类(hexo) {
  return hexo.locals.get('categories').findOne({ name: '每日关注' });
}

hexo.extend.filter.register('before_generate', function() {
  const 当前实例 = this;

  当前实例.locals.set('focus_archive_view', function() {
    const 分类 = 读取关注分类(当前实例);
    if (!分类 || !分类.posts) {
      return { posts: [] };
    }

    return {
      posts: 分类.posts.sort('-date').toArray()
    };
  });
});
