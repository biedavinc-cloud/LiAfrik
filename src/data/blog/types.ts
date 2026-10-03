// Blog content model. Pure module (no imports) so scripts/prerender.mjs can
// bundle it and the React pages can use the exact same data.
//
// HOW TO ADD AN ARTICLE
//  1. Copy any file in ./posts, change the id/product/slugs/texts.
//  2. Import it in ./index.ts and add it to POSTS.
//  3. `npm run build` — the page, sitemap entry, RSS item, JSON-LD and
//     internal links are generated automatically. Run `npm run blog:check`
//     to validate SEO rules (meta length, CTAs, links, brand spelling).
//
// Inline markup inside any text: **bold**, [label](/products/sellia),
// [label](post:other-post-id) for a link to another article.

export type BlogLang = 'fr' | 'en';
export const BLOG_LANGS: BlogLang[] = ['fr', 'en'];

export type Block =
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'tip'; title: string; text: string }
  /** Call-to-action box. Buttons are derived from the article's product
   *  (try the app if it is live, "notify me" if it is coming soon). */
  | { t: 'cta'; title: string; text: string };

export interface PostContent {
  /** URL slug, unique per language. */
  slug: string;
  /** H1 — must contain the main keyword. */
  title: string;
  /** Meta description: < 155 characters, ends with a call to action. */
  description: string;
  /** Short summary shown on cards and as the article lead. */
  excerpt: string;
  /** Main keyword (used for validation and as the first article tag). */
  keyword: string;
  /** Category label shown on cards. */
  category: string;
  blocks: Block[];
  faq: { q: string; a: string }[];
}

export interface BlogPost {
  /** Stable id, shared by every language version (used for hreflang). */
  id: string;
  /** Slug of the main Liafrik product the article promotes. */
  product: string;
  /** Ids of related articles (internal linking block). */
  related: string[];
  /** ISO date (yyyy-mm-dd). */
  date: string;
  fr: PostContent;
  en: PostContent;
}

// Small builders to keep the article files readable.
export const h2 = (text: string): Block => ({ t: 'h2', text });
export const h3 = (text: string): Block => ({ t: 'h3', text });
export const p = (text: string): Block => ({ t: 'p', text });
export const ul = (...items: string[]): Block => ({ t: 'ul', items });
export const ol = (...items: string[]): Block => ({ t: 'ol', items });
export const tip = (title: string, text: string): Block => ({ t: 'tip', title, text });
export const cta = (title: string, text: string): Block => ({ t: 'cta', title, text });
