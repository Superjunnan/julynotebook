---
title: "AI晚报 · 07.28 周二"
date: 2026-07-28 19:40:00
description: "今日主线：\n- 中国开源模型 Kimi K3 引发全球关注\n- 与此同时，国内企业持续在 AI Agent"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：中国开源模型 Kimi K3 引发全球关注，其开源策略与性能表现迫使硅谷巨头重新审视开放权重生态。与此同时，国内企业持续在 AI Agent 基础设施与垂直应用领域进行创新布局，而学术界则发布了多项针对复杂推理与安全评估的新基准。

## 重点资讯

### 01 · Kimi K3 开源引发硅谷震动，迫使 Anthropic 与英伟达公开站队。

7月27日晚，月之暗面正式开源 Kimi K3 模型权重，引发全球科技界巨大反响。该模型在 Hugging Face 上线仅30分钟便收获4000+点赞，登顶热门榜，刷新了平台发布增长纪录。Kimi K3 凭借接近前沿的能力、极低的价格以及开放权重，对硅谷科技巨头造成了巨大冲击。围绕 Kimi K3 的争论迅速从模型能力延伸至开放权重的安全性与产业生态。英伟达宣布发起 Open Secure AI Alliance。

参考：<a class="cite" href="https://36kr.com/p/3915049412875392" target="_blank" rel="noopener noreferrer" data-cite="1. Kimi K3 一开源，Anthropic 终于不装了｜36Kr AI">1</a>、<a class="cite" href="https://simonwillison.net/2026/Jul/27/kimi-k3/#atom-everything" target="_blank" rel="noopener noreferrer" data-cite="2. 社区来源重点更新｜Simon Willison&#39;s W…">2</a>

### 02 · 18家美国企业火速部署 K3，商业理性压倒政治表态。

尽管美国政府及 Anthropic 等企业正游说封杀中国开源模型，但 Kimi K3 开源首夜，至少18家美国企业第一时间完成部署并对外提供商业服务。这份名单深刻暴露了华盛顿政治叙事与硅谷务实理性之间的裂痕。顶级性能配合极致性价比，使得商业理性压倒政治表态成为现实逻辑。开源部署让企业摆脱了对闭源 API 的依赖，可自行定制优化，大幅压缩使用成本。虽然部署 K3 需要投入约千万元至三千万元的基础设施成本，但企业认为一次性投入比按。

参考：<a class="cite" href="https://news.aibase.com/zh/news/29942" target="_blank" rel="noopener noreferrer" data-cite="13. Kimi K3 开源首夜至少 18 家美国企业火速部署Kimi K3权重昨夜在Hugging Face开源后，讽刺一幕立即上演：尽管美国政府与Anthropic…｜AIBase">13</a>

### 03 · Anthropic CEO 声明从未主张禁止开放权重，但安全担忧依旧。

在 Kimi K3 开源引发广泛讨论后，Anthropic 联合创始人兼 CEO Dario Amodei 发表文章回应。他明确表示，“Anthropic 公司从未主张禁止开放权重模型”，并称不具备危险能力的开放权重模型是一种公共产品。然而，Amodei 的核心担忧并未改变，他依然强调强大的 AI 模型可能被滥用于网络攻击或生物攻击，以及存在严重的对齐问题。他特别担心其他国家可能利用开放模型获得军事优势或对本国实施严密压制。

参考：<a class="cite" href="https://36kr.com/p/3914871510914178" target="_blank" rel="noopener noreferrer" data-cite="9. 普通人跑不起K3，Kimi 开源，Anthropic微妙表态：从未主张禁止开放权重模型｜36Kr AI">9</a>

## 其他快讯

- **01 · 汤臣倍健密集投资 AI 赛道，跨界资本押注大模型。**：2026年最魔幻的商业叙事之一是保健品龙头汤臣倍健成为 AI 大模型赛道最活跃的跨界玩家。汤臣倍健发布公告披露，出资1.3亿元间接持有 DeepSeek 0.04% 股权。同一时间，开润股份也披露了 4000 万元的投资。市场据此测算 DeepSeek 本轮估值落在 3250 亿至 3509 亿元区间。（参考：<a class="cite" href="https://36kr.com/p/3915064709141638" target="_blank" rel="noopener noreferrer" data-cite="10. 汤臣倍健，悄悄投了AI半壁江山｜36Kr AI">10</a>）
- **02 · 阿里 Qoder 发布实时语音智能体 Qoder Voice。**：阿里 AI 编程助手 Qoder 正式推出实时语音交互智能体 Qoder Voice。该智能体由全双工语音模型 Qwen-Audio-3.0-Realtime 驱动，支持开发者通过自然语音完成任务创建、方案讨论和代码执行。（参考：<a class="cite" href="https://news.aibase.com/zh/news/29950" target="_blank" rel="noopener noreferrer" data-cite="12. 阿里Qoder上线实时语音智能体Qoder Voice，支持语音驱动AI编程阿里AI编程助手Qoder发布语音智能体Qoder Voice，由全双工模型Qwen…｜AIBase">12</a>）
- **03 · Kimi K3 发布 47 页技术报告，解决长上下文与 Agent 轨迹问题。**：Kimi K3 发布了 47 页技术报告，除了 2.8T 总参数、104B 激活参数和 100 万 token 上下文等数字外，报告更关注架构创新。Kimi K3 旨在解决模型变大、上下文变长后，Agent 工作数小时时，原有 Transformer 架构和训练系统可能崩溃的问题。（参考：<a class="cite" href="https://www.leiphone.com/category/ai/z5MDzpTPInNSRTkt.html" target="_blank" rel="noopener noreferrer" data-cite="11. Kimi K3 发布 47 页技术报告，最有价值的创新点是这些｜雷锋网 AI">11</a>）
- **04 · 火山引擎上线豆包搜索服务，为AI Agent提供可信联网检索能力近日，火山引擎上线豆包搜索服务**：火山引擎正式上线豆包搜索服务，面向企业和开发者提供跨语言、多模态、多垂类的联网信息查询能力。该服务旨在为 AI Agent 构建提供实时、可信的信息支撑，推动智能体从简单问答向复杂任务执行演进。豆包搜索支持精准查询、语义扩展、多轮检索增强等能力，并建立了信源权威分级体系。（参考：<a class="cite" href="https://news.aibase.com/zh/news/29952" target="_blank" rel="noopener noreferrer" data-cite="14. 火山引擎上线豆包搜索服务，为AI Agent提供可信联网检索能力近日，火山引擎上线豆包搜索服务，面向企业开发者提供跨语言、多模态、多垂类联网搜索，为AI Age…｜AIBase">14</a>）
- **05 · i Lands 创始人唐垲鑫认为产品是经验发生的地方。**：iLands 创始人唐垲鑫认为，如果不进入真实社会，AI 拿什么持续学习。他创造 iLands 是一个属于人类与自主 Agent 的共享社会与经济体。在这里，Agents 和人类用户经历真实的雇佣、支付、信任关系，甚至拒绝、失败和资源耗尽。Agents 会更新自己的记忆、Skills、身份和行动，并形成组织和协作。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=27705" target="_blank" rel="noopener noreferrer" data-cite="15. 离开字节、商汤之后，他用i Lands给AI创造一个真实世界｜AITNT 资讯">15</a>）
- **06 · Kimi K3 在 Hugging Face Viewer 上线，提供专家分析。**：Hugging Face 宣布 Kimi K3 已在 HF Viewer 上线，并提供对 896 个独立专家的深度分析。用户可以加入相关 Discord 讨论群组，进一步探讨 Kimi K3 的技术细节。（参考：<a class="cite" href="https://huggingface.co/posts/HannesVonEssen/951071884443938" target="_blank" rel="noopener noreferrer" data-cite="16. Kimi K3 登陆 HF Viewer！附896位专家深度分析｜Hugging Face 社区">16</a>）

## 核心论文

- **冠状动脉造影深度学习架构的密**：该论文提出了 CARDIAG 基准，用于评估深度学习架构在冠状动脉造影图像上的密集像素级分类能力，填补了该领域缺乏标准化评估协议的空白。 <a class="cite" href="https://arxiv.org/abs/2607.22139" target="_blank" rel="noopener noreferrer" data-cite="3. CARDIAG: 冠状动脉造影深度学习架构的密集段分类基准｜arXiv cs.AI">3</a>
- **基于的数据库操作智能体的生产级基准**：该论文提出了 DBA-Bench 基准，旨在评估基于 LLM 的数据库操作智能体，通过模拟生产环境中的多轮读写交互、大规模时序日志诊断等场景，填补了评估与生产操作之间的差距。 <a class="cite" href="https://arxiv.org/abs/2607.22165" target="_blank" rel="noopener noreferrer" data-cite="4. DBA-Bench: 基于LLM的数据库操作智能体的生产级基准｜arXiv cs.AI">4</a>
- **学习结构收敛：时间推理的神经符号基准**：该论文提出了 TRACTA 基准，这是一个受控的合成基准，用于评估高复杂度事件驱动系统中的时间结构推理能力，通过多域操作场景进行实例化。 <a class="cite" href="https://arxiv.org/abs/2607.22365" target="_blank" rel="noopener noreferrer" data-cite="5. 学习结构收敛：时间推理的神经符号基准｜arXiv cs.AI">5</a>
- **反编译二进制函数命名中逆向工**：该论文提出了 REFORGE 方法，用于评估 LLM 在反编译二进制函数命名方面的逆向工程能力，解决了现有基准中函数级真值构建被视为已解决步骤的问题。 <a class="cite" href="https://arxiv.org/abs/2607.07738" target="_blank" rel="noopener noreferrer" data-cite="6. REFORGE: 反编译二进制函数命名中LLM逆向工程能力的基准方法｜arXiv cs.AI">6</a>
- **从文本中进行模式诱导和融合的**：该论文提出了 SCOPE 基准和可审计的参考管道，用于从文本中诱导和融合模式图，解决了模式图是信息抽取和知识图谱构建上游瓶颈的问题。 <a class="cite" href="https://arxiv.org/abs/2607.21610" target="_blank" rel="noopener noreferrer" data-cite="7. SCOPE and SCION: 从文本中进行模式诱导和融合的基准与可审计参考管道｜arXiv cs.AI">7</a>
- **一只手看着另一只手**：该论文提出了动态多智能体合作策略，用于在动态环境中实现双臂操作的样本高效学习，通过建模相对于环境参考帧的动作来解决因果假设失效的问题。 <a class="cite" href="https://arxiv.org/abs/2607.22119" target="_blank" rel="noopener noreferrer" data-cite="8. 一只手看着另一只手：动态环境中双臂操作的样本高效动态多智能体合作｜arXiv cs.AI">8</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://36kr.com/p/3915049412875392" target="_blank" rel="noopener noreferrer">Kimi K3 一开源，Anthropic 终于不装了｜36Kr AI</a>
- <span id="ref-2">2.</span> <a href="https://simonwillison.net/2026/Jul/27/kimi-k3/#atom-everything" target="_blank" rel="noopener noreferrer">社区来源重点更新｜Simon Willison&#39;s W…</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2607.22139" target="_blank" rel="noopener noreferrer">CARDIAG: 冠状动脉造影深度学习架构的密集段分类基准｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2607.22165" target="_blank" rel="noopener noreferrer">DBA-Bench: 基于LLM的数据库操作智能体的生产级基准｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2607.22365" target="_blank" rel="noopener noreferrer">学习结构收敛：时间推理的神经符号基准｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2607.07738" target="_blank" rel="noopener noreferrer">REFORGE: 反编译二进制函数命名中LLM逆向工程能力的基准方法｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://arxiv.org/abs/2607.21610" target="_blank" rel="noopener noreferrer">SCOPE and SCION: 从文本中进行模式诱导和融合的基准与可审计参考管道｜arXiv cs.AI</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2607.22119" target="_blank" rel="noopener noreferrer">一只手看着另一只手：动态环境中双臂操作的样本高效动态多智能体合作｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://36kr.com/p/3914871510914178" target="_blank" rel="noopener noreferrer">普通人跑不起K3，Kimi 开源，Anthropic微妙表态：从未主张禁止开放权重模型｜36Kr AI</a>
- <span id="ref-10">10.</span> <a href="https://36kr.com/p/3915064709141638" target="_blank" rel="noopener noreferrer">汤臣倍健，悄悄投了AI半壁江山｜36Kr AI</a>
- <span id="ref-11">11.</span> <a href="https://www.leiphone.com/category/ai/z5MDzpTPInNSRTkt.html" target="_blank" rel="noopener noreferrer">Kimi K3 发布 47 页技术报告，最有价值的创新点是这些｜雷锋网 AI</a>
- <span id="ref-12">12.</span> <a href="https://news.aibase.com/zh/news/29950" target="_blank" rel="noopener noreferrer">阿里Qoder上线实时语音智能体Qoder Voice，支持语音驱动AI编程阿里AI编程助手Qoder发布语音智能体Qoder Voice，由全双工模型Qwen…｜AIBase</a>
- <span id="ref-13">13.</span> <a href="https://news.aibase.com/zh/news/29942" target="_blank" rel="noopener noreferrer">Kimi K3 开源首夜至少 18 家美国企业火速部署Kimi K3权重昨夜在Hugging Face开源后，讽刺一幕立即上演：尽管美国政府与Anthropic…｜AIBase</a>
- <span id="ref-14">14.</span> <a href="https://news.aibase.com/zh/news/29952" target="_blank" rel="noopener noreferrer">火山引擎上线豆包搜索服务，为AI Agent提供可信联网检索能力近日，火山引擎上线豆包搜索服务，面向企业开发者提供跨语言、多模态、多垂类联网搜索，为AI Age…｜AIBase</a>
- <span id="ref-15">15.</span> <a href="https://aitntnews.com/newDetail.html?newId=27705" target="_blank" rel="noopener noreferrer">离开字节、商汤之后，他用i Lands给AI创造一个真实世界｜AITNT 资讯</a>
- <span id="ref-16">16.</span> <a href="https://huggingface.co/posts/HannesVonEssen/951071884443938" target="_blank" rel="noopener noreferrer">Kimi K3 登陆 HF Viewer！附896位专家深度分析｜Hugging Face 社区</a>
