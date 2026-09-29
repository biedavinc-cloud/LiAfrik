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

// ---- 2. Static page manifest (title/description per language) ----
// Kept in sync by hand with each page's useSEO() call — a small, stable
// list (9 pages), reviewed whenever those pages' SEO copy changes.
const STATIC_PAGES = {
  '': {
    title: {
      en: 'Liafrik — Global SaaS Ecosystem', fr: 'Liafrik — Écosystème SaaS mondial',
      ar: 'Liafrik — نظام SaaS عالمي متكامل', es: 'Liafrik — Ecosistema SaaS global', pt: 'Liafrik — Ecossistema SaaS global',
    },
    h1: {
      en: 'One Ecosystem. Powerful SaaS. Built for the World.',
      fr: 'Un écosystème. Des SaaS puissants. Conçu pour le monde.',
      ar: 'نظام واحد متكامل. برمجيات قوية. مصمم للعالم.',
      es: 'Un ecosistema. SaaS potentes. Creado para el mundo.',
      pt: 'Um ecossistema. SaaS poderosos. Criado para o mundo.',
    },
    desc: {
      en: 'Liafrik — a global SaaS ecosystem. African roots, global vision. One connected platform for commerce, healthcare, education, HR, finance and more.',
      fr: "Liafrik — un écosystème SaaS mondial. Racines africaines, vision globale. Une plateforme connectée pour le commerce, la santé, l'éducation, les RH, la finance et plus.",
      ar: 'Liafrik — نظام SaaS عالمي متكامل. جذور أفريقية، رؤية عالمية. منصة واحدة متصلة للتجارة والصحة والتعليم والموارد البشرية والتمويل وأكثر.',
      es: 'Liafrik: un ecosistema SaaS global. Raíces africanas, visión global. Una plataforma conectada para comercio, salud, educación, RR. HH., finanzas y más.',
      pt: 'Liafrik — um ecossistema SaaS global. Raízes africanas, visão global. Uma plataforma conectada para comércio, saúde, educação, RH, finanças e mais.',
    },
  },
  products: {
    title: {
      en: 'All Products — Liafrik SaaS Ecosystem', fr: 'Tous les produits — Écosystème SaaS Liafrik',
      ar: 'كل المنتجات — نظام Liafrik المتكامل', es: 'Todos los productos — Ecosistema SaaS Liafrik', pt: 'Todos os produtos — Ecossistema SaaS Liafrik',
    },
    h1: {
      en: 'Explore every Liafrik platform', fr: 'Explorez chaque plateforme Liafrik',
      ar: 'استكشف كل منصات Liafrik', es: 'Explora todas las plataformas Liafrik', pt: 'Explore todas as plataformas Liafrik',
    },
    desc: {
      en: 'Explore every Liafrik app: POS, CRM, Nutro, Health, LiBooks, Atlas and more — one connected ecosystem, built for the world.',
      fr: "Découvrez toutes les applications Liafrik : POS, CRM, Nutro, Health, LiBooks, Atlas et plus — un écosystème connecté, pensé pour le monde.",
      ar: 'استكشف كل تطبيقات Liafrik: POS وCRM وNutro وHealth وLiBooks وAtlas وأكثر — نظام واحد متكامل، مصمم للعالم.',
      es: 'Explora todas las apps de Liafrik: POS, CRM, Nutro, Health, LiBooks, Atlas y más: un ecosistema conectado, creado para el mundo.',
      pt: 'Explore todos os aplicativos da Liafrik: POS, CRM, Nutro, Health, LiBooks, Atlas e mais — um ecossistema conectado, criado para o mundo.',
    },
  },
  founder: {
    title: {
      en: 'Vincent Nogué — Founder & CEO | Liafrik', fr: 'Vincent Nogué — Fondateur et PDG | Liafrik',
      ar: 'فينسنت نوغيه — المؤسس والرئيس التنفيذي | Liafrik', es: 'Vincent Nogué — Fundador y CEO | Liafrik', pt: 'Vincent Nogué — Fundador e CEO | Liafrik',
    },
    h1: {
      en: 'The vision behind Liafrik', fr: 'La vision derrière Liafrik',
      ar: 'الرؤية وراء Liafrik', es: 'La visión detrás de Liafrik', pt: 'A visão por trás da Liafrik',
    },
    desc: {
      en: 'The story behind Liafrik: from graphic design in Cameroon to building a global SaaS ecosystem, led by founder Vincent Nogué.',
      fr: "L'histoire derrière Liafrik : du design graphique au Cameroun à la construction d'un écosystème SaaS mondial.",
      ar: 'قصة Liafrik: من التصميم الجرافيكي في الكاميرون إلى بناء نظام SaaS عالمي متكامل.',
      es: 'La historia detrás de Liafrik: del diseño gráfico en Camerún a construir un ecosistema SaaS global.',
      pt: 'A história por trás da Liafrik: do design gráfico nos Camarões à construção de um ecossistema SaaS global.',
    },
  },
  presence: {
    title: {
      en: 'Global Presence | Liafrik', fr: 'Présence mondiale | Liafrik',
      ar: 'الحضور العالمي | Liafrik', es: 'Presencia global | Liafrik', pt: 'Presença global | Liafrik',
    },
    h1: { en: 'Where we are', fr: 'Où nous sommes', ar: 'أين نحن', es: 'Dónde estamos', pt: 'Onde estamos' },
    desc: {
      en: 'Liafrik operates from Dubai and Yaoundé, built to serve businesses across Africa and the world.',
      fr: "Liafrik opère depuis Dubaï et Yaoundé, conçu pour servir les entreprises à travers l'Afrique et le monde.",
      ar: 'يعمل Liafrik من دبي وياوندي، وقد صُمم لخدمة الشركات عبر أفريقيا والعالم.',
      es: 'Liafrik opera desde Dubái y Yaundé, creado para servir a empresas en toda África y el mundo.',
      pt: 'A Liafrik opera a partir de Dubai e Yaoundé, criada para atender empresas em toda a África e no mundo.',
    },
  },
  security: {
    title: {
      en: 'Security & Trust | Liafrik', fr: 'Sécurité et confiance | Liafrik',
      ar: 'الأمان والثقة | Liafrik', es: 'Seguridad y confianza | Liafrik', pt: 'Segurança e confiança | Liafrik',
    },
    h1: {
      en: 'Security at the core of everything we build', fr: 'La sécurité au cœur de tout ce que nous construisons',
      ar: 'الأمان في صميم كل ما نبنيه', es: 'La seguridad en el centro de todo lo que construimos', pt: 'A segurança no centro de tudo o que construímos',
    },
    desc: {
      en: 'How Liafrik protects your data: strict multi-tenant isolation, encryption, cloud infrastructure, backups, and role-based access across every app.',
      fr: "Comment Liafrik protège vos données : isolation stricte multi-tenant, chiffrement, infrastructure cloud, sauvegardes.",
      ar: 'كيف يحمي Liafrik بياناتك: عزل صارم متعدد المستأجرين، تشفير، بنية تحتية سحابية، نسخ احتياطي.',
      es: 'Cómo Liafrik protege tus datos: aislamiento estricto multi-tenant, cifrado, infraestructura en la nube, copias de seguridad.',
      pt: 'Como a Liafrik protege seus dados: isolamento rigoroso multi-tenant, criptografia, infraestrutura em nuvem, backups.',
    },
  },
  support: {
    title: { en: 'Support | Liafrik', fr: 'Support | Liafrik', ar: 'الدعم | Liafrik', es: 'Soporte | Liafrik', pt: 'Suporte | Liafrik' },
    h1: {
      en: 'We are here to help', fr: 'Nous sommes là pour vous aider',
      ar: 'نحن هنا لمساعدتك', es: 'Estamos aquí para ayudarte', pt: 'Estamos aqui para ajudar',
    },
    desc: {
      en: 'Get help from the Liafrik team — customer support, customer service, and general inquiries for every app in the ecosystem.',
      fr: "Obtenez de l'aide de l'équipe Liafrik — support client, service client et demandes générales.",
      ar: 'احصل على المساعدة من فريق Liafrik — دعم العملاء والاستفسارات العامة.',
      es: 'Obtén ayuda del equipo de Liafrik: soporte técnico, atención al cliente y consultas generales.',
      pt: 'Obtenha ajuda da equipe da Liafrik — suporte ao cliente e perguntas gerais.',
    },
  },
  privacy: {
    title: {
      en: 'Privacy Policy | Liafrik', fr: 'Politique de confidentialité | Liafrik',
      ar: 'سياسة الخصوصية | Liafrik', es: 'Política de privacidad | Liafrik', pt: 'Política de privacidade | Liafrik',
    },
    h1: {
      en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية',
      es: 'Política de Privacidad', pt: 'Política de Privacidade',
    },
    desc: {
      en: 'How Liafrik collects, uses, and protects your data across every app in the ecosystem, with strict multi-tenant data isolation.',
      fr: "Comment Liafrik collecte, utilise et protège vos données à travers chaque application de l'écosystème.",
      ar: 'كيف يجمع Liafrik بياناتك ويستخدمها ويحميها عبر كل تطبيق في النظام المتكامل.',
      es: 'Cómo Liafrik recopila, usa y protege tus datos en cada app del ecosistema.',
      pt: 'Como a Liafrik coleta, usa e protege seus dados em cada aplicativo do ecossistema.',
    },
  },
  terms: {
    title: {
      en: 'Terms of Service | Liafrik', fr: "Conditions d'utilisation | Liafrik",
      ar: 'شروط الخدمة | Liafrik', es: 'Términos de servicio | Liafrik', pt: 'Termos de serviço | Liafrik',
    },
    h1: {
      en: 'Terms of Service', fr: "Conditions d'Utilisation", ar: 'شروط الخدمة',
      es: 'Términos de servicio', pt: 'Termos de serviço',
    },
    desc: {
      en: 'The terms governing your use of the Liafrik SaaS ecosystem — accounts, acceptable use, subscriptions, and liability.',
      fr: "Les conditions régissant votre utilisation de l'écosystème SaaS Liafrik.",
      ar: 'الشروط الحاكمة لاستخدامك لنظام Liafrik المتكامل.',
      es: 'Los términos que rigen el uso del ecosistema SaaS Liafrik.',
      pt: 'Os termos que regem o uso do ecossistema SaaS Liafrik.',
    },
  },
  refund: {
    title: {
      en: 'Refund Policy | Liafrik', fr: 'Politique de remboursement | Liafrik',
      ar: 'سياسة الاسترداد | Liafrik', es: 'Política de reembolso | Liafrik', pt: 'Política de reembolso | Liafrik',
    },
    h1: {
      en: 'Refund Policy', fr: 'Politique de remboursement', ar: 'سياسة الاسترداد',
      es: 'Política de reembolso', pt: 'Política de reembolso',
    },
    desc: {
      en: 'How refunds, cancellations, and billing disputes are handled across the Liafrik SaaS ecosystem.',
      fr: "Comment les remboursements, annulations et litiges de facturation sont gérés.",
      ar: 'كيف تُدار عمليات الاسترداد والإلغاء ومنازعات الفوترة.',
      es: 'Cómo se gestionan los reembolsos, cancelaciones y disputas de facturación.',
      pt: 'Como reembolsos, cancelamentos e disputas de faturamento são tratados.',
    },
  },
  partners: {
    title: {
      en: 'Partners & Investors | Liafrik', fr: 'Partenaires & Investisseurs | Liafrik',
      ar: 'الشركاء والمستثمرون | Liafrik', es: 'Socios e Inversores | Liafrik', pt: 'Parceiros e Investidores | Liafrik',
    },
    h1: {
      en: 'Build the future of the Liafrik ecosystem with us', fr: "Construisez l'avenir de l'écosystème Liafrik avec nous",
      ar: 'ابنِ مستقبل نظام Liafrik المتكامل معنا', es: 'Construye el futuro del ecosistema Liafrik con nosotros', pt: 'Construa o futuro do ecossistema Liafrik conosco',
    },
    desc: {
      en: 'Partner with Liafrik or invest in a global SaaS ecosystem spanning commerce, hospitality, healthcare, education, finance and more.',
      fr: "Devenez partenaire de Liafrik ou investissez dans un écosystème SaaS mondial couvrant le commerce, l'hôtellerie, la santé, l'éducation, la finance et plus.",
      ar: 'كن شريكاً لـ Liafrik أو استثمر في نظام SaaS عالمي متكامل يشمل التجارة والضيافة والصحة والتعليم والتمويل وأكثر.',
      es: 'Asóciate con Liafrik o invierte en un ecosistema SaaS global que abarca comercio, hostelería, salud, educación, finanzas y más.',
      pt: 'Seja parceiro da Liafrik ou invista em um ecossistema SaaS global que abrange comércio, hotelaria, saúde, educação, finanças e mais.',
    },
  },
};

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

function renderPage({ lang, path, title, description, h1, bodyExtra, navLinks, extraJsonLd }) {
  const dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  const url = `${SITE}/${lang}${path}`;
  const navHtml = navLinks
    .map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`)
    .join('\n        ');

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
  <head>
    <meta charset="UTF-8" />
    ${faviconTags}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(description)}" />
    ${themeColorTag}
    <link rel="canonical" href="${url}" />
    ${hreflangTags(path)}
    <title>${esc(title)}</title>
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Liafrik" />
    <meta property="og:image" content="${SITE}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    ${jsonLd}
    ${extraJsonLd ? `<script type="application/ld+json">${JSON.stringify(extraJsonLd)}</script>` : ''}
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

let count = 0;

for (const lang of LANGS) {
  const commonNav = [
    { href: `/${lang}`, label: NAV_LABEL.home[lang] },
    { href: `/${lang}/products`, label: NAV_LABEL.products[lang] },
    { href: `/${lang}/founder`, label: NAV_LABEL.founder[lang] },
    { href: `/${lang}/security`, label: NAV_LABEL.security[lang] },
    { href: `/${lang}/support`, label: NAV_LABEL.support[lang] },
    { href: `/${lang}/privacy`, label: NAV_LABEL.privacy[lang] },
    { href: `/${lang}/terms`, label: NAV_LABEL.terms[lang] },
    { href: `/${lang}/partners`, label: NAV_LABEL.partners[lang] },
  ];

  // Static pages (home + 8 others)
  for (const [slug, page] of Object.entries(STATIC_PAGES)) {
    const routePath = slug ? `/${slug}` : '';
    const html = renderPage({
      lang,
      path: routePath,
      title: page.title[lang],
      description: page.desc[lang],
      h1: page.h1[lang],
      bodyExtra: slug === 'products'
        ? `<ul>\n            ${products
            .map((p) => `<li><a href="/${lang}/products/${p.slug}">${esc(p.name)} — ${esc(p.tagline[lang])}</a></li>`)
            .join('\n            ')}\n          </ul>`
        : '',
      navLinks: commonNav,
    });
    writeRoute(lang, routePath.slice(1), html);
    count++;
  }

  // Product pages
  for (const p of products) {
    const routePath = `/products/${p.slug}`;
    const title = `${p.name} — Liafrik`;
    const firstPlan = p.pricing && p.pricing[0];
    const priceNumber = firstPlan ? String(firstPlan.price).replace(/[^0-9.]/g, '') : '';
    const softwareAppLd = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: `Liafrik ${p.name}`,
      url: `${SITE}/en/products/${p.slug}`,
      description: p.description.en,
      applicationCategory: p.category.en,
      operatingSystem: 'Web',
      ...(firstPlan && priceNumber
        ? { offers: { '@type': 'Offer', price: priceNumber, priceCurrency: 'USD', availability: p.available ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder' } }
        : {}),
    };
    const html = renderPage({
      lang,
      path: routePath,
      title,
      description: p.description[lang],
      h1: `${p.name} — ${p.tagline[lang]}`,
      bodyExtra: `<p>${esc(p.category[lang])}${p.available ? '' : ` · ${esc({ en: 'Coming soon', fr: 'Bientôt disponible', ar: 'قريباً', es: 'Próximamente', pt: 'Em breve' }[lang])}`}</p>
          <ul>
            ${p.features.slice(0, 6).map((f) => `<li>${esc(f[lang])}</li>`).join('\n            ')}
          </ul>`,
      navLinks: [...commonNav, { href: `/${lang}/products`, label: NAV_LABEL.products[lang] }],
      extraJsonLd: softwareAppLd,
    });
    writeRoute(lang, `products/${p.slug}`, html);
    count++;
  }
}

console.log(`Prerendered ${count} static HTML files across ${LANGS.length} languages.`);
