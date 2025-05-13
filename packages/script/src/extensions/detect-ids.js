(function () {
  const COOKIE_PRIORITY = ['pimms_id', 'dclid'];
  const TARGET_PATTERNS = [
    {
      match: 'pimms_client_reference_id=1',
      replace: (id) => `client_reference_id=pimms_id_${id}`,
    },
    {
      match: 'pimms_id=1',
      replace: (id) => `pimms_id=${id}`,
    },
  ];

  let debounceTimer = null;

  function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  }

  function getHighestPriorityCookie(names) {
    for (const name of names) {
      const value = getCookieValue(name);
      if (value) return { name, value };
    }
    return null;
  }

  function updateLinks(id) {
    const links = document.querySelectorAll('a[href]');
    links.forEach((link) => {
      let updated = false;
      let href = link.href;

      TARGET_PATTERNS.forEach(({ match, replace }) => {
        if (href.includes(match)) {
          const newHref = href.replace(match, replace(id));
          if (href !== newHref) {
            link.href = newHref;
            href = newHref;
            updated = true;
          }
        }
      });

      if (updated) {
        console.log(`[PIMMS] Updated link: ${link.href}`);
      }
    });
  }

  function debouncedUpdate(id) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => updateLinks(id), 300);
  }

  function init() {
    const cookie = getHighestPriorityCookie(COOKIE_PRIORITY);
    if (!cookie) {
      return;
    }

    console.log(`[PIMMS] [links] Using ${cookie.name}:`, cookie.value);
    updateLinks(cookie.value);

    const observer = new MutationObserver(() => debouncedUpdate(cookie.value));
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
