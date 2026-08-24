import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description?: string;
}

/**
 * Sets the document <title> and meta description for the current page.
 * Lightweight alternative to react-helmet — no extra dependency, works
 * fine for an SPA since Google's crawler executes JS before indexing.
 *
 * NOTE: this does NOT give each language its own indexable URL (that
 * would require route-based i18n, e.g. /fr/... vs /en/...). It's a
 * safe, incremental improvement on top of the current single-URL setup.
 */
export function useSEO({ title, description }: SEOOptions) {
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

    return () => {
      document.title = prevTitle;
      if (descTag && prevDescription !== undefined) {
        descTag.setAttribute('content', prevDescription);
      }
    };
  }, [title, description]);
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
export function useHreflang(pathname: string) {
  useEffect(() => {
    const rest = pathname.replace(/^\/(en|fr)/, '');
    const canonical = `${SITE}${pathname}`;
    const enHref = `${SITE}/en${rest}`;
    const frHref = `${SITE}/fr${rest}`;

    setLinkTag('canonical', null, canonical);
    setLinkTag('alternate', 'en', enHref);
    setLinkTag('alternate', 'fr', frHref);
    setLinkTag('alternate', 'x-default', enHref);
  }, [pathname]);
}
