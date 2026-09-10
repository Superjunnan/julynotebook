---
title: "AI晚报 · 09.10 周四"
date: 2026-09-10 19:40:00
description: "今日主线：\n- DeepSeek发布V4.1 Flash模型引发架构创新关注"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：DeepSeek发布V4.1 Flash模型引发架构创新关注，加州通过AI安全法案获巨头背书，Anthropic研究员离职警示AI对齐风险，同时OpenAI在流体力学数学证明上引发学界争议，多模态与Agent生态建设成为产业焦点。

## 重点资讯

### 01 · DeepSeek V4.1 Flash以552B MoE架构与不对称激活设计

深度求索正式发布DeepSeek V4.1 Flash，作为全新结构系列中最小尺寸模型，具备原生多模态视觉理解能力。该模型采用552B参数的MoE架构，创新引入Causal-Encoder-Decoder不对称结构，输入激活仅8B，输出激活16B，显著降低HBM需求至1/4。新模型通过优化KV Cache，将Agent场景下的使用成本大幅压缩。在基准测试中，V4.1 Flash成功超越了包括DeepSeek V4。

参考：<a class="cite" href="https://news.aibase.com/zh/news/30957" target="_blank" rel="noopener noreferrer" data-cite="11. DeepSeek V4.1 Flash 正式发布：552 B Mo E 新架构，全面超越 V4 Pro深度求索发布DeepSeek V4.1 Flash，为全新…｜AIBase">11</a>、<a class="cite" href="https://news.aibase.com/zh/news/30955" target="_blank" rel="noopener noreferrer" data-cite="12. DeepSeek V4.1 Flash发布：原生多模态视觉理解全面超越Pro版深度求索发布轻量级多模态模型DeepSeek V4.1 Flash，为系列最小尺寸…｜AIBase">12</a>

### 02 · 加州AI安全法案要求万亿参数模型上线前通过红队演练与第三方审计

美国加州州长纽森签署一揽子人工智能监管法案，要求前沿大模型强化安全风险评估、透明度披露，并防范灾难性网络攻击。法案特别规定，万亿参数级模型上线前必须通过红队演练和第三方审计。值得注意的是，这批立法在起草与修订过程中深度吸纳了前沿AI实验室的技术建议，罕见获得了OpenAI与Anthropic等硅谷头部企业的公开背书与支持。法案更侧重于建立透明的“前置风险评估框架”与“行业最佳安全实践基准”，而非设定硬性技术封顶指标。

参考：<a class="cite" href="https://news.aibase.com/zh/news/30960" target="_blank" rel="noopener noreferrer" data-cite="10. 加州签署多项 AI 安全法案，罕见获得 OpenAI 与 Anthropic 同时背书美国加州州长纽森签署一揽子人工智能监管法案，要求前沿大模型强化安全风险评估…｜AIBase">10</a>

### 03 · Anthropic研究员离职并发出警告

Anthropic研究员Jacob Coxon宣布离职，并向硅谷及全球发出严厉警告，称AI竞赛正在将所有人的生命置于风险之中。他在接受WIRED采访时详细阐述了Anthropic内部的“曼哈顿计划”，并深入探讨了AI对齐面临的严峻挑战。Coxon指出，AI实验室仅有几年时间来确保其系统的安全性，否则后果不堪设想。这一离职事件引发了业界对AI安全与对齐问题的广泛关注与深刻反思。核心研究员的离职与警告凸显了AI安全领域的紧迫性与复杂性。

参考：<a class="cite" href="https://www.wired.com/story/anthropic-researcher-quits-jacob-coxon-ai-fears-humanity/" target="_blank" rel="noopener noreferrer" data-cite="9. 刚辞职的 Anthropic 研究员称人类面临‘关键时刻’｜WIRED AI">9</a>

## 其他快讯

- **01 · 数学家质疑OpenAI数学发现的训练数据来源，指控其存在不透明与不道德行为。**：继此前关于OpenAI模型是否受益于未发表工作的争议后，第二位数学家Andreas Thom公开指责该AI巨头在训练数据来源上存在不透明与不道德行为。他在Mastodon上发文表示，他与同事在OpenAI宣布其数学发现之前，曾与ChatGPT进行过互动，这些互动可能为OpenAI的成功做出了贡献。（参考：<a class="cite" href="https://www.theverge.com/ai-artificial-intelligence/993263/where-does-openai-get-mathematics-training-data" target="_blank" rel="noopener noreferrer" data-cite="7. 数学家要求证明 OpenAI 未使用其研究成果｜The Verge AI">7</a>）
- **02 · 蚂蚁集团CEO指出智能体供需未形成正循环，将推出激励政策推动生态飞轮运转。**：在外滩大会圆桌论坛上，蚂蚁集团CEO韩歆毅指出，当前智能体供需两端尚未形成正循环：用户想用，但商家缺少成熟的智能体服务；商家看不到用户在用，又不敢投入开发。他透露，支付宝“阿宝”将推出智能体激励政策支持开发者，并为用户表达新需求提供对应激励入口。（参考：<a class="cite" href="https://news.aibase.com/zh/news/30958" target="_blank" rel="noopener noreferrer" data-cite="13. 蚂蚁集团CEO韩歆毅：蚂蚁将推出激励政策加快智能体供需生态建9月10日，2026外滩大会主论坛举行“当Agent成为交易主体”圆桌，蚂蚁集团CEO韩歆毅、万事达…｜AIBase">13</a>）
- **03 · Anthropic向欧盟网络安全局开放Mythos5模型，标志着AI模型合规监管进入实质性测试阶段。**：Anthropic正式向欧盟网络安全机构开放了其Mythos人工智能模型的访问权限。欧盟委员会发言人确认，双方已进行建设性沟通，欧盟网络安全局(ENISA)已获准访问Mythos5模型并开展测试。不过，目前仍无法访问该系列的最新版本Mythos5.1。这一进展体现了欧洲监管机构对前沿AI技术安全评估的深入推进。（参考：<a class="cite" href="https://news.aibase.com/zh/news/30970" target="_blank" rel="noopener noreferrer" data-cite="14. Anthropic向欧盟网络安全局敞开大门，Mythos5 模型迎合规大考人工智能合规监管获实质进展：Anthropic向欧盟网络安全机构开放Mythos模型访…｜AIBase">14</a>）
- **04 · 数据中心集群故障导致数GW电力中断，暴露出AI算力基础设施的脆弱性。**：在弗吉尼亚州阿什本——全球最大数据中心集群的中心，7月22日的一次输电线路故障在几秒钟内切断了超过3吉瓦的负载。两年前，一个故障的浪涌保护器也曾导致约60个设施和1500兆瓦的电力同时中断。这种大规模、同步的负载响应表明，现有的电网架构难以应对如此均匀的AI算力负载。（参考：<a class="cite" href="https://www.technologyreview.com/2026/09/10/1141649/powering-ai-is-an-architecture-problem/" target="_blank" rel="noopener noreferrer" data-cite="8. AI 的算力瓶颈在于架构问题｜MIT Technology Rev…">8</a>）

## 核心论文

- **智能体知道何时成功吗？从内部**：研究探讨多轮智能体设置中，模型内部表征是否能提供比传统机器学习系统更强的任务成功信号，旨在为安全关键应用中的智能体置信度校准提供新方法。 <a class="cite" href="https://arxiv.org/abs/2609.09448" target="_blank" rel="noopener noreferrer" data-cite="1. 智能体知道何时成功吗？从内部表征校准智能体置信度｜arXiv cs.AI">1</a>
- **评估科学工作流完成情况**：提出FrontierChallenge基准测试，包含300个端到端科学工作流，旨在评估科学智能体在跨领域分析数据、执行代码和生成研究产物方面的综合能力。 <a class="cite" href="https://arxiv.org/abs/2608.24979" target="_blank" rel="noopener noreferrer" data-cite="2. Frontier Challenge：评估科学工作流完成情况｜arXiv cs.AI">2</a>
- **通过结构签名进行多智能体图学习**：提出多智能体图学习(AGL)方法，通过结构签名解决异构图推理任务，旨在优化不同图区域间的推理策略，提升图推理性能。 <a class="cite" href="https://arxiv.org/abs/2609.09565" target="_blank" rel="noopener noreferrer" data-cite="3. 通过结构签名进行多智能体图学习｜arXiv cs.AI">3</a>
- **超越提示：测量与优化工具智能体框架**：研究在无需重新训练模型的情况下，通过修改运行时框架（如提示、工具接口、中间件）来优化LLM工具智能体，探索资源受限环境下的工具边界中间件编辑策略。 <a class="cite" href="https://arxiv.org/abs/2609.05736" target="_blank" rel="noopener noreferrer" data-cite="5. 超越提示：测量与优化LLM工具智能体框架｜arXiv cs.AI">5</a>
- **大规模智能体评估的基础设施与**：提出用于大规模智能体评估的基础设施与 curated meta-dataset，旨在为智能体系统的评估提供标准化的工具与数据支持。 <a class="cite" href="https://arxiv.org/abs/2609.04298" target="_blank" rel="noopener noreferrer" data-cite="4. Harbor Adapters and Harbor-Index：大规模智能体评估的基础设施与精选元数据集｜arXiv cs.AI">4</a>
- **可执行城市规划的沙盒智能体**：提出CityPlanner框架，通过UrbanSandbox环境支持可执行的城市规划，允许智能体检查任务文件、生成计划、运行评估器并基于可执行反馈修订决策。 <a class="cite" href="https://arxiv.org/abs/2609.09578" target="_blank" rel="noopener noreferrer" data-cite="6. City Planner：可执行城市规划的沙盒智能体｜arXiv cs.AI">6</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2609.09448" target="_blank" rel="noopener noreferrer">智能体知道何时成功吗？从内部表征校准智能体置信度｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2608.24979" target="_blank" rel="noopener noreferrer">Frontier Challenge：评估科学工作流完成情况｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2609.09565" target="_blank" rel="noopener noreferrer">通过结构签名进行多智能体图学习｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2609.04298" target="_blank" rel="noopener noreferrer">Harbor Adapters and Harbor-Index：大规模智能体评估的基础设施与精选元数据集｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2609.05736" target="_blank" rel="noopener noreferrer">超越提示：测量与优化LLM工具智能体框架｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2609.09578" target="_blank" rel="noopener noreferrer">City Planner：可执行城市规划的沙盒智能体｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://www.theverge.com/ai-artificial-intelligence/993263/where-does-openai-get-mathematics-training-data" target="_blank" rel="noopener noreferrer">数学家要求证明 OpenAI 未使用其研究成果｜The Verge AI</a>
- <span id="ref-8">8.</span> <a href="https://www.technologyreview.com/2026/09/10/1141649/powering-ai-is-an-architecture-problem/" target="_blank" rel="noopener noreferrer">AI 的算力瓶颈在于架构问题｜MIT Technology Rev…</a>
- <span id="ref-9">9.</span> <a href="https://www.wired.com/story/anthropic-researcher-quits-jacob-coxon-ai-fears-humanity/" target="_blank" rel="noopener noreferrer">刚辞职的 Anthropic 研究员称人类面临‘关键时刻’｜WIRED AI</a>
- <span id="ref-10">10.</span> <a href="https://news.aibase.com/zh/news/30960" target="_blank" rel="noopener noreferrer">加州签署多项 AI 安全法案，罕见获得 OpenAI 与 Anthropic 同时背书美国加州州长纽森签署一揽子人工智能监管法案，要求前沿大模型强化安全风险评估…｜AIBase</a>
- <span id="ref-11">11.</span> <a href="https://news.aibase.com/zh/news/30957" target="_blank" rel="noopener noreferrer">DeepSeek V4.1 Flash 正式发布：552 B Mo E 新架构，全面超越 V4 Pro深度求索发布DeepSeek V4.1 Flash，为全新…｜AIBase</a>
- <span id="ref-12">12.</span> <a href="https://news.aibase.com/zh/news/30955" target="_blank" rel="noopener noreferrer">DeepSeek V4.1 Flash发布：原生多模态视觉理解全面超越Pro版深度求索发布轻量级多模态模型DeepSeek V4.1 Flash，为系列最小尺寸…｜AIBase</a>
- <span id="ref-13">13.</span> <a href="https://news.aibase.com/zh/news/30958" target="_blank" rel="noopener noreferrer">蚂蚁集团CEO韩歆毅：蚂蚁将推出激励政策加快智能体供需生态建9月10日，2026外滩大会主论坛举行“当Agent成为交易主体”圆桌，蚂蚁集团CEO韩歆毅、万事达…｜AIBase</a>
- <span id="ref-14">14.</span> <a href="https://news.aibase.com/zh/news/30970" target="_blank" rel="noopener noreferrer">Anthropic向欧盟网络安全局敞开大门，Mythos5 模型迎合规大考人工智能合规监管获实质进展：Anthropic向欧盟网络安全机构开放Mythos模型访…｜AIBase</a>
