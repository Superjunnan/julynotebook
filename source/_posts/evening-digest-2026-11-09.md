---
title: "AI晚报 · 11.09 周一"
date: 2026-11-09 19:40:00
description: "今日主线：\n- Claude Code 密钥泄漏波及上千公开仓库\n- 智元机器人第 1 万台消费级人形机器人下线"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 本期为补录：原自动任务未产出内容，由公开资料整理。

> 主线：11月8日AI领域聚焦于工具安全、开源模型与人形机器人量产；英伟达的调查与合作消息持续发酵。

## 重点资讯

### 01 · Claude Code 泄密：1,122 个公开仓库含真实密钥

安全公司 Apiiro 报告发现，Claude Code 用户误点「Don't Ask Again」后，1,122 个公开 GitHub 仓库的 .claude/settings.local.json 含真实密钥，共 1,379 个密钥。事件登上 Hacker News 首页后，Claude Code 团队已公开回应。

参考：<a class="cite" href="https://enjoy.dev/blog/claude-code-settings-local-json-secrets/" target="_blank" rel="noopener noreferrer" data-cite="1. Claude Code 泄密：1,122 个公开仓库含真实密钥｜enjoy.dev">1</a>

### 02 · Nous 发布 Arete-27B：把 Qwen 微调到去宣传化

Nous Research 把阿里 Qwen3.8-27B 微调成 Arete-27B，用约 5280 万 token 的监督微调去除涉华政治话题上的官方口径；在其自设的 803 条测试中，含宣传口径的回答从 22% 降至 0.9%，通用与代码能力基本持平。权重、评测集与训练数据以 Apache 2.0 协议发布。

参考：<a class="cite" href="https://shiftdelete.net/en/arete-27b" target="_blank" rel="noopener noreferrer" data-cite="2. Nous 发布 Arete-27B：把 Qwen 微调到去宣传化｜ShiftDelete">2</a>

### 03 · 智元机器人第 10,000 台消费级人形机器人下线

智元机器人第 10,000 台消费级人形机器人于 11 月 8 日下线，距突破 5,000 台仅 14 天，日产能达 240 台。公司称 1 万台是人形机器人进入家庭消费的商业拐点。

参考：<a class="cite" href="https://kimkj.com/en/ai-board-en/?mod=document&uid=21177" target="_blank" rel="noopener noreferrer" data-cite="3. 智元机器人第 10,000 台消费级人形机器人下线｜kimkj">3</a>

## 其他快讯

- **04 · 英伟达董事会启动对黄仁勋的独立调查**：英伟达董事会宣布就黄仁勋相关事宜启动独立调查，黄仁勋同日向全体员工发内部信道歉。此事与此前媒体关于黄仁勋与 Alice Huang（前 Megaspeed 高管）的报道有关，众议院三个委员会主席已要求黄仁勋 11 月 18 日闭门简报。（参考：<a class="cite" href="https://nvidianews.nvidia.com/news/a-message-to-our-company" target="_blank" rel="noopener noreferrer" data-cite="4. 英伟达董事会启动对黄仁勋的独立调查｜NVIDIA News">4</a>）
- **05 · 英伟达宣布韩国主权 AI 与 Physical AI 一揽子合作**：英伟达在首尔宣布与韩国政府及企业合作推进主权 AI 与 Physical AI，覆盖三星、Kakao Mobility、LG、SK Telecom、Rebellions 等，内容包括 AI 工厂、机器人与自动驾驶、智能工厂等。这是英伟达当周在亚洲主权 AI 布局的重要一站。（参考：<a class="cite" href="https://blogs.nvidia.com/blog/korea-physical-ai-ecosystem/" target="_blank" rel="noopener noreferrer" data-cite="5. 英伟达宣布韩国主权 AI 与 Physical AI 一揽子合作｜NVIDIA Blog">5</a>）
- **06 · 微软研究院 AI Frontiers 团队解散**：微软研究院强化学习方向的核心团队 AI Frontiers（约 50 人，2023 年组建）正式解散，9 月初已并入 Microsoft AI；负责人 John Langford 在个人博客发文《The End of AI Frontiers》回顾团队工作。（参考：<a class="cite" href="https://hunch.net/?p=13764006" target="_blank" rel="noopener noreferrer" data-cite="6. 微软研究院 AI Frontiers 团队解散｜John Langford">6</a>）
- **07 · NYT 调查：美商务部批准空壳公司组装英伟达 H200 芯片**：NYT 调查发现，美国商务部批准了一家在北京注册地址为空壳毛坯房的中国公司组装英伟达 H200 芯片服务器，该公司所有者与被列入实体清单的基金有关。报道未指控英伟达违规，也未证明芯片被转用。（参考：<a class="cite" href="https://chinafactor.news/2026/11/08/u-s-cleared-chinese-firm-with-empty-office-to-assemble-nvidia-h200-servers-nyt-reports/" target="_blank" rel="noopener noreferrer" data-cite="7. NYT 调查：美商务部批准空壳公司组装英伟达 H200 芯片｜ChinaFactor（转述 NYT）">7</a>）
- **08 · METR 评估：Anthropic 用 AI 搞研发提速约 2 倍**：独立评估机构 METR 在 Anthropic 内部驻场 11 周后发布评估：Anthropic 模型能力提升速度约为 2024–2025 年的 2 倍，其中约 80% 归因于用 AI 做 AI 研发；过去约 6 个月内已完成三个未发布模型的训练。（参考：<a class="cite" href="https://explainx.ai/blog/metr-anthropic-ai-rd-acceleration-twice-as-fast-80-percent-ai-redactions-claimed-vs-verified-2026" target="_blank" rel="noopener noreferrer" data-cite="8. METR 评估：Anthropic 用 AI 搞研发提速约 2 倍｜ExplainX">8</a>）
- **09 · Claude Code 2.1.319：MCP 任务改为后台执行**：Claude Code 发布 2.1.319，MCP 工具调用改为后台任务执行，不再阻塞对话；同时新增 denyInsteadOfPrompting 权限选项并调整 /loop 命令。（参考：<a class="cite" href="https://aitoolsrecap.com/Blog/ai-news-november-08-2026" target="_blank" rel="noopener noreferrer" data-cite="9. Claude Code 2.1.319：MCP 任务改为后台执行｜AIToolsRecap">9</a>）
- **10 · OpenAI 找安全公司 Hacktron 做渗透测试**：OpenAI 与安全公司 Hacktron 合作，对其自家系统与集成做漏洞挖掘。（参考：<a class="cite" href="https://aitoolsrecap.com/Blog/ai-news-november-08-2026" target="_blank" rel="noopener noreferrer" data-cite="10. OpenAI 找安全公司 Hacktron 做渗透测试｜AIToolsRecap">10</a>）

## 核心论文

- **ODSA：测试时编排发现与自聚合**：让多个模型在测试时自行分工、互相聚合答案，在 Humanity's Last Exam 上比单模型提升 4.7–18.0 分。 <a class="cite" href="https://arxiv.org/abs/2611.11621" target="_blank" rel="noopener noreferrer" data-cite="11. ODSA：测试时编排发现与自聚合｜arXiv">11</a>
- **Ostinato：本地智能体的快速 CPU-GPU MoE 推理**：用 CPU+GPU 协同跑 MoE 模型，在 4 张 RTX 4090D 上跑通 DeepSeek-V4-Flash 级别的本地智能体推理。 <a class="cite" href="https://arxiv.org/abs/2611.11533" target="_blank" rel="noopener noreferrer" data-cite="12. Ostinato：本地智能体的快速 CPU-GPU MoE 推理｜arXiv">12</a>
- **LocateAnyMesh：用视觉语言模型做 3D 网格定位**：给定自然语言描述，在 3D 网格上定位对应部位/物体，把 VLM 的定位能力从 2D 图片扩展到 3D 模型。 <a class="cite" href="https://arxiv.org/abs/2611.11692" target="_blank" rel="noopener noreferrer" data-cite="13. LocateAnyMesh：用视觉语言模型做 3D 网格定位｜arXiv">13</a>
- **自驱动实验室的物理测试平台**：搭建了一个真实化学实验的智能体优化测试台，智能体优化器比贝叶斯优化最多少用 52% 的实验次数。 <a class="cite" href="https://arxiv.org/abs/2611.11690" target="_blank" rel="noopener noreferrer" data-cite="14. 自驱动实验室的物理测试平台｜arXiv">14</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://enjoy.dev/blog/claude-code-settings-local-json-secrets/" target="_blank" rel="noopener noreferrer">Claude Code 泄密：1,122 个公开仓库含真实密钥｜enjoy.dev</a>
- <span id="ref-2">2.</span> <a href="https://shiftdelete.net/en/arete-27b" target="_blank" rel="noopener noreferrer">Nous 发布 Arete-27B：把 Qwen 微调到去宣传化｜ShiftDelete</a>
- <span id="ref-3">3.</span> <a href="https://kimkj.com/en/ai-board-en/?mod=document&uid=21177" target="_blank" rel="noopener noreferrer">智元机器人第 10,000 台消费级人形机器人下线｜kimkj</a>
- <span id="ref-4">4.</span> <a href="https://nvidianews.nvidia.com/news/a-message-to-our-company" target="_blank" rel="noopener noreferrer">英伟达董事会启动对黄仁勋的独立调查｜NVIDIA News</a>
- <span id="ref-5">5.</span> <a href="https://blogs.nvidia.com/blog/korea-physical-ai-ecosystem/" target="_blank" rel="noopener noreferrer">英伟达宣布韩国主权 AI 与 Physical AI 一揽子合作｜NVIDIA Blog</a>
- <span id="ref-6">6.</span> <a href="https://hunch.net/?p=13764006" target="_blank" rel="noopener noreferrer">微软研究院 AI Frontiers 团队解散｜John Langford</a>
- <span id="ref-7">7.</span> <a href="https://chinafactor.news/2026/11/08/u-s-cleared-chinese-firm-with-empty-office-to-assemble-nvidia-h200-servers-nyt-reports/" target="_blank" rel="noopener noreferrer">NYT 调查：美商务部批准空壳公司组装英伟达 H200 芯片｜ChinaFactor（转述 NYT）</a>
- <span id="ref-8">8.</span> <a href="https://explainx.ai/blog/metr-anthropic-ai-rd-acceleration-twice-as-fast-80-percent-ai-redactions-claimed-vs-verified-2026" target="_blank" rel="noopener noreferrer">METR 评估：Anthropic 用 AI 搞研发提速约 2 倍｜ExplainX</a>
- <span id="ref-9">9.</span> <a href="https://aitoolsrecap.com/Blog/ai-news-november-08-2026" target="_blank" rel="noopener noreferrer">Claude Code 2.1.319：MCP 任务改为后台执行｜AIToolsRecap</a>
- <span id="ref-10">10.</span> <a href="https://aitoolsrecap.com/Blog/ai-news-november-08-2026" target="_blank" rel="noopener noreferrer">OpenAI 找安全公司 Hacktron 做渗透测试｜AIToolsRecap</a>
- <span id="ref-11">11.</span> <a href="https://arxiv.org/abs/2611.11621" target="_blank" rel="noopener noreferrer">ODSA：测试时编排发现与自聚合｜arXiv</a>
- <span id="ref-12">12.</span> <a href="https://arxiv.org/abs/2611.11533" target="_blank" rel="noopener noreferrer">Ostinato：本地智能体的快速 CPU-GPU MoE 推理｜arXiv</a>
- <span id="ref-13">13.</span> <a href="https://arxiv.org/abs/2611.11692" target="_blank" rel="noopener noreferrer">LocateAnyMesh：用视觉语言模型做 3D 网格定位｜arXiv</a>
- <span id="ref-14">14.</span> <a href="https://arxiv.org/abs/2611.11690" target="_blank" rel="noopener noreferrer">自驱动实验室的物理测试平台｜arXiv</a>
