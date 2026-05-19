---
title: "AI晚报 · 05.19 周二"
date: 2026-05-19 22:44:05
description: "今日主线：\n- OpenAI与Anthropic在AI市场收入份额上形成双寡头格局\n- OpenAI推出直连银行账户的个人理财工具\n- Musk诉OpenAI案因诉讼时效被驳回"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：OpenAI与Anthropic在AI市场收入份额上形成双寡头格局，Anthropic反超OpenAI成为营收第一。OpenAI推出直连银行账户的个人理财工具，腾讯云宣布主力AI模型月底结束免费公测。Musk诉OpenAI案因诉讼时效被驳回，但引发了对AI行业领导力的广泛质疑。DeepSeek招聘Agent Harness产品经理，vLLM修复了导致GLM模型崩溃的内存分配Bug。

## 重点资讯

### 01 · Musk诉OpenAI案因诉讼时效被驳回，引发对行业领导力的信任危机。

Musk诉OpenAI案经过两周庭审后，陪审团仅用两小时审议即作出裁决，认为Musk的诉讼已超过法定诉讼时效，其主张被驳回。尽管在法律层面仅因程序问题败诉，但该案暴露了OpenAI与Anthropic在AI行业领导权争夺中的激烈与不信任。Musk宣布将上诉，并称法官和陪审团从未审理案件实质，仅处理了日历技术性问题。法律程序终结，但行业信任危机并未随之消散。

参考：<a class="cite" href="https://www.theverge.com/ai-artificial-intelligence/932464/musk-v-altman-proved-that-ai-is-led-by-the-wrong-people" target="_blank" rel="noopener noreferrer" data-cite="1. 马斯克诉奥特曼案证明AI由错误的人主导｜The Verge AI">1</a>、<a class="cite" href="https://www.technologyreview.com/2026/05/18/1137488/elon-musk-suit-openai-verdict/" target="_blank" rel="noopener noreferrer" data-cite="2. 埃隆·马斯克败诉OpenAI的原因｜MIT Technology Rev…">2</a>、<a class="cite" href="https://www.theverge.com/ai-artificial-intelligence/932383/jury-verdict-musk-v-altman-openai-trial" target="_blank" rel="noopener noreferrer" data-cite="3. 埃隆·马斯克败诉萨姆·奥特曼｜The Verge AI">3</a>

### 02 · Anthropic反超OpenAI，双雄独占89%市场份额。

The Information调查显示，全球34家主流AI公司半年收入增长112%逼近800亿美元，但OpenAI与Anthropic两家巨头占据了约89%的年化营收，市场呈现高度集中。Anthropic增长势头强劲，其年化营收从2025年初的10亿美元飙升至2026年4月的300亿美元以上，正式超越OpenAI的250亿美元，完成了行业戏剧性反杀。OpenAI则依靠ChatGPT的C端用户帝国，月营收达20亿美元。头部效应显著。

参考：<a class="cite" href="https://news.aibase.com/zh/news/28119" target="_blank" rel="noopener noreferrer" data-cite="7. 全球 AI 市场：OpenAI 与 Anthropic 独占 89% 年收入份额调查显示，全球34家主流AI公司年收入逼近800亿美元，半年增长112%。其中，…｜AIBase">7</a>、<a class="cite" href="https://36kr.com/p/3815882846248450" target="_blank" rel="noopener noreferrer" data-cite="11. AI创业一年狂揽800亿美元，Anthropic反杀OpenAI，双雄独吞89%｜36Kr AI">11</a>

### 03 · OpenAI推出个人理财工具，允许Pro用户直连银行账户。

OpenAI向ChatGPT Pro订阅用户推出个人理财工具预览版，允许美国用户通过Plaid平台绑定超过1.2万家金融机构的银行账户。该工具能基于真实数据提供消费习惯分析、长期财务规划及投资组合监控，标志着AI加速介入个人财务管理领域。用户可随时断开连接并清除财务记忆，保障隐私自主权。AI应用场景向高价值金融领域深度拓展。

参考：<a class="cite" href="https://news.aibase.com/zh/news/28116" target="_blank" rel="noopener noreferrer" data-cite="12. ChatGPT化身私人理财管家：OpenAI推出全新金融工具可直连银行账户OpenAI向ChatGPT Pro用户推出个人理财工具预览版，允许美国用户绑定银行账…｜AIBase">12</a>

## 其他快讯

- **01 · 腾讯云两大主力AI模型月底结束免费公测，全面转入商业化运营。**：腾讯云宣布其智能体开发平台的两款核心大模型Hy3preview和DeepSeek-V4-Pro将于2026年5月27日结束免费公测，全面转向按量计费的商业化运营。平台将采用“订阅加增购”模式，提供从免费版到4880元/月的企业版梯度服务，并支持长达12个月的预付费资源包。开发者需及时调整策略以应对新的计费标准。（参考：<a class="cite" href="https://news.aibase.com/zh/news/28134" target="_blank" rel="noopener noreferrer" data-cite="13. 免费公测进入倒计时：腾讯云两大主力AI模型月底转入正式商用腾讯云宣布，其智能体开发平台的两款核心大模型Hy3preview和DeepSeek-V4-Pro将于2…｜AIBase">13</a>）
- **02 · AI购物公司Viba利用计算审美生成个性化穿搭灵感。**：洛杉矶AI公司Viba致力于成为消费链上的需求入口，其产品基于用户城市、社交场景和偏好，用AI生成以用户为主角的穿搭灵感，并自然接入真实商品与本地活动。创始人梁芊荟拥有MIT计算审美研究背景和华为计算摄影经验，团队CTO来自字节搜索推荐体系。Viba瞄准拉美裔和亚裔群体，从洛杉矶切入北美本地社群。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25262" target="_blank" rel="noopener noreferrer" data-cite="14. Z Potentials｜ 梁芊荟，从MIT计算审美到华为计算摄影：一个研究美的建筑师用AI 重写种草逻辑｜AITNT 资讯">14</a>）
- **03 · Cursor新模型Composer 2.5公开使用Kimi模型，马斯克站台支持。**：Cursor发布Composer 2.5新模型，明确表示以Kimi模型打底，自家额外训练和强化学习占85%总算力。此前Cursor陷入“套壳风波”，马斯克此前曾煽风点火，此次却卖力站台，称“都给我去用Cursor新模型”。（参考：<a class="cite" href="https://www.qbitai.com/2026/05/419990.html" target="_blank" rel="noopener noreferrer" data-cite="15. Cursor新模型，你怎么还在套Kimi？马斯克你怎么还吆喝上了？？｜量子位">15</a>）
- **04 · DeepSeek招聘Agent Harness产品经理，强化Agent工程外壳能力。**：DeepSeek最新热招岗位为Agent Harness产品经理，该岗位旨在定义和规划DeepSeek桌面端Agent产品的全过程。DeepSeek将Harness定义为让Agent可靠工作的工程外壳，负责约束、验证、纠错和收敛，公式为Model + Harness = Agent。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=25247" target="_blank" rel="noopener noreferrer" data-cite="16. DeepSeek开招Harness产品经理！「参与Agent桌面端产品全过程」｜AITNT 资讯">16</a>）

## 核心论文

- **一种通过混合结构实现智能体记**：H-Mem提出了一种混合结构的记忆机制，能够有效建模智能体记忆随时间的演变，并提供高效的记忆检索方法，解决了现有方法在记忆利用上的性能瓶颈。 <a class="cite" href="https://arxiv.org/abs/2605.15701" target="_blank" rel="noopener noreferrer" data-cite="4. H-Mem: 一种通过混合结构实现智能体记忆演变与检索的新型记忆机制｜arXiv cs.AI">4</a>
- **可移植、自进化的多智能体系统规范**：Swarm Skills提出了一种可移植、自进化的多智能体系统规范，旨在解决多智能体协作工程中的关键瓶颈，使协作过程可编码和系统化改进。 <a class="cite" href="https://arxiv.org/abs/2605.10052" target="_blank" rel="noopener noreferrer" data-cite="5. Swarm Skills: 可移植、自进化的多智能体系统规范｜arXiv cs.AI">5</a>
- **可验证的智能体基础设施**：该论文针对自主AI代理在主权AI系统中的操作风险，提出了基于证明的授权机制，确保代理生成的语义安全操作，防止特权滥用。 <a class="cite" href="https://arxiv.org/abs/2605.15228" target="_blank" rel="noopener noreferrer" data-cite="6. 可验证的智能体基础设施：主权AI系统的证明衍生授权｜arXiv cs.AI">6</a>
- **逃离多模态蒸馏中的零差分陷阱**：DeltaPrompts揭示了多模态蒸馏中高达69%的提示词实际上是零差分的，即教师和学生模型诱导出相同的答案分布，导致训练信号无效。 <a class="cite" href="https://arxiv.org/abs/2605.15532" target="_blank" rel="noopener noreferrer" data-cite="8. Delta Prompts: 逃离多模态蒸馏中的零差分陷阱｜arXiv cs.AI">8</a>
- **用于高效药物发现的自我进化智能体经验**：DrugSAGE提出了一种自进化智能体经验框架，通过跨任务积累和复用经验来构建高效的药物发现模型，避免了每次新任务都从头开始搜索。 <a class="cite" href="https://arxiv.org/abs/2605.15461" target="_blank" rel="noopener noreferrer" data-cite="10. Drug SAGE: 用于高效药物发现的自我进化智能体经验｜arXiv cs.AI">10</a>
- **超越和在线策略蒸馏**：该论文提出了一种稀疏到密集奖励的四阶段后训练工作流，通过稀疏奖励强化学习、前向KL预热和策略蒸馏，显著提升了语言模型在数学推理任务上的表现。 <a class="cite" href="https://arxiv.org/abs/2605.12483" target="_blank" rel="noopener noreferrer" data-cite="9. 超越GRPO和在线策略蒸馏：语言模型后训练的稀疏到密集奖励原理｜arXiv cs.AI">9</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://www.theverge.com/ai-artificial-intelligence/932464/musk-v-altman-proved-that-ai-is-led-by-the-wrong-people" target="_blank" rel="noopener noreferrer">马斯克诉奥特曼案证明AI由错误的人主导｜The Verge AI</a>
- <span id="ref-2">2.</span> <a href="https://www.technologyreview.com/2026/05/18/1137488/elon-musk-suit-openai-verdict/" target="_blank" rel="noopener noreferrer">埃隆·马斯克败诉OpenAI的原因｜MIT Technology Rev…</a>
- <span id="ref-3">3.</span> <a href="https://www.theverge.com/ai-artificial-intelligence/932383/jury-verdict-musk-v-altman-openai-trial" target="_blank" rel="noopener noreferrer">埃隆·马斯克败诉萨姆·奥特曼｜The Verge AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2605.15701" target="_blank" rel="noopener noreferrer">H-Mem: 一种通过混合结构实现智能体记忆演变与检索的新型记忆机制｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2605.10052" target="_blank" rel="noopener noreferrer">Swarm Skills: 可移植、自进化的多智能体系统规范｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2605.15228" target="_blank" rel="noopener noreferrer">可验证的智能体基础设施：主权AI系统的证明衍生授权｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://news.aibase.com/zh/news/28119" target="_blank" rel="noopener noreferrer">全球 AI 市场：OpenAI 与 Anthropic 独占 89% 年收入份额调查显示，全球34家主流AI公司年收入逼近800亿美元，半年增长112%。其中，…｜AIBase</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2605.15532" target="_blank" rel="noopener noreferrer">Delta Prompts: 逃离多模态蒸馏中的零差分陷阱｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://arxiv.org/abs/2605.12483" target="_blank" rel="noopener noreferrer">超越GRPO和在线策略蒸馏：语言模型后训练的稀疏到密集奖励原理｜arXiv cs.AI</a>
- <span id="ref-10">10.</span> <a href="https://arxiv.org/abs/2605.15461" target="_blank" rel="noopener noreferrer">Drug SAGE: 用于高效药物发现的自我进化智能体经验｜arXiv cs.AI</a>
- <span id="ref-11">11.</span> <a href="https://36kr.com/p/3815882846248450" target="_blank" rel="noopener noreferrer">AI创业一年狂揽800亿美元，Anthropic反杀OpenAI，双雄独吞89%｜36Kr AI</a>
- <span id="ref-12">12.</span> <a href="https://news.aibase.com/zh/news/28116" target="_blank" rel="noopener noreferrer">ChatGPT化身私人理财管家：OpenAI推出全新金融工具可直连银行账户OpenAI向ChatGPT Pro用户推出个人理财工具预览版，允许美国用户绑定银行账…｜AIBase</a>
- <span id="ref-13">13.</span> <a href="https://news.aibase.com/zh/news/28134" target="_blank" rel="noopener noreferrer">免费公测进入倒计时：腾讯云两大主力AI模型月底转入正式商用腾讯云宣布，其智能体开发平台的两款核心大模型Hy3preview和DeepSeek-V4-Pro将于2…｜AIBase</a>
- <span id="ref-14">14.</span> <a href="https://aitntnews.com/newDetail.html?newId=25262" target="_blank" rel="noopener noreferrer">Z Potentials｜ 梁芊荟，从MIT计算审美到华为计算摄影：一个研究美的建筑师用AI 重写种草逻辑｜AITNT 资讯</a>
- <span id="ref-15">15.</span> <a href="https://www.qbitai.com/2026/05/419990.html" target="_blank" rel="noopener noreferrer">Cursor新模型，你怎么还在套Kimi？马斯克你怎么还吆喝上了？？｜量子位</a>
- <span id="ref-16">16.</span> <a href="https://aitntnews.com/newDetail.html?newId=25247" target="_blank" rel="noopener noreferrer">DeepSeek开招Harness产品经理！「参与Agent桌面端产品全过程」｜AITNT 资讯</a>
