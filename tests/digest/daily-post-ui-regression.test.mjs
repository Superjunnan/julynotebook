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
  assert.match(daily, /daily-news-card-title__index">01<\/span>/);
  assert.match(daily, /daily-news-card-title__index">02<\/span>/);
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
  const { css } = await buildAndReadPages();

  assert.match(css, /\.daily-news-card-title\s*\{[^}]*display:\s*block;/);
  assert.doesNotMatch(css, /\.daily-news-card-title\s*\{[^}]*align-items:\s*baseline/);
  assert.doesNotMatch(css, /\.daily-news-card-title\s*\{[^}]*gap:\s*6px/);
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
