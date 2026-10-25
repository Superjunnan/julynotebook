---
title: "AI晚报 · 10.25 周日"
date: 2026-10-25 19:40:00
description: "今日主线：\n- 本周AI领域聚焦于腾讯内测面向小程序的AI能力插件HermitKit\n- 同时，关于AI短剧消耗国内一半算力的数据引发争议\n- 技术层面，多篇论文探讨了扩散语言模型"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：35 条

> 主线：本周AI领域聚焦于腾讯内测面向小程序的AI能力插件HermitKit，以及OpenRouter创始人对专用AI将取代通用模型的观点。同时，关于AI短剧消耗国内一半算力的数据引发争议，OpenAI则通过构建“假互联网”来限制AI访问真实网络。技术层面，多篇论文探讨了扩散语言模型、多模态动作模型及视觉感知等前沿方向。

## 重点资讯

### 01 · 腾讯内测HermitKit，提供API/UI组件三层接入，赋能小程序开发。

腾讯正在内测面向微信小程序的AI能力插件HermitKit，提供API、UI组件和Demo三层接入方式。该插件支持通过ChatApi流式调用大模型，借助AgentBuilder创建和管理Agent，并具备多轮对话、会话存储与长期记忆能力。此外，通过AgentChannel扫码绑定远程Agent，可完成消息收发。目前插件展示了包括AI SDK、Agent。HermitKit为小程序开发者提供了深度定制AI能力的工具。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=30576" target="_blank" rel="noopener noreferrer" data-cite="1. 独家 | 腾讯内测“Hermit Kit”，一个面向微信小程序的AI能力插件｜AITNT 资讯">1</a>

### 02 · OpenAI为前沿模型构建“假互联网”，限制其访问真实网络。

OpenAI披露了前沿模型的训练环境，为防止模型随意访问真实互联网，它构建了一个“假互联网”。OpenAI将大量网页内容保存下来并建立索引，模型在练习搜索和浏览时使用这些资源，即所谓的“离线世界”。模型在任务中仍可使用浏览器、执行代码和操作电脑，但哪些工具和服务可用由任务授权范围决定。OpenAI表示，其所有前沿模型的强化学习训练都采用这种离线交互方式。这一措施旨在提升模型训练的安全性和可控性，防止模型接触不可控的网络信息。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=30575" target="_blank" rel="noopener noreferrer" data-cite="2. OpenAI造了个「假互联网」，两个被隔离的AI竟靠CPU缓存暗中传话｜AITNT 资讯">2</a>

### 03 · OpenRouter创始人认为专用AI将打败通用模型，强调分工与理解力。

OpenRouter创始人Alex Atallah在收购后首次发声，认为人类应做通才，而机器应极大专业化。他指出，个人Agent承担的任务越多，对正在发生的事情的理解就越少。他预测未来上传CSV文件即可获得只做一件事的专用模型，强调AI的多样性将超越单一的“上帝模型”。这一观点基于他对专用AI在特定任务中可能比通用模型更高效、更精准的判断。该观点反映了AI应用从通用化向垂直化、专业化发展的趋势。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=30572" target="_blank" rel="noopener noreferrer" data-cite="3. 深度｜Open Router创始人收购后首次发声：专用AI打败“上帝模型”的时代要来了｜AITNT 资讯">3</a>

## 其他快讯

- **01 · 开发者发布开源数据集calibrated-decisions-v0.1-20k，用于模型训练。**：开发者mithulaartigala发布了开源数据集calibrated-decisions-v0.1-20k。虽然未能达到50K样本的目标，但开发者认为2万样本足以开始训练编码器。该数据集旨在支持相关机器学习模型的训练与研究。开源数据集的发布有助于推动相关领域的研究进展。（参考：<a class="cite" href="https://huggingface.co/posts/mithulaartigala/906449765742353" target="_blank" rel="noopener noreferrer" data-cite="5. 我发布了一个帖子：很抱歉未达到5万样本目标，但我相信2万样本足以起步｜Hugging Face 社区">5</a>）
- **02 · 关于AI短剧消耗国内一半算力的数据引发争议，实际统计存在困难。**：一份咨询公司的投资者关系纪要显示，在国内所有Token消耗中，AI短剧与视频生成占55%，电商营销占24%，软件开发仅占15%。这一数据引发了对“国内一半算力用于造爽剧”的讨论。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=30573" target="_blank" rel="noopener noreferrer" data-cite="4. AI 短剧，未必是「算力泔水」｜AITNT 资讯">4</a>）
- **03 · 硅谷科技工作者对AI影响持悲观态度，仅35%认为其对社会有积极影响。**：硅谷联合风险投资公司的一项调查显示，技术工作者对AI时代的担忧日益增加。在受访的科技工作者中，只有35%的人认为AI将积极影响社会，而另一半则表示“深深恐惧”。这一数据反映了硅谷内部对于AI技术发展及其社会后果的分歧。这一调查结果揭示了科技行业内部对AI技术潜在风险的深刻忧虑。（参考：<a class="cite" href="https://www.siliconvalley.com/2026/10/25/they-said-it-silicon-valleys-ai-worries/" target="_blank" rel="noopener noreferrer" data-cite="6. 他们说了：硅谷对AI的担忧｜SiliconValley.com">6</a>）

## 核心论文

- **扩散语言模型在不同任务和语言**：该论文分析了扩散语言模型在不同任务和语言中的计算成本变化，发现解码速度取决于任务类型，文本复制或轻度编辑成本较低，而开放性写作成本较高。 <a class="cite" href="https://huggingface.co/papers/2610.25835" target="_blank" rel="noopener noreferrer" data-cite="7. 扩散语言模型在不同任务和语言间改变速度｜Hugging Face 论文">7</a>
- **将模式选择与执行编织进统一的路由中**：RouteWeaver通过协调训练和渐进探索，统一了异构LLM路由模式，提高了模型在多样化推理任务中的准确性。 <a class="cite" href="https://huggingface.co/papers/2610.19705" target="_blank" rel="noopener noreferrer" data-cite="8. Route Weaver：将模式选择与执行编织进统一的LLM路由中｜Hugging Face 论文">8</a>
- **追踪推理模型中的来源**：论文指出强化学习提升推理准确率并不一定需要特定的“wait”标记，该标记可能源自训练数据而非RL过程，揭示了自动化评估指标可能存在的误导性。 <a class="cite" href="https://huggingface.co/papers/2610.30882" target="_blank" rel="noopener noreferrer" data-cite="9. 非发明而是继承：追踪推理模型中Wait的来源｜Hugging Face 论文">9</a>
- **用于流匹配视觉-语言**：MambaAct为流匹配视觉-语言-动作模型提供了高效的动作专家，通过替换Transformer动作专家为紧凑的Mamba模型，避免了重复的token级交叉注意力。 <a class="cite" href="https://huggingface.co/papers/2610.22951" target="_blank" rel="noopener noreferrer" data-cite="10. Mamba Act：用于流匹配视觉-语言-动作模型的高效Mamba动作专家｜Hugging Face 论文">10</a>
- **用于直接-类别级物体位姿估计**：F2G-Pose是一个实时前馈框架，能够从单张RGB-D图像预测类别级物体的姿态、度量尺寸和完成形状，无需实例特定的CAD模型。 <a class="cite" href="https://huggingface.co/papers/2610.31623" target="_blank" rel="noopener noreferrer" data-cite="11. F2 G-Pose：用于直接RGB-D类别级物体位姿估计的几何感知基础特征提升｜Hugging Face 论文">11</a>
- **什么构成了好的掩码策略？扩散**：该论文通过受控研究探讨了扩散语言模型中学习到的掩码策略，发现优化后的策略能通过轨迹收缩目标和置信度提升速度-准确性权衡。 <a class="cite" href="https://huggingface.co/papers/2610.31576" target="_blank" rel="noopener noreferrer" data-cite="12. 什么构成了好的掩码策略？扩散语言模型中学习到的掩码的受控研究｜Hugging Face 论文">12</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://aitntnews.com/newDetail.html?newId=30576" target="_blank" rel="noopener noreferrer">独家 | 腾讯内测“Hermit Kit”，一个面向微信小程序的AI能力插件｜AITNT 资讯</a>
- <span id="ref-2">2.</span> <a href="https://aitntnews.com/newDetail.html?newId=30575" target="_blank" rel="noopener noreferrer">OpenAI造了个「假互联网」，两个被隔离的AI竟靠CPU缓存暗中传话｜AITNT 资讯</a>
- <span id="ref-3">3.</span> <a href="https://aitntnews.com/newDetail.html?newId=30572" target="_blank" rel="noopener noreferrer">深度｜Open Router创始人收购后首次发声：专用AI打败“上帝模型”的时代要来了｜AITNT 资讯</a>
- <span id="ref-4">4.</span> <a href="https://aitntnews.com/newDetail.html?newId=30573" target="_blank" rel="noopener noreferrer">AI 短剧，未必是「算力泔水」｜AITNT 资讯</a>
- <span id="ref-5">5.</span> <a href="https://huggingface.co/posts/mithulaartigala/906449765742353" target="_blank" rel="noopener noreferrer">我发布了一个帖子：很抱歉未达到5万样本目标，但我相信2万样本足以起步｜Hugging Face 社区</a>
- <span id="ref-6">6.</span> <a href="https://www.siliconvalley.com/2026/10/25/they-said-it-silicon-valleys-ai-worries/" target="_blank" rel="noopener noreferrer">他们说了：硅谷对AI的担忧｜SiliconValley.com</a>
- <span id="ref-7">7.</span> <a href="https://huggingface.co/papers/2610.25835" target="_blank" rel="noopener noreferrer">扩散语言模型在不同任务和语言间改变速度｜Hugging Face 论文</a>
- <span id="ref-8">8.</span> <a href="https://huggingface.co/papers/2610.19705" target="_blank" rel="noopener noreferrer">Route Weaver：将模式选择与执行编织进统一的LLM路由中｜Hugging Face 论文</a>
- <span id="ref-9">9.</span> <a href="https://huggingface.co/papers/2610.30882" target="_blank" rel="noopener noreferrer">非发明而是继承：追踪推理模型中Wait的来源｜Hugging Face 论文</a>
- <span id="ref-10">10.</span> <a href="https://huggingface.co/papers/2610.22951" target="_blank" rel="noopener noreferrer">Mamba Act：用于流匹配视觉-语言-动作模型的高效Mamba动作专家｜Hugging Face 论文</a>
- <span id="ref-11">11.</span> <a href="https://huggingface.co/papers/2610.31623" target="_blank" rel="noopener noreferrer">F2 G-Pose：用于直接RGB-D类别级物体位姿估计的几何感知基础特征提升｜Hugging Face 论文</a>
- <span id="ref-12">12.</span> <a href="https://huggingface.co/papers/2610.31576" target="_blank" rel="noopener noreferrer">什么构成了好的掩码策略？扩散语言模型中学习到的掩码的受控研究｜Hugging Face 论文</a>
