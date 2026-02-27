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

说明：已使用本地覆盖配置 `_config.local.yml`，所以本地访问路径固定是 `/admin/`，不会再受线上 `root: /julynotebook/` 影响。

如果提示 `Port 4000 has been used`：

```bash
# 方案 A：直接改用 4001 端口
npm run admin:4001
# 然后打开 http://localhost:4001/admin/
```

```bash
# 方案 B：释放 4000 再启动
lsof -nP -iTCP:4000 -sTCP:LISTEN
kill <PID>
npm run admin
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
