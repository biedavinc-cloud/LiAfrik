import type { LucideIcon } from 'lucide-react';
import type { Lang } from '@/i18n/LanguageContext';
import {
  ShoppingCart, Store, Users, GraduationCap, UtensilsCrossed,
  HeartPulse, Building2, PiggyBank, MonitorPlay, Flower2, BookOpenCheck,
  ShoppingBag, Route,
} from 'lucide-react';

/** Fully localized (all 5 supported languages) short piece of text. */
export type Localized5 = Record<Lang, string>;

export interface ProductFeature {
  en: string;
  fr: string;
  ar: string;
  es: string;
  pt: string;
}

export interface ProductPricingPlan {
  name: Localized5;
  price: string;
  period?: 'mo' | 'yr';
  popular?: boolean;
  description: Localized5;
  features: ProductFeature[];
  cta: Localized5;
}

export interface Product {
  slug: string;
  name: string;
  tagline: Localized5;
  description: Localized5;
  category: Localized5;
  available: boolean;
  appUrl?: string;
  /**
   * Path to this app's logo image, served from /public.
   * TO CHANGE A LOGO: just drop a new image file at that exact path in
   * `public/images/logos/` (same filename) — no code edits needed.
   * If the file is missing, the UI automatically falls back to the
   * icon + gradient badge below, so nothing ever breaks.
   */
  logo: string;
  icon: LucideIcon;
  gradient: string;
  accent: string;
  features: ProductFeature[];
  benefits: ProductFeature[];
  industries: ProductFeature[];
  dashboard: DashboardSpec;
  pricing: ProductPricingPlan[];
}

export interface Sector {
  id: string;
  name: Localized5;
  icon: LucideIcon;
  productSlugs: string[];
}

export interface DashboardSpec {
  title: { en: string; fr: string };
  metric: { label: { en: string; fr: string }; value: string; delta: string; up: boolean };
  panels: DashboardPanel[];
}

export interface DashboardPanel {
  kind: 'line' | 'bars' | 'donut' | 'list' | 'stat' | 'progress';
  title: { en: string; fr: string };
  data?: number[];
  items?: { label: { en: string; fr: string }; value: string; sub?: string }[];
  segments?: { label: { en: string; fr: string }; value: number; color: string }[];
  stats?: { label: { en: string; fr: string }; value: string; delta?: string; up?: boolean }[];
  progress?: { label: { en: string; fr: string }; value: number; color: string }[];
}

export const products: Product[] = [
  {
    slug: 'pos',
    logo: '/images/logos/pos.png',
    name: 'POS',
    tagline: { en: "Retail Management Platform", fr: "Plateforme de gestion de la vente au détail", ar: "منصة إدارة تجارة التجزئة", es: "Plataforma de gestión de tiendas", pt: "Plataforma de gestão de retalho" },
    description: {
      en: "Run your store, track inventory, accept payments and read your sales in real time — from a single beautiful point-of-sale.", fr: "Gérez votre boutique, suivez vos stocks, encaissez les paiements et lisez vos ventes en temps réel — depuis une seule caisse élégante.", ar: "أدر متجرك، تتبع المخزون، اقبل المدفوعات واطّلع على مبيعاتك في الوقت الفعلي — من نقطة بيع واحدة أنيقة.", es: "Gestiona tu tienda, controla el inventario, acepta pagos y consulta tus ventas en tiempo real, todo desde un único punto de venta elegante.", pt: "Administre sua loja, controle o estoque, aceite pagamentos e acompanhe suas vendas em tempo real — a partir de um único ponto de venda elegante.",
    },
    category: { en: "Retail", fr: "Commerce de détail", ar: "تجارة التجزئة", es: "Comercio minorista", pt: "Varejo" },
    available: true,
    appUrl: 'https://pos.liafrik.com',
    icon: ShoppingCart,
    gradient: 'from-liafrik-600 to-cyanx-500',
    accent: '#0070E0',
    features: [
      { en: "Real-time sales dashboard", fr: "Tableau de ventes en temps réel", ar: "لوحة مبيعات في الوقت الفعلي", es: "Panel de ventas en tiempo real", pt: "Painel de vendas em tempo real" },
      { en: "Smart inventory tracking", fr: "Suivi intelligent des stocks", ar: "تتبّع ذكي للمخزون", es: "Seguimiento inteligente de inventario", pt: "Rastreamento inteligente de estoque" },
      { en: "Card & mobile payments", fr: "Paiements carte et mobile", ar: "مدفوعات بالبطاقة والهاتف", es: "Pagos con tarjeta y móvil", pt: "Pagamentos com cartão e celular" },
      { en: "Detailed sales reports", fr: "Rapports de ventes détaillés", ar: "تقارير مبيعات مفصّلة", es: "Informes de ventas detallados", pt: "Relatórios de vendas detalhados" },
      { en: "Offline mode with auto-sync", fr: "Mode hors-ligne avec sync auto", ar: "وضع عدم الاتصال مع مزامنة تلقائية", es: "Modo sin conexión con sincronización automática", pt: "Modo offline com sincronização automática" },
      { en: "Multi-branch support", fr: "Support multi-agences", ar: "دعم متعدد الفروع", es: "Soporte multisucursal", pt: "Suporte multi-filial" },
    ],
    benefits: [
      { en: "Cut checkout time by half", fr: "Réduisez le temps de caisse de moitié", ar: "قلّص وقت الدفع إلى النصف", es: "Reduce a la mitad el tiempo de caja", pt: "Reduza pela metade o tempo no caixa" },
      { en: "Never run out of stock", fr: "Ne soyez jamais en rupture de stock", ar: "لا تنفد مخزونك أبداً", es: "Nunca te quedes sin existencias", pt: "Nunca fique sem estoque" },
      { en: "Know your numbers live", fr: "Connaissez vos chiffres en direct", ar: "اعرف أرقامك مباشرة", es: "Conoce tus cifras al instante", pt: "Conheça seus números ao vivo" },
      { en: "One tap to close the day", fr: "Une touche pour clôturer la journée", ar: "انقرة واحدة لإغلاق اليوم", es: "Un toque para cerrar el día", pt: "Um toque para fechar o dia" },
    ],
    industries: [
      { en: "Retail stores", fr: "Boutiques de détail", ar: "متاجر التجزئة", es: "Tiendas minoristas", pt: "Lojas de varejo" },
      { en: "Supermarkets", fr: "Supermarchés", ar: "السوبر ماركت", es: "Supermercados", pt: "Supermercados" },
      { en: "Pharmacies", fr: "Pharmacies", ar: "الصيدليات", es: "Farmacias", pt: "Farmácias" },
      { en: "SMEs", fr: "PME", ar: "الشركات الصغيرة والمتوسطة", es: "Pymes", pt: "PMEs" },
    ],
    dashboard: {
      title: { en: 'POS Dashboard', fr: 'Tableau de bord POS' },
      metric: { label: { en: 'Revenue today', fr: "Chiffre d'affaires du jour" }, value: '$24,580', delta: '+18.2%', up: true },
      panels: [
        { kind: 'line', title: { en: 'Sales — last 7 days', fr: 'Ventes — 7 derniers jours' }, data: [42, 58, 47, 71, 63, 88, 96] },
        { kind: 'bars', title: { en: 'Top categories', fr: 'Top catégories' }, data: [80, 62, 45, 38, 28] },
        { kind: 'list', title: { en: 'Recent transactions', fr: 'Transactions récentes' }, items: [
          { label: { en: 'Invoice #1042', fr: 'Facture #1042' }, value: '$320', sub: 'Card' },
          { label: { en: 'Invoice #1041', fr: 'Facture #1041' }, value: '$58', sub: 'Cash' },
          { label: { en: 'Invoice #1040', fr: 'Facture #1040' }, value: '$1,240', sub: 'Mobile' },
          { label: { en: 'Invoice #1039', fr: 'Facture #1039' }, value: '$76', sub: 'Card' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Starter", fr: "Starter", ar: "Starter", es: "Starter", pt: "Starter" }, price: '$19', period: 'mo', description: { en: "For a single store getting started.", fr: "Pour une boutique qui démarre.", ar: "لمتجر واحد بدأ للتو.", es: "Para una sola tienda que empieza.", pt: "Para uma única loja iniciante." }, features: [
        { en: "1 branch · 2 users", fr: "1 agence · 2 utilisateurs", ar: "فرع واحد · مستخدمان", es: "1 sucursal · 2 usuarios", pt: "1 filial · 2 usuários" },
        { en: "Inventory & sales", fr: "Stocks et ventes", ar: "المخزون والمبيعات", es: "Inventario y ventas", pt: "Estoque e vendas" },
        { en: "Card & mobile payments", fr: "Paiements carte et mobile", ar: "مدفوعات بالبطاقة والهاتف", es: "Pagos con tarjeta y móvil", pt: "Pagamentos com cartão e celular" },
        { en: "Daily reports", fr: "Rapports quotidiens", ar: "تقارير يومية", es: "Informes diarios", pt: "Relatórios diários" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Growth", fr: "Growth", ar: "Growth", es: "Growth", pt: "Growth" }, price: '$49', period: 'mo', popular: true, description: { en: "For growing stores with multiple branches.", fr: "Pour les boutiques en croissance multi-agences.", ar: "للمتاجر النامية متعددة الفروع.", es: "Para tiendas en crecimiento con varias sucursales.", pt: "Para lojas em crescimento com várias filiais." }, features: [
        { en: "3 branches · 10 users", fr: "3 agences · 10 utilisateurs", ar: "3 فروع · 10 مستخدمين", es: "3 sucursales · 10 usuarios", pt: "3 filiais · 10 usuários" },
        { en: "Advanced inventory", fr: "Stocks avancés", ar: "مخزون متقدم", es: "Inventario avanzado", pt: "Estoque avançado" },
        { en: "Multi-branch analytics", fr: "Analyses multi-agences", ar: "تحليلات متعددة الفروع", es: "Análisis multisucursal", pt: "Análises multi-filial" },
        { en: "Offline mode + sync", fr: "Mode hors-ligne + sync", ar: "وضع عدم الاتصال + مزامنة", es: "Modo sin conexión + sincronización", pt: "Modo offline + sincronização" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Enterprise", fr: "Enterprise", ar: "Enterprise", es: "Enterprise", pt: "Enterprise" }, price: 'Custom', description: { en: "For chains and large retailers.", fr: "Pour les chaînes et grands détaillants.", ar: "للسلاسل وكبار تجار التجزئة.", es: "Para cadenas y grandes minoristas.", pt: "Para redes e grandes varejistas." }, features: [
        { en: "Unlimited branches", fr: "Agences illimitées", ar: "فروع غير محدودة", es: "Sucursales ilimitadas", pt: "Filiais ilimitadas" },
        { en: "Role permissions", fr: "Permissions par rôle", ar: "صلاحيات حسب الدور", es: "Permisos por rol", pt: "Permissões por função" },
        { en: "API & integrations", fr: "API et intégrations", ar: "واجهة برمجة التطبيقات والتكاملات", es: "API e integraciones", pt: "API e integrações" },
        { en: "24/7 priority support", fr: "Support prioritaire 24/7", ar: "دعم أولوية على مدار الساعة", es: "Soporte prioritario 24/7", pt: "Suporte prioritário 24/7" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'sellia',
    logo: '/images/logos/sellia.png',
    name: 'Sellia',
    tagline: { en: "Commerce Operating System", fr: "Système d'exploitation commercial", ar: "نظام تشغيل التجارة", es: "Sistema operativo de comercio", pt: "Sistema operacional de comércio" },
    description: {
      en: "A complete commerce platform built for ambitious businesses worldwide. Launch your online store, manage orders, customers and products, and accept payments — all from one place.", fr: "Une plateforme de commerce complète, conçue pour les entreprises ambitieuses du monde entier. Lancez votre boutique en ligne, gérez commandes, clients et produits, et encaissez les paiements — depuis un seul endroit.", ar: "منصة تجارة متكاملة مصممة للشركات الطموحة حول العالم. أطلق متجرك الإلكتروني، أدر الطلبات والعملاء والمنتجات، واقبل المدفوعات — كل ذلك من مكان واحد.", es: "Una plataforma de comercio completa creada para empresas ambiciosas de todo el mundo. Lanza tu tienda online, gestiona pedidos, clientes y productos, y acepta pagos, todo desde un solo lugar.", pt: "Uma plataforma de comércio completa criada para empresas ambiciosas em todo o mundo. Lance sua loja online, gerencie pedidos, clientes e produtos, e aceite pagamentos — tudo em um só lugar.",
    },
    category: { en: "Ecommerce", fr: "E-commerce", ar: "التجارة الإلكترونية", es: "Comercio electrónico", pt: "E-commerce" },
    available: false,
    appUrl: 'https://sellia.liafrik.com',
    icon: Store,
    gradient: 'from-liafrik-500 to-liafrik-700',
    accent: '#3D9BFF',
    features: [
      { en: "Online storefront builder", fr: "Créateur de boutique en ligne", ar: "منشئ واجهة متجر إلكتروني", es: "Creador de tienda online", pt: "Criador de loja online" },
      { en: "Order management", fr: "Gestion des commandes", ar: "إدارة الطلبات", es: "Gestión de pedidos", pt: "Gestão de pedidos" },
      { en: "Customer accounts", fr: "Comptes clients", ar: "حسابات العملاء", es: "Cuentas de clientes", pt: "Contas de clientes" },
      { en: "Product catalog", fr: "Catalogue de produits", ar: "كتالوج المنتجات", es: "Catálogo de productos", pt: "Catálogo de produtos" },
      { en: "African payment gateways", fr: "Passerelles de paiement africaines", ar: "بوابات دفع أفريقية", es: "Pasarelas de pago africanas", pt: "Gateways de pagamento africanos" },
      { en: "Shipping integrations", fr: "Intégrations de livraison", ar: "تكاملات الشحن", es: "Integraciones de envío", pt: "Integrações de envio" },
    ],
    benefits: [
      { en: "Sell across Africa", fr: "Vendez dans toute l'Afrique", ar: "بِع في جميع أنحاء أفريقيا", es: "Vende en toda África", pt: "Venda em toda a África" },
      { en: "All payments in one place", fr: "Tous les paiements au même endroit", ar: "جميع المدفوعات في مكان واحد", es: "Todos los pagos en un solo lugar", pt: "Todos os pagamentos em um só lugar" },
      { en: "Grow with built-in CRM", fr: "Développez avec un CRM intégré", ar: "انمُ مع نظام CRM مدمج", es: "Crece con un CRM integrado", pt: "Cresça com um CRM integrado" },
      { en: "Mobile-first checkout", fr: "Paiement pensé mobile-first", ar: "دفع سريع عبر الهاتف أولاً", es: "Pago optimizado para móvil", pt: "Checkout mobile-first" },
    ],
    industries: [
      { en: "Ecommerce brands", fr: "Marques e-commerce", ar: "علامات التجارة الإلكترونية", es: "Marcas de e-commerce", pt: "Marcas de e-commerce" },
      { en: "D2C sellers", fr: "Vendeurs D2C", ar: "بائعو D2C", es: "Vendedores D2C", pt: "Vendedores D2C" },
      { en: "Marketplaces", fr: "Marketplaces", ar: "الأسواق الإلكترونية", es: "Marketplaces", pt: "Marketplaces" },
      { en: "Retailers", fr: "Détaillants", ar: "تجار التجزئة", es: "Minoristas", pt: "Varejistas" },
    ],
    dashboard: {
      title: { en: 'Sellia Store', fr: 'Boutique Sellia' },
      metric: { label: { en: 'Orders today', fr: 'Commandes du jour' }, value: '1,284', delta: '+24.1%', up: true },
      panels: [
        { kind: 'line', title: { en: 'Orders — last 7 days', fr: 'Commandes — 7 derniers jours' }, data: [120, 180, 150, 220, 200, 260, 320] },
        { kind: 'donut', title: { en: 'Traffic sources', fr: 'Sources de trafic' }, segments: [
          { label: { en: 'Organic', fr: 'Organique' }, value: 48, color: '#0070E0' },
          { label: { en: 'Social', fr: 'Social' }, value: 27, color: '#3D9BFF' },
          { label: { en: 'Direct', fr: 'Direct' }, value: 15, color: '#00BFE0' },
          { label: { en: 'Ads', fr: 'Pubs' }, value: 10, color: '#A8D0FF' },
        ]},
        { kind: 'list', title: { en: 'Latest orders', fr: 'Dernières commandes' }, items: [
          { label: { en: 'Order #5821 — Aminata K.', fr: 'Commande #5821 — Aminata K.' }, value: '$89', sub: 'Paid' },
          { label: { en: 'Order #5820 — Ousmane D.', fr: 'Commande #5820 — Ousmane D.' }, value: '$140', sub: 'Shipped' },
          { label: { en: 'Order #5819 — Chioma O.', fr: 'Commande #5819 — Chioma O.' }, value: '$52', sub: 'Paid' },
          { label: { en: 'Order #5818 — Kwame B.', fr: 'Commande #5818 — Kwame B.' }, value: '$215', sub: 'Processing' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Launch", fr: "Launch", ar: "Launch", es: "Launch", pt: "Launch" }, price: '$29', period: 'mo', description: { en: "Start selling online today.", fr: "Commencez à vendre en ligne.", ar: "ابدأ البيع عبر الإنترنت اليوم.", es: "Empieza a vender online hoy mismo.", pt: "Comece a vender online hoje." }, features: [
        { en: "Up to 500 products", fr: "Jusqu'à 500 produits", ar: "حتى 500 منتج", es: "Hasta 500 productos", pt: "Até 500 produtos" },
        { en: "2 staff accounts", fr: "2 comptes équipe", ar: "حسابا فريق", es: "2 cuentas de equipo", pt: "2 contas de equipe" },
        { en: "African payments", fr: "Paiements africains", ar: "مدفوعات أفريقية", es: "Pagos africanos", pt: "Pagamentos africanos" },
        { en: "Basic analytics", fr: "Analyses de base", ar: "تحليلات أساسية", es: "Análisis básico", pt: "Análises básicas" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Scale", fr: "Scale", ar: "Scale", es: "Scale", pt: "Scale" }, price: '$79', period: 'mo', popular: true, description: { en: "For brands scaling across Africa.", fr: "Pour les marques qui se développent en Afrique.", ar: "للعلامات التجارية المتوسعة في أفريقيا.", es: "Para marcas que crecen por toda África.", pt: "Para marcas em expansão pela África." }, features: [
        { en: "Unlimited products", fr: "Produits illimités", ar: "منتجات غير محدودة", es: "Productos ilimitados", pt: "Produtos ilimitados" },
        { en: "10 staff accounts", fr: "10 comptes équipe", ar: "10 حسابات فريق", es: "10 cuentas de equipo", pt: "10 contas de equipe" },
        { en: "Abandoned cart recovery", fr: "Récupération de panier", ar: "استرجاع سلة التسوق المهجورة", es: "Recuperación de carritos abandonados", pt: "Recuperação de carrinho abandonado" },
        { en: "Advanced analytics", fr: "Analyses avancées", ar: "تحليلات متقدمة", es: "Análisis avanzado", pt: "Análises avançadas" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Enterprise", fr: "Enterprise", ar: "Enterprise", es: "Enterprise", pt: "Enterprise" }, price: 'Custom', description: { en: "For high-volume merchants.", fr: "Pour les commerçants à fort volume.", ar: "للتجار ذوي الحجم الكبير.", es: "Para comerciantes de alto volumen.", pt: "Para comerciantes de alto volume." }, features: [
        { en: "Custom checkout", fr: "Tunnel personnalisé", ar: "دفع مخصص", es: "Checkout personalizado", pt: "Checkout personalizado" },
        { en: "API access", fr: "Accès API", ar: "وصول إلى واجهة برمجة التطبيقات", es: "Acceso a la API", pt: "Acesso à API" },
        { en: "Dedicated manager", fr: "Manager dédié", ar: "مدير مخصص", es: "Gestor dedicado", pt: "Gerente dedicado" },
        { en: "24/7 priority support", fr: "Support prioritaire 24/7", ar: "دعم أولوية على مدار الساعة", es: "Soporte prioritario 24/7", pt: "Suporte prioritário 24/7" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'crm',
    logo: '/images/logos/crm.png',
    name: 'CRM',
    tagline: { en: "Customer Relationship Management", fr: "Gestion de la relation client", ar: "إدارة علاقات العملاء", es: "Gestión de relaciones con clientes", pt: "Gestão de relacionamento com o cliente" },
    description: {
      en: "Track every lead, nurture every relationship, and automate your sales pipeline so nothing falls through the cracks.", fr: "Suivez chaque prospect, cultivez chaque relation et automatisez votre pipeline commercial pour ne rien laisser passer.", ar: "تتبّع كل عميل محتمل، نمِّ كل علاقة، وأتمِت خط مبيعاتك حتى لا يفوتك شيء.", es: "Haz seguimiento de cada cliente potencial, cultiva cada relación y automatiza tu embudo de ventas para que nada se te escape.", pt: "Acompanhe cada lead, nutra cada relacionamento e automatize seu funil de vendas para que nada escape.",
    },
    category: { en: "Sales", fr: "Ventes", ar: "المبيعات", es: "Ventas", pt: "Vendas" },
    available: true,
    appUrl: 'https://crm.liafrik.com',
    icon: Users,
    gradient: 'from-cyanx-500 to-liafrik-600',
    accent: '#00BFE0',
    features: [
      { en: "Visual sales pipeline", fr: "Pipeline de ventes visuel", ar: "خط مبيعات مرئي", es: "Embudo de ventas visual", pt: "Funil de vendas visual" },
      { en: "Lead tracking", fr: "Suivi des prospects", ar: "تتبّع العملاء المحتملين", es: "Seguimiento de clientes potenciales", pt: "Rastreamento de leads" },
      { en: "Automated follow-ups", fr: "Relances automatisées", ar: "متابعات تلقائية", es: "Seguimientos automatizados", pt: "Follow-ups automatizados" },
      { en: "Contact management", fr: "Gestion des contacts", ar: "إدارة جهات الاتصال", es: "Gestión de contactos", pt: "Gestão de contatos" },
    ],
    benefits: [
      { en: "Close more deals", fr: "Concluez plus de deals", ar: "أغلق المزيد من الصفقات", es: "Cierra más negocios", pt: "Feche mais negócios" },
      { en: "Never miss a follow-up", fr: "Ne ratez aucune relance", ar: "لا تفوّت أي متابعة", es: "No te pierdas ningún seguimiento", pt: "Nunca perca um follow-up" },
      { en: "Forecast revenue accurately", fr: "Prévoyez vos revenus avec précision", ar: "توقّع الإيرادات بدقة", es: "Pronostica ingresos con precisión", pt: "Preveja a receita com precisão" },
      { en: "Align sales & marketing", fr: "Alignez ventes et marketing", ar: "واءم بين المبيعات والتسويق", es: "Alinea ventas y marketing", pt: "Alinhe vendas e marketing" },
    ],
    industries: [
      { en: "Sales teams", fr: "Équipes commerciales", ar: "فرق المبيعات", es: "Equipos de ventas", pt: "Equipes de vendas" },
      { en: "B2B companies", fr: "Entreprises B2B", ar: "شركات B2B", es: "Empresas B2B", pt: "Empresas B2B" },
      { en: "Agencies", fr: "Agences", ar: "الوكالات", es: "Agencias", pt: "Agências" },
      { en: "SMEs", fr: "PME", ar: "الشركات الصغيرة والمتوسطة", es: "Pymes", pt: "PMEs" },
    ],
    dashboard: {
      title: { en: 'CRM Pipeline', fr: 'Pipeline CRM' },
      metric: { label: { en: 'Open deals', fr: 'Affaires en cours' }, value: '342', delta: '+12.4%', up: true },
      panels: [
        { kind: 'bars', title: { en: 'Pipeline by stage', fr: 'Pipeline par étape' }, data: [90, 70, 55, 40, 22] },
        { kind: 'list', title: { en: 'Hot leads', fr: 'Leads chauds' }, items: [
          { label: { en: 'Cameroon Mining Co.', fr: 'Cameroon Mining Co.' }, value: '$48k', sub: 'Negotiation' },
          { label: { en: 'Savannah Pharma Ltd.', fr: 'Savannah Pharma Ltd.' }, value: '$22k', sub: 'Proposal' },
          { label: { en: 'Dakar Logistics', fr: 'Dakar Logistics' }, value: '$31k', sub: 'Demo' },
        ]},
      ],
    },
    pricing: [],
  },
  {
    slug: 'faka',
    logo: '/images/logos/faka.png',
    name: 'Faka',
    tagline: { en: "HR Management Platform", fr: "Plateforme de gestion RH", ar: "منصة إدارة الموارد البشرية", es: "Plataforma de gestión de RR. HH.", pt: "Plataforma de gestão de RH" },
    description: {
      en: "Manage employees, payroll, attendance and performance from one place — built for workforce operations worldwide.", fr: "Gérez employés, paie, présences et performances depuis un seul endroit — pensé pour les opérations RH partout dans le monde.", ar: "أدر الموظفين والرواتب والحضور والأداء من مكان واحد — مصممة لعمليات القوى العاملة في كل مكان.", es: "Gestiona empleados, nóminas, asistencia y desempeño desde un solo lugar, creado para operaciones de personal en todo el mundo.", pt: "Gerencie funcionários, folha de pagamento, presença e desempenho em um só lugar — criado para operações de RH em todo o mundo.",
    },
    category: { en: "Human Resources", fr: "Ressources humaines", ar: "الموارد البشرية", es: "Recursos Humanos", pt: "Recursos Humanos" },
    available: false,
    appUrl: 'https://faka.liafrik.com',
    icon: Users,
    gradient: 'from-liafrik-600 to-liafrik-400',
    accent: '#0070E0',
    features: [
      { en: "Employee records", fr: "Dossiers employés", ar: "سجلات الموظفين", es: "Registros de empleados", pt: "Registros de funcionários" },
      { en: "Payroll processing", fr: "Traitement de la paie", ar: "معالجة الرواتب", es: "Procesamiento de nóminas", pt: "Processamento de folha de pagamento" },
      { en: "Attendance & leave", fr: "Présences et congés", ar: "الحضور والإجازات", es: "Asistencia y permisos", pt: "Presença e licenças" },
      { en: "Performance reviews", fr: "Évaluations de performance", ar: "تقييمات الأداء", es: "Evaluaciones de desempeño", pt: "Avaliações de desempenho" },
      { en: "Multi-company support", fr: "Support multi-sociétés", ar: "دعم متعدد الشركات", es: "Soporte multiempresa", pt: "Suporte multi-empresa" },
      { en: "Payslip distribution", fr: "Distribution des fiches de paie", ar: "توزيع كشوف الرواتب", es: "Distribución de recibos de nómina", pt: "Distribuição de holerites" },
    ],
    benefits: [
      { en: "Pay everyone on time", fr: "Payez tout le monde à temps", ar: "ادفع للجميع في الوقت المحدد", es: "Paga a todos a tiempo", pt: "Pague todos em dia" },
      { en: "Track attendance automatically", fr: "Suivez les présences automatiquement", ar: "تتبّع الحضور تلقائياً", es: "Controla la asistencia automáticamente", pt: "Rastreie a presença automaticamente" },
      { en: "Comply with local laws", fr: "Soyez conforme aux lois locales", ar: "امتثل للقوانين المحلية", es: "Cumple con las leyes locales", pt: "Cumpra as leis locais" },
      { en: "Empower your people", fr: "Valorisez vos équipes", ar: "مكّن فريقك", es: "Empodera a tu gente", pt: "Valorize sua equipe" },
    ],
    industries: [
      { en: "SMEs", fr: "PME", ar: "الشركات الصغيرة والمتوسطة", es: "Pymes", pt: "PMEs" },
      { en: "Large enterprises", fr: "Grandes entreprises", ar: "الشركات الكبرى", es: "Grandes empresas", pt: "Grandes empresas" },
      { en: "NGOs", fr: "ONG", ar: "منظمات غير حكومية", es: "ONGs", pt: "ONGs" },
      { en: "Government", fr: "Gouvernement", ar: "الحكومة", es: "Gobierno", pt: "Governo" },
    ],
    dashboard: {
      title: { en: 'Faka Dashboard', fr: 'Tableau de bord Faka' },
      metric: { label: { en: 'Active employees', fr: 'Employés actifs' }, value: '486', delta: '+6 new', up: true },
      panels: [
        { kind: 'stat', title: { en: 'Workforce overview', fr: 'Aperçu des effectifs' }, stats: [
          { label: { en: 'Present today', fr: "Présents aujourd'hui" }, value: '462', delta: '95%', up: true },
          { label: { en: 'On leave', fr: 'En congé' }, value: '18' },
          { label: { en: 'Open roles', fr: 'Postes ouverts' }, value: '12' },
          { label: { en: 'Pending reviews', fr: 'Évaluations en attente' }, value: '7' },
        ]},
        { kind: 'progress', title: { en: 'Department headcount', fr: 'Effectifs par département' }, progress: [
          { label: { en: 'Operations', fr: 'Opérations' }, value: 82, color: '#0070E0' },
          { label: { en: 'Sales', fr: 'Ventes' }, value: 64, color: '#3D9BFF' },
          { label: { en: 'Finance', fr: 'Finance' }, value: 45, color: '#00BFE0' },
          { label: { en: 'Tech', fr: 'Tech' }, value: 38, color: '#A8D0FF' },
        ]},
        { kind: 'list', title: { en: 'Recent hires', fr: 'Récentes embauches' }, items: [
          { label: { en: 'Aïcha N. — Sales', fr: 'Aïcha N. — Ventes' }, value: 'Joined', sub: 'Today' },
          { label: { en: 'Moussa T. — Ops', fr: 'Moussa T. — Ops' }, value: 'Joined', sub: 'Yesterday' },
          { label: { en: 'Grace A. — Tech', fr: 'Grace A. — Tech' }, value: 'Joined', sub: '2d ago' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Core", fr: "Core", ar: "Core", es: "Core", pt: "Core" }, price: '$5', period: 'mo', description: { en: "Per employee. For small teams.", fr: "Par employé. Pour les petites équipes.", ar: "لكل موظف. للفرق الصغيرة.", es: "Por empleado. Para equipos pequeños.", pt: "Por funcionário. Para equipes pequenas." }, features: [
        { en: "Employee records", fr: "Dossiers employés", ar: "سجلات الموظفين", es: "Registros de empleados", pt: "Registros de funcionários" },
        { en: "Attendance & leave", fr: "Présences et congés", ar: "الحضور والإجازات", es: "Asistencia y permisos", pt: "Presença e licenças" },
        { en: "Basic payroll", fr: "Paie de base", ar: "رواتب أساسية", es: "Nómina básica", pt: "Folha de pagamento básica" },
        { en: "5 users included", fr: "5 utilisateurs inclus", ar: "5 مستخدمين مشمولين", es: "5 usuarios incluidos", pt: "5 usuários incluídos" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Pro", fr: "Pro", ar: "Pro", es: "Pro", pt: "Pro" }, price: '$9', period: 'mo', popular: true, description: { en: "Per employee. For growing companies.", fr: "Par employé. Pour les entreprises en croissance.", ar: "لكل موظف. للشركات النامية.", es: "Por empleado. Para empresas en crecimiento.", pt: "Por funcionário. Para empresas em crescimento." }, features: [
        { en: "Advanced payroll", fr: "Paie avancée", ar: "رواتب متقدمة", es: "Nómina avanzada", pt: "Folha de pagamento avançada" },
        { en: "Performance reviews", fr: "Évaluations de performance", ar: "تقييمات الأداء", es: "Evaluaciones de desempeño", pt: "Avaliações de desempenho" },
        { en: "Multi-company", fr: "Multi-sociétés", ar: "متعدد الشركات", es: "Multiempresa", pt: "Multi-empresa" },
        { en: "Payslip automation", fr: "Automatisation des fiches", ar: "أتمتة كشوف الرواتب", es: "Automatización de nóminas", pt: "Automação de holerites" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Enterprise", fr: "Enterprise", ar: "Enterprise", es: "Enterprise", pt: "Enterprise" }, price: 'Custom', description: { en: "For large workforces.", fr: "Pour de grands effectifs.", ar: "لقوى عاملة كبيرة.", es: "Para grandes plantillas.", pt: "Para grandes equipes." }, features: [
        { en: "Custom workflows", fr: "Flux personnalisés", ar: "سير عمل مخصص", es: "Flujos de trabajo personalizados", pt: "Fluxos de trabalho personalizados" },
        { en: "API & SSO", fr: "API et SSO", ar: "واجهة برمجة التطبيقات وتسجيل الدخول الموحد", es: "API y SSO", pt: "API e SSO" },
        { en: "Dedicated support", fr: "Support dédié", ar: "دعم مخصص", es: "Soporte dedicado", pt: "Suporte dedicado" },
        { en: "Audit logs", fr: "Journaux d'audit", ar: "سجلات التدقيق", es: "Registros de auditoría", pt: "Registros de auditoria" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'klasoo',
    logo: '/images/logos/klasoo.png',
    name: 'Klasoo',
    tagline: { en: "School Management Platform", fr: "Plateforme de gestion scolaire", ar: "منصة إدارة المدارس", es: "Plataforma de gestión escolar", pt: "Plataforma de gestão escolar" },
    description: {
      en: "A complete operating system for modern educational institutions — connecting administrators, teachers, students and parents in one interconnected platform.", fr: "Un système d'exploitation complet pour les établissements scolaires modernes — connectant administrateurs, enseignants, élèves et parents sur une seule plateforme interconnectée.", ar: "نظام تشغيل متكامل للمؤسسات التعليمية الحديثة — يربط الإداريين والمعلمين والطلاب وأولياء الأمور في منصة واحدة مترابطة.", es: "Un sistema operativo completo para instituciones educativas modernas, que conecta administradores, profesores, estudiantes y padres en una sola plataforma interconectada.", pt: "Um sistema operacional completo para instituições de ensino modernas — conectando administradores, professores, alunos e pais em uma única plataforma interligada.",
    },
    category: { en: "Education", fr: "Éducation", ar: "التعليم", es: "Educación", pt: "Educação" },
    available: false,
    appUrl: 'https://klasoo.liafrik.com',
    icon: GraduationCap,
    gradient: 'from-liafrik-500 to-cyanx-500',
    accent: '#3D9BFF',
    features: [
      { en: "Student records", fr: "Dossiers élèves", ar: "سجلات الطلاب", es: "Registros de estudiantes", pt: "Registros de alunos" },
      { en: "Teacher management", fr: "Gestion des enseignants", ar: "إدارة المعلمين", es: "Gestión de docentes", pt: "Gestão de professores" },
      { en: "Class & timetable", fr: "Classes et emplois du temps", ar: "الفصول والجداول الزمنية", es: "Clases y horarios", pt: "Turmas e horários" },
      { en: "Exams & grading", fr: "Examens et notes", ar: "الامتحانات والتقييم", es: "Exámenes y calificaciones", pt: "Exames e notas" },
      { en: "School finance", fr: "Finances scolaires", ar: "مالية المدرسة", es: "Finanzas escolares", pt: "Finanças escolares" },
      { en: "Parent portal", fr: "Portail parents", ar: "بوابة أولياء الأمور", es: "Portal de padres", pt: "Portal dos pais" },
    ],
    benefits: [
      { en: "Digitize your school", fr: "Numérisez votre école", ar: "رقمنة مدرستك", es: "Digitaliza tu escuela", pt: "Digitalize sua escola" },
      { en: "Engage parents easily", fr: "Impliquez facilement les parents", ar: "أشرك أولياء الأمور بسهولة", es: "Involucra a los padres fácilmente", pt: "Envolva os pais facilmente" },
      { en: "Automate grading", fr: "Automatisez la notation", ar: "أتمِت التقييم", es: "Automatiza las calificaciones", pt: "Automatize a correção" },
      { en: "Track fees collection", fr: "Suivez le recouvrement des frais", ar: "تتبّع تحصيل الرسوم", es: "Controla el cobro de cuotas", pt: "Acompanhe a cobrança de mensalidades" },
    ],
    industries: [
      { en: "K-12 schools", fr: "Écoles primaires et secondaires", ar: "المدارس من الابتدائي إلى الثانوي", es: "Colegios K-12", pt: "Escolas do ensino fundamental e médio" },
      { en: "Universities", fr: "Universités", ar: "الجامعات", es: "Universidades", pt: "Universidades" },
      { en: "Vocational centers", fr: "Centres de formation", ar: "مراكز التدريب المهني", es: "Centros de formación profesional", pt: "Centros de formação profissional" },
      { en: "Cooperatives", fr: "Coopératives", ar: "التعاونيات", es: "Cooperativas", pt: "Cooperativas" },
    ],
    dashboard: {
      title: { en: 'Klasoo Dashboard', fr: 'Tableau de bord Klasoo' },
      metric: { label: { en: 'Enrolled students', fr: 'Élèves inscrits' }, value: '2,184', delta: '+124', up: true },
      panels: [
        { kind: 'stat', title: { en: 'School overview', fr: 'Aperçu école' }, stats: [
          { label: { en: 'Teachers', fr: 'Enseignants' }, value: '142' },
          { label: { en: 'Classes', fr: 'Classes' }, value: '64' },
          { label: { en: 'Exams this week', fr: 'Examens cette semaine' }, value: '18' },
          { label: { en: 'Fees collected', fr: 'Frais collectés' }, value: '92%', up: true },
        ]},
        { kind: 'bars', title: { en: 'Attendance by level', fr: 'Présence par niveau' }, data: [96, 92, 88, 85, 79] },
        { kind: 'list', title: { en: 'Upcoming exams', fr: 'Examens à venir' }, items: [
          { label: { en: 'Math — Grade 10A', fr: 'Maths — 10A' }, value: 'Tomorrow', sub: '09:00' },
          { label: { en: 'Physics — Grade 11B', fr: 'Physique — 11B' }, value: 'Wed', sub: '11:00' },
          { label: { en: 'English — Grade 9C', fr: 'Anglais — 9C' }, value: 'Fri', sub: '14:00' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Basic", fr: "Basic", ar: "Basic", es: "Basic", pt: "Basic" }, price: '$1', period: 'mo', description: { en: "Per student. For small schools.", fr: "Par élève. Pour les petites écoles.", ar: "لكل طالب. للمدارس الصغيرة.", es: "Por estudiante. Para escuelas pequeñas.", pt: "Por aluno. Para escolas pequenas." }, features: [
        { en: "Student records", fr: "Dossiers élèves", ar: "سجلات الطلاب", es: "Registros de estudiantes", pt: "Registros de alunos" },
        { en: "Attendance", fr: "Présences", ar: "الحضور", es: "Asistencia", pt: "Presença" },
        { en: "Up to 200 students", fr: "Jusqu'à 200 élèves", ar: "حتى 200 طالب", es: "Hasta 200 estudiantes", pt: "Até 200 alunos" },
        { en: "Basic grading", fr: "Notation de base", ar: "تقييم أساسي", es: "Calificación básica", pt: "Correção básica" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Standard", fr: "Standard", ar: "Standard", es: "Standard", pt: "Standard" }, price: '$2', period: 'mo', popular: true, description: { en: "Per student. For most schools.", fr: "Par élève. Pour la plupart des écoles.", ar: "لكل طالب. لمعظم المدارس.", es: "Por estudiante. Para la mayoría de las escuelas.", pt: "Por aluno. Para a maioria das escolas." }, features: [
        { en: "Exams & grading", fr: "Examens et notes", ar: "الامتحانات والتقييم", es: "Exámenes y calificaciones", pt: "Exames e notas" },
        { en: "Parent portal", fr: "Portail parents", ar: "بوابة أولياء الأمور", es: "Portal de padres", pt: "Portal dos pais" },
        { en: "School finance", fr: "Finances scolaires", ar: "مالية المدرسة", es: "Finanzas escolares", pt: "Finanças escolares" },
        { en: "Timetable builder", fr: "Emplois du temps", ar: "منشئ الجدول الزمني", es: "Creador de horarios", pt: "Criador de horários" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Campus", fr: "Campus", ar: "Campus", es: "Campus", pt: "Campus" }, price: 'Custom', description: { en: "For universities & large campuses.", fr: "Pour les universités et grands campus.", ar: "للجامعات والحرم الجامعي الكبير.", es: "Para universidades y grandes campus.", pt: "Para universidades e grandes campi." }, features: [
        { en: "Multi-campus", fr: "Multi-campus", ar: "متعدد الحرم الجامعي", es: "Multicampus", pt: "Multi-campus" },
        { en: "API & integrations", fr: "API et intégrations", ar: "واجهة برمجة التطبيقات والتكاملات", es: "API e integraciones", pt: "API e integrações" },
        { en: "Advanced analytics", fr: "Analyses avancées", ar: "تحليلات متقدمة", es: "Análisis avanzado", pt: "Análises avançadas" },
        { en: "Dedicated support", fr: "Support dédié", ar: "دعم مخصص", es: "Soporte dedicado", pt: "Suporte dedicado" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'nutro',
    logo: '/images/logos/nutro.png',
    name: 'Nutro',
    tagline: { en: "Restaurant Technology Platform", fr: "Plateforme technologique de restauration", ar: "منصة تقنية للمطاعم", es: "Plataforma tecnológica para restaurantes", pt: "Plataforma tecnológica para restaurantes" },
    description: {
      en: "A premium restaurant technology platform — present menus digitally, showcase dishes, ingredients and nutritional information, and deliver an elegant dining experience.", fr: "Une plateforme technologique premium pour restaurants — présentez vos menus numériquement, mettez en valeur plats, ingrédients et informations nutritionnelles, et offrez une expérience dining élégante.", ar: "منصة تقنية متميزة للمطاعم — اعرض قوائم الطعام رقمياً، أبرز الأطباق والمكونات والمعلومات الغذائية، وقدّم تجربة طعام أنيقة.", es: "Una plataforma tecnológica premium para restaurantes: presenta menús digitalmente, muestra platos, ingredientes e información nutricional, y ofrece una experiencia gastronómica elegante.", pt: "Uma plataforma tecnológica premium para restaurantes — apresente cardápios digitalmente, destaque pratos, ingredientes e informações nutricionais, e ofereça uma experiência gastronômica elegante.",
    },
    category: { en: "Restaurants", fr: "Restauration", ar: "المطاعم", es: "Restaurantes", pt: "Restaurantes" },
    available: true,
    appUrl: 'https://nutro.liafrik.com',
    icon: UtensilsCrossed,
    gradient: 'from-cyanx-500 to-liafrik-500',
    accent: '#00BFE0',
    features: [
      { en: "Order management", fr: "Gestion des commandes", ar: "إدارة الطلبات", es: "Gestión de pedidos", pt: "Gestão de pedidos" },
      { en: "Kitchen display system", fr: "Système d'affichage cuisine", ar: "نظام عرض المطبخ", es: "Sistema de pantalla de cocina", pt: "Sistema de exibição de cozinha" },
      { en: "Table management", fr: "Gestion des tables", ar: "إدارة الطاولات", es: "Gestión de mesas", pt: "Gestão de mesas" },
      { en: "Inventory & recipes", fr: "Stocks et recettes", ar: "المخزون والوصفات", es: "Inventario y recetas", pt: "Estoque e receitas" },
      { en: "QR menu & ordering", fr: "Menu QR et commandes", ar: "قائمة وطلب عبر QR", es: "Menú y pedidos por QR", pt: "Cardápio e pedidos via QR" },
      { en: "Staff scheduling", fr: "Planning du personnel", ar: "جدولة الموظفين", es: "Programación de personal", pt: "Escala de funcionários" },
    ],
    benefits: [
      { en: "Serve faster", fr: "Servez plus vite", ar: "قدّم الخدمة بشكل أسرع", es: "Sirve más rápido", pt: "Sirva mais rápido" },
      { en: "Cut food waste", fr: "Réduisez le gaspillage", ar: "قلّل هدر الطعام", es: "Reduce el desperdicio de alimentos", pt: "Reduza o desperdício de alimentos" },
      { en: "Delight your guests", fr: "Ravissez vos clients", ar: "أسعد ضيوفك", es: "Deleita a tus comensales", pt: "Encante seus clientes" },
      { en: "Run multiple outlets", fr: "Gérez plusieurs établissements", ar: "أدر عدة فروع", es: "Gestiona varios locales", pt: "Administre vários estabelecimentos" },
    ],
    industries: [
      { en: "Restaurants", fr: "Restaurants", ar: "المطاعم", es: "Restaurantes", pt: "Restaurantes" },
      { en: "Cafés", fr: "Cafés", ar: "المقاهي", es: "Cafeterías", pt: "Cafés" },
      { en: "Fast food chains", fr: "Chaînes de fast-food", ar: "سلاسل الوجبات السريعة", es: "Cadenas de comida rápida", pt: "Redes de fast food" },
      { en: "Hotels", fr: "Hôtels", ar: "الفنادق", es: "Hoteles", pt: "Hotéis" },
    ],
    dashboard: {
      title: { en: 'Nutro Dashboard', fr: 'Tableau de bord Nutro' },
      metric: { label: { en: 'Orders today', fr: 'Commandes du jour' }, value: '342', delta: '+28%', up: true },
      panels: [
        { kind: 'line', title: { en: 'Orders — last 7 days', fr: 'Commandes — 7 derniers jours' }, data: [220, 280, 250, 310, 290, 360, 342] },
        { kind: 'stat', title: { en: 'Floor status', fr: 'État de la salle' }, stats: [
          { label: { en: 'Tables occupied', fr: 'Tables occupées' }, value: '18/24' },
          { label: { en: 'Avg wait', fr: 'Attente moyenne' }, value: '12 min' },
          { label: { en: 'Kitchen tickets', fr: 'Tickets cuisine' }, value: '7' },
          { label: { en: 'Takeaway', fr: 'À emporter' }, value: '42' },
        ]},
        { kind: 'list', title: { en: 'Active orders', fr: 'Commandes en cours' }, items: [
          { label: { en: 'Table 7 — 3 guests', fr: 'Table 7 — 3 couverts' }, value: '$84', sub: 'Preparing' },
          { label: { en: 'Table 12 — 2 guests', fr: 'Table 12 — 2 couverts' }, value: '$52', sub: 'Cooking' },
          { label: { en: 'Takeaway #218', fr: 'À emporter #218' }, value: '$27', sub: 'Ready' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Solo", fr: "Solo", ar: "Solo", es: "Solo", pt: "Solo" }, price: '$39', period: 'mo', description: { en: "For a single outlet.", fr: "Pour un seul établissement.", ar: "لمنفذ واحد.", es: "Para un solo local.", pt: "Para um único estabelecimento." }, features: [
        { en: "1 outlet · 5 staff", fr: "1 établissement · 5 employés", ar: "منفذ واحد · 5 موظفين", es: "1 local · 5 empleados", pt: "1 estabelecimento · 5 funcionários" },
        { en: "Orders & tables", fr: "Commandes et tables", ar: "الطلبات والطاولات", es: "Pedidos y mesas", pt: "Pedidos e mesas" },
        { en: "QR menu", fr: "Menu QR", ar: "قائمة QR", es: "Menú QR", pt: "Cardápio QR" },
        { en: "Daily reports", fr: "Rapports quotidiens", ar: "تقارير يومية", es: "Informes diarios", pt: "Relatórios diários" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Chain", fr: "Chain", ar: "Chain", es: "Chain", pt: "Chain" }, price: '$99', period: 'mo', popular: true, description: { en: "For multi-outlet restaurants.", fr: "Pour les restaurants multi-établissements.", ar: "لمطاعم متعددة الفروع.", es: "Para restaurantes con varios locales.", pt: "Para restaurantes com vários estabelecimentos." }, features: [
        { en: "3 outlets · 20 staff", fr: "3 établissements · 20 employés", ar: "3 منافذ · 20 موظفاً", es: "3 locales · 20 empleados", pt: "3 estabelecimentos · 20 funcionários" },
        { en: "Kitchen display", fr: "Affichage cuisine", ar: "عرض المطبخ", es: "Pantalla de cocina", pt: "Exibição de cozinha" },
        { en: "Inventory & recipes", fr: "Stocks et recettes", ar: "المخزون والوصفات", es: "Inventario y recetas", pt: "Estoque e receitas" },
        { en: "Staff scheduling", fr: "Planning personnel", ar: "جدولة الموظفين", es: "Programación de personal", pt: "Escala de funcionários" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Enterprise", fr: "Enterprise", ar: "Enterprise", es: "Enterprise", pt: "Enterprise" }, price: 'Custom', description: { en: "For large chains & franchises.", fr: "Pour les grandes chaînes et franchises.", ar: "للسلاسل الكبيرة والامتيازات.", es: "Para grandes cadenas y franquicias.", pt: "Para grandes redes e franquias." }, features: [
        { en: "Unlimited outlets", fr: "Établissements illimités", ar: "منافذ غير محدودة", es: "Locales ilimitados", pt: "Estabelecimentos ilimitados" },
        { en: "Centralized analytics", fr: "Analyses centralisées", ar: "تحليلات مركزية", es: "Análisis centralizado", pt: "Análises centralizadas" },
        { en: "API access", fr: "Accès API", ar: "وصول إلى واجهة برمجة التطبيقات", es: "Acceso a la API", pt: "Acesso à API" },
        { en: "Priority support", fr: "Support prioritaire", ar: "دعم أولوية", es: "Soporte prioritario", pt: "Suporte prioritário" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'health',
    logo: '/images/logos/health.png',
    name: 'Health',
    tagline: { en: "Hospital & Clinic Management", fr: "Gestion hospitalière et cliniques", ar: "إدارة المستشفيات والعيادات", es: "Gestión de hospitales y clínicas", pt: "Gestão de hospitais e clínicas" },
    description: {
      en: "Manage your hospital from admissions to medical records — patients, appointments, billing and clinical workflows.", fr: "Gérez votre hôpital des admissions aux dossiers médicaux — patients, rendez-vous, facturation et flux cliniques.", ar: "أدر مستشفاك من القبول إلى السجلات الطبية — المرضى والمواعيد والفواتير وسير العمل السريري.", es: "Gestiona tu hospital desde el ingreso hasta las historias clínicas: pacientes, citas, facturación y flujos clínicos.", pt: "Gerencie seu hospital, das admissões aos prontuários médicos — pacientes, consultas, faturamento e fluxos clínicos.",
    },
    category: { en: "Healthcare", fr: "Santé", ar: "الرعاية الصحية", es: "Salud", pt: "Saúde" },
    available: true,
    appUrl: 'https://health.liafrik.com',
    icon: HeartPulse,
    gradient: 'from-liafrik-600 to-cyanx-400',
    accent: '#0070E0',
    features: [
      { en: "Hospital dashboard", fr: "Tableau de bord hospitalier", ar: "لوحة تحكم المستشفى", es: "Panel del hospital", pt: "Painel do hospital" },
      { en: "Patient records", fr: "Dossiers patients", ar: "سجلات المرضى", es: "Historiales de pacientes", pt: "Prontuários de pacientes" },
      { en: "Appointment scheduling", fr: "Prise de rendez-vous", ar: "جدولة المواعيد", es: "Programación de citas", pt: "Agendamento de consultas" },
      { en: "Medical records & history", fr: "Dossiers et historique médical", ar: "السجلات الطبية والتاريخ المرضي", es: "Historia clínica y antecedentes", pt: "Registros e histórico médico" },
      { en: "Billing & insurance", fr: "Facturation et assurances", ar: "الفواتير والتأمين", es: "Facturación y seguros", pt: "Faturamento e seguros" },
      { en: "Pharmacy management", fr: "Gestion de pharmacie", ar: "إدارة الصيدلية", es: "Gestión de farmacia", pt: "Gestão de farmácia" },
    ],
    benefits: [
      { en: "Better patient care", fr: "Meilleure prise en charge", ar: "رعاية أفضل للمرضى", es: "Mejor atención al paciente", pt: "Melhor atendimento ao paciente" },
      { en: "Reduce wait times", fr: "Réduisez les temps d'attente", ar: "قلّل أوقات الانتظار", es: "Reduce los tiempos de espera", pt: "Reduza os tempos de espera" },
      { en: "Secure medical records", fr: "Dossiers médicaux sécurisés", ar: "سجلات طبية آمنة", es: "Historiales médicos seguros", pt: "Prontuários médicos seguros" },
      { en: "Streamline billing", fr: "Simplifiez la facturation", ar: "بسّط الفوترة", es: "Simplifica la facturación", pt: "Simplifique o faturamento" },
    ],
    industries: [
      { en: "Hospitals", fr: "Hôpitaux", ar: "المستشفيات", es: "Hospitales", pt: "Hospitais" },
      { en: "Clinics", fr: "Cliniques", ar: "العيادات", es: "Clínicas", pt: "Clínicas" },
      { en: "Pharmacies", fr: "Pharmacies", ar: "الصيدليات", es: "Farmacias", pt: "Farmácias" },
      { en: "Labs", fr: "Laboratoires", ar: "المختبرات", es: "Laboratorios", pt: "Laboratórios" },
    ],
    dashboard: {
      title: { en: 'Health Dashboard', fr: 'Tableau de bord Health' },
      metric: { label: { en: 'Patients today', fr: 'Patients du jour' }, value: '486', delta: '+9.4%', up: true },
      panels: [
        { kind: 'stat', title: { en: 'Hospital status', fr: "État de l'hôpital" }, stats: [
          { label: { en: 'Beds available', fr: 'Lits disponibles' }, value: '38/120' },
          { label: { en: 'In surgery', fr: 'En chirurgie' }, value: '4' },
          { label: { en: 'ER cases', fr: "Cas d'urgence" }, value: '12' },
          { label: { en: 'Appointments', fr: 'Rendez-vous' }, value: '94' },
        ]},
        { kind: 'line', title: { en: 'Admissions — 30 days', fr: 'Admissions — 30 jours' }, data: [40, 52, 48, 60, 55, 72, 68, 80, 76, 88] },
        { kind: 'list', title: { en: 'Next appointments', fr: 'Prochains rendez-vous' }, items: [
          { label: { en: 'Dr. Mensah — Cardiology', fr: 'Dr. Mensah — Cardiologie' }, value: '09:30', sub: 'Room 4' },
          { label: { en: 'Dr. Adebayo — Pediatrics', fr: 'Dr. Adebayo — Pédiatrie' }, value: '10:00', sub: 'Room 7' },
          { label: { en: 'Dr. Diallo — General', fr: 'Dr. Diallo — Général' }, value: '10:15', sub: 'Room 2' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Clinic", fr: "Clinic", ar: "Clinic", es: "Clinic", pt: "Clinic" }, price: '$99', period: 'mo', description: { en: "For small clinics.", fr: "Pour les petites cliniques.", ar: "للعيادات الصغيرة.", es: "Para clínicas pequeñas.", pt: "Para clínicas pequenas." }, features: [
        { en: "Up to 500 patients", fr: "Jusqu'à 500 patients", ar: "حتى 500 مريض", es: "Hasta 500 pacientes", pt: "Até 500 pacientes" },
        { en: "Appointments", fr: "Rendez-vous", ar: "المواعيد", es: "Citas", pt: "Consultas" },
        { en: "Patient records", fr: "Dossiers patients", ar: "سجلات المرضى", es: "Historiales de pacientes", pt: "Prontuários de pacientes" },
        { en: "Basic billing", fr: "Facturation de base", ar: "فوترة أساسية", es: "Facturación básica", pt: "Faturamento básico" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Hospital", fr: "Hospital", ar: "Hospital", es: "Hospital", pt: "Hospital" }, price: '$299', period: 'mo', popular: true, description: { en: "For mid-size hospitals.", fr: "Pour les hôpitaux de taille moyenne.", ar: "للمستشفيات المتوسطة.", es: "Para hospitales medianos.", pt: "Para hospitais de médio porte." }, features: [
        { en: "Up to 5,000 patients", fr: "Jusqu'à 5 000 patients", ar: "حتى 5,000 مريض", es: "Hasta 5.000 pacientes", pt: "Até 5.000 pacientes" },
        { en: "Medical records", fr: "Dossiers médicaux", ar: "السجلات الطبية", es: "Historiales médicos", pt: "Prontuários médicos" },
        { en: "Pharmacy module", fr: "Module pharmacie", ar: "وحدة الصيدلية", es: "Módulo de farmacia", pt: "Módulo de farmácia" },
        { en: "Insurance billing", fr: "Facturation assurance", ar: "فوترة التأمين", es: "Facturación de seguros", pt: "Faturamento de seguros" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Network", fr: "Network", ar: "Network", es: "Red", pt: "Rede" }, price: 'Custom', description: { en: "For hospital networks.", fr: "Pour les réseaux d'hôpitaux.", ar: "لشبكات المستشفيات.", es: "Para redes de hospitales.", pt: "Para redes de hospitais." }, features: [
        { en: "Unlimited patients", fr: "Patients illimités", ar: "مرضى غير محدودين", es: "Pacientes ilimitados", pt: "Pacientes ilimitados" },
        { en: "Multi-facility", fr: "Multi-établissements", ar: "متعدد المرافق", es: "Multiestablecimiento", pt: "Multi-unidades" },
        { en: "API & HL7", fr: "API et HL7", ar: "واجهة برمجة التطبيقات و HL7", es: "API y HL7", pt: "API e HL7" },
        { en: "Dedicated support", fr: "Support dédié", ar: "دعم مخصص", es: "Soporte dedicado", pt: "Suporte dedicado" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'bailly',
    logo: '/images/logos/bailly.png',
    name: 'Bailly',
    tagline: { en: "Real Estate Management", fr: "Gestion immobilière", ar: "إدارة العقارات", es: "Gestión inmobiliaria", pt: "Gestão imobiliária" },
    description: {
      en: "Manage properties, tenants, rent collection and maintenance requests — the complete tool for real estate companies.", fr: "Gérez biens, locataires, encaissement des loyers et demandes de maintenance — l'outil complet pour les sociétés immobilières.", ar: "أدر العقارات والمستأجرين وتحصيل الإيجارات وطلبات الصيانة — الأداة الكاملة لشركات العقارات.", es: "Gestiona propiedades, inquilinos, cobro de alquileres y solicitudes de mantenimiento: la herramienta completa para empresas inmobiliarias.", pt: "Gerencie imóveis, inquilinos, cobrança de aluguéis e solicitações de manutenção — a ferramenta completa para empresas imobiliárias.",
    },
    category: { en: "Real Estate", fr: "Immobilier", ar: "العقارات", es: "Bienes raíces", pt: "Imóveis" },
    available: false,
    appUrl: 'https://bailly.liafrik.com',
    icon: Building2,
    gradient: 'from-liafrik-500 to-liafrik-700',
    accent: '#3D9BFF',
    features: [
      { en: "Property portfolio", fr: "Portefeuille de biens", ar: "محفظة العقارات", es: "Cartera de propiedades", pt: "Portfólio de imóveis" },
      { en: "Tenant management", fr: "Gestion des locataires", ar: "إدارة المستأجرين", es: "Gestión de inquilinos", pt: "Gestão de inquilinos" },
      { en: "Rent collection", fr: "Encaissement des loyers", ar: "تحصيل الإيجارات", es: "Cobro de alquileres", pt: "Cobrança de aluguéis" },
      { en: "Maintenance requests", fr: "Demandes de maintenance", ar: "طلبات الصيانة", es: "Solicitudes de mantenimiento", pt: "Solicitações de manutenção" },
      { en: "Lease tracking", fr: "Suivi des baux", ar: "تتبّع عقود الإيجار", es: "Seguimiento de contratos de alquiler", pt: "Rastreamento de contratos de locação" },
      { en: "Financial reporting", fr: "Rapports financiers", ar: "التقارير المالية", es: "Informes financieros", pt: "Relatórios financeiros" },
    ],
    benefits: [
      { en: "Collect rent on time", fr: "Encaissez les loyers à temps", ar: "حصّل الإيجارات في الوقت المحدد", es: "Cobra los alquileres a tiempo", pt: "Cobre aluguéis em dia" },
      { en: "Track every property", fr: "Suivez chaque bien", ar: "تتبّع كل عقار", es: "Controla cada propiedad", pt: "Acompanhe cada imóvel" },
      { en: "Resolve maintenance fast", fr: "Traitez la maintenance rapidement", ar: "عالج طلبات الصيانة بسرعة", es: "Resuelve el mantenimiento rápido", pt: "Resolva a manutenção rapidamente" },
      { en: "See your ROI clearly", fr: "Visualisez clairement votre ROI", ar: "اطّلع بوضوح على عائدك على الاستثمار", es: "Visualiza claramente tu retorno de inversión", pt: "Veja claramente seu ROI" },
    ],
    industries: [
      { en: "Real estate firms", fr: "Sociétés immobilières", ar: "الشركات العقارية", es: "Empresas inmobiliarias", pt: "Empresas imobiliárias" },
      { en: "Property managers", fr: "Gestionnaires immobiliers", ar: "مدراء العقارات", es: "Administradores de propiedades", pt: "Gestores de imóveis" },
      { en: "Cooperatives", fr: "Coopératives", ar: "التعاونيات", es: "Cooperativas", pt: "Cooperativas" },
      { en: "Investors", fr: "Investisseurs", ar: "المستثمرون", es: "Inversionistas", pt: "Investidores" },
    ],
    dashboard: {
      title: { en: 'Real Estate Dashboard', fr: 'Tableau de bord immobilier' },
      metric: { label: { en: 'Occupancy rate', fr: "Taux d'occupation" }, value: '94%', delta: '+3.1%', up: true },
      panels: [
        { kind: 'donut', title: { en: 'Portfolio mix', fr: 'Répartition du portefeuille' }, segments: [
          { label: { en: 'Residential', fr: 'Résidentiel' }, value: 58, color: '#0070E0' },
          { label: { en: 'Commercial', fr: 'Commercial' }, value: 27, color: '#3D9BFF' },
          { label: { en: 'Mixed-use', fr: 'Mixte' }, value: 15, color: '#00BFE0' },
        ]},
        { kind: 'stat', title: { en: 'Portfolio status', fr: 'État du portefeuille' }, stats: [
          { label: { en: 'Total units', fr: 'Total unités' }, value: '1,240' },
          { label: { en: 'Occupied', fr: 'Occupées' }, value: '1,166' },
          { label: { en: 'Vacant', fr: 'Vides' }, value: '74' },
          { label: { en: 'Rent collected', fr: 'Loyers encaissés' }, value: '97%', up: true },
        ]},
        { kind: 'list', title: { en: 'Maintenance requests', fr: 'Demandes de maintenance' }, items: [
          { label: { en: 'Unit 204 — Plumbing', fr: 'Unité 204 — Plomberie' }, value: 'Open', sub: '2 days' },
          { label: { en: 'Unit 118 — AC repair', fr: 'Unité 118 — Climatisation' }, value: 'Open', sub: '1 day' },
          { label: { en: 'Unit 322 — Electrical', fr: 'Unité 322 — Électricité' }, value: 'Done', sub: 'Today' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Starter", fr: "Starter", ar: "Starter", es: "Starter", pt: "Starter" }, price: '$49', period: 'mo', description: { en: "For small portfolios.", fr: "Pour les petits portefeuilles.", ar: "لمحافظ صغيرة.", es: "Para carteras pequeñas.", pt: "Para portfólios pequenos." }, features: [
        { en: "Up to 50 units", fr: "Jusqu'à 50 unités", ar: "حتى 50 وحدة", es: "Hasta 50 unidades", pt: "Até 50 unidades" },
        { en: "Tenant management", fr: "Gestion des locataires", ar: "إدارة المستأجرين", es: "Gestión de inquilinos", pt: "Gestão de inquilinos" },
        { en: "Rent collection", fr: "Encaissement des loyers", ar: "تحصيل الإيجارات", es: "Cobro de alquileres", pt: "Cobrança de aluguéis" },
        { en: "Basic reports", fr: "Rapports de base", ar: "تقارير أساسية", es: "Informes básicos", pt: "Relatórios básicos" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Pro", fr: "Pro", ar: "Pro", es: "Pro", pt: "Pro" }, price: '$149', period: 'mo', popular: true, description: { en: "For growing portfolios.", fr: "Pour les portefeuilles en croissance.", ar: "لمحافظ متنامية.", es: "Para carteras en crecimiento.", pt: "Para portfólios em crescimento." }, features: [
        { en: "Up to 500 units", fr: "Jusqu'à 500 unités", ar: "حتى 500 وحدة", es: "Hasta 500 unidades", pt: "Até 500 unidades" },
        { en: "Maintenance tracking", fr: "Suivi de maintenance", ar: "تتبّع الصيانة", es: "Seguimiento de mantenimiento", pt: "Rastreamento de manutenção" },
        { en: "Lease management", fr: "Gestion des baux", ar: "إدارة عقود الإيجار", es: "Gestión de contratos de alquiler", pt: "Gestão de contratos de locação" },
        { en: "Financial reporting", fr: "Rapports financiers", ar: "التقارير المالية", es: "Informes financieros", pt: "Relatórios financeiros" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Enterprise", fr: "Enterprise", ar: "Enterprise", es: "Enterprise", pt: "Enterprise" }, price: 'Custom', description: { en: "For large portfolios.", fr: "Pour les grands portefeuilles.", ar: "لمحافظ كبيرة.", es: "Para carteras grandes.", pt: "Para portfólios grandes." }, features: [
        { en: "Unlimited units", fr: "Unités illimitées", ar: "وحدات غير محدودة", es: "Unidades ilimitadas", pt: "Unidades ilimitadas" },
        { en: "Multi-company", fr: "Multi-sociétés", ar: "متعدد الشركات", es: "Multiempresa", pt: "Multi-empresa" },
        { en: "API access", fr: "Accès API", ar: "وصول إلى واجهة برمجة التطبيقات", es: "Acceso a la API", pt: "Acesso à API" },
        { en: "Dedicated support", fr: "Support dédié", ar: "دعم مخصص", es: "Soporte dedicado", pt: "Suporte dedicado" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'kolo',
    logo: '/images/logos/kolo.png',
    name: 'Kolo',
    tagline: { en: "Digital Djangi / Tontine", fr: "Djangi / Tontine numérique", ar: "جانجي / تونتين رقمي", es: "Djangi / Tontina digital", pt: "Djangi / Tontina digital" },
    description: {
      en: "Bring the traditional African savings circle into the digital age — manage tontine groups, contributions, savings and loans.", fr: "Faites entrer la tontine africaine traditionnelle dans l'ère numérique — gérez groupes, contributions, épargne et prêts.", ar: "انقل دائرة الادخار الأفريقية التقليدية إلى العصر الرقمي — أدر مجموعات التونتين والمساهمات والمدخرات والقروض.", es: "Lleva el círculo de ahorro africano tradicional a la era digital: gestiona grupos de tontinas, aportes, ahorros y préstamos.", pt: "Leve o círculo de poupança africano tradicional para a era digital — gerencie grupos de tontina, contribuições, poupança e empréstimos.",
    },
    category: { en: "Finance", fr: "Finance", ar: "التمويل", es: "Finanzas", pt: "Finanças" },
    available: false,
    appUrl: 'https://kolo.liafrik.com',
    icon: PiggyBank,
    gradient: 'from-orange-500 to-amber-400',
    accent: '#F97316',
    features: [
      { en: "Tontine group management", fr: "Gestion des groupes de tontine", ar: "إدارة مجموعات التونتين", es: "Gestión de grupos de tontina", pt: "Gestão de grupos de tontina" },
      { en: "Contribution tracking", fr: "Suivi des contributions", ar: "تتبّع المساهمات", es: "Seguimiento de aportes", pt: "Rastreamento de contribuições" },
      { en: "Savings wallets", fr: "Portefeuilles d'épargne", ar: "محافظ الادخار", es: "Billeteras de ahorro", pt: "Carteiras de poupança" },
      { en: "Micro-loans", fr: "Micro-prêts", ar: "قروض صغيرة", es: "Microcréditos", pt: "Microcréditos" },
      { en: "Automatic payouts", fr: "Paiements automatiques", ar: "مدفوعات تلقائية", es: "Pagos automáticos", pt: "Pagamentos automáticos" },
      { en: "Mobile money integration", fr: "Intégration mobile money", ar: "تكامل مع الأموال المحمولة", es: "Integración de dinero móvil", pt: "Integração com mobile money" },
    ],
    benefits: [
      { en: "Trust through transparency", fr: "Confiance par la transparence", ar: "الثقة من خلال الشفافية", es: "Confianza a través de la transparencia", pt: "Confiança através da transparência" },
      { en: "Save as a community", fr: "Épargnez en communauté", ar: "ادّخر كمجتمع", es: "Ahorra en comunidad", pt: "Poupe em comunidade" },
      { en: "Access micro-loans", fr: "Accédez à des micro-prêts", ar: "احصل على قروض صغيرة", es: "Accede a microcréditos", pt: "Acesse microcréditos" },
      { en: "Pay out automatically", fr: "Versez automatiquement", ar: "اصرف تلقائياً", es: "Realiza pagos automáticamente", pt: "Faça pagamentos automaticamente" },
    ],
    industries: [
      { en: "Cooperatives", fr: "Coopératives", ar: "التعاونيات", es: "Cooperativas", pt: "Cooperativas" },
      { en: "Savings groups", fr: "Groupes d'épargne", ar: "مجموعات الادخار", es: "Grupos de ahorro", pt: "Grupos de poupança" },
      { en: "Microfinance", fr: "Microfinance", ar: "التمويل الأصغر", es: "Microfinanzas", pt: "Microfinanças" },
      { en: "Communities", fr: "Communautés", ar: "المجتمعات", es: "Comunidades", pt: "Comunidades" },
    ],
    dashboard: {
      title: { en: 'Kolo Dashboard', fr: 'Tableau de bord Kolo' },
      metric: { label: { en: 'Total savings', fr: 'Épargne totale' }, value: '$1.2M', delta: '+22%', up: true },
      panels: [
        { kind: 'stat', title: { en: 'Groups overview', fr: 'Aperçu des groupes' }, stats: [
          { label: { en: 'Active groups', fr: 'Groupes actifs' }, value: '842' },
          { label: { en: 'Members', fr: 'Membres' }, value: '12,480' },
          { label: { en: 'Contributions / mo', fr: 'Contributions / mois' }, value: '$340k' },
          { label: { en: 'Active loans', fr: 'Prêts actifs' }, value: '218' },
        ]},
        { kind: 'progress', title: { en: 'Top groups progress', fr: 'Progression des top groupes' }, progress: [
          { label: { en: 'Dakar Circle', fr: 'Cercle Dakar' }, value: 78, color: '#0070E0' },
          { label: { en: 'Yaoundé Trust', fr: 'Trust Yaoundé' }, value: 64, color: '#3D9BFF' },
          { label: { en: 'Savannah Savers', fr: 'Savannah Savers' }, value: 52, color: '#00BFE0' },
        ]},
        { kind: 'list', title: { en: 'Recent payouts', fr: 'Versements récents' }, items: [
          { label: { en: 'Dakar Circle — Round 8', fr: 'Cercle Dakar — Tour 8' }, value: '$12,400', sub: 'Paid' },
          { label: { en: 'Yaoundé Trust — Round 5', fr: 'Trust Yaoundé — Tour 5' }, value: '$8,200', sub: 'Paid' },
          { label: { en: 'Savannah Savers — Round 3', fr: 'Savannah Savers — Tour 3' }, value: '$5,600', sub: 'Processing' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Community", fr: "Community", ar: "Community", es: "Community", pt: "Community" }, price: 'Free', description: { en: "For small savings groups.", fr: "Pour les petits groupes d'épargne.", ar: "لمجموعات الادخار الصغيرة.", es: "Para grupos de ahorro pequeños.", pt: "Para pequenos grupos de poupança." }, features: [
        { en: "Up to 30 members", fr: "Jusqu'à 30 membres", ar: "حتى 30 عضواً", es: "Hasta 30 miembros", pt: "Até 30 membros" },
        { en: "1 active group", fr: "1 groupe actif", ar: "مجموعة نشطة واحدة", es: "1 grupo activo", pt: "1 grupo ativo" },
        { en: "Contribution tracking", fr: "Suivi des contributions", ar: "تتبّع المساهمات", es: "Seguimiento de aportes", pt: "Rastreamento de contribuições" },
        { en: "Mobile money", fr: "Mobile money", ar: "الأموال المحمولة", es: "Dinero móvil", pt: "Mobile money" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Pro", fr: "Pro", ar: "Pro", es: "Pro", pt: "Pro" }, price: '$25', period: 'mo', popular: true, description: { en: "For active organizers.", fr: "Pour les organisateurs actifs.", ar: "للمنظمين النشطين.", es: "Para organizadores activos.", pt: "Para organizadores ativos." }, features: [
        { en: "Unlimited members", fr: "Membres illimités", ar: "أعضاء غير محدودين", es: "Miembros ilimitados", pt: "Membros ilimitados" },
        { en: "Unlimited groups", fr: "Groupes illimités", ar: "مجموعات غير محدودة", es: "Grupos ilimitados", pt: "Grupos ilimitados" },
        { en: "Micro-loans", fr: "Micro-prêts", ar: "قروض صغيرة", es: "Microcréditos", pt: "Microcréditos" },
        { en: "Automatic payouts", fr: "Versements automatiques", ar: "مدفوعات تلقائية", es: "Pagos automáticos", pt: "Pagamentos automáticos" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Institution", fr: "Institution", ar: "Institution", es: "Institución", pt: "Instituição" }, price: 'Custom', description: { en: "For cooperatives & microfinance.", fr: "Pour coopératives et microfinance.", ar: "للتعاونيات والتمويل الأصغر.", es: "Para cooperativas y microfinanzas.", pt: "Para cooperativas e microfinanças." }, features: [
        { en: "White-label", fr: "Marque blanche", ar: "علامة بيضاء", es: "Marca blanca", pt: "White-label" },
        { en: "API access", fr: "Accès API", ar: "وصول إلى واجهة برمجة التطبيقات", es: "Acceso a la API", pt: "Acesso à API" },
        { en: "Compliance tools", fr: "Outils de conformité", ar: "أدوات الامتثال", es: "Herramientas de cumplimiento", pt: "Ferramentas de conformidade" },
        { en: "Dedicated support", fr: "Support dédié", ar: "دعم مخصص", es: "Soporte dedicado", pt: "Suporte dedicado" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'skills',
    logo: '/images/logos/skills.png',
    name: 'Skills',
 tagline: { en: "Learning Marketplace", fr: "Marketplace de formation", ar: "سوق التعلّم", es: "Mercado de aprendizaje", pt: "Marketplace de aprendizagem" },
    description: {
      en: "A learning marketplace where instructors publish educational video content and learners access courses — connecting course creators, students and knowledge worldwide.", fr: "Une marketplace de formation où les instructeurs publient du contenu vidéo éducatif et les apprenants accèdent aux cours — connectant créateurs de cours, étudiants et savoir partout dans le monde.", ar: "سوق تعليمي حيث ينشر المدرّبون محتوى فيديو تعليمياً ويصل المتعلمون إلى الدورات — يربط صانعي الدورات والطلاب والمعرفة حول العالم.", es: "Un mercado de aprendizaje donde los instructores publican contenido de vídeo educativo y los alumnos acceden a cursos, conectando a creadores de cursos, estudiantes y conocimiento en todo el mundo.", pt: "Um marketplace de aprendizagem onde instrutores publicam conteúdo de vídeo educacional e alunos acessam cursos — conectando criadores de cursos, estudantes e conhecimento em todo o mundo.",
    },
    category: { en: "Education", fr: "Éducation", ar: "التعليم", es: "Educación", pt: "Educação" },
    available: false,
    appUrl: 'https://skills.liafrik.com',
    icon: MonitorPlay,
    gradient: 'from-liafrik-500 to-cyanx-500',
    accent: '#3D9BFF',
    features: [
      { en: "Course catalog", fr: "Catalogue de cours", ar: "كتالوج الدورات", es: "Catálogo de cursos", pt: "Catálogo de cursos" },
      { en: "Certifications", fr: "Certifications", ar: "الشهادات", es: "Certificaciones", pt: "Certificações" },
      { en: "Progress tracking", fr: "Suivi de progression", ar: "تتبّع التقدّم", es: "Seguimiento del progreso", pt: "Acompanhamento de progresso" },
      { en: "Expert instructors", fr: "Instructeurs experts", ar: "مدربون خبراء", es: "Instructores expertos", pt: "Instrutores especialistas" },
    ],
    benefits: [
      { en: "Upskill your team", fr: "Formez vos équipes", ar: "طوّر مهارات فريقك", es: "Mejora las habilidades de tu equipo", pt: "Capacite sua equipe" },
      { en: "Earn recognized certs", fr: "Obtenez des certifications reconnues", ar: "احصل على شهادات معترف بها", es: "Obtén certificaciones reconocidas", pt: "Obtenha certificados reconhecidos" },
      { en: "Learn at your pace", fr: "Apprenez à votre rythme", ar: "تعلّم بالسرعة التي تناسبك", es: "Aprende a tu propio ritmo", pt: "Aprenda no seu próprio ritmo" },
      { en: "African-focused content", fr: "Contenu adapté à l'Afrique", ar: "محتوى موجّه لأفريقيا", es: "Contenido enfocado en África", pt: "Conteúdo focado na África" },
    ],
    industries: [
      { en: "Schools", fr: "Écoles", ar: "المدارس", es: "Colegios", pt: "Escolas" },
      { en: "Corporates", fr: "Entreprises", ar: "الشركات", es: "Corporativos", pt: "Empresas" },
      { en: "Governments", fr: "Gouvernements", ar: "الحكومات", es: "Gobiernos", pt: "Governos" },
      { en: "NGOs", fr: "ONG", ar: "منظمات غير حكومية", es: "ONGs", pt: "ONGs" },
    ],
    dashboard: {
      title: { en: 'Skills Dashboard', fr: 'Tableau de bord Skills' },
      metric: { label: { en: 'Active learners', fr: 'Apprenants actifs' }, value: '8,420', delta: '+15%', up: true },
      panels: [
        { kind: 'bars', title: { en: 'Top courses', fr: 'Top cours' }, data: [92, 78, 64, 50, 38] },
        { kind: 'list', title: { en: 'Recent certifications', fr: 'Certifications récentes' }, items: [
          { label: { en: 'Web Dev Fundamentals', fr: 'Bases du dev web' }, value: '1,240', sub: 'Certified' },
          { label: { en: 'Digital Marketing', fr: 'Marketing digital' }, value: '980', sub: 'Certified' },
          { label: { en: 'Data Analysis', fr: 'Analyse de données' }, value: '642', sub: 'Certified' },
        ]},
      ],
    },
    pricing: [],
  },
  {
    slug: 'mafo',
    logo: '/images/logos/mafo.png',
    name: 'Mafo',
    tagline: { en: "Women's Health Platform", fr: "Plateforme de santé féminine", ar: "منصة صحة المرأة", es: "Plataforma de salud femenina", pt: "Plataforma de saúde da mulher" },
    description: {
      en: "A women's health platform covering the female health journey — menstrual cycle tracking, pregnancy journeys, personalized insights and trusted health resources.", fr: "Une plateforme de santé féminine couvrant le parcours de santé de la femme — suivi du cycle menstruel, parcours de grossesse, insights personnalisés et ressources santé de confiance.", ar: "منصة لصحة المرأة تغطي رحلتها الصحية — تتبّع الدورة الشهرية، رحلات الحمل، رؤى مخصصة وموارد صحية موثوقة.", es: "Una plataforma de salud femenina que cubre todo el recorrido de salud de la mujer: seguimiento del ciclo menstrual, embarazo, información personalizada y recursos de salud fiables.", pt: "Uma plataforma de saúde da mulher que cobre toda a jornada de saúde feminina — acompanhamento do ciclo menstrual, jornadas de gravidez, insights personalizados e recursos de saúde confiáveis.",
    },
    category: { en: "Health & Wellness", fr: "Santé et bien-être", ar: "الصحة والعافية", es: "Salud y bienestar", pt: "Saúde e bem-estar" },
    available: false,
    appUrl: 'https://mafo.liafrik.com',
    icon: Flower2,
    gradient: 'from-cyanx-500 to-liafrik-500',
    accent: '#00BFE0',
    features: [
      { en: "Cycle tracking", fr: "Suivi du cycle", ar: "تتبّع الدورة", es: "Seguimiento del ciclo", pt: "Acompanhamento do ciclo" },
      { en: "Personalized advice", fr: "Conseils personnalisés", ar: "نصائح مخصصة", es: "Consejos personalizados", pt: "Conselhos personalizados" },
      { en: "Smart reminders", fr: "Rappels intelligents", ar: "تذكيرات ذكية", es: "Recordatorios inteligentes", pt: "Lembretes inteligentes" },
      { en: "Health resources", fr: "Ressources santé", ar: "موارد صحية", es: "Recursos de salud", pt: "Recursos de saúde" },
    ],
    benefits: [
      { en: "Understand your body", fr: "Comprenez votre corps", ar: "افهمي جسدك", es: "Comprende tu cuerpo", pt: "Entenda seu corpo" },
      { en: "Never miss a check-in", fr: "Ne ratez aucun rendez-vous", ar: "لا تفوّتي أي متابعة", es: "No te pierdas ningún control", pt: "Nunca perca um check-in" },
      { en: "Private & secure", fr: "Privé et sécurisé", ar: "خاص وآمن", es: "Privado y seguro", pt: "Privado e seguro" },
      { en: "Trusted guidance", fr: "Conseils de confiance", ar: "إرشادات موثوقة", es: "Orientación confiable", pt: "Orientação confiável" },
    ],
    industries: [
      { en: "Healthcare", fr: "Santé", ar: "الرعاية الصحية", es: "Salud", pt: "Saúde" },
      { en: "Wellness", fr: "Bien-être", ar: "العافية", es: "Bienestar", pt: "Bem-estar" },
      { en: "Communities", fr: "Communautés", ar: "المجتمعات", es: "Comunidades", pt: "Comunidades" },
      { en: "NGOs", fr: "ONG", ar: "منظمات غير حكومية", es: "ONGs", pt: "ONGs" },
    ],
    dashboard: {
      title: { en: 'Mafo Dashboard', fr: 'Tableau de bord Mafo' },
      metric: { label: { en: 'Cycle day', fr: 'Jour du cycle' }, value: 'Day 14', delta: 'Ovulation', up: true },
      panels: [
        { kind: 'progress', title: { en: 'Cycle phases', fr: 'Phases du cycle' }, progress: [
          { label: { en: 'Menstrual', fr: 'Menstruelle' }, value: 18, color: '#0070E0' },
          { label: { en: 'Follicular', fr: 'Folliculaire' }, value: 32, color: '#3D9BFF' },
          { label: { en: 'Ovulation', fr: 'Ovulation' }, value: 14, color: '#00BFE0' },
          { label: { en: 'Luteal', fr: 'Lutéale' }, value: 36, color: '#A8D0FF' },
        ]},
        { kind: 'list', title: { en: "Today's reminders", fr: 'Rappels du jour' }, items: [
          { label: { en: 'Hydration check', fr: 'Vérification hydratation' }, value: '10:00', sub: 'Daily' },
          { label: { en: 'Wellness article', fr: 'Article bien-être' }, value: '14:00', sub: 'New' },
          { label: { en: 'Symptom log', fr: 'Journal des symptômes' }, value: '20:00', sub: 'Daily' },
        ]},
      ],
    },
    pricing: [],
  },
  {
    slug: 'libooks',
    logo: '/images/logos/libooks.png',
    name: 'LiBooks',
    tagline: { en: "Accounting & Financial Management", fr: "Comptabilité et gestion financière", ar: "المحاسبة والإدارة المالية", es: "Contabilidad y gestión financiera", pt: "Contabilidade e gestão financeira" },
    description: {
      en: "Run invoices, accounting, financial reports and tax compliance — the complete accounting platform for businesses worldwide.", fr: "Gérez factures, comptabilité, rapports financiers et conformité fiscale — la plateforme comptable complète pour les entreprises partout dans le monde.", ar: "أدر الفواتير والمحاسبة والتقارير المالية والامتثال الضريبي — منصة المحاسبة الكاملة للشركات حول العالم.", es: "Gestiona facturas, contabilidad, informes financieros y cumplimiento fiscal: la plataforma contable completa para empresas de todo el mundo.", pt: "Gerencie faturas, contabilidade, relatórios financeiros e conformidade fiscal — a plataforma contábil completa para empresas em todo o mundo.",
    },
    category: { en: "Accounting", fr: "Comptabilité", ar: "المحاسبة", es: "Contabilidad", pt: "Contabilidade" },
    available: true,
    appUrl: 'https://libooks.liafrik.com',
    icon: BookOpenCheck,
    gradient: 'from-liafrik-600 to-liafrik-400',
    accent: '#0070E0',
    features: [
      { en: "Invoicing", fr: "Facturation", ar: "الفوترة", es: "Facturación", pt: "Faturamento" },
      { en: "Double-entry accounting", fr: "Comptabilité en partie double", ar: "المحاسبة بالقيد المزدوج", es: "Contabilidad de partida doble", pt: "Contabilidade de partidas dobradas" },
      { en: "Financial reports", fr: "Rapports financiers", ar: "التقارير المالية", es: "Informes financieros", pt: "Relatórios financeiros" },
      { en: "Tax compliance", fr: "Conformité fiscale", ar: "الامتثال الضريبي", es: "Cumplimiento fiscal", pt: "Conformidade fiscal" },
    ],
    benefits: [
      { en: "Stay audit-ready", fr: "Soyez prêt pour l'audit", ar: "كن جاهزاً للتدقيق دائماً", es: "Mantente listo para auditorías", pt: "Fique pronto para auditorias" },
      { en: "Automate invoicing", fr: "Automatisez la facturation", ar: "أتمِت الفوترة", es: "Automatiza la facturación", pt: "Automatize o faturamento" },
      { en: "Track cash flow live", fr: "Suivez la trésorerie en direct", ar: "تتبّع التدفق النقدي مباشرة", es: "Controla el flujo de caja en vivo", pt: "Acompanhe o fluxo de caixa ao vivo" },
      { en: "Comply with local tax", fr: "Conformez à la fiscalité locale", ar: "امتثل للضرائب المحلية", es: "Cumple con la fiscalidad local", pt: "Cumpra a legislação fiscal local" },
    ],
    industries: [
      { en: "SMEs", fr: "PME", ar: "الشركات الصغيرة والمتوسطة", es: "Pymes", pt: "PMEs" },
      { en: "Accountants", fr: "Comptables", ar: "المحاسبون", es: "Contadores", pt: "Contadores" },
      { en: "Startups", fr: "Startups", ar: "الشركات الناشئة", es: "Startups", pt: "Startups" },
      { en: "Enterprises", fr: "Entreprises", ar: "المؤسسات الكبرى", es: "Grandes empresas", pt: "Grandes empresas" },
    ],
    dashboard: {
      title: { en: 'LiBooks Dashboard', fr: 'Tableau de bord LiBooks' },
      metric: { label: { en: 'Cash position', fr: 'Position de trésorerie' }, value: '$842k', delta: '+4.2%', up: true },
      panels: [
        { kind: 'line', title: { en: 'Cash flow — 12 weeks', fr: 'Trésorerie — 12 semaines' }, data: [620, 680, 650, 710, 690, 760, 740, 800, 780, 820, 810, 842] },
        { kind: 'stat', title: { en: 'Books overview', fr: 'Aperçu comptable' }, stats: [
          { label: { en: 'Open invoices', fr: 'Factures ouvertes' }, value: '128' },
          { label: { en: 'Overdue', fr: 'En retard' }, value: '14', up: false },
          { label: { en: 'Paid this mo', fr: 'Payées ce mois' }, value: '342', up: true },
          { label: { en: 'Tax ready', fr: 'Prêt pour impôt' }, value: 'Yes', up: true },
        ]},
        { kind: 'list', title: { en: 'Recent invoices', fr: 'Factures récentes' }, items: [
          { label: { en: 'INV-2042 — Acme Ltd.', fr: 'INV-2042 — Acme Ltd.' }, value: '$12,400', sub: 'Paid' },
          { label: { en: 'INV-2041 — Globex', fr: 'INV-2041 — Globex' }, value: '$8,200', sub: 'Sent' },
          { label: { en: 'INV-2040 — Initech', fr: 'INV-2040 — Initech' }, value: '$5,600', sub: 'Overdue' },
        ]},
      ],
    },
    pricing: [],
  },
  {
    slug: 'zando',
    logo: '/images/logos/zando.png',
    name: 'Zando',
    tagline: { en: "Fashion & Lifestyle Marketplace", fr: "Marketplace mode et lifestyle", ar: "سوق الموضة ونمط الحياة", es: "Mercado de moda y estilo de vida", pt: "Marketplace de moda e estilo de vida" },
    description: {
      en: "A dedicated fashion and lifestyle marketplace connecting brands and independent sellers with shoppers across Africa — curated catalogs, fast checkout, and integrated delivery.", fr: "Une marketplace dédiée à la mode et au lifestyle, connectant marques et vendeurs indépendants aux acheteurs à travers l'Afrique — catalogues sélectionnés, paiement rapide et livraison intégrée.", ar: "سوق مخصص للموضة ونمط الحياة يربط العلامات التجارية والبائعين المستقلين بالمتسوقين في جميع أنحاء أفريقيا — كتالوجات منتقاة، دفع سريع، وتوصيل متكامل.", es: "Un mercado dedicado a la moda y el estilo de vida que conecta marcas y vendedores independientes con compradores de toda África: catálogos seleccionados, pago rápido y entrega integrada.", pt: "Um marketplace dedicado a moda e estilo de vida, conectando marcas e vendedores independentes a compradores em toda a África — catálogos selecionados, checkout rápido e entrega integrada.",
    },
    category: { en: "Marketplace", fr: "Marketplace", ar: "السوق الإلكتروني", es: "Marketplace", pt: "Marketplace" },
    available: false,
    appUrl: 'https://zando.liafrik.com',
    icon: ShoppingBag,
    gradient: 'from-cyanx-500 to-liafrik-500',
    accent: '#00BFE0',
    features: [
      { en: "Multi-vendor storefronts", fr: "Boutiques multi-vendeurs", ar: "واجهات متاجر متعددة البائعين", es: "Tiendas multivendedor", pt: "Vitrines multi-vendedor" },
      { en: "Curated catalogs", fr: "Catalogues sélectionnés", ar: "كتالوجات منتقاة", es: "Catálogos seleccionados", pt: "Catálogos selecionados" },
      { en: "Integrated delivery", fr: "Livraison intégrée", ar: "توصيل متكامل", es: "Entrega integrada", pt: "Entrega integrada" },
      { en: "Buyer protection", fr: "Protection acheteur", ar: "حماية المشتري", es: "Protección al comprador", pt: "Proteção ao comprador" },
      { en: "Seller analytics", fr: "Analyses vendeur", ar: "تحليلات البائع", es: "Análisis de vendedor", pt: "Análises do vendedor" },
      { en: "Mobile-first checkout", fr: "Paiement pensé mobile-first", ar: "دفع سريع عبر الهاتف أولاً", es: "Pago optimizado para móvil", pt: "Checkout mobile-first" },
    ],
    benefits: [
      { en: "Reach shoppers across Africa", fr: "Atteignez des acheteurs dans toute l'Afrique", ar: "صِل إلى متسوقين في جميع أنحاء أفريقيا", es: "Llega a compradores de toda África", pt: "Alcance compradores em toda a África" },
      { en: "Sell without your own store", fr: "Vendez sans boutique en ligne propre", ar: "بِع دون متجرك الخاص", es: "Vende sin tu propia tienda", pt: "Venda sem ter sua própria loja" },
      { en: "Get paid securely", fr: "Soyez payé en toute sécurité", ar: "احصل على أموالك بأمان", es: "Cobra de forma segura", pt: "Receba pagamentos com segurança" },
      { en: "Grow with built-in marketing", fr: "Développez-vous avec le marketing intégré", ar: "انمُ مع التسويق المدمج", es: "Crece con marketing integrado", pt: "Cresça com marketing integrado" },
    ],
    industries: [
      { en: "Fashion brands", fr: "Marques de mode", ar: "علامات الموضة", es: "Marcas de moda", pt: "Marcas de moda" },
      { en: "Independent sellers", fr: "Vendeurs indépendants", ar: "البائعون المستقلون", es: "Vendedores independientes", pt: "Vendedores independentes" },
      { en: "Lifestyle boutiques", fr: "Boutiques lifestyle", ar: "بوتيكات نمط الحياة", es: "Boutiques de estilo de vida", pt: "Boutiques de estilo de vida" },
      { en: "Designers", fr: "Créateurs", ar: "المصممون", es: "Diseñadores", pt: "Designers" },
    ],
    dashboard: {
      title: { en: 'Zando Dashboard', fr: 'Tableau de bord Zando' },
      metric: { label: { en: 'Orders today', fr: 'Commandes du jour' }, value: '312', delta: '+9.4%', up: true },
      panels: [
        { kind: 'stat', title: { en: 'Marketplace overview', fr: 'Aperçu marketplace' }, stats: [
          { label: { en: 'Active sellers', fr: 'Vendeurs actifs' }, value: '186' },
          { label: { en: 'Listings', fr: 'Annonces' }, value: '4,120' },
          { label: { en: 'Categories', fr: 'Catégories' }, value: '14' },
          { label: { en: 'Avg. basket', fr: 'Panier moyen' }, value: '$34', up: true },
        ]},
        { kind: 'bars', title: { en: 'Orders — 7 days', fr: 'Commandes — 7 jours' }, data: [220, 260, 240, 300, 280, 340, 312] },
        { kind: 'list', title: { en: 'Top sellers', fr: 'Meilleurs vendeurs' }, items: [
          { label: { en: 'Accra Threads', fr: 'Accra Threads' }, value: '$2,140', sub: 'This week' },
          { label: { en: 'Lagos Luxe', fr: 'Lagos Luxe' }, value: '$1,860', sub: 'This week' },
          { label: { en: 'Nairobi Chic', fr: 'Nairobi Chic' }, value: '$1,420', sub: 'This week' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Seller", fr: "Vendeur", ar: "Seller", es: "Vendedor", pt: "Vendedor" }, price: '$0', period: 'mo', description: { en: "Free to list, pay per sale.", fr: "Gratuit pour lister, payez à la vente.", ar: "مجاني للإدراج، ادفع لكل عملية بيع.", es: "Gratis para publicar, pagas por venta.", pt: "Grátis para listar, pague por venda." }, features: [
        { en: "Unlimited listings", fr: "Annonces illimitées", ar: "إعلانات غير محدودة", es: "Listados ilimitados", pt: "Anúncios ilimitados" },
        { en: "Buyer protection", fr: "Protection acheteur", ar: "حماية المشتري", es: "Protección al comprador", pt: "Proteção ao comprador" },
        { en: "Mobile-first checkout", fr: "Paiement mobile-first", ar: "دفع سريع عبر الهاتف أولاً", es: "Pago optimizado para móvil", pt: "Checkout mobile-first" },
        { en: "Seller dashboard", fr: "Tableau de bord vendeur", ar: "لوحة تحكم البائع", es: "Panel de vendedor", pt: "Painel do vendedor" },
      ], cta: { en: "Start selling", fr: "Commencer à vendre", ar: "ابدأ البيع", es: "Empieza a vender", pt: "Comece a vender" } },
      { name: { en: "Pro Seller", fr: "Vendeur Pro", ar: "بائع محترف", es: "Vendedor Pro", pt: "Vendedor Pro" }, price: '$29', period: 'mo', popular: true, description: { en: "For growing brands and boutiques.", fr: "Pour les marques et boutiques en croissance.", ar: "للعلامات التجارية والبوتيكات النامية.", es: "Para marcas y boutiques en crecimiento.", pt: "Para marcas e boutiques em crescimento." }, features: [
        { en: "Lower transaction fees", fr: "Frais de transaction réduits", ar: "رسوم معاملات أقل", es: "Comisiones de transacción más bajas", pt: "Taxas de transação mais baixas" },
        { en: "Seller analytics", fr: "Analyses vendeur", ar: "تحليلات البائع", es: "Análisis de vendedor", pt: "Análises do vendedor" },
        { en: "Featured listings", fr: "Annonces mises en avant", ar: "إعلانات مميزة", es: "Listados destacados", pt: "Anúncios em destaque" },
        { en: "Priority support", fr: "Support prioritaire", ar: "دعم أولوية", es: "Soporte prioritario", pt: "Suporte prioritário" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Enterprise", fr: "Enterprise", ar: "Enterprise", es: "Enterprise", pt: "Enterprise" }, price: 'Custom', description: { en: "For large multi-brand groups.", fr: "Pour les grands groupes multi-marques.", ar: "للمجموعات الكبيرة متعددة العلامات.", es: "Para grandes grupos multimarca.", pt: "Para grandes grupos multimarca." }, features: [
        { en: "Dedicated account manager", fr: "Gestionnaire de compte dédié", ar: "مدير حساب مخصص", es: "Gestor de cuenta dedicado", pt: "Gerente de conta dedicado" },
        { en: "API access", fr: "Accès API", ar: "وصول إلى واجهة برمجة التطبيقات", es: "Acceso a la API", pt: "Acesso à API" },
        { en: "Custom integrations", fr: "Intégrations sur mesure", ar: "تكاملات مخصصة", es: "Integraciones personalizadas", pt: "Integrações personalizadas" },
        { en: "SLA", fr: "SLA", ar: "اتفاقية مستوى الخدمة", es: "SLA", pt: "SLA" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'atlas',
    logo: '/images/logos/atlas.png',
    name: 'Atlas',
    tagline: { en: "Enterprise CRM, Built Multi-Tenant", fr: "CRM entreprise, pensé multi-tenant", ar: "CRM للمؤسسات، مبني متعدد المستأجرين", es: "CRM empresarial, creado multi-tenant", pt: "CRM empresarial, criado multi-tenant" },
    description: {
      en: "The enterprise-grade CRM for groups, franchises and multi-brand businesses. Every client, branch or business unit gets its own strictly isolated workspace — same platform, zero data leakage between tenants.", fr: "Le CRM entreprise pour les groupes, franchises et structures multi-marques. Chaque client, agence ou unité d'affaires dispose de son propre espace strictement isolé — une seule plateforme, aucune fuite de données entre comptes.", ar: "نظام CRM بمستوى المؤسسات للمجموعات والامتيازات والشركات متعددة العلامات. كل عميل أو فرع أو وحدة أعمال يحصل على مساحة عمل معزولة تماماً — منصة واحدة، بدون أي تسرب للبيانات بين الحسابات.", es: "El CRM de nivel empresarial para grupos, franquicias y empresas multimarca. Cada cliente, sucursal o unidad de negocio obtiene su propio espacio de trabajo estrictamente aislado: la misma plataforma, sin fugas de datos entre cuentas.", pt: "O CRM de nível empresarial para grupos, franquias e empresas multimarca. Cada cliente, filial ou unidade de negócio tem seu próprio espaço de trabalho estritamente isolado — a mesma plataforma, sem vazamento de dados entre contas.",
    },
    category: { en: "Enterprise CRM", fr: "CRM entreprise", ar: "CRM للمؤسسات", es: "CRM empresarial", pt: "CRM empresarial" },
    available: true,
    appUrl: 'https://atlas.liafrik.com',
    icon: Users,
    gradient: 'from-liafrik-600 to-cyanx-500',
    accent: '#0070E0',
    features: [
      { en: "Strict multi-tenant data isolation", fr: "Isolation stricte des données multi-tenant", ar: "عزل صارم للبيانات متعدد المستأجرين", es: "Aislamiento estricto de datos multi-tenant", pt: "Isolamento rigoroso de dados multi-tenant" },
      { en: "Per-tenant roles & permissions", fr: "Rôles et permissions par tenant", ar: "أدوار وصلاحيات لكل مستأجر", es: "Roles y permisos por tenant", pt: "Funções e permissões por tenant" },
      { en: "Unified pipeline across brands", fr: "Pipeline unifié multi-marques", ar: "خط مبيعات موحّد عبر العلامات", es: "Embudo unificado entre marcas", pt: "Funil unificado entre marcas" },
      { en: "Lead & contact management", fr: "Gestion des leads et contacts", ar: "إدارة العملاء المحتملين وجهات الاتصال", es: "Gestión de clientes potenciales y contactos", pt: "Gestão de leads e contatos" },
      { en: "Automated workflows", fr: "Flux automatisés", ar: "سير عمل مؤتمت", es: "Flujos de trabajo automatizados", pt: "Fluxos de trabalho automatizados" },
      { en: "Audit logs & compliance", fr: "Journaux d'audit et conformité", ar: "سجلات التدقيق والامتثال", es: "Registros de auditoría y cumplimiento", pt: "Registros de auditoria e conformidade" },
    ],
    benefits: [
      { en: "Every client, truly walled off", fr: "Chaque client, réellement cloisonné", ar: "كل عميل، معزول فعلياً", es: "Cada cliente, verdaderamente aislado", pt: "Cada cliente, verdadeiramente isolado" },
      { en: "Scale to hundreds of tenants safely", fr: "Passez à l'échelle sur des centaines de comptes en toute sécurité", ar: "توسّع إلى مئات المستأجرين بأمان", es: "Escala a cientos de tenants con seguridad", pt: "Escale para centenas de tenants com segurança" },
      { en: "One platform, many businesses", fr: "Une plateforme, plusieurs entreprises", ar: "منصة واحدة، شركات متعددة", es: "Una plataforma, muchos negocios", pt: "Uma plataforma, muitos negócios" },
      { en: "Audit-ready by design", fr: "Prêt pour l'audit dès la conception", ar: "جاهز للتدقيق منذ التصميم", es: "Listo para auditorías desde el diseño", pt: "Pronto para auditoria desde a concepção" },
    ],
    industries: [
      { en: "Multi-brand groups", fr: "Groupes multi-marques", ar: "المجموعات متعددة العلامات", es: "Grupos multimarca", pt: "Grupos multimarca" },
      { en: "Franchises", fr: "Franchises", ar: "الامتيازات", es: "Franquicias", pt: "Franquias" },
      { en: "Agencies managing clients", fr: "Agences gérant des clients", ar: "الوكالات التي تدير عملاء", es: "Agencias que gestionan clientes", pt: "Agências que gerenciam clientes" },
      { en: "SaaS resellers", fr: "Revendeurs SaaS", ar: "موزعو SaaS", es: "Revendedores de SaaS", pt: "Revendedores de SaaS" },
    ],
    dashboard: {
      title: { en: 'Atlas Dashboard', fr: 'Tableau de bord Atlas' },
      metric: { label: { en: 'Active tenants', fr: 'Comptes actifs' }, value: '186', delta: '+14 this mo', up: true },
      panels: [
        { kind: 'bars', title: { en: 'Pipeline by stage', fr: 'Pipeline par étape' }, data: [95, 74, 58, 41, 24] },
        { kind: 'stat', title: { en: 'Isolation overview', fr: "Aperçu de l'isolation" }, stats: [
          { label: { en: 'Isolated workspaces', fr: 'Espaces isolés' }, value: '186' },
          { label: { en: 'Cross-tenant incidents', fr: 'Incidents inter-comptes' }, value: '0', up: true },
          { label: { en: 'Data residency checks', fr: 'Contrôles de résidence' }, value: 'Passed', up: true },
          { label: { en: 'Open deals', fr: 'Affaires en cours' }, value: '412' },
        ]},
        { kind: 'list', title: { en: 'Hot leads', fr: 'Leads chauds' }, items: [
          { label: { en: 'Cameroon Mining Co.', fr: 'Cameroon Mining Co.' }, value: '$48k', sub: 'Negotiation' },
          { label: { en: 'Savannah Pharma Ltd.', fr: 'Savannah Pharma Ltd.' }, value: '$22k', sub: 'Proposal' },
          { label: { en: 'Dakar Logistics', fr: 'Dakar Logistics' }, value: '$31k', sub: 'Demo' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Team", fr: "Team", ar: "Team", es: "Team", pt: "Team" }, price: '$59', period: 'mo', description: { en: "For a single business unit.", fr: "Pour une seule unité d'affaires.", ar: "لوحدة أعمال واحدة.", es: "Para una sola unidad de negocio.", pt: "Para uma única unidade de negócio." }, features: [
        { en: "1 isolated workspace", fr: "1 espace isolé", ar: "مساحة عمل معزولة واحدة", es: "1 espacio de trabajo aislado", pt: "1 espaço de trabalho isolado" },
        { en: "Pipeline & leads", fr: "Pipeline et leads", ar: "خط أنابيب وعملاء محتملون", es: "Embudo y clientes potenciales", pt: "Funil e leads" },
        { en: "Basic automation", fr: "Automatisation de base", ar: "أتمتة أساسية", es: "Automatización básica", pt: "Automação básica" },
        { en: "10 users", fr: "10 utilisateurs", ar: "10 مستخدمين", es: "10 usuarios", pt: "10 usuários" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Multi-Tenant", fr: "Multi-Tenant", ar: "Multi-Tenant", es: "Multi-Tenant", pt: "Multi-Tenant" }, price: '$149', period: 'mo', popular: true, description: { en: "For groups running several brands or branches.", fr: "Pour les groupes multi-marques ou multi-agences.", ar: "للمجموعات التي تدير عدة علامات أو فروع.", es: "Para grupos que gestionan varias marcas o sucursales.", pt: "Para grupos que operam várias marcas ou filiais." }, features: [
        { en: "Up to 20 isolated workspaces", fr: "Jusqu'à 20 espaces isolés", ar: "حتى 20 مساحة عمل معزولة", es: "Hasta 20 espacios de trabajo aislados", pt: "Até 20 espaços de trabalho isolados" },
        { en: "Per-tenant roles", fr: "Rôles par tenant", ar: "أدوار لكل مستأجر", es: "Roles por tenant", pt: "Funções por tenant" },
        { en: "Advanced automation", fr: "Automatisation avancée", ar: "أتمتة متقدمة", es: "Automatización avanzada", pt: "Automação avançada" },
        { en: "Audit logs", fr: "Journaux d'audit", ar: "سجلات التدقيق", es: "Registros de auditoría", pt: "Registros de auditoria" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Enterprise", fr: "Enterprise", ar: "Enterprise", es: "Enterprise", pt: "Enterprise" }, price: 'Custom', description: { en: "For large groups, franchises & SaaS resellers.", fr: "Pour les grands groupes, franchises et revendeurs SaaS.", ar: "للمجموعات الكبيرة والامتيازات وموزعي SaaS.", es: "Para grandes grupos, franquicias y revendedores de SaaS.", pt: "Para grandes grupos, franquias e revendedores de SaaS." }, features: [
        { en: "Unlimited isolated workspaces", fr: "Espaces isolés illimités", ar: "مساحات عمل معزولة غير محدودة", es: "Espacios de trabajo aislados ilimitados", pt: "Espaços de trabalho isolados ilimitados" },
        { en: "API & SSO", fr: "API et SSO", ar: "واجهة برمجة التطبيقات وتسجيل الدخول الموحد", es: "API y SSO", pt: "API e SSO" },
        { en: "Compliance & data residency", fr: "Conformité et résidence des données", ar: "الامتثال وإقامة البيانات", es: "Cumplimiento y residencia de datos", pt: "Conformidade e residência de dados" },
        { en: "Dedicated support", fr: "Support dédié", ar: "دعم مخصص", es: "Soporte dedicado", pt: "Suporte dedicado" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
  {
    slug: 'litrek',
    logo: '/images/logos/litrek.png',
    name: 'Litrek',
    tagline: { en: "Urban & Interurban Transport Platform", fr: "Plateforme de transport urbain et interurbain", ar: "منصة النقل الحضري وبين المدن", es: "Plataforma de transporte urbano e interurbano", pt: "Plataforma de transporte urbano e interurbano" },
    description: {
      en: "A transport platform for everyone — book bus, van and interurban tickets in a few taps. Local travel agencies list their routes and schedules, and riders book, pay and travel with confidence.", fr: "Une plateforme de transport pour tous — réservez vos billets de bus, van ou trajets interurbains en quelques clics. Les agences de voyages locales publient leurs trajets et horaires, et les usagers réservent, paient et voyagent en toute confiance.", ar: "منصة نقل للجميع — احجز تذاكر الحافلات والفانات والرحلات بين المدن ببضع نقرات. تنشر وكالات السفر المحلية مساراتها وجداولها، ويحجز الركاب ويدفعون ويسافرون بثقة.", es: "Una plataforma de transporte para todos: reserva billetes de autobús, furgoneta e interurbanos en unos pocos toques. Las agencias de viajes locales publican sus rutas y horarios, y los pasajeros reservan, pagan y viajan con confianza.", pt: "Uma plataforma de transporte para todos — reserve passagens de ônibus, van e viagens interurbanas em poucos toques. Agências de viagem locais publicam suas rotas e horários, e os passageiros reservam, pagam e viajam com confiança.",
    },
    category: { en: "Transport", fr: "Transport", ar: "النقل", es: "Transporte", pt: "Transporte" },
    available: false,
    appUrl: 'https://litrek.liafrik.com',
    icon: Route,
    gradient: 'from-teal-500 to-emerald-400',
    accent: '#14B8A6',
    features: [
      { en: "Route & schedule listings", fr: "Trajets et horaires publiés", ar: "قوائم المسارات والجداول", es: "Listados de rutas y horarios", pt: "Listagens de rotas e horários" },
      { en: "Online ticket booking", fr: "Réservation de billets en ligne", ar: "حجز التذاكر عبر الإنترنت", es: "Reserva de billetes en línea", pt: "Reserva de passagens online" },
      { en: "Secure online payment", fr: "Paiement en ligne sécurisé", ar: "دفع آمن عبر الإنترنت", es: "Pago en línea seguro", pt: "Pagamento online seguro" },
      { en: "Digital e-tickets", fr: "Billets électroniques", ar: "تذاكر إلكترونية رقمية", es: "Billetes electrónicos digitales", pt: "Bilhetes eletrônicos digitais" },
      { en: "Multi-tenant isolation per agency", fr: "Isolation multi-tenant par agence", ar: "عزل متعدد المستأجرين لكل وكالة", es: "Aislamiento multi-tenant por agencia", pt: "Isolamento multi-tenant por agência" },
      { en: "Trip & booking history", fr: "Historique des trajets et réservations", ar: "سجل الرحلات والحجوزات", es: "Historial de viajes y reservas", pt: "Histórico de viagens e reservas" },
    ],
    benefits: [
      { en: "Book a trip in minutes, from anywhere", fr: "Réservez un trajet en quelques minutes, où que vous soyez", ar: "احجز رحلة في دقائق، من أي مكان", es: "Reserva un viaje en minutos, desde cualquier lugar", pt: "Reserve uma viagem em minutos, de qualquer lugar" },
      { en: "Agencies reach more travelers online", fr: "Les agences touchent plus de voyageurs en ligne", ar: "تصل الوكالات إلى مزيد من المسافرين عبر الإنترنت", es: "Las agencias llegan a más viajeros en línea", pt: "Agências alcançam mais viajantes online" },
      { en: "No more queueing at the station", fr: "Fini les files d'attente à la gare", ar: "لا مزيد من الطوابير في المحطة", es: "No más colas en la estación", pt: "Sem mais filas na estação" },
      { en: "Each agency's data stays its own", fr: "Les données de chaque agence restent les siennes", ar: "بيانات كل وكالة تبقى ملكاً لها", es: "Los datos de cada agencia siguen siendo suyos", pt: "Os dados de cada agência permanecem seus" },
    ],
    industries: [
      { en: "Local travel agencies", fr: "Agences de voyages locales", ar: "وكالات السفر المحلية", es: "Agencias de viajes locales", pt: "Agências de viagem locais" },
      { en: "Bus & van operators", fr: "Opérateurs de bus et vans", ar: "مشغلو الحافلات والفانات", es: "Operadores de autobuses y furgonetas", pt: "Operadores de ônibus e vans" },
      { en: "Daily commuters", fr: "Usagers du quotidien", ar: "المسافرون اليوميون", es: "Viajeros diarios", pt: "Passageiros diários" },
      { en: "Interurban travelers", fr: "Voyageurs interurbains", ar: "المسافرون بين المدن", es: "Viajeros interurbanos", pt: "Viajantes interurbanos" },
    ],
    dashboard: {
      title: { en: 'Litrek Dashboard', fr: 'Tableau de bord Litrek' },
      metric: { label: { en: 'Tickets booked today', fr: 'Billets réservés aujourd\'hui' }, value: '2,340', delta: '+14.2%', up: true },
      panels: [
        { kind: 'bars', title: { en: 'Bookings by route', fr: 'Réservations par trajet' }, data: [58, 74, 45, 90, 65, 82, 70] },
        { kind: 'stat', title: { en: 'Network overview', fr: 'Aperçu du réseau' }, stats: [
          { label: { en: 'Active agencies', fr: 'Agences actives' }, value: '64' },
          { label: { en: 'Routes covered', fr: 'Trajets couverts' }, value: '210' },
          { label: { en: 'Seats booked', fr: 'Sièges réservés' }, value: '2,340' },
          { label: { en: 'On-time rate', fr: 'Ponctualité' }, value: '96%', up: true },
        ]},
        { kind: 'list', title: { en: 'Next departures', fr: 'Prochains départs' }, items: [
          { label: { en: 'Douala → Yaoundé', fr: 'Douala → Yaoundé' }, value: '08:30', sub: '12 seats left' },
          { label: { en: 'Yaoundé → Bafoussam', fr: 'Yaoundé → Bafoussam' }, value: '09:15', sub: '4 seats left' },
          { label: { en: 'Dubai → Abu Dhabi', fr: 'Dubaï → Abu Dhabi' }, value: '10:00', sub: '20 seats left' },
        ]},
      ],
    },
    pricing: [
      { name: { en: "Rider", fr: "Voyageur", ar: "Rider", es: "Pasajero", pt: "Passageiro" }, price: 'Free', description: { en: "For anyone booking trips.", fr: "Pour tous les voyageurs.", ar: "لكل من يحجز رحلات.", es: "Para cualquiera que reserve viajes.", pt: "Para quem reserva viagens." }, features: [
        { en: "Book & pay for tickets", fr: "Réserver et payer ses billets", ar: "حجز ودفع التذاكر", es: "Reservar y pagar billetes", pt: "Reservar e pagar passagens" },
        { en: "Digital e-tickets", fr: "Billets électroniques", ar: "تذاكر إلكترونية رقمية", es: "Billetes electrónicos digitales", pt: "Bilhetes eletrônicos digitais" },
        { en: "Trip history", fr: "Historique des trajets", ar: "سجل الرحلات", es: "Historial de viajes", pt: "Histórico de viagens" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Agency", fr: "Agence", ar: "Agency", es: "Agencia", pt: "Agência" }, price: '$49', period: 'mo', popular: true, description: { en: "For travel agencies & operators.", fr: "Pour les agences et opérateurs de transport.", ar: "لوكالات وشركات النقل.", es: "Para agencias y operadores de viajes.", pt: "Para agências e operadoras de viagem." }, features: [
        { en: "Unlimited routes & schedules", fr: "Trajets et horaires illimités", ar: "مسارات وجداول غير محدودة", es: "Rutas y horarios ilimitados", pt: "Rotas e horários ilimitados" },
        { en: "Isolated agency workspace", fr: "Espace agence isolé", ar: "مساحة عمل معزولة للوكالة", es: "Espacio de trabajo aislado para la agencia", pt: "Espaço de trabalho isolado para a agência" },
        { en: "Booking analytics", fr: "Analyses des réservations", ar: "تحليلات الحجوزات", es: "Análisis de reservas", pt: "Análises de reservas" },
        { en: "5 staff accounts", fr: "5 comptes collaborateurs", ar: "5 حسابات موظفين", es: "5 cuentas de personal", pt: "5 contas de equipe" },
      ], cta: { en: "Start free", fr: "Commencer", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" } },
      { name: { en: "Network", fr: "Réseau", ar: "Network", es: "Red", pt: "Rede" }, price: 'Custom', description: { en: "For large multi-agency networks.", fr: "Pour les grands réseaux multi-agences.", ar: "لشبكات كبيرة متعددة الوكالات.", es: "Para grandes redes multiagencia.", pt: "Para grandes redes multiagência." }, features: [
        { en: "Unlimited agencies", fr: "Agences illimitées", ar: "وكالات غير محدودة", es: "Agencias ilimitadas", pt: "Agências ilimitadas" },
        { en: "API access", fr: "Accès API", ar: "وصول إلى واجهة برمجة التطبيقات", es: "Acceso a la API", pt: "Acesso à API" },
        { en: "Dedicated support", fr: "Support dédié", ar: "دعم مخصص", es: "Soporte dedicado", pt: "Suporte dedicado" },
      ], cta: { en: "Contact sales", fr: "Contacter les ventes", ar: "التواصل مع المبيعات", es: "Contactar con ventas", pt: "Falar com vendas" } },
    ],
  },
];


export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const availableProducts = products.filter((p) => p.available);
export const comingSoonProducts = products.filter((p) => !p.available);

export const sectors: Sector[] = [
  {
    id: 'retail',
    name: { en: "Retail & Commerce", fr: "Commerce de détail", ar: "التجارة والتجزئة", es: "Comercio y retail", pt: "Comércio e varejo" },
    icon: ShoppingCart,
    productSlugs: ['pos', 'sellia', 'crm', 'atlas', 'libooks'],
  },
  {
    id: 'ecommerce',
    name: { en: "E-commerce", fr: "E-commerce", ar: "التجارة الإلكترونية", es: "Comercio electrónico", pt: "E-commerce" },
    icon: Store,
    productSlugs: ['sellia', 'zando', 'crm', 'libooks'],
  },
  {
    id: 'education',
    name: { en: "Education", fr: "Éducation", ar: "التعليم", es: "Educación", pt: "Educação" },
    icon: GraduationCap,
    productSlugs: ['klasoo', 'skills'],
  },
  {
    id: 'healthcare',
    name: { en: "Healthcare", fr: "Santé", ar: "الرعاية الصحية", es: "Salud", pt: "Saúde" },
    icon: HeartPulse,
    productSlugs: ['health', 'mafo'],
  },
  {
    id: 'restaurant',
    name: { en: "Restaurants", fr: "Restauration", ar: "المطاعم", es: "Restaurantes", pt: "Restaurantes" },
    icon: UtensilsCrossed,
    productSlugs: ['nutro', 'pos', 'libooks'],
  },
  {
    id: 'realestate',
    name: { en: "Real Estate", fr: "Immobilier", ar: "العقارات", es: "Bienes raíces", pt: "Imóveis" },
    icon: Building2,
    productSlugs: ['bailly', 'crm', 'libooks'],
  },
  {
    id: 'finance',
    name: { en: "Cooperative & Finance", fr: "Coopérative & Finance", ar: "التعاونيات والتمويل", es: "Cooperativas y finanzas", pt: "Cooperativas e finanças" },
    icon: PiggyBank,
    productSlugs: ['kolo', 'libooks'],
  },
  {
    id: 'hr',
    name: { en: "HR & Workforce", fr: "RH & Effectifs", ar: "الموارد البشرية والقوى العاملة", es: "RR. HH. y personal", pt: "RH e força de trabalho" },
    icon: Users,
    productSlugs: ['faka', 'crm', 'atlas', 'libooks'],
  },
  {
    id: 'transport',
    name: { en: "Transport", fr: "Transport", ar: "النقل", es: "Transporte", pt: "Transporte" },
    icon: Route,
    productSlugs: ['litrek', 'crm', 'libooks'],
  },
];
