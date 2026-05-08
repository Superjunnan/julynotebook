import test from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const latestDailyTitle = "AI早报 · 05.07 周四";

let cachedPages;
let buildPromise;

function buildAndReadPages() {
  if (cachedPages) return Promise.resolve(cachedPages);
  if (buildPromise) return buildPromise;

  buildPromise = Promise.resolve().then(() => {
    execSync("rm -rf public db.json && npm run build", {
      cwd: repoRoot,
      stdio: "pipe",
      encoding: "utf-8",
    });

    cachedPages = {
      home: readFileSync(path.join(repoRoot, "public/index.html"), "utf-8"),
      daily: readFileSync(
        path.join(repoRoot, "public/2026/05/07/digest-2026-05-07/index.html"),
        "utf-8"
      ),
      daily0422: readFileSync(
        path.join(repoRoot, "public/2026/04/22/digest-2026-04-22/index.html"),
        "utf-8"
      ),
      evening0329: readFileSync(
        path.join(repoRoot, "public/2026/03/29/evening-digest-2026-03-29/index.html"),
        "utf-8"
      ),
      dailyList: readFileSync(
        path.join(repoRoot, "public/categories/daily-news/index.html"),
        "utf-8"
      ),
      notesList: readFileSync(
        path.join(repoRoot, "public/categories/july-notes/index.html"),
        "utf-8"
      ),
      note: readFileSync(
        path.join(repoRoot, "public/2026/03/16/关于AI的一些名词说明/index.html"),
        "utf-8"
      ),
      iteration: readFileSync(
        path.join(repoRoot, "public/iteration-log/index.html"),
        "utf-8"
      ),
      resume: readFileSync(
        path.join(repoRoot, "public/resume/index.html"),
        "utf-8"
      ),
      appShell: readFileSync(
        path.join(repoRoot, "source/js/app-shell.js"),
        "utf-8"
      ),
      postLayout: readFileSync(
        path.join(repoRoot, "source/js/post-layout.js"),
        "utf-8"
      ),
      css: readFileSync(path.join(repoRoot, "public/css/main.css"), "utf-8"),
    };

    return cachedPages;
  });

  return buildPromise;
}

test("首页日报卡片摘要只展示真实资讯标题且不重复序号", async () => {
  const { home } = await buildAndReadPages();
  const cardStart = home.indexOf(latestDailyTitle);
  assert.notEqual(cardStart, -1);
  const cardHtml = home.slice(cardStart, cardStart + 2200);

  assert.match(cardHtml, /<ol class="daily-highlights-list">/);
  assert.doesNotMatch(cardHtml, /<li>01 · /);
  assert.doesNotMatch(cardHtml, /<li>核心论文<\/li>/);
  assert.doesNotMatch(cardHtml, /<li>参考来源<\/li>/);
});

test("首页与详情页早报标题统一显示为AI早报，并使用月日加星期格式", async () => {
  const { home, daily } = await buildAndReadPages();

  assert.match(home, /AI早报 · 05\.07 周四/);
  assert.doesNotMatch(home, /AI日报 · 2026-05-07/);
  assert.match(home, /class="app-card__badge">AI早报</);
  assert.match(daily, /AI早报 · 05\.07 周四/);
  assert.doesNotMatch(daily, /人工智能日报 · 2026-05-07/);
  assert.match(daily, /class="app-card__badge">AI早报</);
  assert.match(daily, /rel="prev"[^>]*title="AI晚报 · 05\.06 周三"/);
});

test("首页日报卡片条数统计应等于重点资讯、其他快讯和核心论文总和", async () => {
  const { home } = await buildAndReadPages();
  const cardStart = home.indexOf(latestDailyTitle);
  assert.notEqual(cardStart, -1);
  const cardHtml = home.slice(cardStart, cardStart + 2200);

  assert.match(cardHtml, /共 21 条记录/);
});

test("日报详情页展示正确的候选总数且不保留异常标题", async () => {
  const { daily } = await buildAndReadPages();

  assert.match(daily, /今日候选总数：\d+ 条/);
  assert.doesNotMatch(daily, /今日候选总数：0 条/);
  assert.match(daily, /class="daily-section-title"[^>]*>重点资讯</);
  assert.match(daily, /class="daily-section-title"[^>]*>其他快讯</);
  assert.match(daily, /class="daily-section-title"[^>]*>核心论文</);
  assert.match(daily, /<h3 class="daily-news-card-title" id="01-·-苹果将支付2-5亿美元和解Siri延迟AI功能的诉讼">01 · 苹果将支付2\.5亿美元和解Siri延迟AI功能的诉讼<\/h3>/);
});

test("日报详情页参考来源应使用间距分隔而非顿号", async () => {
  const { daily } = await buildAndReadPages();

  assert.match(daily, /daily-news-card-refs/);
  assert.doesNotMatch(daily, /AIBase<\/a>、<a class="cite"/);
  assert.doesNotMatch(daily, /36Kr AI<\/a>、<a class="cite"/);
});

test("2026-04-22 日报详情页应展示完整标题而不是残缺前缀", async () => {
  const { daily0422 } = await buildAndReadPages();

  assert.match(daily0422, /OpenAI最强对手，被亚马逊追投2249亿/);
  assert.match(daily0422, /Anthropic逼急谷歌，布林下场亲自督战，组“追杀队”围剿Claude/);
  assert.match(daily0422, /09 · 谷歌重组Gemini编程团队追赶Claude/);
  assert.match(daily0422, /10 · Anthropic累计融资承诺最高升至330亿美元/);
  assert.match(daily0422, /11 · 布林回到一线督战谷歌编程攻坚战/);
  assert.match(daily0422, /01 · 社交网格：具身多智能体系统中规划与社交推理的基准/);
  assert.match(daily0422, /02 · 面向程序化超声理解的视频问答基准/);
  assert.doesNotMatch(daily0422, /10 · OpenAI最强对手<\/h3>/);
  assert.doesNotMatch(daily0422, /11 · Anthropic逼急谷歌<\/h3>/);
  assert.doesNotMatch(daily0422, /01 · 社交网格：具身多智能体系统中<\/h3>/);
});

test("03-29 晚报应展示真实论文引用，而不是空论文占位或伪论文标题", async () => {
  const { evening0329 } = await buildAndReadPages();

  assert.match(evening0329, /核心论文/);
  assert.doesNotMatch(evening0329, /当日无优质论文|今日暂无有价值论文更新/);
  assert.match(evening0329, /Vision2Web：面向视觉网站开发的分层基准与智能体验证｜arXiv cs\.AI/);
  assert.match(evening0329, /GazeQwen：面向流媒体视频理解的轻量级注视条件调制｜arXiv cs\.AI/);
  assert.doesNotMatch(evening0329, /arXiv 2603\.\d+ 论文进展/);
  assert.doesNotMatch(evening0329, /Dreamina Seedance 2\.0登陆CapCut｜36Kr AI/);
});

test("日报详情页内容布局应保持旧版流式排版并收紧页头间距", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.detail-page \.post-header\s*\{[^}]*margin-bottom:\s*12px;/);
  assert.match(css, /\.daily-news-card\s*\{[^}]*padding:\s*0;[^}]*border-radius:\s*0;[^}]*background:\s*transparent;[^}]*box-shadow:\s*none;/);
  assert.match(css, /\.daily-news-card-refs\s*\{[^}]*flex-direction:\s*row;[^}]*align-items:\s*center;/);
  assert.match(css, /\.refs-chips\s*\{[^}]*display:\s*inline-flex;/);
});

test("日报详情页卡片标题不应再插入会干扰布局的headerlink锚点", async () => {
  const { daily } = await buildAndReadPages();

  assert.doesNotMatch(daily, /class="daily-section-title"[^>]*><a href="#[^"]+" class="headerlink"/);
  assert.doesNotMatch(daily, /class="daily-news-card-title"[^>]*><a href="#[^"]+" class="headerlink"/);
});

test("日报详情页条目标题应使用普通流式排版而不是flex标题容器", async () => {
  const { css, daily } = await buildAndReadPages();

  assert.match(css, /\.daily-news-card-title\s*\{[^}]*display:\s*block;/);
  assert.doesNotMatch(css, /\.daily-news-card-title\s*\{[^}]*align-items:\s*baseline/);
  assert.doesNotMatch(css, /\.daily-news-card-title\s*\{[^}]*gap:\s*6px/);
  assert.doesNotMatch(daily, /daily-news-card-title__index/);
  assert.doesNotMatch(daily, /daily-news-card-title__dot/);
  assert.doesNotMatch(daily, /daily-news-card-title__text/);
});

test("日报详情页分区应由整块底色色块包裹并通过间距区分模块", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.daily-section-block\s*\{[^}]*padding:\s*14px 16px 18px;[^}]*border-radius:\s*18px;[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.72\);/);
  assert.match(css, /\.daily-section-block \+ \.daily-section-block\s*\{[^}]*margin-top:\s*16px/);
});

test("日报详情页目录定位应通过scroll-margin-top确保标题进入可视区顶部", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.daily-section-title\s*\{[^}]*margin-top:\s*0 !important;[^}]*margin-bottom:\s*0\.25em !important;/);
  assert.match(css, /\.daily-section-title\s*\{[^}]*scroll-margin-top:\s*calc\(56px \+ env\(safe-area-inset-top,\s*0px\) \+ 14px\)/);
  assert.match(css, /\.daily-news-card-title\s*\{[^}]*scroll-margin-top:\s*calc\(56px \+ env\(safe-area-inset-top,\s*0px\) \+ 14px\)/);
});

test("详情页标题应左对齐并缩小图标与标题间距，避免被默认居中规则拉开", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.detail-page \.post-title\s*\{[^}]*text-align:\s*left !important;/);
  assert.match(css, /\.app-detail-header\s*\{[^}]*justify-content:\s*flex-start;[^}]*gap:\s*6px;|\.app-detail-header\s*\{[^}]*gap:\s*6px;[^}]*justify-content:\s*flex-start;/);
});

test("AI笔记文章应进入AI笔记列表，并在正文页使用统一的卡片式头部布局", async () => {
  const { notesList, note } = await buildAndReadPages();

  assert.match(notesList, /关于AI 的一些名词说明/);
  assert.match(note, /class="app-card__header app-card--note app-detail-header"/);
  assert.match(note, /class="app-card__badge">AI 笔记</);
  assert.match(note, /id="busuanzi_container_page_pv"/);
});

test("AI笔记详情页顶部固定栏标题应显示AI 笔记而不是文章标题或AI 笔记正文", async () => {
  const { appShell } = await buildAndReadPages();

  const notePostBranch = appShell.match(/case 'note-post':\s*return '([^']+)'/);
  assert.notEqual(notePostBranch, null);
  assert.equal(notePostBranch?.[1], "AI 笔记");
  assert.doesNotMatch(appShell, /case 'note-post':\s*return 'AI 笔记正文'/);
});

test("AI笔记卡片概述应使用整篇总结，不再直接暴露正文标题层级", async () => {
  const { notesList } = await buildAndReadPages();

  const glossaryCardStart = notesList.indexOf("关于AI 的一些名词说明");
  assert.notEqual(glossaryCardStart, -1);
  const glossaryCard = notesList.slice(glossaryCardStart, glossaryCardStart + 1200);
  assert.doesNotMatch(glossaryCard, /一、基础概念/);
  assert.match(glossaryCard, /文章概述：/);

  const practiceCardStart = notesList.indexOf("AI 开发项目实践分享学习");
  assert.notEqual(practiceCardStart, -1);
  const practiceCard = notesList.slice(practiceCardStart, practiceCardStart + 1200);
  assert.doesNotMatch(practiceCard, /主要流程介绍/);
  assert.match(practiceCard, /文章概述：/);
});

test("首页日报与笔记徽标应复用统一高度，不再出现一个过扁一个过高", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.app-card__badge\s*\{[^}]*display:\s*inline-flex;[^}]*min-height:\s*30px;[^}]*padding:\s*0 12px;/);
  assert.doesNotMatch(css, /\.app-card--daily \.app-card__badge\s*\{[^}]*padding:/);
  assert.doesNotMatch(css, /\.app-card--note \.app-card__badge\s*\{[^}]*padding:/);
});

test("首页和日报列表卡片应统一使用今日主线口径而不是今日重点", async () => {
  const { home, dailyList } = await buildAndReadPages();

  assert.match(home, /今日主线：/);
  assert.match(dailyList, /今日主线：/);
  assert.doesNotMatch(home, /今日重点：/);
  assert.doesNotMatch(dailyList, /今日重点：/);
});

test("首页日报卡片应优先显示引用里的中文标题而不是泛化占位标题", async () => {
  const { home } = await buildAndReadPages();
  const cardStart = home.indexOf(latestDailyTitle);
  assert.notEqual(cardStart, -1);
  const cardHtml = home.slice(cardStart, cardStart + 2200);

  assert.match(cardHtml, /苹果将支付2\.5亿美元和解Siri延迟AI功能的诉讼/);
  assert.match(cardHtml, /DeepSeek首轮融资或达450亿美元估值/);
  assert.doesNotMatch(cardHtml, /海外科技媒体动态 3/);
  assert.doesNotMatch(cardHtml, /海外科技媒体动态 1/);
});

test("首页与列表卡片底部阅读全文区域应收紧间距以提升屏幕效率", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.app-card__footer\s*\{[^}]*gap:\s*10px;[^}]*margin-top:\s*14px;[^}]*font-size:\s*0\.8rem;/);
  assert.match(css, /\.app-card__footer-arrow\s*\{[^}]*font-size:\s*0\.8rem;[^}]*line-height:\s*1\.1/);
});

test("首页顶部 tabs 与内容列表之间的间距应收紧", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.app-view-home\s*\{[^}]*gap:\s*14px/);
  assert.match(css, /\.home-top-tabs\.app-tab-strip[^{}]*\{[^}]*padding:\s*2px 0 2px/);
});

test("移动端顶部固定栏应保持浅底弱化样式，不再回到主题默认黑底", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.site-brand-container\s*\{[^}]*min-height:\s*56px !important;[^}]*background:\s*rgba\(247,\s*248,\s*250,\s*0\.88\) !important;[^}]*backdrop-filter:\s*blur\(14px\)/);
});

test("桌面端应使用统一内容容器布局，标题行独立于左侧固定导航和右侧主内容区", async () => {
  const { css, appShell, dailyList, notesList } = await buildAndReadPages();

  assert.match(css, /@media \(min-width: 1024px\)/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*body\s*\{[\s\S]*padding-top:\s*0 !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.main\s*\{[\s\S]*display:\s*block !important;[\s\S]*width:\s*calc\(100% - 64px\) !important;[\s\S]*max-width:\s*1180px !important;[\s\S]*margin:\s*20px auto 0 !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.column\s*\{[\s\S]*display:\s*none !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-desktop-shell\s*\{[\s\S]*display:\s*grid !important;[\s\S]*grid-template-columns:\s*196px minmax\(0,\s*1fr\);[\s\S]*column-gap:\s*12px;[\s\S]*align-items:\s*start;[\s\S]*width:\s*100% !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-desktop-content-shell\s*\{[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;[\s\S]*gap:\s*16px;[\s\S]*min-width:\s*0;[\s\S]*width:\s*100%;[\s\S]*align-self:\s*stretch;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.site-brand-container\s*\{[\s\S]*position:\s*static !important;[\s\S]*width:\s*calc\(100% - 208px\) !important;[\s\S]*max-width:\s*none !important;[\s\S]*margin:\s*0 0 16px auto !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.site-brand-container \.site-meta\s*\{[\s\S]*width:\s*100% !important;[\s\S]*justify-content:\s*center;[\s\S]*padding:\s*0 !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.site-meta \.brand\s*\{[\s\S]*position:\s*static !important;[\s\S]*top:\s*auto !important;[\s\S]*left:\s*auto !important;[\s\S]*transform:\s*none !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-drawer\s*\{[\s\S]*position:\s*sticky;[\s\S]*top:\s*0;[\s\S]*width:\s*196px;[\s\S]*padding:\s*0;[\s\S]*border-radius:\s*18px;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-mask\s*\{[\s\S]*display:\s*none !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-header-action-left,\s*\.app-header-action-secondary\s*\{[\s\S]*display:\s*none !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.main-inner\s*\{[\s\S]*width:\s*100% !important;[\s\S]*max-width:\s*none !important;[\s\S]*margin:\s*0 !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.content-wrap\s*\{[\s\S]*max-width:\s*none !important;[\s\S]*margin:\s*0 !important;[\s\S]*padding:\s*0 0 36px !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-view-home,\s*\.app-list-shell,\s*body\.app-view-iteration-log \.iteration-page\s*\{[\s\S]*width:\s*100% !important;[\s\S]*max-width:\s*none !important;[\s\S]*margin:\s*0 !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.footer\s*\{[\s\S]*width:\s*calc\(100% - 64px\) !important;[\s\S]*max-width:\s*1180px !important;[\s\S]*margin:\s*18px auto 0 !important;/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.footer-inner\s*\{[\s\S]*width:\s*calc\(100% - 208px\) !important;[\s\S]*max-width:\s*none !important;[\s\S]*margin-left:\s*auto !important;[\s\S]*padding:\s*0 0 18px !important;[\s\S]*align-items:\s*center;[\s\S]*text-align:\s*center;/);
  assert.match(dailyList, /class="main-inner category category-app-list"/);
  assert.match(notesList, /class="main-inner category category-app-list"/);
  assert.doesNotMatch(dailyList, /class="main-inner category posts-collapse"/);
  assert.doesNotMatch(notesList, /class="main-inner category posts-collapse"/);
  assert.match(appShell, /function 确保桌面内容容器/);
});

test("AI日报和AI笔记列表页不应保留主题默认的浅色竖向时间线", async () => {
  const { css, dailyList, notesList } = await buildAndReadPages();

  assert.match(css, /\.category\.category-app-list > \.app-list-shell\s*\{[^}]*margin:\s*0 !important;[^}]*padding:\s*0 !important;/);
  assert.match(css, /\.main-inner\.category\.category-app-list > \.post-block > \.post-content::before,\s*\.main-inner\.category\.category-app-list > \.post-block > \.post-content:before\s*\{[^}]*display:\s*none !important;[^}]*content:\s*none !important;/);
  assert.match(css, /\.posts-collapse \.collection-year::before,\s*\.posts-collapse \.collection-year:before,\s*\.posts-collapse \.post-content \.collection-year::before,\s*\.posts-collapse \.post-content \.collection-year:before,\s*\.posts-collapse \.collection-year::after,\s*\.posts-collapse \.collection-year:after,\s*\.posts-collapse \.post-content \.collection-year::after,\s*\.posts-collapse \.post-content \.collection-year:after\s*\{[^}]*content:\s*none !important;[^}]*display:\s*none !important;/);
  assert.match(css, /body\.app-view-daily-list \.post-content::before,\s*body\.app-view-daily-list \.post-content:before,\s*body\.app-view-daily-list \.post-content::after,\s*body\.app-view-daily-list \.post-content:after,\s*body\.app-view-daily-list \.collection-year::before,\s*body\.app-view-daily-list \.collection-year:before,\s*body\.app-view-daily-list \.post-content \.collection-year::before,\s*body\.app-view-daily-list \.post-content \.collection-year:before,\s*body\.app-view-daily-list \.collection-year::after,\s*body\.app-view-daily-list \.collection-year:after,\s*body\.app-view-daily-list \.post-content \.collection-year::after,\s*body\.app-view-daily-list \.post-content \.collection-year:after/);
  assert.match(css, /body\.app-view-note-list \.post-content::before,\s*body\.app-view-note-list \.post-content:before,\s*body\.app-view-note-list \.post-content::after,\s*body\.app-view-note-list \.post-content:after,\s*body\.app-view-note-list \.collection-year::before,\s*body\.app-view-note-list \.collection-year:before,\s*body\.app-view-note-list \.post-content \.collection-year::before,\s*body\.app-view-note-list \.post-content \.collection-year:before,\s*body\.app-view-note-list \.collection-year::after,\s*body\.app-view-note-list \.collection-year:after,\s*body\.app-view-note-list \.post-content \.collection-year::after,\s*body\.app-view-note-list \.post-content \.collection-year:after/);
  assert.doesNotMatch(dailyList, /posts-collapse/);
  assert.doesNotMatch(notesList, /posts-collapse/);
});

test("桌面端AI日报列表月份标题应左对齐展示在对应内容列表顶部", async () => {
  const { css } = await buildAndReadPages();

  // .app-view-daily and .app-view-notes share a combined flex rule in compiled CSS
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.category\.category-app-list \.app-view-daily[^{]*\{[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;[\s\S]*gap:\s*18px/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.category\.category-app-list \.app-view-daily \.app-month-group\s*\{[\s\S]*display:\s*block;[\s\S]*width:\s*100%;[\s\S]*margin:\s*0;[\s\S]*padding-left:\s*0/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.category\.category-app-list \.app-view-daily \.app-month-title\s*\{[\s\S]*margin:\s*0 0 16px;[\s\S]*position:\s*static;[\s\S]*left:\s*auto;[\s\S]*top:\s*auto;[\s\S]*width:\s*auto;[\s\S]*padding-top:\s*0;[\s\S]*text-align:\s*left;/);
});

test("PC 固定左栏应与右侧内容容器顶部对齐，并且迭代记录页首块不应保留额外顶部留白", async () => {
  const { css, iteration } = await buildAndReadPages();

  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-desktop-shell\s*\{[\s\S]*column-gap:\s*12px/);
  assert.match(css, /@media \(min-width: 1024px\)\s*\{[\s\S]*\.app-drawer\s*\{[\s\S]*top:\s*0;[\s\S]*width:\s*196px;[\s\S]*padding:\s*0;/);
  assert.match(css, /body\.app-view-iteration-log \.post-block:first-of-type\s*\{[^}]*padding-top:\s*0 !important;/);
  assert.match(iteration, /class="iteration-page"/);
});

test("桌面端迭代记录时间线应使用日期列加内容列布局，日期顶部与卡片顶部对齐", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /body\.app-view-iteration-log \.iteration-timeline\s*\{[^}]*padding-left:\s*0/);
  assert.match(css, /body\.app-view-iteration-log \.iteration-entry\s*\{[^}]*display:\s*grid;[^}]*grid-template-columns:\s*96px minmax\(0,\s*1fr\);[^}]*column-gap:\s*18px/);
  assert.match(css, /body\.app-view-iteration-log \.iteration-entry-date\s*\{[^}]*margin:\s*0;[^}]*padding-right:\s*18px;[^}]*text-align:\s*right/);
});

test("详情页关键信号应仅保留更轻量的编号提示", async () => {
  const { css, postLayout } = await buildAndReadPages();

  assert.match(postLayout, /条目列表\.slice\(0,\s*4\)/);
  assert.match(css, /\.digest-signal-chip\s*\{[^}]*min-width:\s*24px;[^}]*height:\s*20px;[^}]*padding:\s*0 6px;[^}]*font-size:\s*0\.68em;[^}]*letter-spacing:\s*0\.04em;/);
});

test("详情页正文在桌面固定左栏模式下不应因 use-motion 而保持隐藏", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.detail-page \.post-block\s*\{[^}]*visibility:\s*visible !important;[^}]*opacity:\s*1 !important;/);
  assert.match(css, /\.detail-page \.post-header\s*\{[^}]*visibility:\s*visible !important;[^}]*opacity:\s*1 !important;/);
  assert.match(css, /\.detail-page \.post-body\s*\{[^}]*visibility:\s*visible !important;[^}]*opacity:\s*1 !important;/);
});

test("目录点击逻辑应先关闭抽屉恢复滚动，再按页头偏移滚动到目标标题", async () => {
  const { appShell } = await buildAndReadPages();

  assert.match(appShell, /目录抽屉\.addEventListener\('click'/);
  assert.match(appShell, /关闭所有抽屉\(\)/);
  assert.match(appShell, /window\.setTimeout\(/);
  assert.match(appShell, /window\.history\.replaceState/);
  assert.doesNotMatch(appShell, /window\.location\.hash = hash/);
  assert.match(appShell, /scrollIntoView/);
});

test("页头操作按钮应挂到品牌容器内，并通过固定像素定位对齐内容边缘", async () => {
  const { appShell, css } = await buildAndReadPages();

  assert.match(appShell, /定位容器\.appendChild\(左按钮\)/);
  assert.match(appShell, /定位容器\.appendChild\(右按钮\)/);
  assert.match(appShell, /定位容器\.appendChild\(次按钮\)/);
  assert.doesNotMatch(css, /\.app-header-action-left[\s\S]*calc\(50vw - /);
  assert.doesNotMatch(css, /\.app-header-action-right[\s\S]*calc\(50vw - /);
  // Buttons use fixed px offset to align with content-wrap padding (16px)
  assert.match(css, /\.app-header-action-left\s*\{[^}]*left:\s*16px/);
  assert.match(css, /\.app-header-action-right\s*\{[^}]*right:\s*16px/);
});

test("首页外的主列表页左侧应显示菜单按钮而不是返回上一页", async () => {
  const { appShell } = await buildAndReadPages();

  assert.match(appShell, /view === 'home' \|\| view === 'daily-list' \|\| view === 'note-list' \|\| view === 'iteration-log' \|\| view === 'resume'/);
  const 菜单分支起点 = appShell.indexOf("view === 'home' || view === 'daily-list' || view === 'note-list' || view === 'iteration-log' || view === 'resume'");
  assert.notEqual(菜单分支起点, -1);
  const 菜单分支片段 = appShell.slice(菜单分支起点, 菜单分支起点 + 280);
  assert.match(菜单分支片段, /打开菜单/);
  assert.doesNotMatch(菜单分支片段, /返回上一页/);
});

test("详情页目录按钮应保留可点击层级并允许切换打开目录抽屉", async () => {
  const { appShell, css } = await buildAndReadPages();

  assert.match(appShell, /querySelector\('\.post-toc, \.nav'\)/);
  assert.match(appShell, /const 已打开 = 目录抽屉\.classList\.contains\('app-drawer-open'\)/);
  assert.match(appShell, /已打开 \? 关闭所有抽屉\(\) : 打开抽屉\(目录抽屉, 遮罩层\)/);
  assert.match(css, /\.site-brand-container \.app-header-action\s*\{[^}]*z-index:\s*1080/);
  assert.match(css, /\.site-meta \.brand\s*\{[^}]*pointer-events:\s*none/);
});

test("迭代记录页应去除重复主标题并改为日期时间线卡片", async () => {
  const { iteration, css } = await buildAndReadPages();

  assert.doesNotMatch(iteration, /<h1[^>]*>\s*迭代记录\s*<\/h1>/);
  assert.match(iteration, /class="iteration-page"/);
  assert.match(iteration, /class="iteration-entry-card"/);
  assert.match(css, /\.iteration-timeline::before\s*\{/);
  assert.match(css, /\.iteration-entry-card\s*\{/);
});

test("简历页标题应统一为简历，不再保留测试态页面名称", async () => {
  const { resume, appShell } = await buildAndReadPages();

  assert.doesNotMatch(resume, /这是我的简历测试页面/);
  assert.match(resume, /<title>\s*简历/);
  assert.match(resume, /content="简历"/);
  assert.match(appShell, /case 'resume':\s*return '简历'/);
});

test("上一篇下一篇切换应显式标记回到页顶，避免切页后停留在底部", async () => {
  const { daily, appShell } = await buildAndReadPages();

  assert.match(daily, /rel="prev"[^>]*data-scroll-top="true"/);
  assert.match(appShell, /app-scroll-top-on-next-page/);
  assert.match(appShell, /window\.scrollTo\(\{\s*top:\s*0/);
});

test("首页列表页和详情页应重新启用浅色半透明的回到顶部按钮", async () => {
  const { home, daily, css } = await buildAndReadPages();

  assert.match(home, /class="back-to-top/);
  assert.match(daily, /class="back-to-top/);
  assert.doesNotMatch(css, /\.back-to-top,\s*\n\s*\.site-nav,\s*\n\s*\.site-author-name\s*\n\s*display none !important/);
  assert.match(css, /\.back-to-top\s*\{[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.72\)/);
  assert.match(css, /\.back-to-top\.back-to-top-on\s*\{[^}]*opacity:\s*1/);
});

test("首页查看全部按钮应去掉黑色链接线并保持纯色块按钮样式", async () => {
  const { css } = await buildAndReadPages();

  assert.match(css, /\.home-action-link\s*\{[^}]*border-bottom:\s*none !important;[^}]*border:\s*none !important;/);
  assert.match(css, /\.home-action-link:hover\s*\{[^}]*border-bottom:\s*none !important;[^}]*text-decoration:\s*none !important;/);
});
