import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { getCookieConsent } from '@/components/CookieConsent';
import { applyAnalyticsConsent, initConsentDefaults, trackPageView } from '@/lib/analytics';

/**
 * Wires Google Tag Manager to the cookie banner and reports route changes.
 * Renders nothing. GTM is never requested unless analytics cookies are accepted.
 */
export default function AnalyticsTracker() {
  const { pathname, search } = useLocation();
  const { lang } = useLang();
  const granted = useRef(false);
  const firstRender = useRef(true);

  useEffect(() => {
    initConsentDefaults();
    const apply = (value: string | null) => {
      granted.current = value === 'accepted';
      applyAnalyticsConsent(granted.current);
    };
    const stored = getCookieConsent();
    if (stored) apply(stored);
    const onChoice = (e: Event) => apply((e as CustomEvent<string>).detail);
    window.addEventListener('liafrik-cookie-consent', onChoice);
    return () => window.removeEventListener('liafrik-cookie-consent', onChoice);
  }, []);

  // Route changes after the first page: GTM's own page-load trigger already
  // covers the landing page, so only later navigations need a virtual page view.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!granted.current) return;
    const t = setTimeout(() => trackPageView(lang), 350); // let useSEO update document.title first
    return () => clearTimeout(t);
  }, [pathname, search, lang]);

  return null;
}
