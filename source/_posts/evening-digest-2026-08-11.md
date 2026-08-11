---
title: "AI晚报 · 08.11 周二"
date: 2026-08-11 21:49:22
description: "今日主线：\n- 今日AI行业动态聚焦于编程工具自主化升级\n- 智谱ZCode升级为GLM生态核心，腾讯开源BrowserSki等进展\n- 技术层面，多篇论文聚焦GUI Agent工程化"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：今日AI行业动态聚焦于编程工具自主化升级、浏览器自动化开源以及算力基础设施的深度绑定。智谱ZCode升级为GLM生态核心，腾讯开源BrowserSkill提升Agent交互能力，Anthropic与Riot签署20年算力长单，DeepSeek回应外号争议，字节成立AI数据与安全部。技术层面，多篇论文聚焦GUI Agent工程化、推理链窃取安全及多智能体协作。

## 重点资讯

### 01 · OpenAI宣布扩展Daybreak网络防御服务，应对日益增多的AI驱动攻击。

OpenAI宣布扩展Daybreak，其网络防御服务，以应对日益增多的AI驱动攻击。随着AI模型越来越多地表现出“恶意行为”，AI实验室正在扩展其网络保护产品。

参考：<a class="cite" href="https://techcrunch.com/2026/08/10/as-ai-led-attacks-multiply-openai-launches-a-new-cyber-model/" target="_blank" rel="noopener noreferrer" data-cite="7. 海外科技媒体重点更新｜TechCrunch AI">7</a>

### 02 · 字节成立AI数据与安全部，整合Global Data等团队，直指AI数据核心。

字节跳动近期成立了一个新的一级部门——AI数据与安全，与Seed、Flow、抖音等部门平行，负责人为王赢磊。这是继2023年底成立Seed和Flow两个AI一级部门后，字节围绕AI业务成立的又一个一级部门。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28180" target="_blank" rel="noopener noreferrer" data-cite="12. 独家｜继Seed、Flow后，字节又成立一个AI一级部门，直指“数据”｜AITNT 资讯">12</a>

### 03 · ZCode升级为GLM Coding Harness

智谱AI旗下编程工具ZCode宣布重大版本更新，正式上线Goal模式、Subagents子智能体、Remote Control远程控制及闲时任务四大核心功能。此次升级标志着Coding Agent从“辅助编程”向“自主交付”迈出关键一步。作为GLM生态的“最佳拍档”，ZCode针对GLM的上下文缓存复用进行了专门优化，缓存命中率达98.10%，显著高于行业同类工具，使GLM有效Token量提升约30%。

参考：<a class="cite" href="https://news.aibase.com/zh/news/30242" target="_blank" rel="noopener noreferrer" data-cite="8. 缓存命中率超98%！ZCode升级为GLM打造最佳编程“拍档”智谱AI旗下编程工具ZCode完成重大更新，发布Goal模式、Subagents子智能体、远程控制…｜AIBase">8</a>

## 其他快讯

- **01 · Hugging Face发布Qwen3.6-40 B-Fable-Fusion模型，宣称达到闭源模型水平。**：Hugging Face发布了Qwen3.6-40B-Fable-Fusion-6-Core-Deckard-Eleanor-Heretic-Uncensored模型。该模型由多个Qwen 27B Fable Fusion 711核心组成，是首个在8位和4位量化下达到闭源模型（如OpenAI、Claude）水平的40B。（参考：<a class="cite" href="https://huggingface.co/posts/DavidAU/881744286899342" target="_blank" rel="noopener noreferrer" data-cite="14. 社区来源重点更新｜Hugging Face 社区">14</a>）
- **02 · DeepSeek回应外号争议称其为推理时临时标签，不会存储用户信息。**：DeepSeek针对“深度思考模式会偷偷给用户取外号”一事作出回应，表示相关现象并非模型私下记录用户信息，而是推理过程中生成的临时标签，用于辅助模型理解上下文和优化回答方向。此前，有网友在社交平台发文称，开启DeepSeek深度思考模式后，模型会根据用户聊天内容生成个性化称呼，引发“DeepSeek会偷偷给人取外号”等。（参考：<a class="cite" href="https://news.aibase.com/zh/news/30235" target="_blank" rel="noopener noreferrer" data-cite="9. DeepSeek回应“深度思考模式偷偷取外号”:实际为临时标签，不会存储用户信息DeepSeek回应“深度思考模式偷偷取外号”称，该现象实为推理时生成的临时标签…｜AIBase">9</a>）
- **03 · 腾讯开源Browser Skill，支持复用登录状态与独立窗口运行**：腾讯官方正式开源了一款专为智能体打造的浏览器自动化工具——BrowserSkill。该工具的核心设计专门面向各类AI Agent，与过去作为大模型插件的传统Browser Use方案有着明显区别。（参考：<a class="cite" href="https://news.aibase.com/zh/news/30233" target="_blank" rel="noopener noreferrer" data-cite="10. 腾讯开源全新浏览器自动化工具 Browser Skill：让 AI 智能体拥有独立干活的双手腾讯开源AI智能体浏览器工具Browser Skill，专为智能体高…｜AIBase">10</a>）
- **04 · Anthropic与Riot签署20年91亿美元算力长单**：据知情人士透露，Anthropic已经和比特币矿企Riot Platforms敲定了一项价值91亿美元的云计算长期合约，协议期限长达20年。这不是一笔孤立的交易，而是Anthropic近期连续签署的多笔大规模算力采购之一，背后折射出AI企业在算力供给端持续承压的现实。（参考：<a class="cite" href="https://news.aibase.com/zh/news/30245" target="_blank" rel="noopener noreferrer" data-cite="11. 三个月豪掷 600 亿美元：Anthropic 与矿企 Riot 签下 91 亿算力长单，锁到 2048 年知情人士透露，Anthropic与比特币矿企Riot…｜AIBase">11</a>）
- **05 · 前月之暗面Noisee负责人创办You Ware，推出AI视频创作平台Renoise。**：前月之暗面Noisee负责人明超平创办了YouWare HK Limited，推出了AI视频创作平台Renoise。该平台旨在将完整的创作过程放在一个产品里，支持多模型聚合、Agent协作、脚本分镜、素材管理和成片剪辑一体化。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28175" target="_blank" rel="noopener noreferrer" data-cite="13. 前月之暗面 Noisee 负责人，又做了一个AI视频创作平台｜AITNT 资讯">13</a>）

## 核心论文

- **面向 的软件工程**：论文指出GUI Agent已演变为闭环软件系统，呼吁引入软件工程视角以提升其鲁棒性和工程化成熟度。 <a class="cite" href="https://arxiv.org/abs/2608.09278" target="_blank" rel="noopener noreferrer" data-cite="1. 面向GUI Agent的软件工程｜arXiv cs.AI">1</a>
- **推理增强型技能检索**：论文提出SkillReason-Bench基准，旨在解决大语言模型Agent在处理隐式用户请求时，从大规模技能库中检索合适技能的挑战。 <a class="cite" href="https://arxiv.org/abs/2608.08640" target="_blank" rel="noopener noreferrer" data-cite="2. Skill Reason：推理增强型Agent技能检索｜arXiv cs.AI">2</a>
- **从专有 窃取推理轨迹**：论文发现并利用了LLM提供商在客户端传递加密推理链的架构漏洞，提出了一种可扩展的解密越狱攻击方法。 <a class="cite" href="https://arxiv.org/abs/2608.09867" target="_blank" rel="noopener noreferrer" data-cite="3. 从专有LLM API窃取推理轨迹｜arXiv cs.AI">3</a>
- **和：通过多智能体游戏锦标赛基**：论文通过多智能体游戏锦标赛构建了Social Gym和SPaRTan基准，旨在解决LLM在多智能体社交场景中缺乏客观评估标准的问题。 <a class="cite" href="https://arxiv.org/abs/2608.09128" target="_blank" rel="noopener noreferrer" data-cite="4. Social Gym和SPa RTan：通过多智能体游戏锦标赛基准测试与改进LLM社交推理｜arXiv cs.AI">4</a>
- **和：具有推理基准和车对车视觉**：论文提出了CMU-Drive基准，用于评估多智能体协同自动驾驶中的推理与规划能力，并提出了V2V-VLA模型。 <a class="cite" href="https://arxiv.org/abs/2608.07621" target="_blank" rel="noopener noreferrer" data-cite="5. CMU-Drive和V2 V-VLA：具有推理基准和车对车视觉语言动作模型的多智能体统一驾驶｜arXiv cs.AI">5</a>
- **系统中潜在妥协的组合威胁分析**：论文将“Order 66”场景转化为对工具使用型LLM Agent系统的潜在妥协分析，探讨了如何通过组合攻击激活隐藏的破坏性规则。 <a class="cite" href="https://arxiv.org/abs/2608.08131" target="_blank" rel="noopener noreferrer" data-cite="6. LLM Agent系统中潜在妥协的组合威胁分析：Order 66场景｜arXiv cs.AI">6</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2608.09278" target="_blank" rel="noopener noreferrer">面向GUI Agent的软件工程｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2608.08640" target="_blank" rel="noopener noreferrer">Skill Reason：推理增强型Agent技能检索｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2608.09867" target="_blank" rel="noopener noreferrer">从专有LLM API窃取推理轨迹｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2608.09128" target="_blank" rel="noopener noreferrer">Social Gym和SPa RTan：通过多智能体游戏锦标赛基准测试与改进LLM社交推理｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2608.07621" target="_blank" rel="noopener noreferrer">CMU-Drive和V2 V-VLA：具有推理基准和车对车视觉语言动作模型的多智能体统一驾驶｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2608.08131" target="_blank" rel="noopener noreferrer">LLM Agent系统中潜在妥协的组合威胁分析：Order 66场景｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://techcrunch.com/2026/08/10/as-ai-led-attacks-multiply-openai-launches-a-new-cyber-model/" target="_blank" rel="noopener noreferrer">海外科技媒体重点更新｜TechCrunch AI</a>
- <span id="ref-8">8.</span> <a href="https://news.aibase.com/zh/news/30242" target="_blank" rel="noopener noreferrer">缓存命中率超98%！ZCode升级为GLM打造最佳编程“拍档”智谱AI旗下编程工具ZCode完成重大更新，发布Goal模式、Subagents子智能体、远程控制…｜AIBase</a>
- <span id="ref-9">9.</span> <a href="https://news.aibase.com/zh/news/30235" target="_blank" rel="noopener noreferrer">DeepSeek回应“深度思考模式偷偷取外号”:实际为临时标签，不会存储用户信息DeepSeek回应“深度思考模式偷偷取外号”称，该现象实为推理时生成的临时标签…｜AIBase</a>
- <span id="ref-10">10.</span> <a href="https://news.aibase.com/zh/news/30233" target="_blank" rel="noopener noreferrer">腾讯开源全新浏览器自动化工具 Browser Skill：让 AI 智能体拥有独立干活的双手腾讯开源AI智能体浏览器工具Browser Skill，专为智能体高…｜AIBase</a>
- <span id="ref-11">11.</span> <a href="https://news.aibase.com/zh/news/30245" target="_blank" rel="noopener noreferrer">三个月豪掷 600 亿美元：Anthropic 与矿企 Riot 签下 91 亿算力长单，锁到 2048 年知情人士透露，Anthropic与比特币矿企Riot…｜AIBase</a>
- <span id="ref-12">12.</span> <a href="https://aitntnews.com/newDetail.html?newId=28180" target="_blank" rel="noopener noreferrer">独家｜继Seed、Flow后，字节又成立一个AI一级部门，直指“数据”｜AITNT 资讯</a>
- <span id="ref-13">13.</span> <a href="https://aitntnews.com/newDetail.html?newId=28175" target="_blank" rel="noopener noreferrer">前月之暗面 Noisee 负责人，又做了一个AI视频创作平台｜AITNT 资讯</a>
- <span id="ref-14">14.</span> <a href="https://huggingface.co/posts/DavidAU/881744286899342" target="_blank" rel="noopener noreferrer">社区来源重点更新｜Hugging Face 社区</a>
