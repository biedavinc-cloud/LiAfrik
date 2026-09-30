// Generates a static, crawlable HTML snapshot for every route in the
// sitemap (24 pages x 5 languages = 120 files), with correct per-page
// <title>, meta description, canonical, and hreflang tags, plus real
// headings and <a href> links in the body.
//
// WHY: this is a client-rendered SPA — the raw HTML (what non-JS
// crawlers like SEMrush, Bing, and many AI web-fetchers see) is just
// `<div id="root"></div>` with one generic <title>/canonical shared by
// every route. This script fixes that by writing real static files that
// Cloudflare Pages serves directly (a literal file always wins over the
// SPA catch-all in _redirects) — while real visitors get the exact same
// interactive app as before.
//
// SAFE BY CONSTRUCTION: main.tsx mounts with `createRoot(...).render(...)`,
// not `hydrateRoot`, so React does a fresh client-side render into
// #root on load — it does not try to "reconcile" against this static
// markup. There is no hydration-mismatch risk; the snapshot is simply
// replaced the instant JS runs.
//
// Runs automatically after `vite build` via the `postbuild` npm script.

import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://liafrik.com';
const LANGS = ['en', 'fr', 'ar', 'es', 'pt'];
const RTL_LANGS = ['ar'];

// ---- 1. Load product data from the real source of truth (src/data/products.ts) ----
const stubPath = join(ROOT, 'scripts', '.lucide-stub.mjs');
writeFileSync(
  stubPath,
  `const stub = () => null;\nexport const ShoppingCart=stub,Store=stub,Users=stub,GraduationCap=stub,UtensilsCrossed=stub,HeartPulse=stub,Building2=stub,PiggyBank=stub,MonitorPlay=stub,Flower2=stub,BookOpenCheck=stub,ShoppingBag=stub,Route=stub,Hotel=stub;\n`
);

const built = await esbuild.build({
  entryPoints: [join(ROOT, 'src/data/products.ts')],
  bundle: false,
  write: false,
  format: 'esm',
  platform: 'node',
  loader: { '.ts': 'ts' },
});
const patchedCode = built.outputFiles[0].text
  .replace(/from ["']lucide-react["']/, `from ${JSON.stringify(stubPath)}`)
  .replace(/import type \{ Lang \} from ["']@\/i18n\/LanguageContext["'];\n?/, '');
const tmpProductsPath = join(ROOT, 'scripts', '.products-bundle.mjs');
writeFileSync(tmpProductsPath, patchedCode);
const { products } = await import(`${tmpProductsPath}?t=${Date.now()}`);

// Shared search-facing copy (titles, descriptions, "alternative to X" pages).
// The same module powers the React pages, so static HTML and app never drift.
async function bundlePure(entry, outName) {
  const out = await esbuild.build({
    entryPoints: [join(ROOT, entry)], bundle: true, write: false, format: 'esm', platform: 'node', loader: { '.ts': 'ts' },
  });
  const path = join(ROOT, 'scripts', outName);
  writeFileSync(path, out.outputFiles[0].text);
  return import(`${path}?t=${Date.now()}`);
}
const { productSeo, alternativePage, alternativesHub, altNavLabel, altToHeading, altHubLink } = await bundlePure('src/lib/seoCopy.ts', '.seo-bundle.mjs');
const { ALTERNATIVES, alternativesForProduct } = await bundlePure('src/data/alternatives.ts', '.alternatives-bundle.mjs');

// ---- 2. Static page manifest (title/description per language) ----
// Kept in sync by hand with each page's useSEO() call — a small, stable
// list (9 pages), reviewed whenever those pages' SEO copy changes.
const STATIC_PAGES = (await bundlePure('src/data/pageSeo.ts', '.pageseo-bundle.mjs')).PAGE_SEO;

const NAV_LABEL = {
  home: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية', es: 'Inicio', pt: 'Início' },
  products: { en: 'All products', fr: 'Tous les produits', ar: 'كل المنتجات', es: 'Todos los productos', pt: 'Todos os produtos' },
  founder: { en: 'Founder', fr: 'Fondateur', ar: 'المؤسس', es: 'Fundador', pt: 'Fundador' },
  security: { en: 'Security', fr: 'Sécurité', ar: 'الأمان', es: 'Seguridad', pt: 'Segurança' },
  support: { en: 'Support', fr: 'Support', ar: 'الدعم', es: 'Soporte', pt: 'Suporte' },
  privacy: { en: 'Privacy Policy', fr: 'Confidentialité', ar: 'الخصوصية', es: 'Privacidad', pt: 'Privacidade' },
  terms: { en: 'Terms', fr: 'Conditions', ar: 'الشروط', es: 'Términos', pt: 'Termos' },
  partners: { en: 'Partners & Investors', fr: 'Partenaires & Investisseurs', ar: 'الشركاء والمستثمرون', es: 'Socios e Inversores', pt: 'Parceiros e Investidores' },
};

// ---- 3. Read the built index.html to reuse its <script>/<link> asset tags ----
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');
const headAssetTags = [...baseHtml.matchAll(/<link rel="modulepreload"[^>]*>|<link rel="stylesheet"[^>]*>/g)]
  .map((m) => m[0])
  .join('\n    ');
const bodyScriptTag = baseHtml.match(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/)[0];
const faviconTags = [...baseHtml.matchAll(/<link rel="icon"[^>]*>|<link rel="apple-touch-icon"[^>]*>|<link rel="manifest"[^>]*>/g)]
  .map((m) => m[0])
  .join('\n    ');
const themeColorTag = baseHtml.match(/<meta name="theme-color"[^>]*>/)[0];
const jsonLd = [...baseHtml.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)]
  .map((m) => m[0])
  .join('\n    ');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function hreflangTags(path) {
  const lines = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}${path}" />`
  );
  lines.push(`<link rel="alternate" hreflang="x-default" href="${SITE}/en${path}" />`);
  return lines.join('\n    ');
}

const OG_LOCALE = { en: 'en_US', fr: 'fr_FR', ar: 'ar_AE', es: 'es_ES', pt: 'pt_PT' };
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

// Site-wide JSON-LD from index.html: first block = Organization, second = the
// product ItemList (only useful on the home and products pages).
const [orgLdRaw, itemListLdRaw] = [...baseHtml.matchAll(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g)].map((m) => m[0]);
const websiteLd = (lang) => ({
  '@context': 'https://schema.org', '@type': 'WebSite', name: 'Liafrik', url: SITE, inLanguage: lang,
  publisher: { '@type': 'Organization', name: 'Liafrik', url: SITE },
});
const breadcrumbLd = (lang, crumbs) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [{ name: NAV_LABEL.home[lang], href: `/${lang}` }, ...crumbs].map((c, idx) => ({
    '@type': 'ListItem', position: idx + 1, name: c.name ?? c.label, item: `${SITE}${c.href}`,
  })),
});

const SCHEMA_CATEGORY = {
  Education: 'EducationApplication', 'Personal Finance': 'FinanceApplication', Accounting: 'FinanceApplication',
  Transport: 'TravelApplication', Hospitality: 'TravelApplication', Marketplace: 'ShoppingApplication',
  Ecommerce: 'ShoppingApplication', Healthcare: 'HealthApplication', 'Health & Wellness': 'HealthApplication',
};

function renderPage({ lang, path, title, description, h1, bodyExtra, navLinks, ldBlocks = [], withItemList = false, ogType = 'website' }) {
  const dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  const url = `${SITE}/${lang}${path}`;
  const navHtml = navLinks
    .map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`)
    .join('\n        ');
  const alternates = LANGS.filter((l) => l !== lang)
    .map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`)
    .join('\n    ');

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
  <head>
    <meta charset="UTF-8" />
    ${faviconTags}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    ${themeColorTag}
    <link rel="canonical" href="${url}" />
    ${hreflangTags(path)}
    <title>${esc(title)}</title>
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Liafrik" />
    <meta property="og:locale" content="${OG_LOCALE[lang]}" />
    ${alternates}
    <meta property="og:image" content="${SITE}/og-image-v2.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Liafrik — African roots. Global vision. Building the future." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE}/og-image-v2.png" />
    ${orgLdRaw}
    ${ld(websiteLd(lang))}
    ${withItemList ? itemListLdRaw : ''}
    ${ldBlocks.map(ld).join('\n    ')}
    ${headAssetTags}
  </head>
  <body>
    <div id="root">
      <!-- Static SEO snapshot for non-JS crawlers (search engines, AI
           web-fetchers). Real visitors' browsers replace this instantly
           with the full interactive app once the script below runs —
           main.tsx uses createRoot (fresh render), not hydrateRoot, so
           there is no hydration-mismatch risk with this markup. -->
      <main>
        <h1>${esc(h1)}</h1>
        <p>${esc(description)}</p>
        ${bodyExtra || ''}
        <nav>
          ${navHtml}
        </nav>
      </main>
    </div>
    ${bodyScriptTag}
  </body>
</html>
`;
}

function writeRoute(lang, routePath, html) {
  const dir = join(DIST, lang, routePath).replace(/\/$/, '');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

const ul = (items) => `<ul>\n            ${items.map((i) => `<li>${esc(i)}</li>`).join('\n            ')}\n          </ul>`;
const COMING = { en: 'Coming soon', fr: 'Bientôt disponible', ar: 'قريباً', es: 'Próximamente', pt: 'Em breve' };
const PRICING_LABEL = { en: 'Pricing', fr: 'Tarifs', ar: 'الأسعار', es: 'Precios', pt: 'Preços' };
const FEATURES_LABEL = { en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات', es: 'Funciones', pt: 'Recursos' };
const BENEFITS_LABEL = { en: 'Benefits', fr: 'Avantages', ar: 'المزايا', es: 'Ventajas', pt: 'Vantagens' };
const INDUSTRIES_LABEL = { en: 'Built for', fr: 'Conçu pour', ar: 'مصمم لـ', es: 'Pensado para', pt: 'Criado para' };

let count = 0;
const sitemapEntries = []; // every routed path, for sitemap.xml

for (const lang of LANGS) {
  const commonNav = [
    { href: `/${lang}`, label: NAV_LABEL.home[lang] },
    { href: `/${lang}/products`, label: NAV_LABEL.products[lang] },
    { href: `/${lang}/alternatives`, label: altNavLabel(lang) },
    { href: `/${lang}/founder`, label: NAV_LABEL.founder[lang] },
    { href: `/${lang}/security`, label: NAV_LABEL.security[lang] },
    { href: `/${lang}/support`, label: NAV_LABEL.support[lang] },
    { href: `/${lang}/privacy`, label: NAV_LABEL.privacy[lang] },
    { href: `/${lang}/terms`, label: NAV_LABEL.terms[lang] },
    { href: `/${lang}/partners`, label: NAV_LABEL.partners[lang] },
  ];

  // ---- Static pages (home + others) ----
  for (const [slug, page] of Object.entries(STATIC_PAGES)) {
    const routePath = slug ? `/${slug}` : '';
    const html = renderPage({
      lang,
      path: routePath,
      title: page.title[lang],
      description: page.desc[lang],
      h1: page.h1[lang],
      withItemList: slug === '' || slug === 'products',
      bodyExtra: slug === 'products' || slug === ''
        ? `<ul>\n            ${products
            .map((p) => `<li><a href="/${lang}/products/${p.slug}">${esc(p.name)} — ${esc(p.tagline[lang])}</a></li>`)
            .join('\n            ')}\n          </ul>`
        : '',
      navLinks: commonNav,
      ldBlocks: slug && slug !== 'products'
        ? [breadcrumbLd(lang, [{ name: page.h1[lang], href: `/${lang}${routePath}` }])]
        : [],
    });
    writeRoute(lang, routePath.slice(1), html);
    count++;
  }

  // ---- Product pages ----
  for (const p of products) {
    const routePath = `/products/${p.slug}`;
    const seo = productSeo(p, lang);
    const plans = (p.pricing || []).filter((x) => /\d|free/i.test(x.price));
    const offers = plans.map((x) => ({
      '@type': 'Offer', name: x.name[lang],
      price: /free/i.test(x.price) ? '0' : String(x.price).replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      availability: p.available ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    })).filter((o) => o.price !== '');
    const softwareAppLd = {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication',
      name: `Liafrik ${p.name}`, url: `${SITE}/${lang}${routePath}`, description: p.description[lang],
      applicationCategory: SCHEMA_CATEGORY[p.category.en] || 'BusinessApplication',
      operatingSystem: 'Web', inLanguage: lang,
      publisher: { '@type': 'Organization', name: 'Liafrik', url: SITE },
      ...(offers.length ? { offers } : {}),
    };
    const alts = alternativesForProduct(p.slug);
    const html = renderPage({
      lang,
      path: routePath,
      title: seo.title,
      description: seo.description,
      h1: `${p.name} — ${p.tagline[lang]}`,
      bodyExtra: `<p>${esc(p.description[lang])}</p>
          <p>${esc(p.category[lang])}${p.available ? '' : ` · ${esc(COMING[lang])}`}</p>
          <h2>${esc(FEATURES_LABEL[lang])}</h2>
          ${ul(p.features.map((f) => f[lang]))}
          <h2>${esc(BENEFITS_LABEL[lang])}</h2>
          ${ul(p.benefits.map((f) => f[lang]))}
          <h2>${esc(INDUSTRIES_LABEL[lang])}</h2>
          ${ul(p.industries.map((f) => f[lang]))}
          ${plans.length ? `<h2>${esc(PRICING_LABEL[lang])}</h2>\n          ${ul(plans.map((x) => `${x.name[lang]} — ${x.price}${x.period ? `/${x.period}` : ''}`))}` : ''}
          ${p.available && alts.length ? `<h2>${esc(altToHeading(lang))}</h2>\n          <ul>\n            ${alts.map((a) => `<li><a href="/${lang}/alternatives/${a.slug}">${esc(altHubLink(lang, a.name))}</a></li>`).join('\n            ')}\n          </ul>` : ''}`,
      navLinks: [...commonNav],
      ldBlocks: [
        softwareAppLd,
        breadcrumbLd(lang, [
          { name: NAV_LABEL.products[lang], href: `/${lang}/products` },
          { name: p.name, href: `/${lang}${routePath}` },
        ]),
      ],
      ogType: 'website',
    });
    writeRoute(lang, `products/${p.slug}`, html);
    count++;
  }

  // ---- Alternatives hub ----
  {
    const hub = alternativesHub(products, lang);
    const html = renderPage({
      lang,
      path: '/alternatives',
      title: hub.title,
      description: hub.description,
      h1: hub.h1,
      bodyExtra: hub.groups
        .map((g) => `<h2>${esc(g.heading)}</h2>\n          <ul>\n            ${g.links.map((l) => `<li><a href="/${lang}/alternatives/${l.slug}">${esc(l.label)}</a></li>`).join('\n            ')}\n          </ul>`)
        .join('\n        '),
      navLinks: commonNav,
      ldBlocks: [breadcrumbLd(lang, [{ name: altNavLabel(lang), href: `/${lang}/alternatives` }])],
    });
    writeRoute(lang, 'alternatives', html);
    count++;
  }

  // ---- "Alternative to X" pages ----
  for (const alt of ALTERNATIVES) {
    const p = products.find((x) => x.slug === alt.product);
    if (!p || !p.available) continue;
    const pg = alternativePage(alt, p, lang);
    const routePath = `/alternatives/${alt.slug}`;
    const faqLd = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: pg.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    };
    const html = renderPage({
      lang,
      path: routePath,
      title: pg.title,
      description: pg.description,
      h1: pg.h1,
      bodyExtra: `<p>${esc(pg.intro)}</p>
          ${p.appUrl ? `<p><a href="${esc(p.appUrl)}">${esc(pg.cta.open)}</a> · <a href="/${lang}/products/${p.slug}">${esc(p.name)}</a></p>` : ''}
          <h2>${esc(pg.featuresH)}</h2>
          ${ul(pg.features)}
          <h2>${esc(pg.benefitsH)}</h2>
          ${ul(pg.benefits)}
          <h2>${esc(pg.versusH)}</h2>
          <p>${esc(pg.versusIntro)}</p>
          ${pg.chooseC.length ? `<h3>${esc(pg.chooseCH)}</h3>\n          ${ul(pg.chooseC)}` : ''}
          <h3>${esc(pg.choosePH)}</h3>
          ${ul(pg.chooseP)}
          <h2>${esc(pg.pricingH)}</h2>
          <p>${esc(pg.pricing)}</p>
          <h2>${esc(pg.faqH)}</h2>
          ${pg.faq.map((f) => `<h3>${esc(f.q)}</h3>\n          <p>${esc(f.a)}</p>`).join('\n          ')}
          <p><small>${esc(pg.disclaimer)}</small></p>
          <p><a href="/${lang}/alternatives">${esc(pg.cta.all)}</a></p>`,
      navLinks: commonNav,
      ldBlocks: [
        faqLd,
        breadcrumbLd(lang, [
          { name: altNavLabel(lang), href: `/${lang}/alternatives` },
          { name: pg.h1, href: `/${lang}${routePath}` },
        ]),
      ],
    });
    writeRoute(lang, `alternatives/${alt.slug}`, html);
    count++;
  }
}

// ---- sitemap.xml: every page in every language, with full hreflang sets ----
{
  const paths = new Set();
  for (const slug of Object.keys(STATIC_PAGES)) paths.add(slug ? `/${slug}` : '');
  for (const p of products) paths.add(`/products/${p.slug}`);
  paths.add('/alternatives');
  for (const alt of ALTERNATIVES) {
    const p = products.find((x) => x.slug === alt.product);
    if (p && p.available) paths.add(`/alternatives/${alt.slug}`);
  }
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [];
  for (const path of paths) {
    for (const lang of LANGS) {
      urls.push(`  <url>
    <loc>${SITE}/${lang}${path}</loc>
    <lastmod>${lastmod}</lastmod>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}/${l}${path}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/en${path}" />
  </url>`);
    }
  }
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
  );
  console.log(`sitemap.xml: ${urls.length} URLs (${paths.size} pages x ${LANGS.length} languages).`);
}

// ---- 404.html: Cloudflare Pages serves it with a real HTTP 404 for any URL
// that has no file (instead of the old catch-all that answered 200 "soft 404").
// It is the normal app shell, so the visitor still sees the friendly 404 page.
writeFileSync(
  join(DIST, '404.html'),
  baseHtml
    .replace(/<title>[^<]*<\/title>/, '<title>Page not found | Liafrik</title>')
    .replace(/<link rel="canonical"[^>]*>\s*/, '')
    .replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex, nofollow" />'),
);

console.log(`Prerendered ${count} static HTML files across ${LANGS.length} languages.`);
