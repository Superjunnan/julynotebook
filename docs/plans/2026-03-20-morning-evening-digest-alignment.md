# Morning/Evening Digest Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让早报与晚报在产品形态上完全同构，同时改为“来源偏置 + 选题偏置 + 跨版去重”，并将早报调度调整到北京时间 06:00。

**Architecture:** 保留现有 `morning/evening` edition 架构，不新增第二套 digest 引擎。通过来源元数据、topic ranking、deep-read 扩展与发布缓存四个点做最小增量修改。

**Tech Stack:** Hexo, NexT, Node.js, GitHub Actions, 自研 `tools/digest.mjs`

---

### Task 1: 调整来源元数据语义

**Files:**
- Modify: `sources.yml`
- Modify: `tools/intel/source-registry.mjs`
- Test: `tests/digest/source-registry.test.mjs`

**Step 1: 写失败测试**

- 验证晚报偏好国内来源，但不要求来源硬隔离
- 验证早报仍可读取共享来源

**Step 2: 跑测试确认失败**

Run: `node --test tests/digest/source-registry.test.mjs`

**Step 3: 最小实现**

- 将 `edition_scope` 语义收敛为“偏好”而不是“唯一入口”
- 保留极少数确实只能人工补录的源

**Step 4: 跑测试确认通过**

Run: `node --test tests/digest/source-registry.test.mjs`

### Task 2: 增加跨 edition 去重

**Files:**
- Modify: `tools/digest.mjs:900-965`
- Test: `tests/digest/publish-history.test.mjs` 或在现有相关测试文件中补案例

**Step 1: 写失败测试**

- 早报已发布的话题，晚报同日默认跳过
- 同一期同日重跑仍允许保留
- 有 follow-up 信号时允许跨版复用

**Step 2: 跑测试确认失败**

Run: `npm run test:digest`

**Step 3: 最小实现**

- `filterPreviouslyPublished` 支持跨 edition 查询
- 区分“同一期重跑”和“另一 edition 已发布”

**Step 4: 跑测试确认通过**

Run: `npm run test:digest`

### Task 3: 调整早晚报选题偏置

**Files:**
- Modify: `tools/digest.mjs:4790-5235`
- Test: `tests/digest/topic-ranking.test.mjs`

**Step 1: 写失败测试**

- 晚报模式下国内实体 topic 分数更高
- 早报模式下海外主题不受晚报偏置影响

**Step 2: 跑测试确认失败**

Run: `node --test tests/digest/topic-ranking.test.mjs`

**Step 3: 最小实现**

- `scoreTopicForSelection` 支持 edition 参数
- shortlist prompt 明确早/晚报偏置
- deep-read 扩展遵循 edition 偏置

**Step 4: 跑测试确认通过**

Run: `node --test tests/digest/topic-ranking.test.mjs`

### Task 4: 早晚报展示同构验证

**Files:**
- Modify: `scripts/app-post-meta.js`
- Modify: `themes/next/layout/index.njk`
- Modify: `themes/next/layout/category.njk`
- Modify: `source/_data/app-cards.styl`
- Test: `tests/digest/rendering.test.mjs`

**Step 1: 写失败测试**

- 晚报首页卡片摘要规则与早报一致
- 晚报条数统计与早报一致
- 仅 badge/标题文案不同

**Step 2: 跑测试确认失败**

Run: `node --test tests/digest/rendering.test.mjs`

**Step 3: 最小实现**

- 确保首页卡片逻辑复用早报规则
- 不新增晚报专属布局分支

**Step 4: 跑测试确认通过**

Run: `node --test tests/digest/rendering.test.mjs`

### Task 5: 调整早报工作流时间

**Files:**
- Modify: `.github/workflows/digest.yml`

**Step 1: 最小实现**

- 将早报 cron 与 `DIGEST_POST_TIME` 调整到北京时间 06:00 附近

**Step 2: 验证**

- 检查 workflow 里 UTC cron 与本地时间注释一致

### Task 6: 真实生成与页面验收

**Files:**
- Validate only

**Step 1: 跑全量测试**

Run: `npm run test:digest`

**Step 2: 生成晚报样例**

Run: `DIGEST_PROFILE=evening ... npm run digest`

**Step 3: 重建站点**

Run: `npm run clean && npm run build`

**Step 4: 启动本地服务**

Run: `npm run server -- -p 4027`

**Step 5: 页面检查**

检查：
- `/julynotebook/`
- `/julynotebook/categories/daily-news/`
- `/julynotebook/2026/03/20/evening-digest-2026-03-20/`

**Step 6: 记录结果**

- 输出测试结果
- 说明是否准备好给用户做本地前端走查
