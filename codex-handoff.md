# Codex 交接说明：Hexo AI Digest 资讯站改造（综合总结 + 文献综述引用）

## 1. 项目背景与目标

我在本地用 **Hexo + NexT.Pisces** 搭了一个静态个人主页（参考风格：xiaoming.io）。网站包含三类内容：

1) **每日 AI Digest（精选型）**：每天早上 8 点自动更新，展示“昨日重点总结”，并提供原文可点击链接。  
2) **阶段性总结文章**：手动写。  
3) **个人简历页面**：已创建 `hexo new page resume`。

最终目标：部署到 **GitHub Pages**，我只要访问静态页面就能像资讯网站一样查看每天更新的 Digest。

---

## 2. 当前已完成进度

- 已完成 Hexo 初始化：`hexo init .`、`npm i`，本地 `hexo s` 可正常启动。
- 已安装 NexT：`npm i hexo-theme-next`，主题可运行。
- Digest 文章已能生成并出现在 `source/_posts`，例如：
  - `source/_posts/digest-2026-02-06.md`

---

## 3. 关键问题与已知坑

### 3.1 Hexo scripts 目录 ESM 报错
曾把脚本放在 `scripts/digest.mjs`，执行 `hexo clean` 报错：

- `SyntaxError: Cannot use import statement outside a module`

原因：
- Hexo 会自动加载根目录 `scripts/` 下的脚本（按 CommonJS 方式加载）
- `.mjs` / ESM `import` 会导致加载失败

解决：
- digest 脚本必须放在 **非 scripts/** 目录，例如 `tools/digest.mjs`

### 3.2 智谱接口 429（Too Many Requests / 速率限制）
之前做法是每条文章分别请求大模型总结，调用次数多，容易触发 429。

---

## 4. 改造目标：从“逐条摘要”改为“一次综合总结”

当前希望把 Digest 生成流程改造成：

1) 抓取来源（RSS / youtube_rss / html_list）
2) 初筛打分 + 排序后只取 **Top15（测试阶段固定）**
3) 并发抓正文（Readability），每条正文做截断（控制 token）
4) 把 Top15 条内容组装成「**文献综述素材包**」，每条带引用编号 `id`
5) **只调用 1 次智谱**让模型输出“昨日重点 + 教程清单”
6) 生成 Hexo 文章：`source/_posts/digest-YYYY-MM-DD.md`
7) 文章需要“可交互引用”：
   - 重点/教程每条末尾标注引用编号 `[1][3]`
   - **悬浮**编号显示来源预览（标题/来源/日期）
   - **点击**编号新开标签跳转原文
8) 文章底部生成完整「文献综述」列表：编号 + 标题 + 链接

---

## 5. 输出结构（页面内容形态）

### 5.1 昨日重点（LLM 输出）
- 重点 1：…… `[1][3]`
- 重点 2：…… `[2]`

### 5.2 教程/指南清单（LLM 输出）
如果素材里有 AI 教程/实操/指南内容：
- 教程 A：一句话说明 `[5]`（点击引用编号跳转）
- 工具/流程 B：一句话说明 `[8]`

> 注意：模型**不要直接输出 URL**，只输出 refs；URL 必须由脚本通过 refs 映射来源条目的链接，避免模型胡编链接。

### 5.3 文献综述（脚本固定生成）
- `[1]` 来源/标题（链接）
- `[2]` 来源/标题（链接）
- …

---

## 6. 配置与订阅源要求

- 订阅清单必须可配置：`sources.yml`（后续方便增删）
- 测试期先跑 RSS 源，示例：
  - TechCrunch AI
  - Import AI（Substack）
  - Not A Bot（Substack，可能会 ETIMEDOUT）
- 长期想接入 X/公众号/YouTube，但测试期先跑通 RSS 链路。

---

## 7. 环境变量与运行方式

使用智谱模型（免费基座）：

```bash
export ZHIPU_API_KEY="你的智谱API Key"
export ZHIPU_MODEL="glm-4.7-flash"  # 可选，不设则脚本默认

# 建议线上显式设置时区，避免 GitHub Runner 默认 UTC 导致“今天是哪天”漂移
export DIGEST_TZ="Asia/Taipei"

# 可选参数
# export DIGEST_DATE="YYYY-MM-DD"           # 覆盖输出文件日期
# export DIGEST_POST_TIME="08:00:00"        # Hexo front-matter 的时间
# export DIGEST_DRY_RUN=1                   # 只打印不落盘（默认不调用 LLM）
# export DIGEST_DRY_RUN_LLM=1               # dry-run 也调用 LLM（会消耗额度）
# export DIGEST_SKIP_LLM=1                  # 跳过 LLM，输出空结构（便于测试抓取/引用）
# export DIGEST_FORCE_LLM=1                 # 忽略当日缓存，强制重新总结
# export DIGEST_CACHE_RETENTION_DAYS=14     # 抓取缓存保留天数（避免无限增长）
# export DIGEST_DAILY_RETENTION_DAYS=120    # 日总结缓存保留天数
# export DIGEST_EXTRA_CANDIDATES=10         # 预抓取兜底候选数（正文抽取失败时填满 Top15）

npm run digest
```
