---
title: "AI晚报 · 04.16 周四"
date: 2026-04-16 21:07:32
description: "今日主线：\n- 本周AI领域聚焦于模型安全性的重新审视与工具化能力的突破\n- 一方面，DeepSeek R1等低成本模型展现出媲美顶级模型的漏等进展\n- 另一方面，通义千问、阿里、腾讯等厂商纷纷推出Agent评测基准"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：311 条

> 主线：本周AI领域聚焦于模型安全性的重新审视与工具化能力的突破。一方面，DeepSeek R1等低成本模型展现出媲美顶级模型的漏洞挖掘能力，引发对模型神话的反思；另一方面，通义千问、阿里、腾讯等厂商纷纷推出Agent评测基准、开放式世界模型及3D生成工具，推动AI从单一能力向复杂场景与交互式应用演进。

## 重点资讯

### 01 · DeepSeek R1以低成本成功复现顶级模型漏洞挖掘能力，打破模型神话。

Anthropic发布的Mythos Preview模型曾因自主发现FreeBSD和OpenBSD等系统漏洞而震惊业界，并宣布Project Glasswing联盟投入一亿美元修复漏洞。然而，安全初创公司AISLE的测试表明，DeepSeek R1等低成本模型同样能精准定位这些高难度漏洞，且成本仅为Mythos的几分之一。这一发现表明，顶尖模型并非不可替代，低成本模型在特定任务上具备极高的性价比与实用性。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24127" target="_blank" rel="noopener noreferrer" data-cite="15. Claude最强模型没那么神话，Deep Seek R1也能找到「大 bug」｜AITNT 资讯">15</a>

### 02 · 通义千问与港中文联合发布OccuBench

针对现有基准无法覆盖真实职业场景的痛点，通义千问团队与香港中文大学研究者推出了OccuBench。该基准基于语言世界模型（LWM）构建，通过模拟急诊室、核电站等真实环境，覆盖100个职业场景、10大行业及382个评测实例。它解决了传统基准仅能测试浏览器、代码等有限领域的问题，为评估AI Agent在复杂现实任务中的表现提供了全新标准。OccuBench填补了Agent评测在真实职业场景中的空白，推动了AI从工具向职业伙伴的演进。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=24126" target="_blank" rel="noopener noreferrer" data-cite="10. 15个前沿大模型，100个职业场景：谁才是最强AI打工人？｜AITNT 资讯">10</a>

### 03 · 科大讯飞发布AM50 Pro智能鼠标，内置多款大模型提供AI交互功能。

科大讯飞在京东上线了AM50 Pro AI智能鼠标，售价498元。该鼠标支持有线、星闪和蓝牙三种连接方式，重量仅66克，手感轻盈。其最大亮点是内置了Qwen Plus、混元、豆包、讯飞星火和DeepSeek等多款大模型，用户可通过独立AI按键一键唤醒，实现智能化操作，极大提升了办公与游戏效率。

参考：<a class="cite" href="https://news.aibase.com/zh/news/27195" target="_blank" rel="noopener noreferrer" data-cite="12. 科大讯飞新发布的 AI 智能鼠标 AM50 Pro科大讯飞推出AM50 Pro …｜AIBase">12</a>

## 其他快讯

- **01 · 腾讯开源HY-World 2.0，实现从视频生成到可编辑3D世界的跨越。**：腾讯正式开源HY-World 2.0，这是一个统一的多模态3D世界模型。与Genie 3等仅输出视频的模型不同，HY-World 2.0能直接生成可编辑的3D资产（如Mesh、3DGS、点云），并支持直接导入Unity和Unreal Engine。（参考：<a class="cite" href="https://huggingface.co/posts/Benedictat/743065271921281" target="_blank" rel="noopener noreferrer" data-cite="7. 混元 HY-World 2.0 开源：3 D 生成/重建/模拟的统一 SOTA｜Hugging Face 社区">7</a>、<a class="cite" href="https://huggingface.co/posts/kelsend/147703570779657" target="_blank" rel="noopener noreferrer" data-cite="8. 腾讯开源混元 3 D 世界模型 2.0：一句话生成可编辑 3 D 游戏世界｜Hugging Face 社区">8</a>、<a class="cite" href="https://huggingface.co/posts/wangbuer999/942915908013160" target="_blank" rel="noopener noreferrer" data-cite="9. HY-World 2.0 实测：端到端工程成熟度显著提升｜Hugging Face 社区">9</a>）
- **02 · 阿里推出开放式世界模型Happy Oyster，支持实时交互与多模态输入。**：阿里巴巴ATH事业群发布了开放式世界模型Happy Oyster，并开启内测申请。该产品基于原生多模态架构，支持在生成过程中持续输入指令，画面实时响应。它提供“导演模式”和“漫游者模式”，特别适用于影视制作和游戏开发，标志着阿里在AI内容生成领域向交互式三维世界模型的进一步拓展。（参考：<a class="cite" href="https://news.aibase.com/zh/news/27196" target="_blank" rel="noopener noreferrer" data-cite="11. 阿里ATH事业群开放式世界模型“Happy Oyster”启动内测申请阿里巴巴推…｜AIBase">11</a>）
- **03 · 腾讯升级AI小程序成长计划，所有开发者均可申请加入。**：腾讯宣布全面升级“微信AI小程序成长计划”，将参与范围从虚拟类目扩展至全行业、全类目。即日起，所有小程序开发者均可申请加入，享受免费云开发环境、1亿大模型Token、无门槛广告接入等“AI大礼包”。此举旨在降低开发者使用AI的门槛，推动AI技术在各行业的普及。（参考：<a class="cite" href="https://www.qbitai.com/2026/04/401710.html" target="_blank" rel="noopener noreferrer" data-cite="14. 腾讯官宣升级AI小程序成长计划，所有小程序都能申请｜量子位">14</a>）
- **04 · 讯飞AI眼镜在广交会引发关注，展示实时跨语言交流能力。**：在第139届广交会上，搭载了AstronClaw底座能力的讯飞AI眼镜首次亮相。现场一位讲阿拉伯语的客商与讯飞负责人通过眼镜实现了实时跨语言交流，展示了产品的多语种翻译能力。来自巴西、西班牙等数十个国家的采购商对产品表现出高度兴趣，排队体验。（参考：<a class="cite" href="https://www.qbitai.com/2026/04/401994.html" target="_blank" rel="noopener noreferrer" data-cite="13. 世界客商排队体验讯飞AI眼镜，科大讯飞把多语种AI能力带进广交会第一现场｜量子位">13</a>）

## 核心论文

- **工具增强型在空间分析中的动态执行基准**：GeoAgentBench是一个针对工具增强型GIS Agent的动态交互评测基准，解决了传统基准依赖静态文本匹配的问题，支持多模态空间输出。 <a class="cite" href="https://arxiv.org/abs/2604.13888" target="_blank" rel="noopener noreferrer" data-cite="1. Geo Agent Bench: 工具增强型Agent在空间分析中的动态执行基准｜arXiv cs.AI">1</a>
- **通过基于树的探索自动化微调**：TREX是一个多智能体系统，通过协调研究者和执行者模块，自动化完成LLM训练生命周期的需求分析、数据准备、模型训练与评估。 <a class="cite" href="https://arxiv.org/abs/2604.14116" target="_blank" rel="noopener noreferrer" data-cite="2. TREX: 通过基于树的探索自动化LLM微调｜arXiv cs.AI">2</a>
- **推理模型如何伤害行为模拟**：研究指出，在非求解导向的模拟场景中，增强推理能力的模型可能因过度优化而降低行为多样性，导致模拟失真。 <a class="cite" href="https://arxiv.org/abs/2604.11840" target="_blank" rel="noopener noreferrer" data-cite="3. 推理模型如何伤害行为模拟：多智能体LLM谈判中的求解器-采样器不匹配｜arXiv cs.AI">3</a>
- **部署的生命周期集成安全架构**：SafeHarness提出了一种生命周期集成的安全架构，旨在保护LLM Agent的执行环境免受工具使用、上下文管理和状态持久化层面的攻击。 <a class="cite" href="https://arxiv.org/abs/2604.13630" target="_blank" rel="noopener noreferrer" data-cite="4. Safe Harness: LLM Agent部署的生命周期集成安全架构｜arXiv cs.AI">4</a>
- **德国法律任务端到端基准的协作式平台**：BenGER是一个开源的协作式Web平台，集成了任务创建、标注、LLM运行与多维度评估，旨在提升法律推理任务的透明度与可复现性。 <a class="cite" href="https://arxiv.org/abs/2604.13583" target="_blank" rel="noopener noreferrer" data-cite="5. Ben GER: 德国法律任务端到端基准的协作式Web平台｜arXiv cs.AI">5</a>
- **内在非攻击轨迹基准**：HINTBench关注Agent在良性条件下的内在风险，评估那些在长期执行中潜伏并最终导致高后果后果的失败轨迹。 <a class="cite" href="https://arxiv.org/abs/2604.13954" target="_blank" rel="noopener noreferrer" data-cite="6. HINTBench: Horizon-agent内在非攻击轨迹基准｜arXiv cs.AI">6</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://arxiv.org/abs/2604.13888" target="_blank" rel="noopener noreferrer">Geo Agent Bench: 工具增强型Agent在空间分析中的动态执行基准｜arXiv cs.AI</a>
- <span id="ref-2">2.</span> <a href="https://arxiv.org/abs/2604.14116" target="_blank" rel="noopener noreferrer">TREX: 通过基于树的探索自动化LLM微调｜arXiv cs.AI</a>
- <span id="ref-3">3.</span> <a href="https://arxiv.org/abs/2604.11840" target="_blank" rel="noopener noreferrer">推理模型如何伤害行为模拟：多智能体LLM谈判中的求解器-采样器不匹配｜arXiv cs.AI</a>
- <span id="ref-4">4.</span> <a href="https://arxiv.org/abs/2604.13630" target="_blank" rel="noopener noreferrer">Safe Harness: LLM Agent部署的生命周期集成安全架构｜arXiv cs.AI</a>
- <span id="ref-5">5.</span> <a href="https://arxiv.org/abs/2604.13583" target="_blank" rel="noopener noreferrer">Ben GER: 德国法律任务端到端基准的协作式Web平台｜arXiv cs.AI</a>
- <span id="ref-6">6.</span> <a href="https://arxiv.org/abs/2604.13954" target="_blank" rel="noopener noreferrer">HINTBench: Horizon-agent内在非攻击轨迹基准｜arXiv cs.AI</a>
- <span id="ref-7">7.</span> <a href="https://huggingface.co/posts/Benedictat/743065271921281" target="_blank" rel="noopener noreferrer">混元 HY-World 2.0 开源：3 D 生成/重建/模拟的统一 SOTA｜Hugging Face 社区</a>
- <span id="ref-8">8.</span> <a href="https://huggingface.co/posts/kelsend/147703570779657" target="_blank" rel="noopener noreferrer">腾讯开源混元 3 D 世界模型 2.0：一句话生成可编辑 3 D 游戏世界｜Hugging Face 社区</a>
- <span id="ref-9">9.</span> <a href="https://huggingface.co/posts/wangbuer999/942915908013160" target="_blank" rel="noopener noreferrer">HY-World 2.0 实测：端到端工程成熟度显著提升｜Hugging Face 社区</a>
- <span id="ref-10">10.</span> <a href="https://aitntnews.com/newDetail.html?newId=24126" target="_blank" rel="noopener noreferrer">15个前沿大模型，100个职业场景：谁才是最强AI打工人？｜AITNT 资讯</a>
- <span id="ref-11">11.</span> <a href="https://news.aibase.com/zh/news/27196" target="_blank" rel="noopener noreferrer">阿里ATH事业群开放式世界模型“Happy Oyster”启动内测申请阿里巴巴推…｜AIBase</a>
- <span id="ref-12">12.</span> <a href="https://news.aibase.com/zh/news/27195" target="_blank" rel="noopener noreferrer">科大讯飞新发布的 AI 智能鼠标 AM50 Pro科大讯飞推出AM50 Pro …｜AIBase</a>
- <span id="ref-13">13.</span> <a href="https://www.qbitai.com/2026/04/401994.html" target="_blank" rel="noopener noreferrer">世界客商排队体验讯飞AI眼镜，科大讯飞把多语种AI能力带进广交会第一现场｜量子位</a>
- <span id="ref-14">14.</span> <a href="https://www.qbitai.com/2026/04/401710.html" target="_blank" rel="noopener noreferrer">腾讯官宣升级AI小程序成长计划，所有小程序都能申请｜量子位</a>
- <span id="ref-15">15.</span> <a href="https://aitntnews.com/newDetail.html?newId=24127" target="_blank" rel="noopener noreferrer">Claude最强模型没那么神话，Deep Seek R1也能找到「大 bug」｜AITNT 资讯</a>
