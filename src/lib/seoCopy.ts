// Single source of truth for search-facing copy, used by BOTH the React
// pages and scripts/prerender.mjs so the static HTML that crawlers read
// and the page users see always say the same thing.
//
// Pure module: only relative imports, no browser/React APIs.

import { ALTERNATIVES, type Alternative, type AltLang, type AltText } from '../data/alternatives';

/** The subset of the Product shape this module needs. */
export interface ProductLike {
  slug: string;
  name: string;
  tagline: AltText;
  description: AltText;
  category: AltText;
  available: boolean;
  appUrl?: string;
  features: AltText[];
  benefits: AltText[];
  industries: AltText[];
  pricing: { price: string; period?: string }[];
}

const fmt = (tpl: string, vars: Record<string, string>) =>
  tpl.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));

/** Lower-case the first letter unless the word is an acronym/brand (POS, CRM, LiBooks). */
export const lcFirst = (s: string) => (/^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);

/** Lower-case a category label for use inside a sentence ("Recursos Humanos" →
 *  "recursos humanos"), leaving anything with an acronym (POS, CRM) untouched. */
export const lcCategory = (s: string) => (/[A-Z]{2,}/.test(s) ? s : s.toLowerCase());

/** Cut at a sentence end (or word) so a description fits a search snippet. */
export function truncate(s: string, max = 158): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('。'));
  if (sentence > max * 0.55) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:—-]\s*$/, '') + '…';
}

/** Keep meta descriptions within what search engines display (~160 chars):
 *  drop the closing "See features…" sentence first, then cut at a word. */
function fitDescription(d: string, max = 160): string {
  if (d.length <= max) return d;
  const withoutTail = d.replace(/\s+[^.]*\.$/, '');
  return truncate(withoutTail.length >= 60 ? withoutTail : d, max);
}

const host = (url?: string) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '');

// ---------------------------------------------------------------------------
// Product pages
// ---------------------------------------------------------------------------

const PRODUCT_TITLE: Record<AltLang, string> = {
  en: '{P} — {cat} software{alt} | Liafrik',
  fr: '{P} — Logiciel {cat}{alt} | Liafrik',
  ar: '{P} — برنامج {cat}{alt} | Liafrik',
  es: '{P} — Software de {cat}{alt} | Liafrik',
  pt: '{P} — Software de {cat}{alt} | Liafrik',
};
const PRODUCT_TITLE_ALT: Record<AltLang, string> = {
  en: ' · {C} alternative',
  fr: ' · alternative à {C}',
  ar: ' · بديل {C}',
  es: ' · alternativa a {C}',
  pt: ' · alternativa para {C}',
};
const COMING_SOON: Record<AltLang, string> = {
  en: 'Coming soon', fr: 'Bientôt disponible', ar: 'قريباً', es: 'Próximamente', pt: 'Em breve',
};

export function productSeo(p: ProductLike, lang: AltLang): { title: string; description: string } {
  const top = ALTERNATIVES.find((a) => a.product === p.slug && !a.discontinued);
  const cat = lang === 'en' || lang === 'ar' ? p.category[lang] : lcCategory(p.category[lang]);
  const alt = p.available && top ? fmt(PRODUCT_TITLE_ALT[lang], { C: top.name }) : '';
  const title = fmt(PRODUCT_TITLE[lang], { P: p.name, cat, alt });
  const base = truncate(p.description[lang], p.available ? 158 : 140);
  return { title, description: p.available ? base : `${base} ${COMING_SOON[lang]}.` };
}

// ---------------------------------------------------------------------------
// "Alternative to X" pages
// ---------------------------------------------------------------------------

const T = {
  title: {
    en: '{C} alternative: {P} — {cat} | Liafrik',
    fr: 'Alternative à {C} : {P} — {cat} | Liafrik',
    ar: 'بديل {C} ({Car}): {P} — {cat} | Liafrik',
    es: 'Alternativa a {C}: {P} — {cat} | Liafrik',
    pt: 'Alternativa para {C}: {P} — {cat} | Liafrik',
  },
  desc: {
    en: '{P} by Liafrik is a {C} alternative: {f1}, {f2} and {f3}. See features, pricing and FAQ.',
    fr: '{P} de Liafrik est une alternative à {C} : {f1}, {f2} et {f3}. Découvrez les fonctionnalités, les tarifs et la FAQ.',
    ar: '{P} من Liafrik بديل لـ {C}: {f1} و{f2} و{f3}. اطّلع على الميزات والأسعار والأسئلة الشائعة.',
    es: '{P} de Liafrik es una alternativa a {C}: {f1}, {f2} y {f3}. Consulta funciones, precios y preguntas frecuentes.',
    pt: '{P} da Liafrik é uma alternativa para {C}: {f1}, {f2} e {f3}. Veja recursos, preços e perguntas frequentes.',
  },
  descDisc: {
    en: '{C} has shut down. {P} by Liafrik is an alternative: {f1}, {f2} and {f3}. See features, pricing and FAQ.',
    fr: '{C} a fermé. {P} de Liafrik est une alternative : {f1}, {f2} et {f3}. Découvrez les fonctionnalités, les tarifs et la FAQ.',
    ar: 'تم إيقاف {C}. {P} من Liafrik بديل: {f1} و{f2} و{f3}. اطّلع على الميزات والأسعار والأسئلة الشائعة.',
    es: '{C} ha cerrado. {P} de Liafrik es una alternativa: {f1}, {f2} y {f3}. Consulta funciones, precios y preguntas frecuentes.',
    pt: '{C} foi encerrado. {P} da Liafrik é uma alternativa: {f1}, {f2} e {f3}. Veja recursos, preços e perguntas frequentes.',
  },
  h1: {
    en: '{C} alternative: {P} by Liafrik',
    fr: 'Une alternative à {C} : {P} de Liafrik',
    ar: 'بديل {C} ({Car}): {P} من Liafrik',
    es: 'Una alternativa a {C}: {P} de Liafrik',
    pt: 'Uma alternativa para {C}: {P} da Liafrik',
  },
  intro: {
    en: 'Looking for a {C} alternative? Meet {P} by Liafrik — {tagline}. {desc}',
    fr: 'Vous cherchez une alternative à {C} ? Découvrez {P} de Liafrik — {tagline}. {desc}',
    ar: 'تبحث عن بديل لـ {C}؟ تعرّف على {P} من Liafrik — {tagline}. {desc}',
    es: '¿Buscas una alternativa a {C}? Conoce {P} de Liafrik — {tagline}. {desc}',
    pt: 'Procurando uma alternativa para {C}? Conheça {P} da Liafrik — {tagline}. {desc}',
  },
  introDisc: {
    en: '{C} is no longer available. If you are looking for a replacement, meet {P} by Liafrik — {tagline}. {desc}',
    fr: '{C} n’est plus disponible. Si vous cherchez un remplaçant, découvrez {P} de Liafrik — {tagline}. {desc}',
    ar: 'لم يعد {C} متاحاً. إذا كنت تبحث عن بديل، تعرّف على {P} من Liafrik — {tagline}. {desc}',
    es: '{C} ya no está disponible. Si buscas un reemplazo, conoce {P} de Liafrik — {tagline}. {desc}',
    pt: '{C} não está mais disponível. Se você procura um substituto, conheça {P} da Liafrik — {tagline}. {desc}',
  },
  featuresH: { en: '{P} features', fr: 'Fonctionnalités de {P}', ar: 'ميزات {P}', es: 'Funciones de {P}', pt: 'Recursos do {P}' },
  benefitsH: {
    en: 'Why teams choose {P}', fr: 'Pourquoi les équipes choisissent {P}', ar: 'لماذا تختار الفرق {P}',
    es: 'Por qué los equipos eligen {P}', pt: 'Por que as equipes escolhem o {P}',
  },
  versusH: {
    en: '{C} vs {P}: which one fits your business?', fr: '{C} ou {P} : lequel convient à votre activité ?',
    ar: '{C} أم {P}: أيهما يناسب عملك؟', es: '{C} o {P}: ¿cuál encaja con tu negocio?', pt: '{C} ou {P}: qual combina com o seu negócio?',
  },
  versusIntro: {
    en: '{C} is {kind}. {P} is built for: {industries}.',
    fr: '{C} est {kind}. {P} est conçu pour : {industries}.',
    ar: '{C}: {kind}. {P} مصمم لـ: {industries}.',
    es: '{C} es {kind}. {P} está pensado para: {industries}.',
    pt: '{C} é {kind}. {P} foi criado para: {industries}.',
  },
  versusIntroDisc: {
    en: '{C} was {kind}. {P} is built for: {industries}.',
    fr: '{C} était {kind}. {P} est conçu pour : {industries}.',
    ar: '{C} كان {kind}. {P} مصمم لـ: {industries}.',
    es: '{C} era {kind}. {P} está pensado para: {industries}.',
    pt: '{C} era {kind}. {P} foi criado para: {industries}.',
  },
  chooseC: { en: 'Choose {C} if:', fr: 'Choisissez {C} si :', ar: 'اختر {C} إذا:', es: 'Elige {C} si:', pt: 'Escolha {C} se:' },
  chooseCa: {
    en: 'you rely on {eco}.', fr: 'vous vous appuyez sur {eco}.', ar: 'كنت تعتمد على {eco}.',
    es: 'dependes de {eco}.', pt: 'você depende de {eco}.',
  },
  chooseCb: {
    en: 'your team is already trained on {C} and the cost of switching outweighs the benefits for now.',
    fr: 'votre équipe est déjà formée à {C} et le coût du changement dépasse pour l’instant les bénéfices.',
    ar: 'كان فريقك مدرَّباً بالفعل على {C} وتكلفة الانتقال تفوق الفوائد حالياً.',
    es: 'tu equipo ya está formado en {C} y el coste de cambiar supera los beneficios por ahora.',
    pt: 'sua equipe já foi treinada em {C} e o custo da mudança supera os benefícios por enquanto.',
  },
  chooseP: { en: 'Choose {P} if you want:', fr: 'Choisissez {P} si vous voulez :', ar: 'اختر {P} إذا كنت تريد:', es: 'Elige {P} si quieres:', pt: 'Escolha {P} se você quer:' },
  chooseEco: {
    en: 'One connected platform with the rest of the Liafrik ecosystem',
    fr: 'Une plateforme connectée au reste de l’écosystème Liafrik',
    ar: 'منصة واحدة متصلة ببقية منظومة Liafrik',
    es: 'Una plataforma conectada con el resto del ecosistema Liafrik',
    pt: 'Uma plataforma conectada ao restante do ecossistema Liafrik',
  },
  pricingH: { en: '{P} pricing', fr: 'Tarifs de {P}', ar: 'أسعار {P}', es: 'Precios de {P}', pt: 'Preços do {P}' },
  priceFrom: {
    en: 'Plans start at {price}/{per}.', fr: 'Les offres démarrent à {price}/{per}.', ar: 'تبدأ الباقات من {price}/{per}.',
    es: 'Los planes empiezan en {price}/{per}.', pt: 'Os planos começam em {price}/{per}.',
  },
  priceFree: {
    en: 'A free plan is also available.', fr: 'Une offre gratuite est également disponible.', ar: 'تتوفر أيضاً باقة مجانية.',
    es: 'También hay un plan gratuito.', pt: 'Também há um plano gratuito.',
  },
  priceNone: {
    en: 'Contact the Liafrik team for a tailored quote.', fr: 'Contactez l’équipe Liafrik pour un devis sur mesure.',
    ar: 'تواصل مع فريق Liafrik للحصول على عرض سعر مخصص.', es: 'Contacta con el equipo de Liafrik para un presupuesto a medida.',
    pt: 'Fale com a equipe da Liafrik para um orçamento sob medida.',
  },
  faqH: { en: 'Frequently asked questions', fr: 'Questions fréquentes', ar: 'الأسئلة الشائعة', es: 'Preguntas frecuentes', pt: 'Perguntas frequentes' },
  q1: {
    en: 'Is {P} a good alternative to {C}?', fr: '{P} est-il une bonne alternative à {C} ?', ar: 'هل {P} بديل جيد لـ {C}؟',
    es: '¿Es {P} una buena alternativa a {C}?', pt: 'O {P} é uma boa alternativa para {C}?',
  },
  a1: {
    en: '{P} is Liafrik’s app in the “{cat}” category and covers {f1}, {f2} and {f3}. Whether it is the right fit depends on your needs — compare the features above with what you use {C} for.',
    fr: '{P} est l’application Liafrik de la catégorie « {cat} » et couvre {f1}, {f2} et {f3}. Son adéquation dépend de vos besoins — comparez les fonctionnalités ci-dessus avec l’usage que vous faites de {C}.',
    ar: '{P} هو تطبيق Liafrik ضمن فئة «{cat}» ويغطي {f1} و{f2} و{f3}. يعتمد مدى ملاءمته على احتياجاتك — قارن الميزات أعلاه بما تستخدم {C} من أجله.',
    es: '{P} es la app de Liafrik de la categoría «{cat}» y cubre {f1}, {f2} y {f3}. Que sea la opción adecuada depende de tus necesidades: compara las funciones anteriores con lo que usas {C}.',
    pt: '{P} é o aplicativo da Liafrik da categoria “{cat}” e cobre {f1}, {f2} e {f3}. Se é a escolha certa depende das suas necessidades — compare os recursos acima com o que você usa em {C}.',
  },
  q1Disc: {
    en: 'Is {C} still available?', fr: '{C} est-il toujours disponible ?', ar: 'هل ما زال {C} متاحاً؟',
    es: '¿Sigue disponible {C}?', pt: '{C} ainda está disponível?',
  },
  a1Disc: {
    en: 'No. {C} was {kind}.', fr: 'Non. {C} était {kind}.', ar: 'لا. {C} كان {kind}.',
    es: 'No. {C} era {kind}.', pt: 'Não. {C} era {kind}.',
  },
  q1bDisc: {
    en: 'What can I use instead of {C}?', fr: 'Que puis-je utiliser à la place de {C} ?', ar: 'ماذا يمكنني استخدامه بدلاً من {C}؟',
    es: '¿Qué puedo usar en lugar de {C}?', pt: 'O que posso usar no lugar de {C}?',
  },
  a1bDisc: {
    en: '{P} by Liafrik is one option: {tagline}. It covers {f1}, {f2} and {f3}.',
    fr: '{P} de Liafrik en est une : {tagline}. Il couvre {f1}, {f2} et {f3}.',
    ar: '{P} من Liafrik أحد الخيارات: {tagline}. ويغطي {f1} و{f2} و{f3}.',
    es: '{P} de Liafrik es una opción: {tagline}. Cubre {f1}, {f2} y {f3}.',
    pt: '{P} da Liafrik é uma opção: {tagline}. Cobre {f1}, {f2} e {f3}.',
  },
  q2: { en: 'How much does {P} cost?', fr: 'Combien coûte {P} ?', ar: 'كم تبلغ تكلفة {P}؟', es: '¿Cuánto cuesta {P}?', pt: 'Quanto custa o {P}?' },
  q3: {
    en: 'Can I use {P} with other Liafrik apps?', fr: 'Puis-je utiliser {P} avec les autres applications Liafrik ?',
    ar: 'هل يمكنني استخدام {P} مع تطبيقات Liafrik الأخرى؟', es: '¿Puedo usar {P} con otras apps de Liafrik?', pt: 'Posso usar o {P} com outros aplicativos da Liafrik?',
  },
  a3: {
    en: 'Yes. {P} is part of the Liafrik ecosystem, where apps such as POS, CRM, LiBooks and Atlas are designed to work together as one connected platform.',
    fr: 'Oui. {P} fait partie de l’écosystème Liafrik, où des applications comme POS, CRM, LiBooks et Atlas sont conçues pour fonctionner ensemble comme une seule plateforme connectée.',
    ar: 'نعم. {P} جزء من منظومة Liafrik، حيث صُممت تطبيقات مثل POS وCRM وLiBooks وAtlas لتعمل معاً كمنصة واحدة متصلة.',
    es: 'Sí. {P} forma parte del ecosistema Liafrik, donde apps como POS, CRM, LiBooks y Atlas están diseñadas para funcionar juntas como una sola plataforma conectada.',
    pt: 'Sim. {P} faz parte do ecossistema Liafrik, em que aplicativos como POS, CRM, LiBooks e Atlas foram criados para funcionar juntos como uma única plataforma conectada.',
  },
  q4: { en: 'Is {P} available now?', fr: '{P} est-il disponible dès maintenant ?', ar: 'هل {P} متاح الآن؟', es: '¿Está {P} disponible ahora?', pt: 'O {P} já está disponível?' },
  a4: {
    en: 'Yes — {P} is available now. You can open it at {host}.', fr: 'Oui — {P} est disponible dès maintenant. Vous pouvez l’ouvrir sur {host}.',
    ar: 'نعم — {P} متاح الآن. يمكنك فتحه على {host}.', es: 'Sí — {P} está disponible ahora. Puedes abrirlo en {host}.',
    pt: 'Sim — {P} já está disponível. Você pode abri-lo em {host}.',
  },
  disclaimer: {
    en: '{C} is a trademark of its respective owner. Liafrik is not affiliated with, endorsed by or sponsored by {C}. This page reflects publicly available information and Liafrik’s own product data, and may change over time.',
    fr: '{C} est une marque de son propriétaire respectif. Liafrik n’est ni affilié à {C}, ni approuvé ou sponsorisé par {C}. Cette page s’appuie sur des informations publiques et sur les données produit de Liafrik, et peut évoluer.',
    ar: '{C} علامة تجارية مملوكة لأصحابها. شركة Liafrik ليست تابعة لـ {C} ولا معتمدة أو مدعومة منها. تعتمد هذه الصفحة على معلومات متاحة للعامة وبيانات منتجات Liafrik، وقد تتغير مع الوقت.',
    es: '{C} es una marca de su respectivo propietario. Liafrik no está afiliada a {C}, ni cuenta con su aval o patrocinio. Esta página se basa en información pública y en los datos de producto de Liafrik, y puede cambiar con el tiempo.',
    pt: '{C} é uma marca de seu respectivo proprietário. A Liafrik não é afiliada, aprovada nem patrocinada por {C}. Esta página reflete informações públicas e dados de produto da própria Liafrik, e pode mudar com o tempo.',
  },
  open: { en: 'Open {P}', fr: 'Ouvrir {P}', ar: 'افتح {P}', es: 'Abrir {P}', pt: 'Abrir {P}' },
  contact: { en: 'Talk to sales', fr: 'Parler à un conseiller', ar: 'تحدث مع فريق المبيعات', es: 'Hablar con ventas', pt: 'Falar com vendas' },
  seeProduct: {
    en: 'See {P} plans and features', fr: 'Voir les offres et fonctionnalités de {P}', ar: 'اطّلع على باقات {P} وميزاته',
    es: 'Ver planes y funciones de {P}', pt: 'Ver planos e recursos do {P}',
  },
  all: { en: 'All alternatives', fr: 'Toutes les alternatives', ar: 'كل البدائل', es: 'Todas las alternativas', pt: 'Todas as alternativas' },
  perMo: { en: 'month', fr: 'mois', ar: 'شهر', es: 'mes', pt: 'mês' },
  perYr: { en: 'year', fr: 'an', ar: 'سنة', es: 'año', pt: 'ano' },
  hubTitle: {
    en: 'Alternatives to popular software | Liafrik', fr: 'Alternatives aux logiciels populaires | Liafrik',
    ar: 'بدائل للبرمجيات الشائعة | Liafrik', es: 'Alternativas a software popular | Liafrik', pt: 'Alternativas a softwares populares | Liafrik',
  },
  hubDesc: {
    en: 'Compare Liafrik apps with tools you may already use: ecommerce, point of sale, CRM, accounting, restaurants, marketplaces and personal finance.',
    fr: 'Comparez les applications Liafrik aux outils que vous utilisez déjà : e-commerce, point de vente, CRM, comptabilité, restauration et finances personnelles.',
    ar: 'قارن تطبيقات Liafrik بالأدوات التي قد تستخدمها بالفعل: التجارة الإلكترونية ونقاط البيع وCRM والمحاسبة والمطاعم والأسواق الإلكترونية والمالية الشخصية.',
    es: 'Compara las apps de Liafrik con las herramientas que quizá ya usas: comercio electrónico, punto de venta, CRM, contabilidad, restaurantes, marketplaces y finanzas personales.',
    pt: 'Compare os aplicativos da Liafrik com as ferramentas que você talvez já use: e-commerce, ponto de venda, CRM, contabilidade, restaurantes, marketplaces e finanças pessoais.',
  },
  hubH1: {
    en: 'Looking for an alternative? Switch to Liafrik', fr: 'Vous cherchez une alternative ? Passez à Liafrik',
    ar: 'تبحث عن بديل؟ انتقل إلى Liafrik', es: '¿Buscas una alternativa? Pásate a Liafrik', pt: 'Procurando uma alternativa? Mude para a Liafrik',
  },
  hubGroup: { en: '{P} — alternative to:', fr: '{P} — alternative à :', ar: '{P} — بديل لـ:', es: '{P} — alternativa a:', pt: '{P} — alternativa para:' },
  hubLink: { en: '{C} alternative', fr: 'Alternative à {C}', ar: 'بديل {C}', es: 'Alternativa a {C}', pt: 'Alternativa para {C}' },
  navLabel: { en: 'Alternatives', fr: 'Alternatives', ar: 'البدائل', es: 'Alternativas', pt: 'Alternativas' },
  altToHeading: {
    en: 'Looking for an alternative to another tool?', fr: 'Vous cherchez une alternative à un autre outil ?',
    ar: 'تبحث عن بديل لأداة أخرى؟', es: '¿Buscas una alternativa a otra herramienta?', pt: 'Procurando uma alternativa a outra ferramenta?',
  },
} satisfies Record<string, AltText>;

export interface AlternativePageContent {
  title: string;
  description: string;
  h1: string;
  intro: string;
  discontinued: boolean;
  featuresH: string;
  features: string[];
  benefitsH: string;
  benefits: string[];
  versusH: string;
  versusIntro: string;
  chooseCH: string;
  chooseC: string[];
  choosePH: string;
  chooseP: string[];
  pricingH: string;
  pricing: string;
  faqH: string;
  faq: { q: string; a: string }[];
  disclaimer: string;
  cta: { open: string; contact: string; all: string; product: string };
}

export function alternativePage(alt: Alternative, p: ProductLike, lang: AltLang): AlternativePageContent {
  const disc = !!alt.discontinued;
  const cat = p.category[lang];
  const f = (i: number) => lcFirst(p.features[i]?.[lang] ?? '');
  const kind = alt.kind[lang];
  const vars: Record<string, string> = {
    C: alt.name, Car: alt.nameAr, P: p.name, cat, tagline: p.tagline[lang], desc: p.description[lang],
    f1: f(0), f2: f(1), f3: f(2), kind, eco: alt.ecosystem[lang],
    industries: p.industries.map((i) => i[lang]).join(', '),
    host: host(p.appUrl),
  };

  // Pricing sentence from the product's real plans.
  const plans = p.pricing ?? [];
  const isFree = (x: string) => /^(free|\$?0)$/i.test(x.trim());
  const paid = plans.find((x) => /\d/.test(x.price) && !isFree(x.price));
  const free = plans.some((x) => isFree(x.price));
  let pricing = fmt(T.priceNone[lang], vars);
  if (paid) {
    const per = paid.period === 'yr' ? T.perYr[lang] : T.perMo[lang];
    pricing = fmt(T.priceFrom[lang], { price: paid.price, per }) + (free ? ` ${T.priceFree[lang]}` : '');
  }

  const faq = disc
    ? [
        { q: fmt(T.q1Disc[lang], vars), a: fmt(T.a1Disc[lang], vars) },
        { q: fmt(T.q1bDisc[lang], vars), a: fmt(T.a1bDisc[lang], vars) },
      ]
    : [{ q: fmt(T.q1[lang], vars), a: fmt(T.a1[lang], vars) }];
  faq.push({ q: fmt(T.q2[lang], vars), a: pricing });
  faq.push({ q: fmt(T.q3[lang], vars), a: fmt(T.a3[lang], vars) });
  if (p.available) faq.push({ q: fmt(T.q4[lang], vars), a: fmt(T.a4[lang], vars) });

  return {
    title: fmt(T.title[lang], vars),
    description: fitDescription(fmt((disc ? T.descDisc : T.desc)[lang], vars)),
    h1: fmt(T.h1[lang], vars),
    intro: fmt((disc ? T.introDisc : T.intro)[lang], vars),
    discontinued: disc,
    featuresH: fmt(T.featuresH[lang], vars),
    features: p.features.map((x) => x[lang]),
    benefitsH: fmt(T.benefitsH[lang], vars),
    benefits: p.benefits.map((x) => x[lang]),
    versusH: fmt(T.versusH[lang], vars),
    versusIntro: fmt((disc ? T.versusIntroDisc : T.versusIntro)[lang], vars),
    chooseCH: fmt(T.chooseC[lang], vars),
    chooseC: disc ? [] : [fmt(T.chooseCa[lang], vars), fmt(T.chooseCb[lang], vars)],
    choosePH: fmt(T.chooseP[lang], vars),
    chooseP: [...p.benefits.map((x) => x[lang]), T.chooseEco[lang]],
    pricingH: fmt(T.pricingH[lang], vars),
    pricing,
    faqH: T.faqH[lang],
    faq,
    disclaimer: fmt(T.disclaimer[lang], vars),
    cta: { open: fmt(T.open[lang], vars), contact: T.contact[lang], all: T.all[lang], product: fmt(T.seeProduct[lang], vars) },
  };
}

export interface AlternativesHubContent {
  title: string;
  description: string;
  h1: string;
  groups: { product: string; heading: string; links: { slug: string; label: string }[] }[];
}

export function alternativesHub(products: ProductLike[], lang: AltLang): AlternativesHubContent {
  const groups = products
    .filter((p) => p.available && ALTERNATIVES.some((a) => a.product === p.slug))
    .map((p) => ({
      product: p.slug,
      heading: fmt(T.hubGroup[lang], { P: p.name }),
      links: ALTERNATIVES.filter((a) => a.product === p.slug).map((a) => ({
        slug: a.slug,
        label: fmt(T.hubLink[lang], { C: a.name }),
      })),
    }));
  return { title: T.hubTitle[lang], description: T.hubDesc[lang], h1: T.hubH1[lang], groups };
}

export const altNavLabel = (lang: AltLang) => T.navLabel[lang];
export const altToHeading = (lang: AltLang) => T.altToHeading[lang];
export const altHubLink = (lang: AltLang, c: string) => fmt(T.hubLink[lang], { C: c });
