---
title: "AI晚报 · 04.19 周日"
date: 2026-04-19 20:16:34
description: "今日主线：\n- Kimi团队提出PrFaaS范式实现KV Cache跨数据中心调度"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：125 条

> 主线：Kimi团队提出PrFaaS范式实现KV Cache跨数据中心调度，Claude Opus 4.7发布并强化工具调用能力，OpenAI高管离职与人事风波持续发酵，Cerebras启动IPO且OpenAI加大对其算力投入。

## 重点资讯

### 01 · AI芯片独角兽Cerebras启动IPO

Cerebras Systems正式提交IPO申请，股票代码为CBRS。该公司已实现扭亏为盈，2025年净利润达2.38亿美元。其第三代AI芯片WSE-3集成了90万个计算核心，性能远超英伟达B200。与此同时，OpenAI与Cerebras达成新协议，承诺未来三年支付超200亿美元购买其服务器算力，并可能获得高达10%的股权。这被视为Cerebras冲击上市的核心支撑。OpenAI的巨额订单为Cerebras的上市之路提供了强劲动力。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27226" target="_blank" rel="noopener noreferrer" data-cite="1. Open AI斥资逾 200 亿美元押注Cerebras，或获高达10%股权Op…｜AIBase">1</a>、<a class="cite" href="https://techcrunch.com/2026/04/18/ai-chip-startup-cerebras-files-for-ipo/" target="_blank" rel="noopener noreferrer" data-cite="2. AI 芯片初创公司 Cerebras 申请 IPO｜TechCrunch AI">2</a>、<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24204" target="_blank" rel="noopener noreferrer" data-cite="3. 2386亿，史上最大AI芯片要IPO了！｜AITNT 资讯">3</a>

### 02 · OpenAI高管接连离职

OpenAI在冲刺IPO的关键节点遭遇人事动荡。Sora项目核心负责人Bill Peebles宣布离职，并感谢了团队与萨姆·奥尔特曼营造的科研环境。此前，负责构建科学家AI工作空间的Prism项目首席产品官Kevin Weil也已离职，其部门被拆解至其他研究团队。此外，萨姆·奥尔特曼试图推动OpenAI为其个人押注的核聚变和太空项目提供支持，引发了关于个人利益冲突的质疑。高管离职与利益冲突传闻叠加，给OpenAI的上市进程蒙上阴影。

参考：<a class="cite" href="https://36kr.com/p/3771701475394308" target="_blank" rel="noopener noreferrer" data-cite="7. 突发：Open AI连失大将，Sora之父离职，IPO前夜风波不断｜36Kr AI">7</a>、<a class="cite" href="https://www.wired.com/story/openai-executive-kevin-weil-is-leaving-the-company/" target="_blank" rel="noopener noreferrer" data-cite="8. Open AI 高管 Kevin Weil 离职｜WIRED AI">8</a>

### 03 · Meta近9个月连续挖角Thinking Machines Lab

Meta对Thinking Machines Lab的“全规模突袭”仍在继续。近9个月内，Meta已成功挖走该公司的五位创始成员，包括联合创始人Andrew Tulloch和资深软件工程师Joshua Gross。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27227" target="_blank" rel="noopener noreferrer" data-cite="4. Meta持续挖角AI初创公司，Thinking Machines再失核心成员Me…｜AIBase">4</a>、<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24219" target="_blank" rel="noopener noreferrer" data-cite="5. 小扎拆骨Thinking Machines！120亿美元AI独角兽第5位创始人跳…｜AITNT 资讯">5</a>

## 其他快讯

- **01 · Anthropic安全研究员Mrinank Sharma离职，直言在将价值观落实为行动方面面临困难。**：Anthropic安全研究员Mrinank Sharma在离职信中写道“世界正陷入危机”。他曾在Anthropic从事模型内部透明性机制研究，但表示在职期间面临将自身价值观落实为行动的困难。此前，Anthropic曾发布性能极高的Claude Mythos模型，引发了关于其潜在风险的讨论。（参考：<a class="cite" href="https://36kr.com/p/3773021416538880" target="_blank" rel="noopener noreferrer" data-cite="6. 安全专家纷纷离职，谁为AI竞赛踩刹车｜36Kr AI">6</a>）
- **02 · Kimi提出PrFaaS范式**：月之暗面与清华大学团队联合推出Prefill-as-a-Service（PrFaaS）新范式，核心突破在于允许KV Cache跨数据中心传输，将Prefill和Decode彻底解耦至不同异构集群。该架构支持跨城市、跨地域调度，在长文本场景下优势显著。（参考：<a class="cite" href="https://www.qbitai.com/2026/04/403528.html" target="_blank" rel="noopener noreferrer" data-cite="11. Kimi新论文：把KVCache玩成新商业模式了｜量子位">11</a>）
- **03 · 智元机器人发布六大AI模型及AIMA全栈生态技术体系，定位为具身智能平台。**：智元机器人在合作伙伴大会上宣布推出六大AI模型和七大生产力解决方案，并首次公开AIMA（AI Machine Architecture）全栈生态技术体系。该体系与硬件机器人共同构成“一体三智”架构，涵盖运动智能、交互智能和作业智能。智元旨在通过软件平台孵化机器人大脑，推动具身智能的开放生态发展。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24215" target="_blank" rel="noopener noreferrer" data-cite="10. 智元机器人，要做AI大模型平台和开放生态｜AITNT 资讯">10</a>）
- **04 · 游戏行业呈现“边骂边用”的矛盾心态，AI工具使用率上升但从业者对就业前景感到焦虑。**：GDC 2026报告显示，超过28%的游戏从业者经历过裁员，74%的学生对就业前景感到焦虑。尽管超过一半的开发者对AI进入游戏开发持负面态度，但AI工具的实际使用率却在持续走高。这揭示了行业结构性错配：AI让单人生产力质变，但岗位需求却在收缩，行业急需能驾驭新工具的复合型人才。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24216" target="_blank" rel="noopener noreferrer" data-cite="9. 游戏行业不缺AI工具，缺什么？腾讯游戏用一场大赛给出答案｜AITNT 资讯">9</a>）

## 核心论文

（当日无优质论文）

## 参考来源

- <span id="ref-1">1.</span> <a href="https://news.aibase.com/zh/news/27226" target="_blank" rel="noopener noreferrer">Open AI斥资逾 200 亿美元押注Cerebras，或获高达10%股权Op…｜AIBase</a>
- <span id="ref-2">2.</span> <a href="https://techcrunch.com/2026/04/18/ai-chip-startup-cerebras-files-for-ipo/" target="_blank" rel="noopener noreferrer">AI 芯片初创公司 Cerebras 申请 IPO｜TechCrunch AI</a>
- <span id="ref-3">3.</span> <a href="https://aitntnews.com/newDetail.html?newId=24204" target="_blank" rel="noopener noreferrer">2386亿，史上最大AI芯片要IPO了！｜AITNT 资讯</a>
- <span id="ref-4">4.</span> <a href="https://news.aibase.com/zh/news/27227" target="_blank" rel="noopener noreferrer">Meta持续挖角AI初创公司，Thinking Machines再失核心成员Me…｜AIBase</a>
- <span id="ref-5">5.</span> <a href="https://aitntnews.com/newDetail.html?newId=24219" target="_blank" rel="noopener noreferrer">小扎拆骨Thinking Machines！120亿美元AI独角兽第5位创始人跳…｜AITNT 资讯</a>
- <span id="ref-6">6.</span> <a href="https://36kr.com/p/3773021416538880" target="_blank" rel="noopener noreferrer">安全专家纷纷离职，谁为AI竞赛踩刹车｜36Kr AI</a>
- <span id="ref-7">7.</span> <a href="https://36kr.com/p/3771701475394308" target="_blank" rel="noopener noreferrer">突发：Open AI连失大将，Sora之父离职，IPO前夜风波不断｜36Kr AI</a>
- <span id="ref-8">8.</span> <a href="https://www.wired.com/story/openai-executive-kevin-weil-is-leaving-the-company/" target="_blank" rel="noopener noreferrer">Open AI 高管 Kevin Weil 离职｜WIRED AI</a>
- <span id="ref-9">9.</span> <a href="https://aitntnews.com/newDetail.html?newId=24216" target="_blank" rel="noopener noreferrer">游戏行业不缺AI工具，缺什么？腾讯游戏用一场大赛给出答案｜AITNT 资讯</a>
- <span id="ref-10">10.</span> <a href="https://aitntnews.com/newDetail.html?newId=24215" target="_blank" rel="noopener noreferrer">智元机器人，要做AI大模型平台和开放生态｜AITNT 资讯</a>
- <span id="ref-11">11.</span> <a href="https://www.qbitai.com/2026/04/403528.html" target="_blank" rel="noopener noreferrer">Kimi新论文：把KVCache玩成新商业模式了｜量子位</a>
