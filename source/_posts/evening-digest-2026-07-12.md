---
title: "AI晚报 · 07.12 周日"
date: 2026-07-12 20:38:48
description: "今日主线：\n- OpenAI发布GPT-5.6三模型引发关注\n- 同时，量子计算辅助药物研发取得突破，AI批量造App埋下安全隐患"
categories: [每日资讯]
tags: [人工智能, 每日资讯, AI 晚报, 国内AI]
digest_edition: evening
digest_region: domestic
---

> 今日候选总数：33 条

> 主线：OpenAI发布GPT-5.6三模型引发关注，Anthropic澄清Claude Code使用误区，AI漫剧行业陷入“慢性死亡”。同时，量子计算辅助药物研发取得突破，AI批量造App埋下安全隐患，英国AI超算因高温宕机。

## 重点资讯

### 01 · AI漫剧行业从效率红利进入慢性死亡，产能过剩与政策挤压导致行业萎缩。

AI漫剧工厂创始人酱油在7个月后的访谈中表示，这个行业已经没有了。七个月前，他们还在讨论招3000到4000人，现在只剩下300人左右。Seedance 2.0的出现虽然大幅提升了效率，将制作周期从十几人一个月一部压缩到一个人一个月三四部，但也带来了供给爆炸和成本暴跌。在政策风向、平台流量和工具公司被大厂挤压的多重作用下，行业迅速从效率红利滑向慢性死亡。技术红利消退后，行业面临结构性调整，单纯追求产能已难以为继。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=27132" target="_blank" rel="noopener noreferrer" data-cite="6. 「这个行业已经没有了！」| 7个月后，十字路口再访AI漫剧创始人酱油｜AITNT 资讯">6</a>

### 02 · OpenAI推出GPT-5.6三档模型，定价策略更灵活

OpenAI于7月12日凌晨发布了GPT-5.6，一口气推出了Sol、Terra、Luna三个版本，分别对应旗舰、均衡和低成本三条线。这次发布最直观的变化是定价策略，Sol、Terra、Luna的输出价格分别是Sol的五分之一和二分之一，丰俭由人。核心差异主要体现在编码能力上，Sol在Artificial Analysis的Coding Agent Index上拿到了80分，Terra为77.4，Luna为74.6。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=27128" target="_blank" rel="noopener noreferrer" data-cite="2. 我把4个GPT模型拉去写同一个3 D网站，结果新模型被老旗舰反杀了｜AITNT 资讯">2</a>

### 03 · WorkBuddy团队分享Harness工程实践

WorkBuddy团队策略产品经理Anne分享了基于国产模型的Agent产品研发经验。文章指出，模型能力只是Agent可靠性的部分，工具接入、上下文组织、权限边界和结果验证同样重要。WorkBuddy通过前馈、反馈、权限、验证和编排机制，让Agent在复杂办公场景中能更稳定地完成任务。

参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=27141" target="_blank" rel="noopener noreferrer" data-cite="4. 万字复盘：从模型到可用Agent，Work Buddy的Harness工程是怎么做的？｜AITNT 资讯">4</a>

## 其他快讯

- **01 · Anthropic澄清Claude Code误区**：近期大量用户抱怨Claude Code变笨，经Anthropic官方澄清，问题出在Effort设置上。3月4日，为了压低延迟，Anthropic将Effort默认档位从high降到了medium。许多开发者误以为换更大的模型就能变聪明，但实际上Effort选项决定了AI的思考深度。（参考：<a class="cite" href="https://36kr.com/p/3892222176574211" target="_blank" rel="noopener noreferrer" data-cite="3. 全网骂Claude变笨，Anthropic下场揭秘：坑你的不是模型｜36Kr AI">3</a>）
- **02 · AI批量造App埋下安全隐患，Moltbook数据库配置错误导致数据裸奔。**：AI编程让“人人都能做App”成为现实，但Moltbook产品的配置错误暴露了安全隐患。安全研究机构发现，其Supabase数据库允许完整读写访问，150万个API令牌和3.5万个邮箱地址全部裸奔在公网上，任何人都能冒充平台上的AI代理账户篡改内容。（参考：<a class="cite" href="https://36kr.com/p/3892107686984581" target="_blank" rel="noopener noreferrer" data-cite="8. AI批量造App，也在批量埋雷｜36Kr AI">8</a>）
- **03 · 量子计算机与生成式AI结合，成功生成新型多肽，加速药物研发。**：丹麦技术大学团队成功展示了量子计算机如何提升生成式AI药物发现模型的准确性和覆盖范围。他们利用英国初创公司ORCA Computing制造的打印机大小量子计算机，与生成式AI模型协同工作，通过混合技术生成了能够与体内特定蛋白质结合的新型多肽。这一突破证明了量子计算在加速AI药物研发方面的潜力。（参考：<a class="cite" href="https://www.wired.com/story/scientists-using-ai-and-quantum-computing-to-generate-new-peptides/" target="_blank" rel="noopener noreferrer" data-cite="1. 科学家的副业？利用AI和量子计算生成新肽｜WIRED AI">1</a>）
- **04 · Paper2 Gal Game半年获得十万用户，独立开发者利用AI工具实现产品落地。**：Paper2GalGame开发者塔米基分享了半年内将论文变成Galgame软件的经验。从最初痛苦的环境配置，到利用AI辅助写代码和调试，他逐步完善了产品。目前该软件已有十万用户，并准备登陆Steam。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=27138" target="_blank" rel="noopener noreferrer" data-cite="5. 半年 10 万用户，我是怎么用 AI 做出 Paper2 Gal Game 的？｜AITNT 资讯">5</a>）
- **05 · 英国AI超算因高温宕机，气候变化模拟项目被迫暂停。**：6月底，英国遭遇有记录以来最热的六月，剑桥大学的Dawn超算因冷却系统热瘫，上千块GPU被迫休了一周多的高温假，350多个科研项目全线急刹。这台超算上跑着的项目就包括气候变化模拟，被全球变暖热晕的机器无法继续工作。（参考：<a class="cite" href="https://aitntnews.com/newDetail.html?newId=27130" target="_blank" rel="noopener noreferrer" data-cite="7. 全球最大数据中心黄了！美国电网卡住AI，Gobi X在中国戈壁破局｜AITNT 资讯">7</a>）
- **06 · AI辅助自闭症儿童沟通应用取得显著效果，但需警惕过度宣传风险。**：一位工程师为自闭症儿子制作了AI沟通应用App，两周内孩子识别能力提高一倍多，开始自发说话。然而，这种“医学奇迹”正在复刻硅谷的“坏血骗局”。OthersideAI CEO警告，世界将变得非常诡异，期待更多疯狂故事。（参考：<a class="cite" href="https://36kr.com/p/3889537577974536" target="_blank" rel="noopener noreferrer" data-cite="9. 被狂热追捧的AI「医疗神迹」，正在复刻硅谷「坏血骗局」｜36Kr AI">9</a>）

## 核心论文

- **实时交互视频生成模型**：Vidu S1支持语音控制数字角色动画，在消费级硬件上实现无限长、高帧率的实时视频生成，无需模糊或视觉失真。 <a class="cite" href="https://huggingface.co/papers/2607.03118" target="_blank" rel="noopener noreferrer" data-cite="12. Vidu S1: 实时交互视频生成模型｜Hugging Face 论文">12</a>
- **用于设备端语义音频生成的量化**：aria是一个依赖无关的原生运行时，通过量化和激活引导在普通GPU、CPU甚至树莓派5上高效运行Stable Audio 3的文本转音乐流程。 <a class="cite" href="https://huggingface.co/papers/2607.08526" target="_blank" rel="noopener noreferrer" data-cite="13. 用于设备端语义音频生成的量化原生运行时｜Hugging Face 论文">13</a>
- **阿拉伯语大语言模型中的方言能**：研究揭示了阿拉伯语模型中方言特定的神经表示，可在推理时进行操纵以控制方言输出，无需额外训练。 <a class="cite" href="https://huggingface.co/papers/2607.03936" target="_blank" rel="noopener noreferrer" data-cite="14. 阿拉伯语大语言模型中的方言能否像语言一样被引导？稀疏神经元与分布式方向｜Hugging Face 论文">14</a>
- **物理感知图像超分辨率**：将MRI超分辨率重新定义为物理感知重建问题，利用高斯溅射和先验感知表示动态调整分辨率-SNR配置。 <a class="cite" href="https://huggingface.co/papers/2607.06238" target="_blank" rel="noopener noreferrer" data-cite="15. Phy MRI-SR: 物理感知MRI图像超分辨率｜Hugging Face 论文">15</a>
- **长期代理主动记忆**：提出“行为状态衰减”概念，将记忆视为主动干预机制而非被动检索，解决长期任务中决策相关状态被埋没的问题。 <a class="cite" href="https://huggingface.co/papers/2607.08716" target="_blank" rel="noopener noreferrer" data-cite="11. Remember When It Matters: 长期代理主动记忆｜Hugging Face 论文">11</a>
- **重新审视视频理解评估**：诊断发现现有视频基准中一半无需视觉输入即可解决，揭示了当前视频理解模型的显著能力缺口。 <a class="cite" href="https://huggingface.co/papers/2603.29616" target="_blank" rel="noopener noreferrer" data-cite="10. Video-Oasis: 重新审视视频理解评估｜Hugging Face 论文">10</a>

## 参考来源

- <span id="ref-1">1.</span> <a href="https://www.wired.com/story/scientists-using-ai-and-quantum-computing-to-generate-new-peptides/" target="_blank" rel="noopener noreferrer">科学家的副业？利用AI和量子计算生成新肽｜WIRED AI</a>
- <span id="ref-2">2.</span> <a href="https://aitntnews.com/newDetail.html?newId=27128" target="_blank" rel="noopener noreferrer">我把4个GPT模型拉去写同一个3 D网站，结果新模型被老旗舰反杀了｜AITNT 资讯</a>
- <span id="ref-3">3.</span> <a href="https://36kr.com/p/3892222176574211" target="_blank" rel="noopener noreferrer">全网骂Claude变笨，Anthropic下场揭秘：坑你的不是模型｜36Kr AI</a>
- <span id="ref-4">4.</span> <a href="https://aitntnews.com/newDetail.html?newId=27141" target="_blank" rel="noopener noreferrer">万字复盘：从模型到可用Agent，Work Buddy的Harness工程是怎么做的？｜AITNT 资讯</a>
- <span id="ref-5">5.</span> <a href="https://aitntnews.com/newDetail.html?newId=27138" target="_blank" rel="noopener noreferrer">半年 10 万用户，我是怎么用 AI 做出 Paper2 Gal Game 的？｜AITNT 资讯</a>
- <span id="ref-6">6.</span> <a href="https://aitntnews.com/newDetail.html?newId=27132" target="_blank" rel="noopener noreferrer">「这个行业已经没有了！」| 7个月后，十字路口再访AI漫剧创始人酱油｜AITNT 资讯</a>
- <span id="ref-7">7.</span> <a href="https://aitntnews.com/newDetail.html?newId=27130" target="_blank" rel="noopener noreferrer">全球最大数据中心黄了！美国电网卡住AI，Gobi X在中国戈壁破局｜AITNT 资讯</a>
- <span id="ref-8">8.</span> <a href="https://36kr.com/p/3892107686984581" target="_blank" rel="noopener noreferrer">AI批量造App，也在批量埋雷｜36Kr AI</a>
- <span id="ref-9">9.</span> <a href="https://36kr.com/p/3889537577974536" target="_blank" rel="noopener noreferrer">被狂热追捧的AI「医疗神迹」，正在复刻硅谷「坏血骗局」｜36Kr AI</a>
- <span id="ref-10">10.</span> <a href="https://huggingface.co/papers/2603.29616" target="_blank" rel="noopener noreferrer">Video-Oasis: 重新审视视频理解评估｜Hugging Face 论文</a>
- <span id="ref-11">11.</span> <a href="https://huggingface.co/papers/2607.08716" target="_blank" rel="noopener noreferrer">Remember When It Matters: 长期代理主动记忆｜Hugging Face 论文</a>
- <span id="ref-12">12.</span> <a href="https://huggingface.co/papers/2607.03118" target="_blank" rel="noopener noreferrer">Vidu S1: 实时交互视频生成模型｜Hugging Face 论文</a>
- <span id="ref-13">13.</span> <a href="https://huggingface.co/papers/2607.08526" target="_blank" rel="noopener noreferrer">用于设备端语义音频生成的量化原生运行时｜Hugging Face 论文</a>
- <span id="ref-14">14.</span> <a href="https://huggingface.co/papers/2607.03936" target="_blank" rel="noopener noreferrer">阿拉伯语大语言模型中的方言能否像语言一样被引导？稀疏神经元与分布式方向｜Hugging Face 论文</a>
- <span id="ref-15">15.</span> <a href="https://huggingface.co/papers/2607.06238" target="_blank" rel="noopener noreferrer">Phy MRI-SR: 物理感知MRI图像超分辨率｜Hugging Face 论文</a>
