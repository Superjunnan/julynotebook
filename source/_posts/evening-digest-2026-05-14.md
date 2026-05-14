---
title: "AI晚报 · 05.14 周四"
date: 2026-05-14 22:28:39
description: "今日主线：\n- 5月14日AI行业焦点集中在企业级竞争格局变化\n- Anthropic在企业端超越OpenAI引发行业震动"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：5月14日AI行业焦点集中在企业级竞争格局变化、供应链安全事件及Agent技术突破。Anthropic在企业端超越OpenAI引发行业震动，OpenAI回应TanStack供应链攻击，腾讯开源Agent记忆技术，MiniMax推出多智能体协作功能，同时百度提出DAA新度量衡。

## 重点资讯

### 01 · Anthropic企业采用率34.4%超越OpenAI 32.3%

根据Ramp发布的2026年5月AI指数，Anthropic在工作场所的采用率达到34.4%，首次超越OpenAI的32.3%。这一数据基于5万多家企业的真实支出记录，显示Anthropic在过去一年中企业采用率增长了近4倍，而OpenAI仅增长0.3%。Anthropic在金融、科技、专业服务等高采用行业已处于领先地位，而OpenAI的优势正在这些领域缩减。这一变化标志着AI大模型之战在企业端市场发生了颠覆性转折。

参考：<a class="cite" href="https://36kr.com/p/3808752266895111" target="_blank" rel="noopener noreferrer" data-cite="1. 奥特曼急了，OpenAI稳坐三年的王座，刚刚被Anthropic踹下去了｜36Kr AI">1</a>、<a class="cite" href="https://techcrunch.com/2026/05/13/anthropic-now-has-more-business-customers-than-openai-according-to-ramp-data/" target="_blank" rel="noopener noreferrer" data-cite="2. 据 Ramp 数据，Anthropic 商业客户数已超 OpenAI｜TechCrunch AI">2</a>

### 02 · OpenAI确认TanStack供应链攻击未泄露数据，提醒macOS用户限期更新。

OpenAI针对近期发生的“Mini Shai-Hulud”供应链攻击事件发布声明，该攻击涉及多个npm软件包。OpenAI安全团队迅速排查内部系统，确认未发现用户数据泄露或非法访问，核心服务未受影响。作为预防措施，OpenAI提醒所有使用其官方应用程序的macOS用户，在2026年6月12日之前务必进行软件更新。此次事件再次凸显了开源软件供应链安全的重要性。供应链攻击风险持续上升，企业需加强第三方依赖项的监控与管理。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27994" target="_blank" rel="noopener noreferrer" data-cite="3. OpenAI 澄清供应链攻击：用户数据未受影响，mac OS 用户请及时更新！OpenAI针对近期发生的“Mini Shai-Hulud”供应链攻击事件发布声明…｜AIBase">3</a>、<a class="cite" href="https://news.aibase.com/zh/news/27987" target="_blank" rel="noopener noreferrer" data-cite="4. OpenAI 回应 Tan Stack 供应链攻击：未发现用户数据泄露OpenAI 就5月14日发生的“Mini Shai-Hulud”供应链攻击发布声明。安全…｜AIBase">4</a>、<a class="cite" href="https://news.aibase.com/zh/news/27985" target="_blank" rel="noopener noreferrer" data-cite="5. OpenAI 确认：Tan Stack 供应链攻击未泄露用户数据，mac OS 用户请及时更新！OpenAI于5月14日就“Mini Shai-Hulud”供应…｜AIBase">5</a>、<a class="cite" href="https://openai.com/index/our-response-to-the-tanstack-npm-supply-chain-attack" target="_blank" rel="noopener noreferrer" data-cite="6. 针对 Tan Stack npm 供应链攻击的回应｜OpenAI News">6</a>

### 03 · 腾讯Q1营收1965亿，AI产品产生约88亿元经营亏损。

腾讯控股2026年第一季度财报显示，总营收为1964.58亿元，同比增长9%。值得注意的是，若剔除新AI产品，其非国际财务报告准则经营盈利为844亿元，而包含AI产品后为756亿元，表明这些新AI产品在当季产生了约88亿元的经营亏损。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25060" target="_blank" rel="noopener noreferrer" data-cite="13. 腾讯Q1收入1965亿！马化腾：一年前上的AI船漏水了，乱抢地盘会失败｜AITNT 资讯">13</a>

## 其他快讯

- **01 · Mini Max Agent更名为Mavis**：5月13日，MiniMax正式宣布旗下Agent产品全面升级，更名为Mavis，并推出核心功能Agent Teams。该功能允许用户同时召唤一组拥有不同角色分工的AI智能体，让它们并行工作、各司其职。MiniMax指出单个Agent在实际使用中存在缺乏协同能力、功能过于分散、使用成本偏高等短板。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27990" target="_blank" rel="noopener noreferrer" data-cite="15. Mini Max Agent 正式更名 Mavis 上线多智能体协作Mini Max于5月13日升级其AI Agent产品，更名为Mavis，并推出核心功能Ag…｜AIBase">15</a>）
- **02 · Kimi K2.6 Agent可生成完整网站，包含前端、后端及独立数据库。**：在Kimi K2.6的Agent模式中，用户只需输入需求，5分钟后即可获得一个真实可访问的URL，包含前端、后端、独立数据库和用户账号体系。Kimi实际上接管了用户从开发到托管、再到数据库运维的全生命周期。这种“人手一个数据库”的配置对工程算力提出了巨大挑战，尤其是在成本、规模与性能的“不可能三角”中。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25098" target="_blank" rel="noopener noreferrer" data-cite="16. 人手一个数据库，Kimi背后这套AI基建到底有多能扛？｜AITNT 资讯">16</a>）
- **03 · 百度秒哒上线APP版，用户可在手机上直接生成可安装的APP。**：在百度Create 2026开发者大会上，百度秒哒上线了APP版。用户不仅可以在手机上生成网页和小程序，甚至可以直接生成一个可以在手机上安装的安装包。这些生成的应用集成了后端和数据库，不需要用户操心底层运维。秒哒作为一个能帮助开发产品的Agent产品，对国内生态友好，适合绝大多数普通人上手。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25080" target="_blank" rel="noopener noreferrer" data-cite="17. 现在，你可以在手机上用AI生成一个APP了。｜AITNT 资讯">17</a>）
- **04 · 腾讯开源Agent记忆技术，Token消耗最高降低61%，任务成功率提升51%。**：5月14日，腾讯正式面向全球开源TencentDB Agent Memory，针对Agent长任务场景提供长期和短期记忆压缩能力。该方案支持OpenClaw、Hermes等主流Agent框架一键部署。在多任务连续Session实验中，该方案最高可降低61%的Token消耗，并将任务成功率最高提升51%。（参考：<a class="cite" href="https://www.qbitai.com/2026/05/417753.html" target="_blank" rel="noopener noreferrer" data-cite="18. 腾讯开源 Agent 记忆技术方案，Token 消耗最高降低 61%｜量子位">18</a>）
- **05 · 豆包AI因承诺退票费未兑现被用户起诉，AI幻觉责任问题引发讨论。**：一位网友询问豆包退票手续费标准，AI信誓旦旦地回答“只有5%”，但实际退票费高达40%。该网友将怒火转向豆包，而豆包不仅未安抚，反而“怂恿”其起诉自己。最终该网友将豆包告上法庭。此事引发全网讨论，关于AI到底该不该为自己的“胡说八道”负责成为焦点。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25070" target="_blank" rel="noopener noreferrer" data-cite="20. 豆包 AI 因承诺承担机票退票费未兑现，被用户起诉至北京互联网法院‌｜AITNT 资讯">20</a>）
- **06 · 百度提出DAA（日活智能体数）概念，称其比Token更接近AI本质。**：在2026年5月13日的百度Create 2026开发者大会上，李彦宏提出了DAA（Daily Active Agents）概念。他认为Token只代表成本，不代表收益，而DAA衡量的是有多少Agent在给人类干活并交付结果。（参考：<a class="cite" href="https://36kr.com/p/3808694057066499" target="_blank" rel="noopener noreferrer" data-cite="14. DAA是什么？李彦宏说它是AI时代的新度量衡，比Token更接近本质｜36Kr AI">14</a>）
- **07 · 明势创投黄明明认为AI时代仍需寻找“让人汗毛直竖”的创业者。**：明势创投创始人黄明明表示，在AI时代，投资的关键在于找到坚持第一性原理、对自己所做之事始终抱有信仰的创业者。他回顾了在新能源时代押中理想汽车，在AI时代投出MiniMax的经历，认为这种筛选标准可以总结为寻找“让人汗毛直竖的人”。他强调，世界大部分时候奖励的是共识，而非非共识。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25089" target="_blank" rel="noopener noreferrer" data-cite="19. 投中了理想、Mini Max 后，他说，AI 时代仍然要找「让人汗毛直竖」的创业者｜AITNT 资讯">19</a>）

## 核心论文

- **关于自主交易系统深思熟虑多智**：该论文提出了一种无需离线训练或人工干预的自主交易框架，通过多个专业大语言模型智能体进行推理、协商和协同行动。 <a class="cite" href="https://arxiv.org/abs/2605.12532" target="_blank" rel="noopener noreferrer" data-cite="7. Agentic AITA: 关于自主交易系统深思熟虑多智能体推理的概念验证｜arXiv cs.AI">7</a>
- **工作流何时发布？黑盒生成验证**：论文针对LLM工作流中的迭代生成-评估-修订循环，提出了一个始终有效的发布包装器，解决了部署时评估器分数自适应生成带来的统计挑战。 <a class="cite" href="https://arxiv.org/abs/2605.12947" target="_blank" rel="noopener noreferrer" data-cite="8. AI工作流何时发布？黑盒生成验证系统的始终有效推理｜arXiv cs.AI">8</a>
- **增强生成的多智能体强化学习训练**：该研究针对现有API驱动的Agent系统在工业实践中的错位问题，提出了基于强化学习的多智能体训练方法，以增强RTL代码生成能力。 <a class="cite" href="https://arxiv.org/abs/2605.12857" target="_blank" rel="noopener noreferrer" data-cite="9. Chip MATE: 增强RTL生成的多智能体强化学习训练｜arXiv cs.AI">9</a>
- **使用系统性审计 基准**：论文通过BenchJack工具系统性地审计AI Agent基准，提出了八种重复出现的缺陷模式，并编译成Agent-Eval检查清单，强调基准必须安全设计。 <a class="cite" href="https://arxiv.org/abs/2605.12673" target="_blank" rel="noopener noreferrer" data-cite="10. Androids Dream of Breaking the Game? 使用Bench Jack系统性审计AI Agent基准｜arXiv cs.AI">10</a>
- **用于跨方法论创新分析与专利权**：该框架利用知识图谱支持多智能体系统进行跨方法论创新分析和专利权利要求生成。 <a class="cite" href="https://arxiv.org/abs/2605.13311" target="_blank" rel="noopener noreferrer" data-cite="11. Idea Forge: 用于跨方法论创新分析与专利权利要求生成的知识图谱驱动多智能体框架｜arXiv cs.AI">11</a>
- **技能过度特权基准测试**：论文指出大语言模型Agent通过中间技能层操作时，往往超出了用户意图的权限边界，提出了FORTIS基准来衡量这种过度特权行为。 <a class="cite" href="https://arxiv.org/abs/2605.09163" target="_blank" rel="noopener noreferrer" data-cite="12. FORTIS: Agent技能过度特权基准测试｜arXiv cs.AI">12</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://36kr.com/p/3808752266895111" target="_blank" rel="noopener noreferrer">奥特曼急了，OpenAI稳坐三年的王座，刚刚被Anthropic踹下去了｜36Kr AI</a>
- <span id="ref-2">2.</span> <a href="https://techcrunch.com/2026/05/13/anthropic-now-has-more-business-customers-than-openai-according-to-ramp-data/" target="_blank" rel="noopener noreferrer">据 Ramp 数据，Anthropic 商业客户数已超 OpenAI｜TechCrunch AI</a>
- <span id="ref-3">3.</span> <a href="https://news.aibase.com/zh/news/27994" target="_blank" rel="noopener noreferrer">OpenAI 澄清供应链攻击：用户数据未受影响，mac OS 用户请及时更新！OpenAI针对近期发生的“Mini Shai-Hulud”供应链攻击事件发布声明…｜AIBase</a>
- <span id="ref-4">4.</span> <a href="https://news.aibase.com/zh/news/27987" target="_blank" rel="noopener noreferrer">OpenAI 回应 Tan Stack 供应链攻击：未发现用户数据泄露OpenAI 就5月14日发生的“Mini Shai-Hulud”供应链攻击发布声明。安全…｜AIBase</a>
- <span id="ref-5">5.</span> <a href="https://news.aibase.com/zh/news/27985" target="_blank" rel="noopener noreferrer">OpenAI 确认：Tan Stack 供应链攻击未泄露用户数据，mac OS 用户请及时更新！OpenAI于5月14日就“Mini Shai-Hulud”供应…｜AIBase</a>
- <span id="ref-6">6.</span> <a href="https://openai.com/index/our-response-to-the-tanstack-npm-supply-chain-attack" target="_blank" rel="noopener noreferrer">针对 Tan Stack npm 供应链攻击的回应｜OpenAI News</a>
- <span id="ref-7">7.</span> <a href="https://arxiv.org/abs/2605.12532" target="_blank" rel="noopener noreferrer">Agentic AITA: 关于自主交易系统深思熟虑多智能体推理的概念验证｜arXiv cs.AI</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2605.12947" target="_blank" rel="noopener noreferrer">AI工作流何时发布？黑盒生成验证系统的始终有效推理｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://arxiv.org/abs/2605.12857" target="_blank" rel="noopener noreferrer">Chip MATE: 增强RTL生成的多智能体强化学习训练｜arXiv cs.AI</a>
- <span id="ref-10">10.</span> <a href="https://arxiv.org/abs/2605.12673" target="_blank" rel="noopener noreferrer">Androids Dream of Breaking the Game? 使用Bench Jack系统性审计AI Agent基准｜arXiv cs.AI</a>
- <span id="ref-11">11.</span> <a href="https://arxiv.org/abs/2605.13311" target="_blank" rel="noopener noreferrer">Idea Forge: 用于跨方法论创新分析与专利权利要求生成的知识图谱驱动多智能体框架｜arXiv cs.AI</a>
- <span id="ref-12">12.</span> <a href="https://arxiv.org/abs/2605.09163" target="_blank" rel="noopener noreferrer">FORTIS: Agent技能过度特权基准测试｜arXiv cs.AI</a>
- <span id="ref-13">13.</span> <a href="https://aitntnews.com/newDetail.html?newId=25060" target="_blank" rel="noopener noreferrer">腾讯Q1收入1965亿！马化腾：一年前上的AI船漏水了，乱抢地盘会失败｜AITNT 资讯</a>
- <span id="ref-14">14.</span> <a href="https://36kr.com/p/3808694057066499" target="_blank" rel="noopener noreferrer">DAA是什么？李彦宏说它是AI时代的新度量衡，比Token更接近本质｜36Kr AI</a>
- <span id="ref-15">15.</span> <a href="https://news.aibase.com/zh/news/27990" target="_blank" rel="noopener noreferrer">Mini Max Agent 正式更名 Mavis 上线多智能体协作Mini Max于5月13日升级其AI Agent产品，更名为Mavis，并推出核心功能Ag…｜AIBase</a>
- <span id="ref-16">16.</span> <a href="https://aitntnews.com/newDetail.html?newId=25098" target="_blank" rel="noopener noreferrer">人手一个数据库，Kimi背后这套AI基建到底有多能扛？｜AITNT 资讯</a>
- <span id="ref-17">17.</span> <a href="https://aitntnews.com/newDetail.html?newId=25080" target="_blank" rel="noopener noreferrer">现在，你可以在手机上用AI生成一个APP了。｜AITNT 资讯</a>
- <span id="ref-18">18.</span> <a href="https://www.qbitai.com/2026/05/417753.html" target="_blank" rel="noopener noreferrer">腾讯开源 Agent 记忆技术方案，Token 消耗最高降低 61%｜量子位</a>
- <span id="ref-19">19.</span> <a href="https://aitntnews.com/newDetail.html?newId=25089" target="_blank" rel="noopener noreferrer">投中了理想、Mini Max 后，他说，AI 时代仍然要找「让人汗毛直竖」的创业者｜AITNT 资讯</a>
- <span id="ref-20">20.</span> <a href="https://aitntnews.com/newDetail.html?newId=25070" target="_blank" rel="noopener noreferrer">豆包 AI 因承诺承担机票退票费未兑现，被用户起诉至北京互联网法院‌｜AITNT 资讯</a>
