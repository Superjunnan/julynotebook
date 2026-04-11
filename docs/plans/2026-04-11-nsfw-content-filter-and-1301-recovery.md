# NSFW 预过滤 + 智谱 1301 内容拦截自愈

**日期：** 2026-04-11  
**背景：** 4-11 摘要任务失败，根因是候选条目中包含成人行业内容（麻豆传媒关停相关文章），在聚类阶段送入 GLM-4.7-flash 时触发智谱 1301 内容安全拦截，导致整批聚类中断，任务崩溃。

---

## 改动 A：NSFW 关键词预过滤

**文件：** `tools/digest.mjs`

### 新增常量

```js
const NSFW_KEYWORDS = [
  "成人影片", "成人内容", "成人平台", "成人行业", "成人网站", "成人APP", "成人app",
  "女优", "男优", "AV女优", "AV男优",
  "妓馆", "妓院", "性工作者",
  "NSFW",
];
```

关键词设计原则：**精确匹配完整词**，避免误杀「成人礼」「成人教育」等正常词汇。

### 新增函数 `isNsfwCandidate(item)`

在 `preprocessCandidatePools` 的 AI 门之后增加 NSFW 门，命中则丢弃并计入 `stats.dropped_by_nsfw_gate`，同时输出 `[nsfw-gate] dropped:` 日志行便于 CI 追踪。

---

## 改动 B：1301 内容拦截自愈降级

**文件：** `tools/digest.mjs`

### 新增函数 `isContentFilterError(e)`

```js
function isContentFilterError(e) {
  const msg = String(e?.message || "");
  return msg.includes("1301") || msg.includes("contentFilter");
}
```

### 修改 `requestClusterAssignmentsChunkWithAdaptiveSplit`

- 1301 错误与限流/瞬时错误一样触发二分拆分（`reason=content_filter_1301`）
- 当 chunk 缩减到单条仍触发 1301 时，直接降级为 `fallback` assignment，不再向上抛错
- 保证其余正常条目的聚类不受单条问题内容影响

---

## 测试

新增测试用例：

- `preprocess-pools.test.mjs`：
  - NSFW 关键词命中时 `dropped_by_nsfw_gate` 计数正确
  - 「成人礼」「成人教育」等不被误杀
- `llm-gateway.test.mjs`：
  - 1301 触发时单条卡片降级为 fallback，其余正常返回

所有测试通过（`preprocess-pools` 8/8，`llm-gateway` 19/19）。

---

## 覆盖的智谱风控类别

本次仅处理**成人内容**类别。其他类别（宗教、政治敏感、赌博等）通过改动 B 的自愈机制兜底处理，不做预过滤。
