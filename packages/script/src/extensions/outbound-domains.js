// Wait for base script to initialize
const initOutboundDomains = () => {
  const {
    c: cookieManager,
    i: PIMMS_ID_VAR,
    h: HOSTNAME,
    n: DOMAINS_CONFIG,
  } = window._pimmsAnalytics;
  let outboundLinksUpdated = new Set(); // Track processed links

  function addOutboundTracking(clickId) {
    // Parse comma-separated outbound domains
    const outboundDomains = DOMAINS_CONFIG.outbound
      ?.split(',')
      .map((d) => d.trim());
    if (!outboundDomains?.length) return;

    const currentDomain = HOSTNAME.replace(/^www\./, '');
    const filteredDomains = outboundDomains.filter((d) => d !== currentDomain);

    const existingCookie = clickId || cookieManager.get(PIMMS_ID_VAR);
    if (!existingCookie) return;

    const selector = filteredDomains
      .map((domain) => `a[href*="${domain}"]`)
      .join(',');

    const links = document.querySelectorAll(selector);
    if (!links || links.length === 0) return;

    links.forEach((link) => {
      // Skip already processed links
      if (outboundLinksUpdated.has(link)) return;

      try {
        const url = new URL(link.href);
        url.searchParams.set(PIMMS_ID_VAR, existingCookie);
        link.href = url.toString();
        outboundLinksUpdated.add(link);
      } catch (e) {}
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => addOutboundTracking());
  } else {
    addOutboundTracking();
  }

  // Run periodically to catch dynamically added links
  setInterval(addOutboundTracking, 2000);

  // Add SPA support
  window.addEventListener('popstate', () => addOutboundTracking());

  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    addOutboundTracking();
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    addOutboundTracking();
  };
};

// Run when base script is ready
if (window._pimmsAnalytics) {
  initOutboundDomains();
} else {
  window.addEventListener('load', initOutboundDomains);
}
