---
title: "AI晚报 · 09.24 周四"
date: 2026-09-24 19:40:00
description: "今日主线：\n- 今日AI领域聚焦于智能体基础设施\n- 月之暗面Kimi K3.1即将发布，Meta"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：250 条

> 主线：今日AI领域聚焦于智能体基础设施、医疗AI突破及多模态应用落地。月之暗面Kimi K3.1即将发布，Meta Connect大会推出个人AI助手Muse，DeepSeek公开大规模智能体训练沙箱技术，阿里达摩院发布食管癌筛查模型DAMO EAGLE，同时华为、百度等厂商纷纷推出面向办公场景的AI工具。

## 重点资讯

### 01 · Meta Connect大会推出个人AI助手Muse

Meta Connect大会正式发布个人AI助手Muse，其物理化身名为Jolly。该智能体旨在通过连接用户的邮件、日历等应用和服务来处理日常任务。Meta CEO扎克伯格在会上强调公司正全力投入Muse的开发。此外，Meta还宣布正在将Muse引入其智能眼镜产品线，用户可通过语音激活Muse来处理健身指导、饮食记录或购物辅助等任务。Meta将Muse作为其消费级AI的重要赌注，标志着社交巨头在个人助理领域的全面布局。

参考：<a class="cite" href="https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/" target="_blank" rel="noopener noreferrer" data-cite="1. Meta AI智能体Muse的新功能｜TechCrunch AI">1</a>、<a class="cite" href="https://www.theverge.com/tech/999673/meta-connect-2026-muse-glasses-features" target="_blank" rel="noopener noreferrer" data-cite="2. Muse即将登陆Meta智能眼镜｜The Verge AI">2</a>

### 02 · 月之暗面Kimi K3.1预计下月登场

据Wccftech报道，月之暗面正酝酿推出Kimi K3.1模型，预计将于2026年10月发布。消息源自内部接口泄露，发现了“k3d1-agent”等模型标识。配置文件显示K3.1可能提供Low、High、Max三档推理强度，并支持名为“Extra Long”的超长上下文选项（最高100万Token），以及Agent智能体模式和Swarm多智能体协作功能。Kimi K3.1若配置属实。

参考：<a class="cite" href="https://news.aibase.com/zh/news/31339" target="_blank" rel="noopener noreferrer" data-cite="9. 消息称 Kimi K3.1 下月登场，三档推理强度 + 百万 Token月之暗面被曝将推 Kimi K3.1 模型，预计 2026 年 10 月发布，提供 Lo…｜AIBase">9</a>

### 03 · DeepSeek发布31页系统论文，公开大规模智能体训练专用沙箱基础设施核心技术。

DeepSeek日前发布题为《DeepSeek弹性计算（DSec）：面向大规模智能体训练的高效沙箱基础设施》的31页系统论文。该论文首次公开了其自研生产级弹性计算沙箱平台DSec的核心技术细节。论文披露，一个标准DSec生产单元由160台CPU节点组成，共计3万个CPU核心和约250TB内存，每日可服务约300万个沙箱实例，并稳定支撑超38万个并发沙箱。DeepSeek通过公开DSec基础设施，展示了其支撑海量智能体训练的底层工程能力。

参考：<a class="cite" href="https://news.aibase.com/zh/news/31337" target="_blank" rel="noopener noreferrer" data-cite="10. DeepSeek 论文上新：130 余人署名、梁文锋列末位，公开智能体训练沙箱 DSec DeepSeek日前发布31页系统论文，首次公开大规模智能体训练专用沙…｜AIBase">10</a>

## 其他快讯

- **01 · 阿里与荣耀合作推出AI手机Agent底座Qwen Intelligence，覆盖任务规划与影像创作。**：荣耀与阿里联手，荣耀Magic9系列将成为首批搭载阿里Qwen Intelligence的机型。Qwen Intelligence是阿里发布的面向手机智能的全栈解决方案，集成了千问大模型、Agent、Harness及端云协同能力。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=29691" target="_blank" rel="noopener noreferrer" data-cite="13. 不造手机，阿里凭什么做AI手机“Agent底座”？｜AITNT 资讯">13</a>）
- **02 · 阿里达摩院发布食管癌筛查模型DAMO EAGLE，在平扫CT上实现高敏感性识别。**：阿里达摩院联合多家医院发布食管癌筛查AI模型DAMO EAGLE。该模型无需插管和造影，仅凭平扫CT即可识别食管癌及早期病变。相关论文已登上国际顶级期刊《自然·医学》。研究显示，DAMO EAGLE在机会性筛查场景下对食管癌的敏感性达90%，对癌前病变敏感性为52.5%，真实场景特异性高达99.2%。（参考：<a class="cite" href="https://news.aibase.com/zh/news/31341" target="_blank" rel="noopener noreferrer" data-cite="14. 阿里达摩院发布食管癌 AI 模型 DAMO EAGLE：不插管，平扫 CT 就能查早癌阿里达摩院联合多家医院发布食管癌筛查AI模型DAMO EAGLE，无需插管…｜AIBase">14</a>）
- **03 · 罗福莉剧透小米Mi Mo v3将采用Hy Sparse2架构，以降低Agent长任务中的预填充计算量。**：罗福莉在MiMo-V2.6发布后开始剧透MiMo-V3架构。新架构核心为HySparse2，旨在解决Agent执行长任务时输入处理成本过高的问题。在80B总参数的MoE模型配置下，HySparse2在100万token上下文下的预填充计算量约为Hybrid SWA的1/5，KV Cache从12.09GB降至2.69G。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=29719" target="_blank" rel="noopener noreferrer" data-cite="12. 罗福莉剧透小米Mi Mo v3架构：模型还没影，论文全说了｜AITNT 资讯">12</a>）
- **04 · 百度推出随身办公AI工具Ok Work，主打碎片化场景下的PPT生成与文档处理。**：百度上线了主打随身办公的AI工具OkWork，集成了AI PPT、AI写作、AI表格和AI生图四大模块。该产品定位碎片化、轻量化办公，支持文档转PPT、PDF转Word、简历生成及海报设计等功能。OkWork内置大量模板，用户可直接选用，降低上手门槛，适合职场汇报、学生作业及教学备课等场景。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=29711" target="_blank" rel="noopener noreferrer" data-cite="15. 独家｜百度推出“Ok Work”，瞄准碎片化AI办公场景｜AITNT 资讯">15</a>）
- **05 · 华为正式上线小艺Work，定位AI工作助理，支持跨端协同与任务进度可视化。**：华为宣布小艺Work焕新上线，作为面向办公、代码开发与创意创作的AI工作助理。该服务深度适配鸿蒙手机、平板和电脑，用户可享受31天免费体验。小艺Work支持市场调研、PPT制作、数据分析等多元化场景，并能自主拆解任务、调用工具。系统支持跨端协同，用户可在手机下发任务并在电脑上运行，进度实时可见。（参考：<a class="cite" href="https://news.aibase.com/zh/news/31352" target="_blank" rel="noopener noreferrer" data-cite="11. 华为官宣小艺 Work 正式上线，首发 31 天限时免费畅享 1000 AI 点华为宣布小艺Work焕新上线，定位AI工作助理，面向日常办公、代码开发与创意创作…｜AIBase">11</a>）
- **06 · Qwen-Image-2.1 Lo RA应用上线Hugging Face**：Hugging Face Spaces上线了Qwen-Image-2.1 Plug and Play LoRA应用。该应用集成了标准推理、4步Turbo推理、自定义LoRA懒加载打包以及LoRA Plug and Play（PnP）功能。（参考：<a class="cite" href="https://huggingface.co/posts/prithivMLmods/873532482277855" target="_blank" rel="noopener noreferrer" data-cite="16. Qwen-Image-2.1 Plug and Play Lo RA应用上线｜Hugging Face 社区">16</a>）

## 核心论文

- **Hunyuan-A13B技术报告**：Hunyuan-A13B是一个基于混合专家架构的开源大语言模型，拥有800亿总参数但推理时仅激活130亿参数，在20T-token语料上预训练并增强STEM数据，提升了事实可靠性和推理能力。 <a class="cite" href="https://huggingface.co/papers/2609.27284" target="_blank" rel="noopener noreferrer" data-cite="4. Hunyuan-A13 B技术报告｜Hugging Face 论文">4</a>
- **射线放射学报告生成的迭代多智能体协作**：该论文提出了一种用于X射线放射学报告生成的迭代多智能体协作框架，旨在解决传统模型缺乏结构化医学先验知识导致的幻觉问题，并实现动态知识更新。 <a class="cite" href="https://arxiv.org/abs/2609.26124" target="_blank" rel="noopener noreferrer" data-cite="3. MAC-RRG：X射线放射学报告生成的迭代多智能体协作｜arXiv cs.AI">3</a>
- **隐私感知多智能体工作流的选择**：论文提出了选择不变通信编译器（SICC），用于隐私感知的多智能体LLM工作流，通过约束授权后的表示核来防止选择通道泄露，保护中间消息中的私有状态。 <a class="cite" href="https://arxiv.org/abs/2609.26076" target="_blank" rel="noopener noreferrer" data-cite="5. 隐私感知多智能体LLM工作流的选择不变通信编译器｜arXiv cs.AI">5</a>
- **从演示中评估业务工作流理解能力**：ShowTellArena是一个用于评估业务演示后理解能力的基准协议和数据集，包含50个业务流程任务和502个问题，涵盖财务、招聘、采购等多个领域。 <a class="cite" href="https://arxiv.org/abs/2609.25467" target="_blank" rel="noopener noreferrer" data-cite="6. Show Tell Arena：从演示中评估业务工作流理解能力｜arXiv cs.AI">6</a>
- **智能体技能的攻击追踪库**：SkillAtlas是一个托管式的攻击追踪库，将私有的智能体技能安全报告转换为经过审查、脱敏和可搜索的公开案例，用于评估智能体技能的风险。 <a class="cite" href="https://arxiv.org/abs/2609.13353" target="_blank" rel="noopener noreferrer" data-cite="7. Skill Atlas：智能体技能的攻击追踪库｜arXiv cs.AI">7</a>
- **通过掩码轨迹预测实现多维度智能体导航**：论文提出了面向多维度GUI智能体导航的掩码轨迹预测方法，旨在解决GUI交互中导航这一最关键和具有挑战性的能力。 <a class="cite" href="https://arxiv.org/abs/2609.25769" target="_blank" rel="noopener noreferrer" data-cite="8. 通过掩码轨迹预测实现多维度GUI智能体导航｜arXiv cs.AI">8</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://techcrunch.com/2026/09/23/everything-new-coming-to-metas-ai-agent-muse/" target="_blank" rel="noopener noreferrer">Meta AI智能体Muse的新功能｜TechCrunch AI</a>
- <span id="ref-2">2.</span> <a href="https://www.theverge.com/tech/999673/meta-connect-2026-muse-glasses-features" target="_blank" rel="noopener noreferrer">Muse即将登陆Meta智能眼镜｜The Verge AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2609.26124" target="_blank" rel="noopener noreferrer">MAC-RRG：X射线放射学报告生成的迭代多智能体协作｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://huggingface.co/papers/2609.27284" target="_blank" rel="noopener noreferrer">Hunyuan-A13 B技术报告｜Hugging Face 论文</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2609.26076" target="_blank" rel="noopener noreferrer">隐私感知多智能体LLM工作流的选择不变通信编译器｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2609.25467" target="_blank" rel="noopener noreferrer">Show Tell Arena：从演示中评估业务工作流理解能力｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://arxiv.org/abs/2609.13353" target="_blank" rel="noopener noreferrer">Skill Atlas：智能体技能的攻击追踪库｜arXiv cs.AI</a>
- <span id="ref-8">8.</span> <a href="https://arxiv.org/abs/2609.25769" target="_blank" rel="noopener noreferrer">通过掩码轨迹预测实现多维度GUI智能体导航｜arXiv cs.AI</a>
- <span id="ref-9">9.</span> <a href="https://news.aibase.com/zh/news/31339" target="_blank" rel="noopener noreferrer">消息称 Kimi K3.1 下月登场，三档推理强度 + 百万 Token月之暗面被曝将推 Kimi K3.1 模型，预计 2026 年 10 月发布，提供 Lo…｜AIBase</a>
- <span id="ref-10">10.</span> <a href="https://news.aibase.com/zh/news/31337" target="_blank" rel="noopener noreferrer">DeepSeek 论文上新：130 余人署名、梁文锋列末位，公开智能体训练沙箱 DSec DeepSeek日前发布31页系统论文，首次公开大规模智能体训练专用沙…｜AIBase</a>
- <span id="ref-11">11.</span> <a href="https://news.aibase.com/zh/news/31352" target="_blank" rel="noopener noreferrer">华为官宣小艺 Work 正式上线，首发 31 天限时免费畅享 1000 AI 点华为宣布小艺Work焕新上线，定位AI工作助理，面向日常办公、代码开发与创意创作…｜AIBase</a>
- <span id="ref-12">12.</span> <a href="https://aitntnews.com/newDetail.html?newId=29719" target="_blank" rel="noopener noreferrer">罗福莉剧透小米Mi Mo v3架构：模型还没影，论文全说了｜AITNT 资讯</a>
- <span id="ref-13">13.</span> <a href="https://aitntnews.com/newDetail.html?newId=29691" target="_blank" rel="noopener noreferrer">不造手机，阿里凭什么做AI手机“Agent底座”？｜AITNT 资讯</a>
- <span id="ref-14">14.</span> <a href="https://news.aibase.com/zh/news/31341" target="_blank" rel="noopener noreferrer">阿里达摩院发布食管癌 AI 模型 DAMO EAGLE：不插管，平扫 CT 就能查早癌阿里达摩院联合多家医院发布食管癌筛查AI模型DAMO EAGLE，无需插管…｜AIBase</a>
- <span id="ref-15">15.</span> <a href="https://aitntnews.com/newDetail.html?newId=29711" target="_blank" rel="noopener noreferrer">独家｜百度推出“Ok Work”，瞄准碎片化AI办公场景｜AITNT 资讯</a>
- <span id="ref-16">16.</span> <a href="https://huggingface.co/posts/prithivMLmods/873532482277855" target="_blank" rel="noopener noreferrer">Qwen-Image-2.1 Plug and Play Lo RA应用上线｜Hugging Face 社区</a>
