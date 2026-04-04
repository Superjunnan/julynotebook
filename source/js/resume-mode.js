(() => {
  function isProMode() {
    return new URLSearchParams(window.location.search).get('pro') === '1';
  }

  function applyMode() {
    if (isProMode()) {
      document.body.classList.add('pro-mode');
      appendProToLinks();
    } else {
      document.body.classList.remove('pro-mode');
    }
  }

  // Append ?pro=1 to all internal links so pjax navigation preserves pro mode
  function appendProToLinks() {
    const root = (window.CONFIG && CONFIG.root) ? CONFIG.root : '/';
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      // Skip external links, anchors, and links already tagged
      if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) return;
      if (href.includes('pro=')) return;
      link.setAttribute('href', href + (href.includes('?') ? '&pro=1' : '?pro=1'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMode);
  } else {
    applyMode();
  }

  document.addEventListener('pjax:success', applyMode);
})();
