---
title: "AI晚报 · 09.23 周三"
date: 2026-09-23 19:40:00
description: "今日主线：\n- 9月23日，AI产业在Agent算力瓶颈\n- 浪潮信息通过单机推理技术大幅降低Kimi K3部署门槛"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：9月23日，AI产业在Agent算力瓶颈、智能体硬件与基础设施方面取得多项突破。浪潮信息通过单机推理技术大幅降低Kimi K3部署门槛，阿里云与腾讯分别推出AI智能体电脑与办公套件化升级，DeepSeek公开Agent训练环境构建论文，同时小米开源MiMo-V2.6模型，语音识别领域也迎来Qwen与科大讯飞的新版本发布。

## 重点资讯

### 01 · TypeSafe AI发布Jev模型，强调“要决策，不要文本”

TypeSafe AI发布的Jev模型走红，其口号为“Decisions, not strings”，强调AI直接做判断而非生成文本。与之相对，中科闻歌的Decitron决策机则强调对未来的推演与复杂世界建模。两者虽同属决策AI，但Jev侧重瞬时判断服务软件与Agent，Decitron则面向战略与复杂系统决策。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=29664" target="_blank" rel="noopener noreferrer" data-cite="7. Jev vs Decitron：同为决策AI，为什么不是一回事？｜AITNT 资讯">7</a>、<a class="cite" href="https://www.qbitai.com/2026/09/496352.html" target="_blank" rel="noopener noreferrer" data-cite="8. Jev vs Decitron：同为决策AI，为什么不是一回事？｜量子位">8</a>

### 02 · 阿里云发布Qwen Book智能体电脑

阿里云在2026云栖大会上正式发布AI智能体电脑Qwen Book，主打自主理解意图、持续学习与长期任务执行。产品配备Skill键盘阵列、全局AI按键和语音手写笔，支持7×24小时重度任务运行，并基于“OS as Harness”理念，以千问端云模型为核心，深度融合操作系统、应用、云服务与硬件，构建可理解、可记忆的Agent计算环境。Qwen Book将Agent能力从云端延伸至终端，为个人智能体应用提供了新的硬件载体。

参考：<a class="cite" href="https://news.aibase.com/zh/news/31301" target="_blank" rel="noopener noreferrer" data-cite="9. 阿里云发布Qwen Book:AI智能体电脑正式亮相阿里云在2026云栖大会发布AI智能体电脑Qwen Book，主打自主理解意图、持续学习与长期任务执行。产品…｜AIBase">9</a>

### 03 · 浪潮信息通过单机推理技术突破Kimi K3部署瓶颈

在AICC 2026大会上，浪潮信息宣布单机推理Kimi K3模型首破5.85毫秒，解决了该2.8万亿参数模型权重文件达1.56TB、普通服务器无法承载的难题。此举标志着Agent算力供给从依赖大规模集群向单机高效部署转变，有效缓解了“向上”的算力困境，为Agent的大规模普及提供了关键基础设施支持。该技术突破显著降低了Agent部署门槛，有望大幅提升算力利用率。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=29649" target="_blank" rel="noopener noreferrer" data-cite="12. 单机跑Kimi K3首破5.85毫秒，同等投资Token产能提升10倍！浪潮信息破局Agent算力难题｜AITNT 资讯">12</a>

## 其他快讯

- **01 · DeepSeek公开Agent训练环境构建论文**：DeepSeek公开了由梁文锋署名的Agent训练论文，详细介绍了DSec（DeepSeek Elastic Compute）系统。该系统专为Agent训练设计，能够每秒产生5000+个沙盒，峰值同时运行38万个，支撑单集群拥有160个节点、3万核CPU和250TB内存。（参考：<a class="cite" href="https://www.qbitai.com/2026/09/496393.html" target="_blank" rel="noopener noreferrer" data-cite="15. DeepSeek新论文公开Agent训练！梁文锋署名｜量子位">15</a>）
- **02 · 小米开源Mi Mo-V2.6模型，通过强化学习优化长轨迹决策能力。**：小米正式发布并开源MiMo-V2.6模型，Pro版本拥有1.02T总参数，Flash版本为309B。该模型支持1M token上下文，并覆盖文本、图像、视频和音频输入。小米重点展示了其在后训练阶段的强化学习成果，将代码、通用Agent、视觉和网络安全任务放入同一套RL系统，通过处理2.5万条行为轨迹来优化模型的决策能力。（参考：<a class="cite" href="https://www.leiphone.com/category/ai/f8vJztYMmCQ3ENED.html" target="_blank" rel="noopener noreferrer" data-cite="11. 深度拆解 Mi Mo-V2.6：1 M 上下文只是表面，2.5 万条轨迹才是底牌｜雷锋网 AI">11</a>）
- **03 · 千问发布Qwen-Audio-3.1系列，ASR价格直降95%，支持30种语言与16种中文方言。**：千问当日正式发布Qwen-Audio-3.1系列语音大模型，包含语音识别、合成、实时交互、音频创作与理解五款模型。该系列全线降价，其中ASR降幅达95%，并新增原生转写润色与分角色转写能力，支持30种语言与16种中文方言，首字响应约160毫秒，显著降低了语音交互的使用门槛。（参考：<a class="cite" href="https://news.aibase.com/zh/news/31308" target="_blank" rel="noopener noreferrer" data-cite="13. 阿里千问发布 Qwen-Audio-3.1：五款语音模型同发，ASR 价格直降 95%千问发布Qwen-Audio-3.1系列语音大模型，全面升级语音识别、合成…｜AIBase">13</a>）
- **04 · 腾讯Work Buddy企业版升级，整合文档、网盘、设计等能力，实现“一个订阅、一个Agent底座”。**：腾讯WorkBuddy企业版发布办公套件化升级，首批接入腾讯文档、乐享、网盘、安全与效能运营平台及AI设计智能体Ardot。升级后，企业无需为各产品的AI功能单独付费，可在同一套体系内管理所有产品的Credit用量，实现“一个订阅、一个Agent底座、一个管理后台”，优化企业AI原生办公体验。（参考：<a class="cite" href="https://news.aibase.com/zh/news/31309" target="_blank" rel="noopener noreferrer" data-cite="10. 腾讯Work Buddy企业版办公套件化升级:多端账号、资产打通，企业生产力再升级9月23日，腾讯Work Buddy企业版发布办公套件化升级，首批接入腾讯文档…｜AIBase">10</a>）
- **05 · 科大讯飞发布Spark-ASR-2.0，将落地讯飞AI眼镜、智能办公本等硬件设备。**：科大讯飞9月23日发布新一代语音识别大模型Spark-ASR-2.0，标志着语音交互与智能硬件落地的重要升级。该模型将于9月24日起在讯飞输入法上线，并通过开放平台提供API服务，后续将深度落地讯飞AI眼镜、智能办公本等核心软硬件产品，持续拓展声学大模型在多元场景中的应用边界。（参考：<a class="cite" href="https://news.aibase.com/zh/news/31314" target="_blank" rel="noopener noreferrer" data-cite="14. 科大讯飞正式发布 Spark-ASR-2.0，全面赋能硬件与开放生态科大讯飞9月23日发布新一代语音识别大模型Spark-ASR-2.0，标志语音交互与智能硬件…｜AIBase">14</a>）

## 核心论文

- **通过策略约束验证治理智能体动作**：提出ActGov运行时执行框架，通过策略约束验证在LLM执行外部工具前验证其动作，防止超出用户授权。 <a class="cite" href="https://arxiv.org/abs/2609.24446" target="_blank" rel="noopener noreferrer" data-cite="4. Act Gov: 通过策略约束验证治理LLM智能体动作｜arXiv cs.AI">4</a>
- **受政策支持的污染交互下的选择性再生**：提出ESC-CR框架，在多智能体通信中结合策略支持与选择性再生，确保安全代码生成与恢复。 <a class="cite" href="https://arxiv.org/abs/2609.26072" target="_blank" rel="noopener noreferrer" data-cite="5. 受政策支持的污染交互下的选择性再生｜arXiv cs.AI">5</a>
- **并行智能体开发中的语义协调基准测试**：提出stale基准测试，评估并行编码Agent在合并代码时的语义协调失败问题。 <a class="cite" href="https://arxiv.org/abs/2609.25396" target="_blank" rel="noopener noreferrer" data-cite="6. Passes Alone, Fails Together: 并行LLM智能体开发中的语义协调基准测试｜arXiv cs.AI">6</a>
- **基于大语言模型的多智能体模拟**：提出基于LLM的多智能体框架，用于解决模拟电路设计中设计空间大、性能权衡复杂的挑战。 <a class="cite" href="https://arxiv.org/abs/2609.25873" target="_blank" rel="noopener noreferrer" data-cite="1. Agentic Sizing: 基于大语言模型的多智能体模拟电路设计框架｜arXiv cs.AI">1</a>
- **用于说服性视频生成的认知增强**：提出CogenPVG框架，通过四阶段工作流模仿人类视频制作人，提升生成视频的说服力。 <a class="cite" href="https://arxiv.org/abs/2609.25821" target="_blank" rel="noopener noreferrer" data-cite="2. Cogen PVG: 用于说服性视频生成的认知增强反思多智能体框架｜arXiv cs.AI">2</a>
- **将金融智能体损失归因于决策与**：提出方法将金融Agent的损失归因于决策或基础设施故障，而非仅归咎于Agent动作。 <a class="cite" href="https://arxiv.org/abs/2609.25960" target="_blank" rel="noopener noreferrer" data-cite="3. Causal Loss-Fin: 将金融智能体损失归因于决策与基础设施故障｜arXiv cs.AI">3</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2609.25873" target="_blank" rel="noopener noreferrer">Agentic Sizing: 基于大语言模型的多智能体模拟电路设计框架｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2609.25821" target="_blank" rel="noopener noreferrer">Cogen PVG: 用于说服性视频生成的认知增强反思多智能体框架｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2609.25960" target="_blank" rel="noopener noreferrer">Causal Loss-Fin: 将金融智能体损失归因于决策与基础设施故障｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2609.24446" target="_blank" rel="noopener noreferrer">Act Gov: 通过策略约束验证治理LLM智能体动作｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2609.26072" target="_blank" rel="noopener noreferrer">受政策支持的污染交互下的选择性再生｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2609.25396" target="_blank" rel="noopener noreferrer">Passes Alone, Fails Together: 并行LLM智能体开发中的语义协调基准测试｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://aitntnews.com/newDetail.html?newId=29664" target="_blank" rel="noopener noreferrer">Jev vs Decitron：同为决策AI，为什么不是一回事？｜AITNT 资讯</a>
- <span id="ref-8">8.</span> <a href="https://www.qbitai.com/2026/09/496352.html" target="_blank" rel="noopener noreferrer">Jev vs Decitron：同为决策AI，为什么不是一回事？｜量子位</a>
- <span id="ref-9">9.</span> <a href="https://news.aibase.com/zh/news/31301" target="_blank" rel="noopener noreferrer">阿里云发布Qwen Book:AI智能体电脑正式亮相阿里云在2026云栖大会发布AI智能体电脑Qwen Book，主打自主理解意图、持续学习与长期任务执行。产品…｜AIBase</a>
- <span id="ref-10">10.</span> <a href="https://news.aibase.com/zh/news/31309" target="_blank" rel="noopener noreferrer">腾讯Work Buddy企业版办公套件化升级:多端账号、资产打通，企业生产力再升级9月23日，腾讯Work Buddy企业版发布办公套件化升级，首批接入腾讯文档…｜AIBase</a>
- <span id="ref-11">11.</span> <a href="https://www.leiphone.com/category/ai/f8vJztYMmCQ3ENED.html" target="_blank" rel="noopener noreferrer">深度拆解 Mi Mo-V2.6：1 M 上下文只是表面，2.5 万条轨迹才是底牌｜雷锋网 AI</a>
- <span id="ref-12">12.</span> <a href="https://aitntnews.com/newDetail.html?newId=29649" target="_blank" rel="noopener noreferrer">单机跑Kimi K3首破5.85毫秒，同等投资Token产能提升10倍！浪潮信息破局Agent算力难题｜AITNT 资讯</a>
- <span id="ref-13">13.</span> <a href="https://news.aibase.com/zh/news/31308" target="_blank" rel="noopener noreferrer">阿里千问发布 Qwen-Audio-3.1：五款语音模型同发，ASR 价格直降 95%千问发布Qwen-Audio-3.1系列语音大模型，全面升级语音识别、合成…｜AIBase</a>
- <span id="ref-14">14.</span> <a href="https://news.aibase.com/zh/news/31314" target="_blank" rel="noopener noreferrer">科大讯飞正式发布 Spark-ASR-2.0，全面赋能硬件与开放生态科大讯飞9月23日发布新一代语音识别大模型Spark-ASR-2.0，标志语音交互与智能硬件…｜AIBase</a>
- <span id="ref-15">15.</span> <a href="https://www.qbitai.com/2026/09/496393.html" target="_blank" rel="noopener noreferrer">DeepSeek新论文公开Agent训练！梁文锋署名｜量子位</a>
