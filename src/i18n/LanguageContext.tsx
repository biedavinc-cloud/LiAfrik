import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'fr';

type Dict = Record<string, { en: string; fr: string }>;

export const translations: Dict = {
  // Nav
  'nav.solutions': { en: 'Solutions', fr: 'Solutions' },
  'nav.industries': { en: 'Industries', fr: 'Industries' },
  'nav.features': { en: 'Features', fr: 'Fonctionnalités' },
  'nav.security': { en: 'Security', fr: 'Sécurité' },
  'nav.developers': { en: 'Developers', fr: 'Développeurs' },
  'nav.about': { en: 'About', fr: 'À propos' },
  'nav.contact': { en: 'Contact', fr: 'Contact' },
  'nav.bookDemo': { en: 'Book Demo', fr: 'Réserver une démo' },
  'nav.startFree': { en: 'Start Free', fr: 'Commencer gratuitement' },

  // Hero
  'hero.headline': { en: 'One Ecosystem. Powerful SaaS. Built for the World.', fr: 'Un écosystème. Des SaaS puissants. Conçu pour le monde.' },
  'hero.sub1': {
    en: 'LiAfrik brings together powerful, specialized SaaS platforms that help businesses, organizations, institutions and communities manage the most important parts of their operations — all within one connected ecosystem.',
    fr: 'LiAfrik réunit des plateformes SaaS spécialisées et puissantes qui aident les entreprises, organisations, institutions et communautés à gérer les parties les plus importantes de leurs opérations — au sein d’un seul écosystème connecté.',
  },
  'hero.sub2': {
    en: 'African-born. Global by design. Commerce, healthcare, education, HR, finance, real estate, restaurants, community — everything connected.',
    fr: "Né en Afrique. Global par conception. Commerce, santé, éducation, RH, finance, immobilier, restauration, communauté — tout est connecté.",
  },
  'hero.cta.start': { en: 'Start Free', fr: 'Commencer gratuitement' },
  'hero.cta.ecosystem': { en: 'Explore the Ecosystem', fr: "Explorer l'écosystème" },
  'hero.cta.demo': { en: 'Request Demo', fr: 'Demander une démo' },
  'hero.trust': {
    en: 'Trusted by ambitious businesses building the future of Africa.',
    fr: "La confiance d'entreprises ambitieuses qui construisent l'avenir de l'Afrique.",
  },

  // Powered by
  'powered.title': { en: 'Powered by World-Class Technologies', fr: 'Propulsé par des technologies de classe mondiale' },
  'powered.sub': {
    en: 'Built using modern cloud technologies trusted by millions of businesses worldwide.',
    fr: "Construit avec des technologies cloud modernes, plébiscitées par des millions d'entreprises dans le monde.",
  },

  // Ecosystem
  'eco.title': { en: 'One Platform. Infinite Possibilities.', fr: 'Une seule plateforme. Possibilités infinies.' },
  'eco.sub': {
    en: 'Every business. Every industry. Every workflow. Connected.',
    fr: 'Chaque entreprise. Chaque industrie. Chaque flux de travail. Connectés.',
  },
  'eco.drag': { en: 'Drag to explore', fr: 'Glissez pour explorer' },
  'eco.learnMore': { en: 'Learn More', fr: 'En savoir plus' },
  'eco.notify': { en: 'Notify Me', fr: 'Prévenez-moi' },
  'eco.comingSoon': { en: 'Coming Soon', fr: 'Bientôt disponible' },
  'eco.features': { en: 'Key features', fr: 'Fonctionnalités clés' },

  // Why LiAfrik
  'why.tag': { en: 'Why LiAfrik', fr: 'Pourquoi LiAfrik' },
  'why.title': { en: 'Stop juggling 10 tools. Run one platform.', fr: 'Arrêtez de jongler avec 10 outils. Utilisez une seule plateforme.' },
  'why.insteadOf': { en: 'Instead of', fr: 'Au lieu de' },
  'why.use': { en: 'You get', fr: 'Vous obtenez' },
  'why.softwares': { en: '10 software tools', fr: '10 logiciels' },
  'why.dashboards': { en: '10 dashboards', fr: '10 tableaux de bord' },
  'why.databases': { en: '10 databases', fr: '10 bases de données' },
  'why.logins': { en: '10 logins', fr: '10 identifiants' },
  'why.invoices': { en: '10 invoices', fr: '10 factures' },
  'why.onePlatform': { en: 'One Platform', fr: 'Une seule plateforme' },
  'why.oneDashboard': { en: 'One Dashboard', fr: 'Un seul tableau de bord' },
  'why.oneDatabase': { en: 'One Database', fr: 'Une seule base de données' },
  'why.oneLogin': { en: 'One Login', fr: 'Un seul identifiant' },
  'why.oneSubscription': { en: 'One Subscription', fr: 'Un seul abonnement' },
  'why.connected': { en: 'Everything connected.', fr: 'Tout est connecté.' },

  // Industries
  'industries.tag': { en: 'Industries', fr: 'Industries' },
  'industries.title': { en: 'Built for every sector of the African economy', fr: "Conçu pour chaque secteur de l'économie africaine" },
  'industries.sub': {
    en: 'From the corner shop to national enterprises — LiAfrik adapts to how you work.',
    fr: "Du commerce de quartier aux entreprises nationales — LiAfrik s'adapte à votre façon de travailler.",
  },

  // Features
  'features.tag': { en: 'Enterprise Grade', fr: 'Niveau Entreprise' },
  'features.title': { en: 'Everything an enterprise needs. Nothing it does not.', fr: "Tout ce dont une entreprise a besoin. Rien de superflu." },
  'features.sub': {
    en: 'A cloud infrastructure designed for scale, security and the realities of operating in Africa.',
    fr: "Une infrastructure cloud conçue pour la performance, la sécurité et les réalités de l'exploitation en Afrique.",
  },

  // Stats
  'stats.title': { en: 'Numbers that speak for themselves', fr: "Des chiffres qui parlent d'eux-mêmes" },
  'stats.sub': { en: 'A platform engineered for scale and reliability.', fr: 'Une plateforme conçue pour la performance et la fiabilité.' },

  // How it works
  'how.tag': { en: 'How It Works', fr: 'Comment ça marche' },
  'how.title': { en: 'Get running in three steps', fr: 'Opérationnel en trois étapes' },
  'how.step1.title': { en: 'Create your workspace', fr: 'Créez votre espace de travail' },
  'how.step1.desc': { en: 'Sign up and set up your company in minutes. No technical skills required.', fr: 'Inscrivez-vous et configurez votre entreprise en quelques minutes. Aucune compétence technique requise.' },
  'how.step2.title': { en: 'Activate the apps you need', fr: 'Activez les applications dont vous avez besoin' },
  'how.step2.desc': { en: 'Turn on POS, HR, School, Restaurant or any other module with a single click.', fr: "Activez POS, RH, School, Restaurant ou tout autre module d'un simple clic." },
  'how.step3.title': { en: 'Run your entire business', fr: 'Pilotez toute votre entreprise' },
  'how.step3.desc': { en: 'One login, one dashboard, one subscription. Everything stays in sync.', fr: 'Un identifiant, un tableau de bord, un abonnement. Tout reste synchronisé.' },

  // Testimonials
  'testi.tag': { en: 'Testimonials', fr: 'Témoignages' },
  'testi.title': { en: 'Loved by ambitious African businesses', fr: 'Adopté par les entreprises africaines ambitieuses' },
  'testi.sub': { en: 'Real stories from operators running on LiAfrik.', fr: "De vraies histoires d'opérateurs qui utilisent LiAfrik." },

  // World map
  'world.tag': { en: 'Global Scale', fr: 'Portée mondiale' },
  'world.title': { en: 'Built for Africa. Designed for Global Scale.', fr: "Conçu pour l'Afrique. Pensé pour une portée mondiale." },
  'world.sub': {
    en: 'African-first architecture, cloud-native delivery, and infrastructure ready to scale across continents.',
    fr: "Architecture africaine d'abord, livraison cloud-native et infrastructure prête à passer à l'échelle mondiale.",
  },

  // FAQ
  'faq.tag': { en: 'FAQ', fr: 'FAQ' },
  'faq.title': { en: 'Questions, answered', fr: 'Vos questions, nos réponses' },
  'faq.sub': { en: 'Everything you need to know before getting started.', fr: "Tout ce qu'il faut savoir avant de commencer." },

  // Contact
  'contact.tag': { en: 'Contact', fr: 'Contact' },
  'contact.title': { en: "Let's talk about your business", fr: 'Parlons de votre entreprise' },
  'contact.sub': {
    en: 'Our team helps you choose the right modules and get running fast.',
    fr: 'Notre équipe vous aide à choisir les bons modules et à démarrer rapidement.',
  },
  'contact.phone': { en: 'Phone', fr: 'Téléphone' },
  'contact.email': { en: 'Email', fr: 'E-mail' },
  'contact.form.name': { en: 'Full name', fr: 'Nom complet' },
  'contact.form.email': { en: 'Work email', fr: 'E-mail professionnel' },
  'contact.form.company': { en: 'Company', fr: 'Entreprise' },
  'contact.form.message': { en: 'How can we help?', fr: 'Comment pouvons-nous aider ?' },
  'contact.form.send': { en: 'Send message', fr: 'Envoyer le message' },
  'contact.form.success': { en: 'Thanks! We will be in touch shortly.', fr: 'Merci ! Nous reviendrons vers vous très vite.' },
  'contact.support.title': { en: 'Need help right now?', fr: "Besoin d'aide immédiatement ?" },
  'contact.support.desc': { en: 'Chat with our support team.', fr: 'Discutez avec notre équipe support.' },

  // Final CTA
  'finalCta.title': { en: 'Ready to Build the Future of Your Business?', fr: "Prêt à construire l'avenir de votre entreprise ?" },
  'finalCta.sub': {
    en: 'Join the next generation of African businesses powered by LiAfrik.',
    fr: "Rejoignez la nouvelle génération d'entreprises africaines propulsées par LiAfrik.",
  },
  'finalCta.start': { en: 'Start Free', fr: 'Commencer gratuitement' },
  'finalCta.demo': { en: 'Book a Demo', fr: 'Réserver une démo' },

  // Footer
  'footer.tagline': { en: 'The Operating System for African Businesses.', fr: "Le système d'exploitation des entreprises africaines." },
  'footer.products': { en: 'Products', fr: 'Produits' },
  'footer.solutions': { en: 'Solutions', fr: 'Solutions' },
  'footer.industries': { en: 'Industries', fr: 'Industries' },
  'footer.developers': { en: 'Developers', fr: 'Développeurs' },
  'footer.resources': { en: 'Resources', fr: 'Ressources' },
  'footer.about': { en: 'About', fr: 'À propos' },
  'footer.careers': { en: 'Careers', fr: 'Carrières' },
  'footer.contact': { en: 'Contact', fr: 'Contact' },
  'footer.privacy': { en: 'Privacy Policy', fr: 'Politique de confidentialité' },
  'footer.terms': { en: 'Terms of Service', fr: "Conditions d'utilisation" },
  'footer.rights': { en: 'A LIYAH GROUP company. All rights reserved.', fr: 'Une société LIYAH GROUP. Tous droits réservés.' },

  // Product page
  'product.back': { en: 'Back to ecosystem', fr: "Retour à l'écosystème" },
  'product.features': { en: 'Features', fr: 'Fonctionnalités' },
  'product.benefits': { en: 'Benefits', fr: 'Bénéfices' },
  'product.industries': { en: 'Industries', fr: 'Industries' },
  'product.cta': { en: 'Get started', fr: 'Démarrer' },
  'product.contact': { en: 'Talk to sales', fr: 'Contacter les ventes' },
  'product.pricingTitle': { en: 'Simple, transparent pricing', fr: 'Une tarification simple et transparente' },
  'product.pricingSub': { en: 'Choose the plan that fits your business today. Upgrade anytime.', fr: "Choisissez le plan adapté à votre entreprise aujourd'hui. Changez à tout moment." },
  'product.perMonth': { en: '/mo', fr: '/mois' },
  'product.mostPopular': { en: 'Most popular', fr: 'Le plus populaire' },
  'product.choosePlan': { en: 'Choose plan', fr: 'Choisir ce plan' },
  'product.viewDemo': { en: 'View live demo', fr: 'Voir la démo en direct' },

  // Coming soon page
  'cs.tag': { en: 'Coming Soon', fr: 'Bientôt disponible' },
  'cs.title': { en: 'Something remarkable is on the way', fr: 'Quelque chose de remarquable arrive' },
  'cs.notifyTitle': { en: 'Be the first to know', fr: 'Soyez le premier informé' },
  'cs.notifySub': { en: 'Get notified the moment we launch.', fr: 'Soyez prévenu dès le lancement.' },
  'cs.email': { en: 'Your email address', fr: 'Votre adresse e-mail' },
  'cs.notify': { en: 'Notify me', fr: 'Prévenez-moi' },
  'cs.success': { en: "You're on the list! We'll be in touch at launch.", fr: 'Vous êtes sur la liste ! Nous vous contacterons au lancement.' },
  'cs.vision': { en: 'The vision', fr: 'La vision' },
  'cs.backEco': { en: 'Explore the full ecosystem', fr: "Explorer tout l'écosystème" },

  // Build Your Stack configurator
  'stack.tag': { en: 'Build Your Stack', fr: 'Construisez votre stack' },
  'stack.title': { en: 'Assemble your LiAfrik ecosystem', fr: 'Assemblez votre écosystème LiAfrik' },
  'stack.sub': { en: 'Pick your industry and watch your platform come together in real time.', fr: "Choisissez votre secteur et regardez votre plateforme s'assembler en temps réel." },
  'stack.choose': { en: 'Choose your industry', fr: 'Choisissez votre secteur' },
  'stack.yourStack': { en: 'Your LiAfrik ecosystem', fr: 'Votre écosystème LiAfrik' },
  'stack.empty': { en: 'Select an industry above to see your recommended modules.', fr: 'Sélectionnez un secteur pour voir vos modules recommandés.' },
  'stack.summary': { en: 'Here is your LiAfrik ecosystem', fr: 'Voici votre écosystème LiAfrik' },
  'stack.modules': { en: 'modules', fr: 'modules' },
  'stack.start': { en: 'Start Free', fr: 'Commencer gratuitement' },
  'stack.demo': { en: 'Book a Demo', fr: 'Réserver une démo' },
  'stack.added': { en: 'Connected', fr: 'Connecté' },

  // Security & Trust
  'sec.tag': { en: 'Security & Trust', fr: 'Sécurité & Confiance' },
  'sec.title': { en: 'Your data is safe with LiAfrik', fr: 'Vos données sont en sécurité avec LiAfrik' },
  'sec.sub': { en: 'Built to bank-grade standards — because your business deserves nothing less.', fr: "Conçu selon des standards niveau bancaire — parce que votre entreprise mérite l'excellence." },
  'sec.encryption.title': { en: 'Encrypted end to end', fr: 'Chiffré de bout en bout' },
  'sec.encryption.desc': { en: 'Data is encrypted in transit and at rest using industry-leading protocols.', fr: 'Données chiffrées en transit et au repos via les protocoles les plus avancés.' },
  'sec.hosting.title': { en: 'Secure cloud hosting', fr: 'Hébergement cloud sécurisé' },
  'sec.hosting.desc': { en: 'Redundant infrastructure on world-class cloud providers with failover.', fr: 'Infrastructure redondante sur des clouds de classe mondiale avec basculement.' },
  'sec.backup.title': { en: 'Automatic backups', fr: 'Sauvegardes automatiques' },
  'sec.backup.desc': { en: 'Continuous backups and disaster recovery so you never lose a thing.', fr: 'Sauvegardes continues et reprise après sinistre, pour ne rien perdre.' },
  'sec.audit.title': { en: 'Audit logs', fr: "Journaux d'audit" },
  'sec.audit.desc': { en: 'Full traceability of every action and access across your workspace.', fr: 'Traçabilité complète de chaque action et accès dans votre espace.' },
  'sec.roles.title': { en: 'Role permissions', fr: 'Permissions par rôle' },
  'sec.roles.desc': { en: 'Granular control over who can see, edit and approve what.', fr: 'Contrôle précis de qui peut voir, modifier et approuver quoi.' },
  'sec.compliance.title': { en: 'Data compliance', fr: 'Conformité des données' },
  'sec.compliance.desc': { en: 'Aligned with data protection standards across African jurisdictions.', fr: 'Aligné avec les standards de protection des données africains.' },
  'sec.privacy.title': { en: 'Privacy by design', fr: 'Confidentialité par conception' },
  'sec.privacy.desc': { en: 'Special care for sensitive data — health, HR, finance, savings. Always private.', fr: 'Soin particulier pour les données sensibles — santé, RH, finance, épargne. Toujours privé.' },

  // Product redirect
  'product.openApp': { en: 'Open the application', fr: "Ouvrir l'application" },
  'product.appSoon': { en: 'Platform launching soon', fr: 'Plateforme bientôt disponible' },
  'product.appSoonDesc': { en: "This product's app is being finalized. Get notified or talk to our team.", fr: "L'application de ce produit est en cours de finalisation. Soyez prévenu ou contactez notre équipe." },

  // Testimonials honesty
  'testi.example': { en: 'Example of typical feedback', fr: 'Exemple de retour type' },
  'testi.real': { en: 'Verified customer', fr: 'Client vérifié' },
  'testi.placeholder': { en: 'Real testimonials from our first customers coming soon', fr: 'Vrais témoignages de nos premiers clients bientôt disponibles' },
  'testi.placeholderSub': { en: 'We are onboarding our first businesses across Africa. Their stories will appear here.', fr: 'Nous accueillons nos premières entreprises en Afrique. Leurs histoires apparaîtront ici.' },

  // Products catalog page
  'products.tag': { en: 'The Ecosystem', fr: "L'écosystème" },
  'products.title': { en: 'Explore every LiAfrik platform', fr: 'Explorez chaque plateforme LiAfrik' },
  'products.sub': { en: 'Specialized SaaS for every part of your operations — all connected, all under one ecosystem.', fr: 'Des SaaS spécialisés pour chaque partie de vos opérations — tous connectés, tous sous un seul écosystème.' },
  'products.filterAll': { en: 'All Platforms', fr: 'Toutes les plateformes' },
  'products.available': { en: 'Available now', fr: 'Disponible' },
  'products.comingSoon': { en: 'Coming soon', fr: 'Bientôt disponible' },
  'products.explore': { en: 'Explore', fr: 'Explorer' },
  'products.launch': { en: 'Launch App', fr: 'Lancer l\'app' },
  'products.joinWaitlist': { en: 'Join Waitlist', fr: 'Rejoindre la liste d\'attente' },
  'products.pricingFrom': { en: 'from', fr: 'à partir de' },
  'products.category.business': { en: 'Business & Commerce', fr: 'Commerce & Affaires' },
  'products.category.industry': { en: 'Industry & Operations', fr: 'Industrie & Opérations' },
  'products.category.education': { en: 'Education & Learning', fr: 'Éducation & Apprentissage' },
  'products.category.community': { en: 'Community & Wellbeing', fr: 'Communauté & Bien-être' },

  // Founder
  'founder.tag': { en: 'About the Founder', fr: 'À propos du fondateur' },
  'founder.title': { en: 'A vision born in Africa, built for the world', fr: 'Une vision née en Afrique, conçue pour le monde' },
  'founder.desc': { en: 'LiAfrik is part of the LIYAH GROUP family of companies — building technology that elevates how communities and businesses work everywhere.', fr: 'LiAfrik fait partie de la famille de sociétés LIYAH GROUP — construisant des technologies qui élèvent la manière dont les communautés et les entreprises travaillent partout.' },
  'founder.cta': { en: 'Meet the Founder', fr: 'Rencontrer le fondateur' },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'liafrik-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'en' || saved === 'fr') return saved;
    }
    return 'en';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    t: (key: string) => translations[key]?.[lang] ?? key,
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
