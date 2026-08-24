import { useEffect } from 'react';
import { getCookieConsent } from '@/components/CookieConsent';

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

const WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined;

function loadCrisp() {
  if (document.getElementById('crisp-widget-script')) return;
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = WEBSITE_ID;
  const script = document.createElement('script');
  script.id = 'crisp-widget-script';
  script.src = 'https://client.crisp.chat/l.js';
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Live chat widget (https://crisp.chat — free up to 2 seats).
 *
 * TO ENABLE:
 * 1. Create a free account at crisp.chat and add your website.
 * 2. Copy your Website ID (Settings → Website Settings).
 * 3. Set VITE_CRISP_WEBSITE_ID in your environment (Cloudflare Pages →
 *    Settings → Environment variables) and redeploy.
 *
 * Without that env var, this component renders nothing — no broken
 * widget, no console errors. It also waits for cookie consent (chat
 * widgets set their own cookies) before loading anything.
 */
export default function LiveChat() {
  useEffect(() => {
    if (!WEBSITE_ID) return;

    if (getCookieConsent() === 'accepted') {
      loadCrisp();
    }

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<'accepted' | 'declined'>).detail;
      if (detail === 'accepted') loadCrisp();
    };
    window.addEventListener('liafrik-cookie-consent', onConsent);
    return () => window.removeEventListener('liafrik-cookie-consent', onConsent);
  }, []);

  return null;
}
