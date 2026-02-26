# July Blog 核心代码逐行中文注释（新手版）

> 这份文档按“文件 + 关键代码行”逐行解释。  
> 由于 `tools/digest.mjs` 代码量较大，这里覆盖的是**核心链路**（你日常改动最常碰到的部分）。

---

## 1) 自动任务：`.github/workflows/digest.yml`

```yml
name: Daily AI Digest
```
- 工作流名称（显示在 GitHub Actions 页面）。

```yml
on:
  schedule:
    - cron: "0 1 * * *"
  workflow_dispatch: {}
```
- `schedule`：定时触发。  
- `0 1 * * *`：UTC 每天 01:00（即北京时间每天 09:00）。  
- `workflow_dispatch`：允许你在网页手动点“Run workflow”立即执行一次。

```yml
env:
  ZHIPU_API_KEY: ${{ secrets.ZHIPU_API_KEY }}
  ZHIPU_MODEL: glm-4.7-flash
  DIGEST_TZ: Asia/Shanghai
  DIGEST_POST_TIME: "09:00:00"
```
- 把密钥与时区、发布时间传给脚本。  
- `ZHIPU_API_KEY` 必须在 GitHub 仓库 `Secrets` 中配置。

```yml
- name: Run digest
  run: npm run digest
```
- 执行你本地同款命令，不需要再手写 `node tools/digest.mjs`。

```yml
- name: Commit digest + cache
```
- 自动把新生成文章与缓存提交回仓库（这样 GitHub Pages 会更新）。

---

## 2) Digest 主流程：`tools/digest.mjs`

### 2.1 环境变量与路径

```js
const ROOT = process.cwd();
const CONFIG_PATH = path.join(ROOT, "sources.yml");
const POSTS_DIR = path.join(ROOT, "source", "_posts");
const CACHE_PATH = path.join(ROOT, "data", "digest-cache.json");
```
- 定义项目根目录、订阅源配置、文章输出目录、缓存文件位置。

```js
loadDotEnv(ROOT);
```
- 本地运行时读取 `.env`，避免每次手动 `export`。

### 2.2 关键参数

```js
const TOP_N = 15;
const FETCH_CONCURRENCY = 4;
const PER_ARTICLE_MAX_CHARS = 1800;
```
- `TOP_N`：最终入选文章数。  
- `FETCH_CONCURRENCY`：并发抓正文数量。  
- `PER_ARTICLE_MAX_CHARS`：单篇送入模型的最大正文长度（控制 token）。

### 2.3 安全与清洗

```js
function safeHttpUrl(url) { ... }
```
- 只允许 `http/https`，防止把非法协议写进文章链接。

```js
function redactUrlLike(s) { ... }
```
- 删除模型输出中可能混入的 URL，避免模型乱贴链接。

```js
function normalizeRefs(refs, allowedRefIds) { ... }
```
- 规范引用编号，只保留在素材包里存在的编号（例如 `[1][3]`）。

### 2.4 解析模型返回（你现在最常改的结构）

```js
function normalizeDailySummary(rawDaily, materials) { ... }
```
- 把模型 JSON 规范化成脚本内部统一结构。

```js
const overviewIn = Array.isArray(x.overview) ? x.overview : ...
```
- 兼容新旧字段（避免历史缓存格式不一致导致崩溃）。

```js
const importantIn = Array.isArray(x.important) ? x.important : [];
```
- 读取“重要需关注内容点”。

```js
const refTranslationsIn = Array.isArray(x.ref_translations) ? x.ref_translations : [];
```
- 读取“参考标题中文翻译”映射（新增）。

```js
const daily = { overview, important, refTranslations };
```
- 汇总成最终可渲染的数据对象。

### 2.5 给模型的 Prompt（决定输出质量）

```js
const prompt = `...`
```
- 这里定义模型输出 JSON 的“格式契约”。  
- 你新增了 `ref_translations`，用于英文标题的中文翻译。

### 2.6 标题 / 摘要 / 参考列表渲染

```js
const title = `AI日报 · ${dateISO}`;
```
- 每日文章标题固定为“AI日报 · 日期”。

```js
description: "${description}"
```
- front-matter 里的摘要。  
- 首页会优先显示这个字段，避免低价值正文拼接。

```js
function buildReferenceLabel(item, translatedTitle) { ... }
```
- 把参考项渲染成：  
  `中文标题 · 来源`（英文标题优先使用模型翻译后的中文标题）。

```js
md += `${makeBiblioLine(m.refId, m.link, label)}\n`;
```
- 逐条写入“参考内容”列表。

### 2.7 主执行流程（main）

```js
const sources = normalizeSources(cfg.sources);
```
- 读取并校验 `sources.yml` 订阅源。

```js
const selected = candidates ... .slice(0, prefetchN)
```
- 候选打分后，先取 TopN（可带兜底）。

```js
const materials = materialsAll
  .filter((m) => m && m.text && m.text.length >= 60)
  .slice(0, TOP_N)
  .map((m, idx) => ({ ...m, refId: idx + 1 }));
```
- 只保留正文足够长的素材，并重新编号引用 id。

```js
daily = await withRateLimitRetry(() => summarizeDailyWithLLM(materials));
```
- 只调用一次模型做综合总结；429 会自动退避重试。

```js
fs.writeFileSync(outPath, outMd, "utf-8");
```
- 输出最终 Markdown 到 `source/_posts/`。

---

## 3) 首页摘要逻辑：`scripts/auto-description.js`

```js
const existing = String(data.description || "").trim();
if (existing) return data;
```
- 如果文章 front-matter 已有 `description`，就直接用它，不再自动截取。

```js
if (isDailyDigestPost(data)) {
  data.description = "AI日报：当日要点、重点关注与参考来源。";
  return data;
}
```
- 每日资讯文章不再截正文前两三行，避免你说的“拼接没信息价值”。

```js
const lines = extractLeadLines(sourceHtml);
```
- 普通文章按段落/换行提取摘要，尽量保留原文阅读节奏。

---

## 4) 标签自动提取：`scripts/auto-hashtag-tags.js`

```js
const hashtagPattern = /...#(...)/g;
```
- 在正文中识别 `#标签`。

```js
if (/^#{1,6}\s/.test(trimmed)) continue;
```
- 跳过 Markdown 标题行（比如 `## 标题`），防止误当标签。

```js
data.tags = Array.from(byLower.values());
```
- 合并已有 tags + 新检测 tags，并去重写回文章对象。

---

## 5) 阅读时长基数优化：`scripts/reading-length.js`

```js
function removeDigestReferenceSection(markdown) { ... }
```
- 把 `## 参考内容`（兼容旧标题 `## 参考内容地址`）之后内容剔除，不把长链接列表计入阅读时长。

```js
.replace(/https?:\/\/\S+/gi, " ");
```
- 去掉 URL 本体，避免“字数虚高、时长虚高”。

```js
data.length = Math.max(1, customLength);
```
- 覆盖 `post.length`，后续 `hexo-word-counter` 会基于它显示字数和阅读时长。

---

## 6) 首页分类 Tab：`source/js/home-tabs.js`

```js
const posts = Array.from(document.querySelectorAll(".main .post-block"));
```
- 找到首页所有文章卡片。

```js
post.dataset.categoryTab = normalizeCategoryKey(name);
```
- 读取每篇文章分类，转成机器可识别的 key（`daily-news` / `july-notes`）。

```js
setFilter(tabKey, tabBar, posts);
```
- 点击 Tab 时，仅显示对应分类文章。

---

## 7) 样式覆盖：`source/_data/styles.styl`

```stylus
.home .post-body > p:first-child
  white-space: pre-line
  -webkit-line-clamp: 3
```
- 首页摘要最多显示 3 行，并保留换行语义。

```stylus
.post-meta
  flex-wrap: nowrap
  white-space: nowrap
  overflow-x: auto
```
- 文章元信息强制单行展示，不够宽时横向滚动，避免自动换行。

---

## 8) 你常用命令（速查）

```bash
npm run digest
```
- 生成当天 AI 日报。

```bash
npm run new:note -- "你的标题"
```
- 新建 `july笔记` 模板文章。

```bash
npx hexo clean && npx hexo generate && npx hexo server
```
- 清理 + 构建 + 本地预览。
