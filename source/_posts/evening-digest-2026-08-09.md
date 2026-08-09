---
title: "AI晚报 · 08.09 周日"
date: 2026-08-09 21:35:29
description: "今日主线：\n- AI行业在算力争夺与商业模式反思中持续演进\n- MiniMax重构Agent底座，Mirendil获巨额算力协议\n- 学术领域则面临AI打假的挑战，而物理世界自我改进框架的提出为AI等进展"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：35 条

> 主线：AI行业在算力争夺与商业模式反思中持续演进。MiniMax重构Agent底座，Mirendil获巨额算力协议，Harvey估值飙升，同时关于大模型盈利能力的争论引发关注。学术领域则面临AI打假的挑战，而物理世界自我改进框架的提出为AI落地提供了新思路。

## 重点资讯

### 01 · 前 Anthropic 团队创办的 Mirendil 获谷歌云超 1 亿美元算力协议

AI 实验室 Mirendil 已与 Google Cloud 签署多年期合作协议，金额超过 1 亿美元。这笔交易使该公司能够同时使用谷歌的 TPU 和 Nvidia 的 GPU，并获得托管训练集群，用于推进其自我改进型 AI 的研发。Mirendil 联合创始人 Behnam Neyshabur 表示，这笔交易金额大致相当于该公司种子轮融资的一半。该初创公司希望其 AI 最终能够承担起一整个前沿 AI 实验室的工作，并认为，更多细节仍待后续披露。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28108" target="_blank" rel="noopener noreferrer" data-cite="3. 速递｜前Anthropic团队创办AI实验室Mirendil，与谷歌云签超1亿美元算力协议，专注递归自我改进AI｜AITNT 资讯">3</a>

### 02 · MiniMax Code 2.0 摒弃自研底座

MiniMax Code 2.0 发布，宣布基于开源 Pi Agent 框架进行核心重建。此次重构不仅涉及模型升级，更动到了 Agent 的执行层，包括会话启动、上下文保存、工具调用以及长任务的连续性处理。MiniMax 认为当前 AI 产品中，模型容易被高估，而模型外的系统层容易被低估。让模型写函数不难，难的是让其连续工作半小时并处理复杂任务。MiniMax 通过重建会话执行、状态管理和工具调用链。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28113" target="_blank" rel="noopener noreferrer" data-cite="2. Mini Max Code 2.0 推倒重来：Agent 底座换成了 Node.js 开源框架｜AITNT 资讯">2</a>

### 03 · 前 OpenAI 研究员质疑大模型商业模式

前 OpenAI 研究员 Andrew Ho 质疑前沿 AI 实验室的商业模式，认为其赚的钱或许撑不到 AGI 到来。他描述当前的模型竞争为一种惩罚性循环，实验室只有不断扩大投入才有机会实现能力领先，但这种领先只能维持几个月。知名播客主持人 Dwarkesh Patel 随后反驳，认为只要模型能力仍在快速增长，领先本身就能创造巨大商业价值，一旦真正的 AGI 出现，它就会主动扩散。马斯克也迅速评论支持这一乐观预期。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28106" target="_blank" rel="noopener noreferrer" data-cite="4. 前OpenAI研究员看空大模型公司，Dwarkesh发文反驳：AGI会自己找工作｜AITNT 资讯">4</a>

## 其他快讯

- **01 · 法律垂直 AI 公司 Harvey 估值半年跳涨 40%，收入飙升推动新一轮融资谈判**：法律 AI 初创公司 Harvey 正在就新一轮融资进行深入谈判，计划以 155 亿美元的估值筹集至少 5 亿美元。五个月前，投资者给这家公司的估值还是 110 亿美元。支撑估值跳涨的是同样飞速攀升的收入，年收入已超过 3.5 亿美元，其中约 3 亿美元是年度经常性收入。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28098" target="_blank" rel="noopener noreferrer" data-cite="6. 法律垂直 AI 公司 Harvey 洽谈融资5亿美元，估值冲击155亿美元，收入飙升推动半年估值跳涨四成｜AITNT 资讯">6</a>）
- **02 · AI 大亨 David Silver 设定不直接获取财富**：David Silver 是一位亿万富翁，但他创立的 AI 实验室 Ineffable Intelligence 的股份价值不菲，但他自己却无法直接获取这笔钱。他曾在 Google DeepMind 工作，并在 2016 年领导开发了击败人类围棋冠军的 AlphaGo。（参考：<a class="cite" href="https://www.wired.com/story/ai-billionaires-are-pledging-their-wealth-good-or-bad/" target="_blank" rel="noopener noreferrer" data-cite="1. 这些AI巨头准备捐出他们的财富｜WIRED AI">1</a>）
- **03 · AI Agent 对 ICML 2026 论文进行复现审计，仅 8 篇能复现八成以上结论。**：研究者用 AI Agent 对 ICML 2026 全部 168 篇口头报告论文进行了系统性的结果复现审计。168 篇论文中有 92 篇拥有至少 5 条可供验证的结论性声明。最终结果显示，AI Agent 能够成功复现超过四成结论的只有 34 篇，而能复现八成以上结论的仅有 8 篇。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28107" target="_blank" rel="noopener noreferrer" data-cite="5. AI倒查论文100年！99.2%的顶刊都有问题｜AITNT 资讯">5</a>）
- **04 · 三位前 Spotify 工程师创办 AI 购物助手 Malachyte，获 1000 万美元种子轮融资。**：三位前 Spotify 工程师 Sidd Motwani、Ian Anderson 和 Shivaditya Sinha 创办了 Malachyte，该公司已完成 1000 万美元种子轮融资。他们曾打造了支撑 Spotify 推荐引擎的 Vector AI 系统，如今正将类似系统引入电商领域。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28100" target="_blank" rel="noopener noreferrer" data-cite="8. 速递｜三位前Spotify工程师创办AI购物助手Malachyte，获1000万美元种子轮融资｜AITNT 资讯">8</a>）
- **05 · Mirro S 首次提出 Physical RSI 框架，将递归自我改进逻辑延伸至物理世界。**：数字世界 AI 已经会自我改进，但物理现实没有环境已知的这一前提。MirroS 首创性地提出了 Physical RSI 框架，在公开文献中第一次将递归自我改进的逻辑从数字环境系统性地延伸到物理现实，并交付了从概念定义、运行机制到研究路线图的完整框架。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28101" target="_blank" rel="noopener noreferrer" data-cite="7. 深度｜数字世界AI已经会自我改进了，物理世界呢？Mirro S首发Physical RSI框架｜AITNT 资讯">7</a>）

## 核心论文

- **通过硬负样本进行检索中心化的思维链**：该论文提出通过硬负样本进行检索中心化的思维链，以解决统一多模态检索中语义相似候选对象混淆的问题。 <a class="cite" href="https://huggingface.co/papers/2608.06060" target="_blank" rel="noopener noreferrer" data-cite="9. Learning from Failures: 通过硬负样本进行检索中心化的思维链｜Hugging Face 论文">9</a>
- **用于 场景理解的动态模态编排**：论文提出动态模态编排框架，根据查询需求灵活组合视觉和几何信息，以提升 3D 场景理解能力。 <a class="cite" href="https://huggingface.co/papers/2608.05137" target="_blank" rel="noopener noreferrer" data-cite="10. Smart Mage: 用于 3 D 场景理解的动态模态编排｜Hugging Face 论文">10</a>
- **用于平衡多语言文本嵌入适应的**：该框架针对多语言文本嵌入模型，根据不同任务特性选择性应用流匹配，以实现更平衡的适应效果。 <a class="cite" href="https://huggingface.co/papers/2608.05785" target="_blank" rel="noopener noreferrer" data-cite="11. 用于平衡多语言文本嵌入适应的任务条件流匹配｜Hugging Face 论文">11</a>
- **通过潜在状态重建进行时序推理**：论文提出 ChronoVision 框架，通过潜在状态重建来对齐视觉逻辑与潜在图像，解决多步时序推理难题。 <a class="cite" href="https://huggingface.co/papers/2608.05631" target="_blank" rel="noopener noreferrer" data-cite="12. Chrono Vision: 通过潜在状态重建进行时序推理｜Hugging Face 论文">12</a>
- **通过固定预算稀疏上下文路由进**：该研究定义了交互式多镜头视频创作任务，并提出统一模型通过角色感知的上下文表示来处理生成与编辑。 <a class="cite" href="https://huggingface.co/papers/2608.04956" target="_blank" rel="noopener noreferrer" data-cite="13. Context Master: 通过固定预算稀疏上下文路由进行交互式多镜头视频创作｜Hugging Face 论文">13</a>
- **通过世界排练将环境动态内部化**：论文提出 EnvACE 方法，通过世界排练替代外部环境交互，降低长时序工具使用训练的成本。 <a class="cite" href="https://huggingface.co/papers/2608.06197" target="_blank" rel="noopener noreferrer" data-cite="14. Env ACE: 通过世界排练将环境动态内部化｜Hugging Face 论文">14</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://www.wired.com/story/ai-billionaires-are-pledging-their-wealth-good-or-bad/" target="_blank" rel="noopener noreferrer">这些AI巨头准备捐出他们的财富｜WIRED AI</a>
- <span id="ref-2">2.</span> <a href="https://aitntnews.com/newDetail.html?newId=28113" target="_blank" rel="noopener noreferrer">Mini Max Code 2.0 推倒重来：Agent 底座换成了 Node.js 开源框架｜AITNT 资讯</a>
- <span id="ref-3">3.</span> <a href="https://aitntnews.com/newDetail.html?newId=28108" target="_blank" rel="noopener noreferrer">速递｜前Anthropic团队创办AI实验室Mirendil，与谷歌云签超1亿美元算力协议，专注递归自我改进AI｜AITNT 资讯</a>
- <span id="ref-4">4.</span> <a href="https://aitntnews.com/newDetail.html?newId=28106" target="_blank" rel="noopener noreferrer">前OpenAI研究员看空大模型公司，Dwarkesh发文反驳：AGI会自己找工作｜AITNT 资讯</a>
- <span id="ref-5">5.</span> <a href="https://aitntnews.com/newDetail.html?newId=28107" target="_blank" rel="noopener noreferrer">AI倒查论文100年！99.2%的顶刊都有问题｜AITNT 资讯</a>
- <span id="ref-6">6.</span> <a href="https://aitntnews.com/newDetail.html?newId=28098" target="_blank" rel="noopener noreferrer">法律垂直 AI 公司 Harvey 洽谈融资5亿美元，估值冲击155亿美元，收入飙升推动半年估值跳涨四成｜AITNT 资讯</a>
- <span id="ref-7">7.</span> <a href="https://aitntnews.com/newDetail.html?newId=28101" target="_blank" rel="noopener noreferrer">深度｜数字世界AI已经会自我改进了，物理世界呢？Mirro S首发Physical RSI框架｜AITNT 资讯</a>
- <span id="ref-8">8.</span> <a href="https://aitntnews.com/newDetail.html?newId=28100" target="_blank" rel="noopener noreferrer">速递｜三位前Spotify工程师创办AI购物助手Malachyte，获1000万美元种子轮融资｜AITNT 资讯</a>
- <span id="ref-9">9.</span> <a href="https://huggingface.co/papers/2608.06060" target="_blank" rel="noopener noreferrer">Learning from Failures: 通过硬负样本进行检索中心化的思维链｜Hugging Face 论文</a>
- <span id="ref-10">10.</span> <a href="https://huggingface.co/papers/2608.05137" target="_blank" rel="noopener noreferrer">Smart Mage: 用于 3 D 场景理解的动态模态编排｜Hugging Face 论文</a>
- <span id="ref-11">11.</span> <a href="https://huggingface.co/papers/2608.05785" target="_blank" rel="noopener noreferrer">用于平衡多语言文本嵌入适应的任务条件流匹配｜Hugging Face 论文</a>
- <span id="ref-12">12.</span> <a href="https://huggingface.co/papers/2608.05631" target="_blank" rel="noopener noreferrer">Chrono Vision: 通过潜在状态重建进行时序推理｜Hugging Face 论文</a>
- <span id="ref-13">13.</span> <a href="https://huggingface.co/papers/2608.04956" target="_blank" rel="noopener noreferrer">Context Master: 通过固定预算稀疏上下文路由进行交互式多镜头视频创作｜Hugging Face 论文</a>
- <span id="ref-14">14.</span> <a href="https://huggingface.co/papers/2608.06197" target="_blank" rel="noopener noreferrer">Env ACE: 通过世界排练将环境动态内部化｜Hugging Face 论文</a>
