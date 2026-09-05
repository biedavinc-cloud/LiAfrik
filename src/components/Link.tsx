import { forwardRef } from 'react';
import { Link as RouterLink, useParams, type LinkProps } from 'react-router-dom';
import { SUPPORTED_LANGS, type Lang } from '@/i18n/LanguageContext';

const STORAGE_KEY = 'liafrik-lang';

function isSupportedLang(v: string | undefined): v is Lang {
  return !!v && (SUPPORTED_LANGS as string[]).includes(v);
}

/**
 * Resolves the language to use for building a localized href.
 * - If we're already under a valid /:lang route, use that.
 * - Otherwise (top-level legacy/404 routes with no :lang param),
 *   fall back to the saved preference, then the browser language,
 *   then 'en'.
 */
export function useCurrentLang(): Lang {
  const { lang } = useParams<{ lang?: string }>();
  if (isSupportedLang(lang)) return lang;

  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isSupportedLang(saved ?? undefined)) return saved as Lang;
    const browserLang = navigator.language?.toLowerCase().slice(0, 2);
    if (isSupportedLang(browserLang)) return browserLang as Lang;
  }
  return 'en';
}

function localize(to: string, lang: string): string {
  if (!to) return to;
  // External links, mailto, tel, and pure-hash links pass through untouched.
  if (/^([a-z]+:)?\/\//i.test(to) || to.startsWith('mailto:') || to.startsWith('tel:')) return to;
  if (to.startsWith('#')) return to;
  // Already localized.
  if (to === `/${lang}` || to.startsWith(`/${lang}/`) || to.startsWith(`/${lang}#`)) return to;

  if (to === '/') return `/${lang}`;
  if (to.startsWith('/')) return `/${lang}${to}`;
  return to;
}

/**
 * Drop-in replacement for react-router-dom's <Link>. Same API, same
 * behavior — the only difference is that internal paths ("/products",
 * "/#ecosystem", "/") are automatically prefixed with the current
 * language ("/en/products", "/en#ecosystem", "/en"). External links,
 * mailto:, tel: and pure hash links are left untouched.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const lang = useCurrentLang();
  const target = typeof to === 'string' ? localize(to, lang) : to;
  return <RouterLink ref={ref} to={target} {...props} />;
});
Link.displayName = 'Link';
