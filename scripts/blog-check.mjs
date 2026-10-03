// Validates every blog article against the editorial / SEO rules.
//   npm run blog:check
import esbuild from 'esbuild';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = await esbuild.build({ entryPoints: [join(ROOT, 'src/data/blog/index.ts')], bundle: true, write: false, format: 'esm', platform: 'node' });
const bundle = join(ROOT, 'scripts', '.blog-bundle.mjs');
writeFileSync(bundle, out.outputFiles[0].text);
const blog = await import(`${bundle}?t=${Date.now()}`);
const prod = await (async () => {
  const o = await esbuild.build({ entryPoints: [join(ROOT, 'src/data/products.ts')], bundle: false, write: false, format: 'esm', platform: 'node', loader: { '.ts': 'ts' } });
  return null;
})();
void prod;
const { products } = await import(`${join(ROOT, 'scripts', '.products-bundle.mjs')}?t=${Date.now()}`);

const problems = [];
const bad = (post, lang, msg) => problems.push(`${post.id}/${lang}: ${msg}`);
const ids = new Set(blog.POSTS.map((p) => p.id));
const slugs = new Set();
const productSlugs = new Set(products.map((p) => p.slug));
const stats = [];

for (const post of blog.POSTS) {
  if (!productSlugs.has(post.product)) bad(post, '-', `unknown product ${post.product}`);
  for (const r of post.related) if (!ids.has(r)) bad(post, '-', `unknown related post ${r}`);
  for (const lang of blog.BLOG_LANGS) {
    const c = post[lang];
    const key = `${lang}:${c.slug}`;
    if (slugs.has(key)) bad(post, lang, `duplicate slug ${c.slug}`);
    slugs.add(key);
    if (!/^[a-z0-9-]+$/.test(c.slug)) bad(post, lang, `slug not URL-safe: ${c.slug}`);
    if (c.description.length >= 155) bad(post, lang, `meta description ${c.description.length} chars (must be < 155)`);
    if (c.description.length < 80) bad(post, lang, `meta description too short (${c.description.length})`);
    if (c.title.length > 75) bad(post, lang, `title ${c.title.length} chars (long)`);
    if (!c.title.toLowerCase().includes(c.keyword.toLowerCase())) bad(post, lang, `H1 does not contain keyword "${c.keyword}"`);
    const h2s = c.blocks.filter((b) => b.t === 'h2');
    const h3s = c.blocks.filter((b) => b.t === 'h3');
    const ctas = c.blocks.filter((b) => b.t === 'cta');
    if (h2s.length < 4) bad(post, lang, `only ${h2s.length} H2 (need >= 4)`);
    if (h3s.length < 1) bad(post, lang, `no H3`);
    if (ctas.length < 2) bad(post, lang, `only ${ctas.length} CTA (need >= 2)`);
    else {
      const idx = c.blocks.indexOf(ctas[0]);
      if (idx < c.blocks.length * 0.25 || idx > c.blocks.length * 0.75) bad(post, lang, `first CTA is not mid-article (position ${idx}/${c.blocks.length})`);
      if (c.blocks[c.blocks.length - 1].t !== 'cta') bad(post, lang, `last block is not a CTA`);
    }
    if (c.faq.length < 3) bad(post, lang, `FAQ has ${c.faq.length} items (need >= 3)`);
    const all = JSON.stringify([c, post]);
    if (/LiAfrik|Liafrik's? /.test('') ) {}
    if (/LiAfrik/.test(all)) bad(post, lang, `wrong brand spelling "LiAfrik"`);
    if (/\bliafrik\b/.test(JSON.stringify(c.blocks).replace(/liafrik\.com/g, ''))) bad(post, lang, `lowercase brand "liafrik"`);
    if (/\*[^*]/.test(JSON.stringify(c.blocks).replace(/\*\*[^*]+\*\*/g, ''))) bad(post, lang, `stray asterisk (unsupported markup)`);
    // links
    const links = [...JSON.stringify(c.blocks).matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
    const productLinks = links.filter((l) => l.startsWith('/products/'));
    if (!productLinks.some((l) => l === `/products/${post.product}`)) bad(post, lang, `no link to its own product page`);
    for (const l of links) {
      if (l.startsWith('post:') && !ids.has(l.slice(5))) bad(post, lang, `broken post link ${l}`);
      if (l.startsWith('/products/') && !productSlugs.has(l.split('/')[2])) bad(post, lang, `broken product link ${l}`);
    }
    stats.push({ id: post.id, lang, words: blog.wordCount(c), min: blog.readingMinutes(c), desc: c.description.length, h2: h2s.length, h3: h3s.length, cta: ctas.length, links: links.length });
  }
}
console.log('id        lang words  min desc  H2 H3 CTA links');
for (const s of stats) console.log(`${s.id.padEnd(9)} ${s.lang}   ${String(s.words).padStart(5)} ${String(s.min).padStart(3)}  ${String(s.desc).padStart(3)}   ${String(s.h2).padStart(2)} ${String(s.h3).padStart(2)}  ${String(s.cta).padStart(2)}  ${String(s.links).padStart(3)}`);
const covered = new Set(blog.POSTS.map((p) => p.product));
const missing = products.filter((p) => !covered.has(p.slug)).map((p) => p.slug);
if (missing.length) problems.push(`products without an article: ${missing.join(', ')}`);
console.log(`\n${blog.POSTS.length} articles x ${blog.BLOG_LANGS.length} languages | products covered: ${covered.size}/${products.length}`);
if (problems.length) { console.log(`\n${problems.length} PROBLEM(S):`); problems.forEach((p) => console.log(' -', p)); process.exit(1); }
console.log('\nALL BLOG CHECKS PASSED');
