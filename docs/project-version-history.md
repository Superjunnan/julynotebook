# 项目版本迭代记录

本文档用于在新对话中快速恢复项目上下文。后续涉及框架、日报生成逻辑、发布链路或重要修复的变更，都应在这里追加记录。

## 项目技术框架

- 站点框架：Hexo 8 静态博客，主题为 NexT 8。
- 内容目录：文章集中在 `source/_posts/`，日报、晚报同样以 Markdown 文章形式生成。
- 构建命令：`npm run build`，等价于 `hexo generate`。
- 本地预览：`npm run server -- -p <port>`，站点根路径为 `/julynotebook/`。
- 部署目标：GitHub Pages，仓库为 `Superjunnan/julynotebook`。
- 主要自动化入口：`tools/digest.mjs` 负责 AI 日报/晚报生成，GitHub Actions 工作流位于 `.github/workflows/`。
- 主要测试：`tests/digest/*.test.mjs` 使用 Node.js 内置 test runner。

## 日报生成核心逻辑

`tools/digest.mjs` 是当前最核心的业务模块，主链路如下：

1. 读取来源配置并抓取 RSS、页面、API 或手动来源。
2. 对候选内容做去重、时间窗口过滤、AI 相关性过滤、NSFW 过滤和详情补全。
3. 给候选内容打分，并按新闻与论文分池控制正式候选规模。
4. 构建进入 LLM 聚类的 candidate cards，进一步限制输入量，降低 token 压力和噪音。
5. 调用 LLM 进行话题聚类、话题合并、单条新闻二次聚类与 shortlist。
6. 对选中话题做 deep read，生成最终日报/晚报 Markdown。
7. 写入 `source/_posts/`，并输出 `data/digest-reports/` 审计报告，便于复盘。

关键默认上限：

- 正式候选池：`DIGEST_CANDIDATE_POOL_CAP=250`。
- 新闻候选上限：`DIGEST_CANDIDATE_POOL_NEWS_CAP=200`。
- 论文候选上限：`DIGEST_CANDIDATE_POOL_PAPERS_CAP=50`。
- 单新闻源候选上限：`DIGEST_CANDIDATE_POOL_NEWS_PER_SOURCE_CAP=8`。
- LLM 聚类输入：`DIGEST_CLUSTER_INPUT_CAP=100`。
- LLM 聚类新闻输入：`DIGEST_CLUSTER_INPUT_CAP_NEWS=70`。
- LLM 聚类论文输入：`DIGEST_CLUSTER_INPUT_CAP_PAPERS=30`。

这里刻意区分“正式候选池”和“LLM 聚类输入”。前者保留足够覆盖面，后者控制模型压力，避免一次处理过多噪音内容。

## 稳定性策略

- 智谱 `429`、`1305`、`访问量过大`、`Too Many Requests` 等被统一识别为限流。
- 限流默认不会立刻走最终兜底，而是按 `15min`、`30min` 两个窗口重试。
- 可通过 `DIGEST_LLM_RATE_LIMIT_RETRY_DELAYS_MS` 覆盖限流重试窗口，例如 `900000,1800000`。
- 非限流瞬时错误仍使用常规短重试。
- 聚类、话题合并、单条新闻重聚类、shortlist 等 LLM 子链路在重试耗尽后会尽量降级，不让整篇报告直接失败。
- 核心论文模块不应再输出“该论文条目已纳入跟踪”这类泛化兜底，应尽量从论文标题、摘要和来源信息生成可读摘要。

## 版本记录

### 2026-05-09：早晚报同日话题重复过滤

背景：

- “OpenAI 发布 GPT-Realtime-2 语音模型”已进入 2026-05-08 早报，但同一事件在晚报侧可能因中文转述、不同来源链接和多来源证据被再次放行。
- 旧历史过滤主要依赖链接与标题签名；当早晚报引用不同媒体、标题从英文 API 更新变成中文模型名时，签名无法稳定命中。
- `keepFollowUpEvidence` 会把多来源证据视为可保留跟进，导致同日跨 edition 的重复事件风险偏高。

改动点与思路：

- 在 `tools/digest.mjs` 中新增成稿话题级历史记录 `publishedTopicsByEdition`，保存早报/晚报最终输出的重点资讯与其他快讯摘要。
- 历史过滤现在会从缓存中的 `daily` 总结和 `publishedTopicsByEdition` 读取跨 edition 话题，基于实体、模型/产品 token 和文本相似度识别“不同链接但同一事件”。
- 同一天跨早晚报命中的历史内容，不再因为 `evidenceCount > 1` 或多来源证据自动放行；只有显式 `followUpSignals` 才按真正跟进处理。
- 新增回归测试覆盖 GPT-Realtime-2 这类同日跨 edition、不同链接、标题变体重复的过滤场景。

验证记录：

- `node --test tests/digest/stale-filter.test.mjs tests/digest/candidate-dedupe.test.mjs tests/digest/history-evidence.test.mjs` 通过。
- `npm run test:digest` 通过（157 通过，1 跳过 live LLM smoke）。
- `npm run build` 通过。
- 本地 `hexo server` 请求首页、日报列表、2026-05-08 早报详情均返回 200。

### 2026-05-08：日报稳定性与候选池治理

背景：

- 晚报失败日志显示智谱接口返回 `HTTP 429` 与 `1305`，含义是模型访问量过大。
- 旧逻辑在部分限流或 LLM 子步骤失败时容易直接走兜底，导致报告质量下降或生成中断。
- 候选内容曾扩大到 600 多条，模型处理压力和噪音都偏高。
- 核心论文模块出现过“该论文条目已纳入跟踪”这类泛化摘要。

改动点与思路：

- 在 `tools/digest.mjs` 中增强限流识别，覆盖 HTTP 429、`1305`、中文“访问量过大/限流”和英文 rate limit 文案。
- 新增限流专用重试窗口，默认 15 分钟、30 分钟各重试一次，避免遇到限流就直接进入兜底。
- 将限流长等待纳入共享 LLM cooldown，避免后续请求继续撞限流。
- 为聚类与话题合并增加“重试耗尽后局部降级”的路径，尽量保留可生成报告的候选结构。
- 为 shortlist 增加确定性排序兜底，LLM 不可用时仍能继续生成。
- 增加顶层确定性 topic 选择兜底，防止聚类链路整体失败导致日报完全无法生成。
- 新增正式候选池裁剪：新闻最多 200 条，论文最多 50 条，总计最多 250 条。
- 保留更低的 LLM 聚类输入默认值：新闻 70 条，论文 30 条，总计 100 条。
- 增加单新闻源候选上限，避免同一来源刷屏挤占候选池。
- 修复核心论文与快讯渲染中的低价值模板文案，优先从材料标题、来源和摘要生成具体中文叙述。
- 扩充测试覆盖：候选池上限、限流 15/30 分钟重试、1305 限流识别、核心论文兜底摘要、渲染替换规则。

验证记录：

- `node --test tests/digest/preprocess-pools.test.mjs tests/digest/llm-gateway.test.mjs tests/digest/rendering.test.mjs tests/digest/fallback-summary.test.mjs` 通过。
- `npm run build` 通过。
- 本地 `hexo server` 请求首页、2026-05-07 日报、2026-05-06 晚报均返回 200。
- 页面检查未再发现“该论文条目已纳入跟踪”旧兜底句。

## 临时文件清理原则

- 可删除：`debug/`、`logs/*.log`、`test-results/`、临时验证截图、孤立调试文件。
- 应保留：`source/_posts/` 下的文章、用户正在编辑的文档、已生成日报文章、`data/digest-reports/` 中有复盘价值的审计报告。
- 清理前先查看 `git status -sb` 和候选文件列表，避免误删用户内容。

## 后续维护规则

- 涉及日报逻辑、稳定性、候选池、渲染样式或 GitHub Actions 的改动，应在本文件追加一条版本记录。
- 每次逻辑或样式调整后，按仓库约束运行测试/构建，并启动本地服务请求关键页面。
- 工作区混合时，提交必须显式指定文件，避免把无关文章、缓存或临时文件混入同一提交。
