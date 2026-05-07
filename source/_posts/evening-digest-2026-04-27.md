---
title: "AI晚报 · 04.27 周一"
date: 2026-04-27 21:19:05
description: "今日主线：\n- 本周AI领域焦点集中在模型架构革新与Agent生态落地\n- DeepSeek V4以极致效率挑战前沿模型\n- 国内厂商如腾讯、百度加速Agent平台升级"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：286 条

> 主线：本周AI领域焦点集中在模型架构革新与Agent生态落地。DeepSeek V4以极致效率挑战前沿模型，OpenAI整合Codex能力强化GPT-5.5，同时隐私保护与Agent框架成为开源热点。国内厂商如腾讯、百度加速Agent平台升级，推动AI从技术演示向业务流程交付演进。

## 重点资讯

### 01 · DeepSeek V4在百万Token上下文下FLOPs与KV缓存成本仅为V等进展

DeepSeek发布了V4预览版，包含Flash和Pro两个版本，均为混合专家模型，上下文窗口达百万Token。在1M-token上下文场景中，DeepSeek-V4-Pro的单Token FLOPs和KV缓存大小仅为DeepSeek-V3.2的27%和10%，而DeepSeek-V4-Flash更是降至10%和7%。该模型开源，旨在与Anthropic、Google、OpenAI等领先闭源系统竞争。

参考：<a class="cite" href="https://simonwillison.net/2026/Apr/24/deepseek-v4/#atom-everything" target="_blank" rel="noopener noreferrer" data-cite="2. Deep Seek V4：接近前沿，价格更低｜Simon Willison&#39;s W…">2</a>、<a class="cite" href="https://www.theverge.com/ai-artificial-intelligence/918035/deepseek-preview-v4-ai-model" target="_blank" rel="noopener noreferrer" data-cite="3. Deep Seek 预览新 AI 模型，一年前曾震慑美国同行｜The Verge AI">3</a>、<a class="cite" href="https://techcrunch.com/2026/04/24/deepseek-previews-new-ai-model-that-closes-the-gap-with-frontier-models/" target="_blank" rel="noopener noreferrer" data-cite="4. Deep Seek 预览新模型，缩小与前沿模型的差距｜TechCrunch AI">4</a>、<a class="cite" href="https://www.technologyreview.com/2026/04/24/1136422/why-deepseeks-v4-matters/" target="_blank" rel="noopener noreferrer" data-cite="5. Deep Seek 新模型 V4 重要的三个原因｜MIT Technology Rev…">5</a>

### 02 · OpenAI开源1.5亿参数的Privacy Filter模型

OpenAI发布了一款名为Privacy Filter的新模型，旨在帮助开发者脱敏文本中的个人身份信息（PII）。该模型参数规模达1.5亿，采用混合专家设计，以Apache 2.0协议在Hugging Face和GitHub开源。其核心优势在于深度语言理解能力，能通过上下文识别非结构化文本中的敏感信息。在PII-Masking-300k基准测试中，F1分数达到96%，修正后提升至97.43%。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27506" target="_blank" rel="noopener noreferrer" data-cite="6. Open AI 推出 Privacy Filter：全新 PII 脱敏模型开源上…｜AIBase">6</a>、<a class="cite" href="https://openai.com/index/introducing-openai-privacy-filter" target="_blank" rel="noopener noreferrer" data-cite="7. 介绍 Open AI 隐私过滤器｜OpenAI News">7</a>

### 03 · OpenAI整合Codex能力至GPT-5.5

OpenAI宣布终止独立编程模型Codex，将其核心能力全面并入GPT-5.5主模型。此举标志着研发思路从“专用插件式”转向“内生全能式”，开发者不再依赖专门编程分支。整合后的GPT-5.5在处理复杂编程任务时资源利用率显著优化，尽管API调用价格上涨约20%，但Token消耗量反而减少，体现了模型在逻辑代码处理上的精准高效。这一整合标志着AI编程能力已成为通用大模型的基石级指标。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27501" target="_blank" rel="noopener noreferrer" data-cite="1. Open AI 战略重心调整：编程模型 Codex 正式并入 GPT-5.5 架…｜AIBase">1</a>

## 其他快讯

- **01 · 腾讯 QClaw 迎来大升级：Deep Seek-V4-Pro 接入**：腾讯云Agent平台QClaw发布v0.2.14版本，这是迄今最大更新。升级包括接入Hermes框架，支持创建运行Hermes类型Agent，实现底层模型多元化。用户可在单一应用内调度多种模型，包括腾讯自研混元Hy3 preview、DeepSeek-V4-Pro、KIMI-K2.6及GLM-5.1。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27491" target="_blank" rel="noopener noreferrer" data-cite="11. 腾讯 QClaw 迎来大升级：Deep Seek-V4-Pro 接入，AI 专家…｜AIBase">11</a>）
- **02 · 百度GenFlow4.0发布，月活用户突破1亿，月任务交付量达2亿次。**：百度于4月27日AI Day发布通用智能体GenFlow4.0，并对Office Agent进行全面升级，推出首个全端可用的“AI工作台”。该版本深度兼容OpenClaw等开源框架，支持PC及移动端一键部署智能体。目前月活跃用户数已突破1亿，月任务交付量达2亿次，展现出极高的市场渗透率与用户粘性。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27505" target="_blank" rel="noopener noreferrer" data-cite="12. 百度发布Gen Flow4.0:Office Agent全面升级，月活用户突破1…｜AIBase">12</a>）
- **03 · Hugging Face发布覆盖40多种语言的纳米翻译数据集，适合低资源场景。**：Hugging Face发布了覆盖土耳其、英语、德语等40多种语言的纳米翻译数据集。该数据集由约600行合成句子对组成，涵盖广泛日常话题，体积小巧且多功能。它适合用于实验、原型设计和基准测试，能够快速训练迭代并轻松集成到低资源或边缘NLP工作流中。（参考：<a class="cite" href="https://huggingface.co/posts/prometechinc/166837279425878" target="_blank" rel="noopener noreferrer" data-cite="10. 利用我们 Hugging Face 就绪的纳米翻译数据集｜Hugging Face 社区">10</a>）

## 核心论文

- **通过探测代理主动评估智能体社**：该论文提出了Superminds Test框架，通过分层探测代理评估大规模自主智能体社会的集体智能，首次在超过两百万代理的平台上进行了实证研究。 <a class="cite" href="https://arxiv.org/abs/2604.22452" target="_blank" rel="noopener noreferrer" data-cite="8. Superminds Test: 通过探测代理主动评估智能体社会的集体智能｜arXiv cs.AI">8</a>
- **具备技能学习与多智能体委托的**：EvoAgent框架集成了结构化技能学习与分层子代理委托机制，支持通过用户反馈驱动的闭环过程实现技能的持续生成与优化。 <a class="cite" href="https://arxiv.org/abs/2604.20133" target="_blank" rel="noopener noreferrer" data-cite="9. Evo Agent: 具备技能学习与多智能体委托的可进化智能体框架｜arXiv cs.AI">9</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://news.aibase.com/zh/news/27501" target="_blank" rel="noopener noreferrer">Open AI 战略重心调整：编程模型 Codex 正式并入 GPT-5.5 架…｜AIBase</a>
- <span id="ref-2">2.</span> <a href="https://simonwillison.net/2026/Apr/24/deepseek-v4/#atom-everything" target="_blank" rel="noopener noreferrer">Deep Seek V4：接近前沿，价格更低｜Simon Willison&#39;s W…</a>
- <span id="ref-3">3.</span> <a href="https://www.theverge.com/ai-artificial-intelligence/918035/deepseek-preview-v4-ai-model" target="_blank" rel="noopener noreferrer">Deep Seek 预览新 AI 模型，一年前曾震慑美国同行｜The Verge AI</a>
- <span id="ref-4">4.</span> <a href="https://techcrunch.com/2026/04/24/deepseek-previews-new-ai-model-that-closes-the-gap-with-frontier-models/" target="_blank" rel="noopener noreferrer">Deep Seek 预览新模型，缩小与前沿模型的差距｜TechCrunch AI</a>
- <span id="ref-5">5.</span> <a href="https://www.technologyreview.com/2026/04/24/1136422/why-deepseeks-v4-matters/" target="_blank" rel="noopener noreferrer">Deep Seek 新模型 V4 重要的三个原因｜MIT Technology Rev…</a>
- <span id="ref-6">6.</span> <a href="https://news.aibase.com/zh/news/27506" target="_blank" rel="noopener noreferrer">Open AI 推出 Privacy Filter：全新 PII 脱敏模型开源上…｜AIBase</a>
- <span id="ref-7">7.</span> <a href="https://openai.com/index/introducing-openai-privacy-filter" target="_blank" rel="noopener noreferrer">介绍 Open AI 隐私过滤器｜OpenAI News</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2604.22452" target="_blank" rel="noopener noreferrer">Superminds Test: 通过探测代理主动评估智能体社会的集体智能｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://arxiv.org/abs/2604.20133" target="_blank" rel="noopener noreferrer">Evo Agent: 具备技能学习与多智能体委托的可进化智能体框架｜arXiv cs.AI</a>
- <span id="ref-10">10.</span> <a href="https://huggingface.co/posts/prometechinc/166837279425878" target="_blank" rel="noopener noreferrer">利用我们 Hugging Face 就绪的纳米翻译数据集｜Hugging Face 社区</a>
- <span id="ref-11">11.</span> <a href="https://news.aibase.com/zh/news/27491" target="_blank" rel="noopener noreferrer">腾讯 QClaw 迎来大升级：Deep Seek-V4-Pro 接入，AI 专家…｜AIBase</a>
- <span id="ref-12">12.</span> <a href="https://news.aibase.com/zh/news/27505" target="_blank" rel="noopener noreferrer">百度发布Gen Flow4.0:Office Agent全面升级，月活用户突破1…｜AIBase</a>
