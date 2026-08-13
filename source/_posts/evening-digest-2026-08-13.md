---
title: "AI晚报 · 08.13 周四"
date: 2026-08-13 21:54:50
description: "今日主线：\n- 本周AI行业聚焦于模型安全与Agent能力验证\n- 学术层面，多篇论文探讨了Agent运行时安全"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：本周AI行业聚焦于模型安全与Agent能力验证，DeepMind发布消费级手语模型，阿里开源超大规模MoE模型Qwen3.8，同时xAI联创River AI获11亿美元融资。学术层面，多篇论文探讨了Agent运行时安全、多模态视频表示及科学推理可靠性。

## 重点资讯

### 01 · 阿里开源超大规模MoE模型Qwen3.8-2.4T-A95B

阿里巴巴开源了超大规模MoE模型Qwen3.8-2.4T-A95B，这是其开源模型系列中规模最大、能力最强的一代，首次将Qwen-Max级别的模型开放出来。该模型在众智Flag OS社区同步完成Day0多芯片适配，已在平头哥、英伟达、摩尔线程、华为昇腾、沐曦、昆仑芯、海光、清微智能、隧原等9家AI芯片上完成基于统一开源技术栈的多芯适配、精度对齐与部署验证。针对不同芯片情况，提供了BF16、FP8、INT8等多种精度的版本。

参考：<a class="cite" href="https://www.leiphone.com/category/ai/rbIV873aEJjUGpyU.html" target="_blank" rel="noopener noreferrer" data-cite="13. Qwen3.8首日可用，助力存量算力长期有用：智源Flag OS开源开放生态共享｜雷锋网 AI">13</a>

### 02 · xAI联创Igor Babuschkin创办River AI

xAI联合创始人Igor Babuschkin于8月11日宣布成立River AI，并完成11亿美元融资。这笔资金横跨种子轮和A轮，由General Catalyst和AMP PBC领投，英伟达、AMD Ventures战略投资，Y Combinator和淡马锡等参与。River AI团队仅约20人，目前刚公开首个产品River API，更完整的开源技术预计数月后发布。Babuschkin认为，更多细节仍待后续披露。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28215" target="_blank" rel="noopener noreferrer" data-cite="12. 又一位x AI联创宣布创业，押注开源模型和个人AI，融资11亿美元｜AITNT 资讯">12</a>

### 03 · DeepMind将SL2T手语模型首次集成至Pixel11手机

谷歌DeepMind发布了多语言手语转文本模型SL2T，并首次将其搭载于Pixel11手机系统。该模型接入Gboard键盘和Live Transcribe功能，用户通过前置摄像头打手语，即可进行消息编辑、网页检索及与Gemini对话，替代传统键盘输入。SL2T基于超过50种手语和10万小时素材训练，其中约四分之一来自美国手语数据集。通过跨语种联合训练，模型能学习不同手语间的共通动作逻辑，并在FLEURS-ASL评测中刷新纪录。

参考：<a class="cite" href="https://news.aibase.com/zh/news/30314" target="_blank" rel="noopener noreferrer" data-cite="8. 谷歌DeepMind发布SL2 T，手语AI首次进入消费级手机谷歌DeepMind推出多语言手语转文本模型SL2 T，并首次搭载于Pixel11手机，让手语AI…｜AIBase">8</a>

## 其他快讯

- **01 · Anthropic为Claude添加水印，引发部分用户不满，认为会暴露其使用AI进行工作或学习。**：Anthropic决定为Claude的输出添加水印，在聊天机器人的编辑文本中插入不可见的代码，以标记其为AI生成内容。这一政策旨在满足欧盟AI法案透明度代码的要求，要求科技公司标记可被计算机系统识别的AI生成或编辑内容。然而，部分AI用户对此表示不满，Reddit等平台上出现了反对声音。（参考：<a class="cite" href="https://techcrunch.com/2026/08/12/some-claude-users-are-mad-that-anthropics-new-watermarks-will-catch-them-cheating-at-their-jobs-classes/" target="_blank" rel="noopener noreferrer" data-cite="7. Anthropic 新水印引发 Claude 用户不满｜TechCrunch AI">7</a>）
- **02 · 速递｜用Agent寻找芯片散热材料，AI材料发现初创Discovered Materials获900万美元种子轮融资**：AI材料发现初创Discovered Materials宣布完成900万美元种子轮融资，由Lightspeed India Partners领投。该公司计划利用大量AI Agent集群，寻找可用于制造更高效集成电路的新材料，以解决AI工作负载导致的芯片温度过高问题。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28214" target="_blank" rel="noopener noreferrer" data-cite="9. 速递｜用Agent寻找芯片散热材料，AI材料发现初创Discovered Materials获900万美元种子轮融资｜AITNT 资讯">9</a>）
- **03 · 国内首个Agent记忆榜单AML发布，由近30家高校机构联合发起。**：Agent Memory Leaderboard（AML）正式发布首期结果，由国内外数十所高校与研究机构联合主办，包括清华、北大、上海交大、牛津大学等。AML上线仅十天内就吸引了136个团队注册参评，官方站点点击量突破20万次。评测按文本记忆和代码记忆两条赛道，分学术方法榜和商业产品榜。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=28211" target="_blank" rel="noopener noreferrer" data-cite="10. 近30家高校机构联合发起，国内首个 Agent 记忆榜单 AML 出炉，谁的 Agent 最不健忘｜AITNT 资讯">10</a>）
- **04 · 韩国Upstage发布Solar Pro4模型，具备512 K上下文窗口，定价极具竞争力。**：韩国人工智能实验室Upstage推出了面向复杂智能体任务的商用大模型Solar Pro4。该模型拥有高达512K的上下文窗口，支持最高128K的输出长度，单次会话可处理多份合同、报告及数据文件。其定价极具竞争力：每百万Tokens输入0.3美元，缓存读取0.06美元，输出1.2美元。（参考：<a class="cite" href="https://news.aibase.com/zh/news/30315" target="_blank" rel="noopener noreferrer" data-cite="11. 韩国AI新王Solar Pro 4登场，直接硬刚全球顶尖大模型？韩国Upstage推出商用大模型Solar Pro4，具备512 K上下文窗口，最高支持128 …｜AIBase">11</a>）

## 核心论文

- **安全应作为运行时契约**：论文提出AI安全不应仅依赖训练阶段的RLHF或DPO，而应作为运行时契约由Harness强制执行，通过沙箱、权限门禁等手段在动作执行前阻断危险行为。 <a class="cite" href="https://arxiv.org/abs/2608.11274" target="_blank" rel="noopener noreferrer" data-cite="3. Agent安全应作为运行时契约｜arXiv cs.AI">3</a>
- **迈向原生视频表示学习**：论文提出一种基于知识图谱的Agentic Auto-Encoding方法，学习结构化视频表示，旨在减少token使用量，提升创意Agent对高质量人类影片的学习与推理能力。 <a class="cite" href="https://huggingface.co/papers/2608.12313" target="_blank" rel="noopener noreferrer" data-cite="4. AVA-Encoder：迈向Agent原生视频表示学习｜Hugging Face 论文">4</a>
- **大模型科学推理中认识论可靠性**：论文引入TRACES基准，专门评估大模型在科学推理中区分可靠与不可靠文献的能力，通过42篇撤稿、欺诈和伪科学论文的语料库进行测试。 <a class="cite" href="https://arxiv.org/abs/2608.11415" target="_blank" rel="noopener noreferrer" data-cite="2. TRACES：大模型科学推理中认识论可靠性的基准测试｜arXiv cs.AI">2</a>
- **未见应用的联合工作流上下文与策略适应**：论文提出CoAdapt-GUI框架，在目标应用交互预算有限且无演示的情况下，通过联合适应结构化工作流上下文和策略，提升移动GUI Agent对未见应用的泛化能力。 <a class="cite" href="https://arxiv.org/abs/2608.11588" target="_blank" rel="noopener noreferrer" data-cite="5. Co Adapt-GUI：未见GUI应用的联合工作流上下文与策略适应｜arXiv cs.AI">5</a>
- **移动评估的裁判基准测试**：论文介绍MobileJudgeBench基准，包含931条人类标注轨迹，用于系统评估基于LLM的裁判在移动Agent轨迹评估中的可靠性。 <a class="cite" href="https://arxiv.org/abs/2608.11434" target="_blank" rel="noopener noreferrer" data-cite="6. 移动Agent评估的LLM裁判基准测试｜arXiv cs.AI">6</a>
- **基于基准的印度开源基础模型能**：论文对印度开源基础模型进行结构化基准对比评估，构建了能力与评估成熟度框架，以应对各国政府资助本土模型带来的评估复杂性。 <a class="cite" href="https://arxiv.org/abs/2608.11891" target="_blank" rel="noopener noreferrer" data-cite="1. 基于基准的印度开源基础模型能力与评估成熟度框架对比评估｜arXiv cs.AI">1</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2608.11891" target="_blank" rel="noopener noreferrer">基于基准的印度开源基础模型能力与评估成熟度框架对比评估｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2608.11415" target="_blank" rel="noopener noreferrer">TRACES：大模型科学推理中认识论可靠性的基准测试｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2608.11274" target="_blank" rel="noopener noreferrer">Agent安全应作为运行时契约｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://huggingface.co/papers/2608.12313" target="_blank" rel="noopener noreferrer">AVA-Encoder：迈向Agent原生视频表示学习｜Hugging Face 论文</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2608.11588" target="_blank" rel="noopener noreferrer">Co Adapt-GUI：未见GUI应用的联合工作流上下文与策略适应｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2608.11434" target="_blank" rel="noopener noreferrer">移动Agent评估的LLM裁判基准测试｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://techcrunch.com/2026/08/12/some-claude-users-are-mad-that-anthropics-new-watermarks-will-catch-them-cheating-at-their-jobs-classes/" target="_blank" rel="noopener noreferrer">Anthropic 新水印引发 Claude 用户不满｜TechCrunch AI</a>
- <span id="ref-8">8.</span> <a href="https://news.aibase.com/zh/news/30314" target="_blank" rel="noopener noreferrer">谷歌DeepMind发布SL2 T，手语AI首次进入消费级手机谷歌DeepMind推出多语言手语转文本模型SL2 T，并首次搭载于Pixel11手机，让手语AI…｜AIBase</a>
- <span id="ref-9">9.</span> <a href="https://aitntnews.com/newDetail.html?newId=28214" target="_blank" rel="noopener noreferrer">速递｜用Agent寻找芯片散热材料，AI材料发现初创Discovered Materials获900万美元种子轮融资｜AITNT 资讯</a>
- <span id="ref-10">10.</span> <a href="https://aitntnews.com/newDetail.html?newId=28211" target="_blank" rel="noopener noreferrer">近30家高校机构联合发起，国内首个 Agent 记忆榜单 AML 出炉，谁的 Agent 最不健忘｜AITNT 资讯</a>
- <span id="ref-11">11.</span> <a href="https://news.aibase.com/zh/news/30315" target="_blank" rel="noopener noreferrer">韩国AI新王Solar Pro 4登场，直接硬刚全球顶尖大模型？韩国Upstage推出商用大模型Solar Pro4，具备512 K上下文窗口，最高支持128 …｜AIBase</a>
- <span id="ref-12">12.</span> <a href="https://aitntnews.com/newDetail.html?newId=28215" target="_blank" rel="noopener noreferrer">又一位x AI联创宣布创业，押注开源模型和个人AI，融资11亿美元｜AITNT 资讯</a>
- <span id="ref-13">13.</span> <a href="https://www.leiphone.com/category/ai/rbIV873aEJjUGpyU.html" target="_blank" rel="noopener noreferrer">Qwen3.8首日可用，助力存量算力长期有用：智源Flag OS开源开放生态共享｜雷锋网 AI</a>
