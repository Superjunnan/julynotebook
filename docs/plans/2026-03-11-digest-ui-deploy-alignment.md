# Digest UI And Deploy Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align deployment, digest content rendering, and NexT UI behavior with the confirmed project rules and the newly requested mobile/detail-page optimizations.

**Architecture:** Keep digest generation, homepage rendering, and theme overrides decoupled. Deployment is fixed with a separate Pages workflow; digest content changes stay in `tools/digest.mjs` and digest tests; UI behavior stays in NexT config, custom styles, and small injected scripts without touching non-digest posts.

**Tech Stack:** Hexo 8, NexT 8, Node.js built-in test runner, GitHub Actions, Stylus, small browser-side JS.

---

### Task 1: Add safe push-based Pages deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Verify: existing `.github/workflows/digest.yml`

**Step 1: Write the failing verification**

Check that the repo has no push-triggered Pages deployment workflow:

```bash
find .github/workflows -maxdepth 1 -type f | sort
rg -n "^on:|push:|workflow_dispatch:|schedule:" .github/workflows/*.yml
```

**Step 2: Run verification to confirm current gap**

Run:

```bash
find .github/workflows -maxdepth 1 -type f | sort
rg -n "^on:|push:|workflow_dispatch:|schedule:" .github/workflows/*.yml
```

Expected: only `digest.yml` exists, and it has `schedule` / `workflow_dispatch` but no `push`.

**Step 3: Write minimal implementation**

Create a dedicated `deploy.yml` that:
- triggers on `push` to `main` and `workflow_dispatch`
- checks out the repo
- installs dependencies
- runs `npx hexo clean && npx hexo generate`
- uploads `public/`
- deploys with `actions/deploy-pages`

Do not run `npm run digest` in this workflow.

**Step 4: Run build verification**

Run:

```bash
npx hexo clean && npx hexo generate
```

Expected: exit 0 and `public/index.html`, `public/iteration-log/index.html`, `public/2026/03/10/digest-2026-03-10/index.html` regenerated.

### Task 2: Align digest summary output with confirmed rules

**Files:**
- Modify: `tools/digest.mjs`
- Modify: `tests/digest/rendering.test.mjs`
- Modify: `tests/digest/topic-qualification.test.mjs`

**Step 1: Write the failing tests**

Add tests that assert:
- digest description prefers `今日主线`-style summary instead of `热门资讯`
- rendered hot-news block no longer outputs verbose `关键信号` sentence list
- the public count guidance no longer hardcodes `8~12`, and normalization still preserves multi-source hot news plus flexible quick-news totals

**Step 2: Run the targeted tests to verify failure**

Run:

```bash
node --test tests/digest/rendering.test.mjs tests/digest/topic-qualification.test.mjs
```

Expected: new assertions fail for current description / signal rendering / count wording.

**Step 3: Write minimal implementation**

Update `tools/digest.mjs` to:
- generate front-matter description from `day_overview` / `overview`
- stop emitting the current verbose `关键信号` block in article markdown
- keep `重点资讯` as multi-source narratives and `其他快讯` as flexible high-value entries
- update prompt wording and inline comments from `8~12` to the confirmed `3~15` news total rule

**Step 4: Run targeted tests**

Run:

```bash
node --test tests/digest/rendering.test.mjs tests/digest/topic-qualification.test.mjs
```

Expected: PASS.

### Task 3: Rework homepage cards and detail-page header / TOC controls

**Files:**
- Modify: `_config.next.yml`
- Modify: `source/_data/styles.styl`
- Modify: `source/_data/body-end.njk`
- Create: `source/js/post-layout.js`
- Modify: `source/js/home-tabs.js` only if needed for homepage behavior

**Step 1: Write the failing verification**

Capture current generated HTML markers showing the old behavior:

```bash
rg -n "热门资讯：|阅读原文|post-eof|sidebar-toggle|back-to-top|site-title|headband" public/index.html public/2026/03/10/digest-2026-03-10/index.html
```

**Step 2: Run verification to confirm current UI structure**

Run:

```bash
npx hexo clean && npx hexo generate
rg -n "热门资讯：|阅读原文|post-eof|sidebar-toggle|back-to-top|site-title|headband" public/index.html public/2026/03/10/digest-2026-03-10/index.html
```

Expected: homepage cards still show `热门资讯`, old button spacing, floating sidebar/back-to-top controls, and mobile header brand markup.

**Step 3: Write minimal implementation**

Update UI overrides so that:
- homepage cards emphasize `今日主线` preview with denser spacing
- detail pages hide the top `description` block if it still mirrors old digest teaser text
- left-bottom floating sidebar toggle is removed
- a compact TOC/menu button appears at the detail-page top-right
- mobile detail pages use the current page title in the top bar and drop the black brand band / fixed site-title chrome
- `阅读原文` block and footer separator spacing are tightened for list cards

**Step 4: Run build verification**

Run:

```bash
npx hexo clean && npx hexo generate
rg -n "今日主线|sidebar-toggle|back-to-top|post-eof|post-description" public/index.html public/2026/03/10/digest-2026-03-10/index.html
```

Expected: homepage reflects `今日主线`, old floating toggle is removed from effective UI, and detail-page header markup/classes are ready for the new behavior.

### Task 4: Verify the whole change set

**Files:**
- Verify only

**Step 1: Run digest tests**

Run:

```bash
npm run test:digest
```

Expected: PASS.

**Step 2: Run a fresh site build**

Run:

```bash
npx hexo clean && npx hexo generate
```

Expected: PASS.

**Step 3: Check protected content and generated routes**

Run:

```bash
test -f source/_posts/AI-开发项目实践分享记录.md
test -f public/index.html
test -f public/iteration-log/index.html
test -f public/2026/03/10/digest-2026-03-10/index.html
git status --short
```

Expected: protected article still exists, expected routes exist, and the diff only contains intended files.
