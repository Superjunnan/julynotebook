# PC 固定左侧导航过渡方案 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为桌面端提供固定左侧导航和右侧主内容区布局，同时保持移动端样式与交互完全不变。

**Architecture:** 只在 `min-width: 1024px` 启用 PC 专属壳层。左侧为固定导航栏，右侧继续复用现有首页、列表页和详情页内容结构。优先通过样式与少量壳层脚本调整完成，必要时再做最小模板补充。

**Tech Stack:** Hexo、NexT、本地 Nunjucks 模板、Stylus、原生前端脚本、Node 测试

---

### Task 1: 为桌面端固定左栏写失败测试

**Files:**
- Modify: `tests/digest/daily-post-ui-regression.test.mjs`

**Step 1: Write the failing test**

补充桌面端壳层断言：

- 首页产物中不应再显示 PC 菜单抽屉入口
- 桌面端应存在固定左栏选择器
- 右侧主内容区和页脚都应归属于统一内容容器

**Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 新增断言失败

**Step 3: Commit**

```bash
git add tests/digest/daily-post-ui-regression.test.mjs
git commit -m "test: cover pc fixed sidebar shell"
```

### Task 2: 实现桌面端固定左栏基础样式

**Files:**
- Modify: `source/_data/app-shell.styl`
- Modify: `source/_data/app-views.styl`

**Step 1: Write the failing test**

沿用 Task 1 中新增断言，不新增额外测试。

**Step 2: Implement minimal desktop shell**

在 `@media (min-width: 1024px)` 内完成：

- 左侧固定导航栏布局
- 右侧主内容区布局
- 顶部左上角菜单按钮隐藏
- 右侧内容区最大宽度与页脚统一

**Step 3: Run targeted verification**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 桌面端壳层断言通过

**Step 4: Commit**

```bash
git add source/_data/app-shell.styl source/_data/app-views.styl tests/digest/daily-post-ui-regression.test.mjs
git commit -m "feat: add pc fixed sidebar shell layout"
```

### Task 3: 调整壳层脚本，移除 PC 抽屉菜单依赖

**Files:**
- Modify: `source/js/app-shell.js`

**Step 1: Write the failing test**

在现有 UI 回归测试里补充：

- PC 端不应再依赖顶部菜单按钮打开站点导航
- 详情页目录按钮逻辑保留

**Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 与 PC 菜单逻辑相关的新增断言失败

**Step 3: Write minimal implementation**

在 `app-shell.js` 中：

- 给桌面端壳层提供稳定的“左侧固定导航模式”判断
- PC 端隐藏站点菜单按钮
- 保留详情页目录按钮
- 不影响移动端抽屉逻辑

**Step 4: Run test to verify it passes**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 通过

**Step 5: Commit**

```bash
git add source/js/app-shell.js tests/digest/daily-post-ui-regression.test.mjs
git commit -m "feat: disable pc drawer menu in fixed sidebar mode"
```

### Task 4: 如有必要，补最小模板结构

**Files:**
- Possibly Modify: `themes/next/layout/_macro/post.njk`
- Possibly Modify: `themes/next/layout/index.njk`
- Possibly Modify: `themes/next/layout/category.njk`

**Step 1: Evaluate whether styles + JS are sufficient**

检查是否必须在模板中补充：

- 固定左栏容器
- 右侧内容包装容器

**Step 2: If needed, implement minimal template wrapper**

只做最小结构包裹，不改内容字段和版块逻辑。

**Step 3: Rebuild and inspect**

Run:

```bash
npm run clean && npm run build
```

Expected:

- 生成成功

**Step 4: Commit**

```bash
git add themes/next/layout/_macro/post.njk themes/next/layout/index.njk themes/next/layout/category.njk
git commit -m "refactor: add minimal pc sidebar shell wrappers"
```

### Task 5: 进行全量回归测试

**Files:**
- No code changes required unless failures appear

**Step 1: Run digest test suite**

Run:

```bash
npm run test:digest
```

Expected:

- 全部通过，允许现有 skip

**Step 2: If failures appear, fix the minimal cause**

只修复这轮 PC 壳层引入的回归。

**Step 3: Commit**

```bash
git add .
git commit -m "test: stabilize pc fixed sidebar regressions"
```

### Task 6: 本地启动并做页面验收

**Files:**
- No code changes required unless visual issues appear

**Step 1: Build fresh output**

Run:

```bash
rm -rf public && npm run build
```

Expected:

- 构建通过

**Step 2: Restart local server**

Run:

```bash
npm run server -- -p 4000
```

Expected:

- 本地服务可访问

**Step 3: Validate target pages**

检查：

- `http://localhost:4000/julynotebook/`
- `http://localhost:4000/julynotebook/categories/daily-news/`
- `http://localhost:4000/julynotebook/categories/july-notes/`
- `http://localhost:4000/julynotebook/2026/03/25/evening-digest-2026-03-25/`
- `http://localhost:4000/julynotebook/iteration-log/`

重点确认：

- 左侧导航固定显示
- PC 端不再使用抽屉菜单
- 右侧主内容区与页脚对齐
- 详情页目录按钮仍可用
- 移动端未回归

**Step 4: Commit**

```bash
git add .
git commit -m "feat: ship pc fixed sidebar shell"
```

