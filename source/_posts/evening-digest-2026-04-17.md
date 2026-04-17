---
title: "AI晚报 · 04.17 周五"
date: 2026-04-17 21:39:47
description: "今日主线：\n- 4月17日，AI行业焦点集中在Anthropic发布Claude等进展"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：421 条

> 主线：4月17日，AI行业焦点集中在Anthropic发布Claude Opus 4.7模型及强制实名验证引发的争议，OpenAI与Cerebras签署巨额芯片协议，谷歌发布Gemini Robotics-ER 1.6具身智能模型，科大讯飞展示软硬一体AI Agent架构，阿里开源Qwen3.6-35B-A3B模型并支持本地部署。

## 重点资讯

### 01 · Claude Opus 4.7发布，综合能力提升但被指GPT味浓。

Anthropic发布了其最强大的公开可用模型Claude Opus 4.7，在Agentic coding、终端编码和视觉推理等方面相比前代有显著提升。然而，用户反馈该模型越用越像GPT，且在Agentic search等单项能力上有所下降。与此同时，Anthropic此前发布的Mythos模型在多项测试中表现优于Opus 4.7约10%至15%，但价格昂贵。Opus 4.7是安全验证完成、定价亲民的全平台量产版。

参考：<a class="cite" href="https://www.theverge.com/podcast/911753/sam-altman-openai-ronan-farrow-new-yorker-feature-trust-liar-ai-industry" target="_blank" rel="noopener noreferrer" data-cite="1. 罗南·法罗谈萨姆·奥尔特曼与真相之间‘不受约束’的关系｜The Verge AI">1</a>、<a class="cite" href="https://www.theverge.com/ai-artificial-intelligence/913184/anthropic-claude-opus-4-7-cybersecurity" target="_blank" rel="noopener noreferrer" data-cite="2. Anthropic 发布新 Opus 模型，正值 Mythos Preview …｜The Verge AI">2</a>、<a class="cite" href="https://36kr.com/p/3770495848727300" target="_blank" rel="noopener noreferrer" data-cite="3. Claude Opus 4.7来了，公开模型里的SOTA，不过用起来GPT味好浓｜36Kr AI">3</a>

### 02 · 谷歌发布Gemini Robotics-ER 1.6具身智能模型。

Google DeepMind发布了Gemini Robotics-ER 1.6，这是其主打空间推理的第三代机器人模型。搭载该模型的波士顿动力机器狗Spot现在能精确读取工厂压力表刻度，机械臂也能准确判断操作任务。ER 1.6定位为机器人的高层大脑，负责理解环境、制定计划和调用工具。ER 1.6显著提升了机器人在复杂物理环境中的感知与推理能力，推动具身智能发展。

参考：<a class="cite" href="https://www.qbitai.com/2026/04/402329.html" target="_blank" rel="noopener noreferrer" data-cite="5. 谷歌最强具身大脑发布！波士顿机器狗瞬间人模人样｜量子位">5</a>、<a class="cite" href="https://deepmind.google/blog/gemini-robotics-er-1-6/" target="_blank" rel="noopener noreferrer" data-cite="6. Gemini Robotics-ER 1.6：通过增强具身推理赋能现实世界机器人…｜Google DeepMind Bl…">6</a>

### 03 · OpenAI与Cerebras签署200亿美元芯片协议。

OpenAI与AI芯片公司Cerebras达成为期三年的重磅交易，OpenAI将支付超200亿美元购买芯片，并提供约10亿美元资金支持Cerebras开发数据中心系统，并获得最高10%的少数股权。Cerebras计划以350亿美元估值进行IPO，此次交易规模是年初协议的两倍，显示OpenAI对Cerebras技术的高度信任。此次合作标志着OpenAI在算力基础设施上的重大布局，并深化了与Cerebras的战略伙伴关系。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27236" target="_blank" rel="noopener noreferrer" data-cite="13. Cerebras 与 Open AI 签署 200 亿美元芯片协议计划 IPOA…｜AIBase">13</a>、<a class="cite" href="https://36kr.com/p/3770551515398912" target="_blank" rel="noopener noreferrer" data-cite="15. 1300亿，曝Open AI花大价钱给英伟达找备胎｜36Kr AI">15</a>

## 其他快讯

- **01 · Anthropic强制实名验证引发隐私与封号争议。**：Anthropic要求部分Claude用户提交政府证件和实时自拍进行KYC验证，此举引发用户强烈反弹。中国用户因地区限制和账号被封问题反应尤为激烈，而欧美用户则担忧隐私风险。一位15岁开发者因被检测为未成年人使用服务而被封号，凸显了实名制可能带来的误伤风险。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27229" target="_blank" rel="noopener noreferrer" data-cite="14. Claude 强制实名验证引发争议：用户担心封号风险Anthropic公司为AI…｜AIBase">14</a>、<a class="cite" href="https://36kr.com/p/3769371305619970" target="_blank" rel="noopener noreferrer" data-cite="16. 美国AI，怎么也搞实名制了？｜36Kr AI">16</a>）
- **02 · OpenAI重构Codex，推出多Agent能力与独立光标。**：OpenAI彻底重构了Codex，使其具备多Agent能力，能在后台独立运行App并使用自己的光标与用户鼠标互不干扰。Codex现在能自动打开Xcode、启动模拟器、运行测试并修复bug，实现了从信息获取到执行落地的全链路闭环。（参考：<a class="cite" href="https://36kr.com/p/3770733832323840" target="_blank" rel="noopener noreferrer" data-cite="4. Open AI彻底重构Codex，长出独立鼠标，自己排班狂卷打工人｜36Kr AI">4</a>）
- **03 · 阿里开源Qwen3.6-35B-A3B模型，支持本地部署。**：阿里通义千问团队宣布开源混合专家模型Qwen3.6-35B-A3B，该模型总参数量350亿，激活参数仅30亿。它在编程和视觉基准上表现优异，甚至超过谷歌Gemma 4系列，并已开源权重支持本地部署。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24178" target="_blank" rel="noopener noreferrer" data-cite="18. 首个Qwen3.6开源模型来了！编程视觉双提升，还兼容Open Claw｜AITNT 资讯">18</a>）
- **04 · 科大讯飞发布AstronClaw升级版，展示软硬一体AI Agent架构。**：科大讯飞在4月15日的发布会上推出了AstronClaw升级版及9项新产品，首次完整展示了“软硬一体”的AI Agent架构。该架构推动AI从对话助手向物理执行中枢转变，与讯飞办公本融合处理职场碎片信息，并推出了轻量化AI眼镜GlassClaw。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27235" target="_blank" rel="noopener noreferrer" data-cite="17. 科大讯飞发布Astron Claw升级版:推出9项新品及软硬一体AI Agent…｜AIBase">17</a>）

## 核心论文

- **用于数字核电站以人为中心的程**：该框架旨在解决数字核电站控制室中复杂软控制行为带来的认知风险，通过限制风险来支持以人为中心的程序支持。 <a class="cite" href="https://arxiv.org/abs/2604.14160" target="_blank" rel="noopener noreferrer" data-cite="7. Nu HF Claw: 用于数字核电站以人为中心的程序支持的风险约束认知智能体框…｜arXiv cs.AI">7</a>
- **通过强化学习扩展多智能体树搜**：该研究通过强化学习扩展多智能体树搜索，以解决代码生成任务中轨迹多样性有限的问题。 <a class="cite" href="https://arxiv.org/abs/2604.14564" target="_blank" rel="noopener noreferrer" data-cite="8. MARS$^2$: 通过强化学习扩展多智能体树搜索以进行代码生成｜arXiv cs.AI">8</a>
- **用于自动构建模型的智能体**：该框架旨在自动构建AI模型，通过迭代设计架构、工程表示和训练流程，减轻开发者的负担。 <a class="cite" href="https://arxiv.org/abs/2604.14455" target="_blank" rel="noopener noreferrer" data-cite="9. AIBuild AI: 用于自动构建AI模型的AI智能体｜arXiv cs.AI">9</a>
- **用于量子模拟的任务驱动智能体生成**：该框架通过多智能体系统自动生成、验证和重用计算工具，加速科学发现任务。 <a class="cite" href="https://arxiv.org/abs/2604.14609" target="_blank" rel="noopener noreferrer" data-cite="10. El Agente Forjador: 用于量子模拟的任务驱动智能体生成｜arXiv cs.AI">10</a>
- **用于大型硬件设计的分层生成的**：该框架利用多智能体系统生成大型硬件设计的分层RTL代码，解决LLM在复杂设计中的上下文丢失问题。 <a class="cite" href="https://arxiv.org/abs/2604.14550" target="_blank" rel="noopener noreferrer" data-cite="11. Veri Graphi: 用于大型硬件设计的分层RTL生成的多智能体框架｜arXiv cs.AI">11</a>
- **通过过程挖掘和解释多智能体**：该框架通过过程挖掘和LLM解释多智能体MCTS与Minimax混合算法的行为。 <a class="cite" href="https://arxiv.org/abs/2604.14687" target="_blank" rel="noopener noreferrer" data-cite="12. M2-PALE: 通过过程挖掘和LLM解释多智能体MCTS--Minimax混合…｜arXiv cs.AI">12</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://www.theverge.com/podcast/911753/sam-altman-openai-ronan-farrow-new-yorker-feature-trust-liar-ai-industry" target="_blank" rel="noopener noreferrer">罗南·法罗谈萨姆·奥尔特曼与真相之间‘不受约束’的关系｜The Verge AI</a>
- <span id="ref-2">2.</span> <a href="https://www.theverge.com/ai-artificial-intelligence/913184/anthropic-claude-opus-4-7-cybersecurity" target="_blank" rel="noopener noreferrer">Anthropic 发布新 Opus 模型，正值 Mythos Preview …｜The Verge AI</a>
- <span id="ref-3">3.</span> <a href="https://36kr.com/p/3770495848727300" target="_blank" rel="noopener noreferrer">Claude Opus 4.7来了，公开模型里的SOTA，不过用起来GPT味好浓｜36Kr AI</a>
- <span id="ref-4">4.</span> <a href="https://36kr.com/p/3770733832323840" target="_blank" rel="noopener noreferrer">Open AI彻底重构Codex，长出独立鼠标，自己排班狂卷打工人｜36Kr AI</a>
- <span id="ref-5">5.</span> <a href="https://www.qbitai.com/2026/04/402329.html" target="_blank" rel="noopener noreferrer">谷歌最强具身大脑发布！波士顿机器狗瞬间人模人样｜量子位</a>
- <span id="ref-6">6.</span> <a href="https://deepmind.google/blog/gemini-robotics-er-1-6/" target="_blank" rel="noopener noreferrer">Gemini Robotics-ER 1.6：通过增强具身推理赋能现实世界机器人…｜Google DeepMind Bl…</a>
- <span id="ref-7">7.</span> <a href="https://arxiv.org/abs/2604.14160" target="_blank" rel="noopener noreferrer">Nu HF Claw: 用于数字核电站以人为中心的程序支持的风险约束认知智能体框…｜arXiv cs.AI</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2604.14564" target="_blank" rel="noopener noreferrer">MARS$^2$: 通过强化学习扩展多智能体树搜索以进行代码生成｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://arxiv.org/abs/2604.14455" target="_blank" rel="noopener noreferrer">AIBuild AI: 用于自动构建AI模型的AI智能体｜arXiv cs.AI</a>
- <span id="ref-10">10.</span> <a href="https://arxiv.org/abs/2604.14609" target="_blank" rel="noopener noreferrer">El Agente Forjador: 用于量子模拟的任务驱动智能体生成｜arXiv cs.AI</a>
- <span id="ref-11">11.</span> <a href="https://arxiv.org/abs/2604.14550" target="_blank" rel="noopener noreferrer">Veri Graphi: 用于大型硬件设计的分层RTL生成的多智能体框架｜arXiv cs.AI</a>
- <span id="ref-12">12.</span> <a href="https://arxiv.org/abs/2604.14687" target="_blank" rel="noopener noreferrer">M2-PALE: 通过过程挖掘和LLM解释多智能体MCTS--Minimax混合…｜arXiv cs.AI</a>
- <span id="ref-13">13.</span> <a href="https://news.aibase.com/zh/news/27236" target="_blank" rel="noopener noreferrer">Cerebras 与 Open AI 签署 200 亿美元芯片协议计划 IPOA…｜AIBase</a>
- <span id="ref-14">14.</span> <a href="https://news.aibase.com/zh/news/27229" target="_blank" rel="noopener noreferrer">Claude 强制实名验证引发争议：用户担心封号风险Anthropic公司为AI…｜AIBase</a>
- <span id="ref-15">15.</span> <a href="https://36kr.com/p/3770551515398912" target="_blank" rel="noopener noreferrer">1300亿，曝Open AI花大价钱给英伟达找备胎｜36Kr AI</a>
- <span id="ref-16">16.</span> <a href="https://36kr.com/p/3769371305619970" target="_blank" rel="noopener noreferrer">美国AI，怎么也搞实名制了？｜36Kr AI</a>
- <span id="ref-17">17.</span> <a href="https://news.aibase.com/zh/news/27235" target="_blank" rel="noopener noreferrer">科大讯飞发布Astron Claw升级版:推出9项新品及软硬一体AI Agent…｜AIBase</a>
- <span id="ref-18">18.</span> <a href="https://aitntnews.com/newDetail.html?newId=24178" target="_blank" rel="noopener noreferrer">首个Qwen3.6开源模型来了！编程视觉双提升，还兼容Open Claw｜AITNT 资讯</a>
