# 方案 B 事件评分与预归并设计

**目标**

在不推翻当前 digest 骨架的前提下，提升排序稳定性、信息密度和可解释性。保留现有“抓取 → 过滤/去重 → 聚类 → shortlist → 深读 → 成稿”的结构，把主要优化集中在：

- 统一事件级评分卡
- 头部 AI 公司 / 模型优先表
- LLM 前更强的确定性预归并
- `重点资讯 >= 3` 的稳定补齐
- 更细粒度的 LLM 阶段日志

**不做的事**

- 不把历史过滤整体改成 LLM 判定
- 不把整条链路改成单次超大 prompt
- 不移除现有审计文件体系
- 不破坏早报 / 晚报 edition 偏置与跨版去重

## 1. 设计原则

1. 确定性骨架优先于 LLM 黑盒。
2. 越早做掉的重复与低价值内容，越省 token。
3. 排序必须尽量可解释，能从 scorecard 反推为什么上榜。
4. LLM 负责高价值语义整合，不负责最便宜的规则判断。

## 2. 统一事件级评分卡

当前评分分散在 item / topic / final-entry 三层，本轮收敛出一套可复用的 topic/event 级 scorecard。

建议组成：

- `cross_verify_score`
  - 来源域名数
  - 来源组多样性
  - mention 数
  - 高信任来源比例
- `trust_score`
  - 来源 `trust_tier`
  - 官方 / 公司视图 bonus
- `recency_score`
  - `pubDate` 新鲜度
  - 缺时间不给 bonus，但不直接误杀
- `entity_priority_score`
  - 头部 AI 公司 / 模型命中
  - edition 偏置只做 bonus，不做硬过滤
- `industry_value_score`
  - 模型发布、API/平台、商业化、融资、监管、算力/芯片、安全、benchmark 等事件类型
- `engagement_score`
  - 有 views / comments / likes 时加分

最终形成：

- `topic_scorecard`
- `topic_total_score`

并让 shortlist、兜底补齐、审计输出都基于同一总分。

## 3. 头部 AI 公司 / 模型优先表

分三级：

- 核心：
  - OpenAI
  - Anthropic
  - Google / DeepMind / Gemini
  - Meta / Llama
  - xAI / Grok
  - Nvidia
  - MiniMax
  - 智谱 / GLM
  - 阿里 / 通义 / Qwen
  - 字节 / 豆包 / Seed
  - 腾讯 / 混元
  - 月之暗面 / Kimi
  - DeepSeek
  - 百度 / 文心 / 千帆
  - 华为 / 盘古
  - 小米
- 重要：
  - Mistral
  - Cohere
  - Perplexity
  - Cursor / Windsurf / Codeium 等关键应用层平台
- 补充：
  - 其余 AI 公司与模型品牌

用途：

- topic 排序 bonus
- `重点资讯` 不足 3 条时的优先补齐
- 早晚报 edition 偏置的实体级输入

## 4. 确定性预归并

目标是减少“同主体 + 同事件 + 不同站点改写标题”进入聚类。

仅在以下条件下安全预归并：

- 同一自然日
- 标题 token 高重合
- 命中同一核心实体
- 来源链接不同但事件标题明显同义
- 非论文

明确不归并：

- Follow-up（标题含发布后新进展、收入、监管、实测、回应、二次发布等）
- 时间跨度明显不同
- 同主体但不同产品 / 不同模型 / 不同业务线

实现形式：

- 在 `candidateCards` 进入 LLM 聚类前，先生成 `event_signature`
- 对高重合候选进行预分组
- 每组保留代表卡片 + 附属证据卡片列表
- 不修改最终 refs，只减少进入 LLM 的冗余卡片

## 5. 重点资讯最少 3 条

规则：

- 早报和晚报统一执行
- 先按现有 `qualifiesForHotNewsEntry` 选择
- 若不足 3 条：
  - 从高分 `otherNews` / 候选里补齐
  - 只允许补高分、非低价值社区噪声、优先头部实体与多源主题

这一步应尽量确定性，不把数量稳定性完全交给 LLM。

## 6. 日志与可观测性

新增阶段日志：

- `cluster chunk i/n start/end`
- `topic merge start/end`
- `singleton recluster start/end`
- `shortlist start/end`
- `summary start/end`

并打印：

- 输入条数
- 近似 prompt 大小
- 耗时
- 重试次数

## 7. skill 沉淀

新增一个 Codex 自定义 skill，目标是固化“多问题域优先并行拆给多个智能体”的工作方式。

skill 内容应覆盖：

- 适用场景
- 拆分原则
- 如何划定独立问题域
- 主智能体只负责整合与最终判断

