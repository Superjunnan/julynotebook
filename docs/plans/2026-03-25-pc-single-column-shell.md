# PC 单栏壳层过渡 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为桌面浏览器增加 `760px` 居中单栏壳层约束，在不改变现有移动端信息架构与交互的前提下提升 PC 阅读体验。

**Architecture:** 只在样式层增加桌面端媒体查询，把顶部栏、主内容区和详情页统一收敛到单栏容器内；不修改数据流、不增加 PC 专属交互逻辑。实现范围优先限制在 `app-shell.styl` 与 `app-views.styl`，必要时少量补充 `detail-view.styl`。

**Tech Stack:** Hexo、NexT、Stylus、自定义 App Shell 样式、Node 内置测试与本地 `hexo server`

---

### Task 1: 核对当前桌面容器与样式入口

**Files:**
- Modify: `source/_data/app-shell.styl`
- Modify: `source/_data/app-views.styl`
- Reference: `source/_data/detail-view.styl`

**Step 1: 记录当前相关样式入口**

确认当前以下选择器是否已承担桌面宽度职责：

- `.content-wrap`
- `.main-inner`
- `.site-brand-container`
- `.app-view`
- `.app-view-home`

**Step 2: 查明现有桌面媒体查询**

Run:

```bash
rg -n "@media \(min-width: 992px\)|max-width 760px|max-width 900px|content-wrap|main-inner" source/_data/*.styl
```

Expected:
- 能看到当前已有的桌面媒体查询和 `760px / 900px` 相关规则

**Step 3: Commit**

这一步只做核对，不提交。

### Task 2: 先写失败验证基线

**Files:**
- Modify: `tests/digest/daily-post-ui-regression.test.mjs`

**Step 1: 写一条桌面容器基线测试**

新增测试，至少断言构建后的 `css/main.css` 含有：

- `@media (min-width: 1024px)`
- `max-width: 760px` 或 Stylus 编译后的等价结果

并指向用于限制主内容容器的选择器。

**Step 2: 运行测试并确认当前失败**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:
- 新增断言失败，因为目标规则还未落到产物

**Step 3: Commit**

这一步只写失败测试，不提交。

### Task 3: 实现桌面单栏壳层约束

**Files:**
- Modify: `source/_data/app-shell.styl`
- Modify: `source/_data/app-views.styl`

**Step 1: 在 `app-shell.styl` 中加入桌面主容器规则**

实现目标：

- `@media (min-width: 1024px)`
- 主内容视觉宽度收敛到 `760px`
- 顶部栏、正文区与卡片区不再显得铺满整页

建议最小实现：

- `.content-wrap`
- `.main-inner`
- `.site-brand-container .site-meta`

**Step 2: 在 `app-views.styl` 中补充桌面页间距约束**

实现目标：

- 保持首页 / 列表页 / 迭代记录页在桌面下仍是单栏节奏
- 防止 gap 因宽度变化显得过松

**Step 3: 确认不引入 JS 逻辑改动**

Run:

```bash
git diff -- source/js
```

Expected:
- 无 `source/js` 改动

**Step 4: 运行测试确认通过**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:
- 桌面容器基线测试通过

**Step 5: Commit**

```bash
git add source/_data/app-shell.styl source/_data/app-views.styl tests/digest/daily-post-ui-regression.test.mjs
git commit -m "feat: constrain desktop layout to centered single column"
```

### Task 4: 构建并进行本地桌面验收

**Files:**
- Verify: `public/css/main.css`
- Verify: `public/index.html`
- Verify: `public/iteration-log/index.html`

**Step 1: 全量构建**

Run:

```bash
npm run clean && npm run build
```

Expected:
- `hexo generate` 成功

**Step 2: 启动本地服务**

Run:

```bash
(lsof -ti tcp:4000 | xargs kill -9) >/dev/null 2>&1 || true
npm run server -- -p 4000
```

Expected:
- 本地站点运行在 `http://localhost:4000/julynotebook/`

**Step 3: 验证桌面主要页面**

至少检查：

- `http://localhost:4000/julynotebook/`
- `http://localhost:4000/julynotebook/categories/daily-news/`
- `http://localhost:4000/julynotebook/categories/july-notes/`
- `http://localhost:4000/julynotebook/2026/03/25/evening-digest-2026-03-25/`
- `http://localhost:4000/julynotebook/iteration-log/`

检查点：

- 页面主内容明显居中
- 没有整屏铺满
- 抽屉仍可打开
- 详情页正文不会显得过窄或过散

**Step 4: Commit**

这一步只做验证，不提交。

### Task 5: 运行全量回归

**Files:**
- Verify: `tests/digest/*.test.mjs`

**Step 1: 跑 digest 全量测试**

Run:

```bash
npm run test:digest
```

Expected:
- 全部通过，允许已有 skip，不允许 fail

**Step 2: 再请求关键页面做 smoke test**

Run:

```bash
curl -s http://127.0.0.1:4000/julynotebook/ | head
curl -s http://127.0.0.1:4000/julynotebook/2026/03/25/evening-digest-2026-03-25/ | head
```

Expected:
- 返回正常 HTML

**Step 3: Commit**

如果本轮还有未提交实现，一并提交：

```bash
git add .
git commit -m "test: verify desktop single-column shell compatibility"
```

### Task 6: 结果交付

**Files:**
- None

**Step 1: 向用户提供桌面走查入口**

交付时明确给出：

- 首页
- 日报列表
- 笔记列表
- 晚报详情
- 迭代记录

**Step 2: 明确本轮仍未做的事情**

说明：

- 这不是 PC 专属布局
- 只是单栏过渡版本
- 后续仍可以单独设计 PC 版信息架构

**Step 3: Commit**

无。
