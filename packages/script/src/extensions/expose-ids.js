(function () {
  const COOKIE_PRIORITY = ['pimms_id', 'dclid'];

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

  function getSearchParamValue(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  const urlPimmsId = getSearchParamValue('pimms_id');
  window.pimms_id =
    urlPimmsId || getHighestPriorityCookie(COOKIE_PRIORITY) || null;

  console.log('[PIMMS] Exposed window.pimms_id:', window.pimms_id);
})();
