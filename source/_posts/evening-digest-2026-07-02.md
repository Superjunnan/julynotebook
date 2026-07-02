---
title: "AI晚报 · 07.02 周四"
date: 2026-07-02 21:27:45
description: "今日主线：\n- 7月2日，AI行业聚焦于模型成本优化\n- OpenAI通过KV cache优化大幅降低推理成本\n- 同时，Anthropic Fable 5上线引发定价争议"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：7月2日，AI行业聚焦于模型成本优化、智能体生态建设与资本动态。OpenAI通过KV cache优化大幅降低推理成本，昆仑万维与xAI分别推出Agent协作与语音智能体新功能，AReaL 2.0开源为Agent提供持续学习能力。同时，Anthropic Fable 5上线引发定价争议，Meta入局云服务搅动市场，可灵AI融资传闻再起。

## 重点资讯

### 01 · 昆仑万维天工3.2推出Skywork Tags，让AI智能体无缝融入现有办公群组。

昆仑万维发布天工3.2版本，推出Skywork Tags功能，针对频繁切换窗口搬运数据导致效率下降的痛点。其核心逻辑是不改变团队既有协作流程，直接将AI智能体接入Slack、飞书、钉钉、Discord、Telegram等现有办公群组，让智能体无缝融入工作场景。在实际应用测试中，Skywork Tags的表现超出了预期，昆仑万维内部反馈显示，相比于个人深度调教的私有AI助手，这种能够共享团队上下文、经历多轮协作磨合的共享版Agent。

参考：<a class="cite" href="https://news.aibase.com/zh/news/29331" target="_blank" rel="noopener noreferrer" data-cite="7. 拒绝内卷式协作：昆仑万维天工 3.2 推出 Skywork Tags，让 AI 成为工作群里的“靠谱同事”昆仑万维发布天工3.2版，推出Skywork Tags…｜AIBase">7</a>、<a class="cite" href="https://www.qbitai.com/2026/07/442030.html" target="_blank" rel="noopener noreferrer" data-cite="10. 天工 3.2 重磅升级：Skywork Tags 上线，给 Agent 一张工牌，邀其加入你的工作群聊｜量子位">10</a>

### 02 · 可灵AI融资传闻再起，投后估值约180亿美元，腾讯参与本轮融资。

国内AI视频生成领域的战火正愈演愈烈。7月2日，有市场消息传出，快手旗下的AI视频生成平台“可灵AI”即将完成首轮独立融资，融资规模预计达30亿美元，整体估值指向180亿美元。尽管快手官方尚未就此融资细节予以置评，但该消息在业界引发了广泛关注。报道指出，随着中国AI视频生成赛道竞争加剧，可灵AI正在加速推进独立融资和后续上市安排。一位知情人士称，可灵AI最新估值较此前目标有所下调，反映出市场对可灵AI估值预期的变化。

参考：<a class="cite" href="https://news.aibase.com/zh/news/29339" target="_blank" rel="noopener noreferrer" data-cite="8. 可灵AI 融资传闻再起：180 亿美元估值背后的资本博弈快手旗下AI视频生成平台“可灵AI”被传即将完成首轮独立融资，规模达30亿美元，投后估值约180亿美元。…｜AIBase">8</a>、<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26770" target="_blank" rel="noopener noreferrer" data-cite="9. 203.8亿！AI视频最大单笔融资，即将诞生｜AITNT 资讯">9</a>

### 03 · AReaL 2.0开源，为Agent提供在线强化学习基础设施，实现持续进化。

7月2日，开源强化学习基础设施项目AReaL正式发布2.0版本。AReaL旨在打通基础模型训练与现代智能体应用之间的链路，为Agent应用场景提供高效的强化学习训练支撑。此次发布的AReaL 2.0版本面向已经进入真实业务场景的Agent，提供了一套让Agent在使用中持续学习的系统基础设施。通过AReaL 2.0，Agent在完成真实任务时产生的交互过程，可以被记录、整理，并接入后续训练流程，用于持续优化底层模型。

参考：<a class="cite" href="https://news.aibase.com/zh/news/29342" target="_blank" rel="noopener noreferrer" data-cite="6. 让Agent越用越强:ARea L2.0开源，打造面向自演进智能体的RL基础设施7月2日，开源强化学习基础设施项目ARea L发布2.0版，旨在打通基础模型训练…｜AIBase">6</a>、<a class="cite" href="https://www.qbitai.com/2026/07/442134.html" target="_blank" rel="noopener noreferrer" data-cite="11. 让Agent越用越强：ARea L 2.0开源，打造面向自演进智能体的RL基础设施｜量子位">11</a>

## 其他快讯

- **01 · OpenAI通过KV cache优化将推理成本砍掉一半以上，大幅降低算力需求。**：OpenAI正准备走DeepSeek走过的老路，通过新的系统优化方案将模型推理成本砍掉一半以上。外媒报道称，过去几万张GPU才能满足的需求，现在几百张就足够了。OpenAI从很久之前就在想办法降低推理成本，虽然未公开具体技术细节，但知情人士称优化方向主要来自于KV cache上的优化。（参考：<a class="cite" href="https://36kr.com/p/3878306748971650" target="_blank" rel="noopener noreferrer" data-cite="12. 推理成本砍掉一半以上，OpenAI摸着DeepSeek过河｜36Kr AI">12</a>）
- **02 · Anthropic Fable 5全球上线，价格昂贵且消耗额度更快，引发用户争议。**：Anthropic官宣Claude Fable 5全球上线，部分包含使用额度的付费用户可以在7月7日前访问Fable 5。Anthropic明确表示，Claude Fable 5相比其他Claude模型的消耗额度更快。Claude Fable 5价格为10美元/每百万输入token，50美元/每百万输出token。（参考：<a class="cite" href="https://36kr.com/p/3878184169402376" target="_blank" rel="noopener noreferrer" data-cite="5. 用户太蠢不配用 Fable？被Anthropic的回应气笑了：最贵的模型，最憋屈的体验｜36Kr AI">5</a>）
- **03 · 阿里巴巴深度整合Agent产品线，基于Qoder Work融合悟空与Mule Run。**：阿里巴巴正在对旗下的Agent（智能体）产品线进行新一轮的深度整合。据悉，阿里巴巴将以QoderWork为基础，全面融合悟空与MuleRun的核心能力，通过整合升级，打造一款面向企业生产力场景、功能更为强大的全新AI产品。（参考：<a class="cite" href="https://news.aibase.com/zh/news/29337" target="_blank" rel="noopener noreferrer" data-cite="14. 无缝升级!阿里打包升级Qoder Work等多款AI工具，聚焦企业核心场景阿里巴巴深度整合Agent产品线，基于Qoder Work融合悟空、Mule Run，…｜AIBase">14</a>）
- **04 · Base44推出自研氛围编程模型Base1，旨在降低对Anthropic等外部API依赖。**：Base44是一家vibe-coding平台，一年前被Wix以8000万美元收购。如今，Base44开始推出自己的AI模型，帮助用户通过自然语言创建应用。虽然其自研LLM才刚刚开始推出，但Base44希望它最终能够在特定场景中超越前沿模型。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26795" target="_blank" rel="noopener noreferrer" data-cite="13. 速递｜Base44推出自研氛围编程模型Base1，降低对Anthropic等外部API依赖，降低推理成本｜AITNT 资讯">13</a>）
- **05 · x AI发布Voice Agent Builder测试版，两分钟内即可搭建生产级语音智能体。**：xAI推出Voice Agent Builder测试版，通过零代码平台和自研Grok Voice模型，将企业级语音智能体搭建缩短至两分钟。该平台依托于xAI自研的Grok Voice模型，提供高度集成的端到端架构，解决了传统方案语音转文字等多环节割裂的痛点。（参考：<a class="cite" href="https://news.aibase.com/zh/news/29332" target="_blank" rel="noopener noreferrer" data-cite="15. 两分钟上手生产级语音智能体：x AI 发布 Voice Agent Builder 测试版x AI推出Voice Agent Builder测试版，通过零代码平…｜AIBase">15</a>）
- **06 · Meta筹建Meta Compute云基础设施业务，直接抢夺AWS等云服务商饭碗。**：Meta正在筹建一项名为“Meta Compute”的云基础设施业务，对外出售AI算力和模型访问权限。消息一出，资本市场反应剧烈，Meta股价一度跳涨10多点，而专门靠卖算力吃饭的CoreWeave暴跌14%，Nebius崩了17%。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26788" target="_blank" rel="noopener noreferrer" data-cite="16. 卷不赢模型，Meta改行「算力包租公」！一夜炸崩美股AI链｜AITNT 资讯">16</a>）

## 核心论文

- **智能体记忆中的谄媚现象基准测试**：该论文提出了MemSyco-Bench基准，用于评估智能体记忆中的“谄媚”现象，即智能体为了迎合用户而牺牲事实准确性的问题。 <a class="cite" href="https://arxiv.org/abs/2607.01071" target="_blank" rel="noopener noreferrer" data-cite="2. Mem Syco-Bench：智能体记忆中的谄媚现象基准测试｜arXiv cs.AI">2</a>
- **多智能体场景中的自我中心动作**：该论文引入EgoGapBench基准，旨在隔离并测量多智能体场景中的自我中心视角理解能力，特别是当第一人称身体线索缺失时。 <a class="cite" href="https://arxiv.org/abs/2607.00547" target="_blank" rel="noopener noreferrer" data-cite="3. Ego Gap Bench：多智能体场景中的自我中心动作选择基准测试｜arXiv cs.AI">3</a>
- **技能不是孤岛**：该论文提出Agent Skill Supply Chains（ASSCs）概念，用于表征混合技能包-服务依赖图，解决智能体技能供应链中的依赖管理和风险问题。 <a class="cite" href="https://arxiv.org/abs/2607.01136" target="_blank" rel="noopener noreferrer" data-cite="1. 技能不是孤岛：测量智能体技能供应链中的依赖与风险｜arXiv cs.AI">1</a>
- **多智能体代码协同合成的代理预**：该论文提出AI-Atomic-Framework（ATM），为软件代理提供基于规范的治理基础，解决多智能体代码协同合成中的并发写入意图管理问题。 <a class="cite" href="https://arxiv.org/abs/2607.00041" target="_blank" rel="noopener noreferrer" data-cite="4. ATM：多智能体代码协同合成的CID代理预写入准入机制｜arXiv cs.AI">4</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2607.01136" target="_blank" rel="noopener noreferrer">技能不是孤岛：测量智能体技能供应链中的依赖与风险｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2607.01071" target="_blank" rel="noopener noreferrer">Mem Syco-Bench：智能体记忆中的谄媚现象基准测试｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2607.00547" target="_blank" rel="noopener noreferrer">Ego Gap Bench：多智能体场景中的自我中心动作选择基准测试｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2607.00041" target="_blank" rel="noopener noreferrer">ATM：多智能体代码协同合成的CID代理预写入准入机制｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://36kr.com/p/3878184169402376" target="_blank" rel="noopener noreferrer">用户太蠢不配用 Fable？被Anthropic的回应气笑了：最贵的模型，最憋屈的体验｜36Kr AI</a>
- <span id="ref-6">6.</span> <a href="https://news.aibase.com/zh/news/29342" target="_blank" rel="noopener noreferrer">让Agent越用越强:ARea L2.0开源，打造面向自演进智能体的RL基础设施7月2日，开源强化学习基础设施项目ARea L发布2.0版，旨在打通基础模型训练…｜AIBase</a>
- <span id="ref-7">7.</span> <a href="https://news.aibase.com/zh/news/29331" target="_blank" rel="noopener noreferrer">拒绝内卷式协作：昆仑万维天工 3.2 推出 Skywork Tags，让 AI 成为工作群里的“靠谱同事”昆仑万维发布天工3.2版，推出Skywork Tags…｜AIBase</a>
- <span id="ref-8">8.</span> <a href="https://news.aibase.com/zh/news/29339" target="_blank" rel="noopener noreferrer">可灵AI 融资传闻再起：180 亿美元估值背后的资本博弈快手旗下AI视频生成平台“可灵AI”被传即将完成首轮独立融资，规模达30亿美元，投后估值约180亿美元。…｜AIBase</a>
- <span id="ref-9">9.</span> <a href="https://aitntnews.com/newDetail.html?newId=26770" target="_blank" rel="noopener noreferrer">203.8亿！AI视频最大单笔融资，即将诞生｜AITNT 资讯</a>
- <span id="ref-10">10.</span> <a href="https://www.qbitai.com/2026/07/442030.html" target="_blank" rel="noopener noreferrer">天工 3.2 重磅升级：Skywork Tags 上线，给 Agent 一张工牌，邀其加入你的工作群聊｜量子位</a>
- <span id="ref-11">11.</span> <a href="https://www.qbitai.com/2026/07/442134.html" target="_blank" rel="noopener noreferrer">让Agent越用越强：ARea L 2.0开源，打造面向自演进智能体的RL基础设施｜量子位</a>
- <span id="ref-12">12.</span> <a href="https://36kr.com/p/3878306748971650" target="_blank" rel="noopener noreferrer">推理成本砍掉一半以上，OpenAI摸着DeepSeek过河｜36Kr AI</a>
- <span id="ref-13">13.</span> <a href="https://aitntnews.com/newDetail.html?newId=26795" target="_blank" rel="noopener noreferrer">速递｜Base44推出自研氛围编程模型Base1，降低对Anthropic等外部API依赖，降低推理成本｜AITNT 资讯</a>
- <span id="ref-14">14.</span> <a href="https://news.aibase.com/zh/news/29337" target="_blank" rel="noopener noreferrer">无缝升级!阿里打包升级Qoder Work等多款AI工具，聚焦企业核心场景阿里巴巴深度整合Agent产品线，基于Qoder Work融合悟空、Mule Run，…｜AIBase</a>
- <span id="ref-15">15.</span> <a href="https://news.aibase.com/zh/news/29332" target="_blank" rel="noopener noreferrer">两分钟上手生产级语音智能体：x AI 发布 Voice Agent Builder 测试版x AI推出Voice Agent Builder测试版，通过零代码平…｜AIBase</a>
- <span id="ref-16">16.</span> <a href="https://aitntnews.com/newDetail.html?newId=26788" target="_blank" rel="noopener noreferrer">卷不赢模型，Meta改行「算力包租公」！一夜炸崩美股AI链｜AITNT 资讯</a>
