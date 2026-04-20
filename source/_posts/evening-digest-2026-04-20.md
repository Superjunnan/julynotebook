---
title: "AI晚报 · 04.20 周一"
date: 2026-04-20 21:00:23
description: "今日主线：\n- 今日AI领域聚焦国产模型Qwen3.6系列的密集发布与开源\n- 同时，上海AI实验室推出ViraHInter药物研发模型\n- 学术方面，多篇关于多智能体协作"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：301 条

> 主线：今日AI领域聚焦国产模型Qwen3.6系列的密集发布与开源，包括Max-Preview旗舰版、35B-A3B高效开源模型及Esper 3.1微调版本。同时，上海AI实验室推出ViraHInter药物研发模型，爱奇艺“AI艺人库”引发权益争议，以及Mythos架构被开源。学术方面，多篇关于多智能体协作、安全评估及基准测试的论文发布。

## 重点资讯

### 01 · 阿里云百炼平台API限流政策将于4月28日起调整，默认限流设为10 QPS。

阿里云宣布自2026年4月28日起，对大模型服务平台“百炼”的多模态交互开发套件实施新的限流措施。新的默认限流将设置为每秒10次（QPS），支持每分钟新建600通会话，每小时可新建36000通会话。这一额度旨在满足大多数开发调试及日常业务场景的需求。对于此前已申请过限流调整的客户，其既有权限将保持不变。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27279" target="_blank" rel="noopener noreferrer" data-cite="5. 开发者注意！阿里云百炼平台API限流政策将迎来重要调整阿里云宣布自2026年4月…｜AIBase">5</a>

### 02 · 22岁开发者开源OpenMythos架构，通过循环深度Transformer等进展

Swarms智能体框架创始人Kye Gomez开源了OpenMythos架构。该架构整合了公开研究和对Claude Mythos架构的主流推测，实现了一个带有MoE路由机制的循环深度Transformer。通过跨专家的权重共享和条件计算，该架构仅用一半参数就能获得与传统模型同等的效果。

参考：<a class="cite" href="https://www.qbitai.com/2026/04/403708.html" target="_blank" rel="noopener noreferrer" data-cite="11. Mythos架构被22岁小伙“逆推”开源了！Mo E和注意力借鉴Deep See…｜量子位">11</a>

### 03 · Qwen3.6-35B-A3B以350亿参数仅激活30亿实现高效推理

4月19日晚间，国产千问3.6系列中等尺寸模型Qwen3.6-35B-A3B正式面向全球开发者开源。该模型采用混合专家架构，总参数量高达350亿，但在推理时仅需激活30亿参数，实现了“以小博大”的极致效率。这一特性使得开发者能用更低的算力成本获得远超同体量模型的智能输出能力。在Terminal-Bench2.0等编程基准测试中，其表现大幅超越前代产品，甚至能与参数量更大的稠密模型一较高下。此外，该模型引入了“多模态思考”模式。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27280" target="_blank" rel="noopener noreferrer" data-cite="9. 国产大模型再突破：Qwen3.6-35 B-A3 B正式开源，主打高效率与多模态…｜AIBase">9</a>

## 其他快讯

- **01 · Qwen3.6-Max-Preview在六项编程基准测试中取得最高分**：阿里巴巴正式发布了Qwen系列新一代旗舰模型——Qwen3.6-Max-Preview。作为该系列的早期预览版，用户可在QwenStudio中交互对话，并通过阿里云百炼API调用。与前代Qwen3.6-Plus相比，新模型在智能体编程、世界知识和指令遵循等方面均有显著提升。根据阿里巴巴的介绍。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27277" target="_blank" rel="noopener noreferrer" data-cite="8. 阿里巴巴发布 Qwen3.6-Max-Preview：编程智能新标杆阿里巴巴发布…｜AIBase">8</a>）
- **02 · 爱奇艺“AI艺人库”计划因多位艺人否认授权而陷入合规性争议。**：近日，爱奇艺在2026世界大会上宣布推出“AI艺人库”计划，声称已有超过100位艺人入驻，包括张若昀、王楚然等知名演员。该计划旨在利用爱奇艺自研的“纳逗Pro”影视制作平台，通过艺人的多模态数据创建专属数字分身，为影视创作提供高效和合规的数字化表演解决方案。然而，这一计划刚发布便引发了广泛的质疑。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27282" target="_blank" rel="noopener noreferrer" data-cite="6. 爱奇艺 “AI 艺人库” 计划引发争议 多位艺人否认授权爱奇艺推出“AI艺人库”…｜AIBase">6</a>）
- **03 · 上海 AI 实验室发布创新 Vira HInter 模型**：上海人工智能实验室联合复旦大学、上海交通大学医学院附属瑞金医院及上海市病毒研究院，推出了一款名为ViraHInter的全新AI预测模型。这一模型的推出标志着抗病毒药物研发进入了一个新阶段，能够在无需进行湿实验的情况下，预测病毒将如何“劫持”人体内的蛋白质。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27283" target="_blank" rel="noopener noreferrer" data-cite="10. 上海 AI 实验室发布创新 Vira HInter 模型，提升抗病毒药物研发效率…｜AIBase">10</a>）
- **04 · Thinking AI正式发布企业级AI Agent平台Agentic Engine**：ThinkingAI在美国西部时间4月16日下午的发布会上，正式发布了企业级AI Agent平台Agentic Engine。该平台旨在解决企业从“装上Agent”到“用好Agent”之间的核心卡点，包括Agent之间孤立无协作、多模态全域数据汇集难以及数据到知识的蒸馏难等问题。（参考：<a class="cite" href="https://36kr.com/p/3774850764030472" target="_blank" rel="noopener noreferrer" data-cite="7. Thinking AI正式发布企业级AI Agent平台Agentic Engi…｜36Kr AI">7</a>）

## 核心论文

- **评估大语言模型前沿物理研究能**：该基准测试旨在评估大语言模型在前沿物理研究中的能力，填补了当前科学基准仅关注领域知识理解和复杂推理的不足。 <a class="cite" href="https://arxiv.org/abs/2604.15411" target="_blank" rel="noopener noreferrer" data-cite="1. PRL-Bench：评估大语言模型前沿物理研究能力的综合基准｜arXiv cs.AI">1</a>
- **多智能体推理与协作的弱链优化**：该研究针对多智能体框架中推理不稳定的问题，提出系统识别并强化性能限制性智能体的方法，而非仅关注增强高能力智能体。 <a class="cite" href="https://arxiv.org/abs/2604.15972" target="_blank" rel="noopener noreferrer" data-cite="2. 多智能体推理与协作的弱链优化｜arXiv cs.AI">2</a>
- **智能体安全的盲点**：该论文揭示了计算机使用智能体在良性用户指令下可能暴露的安全漏洞，并提出了OS-BLIND基准进行评估。 <a class="cite" href="https://arxiv.org/abs/2604.10577" target="_blank" rel="noopener noreferrer" data-cite="3. 智能体安全的盲点：良性用户指令如何暴露计算机使用智能体的关键漏洞｜arXiv cs.AI">3</a>
- **用于报告生成的多智能体放射学临床层级**：该研究提出了MARCH多智能体框架，通过模拟放射科的专业层级结构，为CT报告生成提供协作监督，减少临床幻觉。 <a class="cite" href="https://arxiv.org/abs/2604.16175" target="_blank" rel="noopener noreferrer" data-cite="4. MARCH：用于CT报告生成的多智能体放射学临床层级｜arXiv cs.AI">4</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2604.15411" target="_blank" rel="noopener noreferrer">PRL-Bench：评估大语言模型前沿物理研究能力的综合基准｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2604.15972" target="_blank" rel="noopener noreferrer">多智能体推理与协作的弱链优化｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2604.10577" target="_blank" rel="noopener noreferrer">智能体安全的盲点：良性用户指令如何暴露计算机使用智能体的关键漏洞｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2604.16175" target="_blank" rel="noopener noreferrer">MARCH：用于CT报告生成的多智能体放射学临床层级｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://news.aibase.com/zh/news/27279" target="_blank" rel="noopener noreferrer">开发者注意！阿里云百炼平台API限流政策将迎来重要调整阿里云宣布自2026年4月…｜AIBase</a>
- <span id="ref-6">6.</span> <a href="https://news.aibase.com/zh/news/27282" target="_blank" rel="noopener noreferrer">爱奇艺 “AI 艺人库” 计划引发争议 多位艺人否认授权爱奇艺推出“AI艺人库”…｜AIBase</a>
- <span id="ref-7">7.</span> <a href="https://36kr.com/p/3774850764030472" target="_blank" rel="noopener noreferrer">Thinking AI正式发布企业级AI Agent平台Agentic Engi…｜36Kr AI</a>
- <span id="ref-8">8.</span> <a href="https://news.aibase.com/zh/news/27277" target="_blank" rel="noopener noreferrer">阿里巴巴发布 Qwen3.6-Max-Preview：编程智能新标杆阿里巴巴发布…｜AIBase</a>
- <span id="ref-9">9.</span> <a href="https://news.aibase.com/zh/news/27280" target="_blank" rel="noopener noreferrer">国产大模型再突破：Qwen3.6-35 B-A3 B正式开源，主打高效率与多模态…｜AIBase</a>
- <span id="ref-10">10.</span> <a href="https://news.aibase.com/zh/news/27283" target="_blank" rel="noopener noreferrer">上海 AI 实验室发布创新 Vira HInter 模型，提升抗病毒药物研发效率…｜AIBase</a>
- <span id="ref-11">11.</span> <a href="https://www.qbitai.com/2026/04/403708.html" target="_blank" rel="noopener noreferrer">Mythos架构被22岁小伙“逆推”开源了！Mo E和注意力借鉴Deep See…｜量子位</a>
