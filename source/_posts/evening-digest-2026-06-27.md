---
title: "AI晚报 · 06.27 周六"
date: 2026-06-27 21:44:55
description: "今日主线：\n- DeepSeek开源推测解码框架DSpark\n- Anthropic与特朗普政府就Mythos模型解禁达成协议\n- SKT AI LABS发布基于Qwen"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：73 条

> 主线：DeepSeek开源推测解码框架DSpark，显著提升模型生成速度；Anthropic与特朗普政府就Mythos模型解禁达成协议，允许特定机构访问；SKT AI LABS发布基于Qwen 3.5的NRS_QWEN_MYTHOS_1M推理模型，支持百万级上下文。

## 重点资讯

### 01 · Anthropic Mythos 5模型获准向100多家美国机构开放。

在特朗普政府禁止Anthropic网络安全模型两周后，政府立场出现软化。根据Semafor和Reuters报道，政府允许Anthropic向超过100家特定的美国政府机构和公司提供Mythos 5模型，包括允许这些组织的非美国员工访问该模型。该名单还包含了Anthropic自身的非美国员工，他们原本被禁止访问这些模型。Fable 5（面向公众的Mythos级模型）仍处于悬而未决的状态，没有明确的推出时间表。地缘政治博弈下的技术解禁。

参考：<a class="cite" href="https://techcrunch.com/2026/06/26/trump-admin-releases-anthropic-mythos-to-be-used-by-more-than-100-us-companies-agencies/" target="_blank" rel="noopener noreferrer" data-cite="1. 特朗普政府发布 Anthropic Mythos，供100多家美国公司及机构使用｜TechCrunch AI">1</a>、<a class="cite" href="https://www.theverge.com/ai-artificial-intelligence/958458/anthropic-mythos-5-is-back-trump-negotiations" target="_blank" rel="noopener noreferrer" data-cite="2. Anthropic 的 Mythos 5 回归｜The Verge AI">2</a>

### 02 · DeepSeek开源DSpark框架，单用户生成速度提升60%-85%。

继完成500亿元融资后，DeepSeek今日首次放出开源新成果。公司推出了DeepSeek-V4-Pro-DSpark、DeepSeek-V4-Flash-DSpark模型，并开源了推测解码框架DSpark以及推测解码训练框架DeepSpec。根据梁文锋署名、联合北京大学完成的论文，DSpark部署在DeepSeek-V4线上服务系统时，有效减少了无效校验带来的算力浪费。相较于成熟的生产基线方案（MTP-1）。工程优化与算法创新结合。

参考：<a class="cite" href="https://36kr.com/p/3871187114448133" target="_blank" rel="noopener noreferrer" data-cite="4. 梁文锋署名论文，DeepSeek首轮融资后大动作：生成速度大涨85%｜36Kr AI">4</a>

### 03 · Anthropic指控阿里利用2.5万个账号进行大规模模型蒸馏。

Anthropic向美国参议院银行委员会递交信函，指控阿里Qwen团队在45天内利用2.5万个账号完成了2880万次交互。Anthropic认为这是迄今为止中国公司试图搭美国顶尖实验室便车的最大规模尝试，旨在低成本“提纯”出极具竞争力的专用模型，直接针对其旗舰模型Mythos Preview的核心能力。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26613" target="_blank" rel="noopener noreferrer" data-cite="5. 这次是阿里！中国的大模型团队快被 Anthropic 告完了｜AITNT 资讯">5</a>

## 其他快讯

- **01 · SKT AI LABS发布NRS_QWEN_MYTHOS_1 M，推理能力提升100倍**：SKT AI LABS宣布发布NRS_QWEN_MYTHOS_1M模型，该模型基于Qwen 3.5 9B构建，并引入了专有的神经推理系统（NRS）进行强化。该模型具备100倍的推理能力，支持100万Token的上下文长度，并原生支持思维链推理和工具调用。（参考：<a class="cite" href="https://huggingface.co/posts/Shrijanagain/603419602929999" target="_blank" rel="noopener noreferrer" data-cite="3. AI 社区大新闻！发布 NRS_QWEN_MYTHOS_1 M，一款强大的推理模型｜Hugging Face 社区">3</a>）
- **02 · a16z领投拉美AI医疗平台Telepatia 3300万美元A轮融资。**：哥伦比亚AI医疗平台Telepatia宣布完成3300万美元A轮融资，由a16z领投，Palantir首席技术官Shyam Sankar、Rappi创始人Simón Borrero和Nubank创始人David Vélez参投。该平台旨在利用AI解决拉美地区临床医生极度匮乏的问题，提供AI原生临床服务。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26614" target="_blank" rel="noopener noreferrer" data-cite="11. a16z领投拉美AI医疗平台 Telepatia A轮融资｜AITNT 资讯">11</a>）
- **03 · Karpathy加入Anthropic后开源活跃度降低，其CLAUDE.md文件在社区流传。**：自5月19日加入Anthropic以来，Andrej Karpathy在开源社区的活跃程度直线下降。最近他在X平台上吐槽推荐算法靠冲突引流，引发马斯克回应。不过，一份据称是Karpathy实际使用的CLAUDE.md文件在社区流传，该文件旨在标准化AI编程助手的使用规则。（参考：<a class="cite" href="https://36kr.com/p/3870932227724547" target="_blank" rel="noopener noreferrer" data-cite="9. 大神Karpathy用Claude的方式，原来是这样的？｜36Kr AI">9</a>）
- **04 · 谷歌DeepMind推理专家周登勇跳槽至Meta。**：谷歌DeepMind的“推理之王”周登勇（Denny Zhou）已低调加入Meta，担任研究科学家。此前他在谷歌工作八年，一手创建了推理团队，并在CoT、Self-Consistency等LLM基础工作上有巨大贡献。（参考：<a class="cite" href="https://36kr.com/p/3869926145184774" target="_blank" rel="noopener noreferrer" data-cite="10. 谷歌「推理之王」也跑路Meta了，当年还是李飞飞挖来的｜36Kr AI">10</a>）
- **05 · 开发者发布Qwen3-14 B Manim Expert Lo RA，可生成Manim视频。**：为参加“Build Small Hackathon”，开发者训练了Qwen3-14B Manim Expert LoRA，并构建了一个Gradio应用，可将任何概念转化为Manim解释视频。该模型基于合成的1万数据集训练。（参考：<a class="cite" href="https://huggingface.co/posts/ovi054/397128665978916" target="_blank" rel="noopener noreferrer" data-cite="15. Qwen3-14 B Manim 专家 Lo RA：构建 Gradio 应用，将任何概念转化为 Manim 动画｜Hugging Face 社区">15</a>）
- **06 · 英伟达All in物理AI路线，中国团队Deep Cybo率先定义。**：具身智能行业在VLA端到端、仿真训练、遥操作等路线上存在不确定性。中国团队DeepCybo创始人陈凯在2024年11月率先提出“人类学习”原创技术路线，试图以人类认知和行为模式为蓝本重新组织技术栈。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26603" target="_blank" rel="noopener noreferrer" data-cite="12. 英伟达All in的物理AI路线，居然是中国黑马提前一年就定义好了｜AITNT 资讯">12</a>）

## 核心论文

- **用于长推理的信息感知 压缩**：InfoKV提出一种基于信息论的KV Cache压缩框架，通过结合注意力权重和熵信号来增强LLM的长上下文推理能力。 <a class="cite" href="https://huggingface.co/papers/2606.26875" target="_blank" rel="noopener noreferrer" data-cite="6. 用于长推理的信息感知KV Cache压缩｜Hugging Face 论文">6</a>
- **验证视界：编码代理奖励的银弹**：论文指出对于现代编码代理，验证解决方案的难度已超过生成解决方案，需要自适应的验证系统来对齐代理信号与人类意图。 <a class="cite" href="https://huggingface.co/papers/2606.26300" target="_blank" rel="noopener noreferrer" data-cite="7. 验证视界：编码代理奖励的银弹｜Hugging Face 论文">7</a>
- **穿越火线：重新评估代理在熟悉**：通过基于网络的基准测试评估代理在陌生环境中的泛化能力，揭示了当前代理系统在时间感知、图形理解和3D推理方面与人类存在显著差距。 <a class="cite" href="https://huggingface.co/papers/2606.14397" target="_blank" rel="noopener noreferrer" data-cite="8. 穿越火线：重新评估代理在熟悉环境之外的能力｜Hugging Face 论文">8</a>
- **弥合现实世界图像生成中的上下文缺口**：提出统一的代理框架Qwen-Image-Agent，通过规划、推理、搜索和记忆机制逐步构建完整的生成上下文，解决文本到图像生成中的上下文缺口问题。 <a class="cite" href="https://huggingface.co/papers/2606.26907" target="_blank" rel="noopener noreferrer" data-cite="13. Qwen-Image-Agent：弥合现实世界图像生成中的上下文缺口｜Hugging Face 论文">13</a>
- **用于代理强化学习的基于策略的技能蒸馏**：提出基于策略的技能蒸馏框架，从完成的轨迹中提取密集的回顾监督信号，以提高语言代理训练的效率和性能。 <a class="cite" href="https://huggingface.co/papers/2606.26790" target="_blank" rel="noopener noreferrer" data-cite="14. OPID：用于代理强化学习的基于策略的技能蒸馏｜Hugging Face 论文">14</a>
- **基于策略的生成场蒸馏**：针对流匹配模型，提出基于策略的生成场蒸馏方法，通过将每个专家能力视为共享潜在流空间中的速度场，解决图像生成后训练中技能融合的干扰问题。 <a class="cite" href="https://huggingface.co/papers/2606.27377" target="_blank" rel="noopener noreferrer" data-cite="16. Dance OPD：基于策略的生成场蒸馏｜Hugging Face 论文">16</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://techcrunch.com/2026/06/26/trump-admin-releases-anthropic-mythos-to-be-used-by-more-than-100-us-companies-agencies/" target="_blank" rel="noopener noreferrer">特朗普政府发布 Anthropic Mythos，供100多家美国公司及机构使用｜TechCrunch AI</a>
- <span id="ref-2">2.</span> <a href="https://www.theverge.com/ai-artificial-intelligence/958458/anthropic-mythos-5-is-back-trump-negotiations" target="_blank" rel="noopener noreferrer">Anthropic 的 Mythos 5 回归｜The Verge AI</a>
- <span id="ref-3">3.</span> <a href="https://huggingface.co/posts/Shrijanagain/603419602929999" target="_blank" rel="noopener noreferrer">AI 社区大新闻！发布 NRS_QWEN_MYTHOS_1 M，一款强大的推理模型｜Hugging Face 社区</a>
- <span id="ref-4">4.</span> <a href="https://36kr.com/p/3871187114448133" target="_blank" rel="noopener noreferrer">梁文锋署名论文，DeepSeek首轮融资后大动作：生成速度大涨85%｜36Kr AI</a>
- <span id="ref-5">5.</span> <a href="https://aitntnews.com/newDetail.html?newId=26613" target="_blank" rel="noopener noreferrer">这次是阿里！中国的大模型团队快被 Anthropic 告完了｜AITNT 资讯</a>
- <span id="ref-6">6.</span> <a href="https://huggingface.co/papers/2606.26875" target="_blank" rel="noopener noreferrer">用于长推理的信息感知KV Cache压缩｜Hugging Face 论文</a>
- <span id="ref-7">7.</span> <a href="https://huggingface.co/papers/2606.26300" target="_blank" rel="noopener noreferrer">验证视界：编码代理奖励的银弹｜Hugging Face 论文</a>
- <span id="ref-8">8.</span> <a href="https://huggingface.co/papers/2606.14397" target="_blank" rel="noopener noreferrer">穿越火线：重新评估代理在熟悉环境之外的能力｜Hugging Face 论文</a>
- <span id="ref-9">9.</span> <a href="https://36kr.com/p/3870932227724547" target="_blank" rel="noopener noreferrer">大神Karpathy用Claude的方式，原来是这样的？｜36Kr AI</a>
- <span id="ref-10">10.</span> <a href="https://36kr.com/p/3869926145184774" target="_blank" rel="noopener noreferrer">谷歌「推理之王」也跑路Meta了，当年还是李飞飞挖来的｜36Kr AI</a>
- <span id="ref-11">11.</span> <a href="https://aitntnews.com/newDetail.html?newId=26614" target="_blank" rel="noopener noreferrer">a16z领投拉美AI医疗平台 Telepatia A轮融资｜AITNT 资讯</a>
- <span id="ref-12">12.</span> <a href="https://aitntnews.com/newDetail.html?newId=26603" target="_blank" rel="noopener noreferrer">英伟达All in的物理AI路线，居然是中国黑马提前一年就定义好了｜AITNT 资讯</a>
- <span id="ref-13">13.</span> <a href="https://huggingface.co/papers/2606.26907" target="_blank" rel="noopener noreferrer">Qwen-Image-Agent：弥合现实世界图像生成中的上下文缺口｜Hugging Face 论文</a>
- <span id="ref-14">14.</span> <a href="https://huggingface.co/papers/2606.26790" target="_blank" rel="noopener noreferrer">OPID：用于代理强化学习的基于策略的技能蒸馏｜Hugging Face 论文</a>
- <span id="ref-15">15.</span> <a href="https://huggingface.co/posts/ovi054/397128665978916" target="_blank" rel="noopener noreferrer">Qwen3-14 B Manim 专家 Lo RA：构建 Gradio 应用，将任何概念转化为 Manim 动画｜Hugging Face 社区</a>
- <span id="ref-16">16.</span> <a href="https://huggingface.co/papers/2606.27377" target="_blank" rel="noopener noreferrer">Dance OPD：基于策略的生成场蒸馏｜Hugging Face 论文</a>
