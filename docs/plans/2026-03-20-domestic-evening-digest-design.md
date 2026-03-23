# 国内 AI 晚报设计方案

## 目标

在现有早报链路不被破坏的前提下，新增一条面向国内 AI 动态的晚报链路：

- 早报：保留现有 `04:10` 调度，聚焦海外 / 国际 AI 公司与研究动态
- 晚报：新增 `19:40` 调度，聚焦国内模型公司、开放平台、产品发布、融资与产业协同进展

## 方案结论

采用“**共享引擎 + edition/profile 隔离**”方案，而不是复制一套独立脚本。

### 为什么这么做

- 现有 `tools/digest.mjs` 已经包含抓取、去重、聚类、排序、总结、引用和缓存机制
- 直接复制会造成双份逻辑漂移，后续维护成本高
- 增加 `edition_scope + DIGEST_PROFILE` 即可最小代价实现双时段输出

## 晚报范围

### 内容定位

- 国内模型公司官方更新
- 国内 AI 平台 / API / Agent / 多模态能力发布
- 国内媒体对重点国产模型公司的跟进报道
- 产业合作、融资、开源与生态事件

### 目标公司

- MiniMax
- 智谱
- 阿里 / 通义
- 字节 / Seed
- 腾讯 / 混元
- 阶跃星辰
- 小米 AI
- Kimi / Moonshot
- DeepSeek
- 百度 / 千帆 / 文心

## 信源策略

### 可自动抓取信源

- AIBase
- 36Kr AI
- AITNT 资讯
- MiniMax
- Kimi
- DeepSeek
- Seed
- 阿里技术
- 百度千帆

### 先保留人工补录的信源

- 智谱
- 阶跃星辰
- 腾讯混元
- 小米 AI

原因：

- 官方站点部分页面依赖动态渲染或入口分散
- 先保证晚报主链路可运行，再逐步扩官方自动源

## 技术方案

### 1. 来源隔离

在 `sources.yml` 中为信源增加 `edition_scope`：

- `morning`：只给早报
- `evening`：只给晚报
- `both`：两边都可用
- 未配置时默认归入 `morning`

### 2. 输出隔离

- 早报文件：`source/_posts/digest-YYYY-MM-DD.md`
- 晚报文件：`source/_posts/evening-digest-YYYY-MM-DD.md`

### 3. 审计隔离

- 早报审计目录：`data/digest-reports/YYYY-MM-DD`
- 晚报审计目录：`data/digest-reports/evening/YYYY-MM-DD`

### 4. 历史去重隔离

为避免晚报被早报当日已发布内容误杀：

- `published` 和 `publishedSignatures` 改为按 edition 维护
- 早报继续兼容旧键
- 晚报使用独立命名空间

### 5. front matter

晚报新增：

```yaml
title: "AI晚报 · YYYY-MM-DD"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
```

早报统一为：

```yaml
title: "AI日报 · YYYY-MM-DD"
digest_edition: morning
digest_region: global
```

## 前端展示策略

采用最小兼容方案，不新增独立页面：

- 首页混合流继续复用现有卡片
- 日报分类页继续复用现有归档页
- 晚报仅在卡片和详情页 badge / 标题上显示为 `AI 晚报`

这样不会破坏现有首页、日报页和详情页结构。

## 调度方案

新增 GitHub Actions：

- 早报：保留 `digest.yml`
- 晚报：新增 `evening-digest.yml`

默认调度时间：

- `19:40 Asia/Shanghai`

## 验收标准

1. `DIGEST_PROFILE=evening` 时只抓取 `edition_scope=evening|both` 的信源
2. 晚报输出文件名、front matter、审计目录与早报分离
3. 晚报不会因为早报的历史去重缓存而被筛空
4. 首页 / 日报页 / 详情页能正确展示 `AI 晚报`
5. 现有早报链路与页面逻辑保持可用
