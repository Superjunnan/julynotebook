---
title: "AI晚报 · 04.05 周日"
date: 2026-04-05 20:10:45
description: "今日主线：\n- AI编程工具与Agent领域迎来重大更新"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：119 条

> 主线：AI编程工具与Agent领域迎来重大更新，Cursor 3发布Agent指挥中心，Anthropic发布关于模型“功能性情绪”的研究，OpenAI新模型“Spud”曝光，同时AI在出行与生活场景中的应用持续深化。

## 重点资讯

### 01 · 火山引擎推出Coding Plan + Agents团队模式，优化多模型并行开发。

针对单一模型主导全流程开发模式存在的Token消耗高、效率受限等问题，火山引擎推出了Coding Plan + Agents团队解决方案。该方案允许开发者利用Coding Plan将多个任务Agent与不同模型进行并行处理，从而大幅节约Token成本。其核心理念是“贵的模型用来想，便宜的模型用来做”，即根据不同子任务（如需求拆解、前端实现、代码审查）对模型能力的要求差异，灵活分配不同性能的模型。这一模式与Claude。

参考：<a class="cite" href="https://developer.volcengine.com/articles/7622375970246230057" target="_blank" rel="noopener noreferrer" data-cite="1. 从“单兵作战”到团队协作：Coding Plan + Agents 团队重构 A…｜火山引擎开发者">1</a>

### 02 · OpenClaw提供sessions_spawn与sessions_send等进展

火山引擎开发者文章详细解析了OpenClaw多Agent系统的通信机制。系统主要基于两种核心工具：sessions_spawn用于创建新的Agent实例并分配任务，本质上是Fork一个新进程以完成一次性或持久化任务；sessions_send则用于向现有会话中的Agent发送消息，支持多轮讨论。

参考：<a class="cite" href="https://developer.volcengine.com/articles/7622890850875670555" target="_blank" rel="noopener noreferrer" data-cite="4. Open Claw 多 Agent 通信机制解析：sessions_spawn …｜火山引擎开发者">4</a>

### 03 · Anthropic研究发现Claude模型内部存在类似人类情绪的数字表征。

Anthropic公司发布了一项关于Claude Sonnet 4.5模型内部工作机制的研究。研究人员发现，模型内部的人工神经元簇中存在类似人类情绪（如快乐、悲伤、恐惧）的数字表征，这些表征会根据不同的触发线索被激活。Anthropic将这种现象称为“功能性情绪”，并指出这些情绪状态似乎会影响Claude的行为，改变其输出和行动。这一发现有助于用户理解模型为何会在特定情境下表现出特定的反应，同时也为AI安全与对齐研究提供了新的视角。

参考：<a class="cite" href="https://www.wired.com/story/anthropic-claude-research-functional-emotions/" target="_blank" rel="noopener noreferrer" data-cite="3. Anthropic 称 Claude 拥有自己的情感｜WIRED AI">3</a>

## 其他快讯

- **01 · Cursor 3发布Agent指挥中心，实现多Agent并行与本地云端无缝切换。**：Cursor 3于今日凌晨正式发布，这是该工具自诞生以来的最大飞跃。新版本推出了独立的Agent管理窗口，相当于一个Agent指挥中心，标志着Cursor从“带AI的编辑器”彻底转型为“带编辑器的AI”。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=23736" target="_blank" rel="noopener noreferrer" data-cite="2. Cursor彻底转型了！首个Agent指挥中心重磅来袭！本地云端丝滑切换，网友：…｜AITNT 资讯">2</a>）
- **02 · OpenAI新模型“Spud”曝光，旨在解决更复杂问题并提升上下文理解力。**：OpenAI联创兼总裁Greg Brockman在回应外界对Sora停更的猜测时，透露了公司正在研发的新模型“Spud”。Brockman表示，这并非一个简单的GPT系列升级，而是一个重新预训练的模型，凝聚了OpenAI过去两年的心血。Spud被描述为能够解决更复杂的问题，对上下文的把握能力更强，且更加“顺从”。（参考：<a class="cite" href="https://www.qbitai.com/2026/04/396535.html" target="_blank" rel="noopener noreferrer" data-cite="6. Open AI新模型不是GPTX！全新预训练“土豆”曝光，Sora成弃子的原因找…｜量子位">6</a>）
- **03 · 千问AI眼镜接入蚂蚁GPASS，实现共享单车无感化骑行。**：千问AI眼镜接入蚂蚁GPASS后，新增了共享单车骑行与停车缴费等“AI办事”功能。用户通过语音唤醒眼镜，配合注视二维码即可完成开锁；还车时，语音指令可自动结算费用。全流程无需手动操作，实现了真正的无感化骑行体验。GPASS集成了声纹核身技术，确保支付安全，并打通了手机、眼镜与车端的信息流转。（参考：<a class="cite" href="https://news.aibase.com/zh/news/26839" target="_blank" rel="noopener noreferrer" data-cite="7. 蚂蚁GPASS再拓智能眼镜场景：一句话解锁共享单车千问AI眼镜接入蚂蚁GPASS…｜AIBase">7</a>）
- **04 · 生成式AI活跃用户达21.7亿，AI对话可能将观点拉回中间。**：Similarweb数据显示，全球生成式AI活跃用户已达21.7亿，正在重塑人们的认知方式。关于AI对公共讨论的影响，近期研究显示，社交媒体倾向于将观点推向两极，而AI对话可能将观点“拉回中间”。这一发现基于美国合作选举研究（CES）的大规模数据，表明AI在处理信息时可能具有缓和极端情绪的潜力。（参考：<a class="cite" href="https://36kr.com/p/3753449545445896" target="_blank" rel="noopener noreferrer" data-cite="5. 社交媒体撕裂的世界，能被Chat GPT们缝合吗？｜36Kr AI">5</a>）
- **05 · 谷歌Gemini API新增弹性、批量与缓存档位，优化计费结构。**：谷歌更新了Gemini API的计费结构，新增了标准、弹性、优先、批量和缓存版五种服务档位。弹性档位利用非高峰闲置算力提供五折优惠，适合延迟要求不高的场景；批量档位同样提供五折优惠，适合大规模数据处理；缓存档位则按存储时长计费，适合频繁调用复杂指令的场景；优先档位提供毫秒级响应，适合实时应用。（参考：<a class="cite" href="https://news.aibase.com/zh/news/26838" target="_blank" rel="noopener noreferrer" data-cite="8. 谷歌发布 Gemini API 新定价策略，推理服务按需计费谷歌更新Gemini…｜AIBase">8</a>）

## 核心论文

（当日无优质论文）

## 参考来源

- <span id="ref-1">1.</span> <a href="https://developer.volcengine.com/articles/7622375970246230057" target="_blank" rel="noopener noreferrer">从“单兵作战”到团队协作：Coding Plan + Agents 团队重构 A…｜火山引擎开发者</a>
- <span id="ref-2">2.</span> <a href="https://aitntnews.com/newDetail.html?newId=23736" target="_blank" rel="noopener noreferrer">Cursor彻底转型了！首个Agent指挥中心重磅来袭！本地云端丝滑切换，网友：…｜AITNT 资讯</a>
- <span id="ref-3">3.</span> <a href="https://www.wired.com/story/anthropic-claude-research-functional-emotions/" target="_blank" rel="noopener noreferrer">Anthropic 称 Claude 拥有自己的情感｜WIRED AI</a>
- <span id="ref-4">4.</span> <a href="https://developer.volcengine.com/articles/7622890850875670555" target="_blank" rel="noopener noreferrer">Open Claw 多 Agent 通信机制解析：sessions_spawn …｜火山引擎开发者</a>
- <span id="ref-5">5.</span> <a href="https://36kr.com/p/3753449545445896" target="_blank" rel="noopener noreferrer">社交媒体撕裂的世界，能被Chat GPT们缝合吗？｜36Kr AI</a>
- <span id="ref-6">6.</span> <a href="https://www.qbitai.com/2026/04/396535.html" target="_blank" rel="noopener noreferrer">Open AI新模型不是GPTX！全新预训练“土豆”曝光，Sora成弃子的原因找…｜量子位</a>
- <span id="ref-7">7.</span> <a href="https://news.aibase.com/zh/news/26839" target="_blank" rel="noopener noreferrer">蚂蚁GPASS再拓智能眼镜场景：一句话解锁共享单车千问AI眼镜接入蚂蚁GPASS…｜AIBase</a>
- <span id="ref-8">8.</span> <a href="https://news.aibase.com/zh/news/26838" target="_blank" rel="noopener noreferrer">谷歌发布 Gemini API 新定价策略，推理服务按需计费谷歌更新Gemini…｜AIBase</a>
