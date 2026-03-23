import test from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

let cachedPages;
let buildPromise;

function buildAndReadPages() {
  if (cachedPages) return Promise.resolve(cachedPages);
  if (buildPromise) return buildPromise;

  buildPromise = Promise.resolve().then(() => {
    execSync("npm run clean && npm run build", {
      cwd: repoRoot,
      stdio: "pipe",
      encoding: "utf-8",
    });

    cachedPages = {
      home: readFileSync(path.join(repoRoot, "public/index.html"), "utf-8"),
      daily: readFileSync(
        path.join(repoRoot, "public/2026/03/19/digest-2026-03-19/index.html"),
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
      appShell: readFileSync(
        path.join(repoRoot, "source/js/app-shell.js"),
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
  const cardStart = home.indexOf("AI日报 · 2026-03-19");
  assert.notEqual(cardStart, -1);
  const cardHtml = home.slice(cardStart, cardStart + 2200);

  assert.match(cardHtml, /<ol class="daily-highlights-list">/);
  assert.doesNotMatch(cardHtml, /<li>01 · /);
  assert.doesNotMatch(cardHtml, /<li>核心论文<\/li>/);
  assert.doesNotMatch(cardHtml, /<li>参考来源<\/li>/);
});

test("首页与详情页日报标题统一显示为AI日报", async () => {
  const { home, daily } = await buildAndReadPages();

  assert.match(home, /AI日报 · 2026-03-19/);
  assert.doesNotMatch(home, /人工智能日报 · 2026-03-19/);
  assert.match(daily, /AI日报 · 2026-03-19/);
  assert.doesNotMatch(daily, /人工智能日报 · 2026-03-19/);
  assert.match(daily, /rel="prev" title="AI日报 · 2026-03-18"/);
  assert.doesNotMatch(daily, /rel="prev" title="人工智能日报 · 2026-03-18"/);
});

test("首页日报卡片条数统计应等于重点资讯、其他快讯和核心论文总和", async () => {
  const { home } = await buildAndReadPages();
  const cardStart = home.indexOf("AI日报 · 2026-03-19");
  assert.notEqual(cardStart, -1);
  const cardHtml = home.slice(cardStart, cardStart + 2200);

  assert.match(cardHtml, /共 10 条记录/);
});

test("日报详情页展示正确的候选总数且不保留异常标题", async () => {
  const { daily } = await buildAndReadPages();

  assert.match(daily, /今日候选总数：445 条/);
  assert.doesNotMatch(daily, /今日候选总数：0 条/);
  assert.doesNotMatch(daily, />\. &amp; : 通过验证迈向重型研究代理</);
  assert.match(daily, /<h3 class="daily-news-card-title" id="01-·-Anthropic-Dispatch让AI">01 · 你的电脑已被手机接管，Anthropic亮出Dispatch<\/h3>/);
  assert.match(daily, /<h3 class="daily-news-card-title" id="02-·-英伟达DLSS-5因引入AI生成画面细节引发玩家反感">02 · 英伟达DLSS 5因引入AI生成画面细节引发玩家反感<\/h3>/);
});

test("日报详情页参考来源应使用间距分隔而非顿号", async () => {
  const { daily } = await buildAndReadPages();

  assert.match(daily, /daily-news-card-refs/);
  assert.doesNotMatch(daily, /AIBase<\/a>、<a class="cite"/);
  assert.doesNotMatch(daily, /36Kr AI<\/a>、<a class="cite"/);
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

  assert.match(css, /\.daily-section-block\s*\{[^}]*padding:\s*18px 16px 20px;[^}]*border-radius:\s*18px;[^}]*background:\s*rgba\(255,\s*255,\s*255,\s*0\.72\);/);
  assert.match(css, /\.daily-section-block \+ \.daily-section-block\s*\{[^}]*margin-top:\s*16px/);
});

test("日报详情页目录定位应通过scroll-margin-top确保标题进入可视区顶部", async () => {
  const { css } = await buildAndReadPages();

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
  const { home, notesList } = await buildAndReadPages();

  const glossaryCardStart = home.indexOf("关于AI 的一些名词说明");
  assert.notEqual(glossaryCardStart, -1);
  const glossaryCard = home.slice(glossaryCardStart, glossaryCardStart + 1200);
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

test("目录点击逻辑应先关闭抽屉恢复滚动，再按页头偏移滚动到目标标题", async () => {
  const { appShell } = await buildAndReadPages();

  assert.match(appShell, /目录抽屉\.addEventListener\('click'/);
  assert.match(appShell, /关闭所有抽屉\(\)/);
  assert.match(appShell, /window\.scrollTo\(/);
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

test("迭代记录页应去除重复主标题并改为日期时间线卡片", async () => {
  const { iteration, css } = await buildAndReadPages();

  assert.doesNotMatch(iteration, /<h1[^>]*>\s*迭代记录\s*<\/h1>/);
  assert.match(iteration, /class="iteration-page"/);
  assert.match(iteration, /class="iteration-entry-card"/);
  assert.match(css, /\.iteration-timeline::before\s*\{/);
  assert.match(css, /\.iteration-entry-card\s*\{/);
});
