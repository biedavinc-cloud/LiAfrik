import { useEffect } from 'react';
import { SUPPORTED_LANGS } from '@/i18n/LanguageContext';

interface SEOOptions {
  title: string;
  description?: string;
  /** Set true for pages that should never appear in search results
   *  (e.g. the 404 page) — adds <meta name="robots" content="noindex, nofollow">. */
  noindex?: boolean;
}

/**
 * Sets the document <title>, meta description, and (optionally) a
 * noindex directive for the current page. Lightweight alternative to
 * react-helmet — no extra dependency, works fine for an SPA since
 * Google's crawler executes JS before indexing.
 *
 * Paired with useHreflang() below (called once per route in App.tsx),
 * which sets the canonical + EN/FR hreflang alternates — together these
 * give every route its own indexable, language-aware URL.
 */
export function useSEO({ title, description, noindex }: SEOOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let descTag = document.querySelector('meta[name="description"]');
    const prevDescription = descTag?.getAttribute('content') ?? undefined;
    if (description) {
      if (!descTag) {
        descTag = document.createElement('meta');
        descTag.setAttribute('name', 'description');
        document.head.appendChild(descTag);
      }
      descTag.setAttribute('content', description);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && description) ogDesc.setAttribute('content', description);

    let robotsTag: HTMLMetaElement | null = null;
    if (noindex) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      robotsTag.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(robotsTag);
    }

    return () => {
      document.title = prevTitle;
      if (descTag && prevDescription !== undefined) {
        descTag.setAttribute('content', prevDescription);
      }
      if (robotsTag) robotsTag.remove();
    };
  }, [title, description, noindex]);
}

const SITE = 'https://liafrik.com';

function setLinkTag(rel: string, hreflang: string | null, href: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Sets the canonical URL and EN/FR hreflang alternates for the current
 * page, based on its language-prefixed path (/en/... or /fr/...). Runs
 * on every route change — this is what tells Google "these two URLs are
 * the same page in different languages" so both can rank internationally
 * instead of being treated as duplicate content.
 */
/**
 * Sets the canonical URL and hreflang alternates (one per supported
 * language, plus x-default) for the current page, based on its
 * language-prefixed path (/en/..., /fr/..., /ar/..., /es/..., /pt/...).
 * Runs on every route change — this is what tells Google "these URLs
 * are the same page in different languages" so each can rank
 * internationally instead of being treated as duplicate content.
 */
export function useHreflang(pathname: string) {
  useEffect(() => {
    const rest = pathname.replace(/^\/(en|fr|ar|es|pt)/, '');
    const canonical = `${SITE}${pathname}`;
    const enHref = `${SITE}/en${rest}`;

    setLinkTag('canonical', null, canonical);
    for (const l of SUPPORTED_LANGS) {
      setLinkTag('alternate', l, `${SITE}/${l}${rest}`);
    }
    setLinkTag('alternate', 'x-default', enHref);
  }, [pathname]);
}
