// Google Tag Manager, loaded ONLY after the visitor accepts analytics cookies
// (the banner in components/CookieConsent.tsx stores the choice).
//
// Consent Mode v2: every storage type starts as "denied"; accepting grants
// analytics_storage only (no ads storage, no ad personalisation). If the visitor
// declines, the GTM script is never requested at all.

export const GTM_ID = 'GTM-NP6LLTPS';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const dataLayer = (): unknown[] => (window.dataLayer = window.dataLayer || []);

// GTM requires the `arguments` object itself (not an array) for gtag commands.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  dataLayer().push(arguments);
}

let defaultsSet = false;
let loaded = false;

/** Must run before GTM loads: declares everything denied until the visitor decides. */
export function initConsentDefaults() {
  if (defaultsSet) return;
  defaultsSet = true;
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
}

function loadGtm() {
  if (loaded || document.getElementById('gtm-script')) return;
  loaded = true;
  dataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/** Called with the visitor's choice (on load if already stored, and on every change). */
export function applyAnalyticsConsent(granted: boolean) {
  initConsentDefaults();
  gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
  if (granted) loadGtm();
}

/** Virtual page view for client-side navigation (the site is a single-page app). */
export function trackPageView(lang: string) {
  dataLayer().push({
    event: 'spa_page_view',
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
    page_language: lang,
  });
}
