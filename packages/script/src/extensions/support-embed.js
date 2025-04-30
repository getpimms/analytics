(function () {
  const COOKIE_PRIORITY = ['pimms_id', 'dclid'];
  const TARGET_ATTRIBUTES = ['data-cal-link']; // Add more here later
  const TARGET_PATTERN = 'pimms_id=1';

  let debounceTimer = null;

  function getCookieValue(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return value;
    }
    return null;
  }

  function getHighestPriorityCookie(names) {
    for (const name of names) {
      const value = getCookieValue(name);
      if (value) return value;
    }
    return null;
  }

  function updateTargetAttributes(id) {
    TARGET_ATTRIBUTES.forEach((attr) => {
      const selector = `[${attr}]`;
      document.querySelectorAll(selector).forEach((el) => {
        const val = el.getAttribute(attr);
        if (val && val.includes(TARGET_PATTERN)) {
          el.setAttribute(attr, val.replace(TARGET_PATTERN, `pimms_id=${id}`));
          console.log(`[PIMMS] Updated ${attr}:`, el);
        }
      });
    });
  }

  function debouncedUpdate(id) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => updateTargetAttributes(id), 300);
  }

  function init() {
    const id = getHighestPriorityCookie(COOKIE_PRIORITY);
    if (!id) return;

    updateTargetAttributes(id);

    const observer = new MutationObserver(() => debouncedUpdate(id));
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
