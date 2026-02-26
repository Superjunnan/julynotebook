# Hexo 网页编辑器（hexo-admin）使用说明

## 1) 启动编辑器

在项目根目录执行：

```bash
npm run admin
```

然后在浏览器打开：

```text
http://localhost:4000/admin/
```

## 2) 常用操作

- 新建文章：点击 `New Post`
- 编辑文章：左侧列表选择文章
- 保存：编辑器内点 `Save`
- 预览站点：访问 `http://localhost:4000/`

## 3) 和你当前结构的对应关系

- `AI日报`：自动任务写入 `source/_posts/digest-YYYY-MM-DD.md`
- `july笔记`：你手动新建或编辑，保存在 `source/_posts/`
- 分类归属来自每篇文章头部的 `categories` 字段，而不是文件夹

## 4) 图片与富文本

- 图片推荐放在文章同名资源目录（已启用 `post_asset_folder`）
- 在正文直接写 `![](图片名.png)`
- 需要富文本可在 Markdown 中混写 HTML

## 5) 重要限制

- `hexo-admin` 适合本地编辑
- GitHub Pages 是静态托管，不支持在线运行 `/admin`
- 你当前“公网访问阅读”保持 GitHub Pages 即可；编辑建议在本地完成后推送
