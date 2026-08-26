import type { LucideIcon } from 'lucide-react';
import {
  ShoppingCart, Store, Users, GraduationCap, UtensilsCrossed,
  HeartPulse, Building2, PiggyBank, MonitorPlay, Flower2, BookOpenCheck,
  ShoppingBag, Route,
} from 'lucide-react';

export interface ProductFeature {
  en: string;
  fr: string;
}

export interface ProductPricingPlan {
  name: { en: string; fr: string };
  price: string;
  period?: 'mo' | 'yr';
  popular?: boolean;
  description: { en: string; fr: string };
  features: ProductFeature[];
  cta: { en: string; fr: string };
}

export interface Product {
  slug: string;
  name: string;
  tagline: { en: string; fr: string };
  description: { en: string; fr: string };
  category: { en: string; fr: string };
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
  name: { en: string; fr: string };
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
    tagline: { en: 'Retail Management Platform', fr: 'Plateforme de gestion de la vente au détail' },
    description: {
      en: 'Run your store, track inventory, accept payments and read your sales in real time — from a single beautiful point-of-sale.',
      fr: 'Gérez votre boutique, suivez vos stocks, encaissez les paiements et lisez vos ventes en temps réel — depuis une seule caisse élégante.',
    },
    category: { en: 'Retail', fr: 'Commerce de détail' },
    available: true,
    appUrl: 'https://pos.liafrik.com',
    icon: ShoppingCart,
    gradient: 'from-liafrik-600 to-cyanx-500',
    accent: '#0070E0',
    features: [
      { en: 'Real-time sales dashboard', fr: 'Tableau de ventes en temps réel' },
      { en: 'Smart inventory tracking', fr: 'Suivi intelligent des stocks' },
      { en: 'Card & mobile payments', fr: 'Paiements carte et mobile' },
      { en: 'Detailed sales reports', fr: 'Rapports de ventes détaillés' },
      { en: 'Offline mode with auto-sync', fr: 'Mode hors-ligne avec sync auto' },
      { en: 'Multi-branch support', fr: 'Support multi-agences' },
    ],
    benefits: [
      { en: 'Cut checkout time by half', fr: 'Réduisez le temps de caisse de moitié' },
      { en: 'Never run out of stock', fr: 'Ne soyez jamais en rupture de stock' },
      { en: 'Know your numbers live', fr: 'Connaissez vos chiffres en direct' },
      { en: 'One tap to close the day', fr: 'Une touche pour clôturer la journée' },
    ],
    industries: [
      { en: 'Retail stores', fr: 'Boutiques de détail' },
      { en: 'Supermarkets', fr: 'Supermarchés' },
      { en: 'Pharmacies', fr: 'Pharmacies' },
      { en: 'SMEs', fr: 'PME' },
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
      { name: { en: 'Starter', fr: 'Starter' }, price: '$19', period: 'mo', description: { en: 'For a single store getting started.', fr: 'Pour une boutique qui démarre.' }, features: [
        { en: '1 branch · 2 users', fr: '1 agence · 2 utilisateurs' },
        { en: 'Inventory & sales', fr: 'Stocks et ventes' },
        { en: 'Card & mobile payments', fr: 'Paiements carte et mobile' },
        { en: 'Daily reports', fr: 'Rapports quotidiens' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Growth', fr: 'Growth' }, price: '$49', period: 'mo', popular: true, description: { en: 'For growing stores with multiple branches.', fr: 'Pour les boutiques en croissance multi-agences.' }, features: [
        { en: '3 branches · 10 users', fr: '3 agences · 10 utilisateurs' },
        { en: 'Advanced inventory', fr: 'Stocks avancés' },
        { en: 'Multi-branch analytics', fr: 'Analyses multi-agences' },
        { en: 'Offline mode + sync', fr: 'Mode hors-ligne + sync' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Enterprise', fr: 'Enterprise' }, price: 'Custom', description: { en: 'For chains and large retailers.', fr: 'Pour les chaînes et grands détaillants.' }, features: [
        { en: 'Unlimited branches', fr: 'Agences illimitées' },
        { en: 'Role permissions', fr: 'Permissions par rôle' },
        { en: 'API & integrations', fr: 'API et intégrations' },
        { en: '24/7 priority support', fr: 'Support prioritaire 24/7' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'sellia',
    logo: '/images/logos/sellia.png',
    name: 'Sellia',
    tagline: { en: 'Commerce Operating System', fr: 'Système d\'exploitation commercial' },
    description: {
      en: 'A complete commerce platform built for ambitious businesses worldwide. Launch your online store, manage orders, customers and products, and accept payments — all from one place.',
      fr: 'Une plateforme de commerce complète, conçue pour les entreprises ambitieuses du monde entier. Lancez votre boutique en ligne, gérez commandes, clients et produits, et encaissez les paiements — depuis un seul endroit.',
    },
    category: { en: 'Ecommerce', fr: 'E-commerce' },
    available: true,
    appUrl: 'https://sellia.liafrik.com',
    icon: Store,
    gradient: 'from-liafrik-500 to-liafrik-700',
    accent: '#3D9BFF',
    features: [
      { en: 'Online storefront builder', fr: 'Créateur de boutique en ligne' },
      { en: 'Order management', fr: 'Gestion des commandes' },
      { en: 'Customer accounts', fr: 'Comptes clients' },
      { en: 'Product catalog', fr: 'Catalogue de produits' },
      { en: 'African payment gateways', fr: 'Passerelles de paiement africaines' },
      { en: 'Shipping integrations', fr: 'Intégrations de livraison' },
    ],
    benefits: [
      { en: 'Sell across Africa', fr: "Vendez dans toute l'Afrique" },
      { en: 'All payments in one place', fr: 'Tous les paiements au même endroit' },
      { en: 'Grow with built-in CRM', fr: 'Développez avec un CRM intégré' },
      { en: 'Mobile-first checkout', fr: 'Paiement pensé mobile-first' },
    ],
    industries: [
      { en: 'Ecommerce brands', fr: 'Marques e-commerce' },
      { en: 'D2C sellers', fr: 'Vendeurs D2C' },
      { en: 'Marketplaces', fr: 'Marketplaces' },
      { en: 'Retailers', fr: 'Détaillants' },
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
      { name: { en: 'Launch', fr: 'Launch' }, price: '$29', period: 'mo', description: { en: 'Start selling online today.', fr: 'Commencez à vendre en ligne.' }, features: [
        { en: 'Up to 500 products', fr: "Jusqu'à 500 produits" },
        { en: '2 staff accounts', fr: '2 comptes équipe' },
        { en: 'African payments', fr: 'Paiements africains' },
        { en: 'Basic analytics', fr: 'Analyses de base' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Scale', fr: 'Scale' }, price: '$79', period: 'mo', popular: true, description: { en: 'For brands scaling across Africa.', fr: 'Pour les marques qui se développent en Afrique.' }, features: [
        { en: 'Unlimited products', fr: 'Produits illimités' },
        { en: '10 staff accounts', fr: '10 comptes équipe' },
        { en: 'Abandoned cart recovery', fr: 'Récupération de panier' },
        { en: 'Advanced analytics', fr: 'Analyses avancées' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Enterprise', fr: 'Enterprise' }, price: 'Custom', description: { en: 'For high-volume merchants.', fr: 'Pour les commerçants à fort volume.' }, features: [
        { en: 'Custom checkout', fr: 'Tunnel personnalisé' },
        { en: 'API access', fr: 'Accès API' },
        { en: 'Dedicated manager', fr: 'Manager dédié' },
        { en: '24/7 priority support', fr: 'Support prioritaire 24/7' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'crm',
    logo: '/images/logos/crm.png',
    name: 'CRM',
    tagline: { en: 'Customer Relationship Management', fr: 'Gestion de la relation client' },
    description: {
      en: 'Track every lead, nurture every relationship, and automate your sales pipeline so nothing falls through the cracks.',
      fr: 'Suivez chaque prospect, cultivez chaque relation et automatisez votre pipeline commercial pour ne rien laisser passer.',
    },
    category: { en: 'Sales', fr: 'Ventes' },
    available: true,
    appUrl: 'https://crm.liafrik.com',
    icon: Users,
    gradient: 'from-cyanx-500 to-liafrik-600',
    accent: '#00BFE0',
    features: [
      { en: 'Visual sales pipeline', fr: 'Pipeline de ventes visuel' },
      { en: 'Lead tracking', fr: 'Suivi des prospects' },
      { en: 'Automated follow-ups', fr: 'Relances automatisées' },
      { en: 'Contact management', fr: 'Gestion des contacts' },
    ],
    benefits: [
      { en: 'Close more deals', fr: 'Concluez plus de deals' },
      { en: 'Never miss a follow-up', fr: 'Ne ratez aucune relance' },
      { en: 'Forecast revenue accurately', fr: 'Prévoyez vos revenus avec précision' },
      { en: 'Align sales & marketing', fr: 'Alignez ventes et marketing' },
    ],
    industries: [
      { en: 'Sales teams', fr: 'Équipes commerciales' },
      { en: 'B2B companies', fr: 'Entreprises B2B' },
      { en: 'Agencies', fr: 'Agences' },
      { en: 'SMEs', fr: 'PME' },
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
    tagline: { en: 'HR Management Platform', fr: 'Plateforme de gestion RH' },
    description: {
      en: 'Manage employees, payroll, attendance and performance from one place — built for workforce operations worldwide.',
      fr: 'Gérez employés, paie, présences et performances depuis un seul endroit — pensé pour les opérations RH partout dans le monde.',
    },
    category: { en: 'Human Resources', fr: 'Ressources humaines' },
    available: true,
    appUrl: 'https://faka.liafrik.com',
    icon: Users,
    gradient: 'from-liafrik-600 to-liafrik-400',
    accent: '#0070E0',
    features: [
      { en: 'Employee records', fr: 'Dossiers employés' },
      { en: 'Payroll processing', fr: 'Traitement de la paie' },
      { en: 'Attendance & leave', fr: 'Présences et congés' },
      { en: 'Performance reviews', fr: 'Évaluations de performance' },
      { en: 'Multi-company support', fr: 'Support multi-sociétés' },
      { en: 'Payslip distribution', fr: 'Distribution des fiches de paie' },
    ],
    benefits: [
      { en: 'Pay everyone on time', fr: 'Payez tout le monde à temps' },
      { en: 'Track attendance automatically', fr: 'Suivez les présences automatiquement' },
      { en: 'Comply with local laws', fr: 'Soyez conforme aux lois locales' },
      { en: 'Empower your people', fr: 'Valorisez vos équipes' },
    ],
    industries: [
      { en: 'SMEs', fr: 'PME' },
      { en: 'Large enterprises', fr: 'Grandes entreprises' },
      { en: 'NGOs', fr: 'ONG' },
      { en: 'Government', fr: 'Gouvernement' },
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
      { name: { en: 'Core', fr: 'Core' }, price: '$5', period: 'mo', description: { en: 'Per employee. For small teams.', fr: 'Par employé. Pour les petites équipes.' }, features: [
        { en: 'Employee records', fr: 'Dossiers employés' },
        { en: 'Attendance & leave', fr: 'Présences et congés' },
        { en: 'Basic payroll', fr: 'Paie de base' },
        { en: '5 users included', fr: '5 utilisateurs inclus' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Pro', fr: 'Pro' }, price: '$9', period: 'mo', popular: true, description: { en: 'Per employee. For growing companies.', fr: 'Par employé. Pour les entreprises en croissance.' }, features: [
        { en: 'Advanced payroll', fr: 'Paie avancée' },
        { en: 'Performance reviews', fr: 'Évaluations de performance' },
        { en: 'Multi-company', fr: 'Multi-sociétés' },
        { en: 'Payslip automation', fr: 'Automatisation des fiches' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Enterprise', fr: 'Enterprise' }, price: 'Custom', description: { en: 'For large workforces.', fr: 'Pour de grands effectifs.' }, features: [
        { en: 'Custom workflows', fr: 'Flux personnalisés' },
        { en: 'API & SSO', fr: 'API et SSO' },
        { en: 'Dedicated support', fr: 'Support dédié' },
        { en: 'Audit logs', fr: "Journaux d'audit" },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'klasoo',
    logo: '/images/logos/klasoo.png',
    name: 'Klasoo',
    tagline: { en: 'School Management Platform', fr: 'Plateforme de gestion scolaire' },
    description: {
      en: 'A complete operating system for modern educational institutions — connecting administrators, teachers, students and parents in one interconnected platform.',
      fr: 'Un système d\'exploitation complet pour les établissements scolaires modernes — connectant administrateurs, enseignants, élèves et parents sur une seule plateforme interconnectée.',
    },
    category: { en: 'Education', fr: 'Éducation' },
    available: false,
    icon: GraduationCap,
    gradient: 'from-liafrik-500 to-cyanx-500',
    accent: '#3D9BFF',
    features: [
      { en: 'Student records', fr: 'Dossiers élèves' },
      { en: 'Teacher management', fr: 'Gestion des enseignants' },
      { en: 'Class & timetable', fr: 'Classes et emplois du temps' },
      { en: 'Exams & grading', fr: 'Examens et notes' },
      { en: 'School finance', fr: 'Finances scolaires' },
      { en: 'Parent portal', fr: 'Portail parents' },
    ],
    benefits: [
      { en: 'Digitize your school', fr: 'Numérisez votre école' },
      { en: 'Engage parents easily', fr: 'Impliquez facilement les parents' },
      { en: 'Automate grading', fr: 'Automatisez la notation' },
      { en: 'Track fees collection', fr: 'Suivez le recouvrement des frais' },
    ],
    industries: [
      { en: 'K-12 schools', fr: 'Écoles primaires et secondaires' },
      { en: 'Universities', fr: 'Universités' },
      { en: 'Vocational centers', fr: 'Centres de formation' },
      { en: 'Cooperatives', fr: 'Coopératives' },
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
      { name: { en: 'Basic', fr: 'Basic' }, price: '$1', period: 'mo', description: { en: 'Per student. For small schools.', fr: 'Par élève. Pour les petites écoles.' }, features: [
        { en: 'Student records', fr: 'Dossiers élèves' },
        { en: 'Attendance', fr: 'Présences' },
        { en: 'Up to 200 students', fr: "Jusqu'à 200 élèves" },
        { en: 'Basic grading', fr: 'Notation de base' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Standard', fr: 'Standard' }, price: '$2', period: 'mo', popular: true, description: { en: 'Per student. For most schools.', fr: 'Par élève. Pour la plupart des écoles.' }, features: [
        { en: 'Exams & grading', fr: 'Examens et notes' },
        { en: 'Parent portal', fr: 'Portail parents' },
        { en: 'School finance', fr: 'Finances scolaires' },
        { en: 'Timetable builder', fr: 'Emplois du temps' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Campus', fr: 'Campus' }, price: 'Custom', description: { en: 'For universities & large campuses.', fr: 'Pour les universités et grands campus.' }, features: [
        { en: 'Multi-campus', fr: 'Multi-campus' },
        { en: 'API & integrations', fr: 'API et intégrations' },
        { en: 'Advanced analytics', fr: 'Analyses avancées' },
        { en: 'Dedicated support', fr: 'Support dédié' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'nutro',
    logo: '/images/logos/nutro.png',
    name: 'Nutro',
    tagline: { en: 'Restaurant Technology Platform', fr: 'Plateforme technologique de restauration' },
    description: {
      en: 'A premium restaurant technology platform — present menus digitally, showcase dishes, ingredients and nutritional information, and deliver an elegant dining experience.',
      fr: 'Une plateforme technologique premium pour restaurants — présentez vos menus numériquement, mettez en valeur plats, ingrédients et informations nutritionnelles, et offrez une expérience dining élégante.',
    },
    category: { en: 'Restaurants', fr: 'Restauration' },
    available: true,
    appUrl: 'https://nutro.liafrik.com',
    icon: UtensilsCrossed,
    gradient: 'from-cyanx-500 to-liafrik-500',
    accent: '#00BFE0',
    features: [
      { en: 'Order management', fr: 'Gestion des commandes' },
      { en: 'Kitchen display system', fr: "Système d'affichage cuisine" },
      { en: 'Table management', fr: 'Gestion des tables' },
      { en: 'Inventory & recipes', fr: 'Stocks et recettes' },
      { en: 'QR menu & ordering', fr: 'Menu QR et commandes' },
      { en: 'Staff scheduling', fr: 'Planning du personnel' },
    ],
    benefits: [
      { en: 'Serve faster', fr: 'Servez plus vite' },
      { en: 'Cut food waste', fr: 'Réduisez le gaspillage' },
      { en: 'Delight your guests', fr: 'Ravissez vos clients' },
      { en: 'Run multiple outlets', fr: 'Gérez plusieurs établissements' },
    ],
    industries: [
      { en: 'Restaurants', fr: 'Restaurants' },
      { en: 'Cafés', fr: 'Cafés' },
      { en: 'Fast food chains', fr: 'Chaînes de fast-food' },
      { en: 'Hotels', fr: 'Hôtels' },
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
      { name: { en: 'Solo', fr: 'Solo' }, price: '$39', period: 'mo', description: { en: 'For a single outlet.', fr: 'Pour un seul établissement.' }, features: [
        { en: '1 outlet · 5 staff', fr: '1 établissement · 5 employés' },
        { en: 'Orders & tables', fr: 'Commandes et tables' },
        { en: 'QR menu', fr: 'Menu QR' },
        { en: 'Daily reports', fr: 'Rapports quotidiens' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Chain', fr: 'Chain' }, price: '$99', period: 'mo', popular: true, description: { en: 'For multi-outlet restaurants.', fr: 'Pour les restaurants multi-établissements.' }, features: [
        { en: '3 outlets · 20 staff', fr: '3 établissements · 20 employés' },
        { en: 'Kitchen display', fr: 'Affichage cuisine' },
        { en: 'Inventory & recipes', fr: 'Stocks et recettes' },
        { en: 'Staff scheduling', fr: 'Planning personnel' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Enterprise', fr: 'Enterprise' }, price: 'Custom', description: { en: 'For large chains & franchises.', fr: 'Pour les grandes chaînes et franchises.' }, features: [
        { en: 'Unlimited outlets', fr: 'Établissements illimités' },
        { en: 'Centralized analytics', fr: 'Analyses centralisées' },
        { en: 'API access', fr: 'Accès API' },
        { en: 'Priority support', fr: 'Support prioritaire' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'health',
    logo: '/images/logos/health.png',
    name: 'Health',
    tagline: { en: 'Hospital & Clinic Management', fr: 'Gestion hospitalière et cliniques' },
    description: {
      en: 'Manage your hospital from admissions to medical records — patients, appointments, billing and clinical workflows.',
      fr: 'Gérez votre hôpital des admissions aux dossiers médicaux — patients, rendez-vous, facturation et flux cliniques.',
    },
    category: { en: 'Healthcare', fr: 'Santé' },
    available: true,
    appUrl: 'https://health.liafrik.com',
    icon: HeartPulse,
    gradient: 'from-liafrik-600 to-cyanx-400',
    accent: '#0070E0',
    features: [
      { en: 'Hospital dashboard', fr: 'Tableau de bord hospitalier' },
      { en: 'Patient records', fr: 'Dossiers patients' },
      { en: 'Appointment scheduling', fr: 'Prise de rendez-vous' },
      { en: 'Medical records & history', fr: 'Dossiers et historique médical' },
      { en: 'Billing & insurance', fr: 'Facturation et assurances' },
      { en: 'Pharmacy management', fr: 'Gestion de pharmacie' },
    ],
    benefits: [
      { en: 'Better patient care', fr: 'Meilleure prise en charge' },
      { en: 'Reduce wait times', fr: "Réduisez les temps d'attente" },
      { en: 'Secure medical records', fr: 'Dossiers médicaux sécurisés' },
      { en: 'Streamline billing', fr: 'Simplifiez la facturation' },
    ],
    industries: [
      { en: 'Hospitals', fr: 'Hôpitaux' },
      { en: 'Clinics', fr: 'Cliniques' },
      { en: 'Pharmacies', fr: 'Pharmacies' },
      { en: 'Labs', fr: 'Laboratoires' },
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
      { name: { en: 'Clinic', fr: 'Clinic' }, price: '$99', period: 'mo', description: { en: 'For small clinics.', fr: 'Pour les petites cliniques.' }, features: [
        { en: 'Up to 500 patients', fr: "Jusqu'à 500 patients" },
        { en: 'Appointments', fr: 'Rendez-vous' },
        { en: 'Patient records', fr: 'Dossiers patients' },
        { en: 'Basic billing', fr: 'Facturation de base' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Hospital', fr: 'Hospital' }, price: '$299', period: 'mo', popular: true, description: { en: 'For mid-size hospitals.', fr: 'Pour les hôpitaux de taille moyenne.' }, features: [
        { en: 'Up to 5,000 patients', fr: "Jusqu'à 5 000 patients" },
        { en: 'Medical records', fr: 'Dossiers médicaux' },
        { en: 'Pharmacy module', fr: 'Module pharmacie' },
        { en: 'Insurance billing', fr: 'Facturation assurance' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Network', fr: 'Network' }, price: 'Custom', description: { en: 'For hospital networks.', fr: "Pour les réseaux d'hôpitaux." }, features: [
        { en: 'Unlimited patients', fr: 'Patients illimités' },
        { en: 'Multi-facility', fr: 'Multi-établissements' },
        { en: 'API & HL7', fr: 'API et HL7' },
        { en: 'Dedicated support', fr: 'Support dédié' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'bailly',
    logo: '/images/logos/bailly.png',
    name: 'Bailly',
    tagline: { en: 'Real Estate Management', fr: 'Gestion immobilière' },
    description: {
      en: 'Manage properties, tenants, rent collection and maintenance requests — the complete tool for real estate companies.',
      fr: "Gérez biens, locataires, encaissement des loyers et demandes de maintenance — l'outil complet pour les sociétés immobilières.",
    },
    category: { en: 'Real Estate', fr: 'Immobilier' },
    available: true,
    appUrl: 'https://bailly.liafrik.com',
    icon: Building2,
    gradient: 'from-liafrik-500 to-liafrik-700',
    accent: '#3D9BFF',
    features: [
      { en: 'Property portfolio', fr: 'Portefeuille de biens' },
      { en: 'Tenant management', fr: 'Gestion des locataires' },
      { en: 'Rent collection', fr: 'Encaissement des loyers' },
      { en: 'Maintenance requests', fr: 'Demandes de maintenance' },
      { en: 'Lease tracking', fr: 'Suivi des baux' },
      { en: 'Financial reporting', fr: 'Rapports financiers' },
    ],
    benefits: [
      { en: 'Collect rent on time', fr: 'Encaissez les loyers à temps' },
      { en: 'Track every property', fr: 'Suivez chaque bien' },
      { en: 'Resolve maintenance fast', fr: 'Traitez la maintenance rapidement' },
      { en: 'See your ROI clearly', fr: 'Visualisez clairement votre ROI' },
    ],
    industries: [
      { en: 'Real estate firms', fr: 'Sociétés immobilières' },
      { en: 'Property managers', fr: 'Gestionnaires immobiliers' },
      { en: 'Cooperatives', fr: 'Coopératives' },
      { en: 'Investors', fr: 'Investisseurs' },
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
      { name: { en: 'Starter', fr: 'Starter' }, price: '$49', period: 'mo', description: { en: 'For small portfolios.', fr: 'Pour les petits portefeuilles.' }, features: [
        { en: 'Up to 50 units', fr: "Jusqu'à 50 unités" },
        { en: 'Tenant management', fr: 'Gestion des locataires' },
        { en: 'Rent collection', fr: 'Encaissement des loyers' },
        { en: 'Basic reports', fr: 'Rapports de base' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Pro', fr: 'Pro' }, price: '$149', period: 'mo', popular: true, description: { en: 'For growing portfolios.', fr: 'Pour les portefeuilles en croissance.' }, features: [
        { en: 'Up to 500 units', fr: "Jusqu'à 500 unités" },
        { en: 'Maintenance tracking', fr: 'Suivi de maintenance' },
        { en: 'Lease management', fr: 'Gestion des baux' },
        { en: 'Financial reporting', fr: 'Rapports financiers' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Enterprise', fr: 'Enterprise' }, price: 'Custom', description: { en: 'For large portfolios.', fr: 'Pour les grands portefeuilles.' }, features: [
        { en: 'Unlimited units', fr: 'Unités illimitées' },
        { en: 'Multi-company', fr: 'Multi-sociétés' },
        { en: 'API access', fr: 'Accès API' },
        { en: 'Dedicated support', fr: 'Support dédié' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'kolo',
    logo: '/images/logos/kolo.png',
    name: 'Kolo',
    tagline: { en: 'Digital Djangi / Tontine', fr: 'Djangi / Tontine numérique' },
    description: {
      en: 'Bring the traditional African savings circle into the digital age — manage tontine groups, contributions, savings and loans.',
      fr: "Faites entrer la tontine africaine traditionnelle dans l'ère numérique — gérez groupes, contributions, épargne et prêts.",
    },
    category: { en: 'Finance', fr: 'Finance' },
    available: false,
    icon: PiggyBank,
    gradient: 'from-orange-500 to-amber-400',
    accent: '#F97316',
    features: [
      { en: 'Tontine group management', fr: 'Gestion des groupes de tontine' },
      { en: 'Contribution tracking', fr: 'Suivi des contributions' },
      { en: 'Savings wallets', fr: "Portefeuilles d'épargne" },
      { en: 'Micro-loans', fr: 'Micro-prêts' },
      { en: 'Automatic payouts', fr: 'Paiements automatiques' },
      { en: 'Mobile money integration', fr: 'Intégration mobile money' },
    ],
    benefits: [
      { en: 'Trust through transparency', fr: 'Confiance par la transparence' },
      { en: 'Save as a community', fr: 'Épargnez en communauté' },
      { en: 'Access micro-loans', fr: 'Accédez à des micro-prêts' },
      { en: 'Pay out automatically', fr: 'Versez automatiquement' },
    ],
    industries: [
      { en: 'Cooperatives', fr: 'Coopératives' },
      { en: 'Savings groups', fr: "Groupes d'épargne" },
      { en: 'Microfinance', fr: 'Microfinance' },
      { en: 'Communities', fr: 'Communautés' },
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
      { name: { en: 'Community', fr: 'Community' }, price: 'Free', description: { en: 'For small savings groups.', fr: "Pour les petits groupes d'épargne." }, features: [
        { en: 'Up to 30 members', fr: "Jusqu'à 30 membres" },
        { en: '1 active group', fr: '1 groupe actif' },
        { en: 'Contribution tracking', fr: 'Suivi des contributions' },
        { en: 'Mobile money', fr: 'Mobile money' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Pro', fr: 'Pro' }, price: '$25', period: 'mo', popular: true, description: { en: 'For active organizers.', fr: 'Pour les organisateurs actifs.' }, features: [
        { en: 'Unlimited members', fr: 'Membres illimités' },
        { en: 'Unlimited groups', fr: 'Groupes illimités' },
        { en: 'Micro-loans', fr: 'Micro-prêts' },
        { en: 'Automatic payouts', fr: 'Versements automatiques' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Institution', fr: 'Institution' }, price: 'Custom', description: { en: 'For cooperatives & microfinance.', fr: 'Pour coopératives et microfinance.' }, features: [
        { en: 'White-label', fr: 'Marque blanche' },
        { en: 'API access', fr: 'Accès API' },
        { en: 'Compliance tools', fr: 'Outils de conformité' },
        { en: 'Dedicated support', fr: 'Support dédié' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'skills',
    logo: '/images/logos/skills.png',
    name: 'Skills',
 tagline: { en: 'Learning Marketplace', fr: 'Marketplace de formation' },
    description: {
      en: 'A learning marketplace where instructors publish educational video content and learners access courses — connecting course creators, students and knowledge worldwide.',
      fr: 'Une marketplace de formation où les instructeurs publient du contenu vidéo éducatif et les apprenants accèdent aux cours — connectant créateurs de cours, étudiants et savoir partout dans le monde.',
    },
    category: { en: 'Education', fr: 'Éducation' },
    available: true,
    appUrl: 'https://skills.liafrik.com',
    icon: MonitorPlay,
    gradient: 'from-liafrik-500 to-cyanx-500',
    accent: '#3D9BFF',
    features: [
      { en: 'Course catalog', fr: 'Catalogue de cours' },
      { en: 'Certifications', fr: 'Certifications' },
      { en: 'Progress tracking', fr: 'Suivi de progression' },
      { en: 'Expert instructors', fr: 'Instructeurs experts' },
    ],
    benefits: [
      { en: 'Upskill your team', fr: 'Formez vos équipes' },
      { en: 'Earn recognized certs', fr: 'Obtenez des certifications reconnues' },
      { en: 'Learn at your pace', fr: 'Apprenez à votre rythme' },
      { en: 'African-focused content', fr: "Contenu adapté à l'Afrique" },
    ],
    industries: [
      { en: 'Schools', fr: 'Écoles' },
      { en: 'Corporates', fr: 'Entreprises' },
      { en: 'Governments', fr: 'Gouvernements' },
      { en: 'NGOs', fr: 'ONG' },
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
    tagline: { en: "Women's Health Platform", fr: 'Plateforme de santé féminine' },
    description: {
      en: 'A women\'s health platform covering the female health journey — menstrual cycle tracking, pregnancy journeys, personalized insights and trusted health resources.',
      fr: 'Une plateforme de santé féminine couvrant le parcours de santé de la femme — suivi du cycle menstruel, parcours de grossesse, insights personnalisés et ressources santé de confiance.',
    },
    category: { en: 'Health & Wellness', fr: 'Santé et bien-être' },
    available: true,
    appUrl: 'https://mafo.liafrik.com',
    icon: Flower2,
    gradient: 'from-cyanx-500 to-liafrik-500',
    accent: '#00BFE0',
    features: [
      { en: 'Cycle tracking', fr: 'Suivi du cycle' },
      { en: 'Personalized advice', fr: 'Conseils personnalisés' },
      { en: 'Smart reminders', fr: 'Rappels intelligents' },
      { en: 'Health resources', fr: 'Ressources santé' },
    ],
    benefits: [
      { en: 'Understand your body', fr: 'Comprenez votre corps' },
      { en: 'Never miss a check-in', fr: 'Ne ratez aucun rendez-vous' },
      { en: 'Private & secure', fr: 'Privé et sécurisé' },
      { en: 'Trusted guidance', fr: 'Conseils de confiance' },
    ],
    industries: [
      { en: 'Healthcare', fr: 'Santé' },
      { en: 'Wellness', fr: 'Bien-être' },
      { en: 'Communities', fr: 'Communautés' },
      { en: 'NGOs', fr: 'ONG' },
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
    tagline: { en: 'Accounting & Financial Management', fr: 'Comptabilité et gestion financière' },
    description: {
      en: 'Run invoices, accounting, financial reports and tax compliance — the complete accounting platform for businesses worldwide.',
      fr: 'Gérez factures, comptabilité, rapports financiers et conformité fiscale — la plateforme comptable complète pour les entreprises partout dans le monde.',
    },
    category: { en: 'Accounting', fr: 'Comptabilité' },
    available: true,
    appUrl: 'https://libooks.liafrik.com',
    icon: BookOpenCheck,
    gradient: 'from-liafrik-600 to-liafrik-400',
    accent: '#0070E0',
    features: [
      { en: 'Invoicing', fr: 'Facturation' },
      { en: 'Double-entry accounting', fr: 'Comptabilité en partie double' },
      { en: 'Financial reports', fr: 'Rapports financiers' },
      { en: 'Tax compliance', fr: 'Conformité fiscale' },
    ],
    benefits: [
      { en: 'Stay audit-ready', fr: "Soyez prêt pour l'audit" },
      { en: 'Automate invoicing', fr: 'Automatisez la facturation' },
      { en: 'Track cash flow live', fr: 'Suivez la trésorerie en direct' },
      { en: 'Comply with local tax', fr: 'Conformez à la fiscalité locale' },
    ],
    industries: [
      { en: 'SMEs', fr: 'PME' },
      { en: 'Accountants', fr: 'Comptables' },
      { en: 'Startups', fr: 'Startups' },
      { en: 'Enterprises', fr: 'Entreprises' },
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
    tagline: { en: 'Fashion & Lifestyle Marketplace', fr: 'Marketplace mode et lifestyle' },
    description: {
      en: 'A dedicated fashion and lifestyle marketplace connecting brands and independent sellers with shoppers across Africa — curated catalogs, fast checkout, and integrated delivery.',
      fr: 'Une marketplace dédiée à la mode et au lifestyle, connectant marques et vendeurs indépendants aux acheteurs à travers l\'Afrique — catalogues sélectionnés, paiement rapide et livraison intégrée.',
    },
    category: { en: 'Marketplace', fr: 'Marketplace' },
    available: false,
    icon: ShoppingBag,
    gradient: 'from-cyanx-500 to-liafrik-500',
    accent: '#00BFE0',
    features: [
      { en: 'Multi-vendor storefronts', fr: 'Boutiques multi-vendeurs' },
      { en: 'Curated catalogs', fr: 'Catalogues sélectionnés' },
      { en: 'Integrated delivery', fr: 'Livraison intégrée' },
      { en: 'Buyer protection', fr: 'Protection acheteur' },
      { en: 'Seller analytics', fr: 'Analyses vendeur' },
      { en: 'Mobile-first checkout', fr: 'Paiement pensé mobile-first' },
    ],
    benefits: [
      { en: 'Reach shoppers across Africa', fr: "Atteignez des acheteurs dans toute l'Afrique" },
      { en: 'Sell without your own store', fr: 'Vendez sans boutique en ligne propre' },
      { en: 'Get paid securely', fr: 'Soyez payé en toute sécurité' },
      { en: 'Grow with built-in marketing', fr: 'Développez-vous avec le marketing intégré' },
    ],
    industries: [
      { en: 'Fashion brands', fr: 'Marques de mode' },
      { en: 'Independent sellers', fr: 'Vendeurs indépendants' },
      { en: 'Lifestyle boutiques', fr: 'Boutiques lifestyle' },
      { en: 'Designers', fr: 'Créateurs' },
    ],
    dashboard: {
      title: { en: 'Zando Dashboard', fr: 'Tableau de bord Zando' },
      metric: { label: { en: 'Orders today', fr: 'Commandes du jour' }, value: '—', delta: 'Coming soon', up: true },
      panels: [
        { kind: 'stat', title: { en: 'Marketplace overview', fr: 'Aperçu marketplace' }, stats: [
          { label: { en: 'Active sellers', fr: 'Vendeurs actifs' }, value: '—' },
          { label: { en: 'Listings', fr: 'Annonces' }, value: '—' },
          { label: { en: 'Categories', fr: 'Catégories' }, value: '—' },
          { label: { en: 'Launch', fr: 'Lancement' }, value: 'Soon', up: true },
        ]},
      ],
    },
    pricing: [],
  },
  {
    slug: 'atlas',
    logo: '/images/logos/atlas.png',
    name: 'Atlas',
    tagline: { en: 'Enterprise CRM, Built Multi-Tenant', fr: 'CRM entreprise, pensé multi-tenant' },
    description: {
      en: 'The enterprise-grade CRM for groups, franchises and multi-brand businesses. Every client, branch or business unit gets its own strictly isolated workspace — same platform, zero data leakage between tenants.',
      fr: "Le CRM entreprise pour les groupes, franchises et structures multi-marques. Chaque client, agence ou unité d'affaires dispose de son propre espace strictement isolé — une seule plateforme, aucune fuite de données entre comptes.",
    },
    category: { en: 'Enterprise CRM', fr: 'CRM entreprise' },
    available: true,
    appUrl: 'https://atlas.liafrik.com',
    icon: Users,
    gradient: 'from-liafrik-600 to-cyanx-500',
    accent: '#0070E0',
    features: [
      { en: 'Strict multi-tenant data isolation', fr: 'Isolation stricte des données multi-tenant' },
      { en: 'Per-tenant roles & permissions', fr: 'Rôles et permissions par tenant' },
      { en: 'Unified pipeline across brands', fr: 'Pipeline unifié multi-marques' },
      { en: 'Lead & contact management', fr: 'Gestion des leads et contacts' },
      { en: 'Automated workflows', fr: 'Flux automatisés' },
      { en: 'Audit logs & compliance', fr: "Journaux d'audit et conformité" },
    ],
    benefits: [
      { en: 'Every client, truly walled off', fr: 'Chaque client, réellement cloisonné' },
      { en: 'Scale to hundreds of tenants safely', fr: 'Passez à l\'échelle sur des centaines de comptes en toute sécurité' },
      { en: 'One platform, many businesses', fr: 'Une plateforme, plusieurs entreprises' },
      { en: 'Audit-ready by design', fr: 'Prêt pour l\'audit dès la conception' },
    ],
    industries: [
      { en: 'Multi-brand groups', fr: 'Groupes multi-marques' },
      { en: 'Franchises', fr: 'Franchises' },
      { en: 'Agencies managing clients', fr: 'Agences gérant des clients' },
      { en: 'SaaS resellers', fr: 'Revendeurs SaaS' },
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
      { name: { en: 'Team', fr: 'Team' }, price: '$59', period: 'mo', description: { en: 'For a single business unit.', fr: "Pour une seule unité d'affaires." }, features: [
        { en: '1 isolated workspace', fr: '1 espace isolé' },
        { en: 'Pipeline & leads', fr: 'Pipeline et leads' },
        { en: 'Basic automation', fr: 'Automatisation de base' },
        { en: '10 users', fr: '10 utilisateurs' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Multi-Tenant', fr: 'Multi-Tenant' }, price: '$149', period: 'mo', popular: true, description: { en: 'For groups running several brands or branches.', fr: 'Pour les groupes multi-marques ou multi-agences.' }, features: [
        { en: 'Up to 20 isolated workspaces', fr: "Jusqu'à 20 espaces isolés" },
        { en: 'Per-tenant roles', fr: 'Rôles par tenant' },
        { en: 'Advanced automation', fr: 'Automatisation avancée' },
        { en: 'Audit logs', fr: "Journaux d'audit" },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Enterprise', fr: 'Enterprise' }, price: 'Custom', description: { en: 'For large groups, franchises & SaaS resellers.', fr: 'Pour les grands groupes, franchises et revendeurs SaaS.' }, features: [
        { en: 'Unlimited isolated workspaces', fr: 'Espaces isolés illimités' },
        { en: 'API & SSO', fr: 'API et SSO' },
        { en: 'Compliance & data residency', fr: 'Conformité et résidence des données' },
        { en: 'Dedicated support', fr: 'Support dédié' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
    ],
  },
  {
    slug: 'litrek',
    logo: '/images/logos/litrek.png',
    name: 'Litrek',
    tagline: { en: 'Urban & Interurban Transport Platform', fr: 'Plateforme de transport urbain et interurbain' },
    description: {
      en: 'A transport platform for everyone — book bus, van and interurban tickets in a few taps. Local travel agencies list their routes and schedules, and riders book, pay and travel with confidence.',
      fr: "Une plateforme de transport pour tous — réservez vos billets de bus, van ou trajets interurbains en quelques clics. Les agences de voyages locales publient leurs trajets et horaires, et les usagers réservent, paient et voyagent en toute confiance.",
    },
    category: { en: 'Transport', fr: 'Transport' },
    available: true,
    appUrl: 'https://litrek.liafrik.com',
    icon: Route,
    gradient: 'from-teal-500 to-emerald-400',
    accent: '#14B8A6',
    features: [
      { en: 'Route & schedule listings', fr: 'Trajets et horaires publiés' },
      { en: 'Online ticket booking', fr: 'Réservation de billets en ligne' },
      { en: 'Secure online payment', fr: 'Paiement en ligne sécurisé' },
      { en: 'Digital e-tickets', fr: 'Billets électroniques' },
      { en: 'Multi-tenant isolation per agency', fr: 'Isolation multi-tenant par agence' },
      { en: 'Trip & booking history', fr: 'Historique des trajets et réservations' },
    ],
    benefits: [
      { en: 'Book a trip in minutes, from anywhere', fr: 'Réservez un trajet en quelques minutes, où que vous soyez' },
      { en: 'Agencies reach more travelers online', fr: 'Les agences touchent plus de voyageurs en ligne' },
      { en: 'No more queueing at the station', fr: 'Fini les files d\'attente à la gare' },
      { en: 'Each agency\'s data stays its own', fr: "Les données de chaque agence restent les siennes" },
    ],
    industries: [
      { en: 'Local travel agencies', fr: 'Agences de voyages locales' },
      { en: 'Bus & van operators', fr: 'Opérateurs de bus et vans' },
      { en: 'Daily commuters', fr: 'Usagers du quotidien' },
      { en: 'Interurban travelers', fr: 'Voyageurs interurbains' },
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
      { name: { en: 'Rider', fr: 'Voyageur' }, price: 'Free', description: { en: 'For anyone booking trips.', fr: 'Pour tous les voyageurs.' }, features: [
        { en: 'Book & pay for tickets', fr: 'Réserver et payer ses billets' },
        { en: 'Digital e-tickets', fr: 'Billets électroniques' },
        { en: 'Trip history', fr: 'Historique des trajets' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Agency', fr: 'Agence' }, price: '$49', period: 'mo', popular: true, description: { en: 'For travel agencies & operators.', fr: 'Pour les agences et opérateurs de transport.' }, features: [
        { en: 'Unlimited routes & schedules', fr: 'Trajets et horaires illimités' },
        { en: 'Isolated agency workspace', fr: 'Espace agence isolé' },
        { en: 'Booking analytics', fr: 'Analyses des réservations' },
        { en: '5 staff accounts', fr: '5 comptes collaborateurs' },
      ], cta: { en: 'Start free', fr: 'Commencer' } },
      { name: { en: 'Network', fr: 'Réseau' }, price: 'Custom', description: { en: 'For large multi-agency networks.', fr: 'Pour les grands réseaux multi-agences.' }, features: [
        { en: 'Unlimited agencies', fr: 'Agences illimitées' },
        { en: 'API access', fr: 'Accès API' },
        { en: 'Dedicated support', fr: 'Support dédié' },
      ], cta: { en: 'Contact sales', fr: 'Contacter les ventes' } },
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
    name: { en: 'Retail & Commerce', fr: 'Commerce de détail' },
    icon: ShoppingCart,
    productSlugs: ['pos', 'sellia', 'crm', 'atlas', 'libooks'],
  },
  {
    id: 'ecommerce',
    name: { en: 'E-commerce', fr: 'E-commerce' },
    icon: Store,
    productSlugs: ['sellia', 'zando', 'crm', 'libooks'],
  },
  {
    id: 'education',
    name: { en: 'Education', fr: 'Éducation' },
    icon: GraduationCap,
    productSlugs: ['klasoo', 'skills'],
  },
  {
    id: 'healthcare',
    name: { en: 'Healthcare', fr: 'Santé' },
    icon: HeartPulse,
    productSlugs: ['health', 'mafo'],
  },
  {
    id: 'restaurant',
    name: { en: 'Restaurants', fr: 'Restauration' },
    icon: UtensilsCrossed,
    productSlugs: ['nutro', 'pos', 'libooks'],
  },
  {
    id: 'realestate',
    name: { en: 'Real Estate', fr: 'Immobilier' },
    icon: Building2,
    productSlugs: ['bailly', 'crm', 'libooks'],
  },
  {
    id: 'finance',
    name: { en: 'Cooperative & Finance', fr: 'Coopérative & Finance' },
    icon: PiggyBank,
    productSlugs: ['kolo', 'libooks'],
  },
  {
    id: 'hr',
    name: { en: 'HR & Workforce', fr: 'RH & Effectifs' },
    icon: Users,
    productSlugs: ['faka', 'crm', 'atlas', 'libooks'],
  },
  {
    id: 'transport',
    name: { en: 'Transport', fr: 'Transport' },
    icon: Route,
    productSlugs: ['litrek', 'crm', 'libooks'],
  },
];
