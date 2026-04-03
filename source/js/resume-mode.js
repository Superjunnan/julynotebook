(() => {
  const STORAGE_KEY = 'proMode';

  function applyMode() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('pro')) {
      if (params.get('pro') === '1') {
        localStorage.setItem(STORAGE_KEY, '1');
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const isPro = localStorage.getItem(STORAGE_KEY) === '1';
    const resumeItem = document.querySelector('.menu-item-resume');
    if (resumeItem) {
      resumeItem.style.display = isPro ? '' : 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyMode);
  } else {
    applyMode();
  }

  document.addEventListener('pjax:success', applyMode);
})();
