(() => {
  const STORAGE_KEY = 'proMode';

  function applyMode() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('pro')) {
      if (params.get('pro') === '1') {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    const isPro = sessionStorage.getItem(STORAGE_KEY) === '1';
    if (isPro) {
      document.body.classList.add('pro-mode');
    } else {
      document.body.classList.remove('pro-mode');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMode);
  } else {
    applyMode();
  }

  document.addEventListener('pjax:success', applyMode);
})();
