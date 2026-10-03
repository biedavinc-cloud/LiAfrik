import type { BlogLang } from '@/data/blog';

// Interface strings for the blog (the blog exists in French and English;
// other site languages are redirected to English).
export const UI: Record<BlogLang, Record<string, string>> = {
  fr: {
    blog: 'Blog',
    eyebrow: 'Blog Liafrik',
    hubTitle: 'Le blog Liafrik : guides pratiques pour développer votre activité',
    hubIntro: `Commerce, santé, finance, éducation, immobilier, transport… Des guides concrets pour chaque métier, avec les outils Liafrik pour passer à l’action.`,
    all: 'Tous',
    featured: 'À la une',
    read: `Lire l'article`,
    minRead: 'min de lecture',
    soon: 'Bientôt',
    team: 'Équipe Liafrik',
    inThisArticle: 'Dans cet article',
    faq: 'Questions fréquentes',
    related: 'À lire aussi',
    aboutProduct: 'Le produit Liafrik',
    discover: 'Découvrir',
    tryApp: 'Essayer',
    seePlans: 'Voir les offres',
    notify: 'Être prévenu du lancement',
    allProducts: 'Tous les produits',
    results: 'article(s)',
    home: 'Accueil',
  },
  en: {
    blog: 'Blog',
    eyebrow: 'Liafrik Blog',
    hubTitle: 'The Liafrik blog: practical guides to grow your business',
    hubIntro: `Commerce, healthcare, finance, education, real estate, transport… Concrete guides for every trade, with Liafrik tools to put them into action.`,
    all: 'All',
    featured: 'Featured',
    read: 'Read the article',
    minRead: 'min read',
    soon: 'Coming soon',
    team: 'The Liafrik team',
    inThisArticle: 'In this article',
    faq: 'Frequently asked questions',
    related: 'Keep reading',
    aboutProduct: 'The Liafrik product',
    discover: 'Discover',
    tryApp: 'Try',
    seePlans: 'See plans',
    notify: 'Get notified at launch',
    allProducts: 'All products',
    results: 'article(s)',
    home: 'Home',
  },
};

export const formatDate = (iso: string, lang: BlogLang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
