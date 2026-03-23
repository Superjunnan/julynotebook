# 早晚报统一增强 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在不破坏现有双 edition 日报链路的前提下，增强早报和晚报的来源池、排序质量与重点资讯稳定性，并保证时间写入与页面验证正确。

**Architecture:** 继续复用现有 `tools/digest.mjs` 引擎与 `sources.yml` 来源注册体系，在来源层补公开自动源，在排序层加入头部实体与时效性加权，并在 `normalizeDailySummary` / fallback 流程里补“重点资讯至少 3 条”的兜底逻辑。微信 / 小红书仅落为观察层设计，不进入生产自动抓取链路。

**Tech Stack:** Node.js、Hexo、NexT、YAML 来源配置、node:test、现有 digest 引擎与本地 hexo server

---

### Task 1: 扩充国内公开自动源

**Files:**
- Modify: `sources.yml`
- Modify: `tests/digest/source-registry.test.mjs`

**Step 1: Write the failing test**

在 `tests/digest/source-registry.test.mjs` 中新增断言，要求以下来源存在并可运行：

- `ai-bot-daily-ai-news`
- `qbitai-news`
- `jiqizhixin-articles`
- `leiphone-ai`
- 如新增其他官方页，也补对应断言

**Step 2: Run test to verify it fails**

Run:
```bash
node --test tests/digest/source-registry.test.mjs
```

Expected:
- 新增来源相关断言失败

**Step 3: Write minimal implementation**

在 `sources.yml` 中补充或修正：

- `ai-bot.cn/daily-ai-news/`
- `量子位`
- `机器之心`
- `雷锋网 AI`
- 如确认可抓，再补官方更新页

要求：
- 优先使用 `direct_feed/rss`，其次 `page_scrape`
- 对每个来源配置合理的：
  - `preferred_in`
  - `bucket_hint`
  - `include_url_patterns`
  - `include_keywords`
  - `exclude_keywords`

**Step 4: Run test to verify it passes**

Run:
```bash
node --test tests/digest/source-registry.test.mjs
```

Expected:
- PASS

**Step 5: Commit**

```bash
git add sources.yml tests/digest/source-registry.test.mjs
git commit -m "feat: expand domestic digest sources"
```

### Task 2: 增强头部实体与时效性排序

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `tests/digest/topic-ranking.test.mjs`

**Step 1: Write the failing test**

在 `tests/digest/topic-ranking.test.mjs` 中新增测试：

- 命中头部 AI 公司实体的话题分数高于同等普通话题
- 更近时间的同类话题分数高于更旧时间的话题
- 热度信号存在时可以获得额外 bonus

**Step 2: Run test to verify it fails**

Run:
```bash
node --test tests/digest/topic-ranking.test.mjs
```

Expected:
- 新增排序测试失败

**Step 3: Write minimal implementation**

在 `tools/digest.mjs` 的 topic ranking 逻辑中：

- 提取头部 AI 实体命中函数
- 提高 `recencyBonus(pubDate)` 在总分中的权重
- 对可得的热度信号增加 bonus

保持：
- 现有多源、可信度、AI 相关性判断不被破坏

**Step 4: Run test to verify it passes**

Run:
```bash
node --test tests/digest/topic-ranking.test.mjs
```

Expected:
- PASS

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/topic-ranking.test.mjs
git commit -m "feat: boost entity and freshness ranking"
```

### Task 3: 为早报和晚报统一补齐至少 3 条重点资讯

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `tests/digest/fallback-summary.test.mjs`
- Modify: `tests/digest/topic-qualification.test.mjs`

**Step 1: Write the failing test**

新增测试覆盖：

- 当 `重点资讯` 少于 3 条时，会从 `其他快讯` 中补齐到 3 条
- 补齐顺序按综合分倒序
- 不会把低质量噪声内容硬塞入 `重点资讯`
- 早报和晚报都适用

**Step 2: Run test to verify it fails**

Run:
```bash
node --test tests/digest/fallback-summary.test.mjs tests/digest/topic-qualification.test.mjs
```

Expected:
- 新增补齐规则测试失败

**Step 3: Write minimal implementation**

在 `tools/digest.mjs` 中：

- 先保留现有 `重点资讯` 资格判定
- 如果最终 `hotNews.length < 3`
  - 从 `otherNews` 候选池里按综合分补齐
  - 补齐前再过最低质量门槛
- 统一适配 morning / evening

**Step 4: Run test to verify it passes**

Run:
```bash
node --test tests/digest/fallback-summary.test.mjs tests/digest/topic-qualification.test.mjs
```

Expected:
- PASS

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/fallback-summary.test.mjs tests/digest/topic-qualification.test.mjs
git commit -m "feat: guarantee minimum hot-news coverage"
```

### Task 4: 保持 edition 偏置并验证跨版去重不回归

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `tests/digest/stale-filter.test.mjs`
- Modify: `tests/digest/history-evidence.test.mjs`
- Modify: `tests/digest/public-source-routing.test.mjs`

**Step 1: Write the failing test**

补测试覆盖：

- 共享来源池下，早报仍偏海外
- 晚报仍偏国内
- 同日跨 edition 重复事件不重复入选
- follow-up 事件仍允许保留

**Step 2: Run test to verify it fails**

Run:
```bash
node --test tests/digest/stale-filter.test.mjs tests/digest/history-evidence.test.mjs tests/digest/public-source-routing.test.mjs
```

Expected:
- 新增偏置或去重相关测试失败

**Step 3: Write minimal implementation**

在 `tools/digest.mjs` 中校准：

- `preferred_in` bonus
- edition shortlist 偏置
- cross-edition published signature 去重

**Step 4: Run test to verify it passes**

Run:
```bash
node --test tests/digest/stale-filter.test.mjs tests/digest/history-evidence.test.mjs tests/digest/public-source-routing.test.mjs
```

Expected:
- PASS

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/stale-filter.test.mjs tests/digest/history-evidence.test.mjs tests/digest/public-source-routing.test.mjs
git commit -m "feat: preserve edition bias and cross-edition dedupe"
```

### Task 5: 时间逻辑与本地运行一致性

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `tests/digest/rendering.test.mjs`

**Step 1: Write the failing test**

确保覆盖：

- 早报默认时间为 `06:00:00`
- 晚报默认时间为 `19:40:00`
- 历史遗留的通用 `.env` 时间配置不会污染 edition 默认值
- 同日手动运行时不会写未来时间

**Step 2: Run test to verify it fails**

Run:
```bash
node --test tests/digest/rendering.test.mjs
```

Expected:
- 时间逻辑测试失败

**Step 3: Write minimal implementation**

在 `tools/digest.mjs` 中：

- edition 级默认发布时间显式化
- 忽略遗留通用默认值污染
- 同日手动运行时优先当前时间

**Step 4: Run test to verify it passes**

Run:
```bash
node --test tests/digest/rendering.test.mjs
```

Expected:
- PASS

**Step 5: Commit**

```bash
git add tools/digest.mjs tests/digest/rendering.test.mjs
git commit -m "fix: normalize digest post time by edition"
```

### Task 6: 真实 dry-run、全量测试与本地页面验收

**Files:**
- Verify only: `tools/digest.mjs`
- Verify only: `sources.yml`
- Verify only: `public/**`

**Step 1: Run targeted dry-run for evening digest**

Run:
```bash
DIGEST_PROFILE=evening DIGEST_DRY_RUN=1 npm run digest
```

Expected:
- `runnable_sources` 增加
- `after filter+dedupe` 高于当前基线
- 输出中能看到新增国内来源参与抓取

**Step 2: Run targeted dry-run for morning digest**

Run:
```bash
DIGEST_PROFILE=morning DIGEST_DRY_RUN=1 npm run digest
```

Expected:
- 早报仍能正常跑通
- 没有被晚报国内偏置严重污染

**Step 3: Run full digest tests**

Run:
```bash
npm run test:digest
```

Expected:
- 全部通过，允许 live smoke skip

**Step 4: Build site**

Run:
```bash
npm run clean && npm run build
```

Expected:
- `hexo generate` 成功

**Step 5: Start local server and verify pages**

Run:
```bash
npm run server -- -p 4000
```

Open / request:
- `http://localhost:4000/julynotebook/`
- `http://localhost:4000/julynotebook/categories/daily-news/`
- 一篇早报详情页
- 一篇晚报详情页

Expected:
- 首页正常
- 列表页正常
- 早晚报标题/badge 区分清楚
- `重点资讯` 至少 3 条

**Step 6: Commit**

```bash
git add .
git commit -m "feat: strengthen morning and evening digest prioritization"
```

