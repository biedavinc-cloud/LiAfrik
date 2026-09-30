// "Alternative to X" landing pages: which well-known product each Liafrik
// app is a credible alternative to, and the few facts the page needs.
//
// Pure data, no imports, so scripts/prerender.mjs can bundle it as-is.
//
// Editorial rules for these pages (keep them when adding entries):
//  - Only describe a competitor in neutral, verifiable terms (what it is,
//    what its users typically rely on). No prices, ratings or claims that
//    could go stale or be disputed.
//  - Only link a competitor to a Liafrik app that is AVAILABLE today.
//  - Competitor names are used to describe the comparison only; every page
//    carries a trademark / non-affiliation notice.

export type AltLang = 'en' | 'fr' | 'ar' | 'es' | 'pt';
export type AltText = Record<AltLang, string>;

export interface Alternative {
  /** URL slug: /{lang}/alternatives/{slug} */
  slug: string;
  /** Competitor name as people search for it. */
  name: string;
  /** Arabic transliteration (Arabic users search for "بديل شوبيفاي"). */
  nameAr: string;
  /** Slug of the Liafrik product that is the alternative. */
  product: string;
  /** What the competitor is, with its article ("a hosted ecommerce platform"). */
  kind: AltText;
  /** What its users typically rely on (noun phrase, used in "You rely on …"). */
  ecosystem: AltText;
  /** True when the competitor no longer exists. */
  discontinued?: boolean;
}

export const ALTERNATIVES: Alternative[] = [
  // ---- Sellia (ecommerce) ----
  {
    slug: 'shopify', name: 'Shopify', nameAr: 'شوبيفاي', product: 'sellia',
    kind: {
      en: 'a hosted ecommerce platform', fr: 'une plateforme e-commerce hébergée', ar: 'منصة تجارة إلكترونية مستضافة',
      es: 'una plataforma de comercio electrónico alojada', pt: 'uma plataforma de e-commerce hospedada',
    },
    ecosystem: {
      en: 'its large library of themes and third-party apps', fr: 'sa vaste bibliothèque de thèmes et d’applications tierces',
      ar: 'مكتبته الكبيرة من القوالب والتطبيقات الخارجية', es: 'su amplia biblioteca de temas y apps de terceros',
      pt: 'sua ampla biblioteca de temas e apps de terceiros',
    },
  },
  {
    slug: 'woocommerce', name: 'WooCommerce', nameAr: 'ووكومرس', product: 'sellia',
    kind: {
      en: 'an open-source ecommerce plugin for WordPress', fr: 'une extension e-commerce open source pour WordPress',
      ar: 'إضافة تجارة إلكترونية مفتوحة المصدر لووردبريس', es: 'un plugin de comercio electrónico de código abierto para WordPress',
      pt: 'um plugin de e-commerce de código aberto para WordPress',
    },
    ecosystem: {
      en: 'the WordPress plugin ecosystem and full control over your own code', fr: 'l’écosystème d’extensions WordPress et le contrôle total de votre code',
      ar: 'منظومة إضافات ووردبريس والتحكم الكامل في الكود الخاص بك', es: 'el ecosistema de plugins de WordPress y el control total de tu código',
      pt: 'o ecossistema de plugins do WordPress e o controle total do seu código',
    },
  },
  {
    slug: 'wix', name: 'Wix', nameAr: 'ويكس', product: 'sellia',
    kind: {
      en: 'a website builder with ecommerce features', fr: 'un créateur de sites avec des fonctions e-commerce',
      ar: 'منشئ مواقع يضم ميزات التجارة الإلكترونية', es: 'un creador de sitios web con funciones de comercio electrónico',
      pt: 'um criador de sites com recursos de e-commerce',
    },
    ecosystem: {
      en: 'its drag-and-drop site builder and template library', fr: 'son éditeur par glisser-déposer et sa bibliothèque de modèles',
      ar: 'أداة السحب والإفلات ومكتبة القوالب الخاصة به', es: 'su editor de arrastrar y soltar y su biblioteca de plantillas',
      pt: 'seu editor de arrastar e soltar e sua biblioteca de modelos',
    },
  },
  // ---- POS (retail) ----
  {
    slug: 'square', name: 'Square', nameAr: 'سكوير', product: 'pos',
    kind: {
      en: 'a payments and point-of-sale platform', fr: 'une plateforme de paiement et de point de vente',
      ar: 'منصة مدفوعات ونقاط بيع', es: 'una plataforma de pagos y punto de venta', pt: 'uma plataforma de pagamentos e ponto de venda',
    },
    ecosystem: {
      en: 'its integrated card readers and hardware', fr: 'ses lecteurs de cartes et son matériel intégrés',
      ar: 'قارئات البطاقات والأجهزة المدمجة الخاصة به', es: 'sus lectores de tarjetas y hardware integrados',
      pt: 'suas leitoras de cartão e hardware integrados',
    },
  },
  {
    slug: 'lightspeed', name: 'Lightspeed', nameAr: 'لايت سبيد', product: 'pos',
    kind: {
      en: 'a retail and hospitality point-of-sale platform', fr: 'une plateforme de point de vente pour le commerce et la restauration',
      ar: 'منصة نقاط بيع للتجزئة والضيافة', es: 'una plataforma de punto de venta para comercio y hostelería',
      pt: 'uma plataforma de ponto de venda para varejo e hotelaria',
    },
    ecosystem: {
      en: 'its specialised retail and hospitality hardware integrations', fr: 'ses intégrations matérielles spécialisées pour le commerce et la restauration',
      ar: 'تكاملاته المتخصصة مع أجهزة التجزئة والضيافة', es: 'sus integraciones de hardware especializadas para comercio y hostelería',
      pt: 'suas integrações de hardware especializadas para varejo e hotelaria',
    },
  },
  // ---- CRM ----
  {
    slug: 'hubspot', name: 'HubSpot', nameAr: 'هبسبوت', product: 'crm',
    kind: {
      en: 'a CRM and marketing platform', fr: 'une plateforme CRM et marketing', ar: 'منصة CRM وتسويق',
      es: 'una plataforma de CRM y marketing', pt: 'uma plataforma de CRM e marketing',
    },
    ecosystem: {
      en: 'its built-in marketing tools and app marketplace', fr: 'ses outils marketing intégrés et sa place de marché d’applications',
      ar: 'أدوات التسويق المدمجة وسوق التطبيقات الخاص به', es: 'sus herramientas de marketing integradas y su marketplace de apps',
      pt: 'suas ferramentas de marketing integradas e seu marketplace de apps',
    },
  },
  {
    slug: 'pipedrive', name: 'Pipedrive', nameAr: 'بايبدرايف', product: 'crm',
    kind: {
      en: 'a sales-focused CRM', fr: 'un CRM axé sur les ventes', ar: 'نظام CRM موجّه للمبيعات',
      es: 'un CRM centrado en ventas', pt: 'um CRM focado em vendas',
    },
    ecosystem: {
      en: 'its sales-pipeline workflow and existing integrations', fr: 'son suivi de pipeline commercial et ses intégrations existantes',
      ar: 'سير عمل خط المبيعات والتكاملات الحالية الخاصة به', es: 'su flujo de pipeline de ventas y sus integraciones existentes',
      pt: 'seu fluxo de pipeline de vendas e suas integrações existentes',
    },
  },
  {
    slug: 'zoho-crm', name: 'Zoho CRM', nameAr: 'زوهو CRM', product: 'crm',
    kind: {
      en: 'a CRM from a wider business-software suite', fr: 'un CRM issu d’une suite logicielle d’entreprise plus large',
      ar: 'نظام CRM ضمن مجموعة برمجيات أعمال أوسع', es: 'un CRM de una suite de software empresarial más amplia',
      pt: 'um CRM de uma suíte de software empresarial mais ampla',
    },
    ecosystem: {
      en: 'the wider Zoho app suite', fr: 'la suite d’applications Zoho', ar: 'مجموعة تطبيقات زوهو الأوسع',
      es: 'la suite de aplicaciones de Zoho', pt: 'a suíte de aplicativos da Zoho',
    },
  },
  {
    slug: 'salesforce', name: 'Salesforce', nameAr: 'سيلز فورس', product: 'atlas',
    kind: {
      en: 'an enterprise CRM platform', fr: 'une plateforme CRM d’entreprise', ar: 'منصة CRM للمؤسسات',
      es: 'una plataforma de CRM empresarial', pt: 'uma plataforma de CRM empresarial',
    },
    ecosystem: {
      en: 'its very large partner and app ecosystem', fr: 'son très vaste écosystème de partenaires et d’applications',
      ar: 'منظومة الشركاء والتطبيقات الضخمة الخاصة به', es: 'su enorme ecosistema de socios y aplicaciones',
      pt: 'seu enorme ecossistema de parceiros e aplicativos',
    },
  },
  // ---- LiBooks (accounting) ----
  {
    slug: 'quickbooks', name: 'QuickBooks', nameAr: 'كويك بوكس', product: 'libooks',
    kind: {
      en: 'an accounting software', fr: 'un logiciel de comptabilité', ar: 'برنامج محاسبة',
      es: 'un software de contabilidad', pt: 'um software de contabilidade',
    },
    ecosystem: {
      en: 'the QuickBooks workflows and integrations your accountant already uses', fr: 'les flux QuickBooks et les intégrations déjà utilisés par votre comptable',
      ar: 'سير عمل QuickBooks والتكاملات التي يستخدمها محاسبك بالفعل', es: 'los flujos de QuickBooks y las integraciones que ya usa tu contador',
      pt: 'os fluxos do QuickBooks e as integrações que seu contador já usa',
    },
  },
  {
    slug: 'xero', name: 'Xero', nameAr: 'زيرو', product: 'libooks',
    kind: {
      en: 'a cloud accounting software', fr: 'un logiciel de comptabilité en ligne', ar: 'برنامج محاسبة سحابي',
      es: 'un software de contabilidad en la nube', pt: 'um software de contabilidade na nuvem',
    },
    ecosystem: {
      en: 'its bank feeds and accountant network', fr: 'ses flux bancaires et son réseau de comptables',
      ar: 'التغذية المصرفية وشبكة المحاسبين الخاصة به', es: 'sus conexiones bancarias y su red de contadores',
      pt: 'suas conexões bancárias e sua rede de contadores',
    },
  },
  // ---- Nutro (restaurants) ----
  {
    slug: 'toast', name: 'Toast', nameAr: 'توست', product: 'nutro',
    kind: {
      en: 'a restaurant point-of-sale and management platform', fr: 'une plateforme de caisse et de gestion pour restaurants',
      ar: 'منصة نقاط بيع وإدارة للمطاعم', es: 'una plataforma de punto de venta y gestión para restaurantes',
      pt: 'uma plataforma de ponto de venda e gestão para restaurantes',
    },
    ecosystem: {
      en: 'its purpose-built restaurant hardware', fr: 'son matériel conçu spécialement pour la restauration',
      ar: 'أجهزته المصممة خصيصاً للمطاعم', es: 'su hardware diseñado específicamente para restaurantes',
      pt: 'seu hardware desenvolvido especificamente para restaurantes',
    },
  },
  // ---- Zanldo (marketplace) ----
  {
    slug: 'etsy', name: 'Etsy', nameAr: 'إتسي', product: 'zanldo',
    kind: {
      en: 'an online marketplace for handmade and vintage goods', fr: 'une place de marché en ligne pour les articles faits main et vintage',
      ar: 'سوق إلكتروني للمنتجات اليدوية والقديمة', es: 'un mercado en línea de artículos hechos a mano y vintage',
      pt: 'um marketplace online de produtos artesanais e vintage',
    },
    ecosystem: {
      en: 'its existing built-in audience of buyers', fr: 'son audience d’acheteurs déjà en place',
      ar: 'جمهور المشترين الحالي المدمج فيه', es: 'su audiencia de compradores ya establecida',
      pt: 'sua audiência de compradores já estabelecida',
    },
  },
  // ---- Kolo (personal finance) ----
  {
    slug: 'ynab', name: 'YNAB', nameAr: 'واي ان ايه بي', product: 'kolo',
    kind: {
      en: 'a budgeting app', fr: 'une application de budget', ar: 'تطبيق ميزانية',
      es: 'una aplicación de presupuesto', pt: 'um aplicativo de orçamento',
    },
    ecosystem: {
      en: 'its established budgeting method and community', fr: 'sa méthode de budget établie et sa communauté',
      ar: 'منهجيته الراسخة في إعداد الميزانية ومجتمعه', es: 'su método de presupuesto consolidado y su comunidad',
      pt: 'seu método de orçamento consolidado e sua comunidade',
    },
  },
  {
    slug: 'mint', name: 'Mint', nameAr: 'منت', product: 'kolo', discontinued: true,
    kind: {
      en: 'a budgeting app that Intuit shut down on March 23, 2024',
      fr: 'une application de budget qu’Intuit a arrêtée le 23 mars 2024',
      ar: 'تطبيق ميزانية أوقفته شركة Intuit في 23 مارس 2024',
      es: 'una aplicación de presupuesto que Intuit cerró el 23 de marzo de 2024',
      pt: 'um aplicativo de orçamento que a Intuit encerrou em 23 de março de 2024',
    },
    ecosystem: { en: '', fr: '', ar: '', es: '', pt: '' },
  },
];

export const getAlternative = (slug: string): Alternative | undefined =>
  ALTERNATIVES.find((a) => a.slug === slug);

export const alternativesForProduct = (productSlug: string): Alternative[] =>
  ALTERNATIVES.filter((a) => a.product === productSlug);
