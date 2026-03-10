# 迭代记录

用于记录每次 GitHub 发布版本的核心改动，便于快速回溯。

## 记录规则

- 日期格式：`YYYY-MM-DD`
- 每次发布写 3-6 条关键改动，聚焦“做了什么 + 影响什么”
- 不写过程性细节（如“调了参数”），只写结果性变化

## 2026-03-08

- 优化日报内容结构：`重点资讯 + 其他快讯 + 小道消息 + 核心论文 + 参考来源`，并将核心论文固定在参考来源上方。
- 加强资讯生成清洗：去除模板化尾句、减少截断残句、提升标题可读性。
- 调整来源策略：关闭重复源 `techcrunch-newsletter`（默认禁用），保留 `TechCrunch AI` 作为主入口。
- 新增/改造公司官方渠道接入：
  - MiniMax：`https://www.minimax.io/news`
  - Moonshot(Kimi)：`https://platform.moonshot.cn/blog`
  - DeepSeek：`https://api-docs.deepseek.com/news/news250120`
  - Seed(Bytedance)：`https://seed.bytedance.com/zh/research?view_from=homepage_tab`
  - 阿里技术：`https://help.aliyun.com/zh/model-studio/model-release-notes`
  - 阶跃星辰：`https://stepfun.ai/research`（暂以手工采集模式保留）
- 测试增强：补充公司官方源可运行性校验与重复 newsletter 默认关闭校验。

## 2026-03-09

- 恢复并入库文章：`source/_posts/AI-开发项目实践分享记录.md`，避免继续编辑时丢稿。
- 工作流防误删：`digest` 自动提交从“全量 add `_posts`”改为“仅提交当日 digest + cache”，并新增非 digest 删除拦截。
- 菜单新增“迭代记录”入口，支持在站点直接查看每次迭代日期与核心改动。
- 抓取时效加强：为 `page_scrape/api_json` 来源补充发布时间推断，并在深读后再次执行时效过滤。
- 参考来源标题长度上限从 20 提升到 40，便于展示更完整标题信息。

## 2026-03-10

- 日报链路强化：新增 AI 相关性闸门与短关键词误匹配修复，降低非 AI 内容混入。
- 选题与摘要优化：增强聚类/选题评分、引用压缩与叙事完整性处理，减少模板化与断句。
- LLM 调用稳定性提升：统一接入全局节流器，默认串行+最小间隔，重试退避更保守。
- 测试补强：新增 AI 相关性与话题评分回归用例，`digest` 测试集全量通过。
