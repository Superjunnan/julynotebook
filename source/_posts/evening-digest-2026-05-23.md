---
title: "AI晚报 · 05.23 周六"
date: 2026-05-23 21:05:23
description: "今日主线：\n- 本周AI行业呈现“速度竞赛”与“生态重构”并行的态势\n- 智谱与谷歌分别以GLM-5.1高速版和Gemini 3.5\n- 行业焦点从单纯模型堆叠转向Agent生态"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：本周AI行业呈现“速度竞赛”与“生态重构”并行的态势。智谱与谷歌分别以GLM-5.1高速版和Gemini 3.5 Flash刷新性能极限，同时字节跳动开源Lance 3B挑战多模态架构范式。行业焦点从单纯模型堆叠转向Agent生态、算力效率优化及搜索体验革新。

## 重点资讯

### 01 · 谷歌I/O 2026发布Gemini 3.5 Flash

谷歌在I/O 2026上发布了Gemini 3.5 Flash模型，旨在帮助用户执行复杂的Agent工作流。该模型输出速度达到同级别前沿模型的4倍，价格却不到一半。谷歌CEO皮查伊指出，若将80%的负载从其他前沿模型迁至3.5 Flash，一家头部企业一年可节省超过10亿美元。谷歌的目标是将AI Agent能力融入搜索、Gmail、YouTube等所有核心服务，推动前沿能力规模化交付给更广泛的用户。Gemini 3.5。

参考：<a class="cite" href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/" target="_blank" rel="noopener noreferrer" data-cite="1. Gemini 3.5：具备行动能力的前沿智能｜Google AI Blog">1</a>、<a class="cite" href="https://www.leiphone.com/category/ai/k2qs0VRU74Ub6CCw.html" target="_blank" rel="noopener noreferrer" data-cite="2. 谷歌掀桌，一口气甩出16个AI王炸｜雷锋网 AI">2</a>

### 02 · 谷歌搜索全面转向Agent模式，通过智能体编排重塑信息获取体验。

谷歌在I/O 2026上宣布对搜索引擎进行25年来首次重大更新，全面转向Agent模式。用户可以通过自然语言指令让搜索智能体规划行程、生成UI界面并整合日历数据。尽管早期演示展示了代码生成过程，但谷歌计划在夏季全面上线时隐藏技术细节，以提供更简洁的用户体验。这一变革标志着搜索从关键词匹配向任务执行的范式转移。Agent搜索模式通过任务编排提升了信息获取效率，但需解决复杂指令下的准确性与稳定性问题。

参考：<a class="cite" href="https://www.wired.com/story/even-if-you-hate-ai-you-will-use-google-ai-search/" target="_blank" rel="noopener noreferrer" data-cite="10. 即使你讨厌 AI，你也得用 Google AI 搜索｜WIRED AI">10</a>、<a class="cite" href="https://arstechnica.com/google/2026/05/buckle-up-google-is-set-to-remake-search-with-agentic-ai-in-2026/" target="_blank" rel="noopener noreferrer" data-cite="11. 系好安全带：Google 将在 2026 年利用智能体 AI 重塑搜索｜Ars Technica AI">11</a>

### 03 · 智谱GLM-5.1高速版以400 tokens/s刷新API速度纪录

5月22日，智谱正式上线GLM-5.1高速版API，实测输出速度达400 tokens/s，刷新全球大模型API速度上限。该模型在保留旗舰级全尺寸能力的同时，支持200K超长上下文窗口，最大单次输出达128K标记。智谱通过GLM团队与TileRT团队深度联合，重构了系统级推理生态，实现了“旗舰级全尺寸能力”与“极致低延迟”的完美并存。这一突破对Coding和Agent协作等长链路、高频交互任务具有“降维打击”意义。

参考：<a class="cite" href="https://news.aibase.com/zh/news/28254" target="_blank" rel="noopener noreferrer" data-cite="20. 智谱发布GLM-5. 1 高速版：400 tokens/s飙出全球API新极限5月22日，智谱港股盘中一度飙升超22%，市值站稳4500亿港元，同时正式上线GL…｜AIBase">20</a>

## 其他快讯

- **01 · Hugging Face社区关注真实世界模拟与透明度检测技术。**：Hugging Face社区讨论了构建“真实SAO-like”世界所需的持久化与受限代理机制，强调通过账本和重放机制确保世界可信度。同时，社区展示了基于Qwen-2.5-7B的轻量级透明度检测器，能在单次前向传播中达到0.866 AUC，支持生产级审计。（参考：<a class="cite" href="https://huggingface.co/posts/RiverRider/315274388358886" target="_blank" rel="noopener noreferrer" data-cite="12. 冻结的 Qwen-2.5-7 B 模型单次前向传播结合轻量级分类器达到 0.866｜Hugging Face 社区">12</a>、<a class="cite" href="https://huggingface.co/posts/kanaria007/141831597390747" target="_blank" rel="noopener noreferrer" data-cite="13. 文章亮点：*真实比例世界模拟游戏* (art-60-157, v0.1)｜Hugging Face 社区">13</a>）
- **02 · Simon Willison发布datasette-agent工具，增强数据分析与可视化能力。**：Simon Willison推出了datasette-agent系列工具，包括图表渲染和SQL查询功能。这些工具通过交互式图表和权限检查，增强了数据探索的灵活性与安全性，为开发者提供了更强大的数据分析Agent支持。（参考：<a class="cite" href="https://simonwillison.net/2026/May/21/datasette-agent-sprites/#atom-everything" target="_blank" rel="noopener noreferrer" data-cite="14. 社区来源重点更新｜Simon Willison&#39;s W…">14</a>、<a class="cite" href="https://simonwillison.net/2026/May/21/datasette-agent-charts/#atom-everything" target="_blank" rel="noopener noreferrer" data-cite="15. 社区来源重点更新｜Simon Willison&#39;s W…">15</a>、<a class="cite" href="https://simonwillison.net/2026/May/20/datasette-agent-charts/#atom-everything" target="_blank" rel="noopener noreferrer" data-cite="16. 社区来源重点更新｜Simon Willison&#39;s W…">16</a>）
- **03 · 行业趋势转向Agent Labs，模型团队纷纷构建智能体产品。**：行业观察显示，OpenAI Labs等模型团队正从模型研发转向Agent产品构建。AI21的模型团队已关闭，转而专注于智能体开发。DeepSeek也首次组建了“Harness团队”以支持智能体系统。这一转变验证了“系统优于模型”的理念，即通过智能体编排实现更复杂的应用场景。（参考：<a class="cite" href="https://www.latent.space/p/ainews-all-model-labs-are-now-agent" target="_blank" rel="noopener noreferrer" data-cite="9. [AI新闻] 所有模型实验室现已转型为智能体实验室｜Latent Space">9</a>）
- **04 · DeepMind CEO Demis Hassabis反思谷歌落后原因，强调LLM潜力被低估。**：DeepMind CEO Demis Hassabis在访谈中承认，谷歌曾低估了LLM的潜力。他认为机器必须像人类一样从经验中学习，但LLM在规模扩大后叠加RLHF展现出惊人泛化能力。Hassabis指出，用户并不在乎模型是否完美，这成为谷歌在生成式AI竞争中落后于OpenAI的关键因素之一。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25398" target="_blank" rel="noopener noreferrer" data-cite="17. 谷歌为何被OpenAI抢先？DeepMind CEO：我曾经低估了LLM！不赞同Le Cun对AI风险的态度！AGI下一站是后稀缺世界｜AITNT 资讯">17</a>）
- **05 · 智谱ZCube架构通过组网优化提升推理效率，无需增加硬件即可提升15%吞吐。**：智谱公开了在生产集群中验证过的ZCube组网架构创新。该架构通过优化GPU互联网络，在不增加GPU、不更换服务器、不修改代码的情况下，使集群推理吞吐提升15%，首Token响应时间P99尾延迟下降40.6%。同时，ZCube架构所需的交换机和光模块数量减少三分之一，显著降低了长期运营成本。（参考：<a class="cite" href="https://36kr.com/p/3820132079505792" target="_blank" rel="noopener noreferrer" data-cite="19. 不加一块GPU，多榨出15%算力：大模型圈对网络“动刀”｜36Kr AI">19</a>）
- **06 · 字节跳动开源Lance 3 B，以3 B参数实现原生统一多模态理解与生成。**：字节跳动开源了原生统一多模态大模型Lance，仅3B激活参数即可实现图像/视频的理解、生成与跨模态编辑。Lance采用“共享上下文+能力解耦并行”设计，通过双流专家架构解决理解与生成的矛盾。该模型采用Apache2.0协议，权重已上线Hugging Face，为开发者提供了轻量化多模态解决方案。（参考：<a class="cite" href="https://news.aibase.com/zh/news/28251" target="_blank" rel="noopener noreferrer" data-cite="21. 字节跳动开源Lance 3 B：用一个“脑子”同时搞定图视理解与生成字节跳动开源Lance，一款仅3 B激活参数的原生统一多模态大模型，打破“理解模型（VLM）…｜AIBase">21</a>）
- **07 · CV与AI Agent结合推动行业落地，大华股份构建视觉与行业模型。**：在2026AI Partner大会上，大华股份展示了CV与AI Agent结合的行业实践。其V系列视觉大模型让系统“看得懂”物理世界，L系列行业模型打通业务逻辑。未来“基模+行业Know-how”将成为新范式，AI的终局是让每个行业和个体都不掉队。（参考：<a class="cite" href="https://36kr.com/p/3820220616495492" target="_blank" rel="noopener noreferrer" data-cite="18. 让智能体看见世界：CV × AI Agent 的行业场景新实践| 2026 AI Partner·北京亦庄AI+产业大会｜36Kr AI">18</a>）

## 核心论文

- **编译轨迹用于长上下文训练**：该论文提出ACC方法，通过编译Agent在多轮交互中产生的轨迹来训练LLM的长上下文推理能力，解决证据分散问题。 <a class="cite" href="https://arxiv.org/abs/2605.21850" target="_blank" rel="noopener noreferrer" data-cite="3. ACC: 编译Agent轨迹用于长上下文训练｜arXiv cs.AI">3</a>
- **多智能体系统中的安全共享**：LCGuard通过Transformer KV缓存实现隐式通信，并引入安全机制防止敏感信息在多智能体间无序传播。 <a class="cite" href="https://arxiv.org/abs/2605.22786" target="_blank" rel="noopener noreferrer" data-cite="4. LCGuard: 多智能体系统中的安全KV共享｜arXiv cs.AI">4</a>
- **自主系统的源级自演化**：MOSS允许Agent在部署后通过源级重写实现自我演化，解决静态部署后无法从交互中学习的问题。 <a class="cite" href="https://arxiv.org/abs/2605.22794" target="_blank" rel="noopener noreferrer" data-cite="5. MOSS: 自主Agent系统的源级自演化｜arXiv cs.AI">5</a>
- **验证门控完成作为多智能体运行**：该研究将验证门控完成作为多智能体运行时的准入控制模式，通过只读验证器确保任务提交的安全性。 <a class="cite" href="https://arxiv.org/abs/2605.17998" target="_blank" rel="noopener noreferrer" data-cite="6. 验证门控完成作为多智能体运行时准入控制｜arXiv cs.AI">6</a>
- **基于博弈的能源交易**：论文将Nash讨价还价解集成多智能体强化学习，实现电动汽车间的去中心化能源交易与公平性保障。 <a class="cite" href="https://arxiv.org/abs/2605.22363" target="_blank" rel="noopener noreferrer" data-cite="7. 基于Nash博弈的V2 V能源交易｜arXiv cs.AI">7</a>
- **偏好引导的拓扑优化**：TO-Agents框架通过多智能体系统将自然语言设计意图转化为拓扑优化设置，实现自动化设计。 <a class="cite" href="https://arxiv.org/abs/2605.21622" target="_blank" rel="noopener noreferrer" data-cite="8. TO-Agents: 偏好引导的拓扑优化｜arXiv cs.AI">8</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/" target="_blank" rel="noopener noreferrer">Gemini 3.5：具备行动能力的前沿智能｜Google AI Blog</a>
- <span id="ref-2">2.</span> <a href="https://www.leiphone.com/category/ai/k2qs0VRU74Ub6CCw.html" target="_blank" rel="noopener noreferrer">谷歌掀桌，一口气甩出16个AI王炸｜雷锋网 AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2605.21850" target="_blank" rel="noopener noreferrer">ACC: 编译Agent轨迹用于长上下文训练｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2605.22786" target="_blank" rel="noopener noreferrer">LCGuard: 多智能体系统中的安全KV共享｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2605.22794" target="_blank" rel="noopener noreferrer">MOSS: 自主Agent系统的源级自演化｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2605.17998" target="_blank" rel="noopener noreferrer">验证门控完成作为多智能体运行时准入控制｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://arxiv.org/abs/2605.22363" target="_blank" rel="noopener noreferrer">基于Nash博弈的V2 V能源交易｜arXiv cs.AI</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2605.21622" target="_blank" rel="noopener noreferrer">TO-Agents: 偏好引导的拓扑优化｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://www.latent.space/p/ainews-all-model-labs-are-now-agent" target="_blank" rel="noopener noreferrer">[AI新闻] 所有模型实验室现已转型为智能体实验室｜Latent Space</a>
- <span id="ref-10">10.</span> <a href="https://www.wired.com/story/even-if-you-hate-ai-you-will-use-google-ai-search/" target="_blank" rel="noopener noreferrer">即使你讨厌 AI，你也得用 Google AI 搜索｜WIRED AI</a>
- <span id="ref-11">11.</span> <a href="https://arstechnica.com/google/2026/05/buckle-up-google-is-set-to-remake-search-with-agentic-ai-in-2026/" target="_blank" rel="noopener noreferrer">系好安全带：Google 将在 2026 年利用智能体 AI 重塑搜索｜Ars Technica AI</a>
- <span id="ref-12">12.</span> <a href="https://huggingface.co/posts/RiverRider/315274388358886" target="_blank" rel="noopener noreferrer">冻结的 Qwen-2.5-7 B 模型单次前向传播结合轻量级分类器达到 0.866｜Hugging Face 社区</a>
- <span id="ref-13">13.</span> <a href="https://huggingface.co/posts/kanaria007/141831597390747" target="_blank" rel="noopener noreferrer">文章亮点：*真实比例世界模拟游戏* (art-60-157, v0.1)｜Hugging Face 社区</a>
- <span id="ref-14">14.</span> <a href="https://simonwillison.net/2026/May/21/datasette-agent-sprites/#atom-everything" target="_blank" rel="noopener noreferrer">社区来源重点更新｜Simon Willison&#39;s W…</a>
- <span id="ref-15">15.</span> <a href="https://simonwillison.net/2026/May/21/datasette-agent-charts/#atom-everything" target="_blank" rel="noopener noreferrer">社区来源重点更新｜Simon Willison&#39;s W…</a>
- <span id="ref-16">16.</span> <a href="https://simonwillison.net/2026/May/20/datasette-agent-charts/#atom-everything" target="_blank" rel="noopener noreferrer">社区来源重点更新｜Simon Willison&#39;s W…</a>
- <span id="ref-17">17.</span> <a href="https://aitntnews.com/newDetail.html?newId=25398" target="_blank" rel="noopener noreferrer">谷歌为何被OpenAI抢先？DeepMind CEO：我曾经低估了LLM！不赞同Le Cun对AI风险的态度！AGI下一站是后稀缺世界｜AITNT 资讯</a>
- <span id="ref-18">18.</span> <a href="https://36kr.com/p/3820220616495492" target="_blank" rel="noopener noreferrer">让智能体看见世界：CV × AI Agent 的行业场景新实践| 2026 AI Partner·北京亦庄AI+产业大会｜36Kr AI</a>
- <span id="ref-19">19.</span> <a href="https://36kr.com/p/3820132079505792" target="_blank" rel="noopener noreferrer">不加一块GPU，多榨出15%算力：大模型圈对网络“动刀”｜36Kr AI</a>
- <span id="ref-20">20.</span> <a href="https://news.aibase.com/zh/news/28254" target="_blank" rel="noopener noreferrer">智谱发布GLM-5. 1 高速版：400 tokens/s飙出全球API新极限5月22日，智谱港股盘中一度飙升超22%，市值站稳4500亿港元，同时正式上线GL…｜AIBase</a>
- <span id="ref-21">21.</span> <a href="https://news.aibase.com/zh/news/28251" target="_blank" rel="noopener noreferrer">字节跳动开源Lance 3 B：用一个“脑子”同时搞定图视理解与生成字节跳动开源Lance，一款仅3 B激活参数的原生统一多模态大模型，打破“理解模型（VLM）…｜AIBase</a>
