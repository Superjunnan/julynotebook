const { parse } = require('node-html-parser');

/**
 * Post-render filter to transform AI Daily (每日资讯) post HTML:
 * 1. Extracts candidate count from blockquotes and removes them
 * 2. Rewrites reference numbers to source names in-place using regex
 * 3. Removes the 参考来源 bibliography section
 */
hexo.extend.filter.register('after_post_render', function(data) {
  // Determine if daily by app_type (set by app-post-meta) or by category
  const isDaily = data.app_type === 'daily' ||
    (data.categories && data.categories.data &&
     data.categories.data.some(c => c.name === '每日资讯' || c.name === 'AI 日报'));

  if (data.layout !== 'post' || !isDaily) return data;

  try {
    const root = parse(data.content);
    let candidateCount = '0';

    // --------------------------------------------------------------
    // Step 1: Extract candidate count and remove intro blockquotes
    // --------------------------------------------------------------
    const blockquotes = root.querySelectorAll('blockquote');
    blockquotes.forEach(bq => {
      const text = (bq.innerText || bq.text || '').trim().replace(/\s+/g, ' ');
      const match = text.match(/今日候选总数[^\d]*(\d+)/);
      if (match) {
        candidateCount = match[1];
        bq.remove();
      } else if (text.includes('主线：') || text.includes('今日主线')) {
        bq.remove();
      }
    });

    // Set on data; only override if missing or zero
    if (!data.app_daily_candidates || data.app_daily_candidates === '0') {
      data.app_daily_candidates = candidateCount;
    }

    // --------------------------------------------------------------
    // Step 2: Build a refId -> source label mapping from bibliography
    // --------------------------------------------------------------
    const refMap = {};
    root.querySelectorAll('[id^="ref-"]').forEach(spanEl => {
      const id = spanEl.id.replace('ref-', '');
      const aEl = spanEl.parentNode && spanEl.parentNode.querySelector('a');
      if (aEl) {
        const href = aEl.getAttribute('href') || '';
        // Try to extract source label from anchor text e.g. "文章标题｜36Kr AI"
        const text = (aEl.text || '').trim();
        const parts = text.split('｜');
        const source = parts.length > 1 ? parts[parts.length - 1].trim() : '';
        if (source) refMap[id] = source;
      }
    });

    // Also build from data-cite attributes on any <a class="cite"> tags
    root.querySelectorAll('a.cite').forEach(aEl => {
      const citeText = aEl.getAttribute('data-cite') || '';
      // format: "5. 标题｜SOURCE"
      const dotIdx = citeText.indexOf('.');
      const barIdx = citeText.indexOf('｜');
      if (dotIdx !== -1 && barIdx !== -1) {
        const id = citeText.substring(0, dotIdx).trim();
        const source = citeText.substring(barIdx + 1).trim();
        if (id && source) refMap[id] = source;
      }
    });

    // --------------------------------------------------------------
    // Step 3: Remove 参考来源 section (H2 + following UL)
    // --------------------------------------------------------------
    const sectionH2s = root.querySelectorAll('h2');
    sectionH2s.forEach(h2 => {
      const text = (h2.text || '').trim();
      if (text.includes('参考') && (text.includes('来源') || text.includes('内容'))) {
        // Remove the next sibling UL too
        let next = h2.nextElementSibling;
        while (next) {
          const tag = (next.tagName || '').toUpperCase();
          const toRemove = next;
          next = next.nextElementSibling;
          if (tag === 'UL' || tag === 'OL') {
            toRemove.remove();
            break;
          }
        }
        h2.remove();
      }
    });

    // --------------------------------------------------------------
    // Step 4: Rewrite cite tags in content, replacing number with source label
    // - Works on the raw HTML string after DOM query, to avoid traversal issues
    // --------------------------------------------------------------
    let html = root.toString();

    // Replace: <a class="cite" href="..." data-cite="5. TITLE｜SOURCE">5</a>
    // With:    <a class="cite" href="..." data-cite="...">SOURCE</a>
    html = html.replace(
      /<a\s+class="cite"([^>]*?)data-cite="([^"]*)"[^>]*>(\d+)<\/a>/g,
      (match, attrs, citeText) => {
        const barIdx = citeText.indexOf('｜');
        const dotIdx = citeText.indexOf('.');
        if (barIdx !== -1) {
          const source = citeText.substring(barIdx + 1).trim();
          return `<a class="cite"${attrs}data-cite="${citeText}">${source}</a>`;
        }
        if (dotIdx !== -1) {
          const refId = citeText.substring(0, dotIdx).trim();
          const source = refMap[refId] || citeText.substring(dotIdx + 1).trim();
          return `<a class="cite"${attrs}data-cite="${citeText}">${source}</a>`;
        }
        return match;
      }
    );

    // --------------------------------------------------------------
    // Step 5: Style the 其他快讯 list items as cards
    // Apply section-level styling
    // --------------------------------------------------------------
    // Header sections
    html = html.replace(/<h2 id="重点资讯"[^>]*>/g, '<h2 class="daily-section-title" id="重点资讯">');
    html = html.replace(/<h2 id="其他快讯"[^>]*>/g, '<h2 class="daily-section-title" id="其他快讯">');
    html = html.replace(/<h2 id="核心论文"[^>]*>/g, '<h2 class="daily-section-title" id="核心论文">');

    // UL that contains the news items -> daily-news-list
    // The UL is marked by its first child being a LI with bold header "01 · ..."
    // We style each top-level LI as a daily-news-card
    html = html.replace(/<ul>\n(<li><strong>\d+)/g, '<ul class="daily-news-list">\n$1');

    // Style each list item as a card
    html = html.replace(/<li class="daily-news-card"/g, '<li class="daily-news-card">');

    // Rewrite （参考：...） to styled span
    html = html.replace(/（参考：([^）]+)）/g, '<span class="daily-news-card-refs"><span class="refs-label">参考：</span>$1</span>');
    html = html.replace(/\(参考：([^)]+)\)/g, '<span class="daily-news-card-refs"><span class="refs-label">参考：</span>$1</span>');

    data.content = html;

  } catch (error) {
    console.error('daily-detail-formatter error:', error);
  }

  return data;
}, 20); // Run after app-post-meta (priority 10)
