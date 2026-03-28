---
title: 迭代记录
date: 2026-03-15 12:00:00
header: false
---
<div class="iteration-page">
<section class="iteration-intro-card">
<p>用于记录每次 GitHub 发布版本的核心改动，便于快速回溯和按日期查看每个版本的影响范围。</p>
</section>

<section class="iteration-rules-card">
<h2>记录规则</h2>
<ul>
<li>日期格式：<code>YYYY-MM-DD</code></li>
<li>每次发布写 3-6 条关键改动，聚焦“做了什么 + 影响什么”</li>
<li>不写过程性细节（如“调了参数”），只写结果性变化</li>
</ul>
</section>

<section class="iteration-timeline">
<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-28</h2>
<div class="iteration-entry-card">
<ul>
<li>PC 端页面壳层完成统一：首页、日报列表、笔记列表、详情页、迭代记录与简历页均切换为“标题行 + 左侧固定导航 + 右侧主内容区”结构，桌面端不再继续沿用抽屉式主菜单。</li>
<li>全站页面收尾完成：移动端顶部固定栏统一显示当前页面短名称，<code>迭代记录</code> 与 <code>简历</code> 正式纳入同一套页头与正文密度规则，桌面与移动端的页面节奏进一步对齐。</li>
<li>首页与日报列表的日报卡片口径统一改为 <code>今日主线</code>，卡片底部 <code>阅读全文</code> 区域和顶部 tabs 间距同步收紧；桌面端日报列表的月份标题改为左侧月份列，浏览长列表时层次更清晰。</li>
<li>详情页阅读体验继续压缩和减重：<code>关键信号</code> 改为最多 4 个轻量编号胶囊，移动端顶栏改为更浅的弱毛玻璃样式，回到顶部按钮、上一篇 / 下一篇切换与目录抽屉逻辑也一并收口。</li>
<li><code>resume</code> 页面标题统一修正为 <code>简历</code>，迭代记录页改为日期列 + 卡片内容的时间线展示；同时补充了全站 UI 回归测试，重新覆盖页头标题、卡片文案、桌面固定左栏和详情页信号展示等关键场景。</li>
</ul>
</div>
</article>

<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-25</h2>
<div class="iteration-entry-card">
<ul>
<li><code>爱范儿早报</code> 以“混合模式”接入主链路：先从早报栏目页发现当天 / 最近文章，再进入详情页按 <code>h3</code> 分段抽取简讯，并仅保留 AI 相关条目参与候选、交叉验证和平台背书。</li>
<li>早报 / 晚报标题与徽标规范统一：列表与详情页改为 <code>AI早报 / AI晚报 · MM.DD 周X</code> 展示，早报 badge 同步改为 <code>AI早报</code>，避免继续混用“AI日报”和完整日期格式。</li>
<li>日报生成时间语义修正：新生成内容的 <code>date</code> 现在写入任务实际完成时间，不再沿用固定 <code>06:00 / 19:40</code> 作为成稿时间，手动运行也不会显示未来时间。</li>
<li>晚报来源池继续补强并产出新样例：在扩充国内公开自动源的基础上，真实生成了 <code>evening-digest-2026-03-25</code>，首页与日报列表页均可直接走查最新晚报效果。</li>
<li>移动端详情页交互与排版继续收口：修复右上角目录菜单在 iPhone 上的跳转和禁滚问题，并收紧首页 Tab 区、详情分区标题与模块卡片之间的间距。</li>
</ul>
</div>
</article>

<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-23</h2>
<div class="iteration-entry-card">
<ul>
<li>早报 / 晚报 edition 架构正式收口：保留同一套 <code>digest</code> 引擎与页面结构，新增 <code>AI晚报</code> 产物与独立 workflow，并将早报默认运行时点延后到北京时间早 <code>06:05</code> 左右。</li>
<li>国内 AI 来源池明显扩充：补入 <code>AI-Bot</code>、<code>量子位</code>、<code>机器之心</code>、<code>雷锋网 AI</code>、<code>Qwen Blog</code>、<code>腾讯混元</code>、<code>智谱</code> 等晚报偏置来源，晚报候选抓取覆盖面从单一国内资讯站扩展到“媒体 + 官方更新页”混合结构。</li>
<li>事件级排序逻辑重构：新增统一 <code>scorecard</code>，显式纳入交叉验证、来源可信度、时效性、头部 AI 公司 / 模型命中、行业价值、edition 偏置等维度，并统一用于 topic 排序与成稿补位判断。</li>
<li><code>重点资讯</code> 规则增强：早报和晚报统一执行“至少 3 条重点资讯”，在正常多源门槛不足时，从高分 <code>其他快讯</code> 中回填，但继续排除纯社区 / newsletter 噪声条目。</li>
<li>聚类前预归并与链路可观测性增强：新增 same-day 近重复预归并，减少相同事件多次进入 LLM；同时补充 <code>cluster-chunk / topic-merge / shortlist / summary</code> 阶段日志，便于定位慢点和异常点。</li>
<li>智谱免费接口稳定性继续加固：LLM 调度改为跨进程全局串行、请求完成后再等待固定间隔，并落盘共享 pacing 状态，避免并行 <code>digest</code> 进程同时请求导致的 <code>429</code> 限流。</li>
<li>内容与管理体验补强：AI 笔记卡片摘要改为模型生成的整文概述，<code>admin</code> 在 <code>4000</code> 端口被占用时会自动回退到 <code>4001-4003</code>，迭代记录页重构为时间线卡片样式，便于持续回看每次发布的关键变化。</li>
</ul>
</div>
</article>

<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-19</h2>
<div class="iteration-entry-card">
<ul>
<li>日报标题显示规范统一为 <code>AI日报 · YYYY-MM-DD</code>，同步覆盖首页卡片、详情页头部、上一篇 / 下一篇导航与页面元信息，避免继续混用“人工智能日报”。</li>
<li>日报卡片与详情页统计口径统一：首页 <code>今日重点</code> 摘要去除重复序号与无关条目，<code>共 x 条记录</code> 按 <code>重点资讯 + 其他快讯 + 核心论文</code> 真实条数计算，详情页 <code>今日候选总数</code> 也恢复正确写入。</li>
<li>日报详情页格式化与文案清洗重做：恢复条目编号、修复异常标题与核心论文标题、移除会干扰排版的 <code>headerlink</code> 锚点，并将参考来源改为更紧凑的左对齐 chip 展示。</li>
<li>详情页阅读体验继续收口：压缩 <code>post-header</code> 造成的顶部空隙，恢复正文流式排版，并为 <code>重点资讯 / 其他快讯 / 核心论文</code> 增加独立浅底色块与模块间距。</li>
<li>目录定位修复：为日报区块标题和条目标题增加滚动偏移，点击目录后目标标题会出现在固定顶栏下方可视区域内，不再被页头遮挡。</li>
<li>笔记《关于AI的一些名词说明》一并入库并规范文件名，避免继续沿用带多余连字符的旧文件路径。</li>
</ul>
</div>
</article>

<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-15</h2>
<div class="iteration-entry-card">
<ul>
<li>前端架构切换为仓库内 <code>themes/next</code> 本地主题 Fork，移除对 npm <code>hexo-theme-next</code> 的依赖，并开启 <code>pjax</code>、关闭主题原生暗色模式，统一站点运行时与 UI 基线。</li>
<li>新增构建期展示数据层：为文章补充 <code>app_post_meta</code>，并生成首页最近 20 篇混合流、日报按月归档视图、笔记完整标签归档视图，首页 / 日报页 / 笔记页不再依赖默认分页结果临时拼装。</li>
<li>移动端导航重构为 <code>App Shell</code>：以顶部固定栏、左侧抽屉菜单、右侧目录抽屉替代旧首页 Tab 脚本与底部导航，支持首页、日报页、笔记页、详情页的统一标题与返回逻辑。</li>
<li>日报与笔记列表页改为专用模板渲染：首页支持 <code>全部 / AI 日报 / AI 笔记</code> 单页筛选，日报页支持按月份分组展示，笔记页支持完整标签单选筛选。</li>
<li>日报详情页新增构建期格式化与前端增强：提取候选总数、压缩历史关键信号、重组正文卡片结构，并接入目录抽屉与统一详情页样式。</li>
<li>项目协作文档与内容补充同步入库：新增仓库级 <code>AGENTS.md</code>、实施方案与视觉调整计划，并修复《AI 开发项目实践分享记录》中的代码块结构与文章资源目录图片引用。</li>
<li>修复 <code>cluster enrichment</code> 评分口径回归：保留卡片已有分数参与重算，恢复详情 enrich 与候选 enrich 的评分一致性，<code>digest</code> 测试重新全量通过。</li>
</ul>
</div>
</article>

<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-10</h2>
<div class="iteration-entry-card">
<ul>
<li>日报链路强化：新增 AI 相关性闸门与短关键词误匹配修复，降低非 AI 内容混入。</li>
<li>选题与摘要优化：增强聚类/选题评分、引用压缩与叙事完整性处理，减少模板化与断句。</li>
<li>LLM 调用稳定性提升：统一接入全局节流器，默认串行+最小间隔，重试退避更保守。</li>
<li>测试补强：新增 AI 相关性与话题评分回归用例，<code>digest</code> 测试集全量通过。</li>
<li>预处理重构：新闻池与论文池拆分，新闻时效窗口放宽，减少多源新闻在聚类前被误杀。</li>
<li>证据保留增强：前置去重改为合并证据元数据，历史过滤允许 follow-up 继续参与话题构建。</li>
<li>来源清洗加强：补充英文月份日期识别并过滤列表页锚点/根链接，减少旧公告与无效参考混入。</li>
<li>首页与文章页视觉升级：统一卡片质感、配色与标题层级，提升每日内容区分度与阅读聚焦。</li>
<li>交互优化：首页筛选 Tab 增加图标与更明确的激活态，移动端主菜单调整为底部固定导航。</li>
</ul>
</div>
</article>

<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-09</h2>
<div class="iteration-entry-card">
<ul>
<li>恢复并入库文章：<code>source/_posts/AI-开发项目实践分享记录.md</code>，避免继续编辑时丢稿。</li>
<li>工作流防误删：<code>digest</code> 自动提交从“全量 add <code>_posts</code>”改为“仅提交当日 digest + cache”，并新增非 digest 删除拦截。</li>
<li>菜单新增“迭代记录”入口，支持在站点直接查看每次迭代日期与核心改动。</li>
<li>抓取时效加强：为 <code>page_scrape/api_json</code> 来源补充发布时间推断，并在深读后再次执行时效过滤。</li>
<li>参考来源标题长度上限从 20 提升到 40，便于展示更完整标题信息。</li>
</ul>
</div>
</article>

<article class="iteration-entry">
<h2 class="iteration-entry-date">2026-03-08</h2>
<div class="iteration-entry-card">
<ul>
<li>优化日报内容结构：<code>重点资讯 + 其他快讯 + 小道消息 + 核心论文 + 参考来源</code>，并将核心论文固定在参考来源上方。</li>
<li>加强资讯生成清洗：去除模板化尾句、减少截断残句、提升标题可读性。</li>
<li>调整来源策略：关闭重复源 <code>techcrunch-newsletter</code>（默认禁用），保留 <code>TechCrunch AI</code> 作为主入口。</li>
<li>新增/改造公司官方渠道接入：MiniMax、Moonshot(Kimi)、DeepSeek、Seed(Bytedance)、阿里技术与阶跃星辰等来源接入链路补齐。</li>
<li>测试增强：补充公司官方源可运行性校验与重复 newsletter 默认关闭校验。</li>
</ul>
</div>
</article>
</section>
</div>
