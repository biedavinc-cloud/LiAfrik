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
