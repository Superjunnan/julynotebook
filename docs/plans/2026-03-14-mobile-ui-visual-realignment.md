# Mobile UI Visual Realignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在不重开数据层与部署链路的前提下，把当前移动端首页、日报页、笔记页、详情页的视觉表现重新拉回到产品稿，重点修正色块语言、页头动作、抽屉菜单和详情结构。

**Architecture:** 保留当前已经落地的构建期数据视图（`latest_mixed_posts` / `daily_archive_view` / `notes_archive_view`）和 `App Shell` 架构，只调整模板输出节奏、运行时细节和 Stylus 设计 token。无迁移，直接替换当前偏离稿子的视觉层与详情区块包装方式。

**Tech Stack:** Hexo 8、NexT 本地 Fork、Nunjucks、Stylus、原生 JavaScript、Pjax

---

## 背景与范围

### 当前偏差

当前工作区已经具备：

- 首页最近 20 篇混合流
- 日报页月份分组
- 笔记页完整数据与标签筛选
- 顶部 `App Shell`
- 详情页目录抽屉

但视觉和交互仍明显偏离产品稿，主要问题是：

1. 仍有“线条式 / 阴影式”视觉残留，不是“色块分层式”表达。
2. 顶部页头和抽屉菜单的动作与颜色不够贴近稿子。
3. 首页、日报页、笔记页卡片的间距、信息节奏、胶囊色值不准。
4. 详情页仍是“整段区块包一张卡”，而产品稿是“区块标题在外，单条内容为白色卡片”。
5. TOC 抽屉与左侧菜单抽屉的高亮色没有统一回到稿子里的粉色块。

### 本计划不处理

- 日报抓取、聚类、LLM 生成链路
- GitHub Actions / Pages 部署
- 后台管理与 `hexo-admin`
- PC 端独立桌面信息架构
- 非当前视觉调整必需的脚本/主题大清理

### 不得改动

- `tools/digest.mjs` 及 digest 规则
- 非当前视觉任务相关的文章内容
- `source/_posts/AI-开发项目实践分享记录.md`

---

## 视觉还原硬规则

1. 全站移动端不依赖线条分隔信息层级，优先使用背景色块、圆角块和留白。
2. 选中态只允许使用整块底色高亮，不使用底边线、描边线、细竖线。
3. 首页 / 日报 / 笔记 / 详情 的底色必须统一为暖灰系，白卡片浮于其上。
4. `AI 日报` 的胶囊色固定为浅粉块；`AI 笔记` 的胶囊色固定为浅米黄块。
5. 左侧抽屉和右侧目录抽屉的当前项高亮统一为粉色块，不再使用蓝色高亮。
6. 页头按钮只保留图标，不使用描边圆按钮。
7. 所有主导航仍必须使用真实 `<a href="...">`，不得回退到 `onclick` 跳转。

建议设计 token 以此为起点：

```stylus
$app-page-bg = #f4efef
$app-surface = #fffdfd
$app-text-strong = #6e7077
$app-text = #8f9198
$app-text-muted = #b0b1b8
$app-tab-active = #bfd2ff
$app-tab-active-text = #3c4a63
$app-daily-pill = #f6d1d3
$app-daily-pill-text = #8d6f75
$app-note-pill = #f7e8af
$app-note-pill-text = #8e8157
$app-drawer-active = #f2d2d4
$app-shadow-soft = 0 8px 22px rgba(121, 113, 112, 0.04)
```

---

### Task 1: 冻结设计 Token 并去掉线条式视觉语言

**Files:**
- Modify: `source/_data/app-shell.styl`
- Modify: `source/_data/app-cards.styl`
- Modify: `source/_data/app-views.styl`
- Modify: `source/_data/detail-view.styl`

**Step 1: 建立当前视觉基线**

Run:

```bash
npm run clean && npm run build
npm run server -- -p 4020
```

手工打开以下页面并截图留档：

- `http://127.0.0.1:4020/julynotebook/`
- `http://127.0.0.1:4020/julynotebook/categories/daily-news/`
- `http://127.0.0.1:4020/julynotebook/categories/july-notes/`
- `http://127.0.0.1:4020/julynotebook/2026/03/10/digest-2026-03-10/`

Expected: 能看见当前偏差，用于对照修正。

**Step 2: 用统一 token 覆盖四个 Stylus 文件顶部变量**

将上述设计 token 写入四个样式文件的共享变量区，保证以下值一致：

```stylus
$app-page-bg = #f4efef
$app-surface = #fffdfd
$app-text-strong = #6e7077
$app-text = #8f9198
$app-text-muted = #b0b1b8
$app-tab-active = #bfd2ff
$app-tab-active-text = #3c4a63
$app-daily-pill = #f6d1d3
$app-note-pill = #f7e8af
$app-drawer-active = #f2d2d4
$app-shadow-soft = 0 8px 22px rgba(121, 113, 112, 0.04)
```

**Step 3: 删除明显线条感**

把以下规则改掉：

- 所有 `border 1px solid ...`
- 强烈 `outline` 的默认可见状态
- 卡片之间依赖描边分隔的做法
- 抽屉菜单项 `border-radius + outline` 组合高亮

保留内容：

- `focus-visible` 可访问性描边
- 引用 `cite` 小组件自己的描边

**Step 4: 运行构建验证样式无语法错误**

Run:

```bash
npm run build
```

Expected: `hexo generate` 成功，无 Stylus 报错。

**Step 5: Commit**

```bash
git add source/_data/app-shell.styl source/_data/app-cards.styl source/_data/app-views.styl source/_data/detail-view.styl
git commit -m "style: realign mobile color tokens and block-based surfaces"
```

### Task 2: 让页头和左侧抽屉贴近产品稿

**Files:**
- Modify: `source/js/app-shell.js`
- Modify: `source/_data/app-shell.styl`

**Step 1: 先确认当前失败点**

手工检查首页与日报页：

- 首页左侧应该只有菜单按钮
- 日报页和笔记页左侧应该同时出现“菜单 + 返回”
- 抽屉菜单当前项应该是粉色整块，而不是蓝色或带图标高亮
- 菜单项不应显示多余图标

Expected: 当前实现不满足以上至少两项。

**Step 2: 修改抽屉 HTML 结构，移除菜单项图标**

把 `生成抽屉菜单(root)` 改为纯文本菜单项：

```js
return `
  <div class="app-drawer-title">川下の楠木</div>
  <nav class="app-drawer-menu" aria-label="站点主菜单">
    <a href="${root}" class="app-drawer-menu-item" data-path="${root}"><span>首页</span></a>
    <a href="${root}categories/daily-news/" class="app-drawer-menu-item" data-path="${root}categories/daily-news/"><span>AI 日报</span></a>
    <a href="${root}categories/july-notes/" class="app-drawer-menu-item" data-path="${root}categories/july-notes/"><span>AI 笔记</span></a>
    <a href="${root}iteration-log/" class="app-drawer-menu-item" data-path="${root}iteration-log/"><span>迭代记录</span></a>
  </nav>
`;
```

**Step 3: 调整页头动作图标与布局**

要求：

- 首页：左侧只显示 `fa-bars`
- 日报页 / 笔记页 / 迭代页：左侧 `fa-bars`，次按钮 `fa-angle-left`
- 详情页：左侧只有 `fa-angle-left`，右侧 `fa-list-ul`

同时在 `app-shell.styl` 中落实：

- 菜单按钮与返回按钮用纯透明背景
- 不加边框、不加圆底
- 左抽屉宽度控制为 `min(52vw, 210px)`
- 抽屉背景使用比页面更浅的暖灰
- 当前项使用 `$app-drawer-active`

**Step 4: 构建并手工验证抽屉**

Run:

```bash
npm run build
npm run server -- -p 4021
```

手工检查：

- 首页打开抽屉，当前项为“首页”粉色块
- 进入日报页后，页头左侧为“菜单 + 返回”
- 返回不会把按钮状态弄乱

**Step 5: Commit**

```bash
git add source/js/app-shell.js source/_data/app-shell.styl
git commit -m "style: align app header and drawer with mobile mock"
```

### Task 3: 调整首页的卡片节奏与底部入口

**Files:**
- Modify: `themes/next/layout/index.njk`
- Modify: `source/_data/app-cards.styl`
- Modify: `source/_data/app-views.styl`

**Step 1: 先修正文案与信息节奏**

在首页卡片中统一为：

- 日报摘要标签：`今日重点：`
- 笔记摘要标签：`文章概述：`
- 日报页脚左侧：`共 {{ post.app_entry_count or 0 }} 条`
- 笔记页脚右侧：`阅读全文 >`
- 列表说明改成不误导的文案：`已展示最近 20 篇内容`

**Step 2: 调整卡片比例和色块**

在样式中落实：

- 卡片背景纯白偏暖 `#fffdfd`
- 卡片圆角 `20px~22px`
- 阴影轻，不出现描边
- 日报徽标背景使用 `$app-daily-pill`
- 笔记徽标背景使用 `$app-note-pill`
- 首页底部两个 CTA 统一做成白色大圆角块，不用边框

日报卡片摘要：

- 仅展示前 3 条
- 行距偏松
- 溢出裁切，不出现多重滚动

笔记卡片摘要：

- 以 5 行为上限
- 让标签区与“阅读全文”形成左右对齐

**Step 3: 校正首页 Tab**

要求：

- 未选中：白色胶囊
- 选中：浅蓝整块
- 不得出现黑边、下划线、描边高亮

**Step 4: 构建并人工核对首页**

Run:

```bash
npm run build
npm run server -- -p 4022
```

手工核对：

- 首页顶部标题和按钮位置接近稿子
- 三个 Tab 的颜色、圆角、内边距接近稿子
- 两张不同类型卡片在同一屏内视觉一致
- 底部两个按钮是白块，不是描边按钮

**Step 5: Commit**

```bash
git add themes/next/layout/index.njk source/_data/app-cards.styl source/_data/app-views.styl
git commit -m "style: realign home cards tabs and footer actions"
```

### Task 4: 调整日报页与笔记页，使它们共享同一视觉语言

**Files:**
- Modify: `themes/next/layout/category.njk`
- Modify: `source/_data/app-cards.styl`
- Modify: `source/_data/app-views.styl`
- Modify: `source/_data/app-shell.styl`

**Step 1: 日报页月份分组对齐稿子**

要求：

- 月份标题 `2026.03` 使用更深的灰色和更大字号
- 最近月份卡片沿用首页日报卡片样式
- 老月份紧凑列表改成“白色块内堆叠项”，不依赖分割线

紧凑列表单项要求：

- 左：`MM-DD`
- 中：标题单行截断
- 右：箭头
- 不显示摘要

**Step 2: 笔记页标签栏对齐稿子**

要求：

- 顶部标签栏和首页 Tab 同视觉体系
- 标签栏横向滚动
- 激活项浅蓝块
- 未激活项白块

**Step 3: 笔记卡片标签回到“低强调文本”**

要求：

- 不使用实体 chip 胶囊
- 只显示浅灰 `# tag`
- 与“阅读全文 >”形成左右布局

示例目标结构：

```html
<div class="app-card__footer">
  <span class="app-card__tags">
    <span class="app-tag-chip"># vibe coding</span>
    <span class="app-tag-chip"># AI产品观察</span>
  </span>
  <span class="app-card__footer-arrow">阅读全文 &gt;</span>
</div>
```

但 `.app-tag-chip` 的样式必须是“文本态”，不是色块胶囊。

**Step 4: 构建并人工核对日报页与笔记页**

Run:

```bash
npm run build
npm run server -- -p 4023
```

手工核对：

- 日报页月份分组清晰
- 老月份列表不靠线条分隔
- 笔记页标签栏可横向滚动
- 笔记页标签区不再像按钮组

**Step 5: Commit**

```bash
git add themes/next/layout/category.njk source/_data/app-cards.styl source/_data/app-views.styl source/_data/app-shell.styl
git commit -m "style: align daily and notes archive views with mobile mock"
```

### Task 5: 把详情页从“大区块卡”改成“区块标题 + 单条白卡”

**Files:**
- Modify: `scripts/post-structure.js`
- Modify: `source/_data/detail-view.styl`
- Modify: `source/js/post-layout.js`
- Modify: `source/js/app-shell.js`

**Step 1: 先修正错误的卡片包裹策略**

当前 `scripts/post-structure.js` 的 `包装卡片区块(html)` 是按整个 `h2` 区块包一张卡，这与产品稿不符。改成：

- `重点资讯` / `其他快讯` / `核心论文` 的 `h2` 标题保留在卡片外
- 每个 `h3 + 随后的正文/来源` 包成一张 `.app-entry-card`
- `其他快讯` 若没有 `h3`，则按 `li` 单项拆卡
- `核心论文` 同样按条目拆卡

**Step 2: 目标 HTML 结构固定如下**

```html
<section class="app-section-block">
  <h2>重点资讯</h2>
  <div class="app-entry-list">
    <article class="app-entry-card">
      <h3>1. 标题</h3>
      <p>正文摘要</p>
      <div class="app-entry-sources">参考来源：...</div>
    </article>
  </div>
</section>
```

**Step 3: 用样式把详情页拉回稿子**

在 `detail-view.styl` 中落实：

- 页面底色暖灰
- 区块标题在外部，不包白卡
- 每条资讯 / 快讯 / 论文条目各是一张白卡
- `app-detail-stat` 用浅粉块
- TOC 抽屉当前项用浅粉块，不用蓝色
- `digest-signal-chip` 保持粉色小块
- 上下篇导航减少线条感，优先靠留白与字色

**Step 4: 构建并人工核对详情页**

Run:

```bash
npm run clean && npm run build
npm run server -- -p 4024
```

手工核对：

- 详情页左上返回、右上目录按钮都正常
- `重点资讯` 是标题 + 多张单条白卡，而不是一整段一张卡
- 目录抽屉当前项是粉色块
- 参考来源区域是轻量文本，不是大块深色条

**Step 5: Commit**

```bash
git add scripts/post-structure.js source/_data/detail-view.styl source/js/post-layout.js source/js/app-shell.js
git commit -m "style: restructure daily detail cards and toc drawer"
```

### Task 6: 清理冲突规则，避免视觉回弹

**Files:**
- Modify: `source/_data/styles.styl`
- Modify: `source/_data/body-end.njk`
- Modify: `source/js/app-views.js`
- Optional Delete: 仅删除确认未引用的旧视觉脚本或草稿文件

**Step 1: 核对总入口**

确保 `source/_data/styles.styl` 只保留四个模块入口：

```stylus
@import "app-shell"
@import "app-cards"
@import "app-views"
@import "detail-view"
```

不要重新把零散视觉补丁塞回这个入口文件。

**Step 2: 核对脚本注入顺序**

`source/_data/body-end.njk` 中脚本顺序应保持：

1. `cite-tooltip.js`
2. `app-shell.js`
3. `app-views.js`
4. `post-layout.js`
5. `busuanzi-format.js`

不要恢复旧 `home-tabs.js` 或其他废弃脚本。

**Step 3: 删除确认无用的视觉草稿**

只删除满足以下条件的文件：

- 当前模板和脚本没有引用
- 与本次视觉还原无关
- 不会影响文章资源或数据脚本

不要删除：

- 文章资源目录
- `implementation_plan.md`
- `AGENTS.md`
- 任何 digest 数据文件

**Step 4: 构建验证无引用错误**

Run:

```bash
npm run build
```

Expected: 无 `script not found`、无 Stylus import 错误。

**Step 5: Commit**

```bash
git add source/_data/styles.styl source/_data/body-end.njk source/js/app-views.js
git commit -m "chore: remove conflicting visual glue and keep app shell entry clean"
```

### Task 7: 做三轮完整验收，确认真的贴近稿子

**Files:**
- 无新增代码文件
- 需要回看：`themes/next/layout/index.njk`
- 需要回看：`themes/next/layout/category.njk`
- 需要回看：`scripts/post-structure.js`
- 需要回看：`source/_data/app-shell.styl`
- 需要回看：`source/_data/app-cards.styl`
- 需要回看：`source/_data/app-views.styl`
- 需要回看：`source/_data/detail-view.styl`

**Step 1: 第一轮，构建烟测**

Run:

```bash
npm run clean && npm run build
npm run server -- -p 4025
curl -I http://127.0.0.1:4025/julynotebook/
curl -I http://127.0.0.1:4025/julynotebook/categories/daily-news/
curl -I http://127.0.0.1:4025/julynotebook/categories/july-notes/
curl -I http://127.0.0.1:4025/julynotebook/2026/03/10/digest-2026-03-10/
```

Expected: 4 个页面都返回 `200 OK`。

**Step 2: 第二轮，移动端视觉验收**

手工以 `390 x 844` 或接近的移动端视口打开 4 个页面，逐项对照产品稿：

- 首页：暖灰底、蓝色选中 Tab、粉色日报徽标、米黄笔记徽标、白色底部 CTA
- 菜单：纯文本菜单项、粉色当前项
- 日报页：月份标题 + 白色块卡片 / 白色块紧凑列表
- 笔记页：横向标签栏 + 白卡笔记
- 详情页：区块标题在外，单条白卡在内，右侧目录粉色高亮

Expected: 页面主视觉、动作和稿子接近，无明显蓝色线条高亮或重边框残留。

**Step 3: 第三轮，桌面端兼容验收**

手工以 `1280 x 900` 视口打开同样 4 个页面，确认：

- 内容仍居中，不横向溢出
- 页头没有错位
- 抽屉打开后遮罩和定位正常
- 卡片宽度不会过分拉伸

Expected: PC 端是移动端形态的安全兼容版，而不是坏掉的放大版。

**Step 4: 记录偏差并做最后微调**

仅允许做：

- 色值微调
- 间距微调
- 圆角 / 阴影微调
- 抽屉宽度 / 内边距微调

禁止在这一轮重新打开数据层或模板结构重写。

**Step 5: 最终 Commit**

```bash
git add themes/next/layout/index.njk themes/next/layout/category.njk scripts/post-structure.js source/_data/styles.styl source/_data/app-shell.styl source/_data/app-cards.styl source/_data/app-views.styl source/_data/detail-view.styl source/_data/body-end.njk source/js/app-shell.js source/js/app-views.js source/js/post-layout.js
git commit -m "feat: visually realign mobile app shell to product mock"
```

---

## 最终验收清单

交付前必须全部满足：

- 首页、日报页、笔记页、详情页都保留暖灰底 + 白卡 + 低饱和色块体系
- 视觉分层主要靠背景块和留白，不靠边框和分割线
- 首页 / 笔记页 Tab 为白块 + 蓝色激活块
- 抽屉当前项和 TOC 当前项都是粉色块
- `AI 日报` 胶囊是浅粉块，`AI 笔记` 胶囊是浅米黄块
- 详情页是“区块标题在外、单条内容白卡在内”
- 所有页面仍通过真实 `<a href>` 跳转，Pjax 不被破坏
- `npm run clean && npm run build` 通过
- 四个核心页面手工访问通过

## 迁移策略

无迁移，直接替换当前偏离稿子的视觉实现与详情页卡片结构。
