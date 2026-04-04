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

  // Append ?pro=1 to all internal links so pjax navigation preserves pro mode.
  // Must run after app-shell.js has rebuilt the drawer (both share DOMContentLoaded / pjax:success).
  function appendProToLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) return;
      if (href.includes('pro=')) return;
      // Split hash before appending query param to avoid invalid URLs like /path#hash?pro=1
      const hashIdx = href.indexOf('#');
      if (hashIdx !== -1) {
        const path = href.slice(0, hashIdx);
        const hash = href.slice(hashIdx);
        link.setAttribute('href', path + (path.includes('?') ? '&pro=1' : '?pro=1') + hash);
      } else {
        link.setAttribute('href', href + (href.includes('?') ? '&pro=1' : '?pro=1'));
      }
    });
  }

  // Always register via DOMContentLoaded so app-shell.js (also DOMContentLoaded) runs first
  // and the drawer links exist before appendProToLinks() is called.
  document.addEventListener('DOMContentLoaded', applyMode);
  document.addEventListener('pjax:success', applyMode);
})();
