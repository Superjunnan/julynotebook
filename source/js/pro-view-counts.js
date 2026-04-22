(() => {
  const COUNTER_API_URL = window.APP_VIEW_COUNTER_API || 'https://bsz.saop.cc/api';
  const CACHE_KEY = 'pro-view-count-cache-v1';
  const CACHE_TTL_MS = 10 * 60 * 1000;
  const REQUEST_CONCURRENCY = 6;

  function isProMode() {
    return new URLSearchParams(window.location.search).get('pro') === '1';
  }

  function isPostPage() {
    const pageNode = document.querySelector('.next-config[data-name="page"]');
    if (!pageNode) return false;

    try {
      const pageConfig = JSON.parse(pageNode.textContent || '{}');
      return Boolean(pageConfig.isPost);
    } catch {
      return false;
    }
  }

  function normalizeUrl(rawUrl) {
    try {
      const resolved = new URL(rawUrl || window.location.href, window.location.origin);
      resolved.search = '';
      resolved.hash = '';
      resolved.pathname = resolved.pathname.replace(/index\.html$/u, '');
      return resolved.toString();
    } catch {
      return String(rawUrl || window.location.href).split('#')[0].split('?')[0];
    }
  }

  function formatCount(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return '--';
    return new Intl.NumberFormat('zh-CN').format(num);
  }

  function readCacheStore() {
    try {
      const raw = window.sessionStorage.getItem(CACHE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeCacheStore(store) {
    try {
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(store));
    } catch {
      // 忽略 sessionStorage 不可用场景。
    }
  }

  function readCachedCount(url) {
    const store = readCacheStore();
    const item = store[url];
    if (!item || typeof item !== 'object') return null;
    if (Date.now() - Number(item.ts || 0) > CACHE_TTL_MS) return null;

    const value = Number(item.value);
    return Number.isFinite(value) ? value : null;
  }

  function writeCachedCount(url, value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return;

    const store = readCacheStore();
    store[url] = {
      value: num,
      ts: Date.now(),
    };
    writeCacheStore(store);
  }

  async function requestPageCount(url, increment) {
    const method = increment ? 'POST' : 'GET';
    const response = await fetch(COUNTER_API_URL, {
      method,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'x-bsz-referer': url,
      },
    });

    if (!response.ok) {
      throw new Error(`counter request failed: ${response.status}`);
    }

    const payload = await response.json();
    const value = Number(payload?.data?.page_pv);
    if (!Number.isFinite(value)) {
      throw new Error('counter payload missing page_pv');
    }

    writeCachedCount(url, value);
    return value;
  }

  function renderValue(node, value, state = 'ready') {
    if (!node) return;
    node.dataset.proViewState = state;

    const valueNode = node.querySelector('[data-pro-view-value]');
    if (valueNode) {
      valueNode.textContent = formatCount(value);
    }
  }

  function renderError(node) {
    if (!node) return;
    node.dataset.proViewState = 'error';

    const valueNode = node.querySelector('[data-pro-view-value]');
    if (valueNode) {
      valueNode.textContent = '--';
    }
  }

  async function updatePostPageCount() {
    if (!isPostPage()) return;

    const container = document.getElementById('busuanzi_container_page_pv');
    const valueNode = document.getElementById('busuanzi_value_page_pv');
    if (!container || !valueNode) return;

    const currentUrl = normalizeUrl(window.location.href);
    const lastCountedUrl = container.getAttribute('data-pro-view-counted-url');

    if (isProMode()) {
      valueNode.textContent = '--';
      container.dataset.proViewState = 'loading';
    }

    try {
      const count = lastCountedUrl === currentUrl
        ? readCachedCount(currentUrl) ?? await requestPageCount(currentUrl, false)
        : await requestPageCount(currentUrl, true);

      container.setAttribute('data-pro-view-counted-url', currentUrl);
      if (isProMode()) {
        valueNode.textContent = formatCount(count);
        container.dataset.proViewState = 'ready';
      }
    } catch (error) {
      if (isProMode()) {
        valueNode.textContent = '--';
        container.dataset.proViewState = 'error';
      }
      console.error('pro-view-counts post counter failed:', error);
    }
  }

  async function updateCardCounts() {
    const nodes = Array.from(document.querySelectorAll('[data-pro-view-url]'));
    if (!nodes.length) return;

    if (!isProMode()) {
      nodes.forEach(node => renderError(node));
      return;
    }

    const groups = new Map();
    nodes.forEach(node => {
      const canonicalUrl = normalizeUrl(node.getAttribute('data-pro-view-url') || '');
      if (!canonicalUrl) return;

      renderValue(node, '--', 'loading');
      if (!groups.has(canonicalUrl)) {
        groups.set(canonicalUrl, []);
      }
      groups.get(canonicalUrl).push(node);
    });

    const tasks = Array.from(groups.entries()).map(([url, linkedNodes]) => async () => {
      try {
        const cached = readCachedCount(url);
        const count = cached ?? await requestPageCount(url, false);
        linkedNodes.forEach(node => renderValue(node, count));
      } catch (error) {
        linkedNodes.forEach(node => renderError(node));
        console.error('pro-view-counts card counter failed:', error);
      }
    });

    for (let index = 0; index < tasks.length; index += REQUEST_CONCURRENCY) {
      const batch = tasks.slice(index, index + REQUEST_CONCURRENCY).map(task => task());
      await Promise.all(batch);
    }
  }

  function initProViewCounts() {
    updatePostPageCount();
    updateCardCounts();
  }

  document.addEventListener('DOMContentLoaded', initProViewCounts);
  document.addEventListener('pjax:success', initProViewCounts);
})();
