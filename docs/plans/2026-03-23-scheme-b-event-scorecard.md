# 方案 B 事件评分与预归并 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在保留当前 digest 骨架的前提下，实现统一事件级评分卡、头部 AI 实体优先、LLM 前预归并、重点资讯最少 3 条和阶段级日志，并新增一个多智能体任务拆分 skill。

**Architecture:** 保留“抓取 → 去重/过滤 → 聚类 → shortlist → 深读 → 成稿”的阶段化链路，在 topic/event 层增加统一 scorecard 和 deterministic pre-merge。LLM 继续承担聚类、选题和成稿，但不接管历史过滤与低成本规则判断。

**Tech Stack:** Node.js、Hexo、现有 digest 引擎、node:test、自定义 Codex skill

---

### Task 1: 落地事件级 scorecard 常量与测试

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/topic-ranking.test.mjs`

**Step 1: 写失败测试**

- 增加以下断言：
  - 头部实体 topic 分数高于普通 topic
  - 高行业价值事件高于一般资讯
  - `company_view` 也能吃到公司源 bonus

**Step 2: 跑测试确认失败**

Run: `node --test tests/digest/topic-ranking.test.mjs`

**Step 3: 实现 scorecard**

- 新增头部实体常量
- 新增行业价值类型与分值
- 为 topic 构建 `topic_scorecard`
- 重构 `scoreTopicForSelection`
- 修正 `company` / `company_view` 识别

**Step 4: 跑测试确认通过**

Run: `node --test tests/digest/topic-ranking.test.mjs`

### Task 2: 实现 LLM 前预归并

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/history-evidence.test.mjs`

**Step 1: 写失败测试**

- 构造同实体、同日、标题高重合的候选
- 验证进入聚类前会被预归并
- 验证 follow-up 场景不会被误归并

**Step 2: 跑测试确认失败**

Run: `node --test tests/digest/history-evidence.test.mjs`

**Step 3: 写最小实现**

- 新增 deterministic pre-merge helper
- 在 `candidateCards` 进入聚类前调用
- 审计输出 pre-merge 统计

**Step 4: 跑测试确认通过**

Run: `node --test tests/digest/history-evidence.test.mjs`

### Task 3: 实现重点资讯至少 3 条补齐

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/fallback-summary.test.mjs`

**Step 1: 写失败测试**

- 构造 `hotNews < 3` 场景
- 断言会从高分 other/候选中补齐到 3 条
- 断言不会引入低价值社区噪声

**Step 2: 跑测试确认失败**

Run: `node --test tests/digest/fallback-summary.test.mjs`

**Step 3: 写最小实现**

- 在 `normalizeDailySummary` 中增加热新闻最小数量补齐
- 优先高分、多源、头部实体、公司源

**Step 4: 跑测试确认通过**

Run: `node --test tests/digest/fallback-summary.test.mjs`

### Task 4: 增加阶段日志与审计字段

**Files:**
- Modify: `tools/digest.mjs`
- Test: `tests/digest/llm-gateway.test.mjs`

**Step 1: 写失败测试**

- 至少覆盖新的 scorecard 字段 / 日志辅助函数输出结构

**Step 2: 跑测试确认失败**

Run: `node --test tests/digest/llm-gateway.test.mjs`

**Step 3: 写最小实现**

- 加 `cluster chunk i/n` 等日志
- 在 topic/audit 里输出 scorecard

**Step 4: 跑测试确认通过**

Run: `node --test tests/digest/llm-gateway.test.mjs`

### Task 5: 新增多智能体拆分 skill

**Files:**
- Create: `/Users/nanmuchuan/.codex/superpowers/skills/multi-domain-task-decomposition/SKILL.md`

**Step 1: 写 skill 文案**

- 包含：适用场景、拆分原则、何时不要拆、一个最小示例

**Step 2: 自查**

- 确认与现有 `dispatching-parallel-agents` 不冲突，而是更偏“任务理解阶段的并行拆域”

### Task 6: 全量验证

**Files:**
- Verify only

**Step 1: 运行定向测试**

Run:
```bash
node --test tests/digest/topic-ranking.test.mjs tests/digest/history-evidence.test.mjs tests/digest/fallback-summary.test.mjs tests/digest/llm-gateway.test.mjs
```

**Step 2: 运行全量 digest 测试**

Run:
```bash
npm run test:digest
```

**Step 3: 运行真实 dry-run**

Run:
```bash
DIGEST_PROFILE=morning DIGEST_DRY_RUN=1 npm run digest
DIGEST_PROFILE=evening DIGEST_DRY_RUN=1 npm run digest
```

检查：
- 重点资讯是否至少 3 条
- 候选与 topic 总量是否合理
- 日志是否出现阶段级进度

**Step 4: 构建与本地页面验证**

Run:
```bash
npm run clean && npm run build
npm run server -- -p 4000
```

请求并检查：
- `http://127.0.0.1:4000/julynotebook/`
- `http://127.0.0.1:4000/julynotebook/categories/daily-news/`
- 最新早报详情页
- 最新晚报详情页

*** End Patch
