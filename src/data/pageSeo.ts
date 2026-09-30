// Title / H1 / meta description for every static page, in 5 languages.
// SINGLE SOURCE OF TRUTH: read by each page's useSEO() (what the browser
// shows after JS runs) AND by scripts/prerender.mjs (the static HTML that
// crawlers read first). Keeping one copy means they can never disagree.
//
// Keys are route slugs ('' = home).

export type SeoLang = 'en' | 'fr' | 'ar' | 'es' | 'pt';
export type SeoText = Record<SeoLang, string>;
export interface PageSeo { title: SeoText; h1: SeoText; desc: SeoText }

export const PAGE_SEO: Record<string, PageSeo> = {
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
    title: { en: 'Support | Liafrik', fr: 'Assistance client | Liafrik', ar: 'الدعم | Liafrik', es: 'Soporte | Liafrik', pt: 'Suporte | Liafrik' },
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
      ar: 'الشروط التي تحكم استخدامك لنظام Liafrik المتكامل: الحسابات والاستخدام المقبول والاشتراكات والمسؤولية.',
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

/** Ready-to-use { title, description } for useSEO(). */
export function pageSeo(slug: string, lang: SeoLang): { title: string; description: string } {
  const page = PAGE_SEO[slug];
  return { title: page.title[lang], description: page.desc[lang] };
}
