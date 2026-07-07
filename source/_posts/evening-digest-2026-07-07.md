---
title: "AI晚报 · 07.07 周二"
date: 2026-07-07 21:58:33
description: "今日主线：\n- Anthropic Claude 意识研究引发热议\n- 腾讯发布 295B 参数 MoE 模型 Hy3"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：Anthropic Claude 意识研究引发热议，Claude Sonnet 5 上线后出现严重上下文记忆泄露问题。腾讯发布 295B 参数 MoE 模型 Hy3，字节 Seed 发布 EdgeBench 基准测试，百度基础模型研发部换帅，Meta 被曝诱导竞品 AI 进行极限压力测试，Patronus AI 完成 5000 万美元融资。

## 重点资讯

### 01 · Anthropic 在 Claude 内部发现自发形成的 J-space

Anthropic 发布重磅研究，指出 Claude 在训练过程中自发形成了一个小型“工作空间”，模型在其中存放和处理想法，无需表达为语言输出。该内部结构被称为 J-space（雅可比空间），其运作方式与人类有意识地获取和处理思想的方式高度相似。研究团队开发了名为 Jacobian Lens（J-lens）的工具，通过雅可比矩阵为词表中的每个 token 找到内部激活模式，从而观察模型“心里想但未必说出口”的内容。实验显示，更多细节仍待后续披露。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26956" target="_blank" rel="noopener noreferrer" data-cite="4. 刚刚，Anthropic切开Claude大脑！AI自发长出类人「意识器官」｜AITNT 资讯">4</a>、<a class="cite" href="https://36kr.com/p/3885177353829001" target="_blank" rel="noopener noreferrer" data-cite="5. 我们亲手造出了有意识的AI？Anthropic这项研究可能被低估了｜36Kr AI">5</a>、<a class="cite" href="https://36kr.com/p/3885121308635401" target="_blank" rel="noopener noreferrer" data-cite="6. 昨晚，AI圈又疯狂了｜36Kr AI">6</a>、<a class="cite" href="https://36kr.com/p/3885278052102405" target="_blank" rel="noopener noreferrer" data-cite="7. Claude“脑内小剧场”首曝光：隐藏工作空间自发涌现类人意识，谷歌DeepMind权威认证｜36Kr AI">7</a>

### 02 · Anthropic 与 TeraWulf 签署 20 年数据中心租赁协议

Anthropic 与能源基础设施公司 TeraWulf 达成深度战略协议，签署了一份为期 20 年的数据中心租赁协议。TeraWulf 位于肯塔基州 Hawesville 的“Justified Data”站点将成为 Anthropic 的核心算力基地。该项目规划宏大，设施容量上限高达 401 兆瓦，预计在 2027 年下半年正式投入运营，2028 年初实现全面产能释放。从商业回报来看，这份为期 20 年的租赁协议在初始期限内。

参考：<a class="cite" href="https://news.aibase.com/zh/news/29434" target="_blank" rel="noopener noreferrer" data-cite="13. 强强联手：Tera Wulf携手Anthropic共建百亿规模AI算力新据点Tera Wulf与Anthropic达成20年数据中心租赁战略协议，将Tera W…｜AIBase">13</a>、<a class="cite" href="https://news.aibase.com/zh/news/29420" target="_blank" rel="noopener noreferrer" data-cite="14. 砸下 190 亿美金！AI巨头 Anthropic 豪租数据中心 20 年人工智能新星Anthropic宣布在肯塔基州霍斯维尔建大型数据中心，与Tera Wul…｜AIBase">14</a>

### 03 · 百度基础模型研发部（BMU）负责人换为 1997 年出生的孙天祥。

百度基础模型研发部（BMU）负责人一职已由孙天祥接任。孙天祥是复旦大学计算机博士，博士期间曾主导类 ChatGPT 开源大模型 MOSS 的研发。他曾在国际上提出 Model-as-a-Service 相关概念，拥有从学术、模型工程到产业化系统的完整经验。

参考：<a class="cite" href="https://www.leiphone.com/category/ai/XR79bc90xongJ7dH.html" target="_blank" rel="noopener noreferrer" data-cite="20. 百度基础模型换将，这一次把牌交给年轻人｜雷锋网 AI">20</a>

## 其他快讯

- **01 · 腾讯发布 295 B 参数 Mo E 模型 Hy3**：腾讯 Hy 团队发布了 295B 参数的混合专家模型 Hy3，拥有 21B 激活参数和 3.8B MTP 层参数。继 4 月底发布预览版后，团队收集了 50 多个产品的反馈，并使用更高质量的数据进行了扩展训练。Hy3 在性能上超越了同尺寸模型，并媲美参数量 2-5 倍的开源旗舰模型。（参考：<a class="cite" href="https://simonwillison.net/2026/Jul/6/hy3/#atom-everything" target="_blank" rel="noopener noreferrer" data-cite="1. 社区来源重点更新｜Simon Willison&#39;s W…">1</a>、<a class="cite" href="https://huggingface.co/posts/satgeze/984596855374530" target="_blank" rel="noopener noreferrer" data-cite="2. Tencent Hy3 的首批 GGUF 量化版本（299 B Mo E），在官方 llama.cpp 支持发布前构建。Hy3 发布约 30 小时后｜Hugging Face 社区">2</a>）
- **02 · 字节 Seed 发布 Edge Bench 基准测试，量化智能体在真实环境中的持续学习能力。**：字节 Seed 团队正式发布了名为“EdgeBench”的超长程评测集，为智能体真实世界持续学习能力研究提供量化参考。该基准收录了 134 个涵盖六大领域的真实任务，每个任务都要求智能体能够持续工作至少 12 小时。研发团队累计采集了约 3.8 万小时的交互数据。（参考：<a class="cite" href="https://news.aibase.com/zh/news/29439" target="_blank" rel="noopener noreferrer" data-cite="15. 智能体进化新刻度：字节Seed发布Edge Bench基准测试字节Seed团队推出超长程评测集Edge Bench，专注衡量智能体真实世界持续学习能力。该基准覆…｜AIBase">15</a>）
- **03 · Claude Sonnet 5 上线后因上下文记忆泄露和频繁反驳用户引发大量投诉。**：Anthropic 上周发布了迄今最强的 Claude Sonnet 5 模型，基准测试全面超越前代。然而，该模型在上线后迅速陷入争议漩涡。用户集中吐槽其存在严重的上下文记忆泄露问题，经常会将系统预设的提示词直接呈现在回复中。（参考：<a class="cite" href="https://news.aibase.com/zh/news/29436" target="_blank" rel="noopener noreferrer" data-cite="17. Claude Sonnet 5 上线后遭大量投诉：频繁反驳、说教成风Anthropic发布最强Claude Sonnet 5模型，基准测试全面超越前代，但上线后…｜AIBase">17</a>）
- **04 · Meta 被曝启动“Cannes”项目，雇佣外包人员假扮未成年人测试竞品 AI 安全边界。**：据媒体披露，Meta 公司此前曾开展了一项代号为“Cannes”的项目，通过雇佣外包人员伪装成未成年人，针对包括 ChatGPT、Gemini 及 Character.AI 在内的多个主流竞品聊天机器人，进行了一场极具争议的“极限压力测试”。该项目运作至少持续到了 2025 年 4 月 21 日。（参考：<a class="cite" href="https://news.aibase.com/zh/news/29429" target="_blank" rel="noopener noreferrer" data-cite="16. 行业震动：Meta被曝诱导竞品AI测试极端心理敏感话题Meta被曝启动“Cannes”项目，雇佣外包人员假扮未成年人，对ChatGPT、Gemini、Chara…｜AIBase">16</a>）
- **05 · 豆包与通义千问宣布下线智能体功能，响应《人工智能拟人化互动服务管理暂行办法》。**：7 月 4 日，豆包与通义千问同步发出公告：智能体功能将于 7 月 15 日正式下线。此前，腾讯元宝已先一步下线智能体功能。这一日期并非随机，7 月 15 日正是《人工智能拟人化互动服务管理暂行办法》正式施行的日子。（参考：<a class="cite" href="https://36kr.com/p/3885489838305289" target="_blank" rel="noopener noreferrer" data-cite="19. 800万个AI角色，被大厂亲手关掉｜36Kr AI">19</a>）
- **06 · Patronus AI 完成 5000 万美元 B 轮融资，累计融资达 7000 万美元。**：Patronus AI 近日完成 5000 万美元 B 轮融资，由 Greenfield Partners 领投，Notable Capital、Lightspeed、Datadog 和 Samsung 等参投。融资完成后，公司累计融资额达到 7000 万美元。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=26953" target="_blank" rel="noopener noreferrer" data-cite="18. 融资5000万美元，Patronus AI 要做AI Agent的压力测试场 | News｜AITNT 资讯">18</a>）

## 核心论文

- **不要责怪大语言模型**：该论文研究了 Agentic Scaffolding（智能体脚手架）的演化如何影响编码 Agent 的质量，指出质量回归往往源于脚手架而非模型本身。 <a class="cite" href="https://arxiv.org/abs/2607.03691" target="_blank" rel="noopener noreferrer" data-cite="3. 不要责怪大语言模型：脚手架演化如何塑造编码 Agent 质量｜arXiv cs.AI">3</a>
- **通过能力转移评估智能体自我进化**：该基准测试旨在评估智能体在长时序 LLM 系统中的自我进化能力，特别是通过能力转移来复用有用经验。 <a class="cite" href="https://arxiv.org/abs/2607.05202" target="_blank" rel="noopener noreferrer" data-cite="8. Evo Agent Bench：通过能力转移评估智能体自我进化｜arXiv cs.AI">8</a>
- **语言防火墙：多智能体系统路由**：该研究提出了一种基于几何学的防御机制，用于多智能体系统中的路由，以应对 LLM 代理描述不可靠的问题。 <a class="cite" href="https://arxiv.org/abs/2606.30555" target="_blank" rel="noopener noreferrer" data-cite="9. 语言防火墙：多智能体系统路由中的几何防御｜arXiv cs.AI">9</a>
- **通过多智能体迭代细化实现端到**：该框架通过多智能体迭代细化，能够将自然语言描述的运筹学问题转化为可执行的数学公式和代码。 <a class="cite" href="https://arxiv.org/abs/2607.05346" target="_blank" rel="noopener noreferrer" data-cite="10. Opti Agent：通过多智能体迭代细化实现端到端优化建模｜arXiv cs.AI">10</a>
- **技能覆盖率：智能体技能的测试**：该研究引入了 skill coverage 指标，用于评估智能体技能的可测试性，解决任务结果无法揭示技能使用细节的问题。 <a class="cite" href="https://arxiv.org/abs/2606.20659" target="_blank" rel="noopener noreferrer" data-cite="11. 技能覆盖率：智能体技能的测试充分性指标｜arXiv cs.AI">11</a>
- **面向网络威胁情报知识图谱构建**：该研究提出利用小规模智能体团队来构建网络威胁情报知识图谱，旨在解决从非结构化文本中提取结构化信息的挑战。 <a class="cite" href="https://arxiv.org/abs/2607.05001" target="_blank" rel="noopener noreferrer" data-cite="12. TACTIC-KG：面向网络威胁情报知识图谱构建的小型智能体团队｜arXiv cs.AI">12</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://simonwillison.net/2026/Jul/6/hy3/#atom-everything" target="_blank" rel="noopener noreferrer">社区来源重点更新｜Simon Willison&#39;s W…</a>
- <span id="ref-2">2.</span> <a href="https://huggingface.co/posts/satgeze/984596855374530" target="_blank" rel="noopener noreferrer">Tencent Hy3 的首批 GGUF 量化版本（299 B Mo E），在官方 llama.cpp 支持发布前构建。Hy3 发布约 30 小时后｜Hugging Face 社区</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2607.03691" target="_blank" rel="noopener noreferrer">不要责怪大语言模型：脚手架演化如何塑造编码 Agent 质量｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://aitntnews.com/newDetail.html?newId=26956" target="_blank" rel="noopener noreferrer">刚刚，Anthropic切开Claude大脑！AI自发长出类人「意识器官」｜AITNT 资讯</a>
- <span id="ref-5">5.</span> <a href="https://36kr.com/p/3885177353829001" target="_blank" rel="noopener noreferrer">我们亲手造出了有意识的AI？Anthropic这项研究可能被低估了｜36Kr AI</a>
- <span id="ref-6">6.</span> <a href="https://36kr.com/p/3885121308635401" target="_blank" rel="noopener noreferrer">昨晚，AI圈又疯狂了｜36Kr AI</a>
- <span id="ref-7">7.</span> <a href="https://36kr.com/p/3885278052102405" target="_blank" rel="noopener noreferrer">Claude“脑内小剧场”首曝光：隐藏工作空间自发涌现类人意识，谷歌DeepMind权威认证｜36Kr AI</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2607.05202" target="_blank" rel="noopener noreferrer">Evo Agent Bench：通过能力转移评估智能体自我进化｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://arxiv.org/abs/2606.30555" target="_blank" rel="noopener noreferrer">语言防火墙：多智能体系统路由中的几何防御｜arXiv cs.AI</a>
- <span id="ref-10">10.</span> <a href="https://arxiv.org/abs/2607.05346" target="_blank" rel="noopener noreferrer">Opti Agent：通过多智能体迭代细化实现端到端优化建模｜arXiv cs.AI</a>
- <span id="ref-11">11.</span> <a href="https://arxiv.org/abs/2606.20659" target="_blank" rel="noopener noreferrer">技能覆盖率：智能体技能的测试充分性指标｜arXiv cs.AI</a>
- <span id="ref-12">12.</span> <a href="https://arxiv.org/abs/2607.05001" target="_blank" rel="noopener noreferrer">TACTIC-KG：面向网络威胁情报知识图谱构建的小型智能体团队｜arXiv cs.AI</a>
- <span id="ref-13">13.</span> <a href="https://news.aibase.com/zh/news/29434" target="_blank" rel="noopener noreferrer">强强联手：Tera Wulf携手Anthropic共建百亿规模AI算力新据点Tera Wulf与Anthropic达成20年数据中心租赁战略协议，将Tera W…｜AIBase</a>
- <span id="ref-14">14.</span> <a href="https://news.aibase.com/zh/news/29420" target="_blank" rel="noopener noreferrer">砸下 190 亿美金！AI巨头 Anthropic 豪租数据中心 20 年人工智能新星Anthropic宣布在肯塔基州霍斯维尔建大型数据中心，与Tera Wul…｜AIBase</a>
- <span id="ref-15">15.</span> <a href="https://news.aibase.com/zh/news/29439" target="_blank" rel="noopener noreferrer">智能体进化新刻度：字节Seed发布Edge Bench基准测试字节Seed团队推出超长程评测集Edge Bench，专注衡量智能体真实世界持续学习能力。该基准覆…｜AIBase</a>
- <span id="ref-16">16.</span> <a href="https://news.aibase.com/zh/news/29429" target="_blank" rel="noopener noreferrer">行业震动：Meta被曝诱导竞品AI测试极端心理敏感话题Meta被曝启动“Cannes”项目，雇佣外包人员假扮未成年人，对ChatGPT、Gemini、Chara…｜AIBase</a>
- <span id="ref-17">17.</span> <a href="https://news.aibase.com/zh/news/29436" target="_blank" rel="noopener noreferrer">Claude Sonnet 5 上线后遭大量投诉：频繁反驳、说教成风Anthropic发布最强Claude Sonnet 5模型，基准测试全面超越前代，但上线后…｜AIBase</a>
- <span id="ref-18">18.</span> <a href="https://aitntnews.com/newDetail.html?newId=26953" target="_blank" rel="noopener noreferrer">融资5000万美元，Patronus AI 要做AI Agent的压力测试场 | News｜AITNT 资讯</a>
- <span id="ref-19">19.</span> <a href="https://36kr.com/p/3885489838305289" target="_blank" rel="noopener noreferrer">800万个AI角色，被大厂亲手关掉｜36Kr AI</a>
- <span id="ref-20">20.</span> <a href="https://www.leiphone.com/category/ai/XR79bc90xongJ7dH.html" target="_blank" rel="noopener noreferrer">百度基础模型换将，这一次把牌交给年轻人｜雷锋网 AI</a>
