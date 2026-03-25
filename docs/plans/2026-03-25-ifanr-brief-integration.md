# 爱范儿早报混合源接入 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 把爱范儿早报以“混合模式”接入现有日报链路，并把单篇 roundup 拆为多条 AI 候选条目进入现有去重、聚类和打分流程。

**Architecture:** 保留现有 digest 确定性骨架，只新增 `ifanr_morning_brief` 解析器和一层 AI 过滤。来源仍通过 `sources.yml` 注册，拆出的候选继续走现有 scorecard、shortlist 和成稿链路。

**Tech Stack:** Node.js、Hexo、JSDOM/HTML parser、node:test

---

### Task 1: 为爱范儿早报解析器补测试

**Files:**
- Modify: `tests/digest/source-registry.test.mjs`
- Create: `tests/digest/ifanr-brief-parser.test.mjs`

**Step 1: Write the failing test**

- 为来源注册补一条断言：
  - `ifanr-brief` 已注册
  - `parser === "ifanr_morning_brief"`
  - `preferred_in === "evening"`
- 新建 `ifanr-brief-parser.test.mjs`
  - 用固定 HTML fixture 断言：
    - 能拆出至少 2 条候选
    - 非 AI 条目被过滤
    - AI 条目能保留标题、摘要、链接

**Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/digest/source-registry.test.mjs tests/digest/ifanr-brief-parser.test.mjs
```

Expected:
- `ifanr-brief` 不存在
- `extractIfanrMorningBriefItems` 未定义或返回不符合预期

**Step 3: Write minimal implementation**

- 在 `tools/digest.mjs` 中新增：
  - `extractIfanrMorningBriefItems(html, source, articleUrl)`
  - `isLikelyAiBriefItem(title, summary)`
- 先按最小规则实现：
  - 解析 article 内标题节点
  - 收集邻近段落作为摘要
  - 尝试提取外链

**Step 4: Run test to verify it passes**

Run:

```bash
node --test tests/digest/source-registry.test.mjs tests/digest/ifanr-brief-parser.test.mjs
```

Expected:
- PASS

### Task 2: 把爱范儿来源接入 sources.yml

**Files:**
- Modify: `sources.yml`
- Test: `tests/digest/source-registry.test.mjs`

**Step 1: Write the failing test**

- 在 `source-registry.test.mjs` 中补断言：
  - 来源 id 为 `ifanr-brief`
  - 可在 `evening` edition 运行

**Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/digest/source-registry.test.mjs
```

Expected:
- FAIL，来源不存在

**Step 3: Write minimal implementation**

在 `sources.yml` 增加：
- `id: ifanr-brief`
- `url: https://www.ifanr.com/category/ifanrnews`
- `ingestion_mode: page_scrape`
- `parser: ifanr_morning_brief`
- `group: domestic_media`
- `preferred_in: evening`
- 合理的 `include_keywords / exclude_keywords / weight`

**Step 4: Run test to verify it passes**

Run:

```bash
node --test tests/digest/source-registry.test.mjs
```

Expected:
- PASS

### Task 3: 让 page_scrape 支持爱范儿专用解析器

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/ifanr-brief-parser.test.mjs`

**Step 1: Write the failing test**

- 在 `ifanr-brief-parser.test.mjs` 中增加更具体断言：
  - 输入 category 页 + article 页 fixture 后，返回的 items 会带：
    - `sourceId`
    - `source`
    - `bucketHint`
    - `trustTier`
    - `pubDate`
    - `contentSnippet`

**Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/digest/ifanr-brief-parser.test.mjs
```

Expected:
- FAIL

**Step 3: Write minimal implementation**

- 在 `fetchPageScrapeItems` 中增加 `parser === "ifanr_morning_brief"` 分支
- 先抓 category 页发现若干“早报”文章
- 再逐篇抓详情并拆成 candidate items
- 限制每次最多处理少量 recent roundup，避免抓取过重

**Step 4: Run test to verify it passes**

Run:

```bash
node --test tests/digest/ifanr-brief-parser.test.mjs
```

Expected:
- PASS

### Task 4: 把爱范儿条目接入现有 scorecard 但保持低权重补充定位

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/topic-ranking.test.mjs`

**Step 1: Write the failing test**

- 补一个测试：
  - 同一事件下，`爱范儿 + 其他高质量源` 的 topic 分数应高于只有单一弱源的 topic
  - 但单独 `爱范儿` 条目不应无条件压过官方高信源

**Step 2: Run test to verify it fails**

Run:

```bash
node --test tests/digest/topic-ranking.test.mjs
```

Expected:
- FAIL

**Step 3: Write minimal implementation**

- 复用现有 `group/trust/weight/preferred_in`
- 对 `ifanr-brief` 不加额外特殊高权重
- 只允许其通过：
  - 交叉验证分
  - 头部实体命中
  - 行业价值分
  来自然上浮

**Step 4: Run test to verify it passes**

Run:

```bash
node --test tests/digest/topic-ranking.test.mjs
```

Expected:
- PASS

### Task 5: 跑全量验证并本地验收

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `sources.yml`
- Test: `tests/digest/*.test.mjs`

**Step 1: Run full test suite**

Run:

```bash
npm run test:digest
```

Expected:
- 全绿，允许 live smoke skip

**Step 2: Build site**

Run:

```bash
npm run clean && npm run build
```

Expected:
- `hexo generate` 成功

**Step 3: Restart local server and verify pages**

Run:

```bash
npm run server -- -p 4000
```

Then request:

- `http://127.0.0.1:4000/julynotebook/`
- `http://127.0.0.1:4000/julynotebook/categories/daily-news/`
- 一篇晚报详情页

Expected:
- 页面正常可访问
- 不引入前端回归

