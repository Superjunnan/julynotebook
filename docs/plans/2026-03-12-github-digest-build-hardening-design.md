# GitHub Digest Build Hardening Design

## Goal

把 GitHub 上的日报生成链路补成“能定位、能恢复、能少打免费接口”的稳定状态，重点解决 2026-03-11 失败 run 暴露出来的两个问题：

- workflow 层只有一个笼统的 `exit code 1`，失败后缺少足够诊断材料
- `Run digest` 中途失败时，已经完成的 LLM 结果没有及时落盘，重跑不能有效复用

## Confirmed Constraints

- 站点仍然是 Hexo + NexT，核心逻辑集中在 `tools/digest.mjs`
- 智谱免费接口仍然是主 LLM 通道，生产并发上限保持 2
- 不引入外部队列、数据库或独立服务
- 不能改坏已确认的日报内容规则、页面规则、数据链路规则
- 不能删除或覆盖非 digest 文章，尤其是 `source/_posts/AI-开发项目实践分享记录.md`

## Options Considered

### Option A: 只改 workflow action 版本

- 优点：改动最小，Node 20 deprecation warning 直接消失
- 缺点：不能解决 `Run digest` 本身因免费 LLM 波动而失败的问题

### Option B: 只强化 digest 内部重试

- 优点：能改善 live LLM 波动
- 缺点：如果进程已经退出，内存里的 cache 会丢，workflow 级别仍然缺少恢复入口和诊断产物

### Option C: Workflow + Runtime 一起加固

- 升级 actions 版本，处理 warning
- 给 workflow 增加“失败后保留诊断材料”和“CI 专用 digest 重试入口”
- 给 digest 增加“成功 LLM 结果立即落缓存”和“失败时写 runtime error report”

推荐采用 Option C，因为它同时解决“为什么失败”和“失败后如何恢复”两件事，且不需要引入重型基础设施。

## Recommended Design

### 1. Workflow Hardening

- `actions/checkout`、`actions/setup-node` 升级到 `v5`
- `Daily AI Digest` 不直接执行 `npm run digest`，改为走一个 CI wrapper
- 在 workflow 一开始就解析运行日期，确保失败时也能定位报告目录
- 当 digest 失败时，自动上传：
  - `data/digest-reports/<date>/`
  - `data/digest-cache.json`
  - 当日 digest markdown（如果已生成）

### 2. Resumable Cache Persistence

- `requestDigestLlmJson` 在 live 调用成功并写入 `cache.llm` 后，立即做一次 best-effort 持久化
- `cache.daily` 在写入后也立即持久化
- 这样即使本次进程在后续步骤退出，下一次 workflow retry 也能复用已完成的 LLM 结果

### 3. CI-Specific Retry Wrapper

- 新增一个轻量 Node 脚本作为 CI 入口
- 只在明显属于“瞬时错误”的情况下重试：
  - 429 / 1302 / 速率限制
  - 500 / 502 / 503 / 504
  - timeout / aborted / fetch failed / ECONNRESET / ETIMEDOUT
- 对于明显的配置错误、脚本错误、缺密钥等场景，不做盲目重试

### 4. Failure Diagnostics

- `tools/digest.mjs` 在顶层 fatal error 时写 `99-runtime-error.json`
- 内容至少包含：
  - 错误 message / stack
  - 运行日期
  - 当前 `llm_stats`
  - 关键 digest 环境摘要

这样以后即使 GitHub UI 只显示通用的 `exit code 1`，也能通过 artifact 看到真正的失败上下文。

## Testing Strategy

- 单测覆盖：
  - LLM live 成功后会触发 cache persistence hook
  - CI retry helper 能区分“可重试失败”和“不可重试失败”
- 本地验证：
  - `npm run test:digest`
  - `npx hexo clean && npx hexo generate`
  - 如果可行，`npm run test:digest:live`

## Expected Outcome

- GitHub workflow warning 收敛
- 免费智谱波动不再轻易导致整次 digest 任务直接报废
- 就算再次失败，也会留下足够的诊断信息和已完成缓存，便于自动重试或人工排查
