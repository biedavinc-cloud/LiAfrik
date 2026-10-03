import { BLOG_LANGS, type BlogLang, type BlogPost, type Block, type PostContent } from './types';
import { stripInline } from '../../lib/blogMarkup';

import { sellia } from './posts/sellia';
import { pos } from './posts/pos';
import { crm } from './posts/crm';
import { atlas } from './posts/atlas';
import { libooks } from './posts/libooks';
import { nutro } from './posts/nutro';
import { health } from './posts/health';
import { kolo } from './posts/kolo';
import { zanldo } from './posts/zanldo';
import { faka } from './posts/faka';
import { klasoo } from './posts/klasoo';
import { bailly } from './posts/bailly';
import { skills } from './posts/skills';
import { mafo } from './posts/mafo';
import { litrek } from './posts/litrek';
import { hostrek } from './posts/hostrek';

export * from './types';

// Articles are added here (one file per product in ./posts).
export const POSTS: BlogPost[] = [
  sellia, pos, crm, atlas, libooks, nutro,
  health, kolo, zanldo, faka, klasoo, bailly,
  skills, mafo, litrek, hostrek,
];

const SITE = 'https://liafrik.com';

/** "<title> | Liafrik", unless that would be too long for a search result title. */
export const withBrand = (title: string, max = 75) => (`${title} | Liafrik`.length > max ? title : `${title} | Liafrik`);

export const getPostById = (id: string) => POSTS.find((p) => p.id === id);

/** Finds an article from a slug in ANY language (so we can redirect to the right one). */
export function getPostBySlug(slug: string): { post: BlogPost; slugLang: BlogLang } | undefined {
  for (const post of POSTS) {
    for (const l of BLOG_LANGS) if (post[l].slug === slug) return { post, slugLang: l };
  }
  return undefined;
}

export const postPath = (post: BlogPost, lang: BlogLang) => `/blog/${post[lang].slug}`;
export const isBlogLang = (l: string): l is BlogLang => (BLOG_LANGS as string[]).includes(l);

/** Turns a link written in an article into a site path ("post:sellia" → "/blog/<slug>"). */
export function resolveHref(href: string, lang: BlogLang): string {
  if (href.startsWith('post:')) {
    const target = getPostById(href.slice(5));
    return target ? postPath(target, lang) : '/blog';
  }
  return href;
}

function blockText(b: Block): string {
  switch (b.t) {
    case 'ul':
    case 'ol':
      return b.items.map(stripInline).join(' ');
    case 'tip':
    case 'cta':
      return `${b.title} ${stripInline(b.text)}`;
    default:
      return stripInline(b.text);
  }
}

export const wordCount = (c: PostContent) =>
  [c.title, c.excerpt, ...c.blocks.map(blockText), ...c.faq.map((f) => `${f.q} ${f.a}`)]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

/** Reading time at ~200 words per minute (never less than 1). */
export const readingMinutes = (c: PostContent) => Math.max(1, Math.round(wordCount(c) / 200));

/**
 * Canonical + hreflang for blog routes, or null for every other route.
 * Only languages that really have the article are declared, so we never
 * point search engines at pages that do not exist.
 */
export function blogAlternates(
  pathname: string,
): { canonical: string; alternates: Record<string, string> } | null {
  const m = pathname.match(/^\/(en|fr|ar|es|pt)\/blog(?:\/([^/]+))?\/?$/);
  if (!m) return null;
  const [, lang, slug] = m;
  const pick = (map: Record<string, string>) => map[isBlogLang(lang) ? lang : 'en'];
  if (!slug) {
    const alternates: Record<string, string> = {};
    for (const l of BLOG_LANGS) alternates[l] = `${SITE}/${l}/blog`;
    alternates['x-default'] = alternates.en;
    return { canonical: pick(alternates), alternates };
  }
  const hit = getPostBySlug(slug);
  if (!hit) return { canonical: `${SITE}${pathname}`, alternates: {} };
  const alternates: Record<string, string> = {};
  for (const l of BLOG_LANGS) alternates[l] = `${SITE}/${l}/blog/${hit.post[l].slug}`;
  alternates['x-default'] = alternates.en;
  return { canonical: pick(alternates), alternates };
}
