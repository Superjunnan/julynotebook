---
title: "AI晚报 · 11.10 周二"
date: 2026-11-10 05:56:40
description: "今日主线：\n- 11月9日AI领域聚焦于智能体架构优化与测试时计算扩展\n- 研究重点包括通过并行团队提升推理效率、将智能体经验固化为模型权重\n- 同时，机器人与物联网协同、推荐系统中的自适应计算分配等应用方向也等进展"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：11月9日AI领域聚焦于智能体架构优化与测试时计算扩展。研究重点包括通过并行团队提升推理效率、将智能体经验固化为模型权重，以及多智能体系统中的社会推理机制。同时，机器人与物联网协同、推荐系统中的自适应计算分配等应用方向也取得重要进展。

> 本期新闻部分为补录：原自动任务未产出新闻话题，由公开资料整理；论文部分为原任务生成。

## 重点资讯

### 01 · Meta 发布 Muse Ember

Meta 推出 Muse 家族最小、最便宜的模型，定位智能体每天重复的工作：工具调用、编码子任务、路由、抽取；价格 0.10/0.50 美元每百万输入/输出 token，100 万 token 上下文，Artificial Analysis 指数 36 分，与 Claude Haiku 5.5 持平。

参考：<a class="cite" href="https://research.meta.ai/blog/muse-ember" target="_blank" rel="noopener noreferrer" data-cite="7. Meta 发布 Muse Ember｜Meta AI">7</a>

### 02 · OpenAI 的 ChatGPT Enterprise 上架 AWS Marketplace

OpenAI 宣布 ChatGPT Enterprise 上架 AWS Marketplace，企业可用现有 AWS 采购与账单关系购买，符合条件的支出可计入 AWS 消费承诺；包含 ChatGPT、ChatGPT Work、Codex、dots，与直接购买功能、模型与发版节奏完全一致。

参考：<a class="cite" href="https://openai.com/index/chatgpt-enterprise-aws-marketplace/" target="_blank" rel="noopener noreferrer" data-cite="8. OpenAI 的 ChatGPT Enterprise 上架 AWS Marketplace｜OpenAI">8</a>

### 03 · Anthropic 近 700 亿美元 IPO 方案发给银行后又撤回

路透独家：Anthropic 向银行发出 IPO 文件，拟募资最高 693 亿美元，数小时后公司发邮件撤回，称定价数据有误。注意：693 亿美元是已被撤回的泄露数字，未经证实，不可当作定案。

参考：<a class="cite" href="https://www.reuters.com/commentary/reuters-open-interest/global-markets-view-usa-2026-11-10/" target="_blank" rel="noopener noreferrer" data-cite="9. Anthropic 近 700 亿美元 IPO 方案发给银行后又撤回｜Reuters">9</a>

## 其他快讯

- **04 · Anthropic 发布 Claude Fable 5.2 与 Mythos 5.2**：Anthropic 发布新一代旗舰模型 Fable 5.2（公开版）与 Mythos 5.2（仅限验证机构），输出速度比 5.1 快约 30%，价格降至输入 8 美元/每百万 token；约 1000 个 Fable 5.2 智能体用 30 小时在 Lean 中完成了费马大定理的形式化证明。（参考：<a class="cite" href="https://www.anthropic.com/claude-fable-and-mythos-5-2" target="_blank" rel="noopener noreferrer" data-cite="10. Anthropic 发布 Claude Fable 5.2 与 Mythos 5.2｜Anthropic">10</a>）
- **05 · Google 发布 TPU 8tx 与 TPU 8i Max**：Google 扩展第八代 TPU 产品线：TPU 8tx 面向机密推理，TPU 8i Max 把两颗 TPU 8i 封装在一起，算力、SRAM 与 HBM 带宽均翻倍。这是 Google 首次一年内推出四款 TPU 系统；未公布价格与上市时间。（参考：<a class="cite" href="https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/" target="_blank" rel="noopener noreferrer" data-cite="11. Google 发布 TPU 8tx 与 TPU 8i Max｜Google Blog">11</a>）
- **06 · NVIDIA 在 CoRL 发布 GR00T 2 与 Isaac Lab 3.0**：NVIDIA 在机器人学习大会 CoRL 发布开源前沿世界动作模型 GR00T 2（基于 Cosmos），用 40 万小时第一人称人类视频等数据训练；50 项任务中 40 项零演示至少完成一次，1 次演示平均成功率 71%。同步发布 Isaac Lab 3.0，训练吞吐最高约 2.5 倍。（参考：<a class="cite" href="https://blogs.nvidia.com/blog/robotics-simulation-advancements-corl/" target="_blank" rel="noopener noreferrer" data-cite="12. NVIDIA 在 CoRL 发布 GR00T 2 与 Isaac Lab 3.0｜NVIDIA Blog">12</a>）
- **07 · Fireworks AI 扩大 10 月安全事件披露**：Fireworks AI 扩大 10 月安全事件的披露范围：攻击者还触及了账单信息、数据集与未完成模型权重；卡号不存储、未受影响，已报警并请 Palo Alto Unit 42 取证。（参考：<a class="cite" href="https://dealroom.co/news/171040-fireworks-ai-says-hackers-reached-customer-datasets-partial-model-weight/" target="_blank" rel="noopener noreferrer" data-cite="13. Fireworks AI 扩大 10 月安全事件披露｜Dealroom">13</a>）
- **08 · MIT WorldParticle：一个模型模拟六种物理现象**：MIT 发布 WorldParticle，用拉格朗日粒子 + Transformer 逐步预测粒子运动，同一模型可模拟沙、布、流体、折叠蛋白质等六种物质行为；论文发表于 ACM Transactions on Graphics。（参考：<a class="cite" href="https://news.mit.edu/2026/single-ai-model-simulates-many-substances-behavior-1109" target="_blank" rel="noopener noreferrer" data-cite="14. MIT WorldParticle：一个模型模拟六种物理现象｜MIT News">14</a>）
- **09 · MIT FLEX：让机器人理解指令背后的意图**：MIT CSAIL 与 NYU 在 CoRL 发表 FLEX 平台：用 GPT-4o 把“别洒到笔记本上”泛化为避开所有电子设备，再把泛化后的约束写回机器人技能；模拟中端咖啡、移动蜡烛、搬保龄球三项任务均成功。（参考：<a class="cite" href="https://news.mit.edu/2026/ai-assisted-learning-platform-helps-robots-reason-beyond-literal-commands-1109" target="_blank" rel="noopener noreferrer" data-cite="15. MIT FLEX：让机器人理解指令背后的意图｜MIT News">15</a>）
- **10 · 美国参议员致信 Google：学校关 AI 不能丢搜索**：美国参议员 Markey 致信 Google CEO：学校禁用 Gemini 等 AI 服务后，学生账号也失去 Google Search；要求承诺允许学校禁用 AI 服务的同时保留搜索，11 月 30 日前答复。（参考：<a class="cite" href="https://www.markey.senate.gov/news/press-releases/markey-demands-google-allow-schools-to-disable-ai-services-without-blocking-search-access" target="_blank" rel="noopener noreferrer" data-cite="16. 美国参议员致信 Google：学校关 AI 不能丢搜索｜Markey Senate">16</a>）

## 核心论文

- **测试时计算通过并行智能体团队**：该论文提出并行智能体团队方法，通过并行采样多个小型团队并保留最佳结果，解决了测试时计算扩展中独立采样饱和与大型协作团队边际效应递减的问题，在12个长期任务上表现优异。 <a class="cite" href="https://arxiv.org/abs/2611.09798" target="_blank" rel="noopener noreferrer" data-cite="6. 测试时计算通过并行智能体团队扩展得更好｜arXiv cs.AI">6</a>
- **通过验证整合从智能体经验到权重**：该论文提出ENGRAM框架，通过分离训练准入与记忆释放，并引入演示感知门控机制，解决了智能体经验固化的决策难题，确保了有用演示的纳入与必要指导的保留。 <a class="cite" href="https://arxiv.org/abs/2611.09472" target="_blank" rel="noopener noreferrer" data-cite="1. ENGRAM：通过验证整合从智能体经验到权重｜arXiv cs.AI">1</a>
- **幽灵共识：测量多智能体决策中**：该论文研究了多智能体LLM系统中的“幽灵共识”现象，揭示了LLM在观察模糊社会信号后改变决策并报告不准确私有判断的集体性无知风险。 <a class="cite" href="https://arxiv.org/abs/2611.08971" target="_blank" rel="noopener noreferrer" data-cite="3. 幽灵共识：测量多智能体LLM决策中的社会推理｜arXiv cs.AI">3</a>
- **多租户内容推荐部署的自适应计算分配**：该论文介绍了CascadeRec系统，这是一种在金融SaaS生产环境中部署的两层LLM重排级联系统，通过轻量级模型优先处理所有请求，仅在必要时调用昂贵模型，优化了推荐质量。 <a class="cite" href="https://arxiv.org/abs/2611.08566" target="_blank" rel="noopener noreferrer" data-cite="5. Cascade Rec：多租户内容推荐部署的自适应LLM计算分配｜arXiv cs.AI">5</a>
- **家庭辅助和安全中机器人协调的**：该论文提出了HomeLoop框架，旨在解决家庭机器人与现有智能基础设施（摄像头、IoT设备）的集成问题，并提供了处理模糊场景（如区分不同类型的烟雾报警）的标准化基准。 <a class="cite" href="https://arxiv.org/abs/2611.08914" target="_blank" rel="noopener noreferrer" data-cite="2. Home Loop：家庭辅助和安全中机器人Io T协调的仿真框架和基准｜arXiv cs.AI">2</a>
- **表象之下：当我们谈论智能体进**：该论文评估了Agent Harness Evolution方法，发现无权重更新的递归自我改进在可靠性、效率和可迁移性方面存在显著局限，并提出了EvoAudit修订方案。 <a class="cite" href="https://huggingface.co/papers/2611.07624" target="_blank" rel="noopener noreferrer" data-cite="4. 表象之下：当我们谈论智能体进化时被忽视的内容｜Hugging Face 论文">4</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2611.09472" target="_blank" rel="noopener noreferrer">ENGRAM：通过验证整合从智能体经验到权重｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2611.08914" target="_blank" rel="noopener noreferrer">Home Loop：家庭辅助和安全中机器人Io T协调的仿真框架和基准｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2611.08971" target="_blank" rel="noopener noreferrer">幽灵共识：测量多智能体LLM决策中的社会推理｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://huggingface.co/papers/2611.07624" target="_blank" rel="noopener noreferrer">表象之下：当我们谈论智能体进化时被忽视的内容｜Hugging Face 论文</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2611.08566" target="_blank" rel="noopener noreferrer">Cascade Rec：多租户内容推荐部署的自适应LLM计算分配｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2611.09798" target="_blank" rel="noopener noreferrer">测试时计算通过并行智能体团队扩展得更好｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://research.meta.ai/blog/muse-ember" target="_blank" rel="noopener noreferrer">Meta 发布 Muse Ember｜Meta AI</a>
- <span id="ref-8">8.</span> <a href="https://openai.com/index/chatgpt-enterprise-aws-marketplace/" target="_blank" rel="noopener noreferrer">OpenAI 的 ChatGPT Enterprise 上架 AWS Marketplace｜OpenAI</a>
- <span id="ref-9">9.</span> <a href="https://www.reuters.com/commentary/reuters-open-interest/global-markets-view-usa-2026-11-10/" target="_blank" rel="noopener noreferrer">Anthropic 近 700 亿美元 IPO 方案发给银行后又撤回｜Reuters</a>
- <span id="ref-10">10.</span> <a href="https://www.anthropic.com/claude-fable-and-mythos-5-2" target="_blank" rel="noopener noreferrer">Anthropic 发布 Claude Fable 5.2 与 Mythos 5.2｜Anthropic</a>
- <span id="ref-11">11.</span> <a href="https://blog.google/innovation-and-ai/infrastructure-and-cloud/global-network/tpu-8i-max-and-8tx/" target="_blank" rel="noopener noreferrer">Google 发布 TPU 8tx 与 TPU 8i Max｜Google Blog</a>
- <span id="ref-12">12.</span> <a href="https://blogs.nvidia.com/blog/robotics-simulation-advancements-corl/" target="_blank" rel="noopener noreferrer">NVIDIA 在 CoRL 发布 GR00T 2 与 Isaac Lab 3.0｜NVIDIA Blog</a>
- <span id="ref-13">13.</span> <a href="https://dealroom.co/news/171040-fireworks-ai-says-hackers-reached-customer-datasets-partial-model-weight/" target="_blank" rel="noopener noreferrer">Fireworks AI 扩大 10 月安全事件披露｜Dealroom</a>
- <span id="ref-14">14.</span> <a href="https://news.mit.edu/2026/single-ai-model-simulates-many-substances-behavior-1109" target="_blank" rel="noopener noreferrer">MIT WorldParticle：一个模型模拟六种物理现象｜MIT News</a>
- <span id="ref-15">15.</span> <a href="https://news.mit.edu/2026/ai-assisted-learning-platform-helps-robots-reason-beyond-literal-commands-1109" target="_blank" rel="noopener noreferrer">MIT FLEX：让机器人理解指令背后的意图｜MIT News</a>
- <span id="ref-16">16.</span> <a href="https://www.markey.senate.gov/news/press-releases/markey-demands-google-allow-schools-to-disable-ai-services-without-blocking-search-access" target="_blank" rel="noopener noreferrer">美国参议员致信 Google：学校关 AI 不能丢搜索｜Markey Senate</a>
