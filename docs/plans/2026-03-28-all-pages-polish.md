# 全站页面收尾统一 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 统一首页、列表页、详情页、迭代记录和简历页的页头、卡片摘要与内容密度，完成全站收尾。

**Architecture:** 在现有 App Shell、首页卡片模板和详情页样式之上做最小收尾，不重写模板体系。先用测试固定目标，再分别补首页卡片、详情页信号压缩和 `resume / iteration-log` 的统一页头与标题。

**Tech Stack:** Hexo、NexT、Nunjucks、Stylus、原生前端脚本、Node test

---

### Task 1: 固定首页与全站页面收尾目标测试

**Files:**
- Modify: `tests/digest/daily-post-ui-regression.test.mjs`

**Step 1: Write the failing test**

补充断言：

- 首页日报卡片标签改为 `今日主线：`
- 首页卡片尾部间距收紧
- `关键信号` 编号胶囊尺寸更轻
- `resume` 页面标题统一为 `简历`
- `resume / iteration-log` 顶部页头短名称保持一致

**Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 新增断言失败

### Task 2: 调整首页日报卡片摘要与尾部密度

**Files:**
- Modify: `themes/next/layout/index.njk`
- Modify: `source/_data/app-cards.styl`

**Step 1: Write minimal implementation**

- 首页日报卡片标签从 `今日重点：` 改为 `今日主线：`
- 收紧尾部 `阅读全文` 区域的 margin / gap / 字号

**Step 2: Run targeted test**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 首页卡片新增断言通过

### Task 3: 收紧详情页关键信号展示

**Files:**
- Modify: `source/_data/detail-view.styl`
- Modify: `source/js/post-layout.js`

**Step 1: Write minimal implementation**

- 保持 `关键信号` 仅输出编号胶囊
- 收紧编号胶囊尺寸、间距和最大数量

**Step 2: Run targeted test**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 详情页信号压缩断言通过

### Task 4: 统一 resume / iteration-log 的页头与标题

**Files:**
- Modify: `source/_data/app-shell.styl`
- Modify: `source/resume/index.md`
- Possibly Modify: `source/_data/detail-view.styl`

**Step 1: Write minimal implementation**

- 移动端顶部栏保持短页面名视觉
- 收紧 `resume / iteration-log` 首屏顶部密度
- `resume` 标题改为 `简历`

**Step 2: Run targeted test**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- `resume / iteration-log` 相关断言通过

### Task 5: 全量验证

**Files:**
- No new files unless fixes are needed

**Step 1: Run digest UI regression**

Run:

```bash
node --test tests/digest/daily-post-ui-regression.test.mjs
```

Expected:

- 全部通过

**Step 2: Run full digest suite**

Run:

```bash
npm run test:digest
```

Expected:

- 全部通过，允许现有 skip

### Task 6: 本地启动与页面检查

**Files:**
- No code changes required unless issues appear

**Step 1: Restart local server**

Run:

```bash
npm run server -- -p 4000
```

Expected:

- 本地服务启动在 `http://localhost:4000/julynotebook/`

**Step 2: Check key pages**

检查：

- `http://localhost:4000/julynotebook/`
- `http://localhost:4000/julynotebook/categories/daily-news/`
- `http://localhost:4000/julynotebook/categories/july-notes/`
- `http://localhost:4000/julynotebook/2026/03/19/digest-2026-03-19/`
- `http://localhost:4000/julynotebook/iteration-log/`
- `http://localhost:4000/julynotebook/resume/`

Expected:

- 页面可访问
- 首页卡片文案为 `今日主线`
- 详情页信号只保留轻量编号
- `resume / iteration-log` 顶部栏名称正确
