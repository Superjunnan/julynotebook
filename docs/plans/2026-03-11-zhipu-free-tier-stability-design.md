# Zhipu Free-Tier Stability Design

## Goal

在保持智谱免费接口可用的前提下，把日报生成与测试调用改造成“可排队、可复用、可恢复”的稳定链路。生产运行允许 LLM 并发 2，live 测试强制严格串行。

## Constraints

- 项目是单机脚本型 Hexo + NexT 站点，核心流程集中在 `tools/digest.mjs`。
- 不能引入额外常驻服务或重型队列系统。
- 免费接口波动较大，429、5xx、超时都要视为常见场景。
- 现有 `data/digest-cache.json` 已经会被 workflow 自动提交，新的稳定性设计应尽量复用这条数据链路。
- 默认测试不能依赖真实 LLM；live 测试必须显式开启，且严格串行。

## Recommended Architecture

### 1. Unified LLM Gateway

把所有智谱调用统一收敛到一个网关函数：

- 统一排队：继续复用现有 pacing，但增强为“队列 + 全局冷却”。
- 统一缓存：按 `operation + model + messages hash` 写入 `cache.llm`。
- 统一重试：429、5xx、超时、瞬时网络错误都纳入同一套退避策略。
- 统一统计：记录 cache hit / miss、live 调用次数、重试次数、失败类型。

这样做的收益是：

- 同一批输入重复运行时，不会重复消耗免费额度。
- 当流程中途失败时，重跑可以直接复用已完成的 LLM 结果。
- 测试和生产都走同一套稳定性逻辑，不会出现“测试路径和真实路径不一致”。

### 2. Resumable Execution by Deterministic Cache

不额外做独立 job queue，而是利用确定性缓存键实现“轻量恢复”：

- 聚类 chunk
- topic merge
- singleton recluster
- shortlist
- 最终日报总结
- 参考标题翻译

这些步骤都改成从 LLM cache 读取，命中则跳过 live 调用。这样即使当次运行在后半段失败，重跑也只需要补后续缺失步骤。

### 3. Live-Test Isolation

测试拆成两层：

- 默认单测：纯本地，不打智谱接口；验证缓存命中、重试、排队和降级逻辑。
- 可选 live smoke test：显式通过环境变量开启，脚本级强制 `DIGEST_LLM_MAX_CONCURRENCY=1`，只跑极小样例。

这保证了日常回归稳定，同时允许在需要时验证真实智谱接口仍可用。

## Data Flow Changes

### Cache Schema

`data/digest-cache.json` 增加：

- `llm`: LLM 结果缓存，key 为 deterministic hash

每个 entry 只保留：

- `operation`
- `model`
- `content`
- `at`

不写入完整 prompt，以控制缓存体积；prompt 一致性由 hash 保证。

### Runtime Metrics

增加运行态统计：

- `cache_hits`
- `cache_misses`
- `live_calls`
- `retry_count`
- `rate_limit_errors`
- `transient_errors`
- `timeout_errors`

这些统计写入审计报告，方便判断免费接口是否进入不稳定区间。

## Error Handling

- 429 / 1302 / 速率限制：指数退避，并抬高全局 `nextAllowedAt`
- 500 / 502 / 503 / 504：按瞬时服务错误重试
- 超时 / Abort / ETIMEDOUT / ECONNRESET：按网络瞬时错误重试
- 最终失败：保持现有降级策略，不中断整个 digest

## Testing Strategy

- 单测覆盖：
  - cache key 稳定性
  - cache hit 不触发 live 调用
  - live 调用成功后写 cache
  - 瞬时错误可重试成功
- live 测试覆盖：
  - 显式开关
  - 串行队列
  - 最小翻译/JSON 任务能返回合法结果

## Workflow Changes

- digest workflow 显式设置 `DIGEST_LLM_MAX_CONCURRENCY=2`
- 增加 `DIGEST_LLM_CACHE_RETENTION_DAYS`
- 不在 CI 默认执行 live LLM test；live test 保持手动、本地可选

## Why Not Use a Heavier Queue

SQLite / 独立 worker 当然更稳，但当前项目是单脚本产出型站点，复杂度和收益不匹配。这里最有价值的工程动作不是“引入更大系统”，而是让现有单脚本具备可恢复性和低重复调用特性。
