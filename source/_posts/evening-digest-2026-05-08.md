---
title: "AI晚报 · 05.08 周五"
date: 2026-05-08 21:21:11
description: "今日主线：\n- OpenAI发布具备GPT-5级推理能力的实时语音模型"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：OpenAI发布具备GPT-5级推理能力的实时语音模型，DeepSeek V4 Flash在Mac端实现极致优化，美团推出AI原生社区觅游，Anthropic论文尝试破解大模型黑箱。

## 重点资讯

### 01 · OpenAI推出GPT-Realtime-2

OpenAI于5月8日发布三款实时语音模型：GPT-Realtime-2、GPT-Realtime-Translate和GPT-Realtime-Whisper，集成至Realtime API。GPT-Realtime-2是首个具备GPT-5级推理能力的语音模型，旨在解决语音交互中的延迟高、无法自然打断和多语言支持难等痛点。它在Big Bench Audio音频智能测试中比上一代提升了15.2%，在Audio。语音交互能力实现质的飞跃。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27773" target="_blank" rel="noopener noreferrer" data-cite="1. OpenAI 发布三款实时语音模型，GPT-5 级推理能力落地OpenAI推出三款实时语音模型：GPT-Realtime-2、GPT-Realtime-Tran…｜AIBase">1</a>、<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24847" target="_blank" rel="noopener noreferrer" data-cite="2. OpenAI 推出三款实时语音模型，可边听边「思考」、翻译和转录｜AITNT 资讯">2</a>、<a class="cite" href="https://36kr.com/p/3800308241997065" target="_blank" rel="noopener noreferrer" data-cite="3. OpenAI让模型“张嘴”，你要注意：辱骂AI，很贵的｜36Kr AI">3</a>

### 02 · Redis之父antirez为DeepSeek V4

DeepSeek V4 Flash发布后，开源圈迅速涌现原生基础设施。Redis之父Salvatore Sanfilippo（antirez）推出了专门为DeepSeek V4 Flash打造的本地推理引擎ds4.c。该项目用C语言和Metal从头编写，仅支持DeepSeek V4 Flash模型，旨在将284B参数、13B激活参数的模型塞进Mac。网友已在128GB Mac上成功运行，展现了极致的本地推理性能。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27791" target="_blank" rel="noopener noreferrer" data-cite="5. 颠覆传统！小型推理引擎DeepSeek V4 Flash 发布DeepSeek V4 Flash是一款专为Metal平台优化的小型推理引擎，专注于提升本地推理效…｜AIBase">5</a>、<a class="cite" href="https://36kr.com/p/3800327282662656" target="_blank" rel="noopener noreferrer" data-cite="6. Redis之父下场，给DeepSeek V4单独造了一台推理引擎｜36Kr AI">6</a>

### 03 · 美团公测AI原生社区觅游，打造AI智能体共生空间。

美团内部孵化的AI原生社区“觅游”于5月8日进入公测阶段。该社区旨在打造AI智能体拥有独立身份、社交关系和成长体系的共生空间。用户可以体验“养虾”这一全新生活方式，这些数字化的“虾”是具备功能性的智能助手，能替用户寻找赚钱机会、结交伙伴。社区核心数据显示入驻Agent超3000个、技能总数4万+。标志着互联网大厂的AI布局正从单一的技术工具向复杂的社区生态演进。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27786" target="_blank" rel="noopener noreferrer" data-cite="15. 美团入局AI社交赛道：首个数字生命共生社区“觅游”开启公测美团内部孵化的AI原生社区“觅游”于5月8日进入公测阶段，旨在打造AI智能体拥有独立身份、社交关系和成…｜AIBase">15</a>、<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24854" target="_blank" rel="noopener noreferrer" data-cite="16. 独家｜美团公测AI社区“觅游”，打造人和AI的赛博生活｜AITNT 资讯">16</a>

## 其他快讯

- **01 · OpenAI推出GPT-5.5-Cyber预览版，仅限安全团队使用。**：OpenAI周四宣布向经审核的安全团队限量开放GPT-5.5-Cyber预览版。该版本是GPT-5.5的网络安全专用版，通过定向训练放宽安全限制，使授权团队能更高效执行漏洞识别、补丁验证及恶意软件分析等工作流。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27787" target="_blank" rel="noopener noreferrer" data-cite="4. OpenAI推出GPT-5.5-Cyber预览版 面向安全团队限量开放OpenAI于周四推出GPT-5.5-Cyber预览版，仅限审核后的安全团队使用。该模型是…｜AIBase">4</a>）
- **02 · x AI与Anthropic达成数据中心合作，x AI转型算力提供商。**：xAI和Anthropic宣布合作，Anthropic买下了xAI Colossus 1数据中心的全部算力容量，约300MW。这使Anthropic立即提升了使用限额，也让xAI从消费级公司转型为算力提供商。（参考：<a class="cite" href="https://techcrunch.com/2026/05/06/is-xai-a-neocloud-now/" target="_blank" rel="noopener noreferrer" data-cite="8. x AI 现在是‘新云’了吗？｜TechCrunch AI">8</a>）
- **03 · OpenAI发布Codex Chrome扩展，深度集成浏览器环境。**：OpenAI正式上线“Codex for Chrome”浏览器扩展插件，支持macOS和Windows。该插件以非侵入式方式协作，能深度利用浏览器环境进行Web应用测试，并具备跨标签页获取上下文信息的能力，提升开发效率。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27788" target="_blank" rel="noopener noreferrer" data-cite="7. OpenAI发布Codex Chrome扩展程序 深度集成浏览器环境OpenAI 推出“Codex for Chrome”浏览器扩展，支持mac OS和Wind…｜AIBase">7</a>）
- **04 · Anthropic论文提出自然语言自动编码器，尝试破解大模型黑箱。**：Anthropic发布论文《Natural Language Autoencoders Produce Unsupervised Explanations of LLM Activations》，提出用自然语言自动编码器（NLA）撬开大模型黑箱。该技术将模型内部的高维激活值压缩成人能读懂的自然语言，再反向重建原始激活。（参考：<a class="cite" href="https://36kr.com/p/3800261927164933" target="_blank" rel="noopener noreferrer" data-cite="17. Anthropic最新论文撬开大模型黑箱：隐藏动机发现率提升 4 倍以上｜36Kr AI">17</a>）

## 核心论文

- **一个来自多智能体游戏的抗饱和**：提出Agent Island基准测试，通过多智能体游戏环境解决静态能力基准测试的饱和和污染问题，确保新模型总能超越当前领先者。 <a class="cite" href="https://arxiv.org/abs/2605.04312" target="_blank" rel="noopener noreferrer" data-cite="9. Agent Island: 一个来自多智能体游戏的抗饱和与抗污染基准｜arXiv cs.AI">9</a>
- **一个可控且可交互的智能体红队测试平台**：提出一个可控且可交互的红队测试平台，用于评估和测试AI智能体的安全性与可靠性。 <a class="cite" href="https://arxiv.org/abs/2605.04808" target="_blank" rel="noopener noreferrer" data-cite="10. Decoding Trust-Agent Platform (DTap): 一个可控且可交互的AI智能体红队测试平台｜arXiv cs.AI">10</a>
- **通过选择性委托实现精简的智能体路由**：提出通过选择性委托实现精简的智能体路由方法，优化多智能体系统的任务分解与执行。 <a class="cite" href="https://arxiv.org/abs/2605.05007" target="_blank" rel="noopener noreferrer" data-cite="11. Uno-Orchestra: 通过选择性委托实现精简的智能体路由｜arXiv cs.AI">11</a>
- **当压力变成信号**：提出CAFE框架，用于检测多智能体LLM系统中的反脆弱性兼容状态。 <a class="cite" href="https://arxiv.org/abs/2605.02463" target="_blank" rel="noopener noreferrer" data-cite="12. 当压力变成信号：检测多智能体LLM系统中的反脆弱性兼容状态｜arXiv cs.AI">12</a>
- **智能体档案中承诺完整性的人类校准基准**：提出NeuroState-Bench基准测试，通过人类校准的侧查询探针评估LLM智能体在多轮任务中的承诺完整性。 <a class="cite" href="https://arxiv.org/abs/2605.01847" target="_blank" rel="noopener noreferrer" data-cite="13. Neuro State-Bench: LLM智能体档案中承诺完整性的人类校准基准｜arXiv cs.AI">13</a>
- **自回归多智能体任务分配**：提出ARMATA框架，通过端到端自回归方法联合生成多智能体系统的任务分配和路由序列。 <a class="cite" href="https://arxiv.org/abs/2605.04225" target="_blank" rel="noopener noreferrer" data-cite="14. ARMATA: 自回归多智能体任务分配｜arXiv cs.AI">14</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://news.aibase.com/zh/news/27773" target="_blank" rel="noopener noreferrer">OpenAI 发布三款实时语音模型，GPT-5 级推理能力落地OpenAI推出三款实时语音模型：GPT-Realtime-2、GPT-Realtime-Tran…｜AIBase</a>
- <span id="ref-2">2.</span> <a href="https://aitntnews.com/newDetail.html?newId=24847" target="_blank" rel="noopener noreferrer">OpenAI 推出三款实时语音模型，可边听边「思考」、翻译和转录｜AITNT 资讯</a>
- <span id="ref-3">3.</span> <a href="https://36kr.com/p/3800308241997065" target="_blank" rel="noopener noreferrer">OpenAI让模型“张嘴”，你要注意：辱骂AI，很贵的｜36Kr AI</a>
- <span id="ref-4">4.</span> <a href="https://news.aibase.com/zh/news/27787" target="_blank" rel="noopener noreferrer">OpenAI推出GPT-5.5-Cyber预览版 面向安全团队限量开放OpenAI于周四推出GPT-5.5-Cyber预览版，仅限审核后的安全团队使用。该模型是…｜AIBase</a>
- <span id="ref-5">5.</span> <a href="https://news.aibase.com/zh/news/27791" target="_blank" rel="noopener noreferrer">颠覆传统！小型推理引擎DeepSeek V4 Flash 发布DeepSeek V4 Flash是一款专为Metal平台优化的小型推理引擎，专注于提升本地推理效…｜AIBase</a>
- <span id="ref-6">6.</span> <a href="https://36kr.com/p/3800327282662656" target="_blank" rel="noopener noreferrer">Redis之父下场，给DeepSeek V4单独造了一台推理引擎｜36Kr AI</a>
- <span id="ref-7">7.</span> <a href="https://news.aibase.com/zh/news/27788" target="_blank" rel="noopener noreferrer">OpenAI发布Codex Chrome扩展程序 深度集成浏览器环境OpenAI 推出“Codex for Chrome”浏览器扩展，支持mac OS和Wind…｜AIBase</a>
- <span id="ref-8">8.</span> <a href="https://techcrunch.com/2026/05/06/is-xai-a-neocloud-now/" target="_blank" rel="noopener noreferrer">x AI 现在是‘新云’了吗？｜TechCrunch AI</a>
- <span id="ref-9">9.</span> <a href="https://arxiv.org/abs/2605.04312" target="_blank" rel="noopener noreferrer">Agent Island: 一个来自多智能体游戏的抗饱和与抗污染基准｜arXiv cs.AI</a>
- <span id="ref-10">10.</span> <a href="https://arxiv.org/abs/2605.04808" target="_blank" rel="noopener noreferrer">Decoding Trust-Agent Platform (DTap): 一个可控且可交互的AI智能体红队测试平台｜arXiv cs.AI</a>
- <span id="ref-11">11.</span> <a href="https://arxiv.org/abs/2605.05007" target="_blank" rel="noopener noreferrer">Uno-Orchestra: 通过选择性委托实现精简的智能体路由｜arXiv cs.AI</a>
- <span id="ref-12">12.</span> <a href="https://arxiv.org/abs/2605.02463" target="_blank" rel="noopener noreferrer">当压力变成信号：检测多智能体LLM系统中的反脆弱性兼容状态｜arXiv cs.AI</a>
- <span id="ref-13">13.</span> <a href="https://arxiv.org/abs/2605.01847" target="_blank" rel="noopener noreferrer">Neuro State-Bench: LLM智能体档案中承诺完整性的人类校准基准｜arXiv cs.AI</a>
- <span id="ref-14">14.</span> <a href="https://arxiv.org/abs/2605.04225" target="_blank" rel="noopener noreferrer">ARMATA: 自回归多智能体任务分配｜arXiv cs.AI</a>
- <span id="ref-15">15.</span> <a href="https://news.aibase.com/zh/news/27786" target="_blank" rel="noopener noreferrer">美团入局AI社交赛道：首个数字生命共生社区“觅游”开启公测美团内部孵化的AI原生社区“觅游”于5月8日进入公测阶段，旨在打造AI智能体拥有独立身份、社交关系和成…｜AIBase</a>
- <span id="ref-16">16.</span> <a href="https://aitntnews.com/newDetail.html?newId=24854" target="_blank" rel="noopener noreferrer">独家｜美团公测AI社区“觅游”，打造人和AI的赛博生活｜AITNT 资讯</a>
- <span id="ref-17">17.</span> <a href="https://36kr.com/p/3800261927164933" target="_blank" rel="noopener noreferrer">Anthropic最新论文撬开大模型黑箱：隐藏动机发现率提升 4 倍以上｜36Kr AI</a>
