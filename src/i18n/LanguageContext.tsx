import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type Lang = 'en' | 'fr' | 'ar' | 'es' | 'pt';

export const SUPPORTED_LANGS: Lang[] = ['en', 'fr', 'ar', 'es', 'pt'];

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
  es: 'Español',
  pt: 'Português',
};

export const RTL_LANGS: Lang[] = ['ar'];

type Dict = Record<string, Record<Lang, string>>;

export const translations: Dict = {
  'contact.email': { en: "Email", fr: "E-mail", ar: "البريد الإلكتروني", es: "Correo electrónico", pt: "E-mail" },
  'contact.form.company': { en: "Company", fr: "Entreprise", ar: "الشركة", es: "Empresa", pt: "Empresa" },
  'contact.form.email': { en: "Work email", fr: "E-mail professionnel", ar: "البريد الإلكتروني للعمل", es: "Correo laboral", pt: "E-mail profissional" },
  'contact.form.message': { en: "How can we help?", fr: "Comment pouvons-nous aider ?", ar: "كيف يمكننا مساعدتك؟", es: "¿Cómo podemos ayudarte?", pt: "Como podemos ajudar?" },
  'contact.form.name': { en: "Full name", fr: "Nom complet", ar: "الاسم الكامل", es: "Nombre completo", pt: "Nome completo" },
  'contact.form.send': { en: "Send message", fr: "Envoyer le message", ar: "إرسال الرسالة", es: "Enviar mensaje", pt: "Enviar mensagem" },
  'contact.form.success': { en: "Thanks! We will be in touch shortly.", fr: "Merci ! Nous reviendrons vers vous très vite.", ar: "شكراً لك! سنتواصل معك قريباً.", es: "¡Gracias! Nos pondremos en contacto contigo pronto.", pt: "Obrigado! Entraremos em contato em breve." },
  'contact.phone': { en: "Phone", fr: "Téléphone", ar: "الهاتف", es: "Teléfono", pt: "Telefone" },
  'contact.sub': { en: "Our team helps you choose the right modules and get running fast.", fr: "Notre équipe vous aide à choisir les bons modules et à démarrer rapidement.", ar: "يساعدك فريقنا في اختيار الوحدات المناسبة والانطلاق بسرعة.", es: "Nuestro equipo te ayuda a elegir los módulos adecuados y a empezar rápido.", pt: "Nossa equipe ajuda você a escolher os módulos certos e a começar rapidamente." },
  'contact.support.desc': { en: "Chat with our support team.", fr: "Discutez avec notre équipe support.", ar: "تحدث مع فريق الدعم لدينا.", es: "Chatea con nuestro equipo de soporte.", pt: "Converse com nossa equipe de suporte." },
  'contact.support.title': { en: "Need help right now?", fr: "Besoin d'aide immédiatement ?", ar: "تحتاج مساعدة الآن؟", es: "¿Necesitas ayuda ahora mismo?", pt: "Precisa de ajuda agora?" },
  'contact.tag': { en: "Contact", fr: "Contact", ar: "اتصل بنا", es: "Contacto", pt: "Contato" },
  'contact.title': { en: "Let's talk about your business", fr: "Parlons de votre entreprise", ar: "لنتحدث عن أعمالك", es: "Hablemos de tu negocio", pt: "Vamos falar sobre o seu negócio" },
  'cookie.accept': { en: "Accept", fr: "Accepter", ar: "قبول", es: "Aceptar", pt: "Aceitar" },
  'cookie.body': { en: "Essential cookies keep the site working. With your consent, we also use analytics cookies to understand how the site is used.", fr: "Les cookies essentiels font fonctionner le site. Avec votre accord, nous utilisons aussi des cookies analytiques pour comprendre son utilisation.", ar: "ملفات تعريف الارتباط الأساسية تُبقي الموقع يعمل بشكل سليم. بموافقتك، نستخدم أيضاً ملفات تحليلية لفهم كيفية استخدام الموقع.", es: "Las cookies esenciales mantienen el sitio funcionando. Con tu consentimiento, también usamos cookies analíticas para entender cómo se usa el sitio.", pt: "Os cookies essenciais mantêm o site a funcionar. Com o seu consentimento, também usamos cookies analíticos para entender como o site é utilizado." },
  'cookie.decline': { en: "Decline", fr: "Refuser", ar: "رفض", es: "Rechazar", pt: "Recusar" },
  'cookie.learnMore': { en: "Learn more", fr: "En savoir plus", ar: "اعرف المزيد", es: "Saber más", pt: "Saiba mais" },
  'cookie.title': { en: "We use cookies", fr: "Nous utilisons des cookies", ar: "نحن نستخدم ملفات تعريف الارتباط", es: "Usamos cookies", pt: "Usamos cookies" },
  'cs.backEco': { en: "Explore the full ecosystem", fr: "Explorer tout l'écosystème", ar: "استكشف النظام المتكامل بالكامل", es: "Explorar todo el ecosistema", pt: "Explorar todo o ecossistema" },
  'cs.email': { en: "Your email address", fr: "Votre adresse e-mail", ar: "بريدك الإلكتروني", es: "Tu correo electrónico", pt: "Seu e-mail" },
  'cs.notify': { en: "Notify me", fr: "Prévenez-moi", ar: "أعلمني", es: "Avísame", pt: "Avise-me" },
  'cs.notifySub': { en: "Get notified the moment we launch.", fr: "Soyez prévenu dès le lancement.", ar: "ستُعلَم فور الإطلاق.", es: "Recibe una notificación en cuanto lancemos.", pt: "Seja notificado assim que lançarmos." },
  'cs.notifyTitle': { en: "Be the first to know", fr: "Soyez le premier informé", ar: "كن أول من يعلم", es: "Sé el primero en saberlo", pt: "Seja o primeiro a saber" },
  'cs.success': { en: "You're on the list! We'll be in touch at launch.", fr: "Vous êtes sur la liste ! Nous vous contacterons au lancement.", ar: "تمت إضافتك إلى القائمة! سنتواصل معك عند الإطلاق.", es: "¡Ya estás en la lista! Te contactaremos en el lanzamiento.", pt: "Você está na lista! Entraremos em contato no lançamento." },
  'cs.tag': { en: "Coming Soon", fr: "Bientôt disponible", ar: "قريباً", es: "Próximamente", pt: "Em breve" },
  'cs.title': { en: "Something remarkable is on the way", fr: "Quelque chose de remarquable arrive", ar: "شيء استثنائي في الطريق", es: "Algo extraordinario está en camino", pt: "Algo extraordinário está a caminho" },
  'cs.vision': { en: "The vision", fr: "La vision", ar: "الرؤية", es: "La visión", pt: "A visão" },
  'eco.comingSoon': { en: "Coming Soon", fr: "Bientôt disponible", ar: "قريباً", es: "Próximamente", pt: "Em breve" },
  'eco.drag': { en: "Drag to explore", fr: "Glissez pour explorer", ar: "اسحب للاستكشاف", es: "Arrastra para explorar", pt: "Arraste para explorar" },
  'eco.features': { en: "Key features", fr: "Fonctionnalités clés", ar: "الميزات الرئيسية", es: "Funciones clave", pt: "Funcionalidades principais" },
  'eco.learnMore': { en: "Learn More", fr: "En savoir plus", ar: "اعرف المزيد", es: "Saber más", pt: "Saiba mais" },
  'eco.notify': { en: "Notify Me", fr: "Prévenez-moi", ar: "أعلمني", es: "Avísame", pt: "Avise-me" },
  'eco.sub': { en: "Every business. Every industry. Every workflow. Connected.", fr: "Chaque entreprise. Chaque industrie. Chaque flux de travail. Connectés.", ar: "كل شركة. كل قطاع. كل سير عمل. مترابط.", es: "Cada empresa. Cada industria. Cada flujo de trabajo. Conectados.", pt: "Cada empresa. Cada indústria. Cada fluxo de trabalho. Conectados." },
  'eco.title': { en: "One Platform. Infinite Possibilities.", fr: "Une seule plateforme. Possibilités infinies.", ar: "منصة واحدة. إمكانيات لا حصر لها.", es: "Una plataforma. Posibilidades infinitas.", pt: "Uma plataforma. Possibilidades infinitas." },
  'faq.sub': { en: "Everything you need to know before getting started.", fr: "Tout ce qu'il faut savoir avant de commencer.", ar: "كل ما تحتاج معرفته قبل البدء.", es: "Todo lo que necesitas saber antes de empezar.", pt: "Tudo o que você precisa saber antes de começar." },
  'faq.tag': { en: "FAQ", fr: "FAQ", ar: "الأسئلة الشائعة", es: "Preguntas frecuentes", pt: "Perguntas frequentes" },
  'faq.title': { en: "Questions, answered", fr: "Vos questions, nos réponses", ar: "أسئلة وأجوبة", es: "Preguntas respondidas", pt: "Perguntas respondidas" },
  'features.sub': { en: "A cloud infrastructure designed for scale, security and the realities of operating worldwide.", fr: "Une infrastructure cloud conçue pour la performance, la sécurité et les réalités de l'exploitation en Afrique.", ar: "بنية تحتية سحابية مصممة للتوسع والأمان وواقع العمل حول العالم.", es: "Una infraestructura en la nube diseñada para la escala, la seguridad y las realidades de operar en todo el mundo.", pt: "Uma infraestrutura em nuvem projetada para escala, segurança e as realidades de operar em todo o mundo." },
  'features.tag': { en: "Enterprise Grade", fr: "Niveau Entreprise", ar: "مستوى المؤسسات", es: "Nivel empresarial", pt: "Nível empresarial" },
  'features.title': { en: "Everything an enterprise needs. Nothing it does not.", fr: "Tout ce dont une entreprise a besoin. Rien de superflu.", ar: "كل ما تحتاجه المؤسسة. لا شيء أكثر من ذلك.", es: "Todo lo que una empresa necesita. Nada de más.", pt: "Tudo o que uma empresa precisa. Nada supérfluo." },
  'finalCta.demo': { en: "Book a Demo", fr: "Réserver une démo", ar: "احجز عرضاً توضيحياً", es: "Reservar una demo", pt: "Agendar uma demonstração" },
  'finalCta.start': { en: "Start Free", fr: "Commencer gratuitement", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" },
  'finalCta.sub': { en: "Start using powerful SaaS from just $9/month. Join the global ecosystem that helps businesses, organizations and communities operate at their best.", fr: "Commencez à utiliser des SaaS puissants dès $9/mois. Rejoignez l'écosystème mondial qui aide les entreprises, organisations et communautés à donner leur meilleur.", ar: "ابدأ استخدام برمجيات قوية بدءاً من 9 دولارات فقط شهرياً. انضم إلى النظام العالمي المتكامل الذي يساعد الشركات والمؤسسات والمجتمعات على تقديم أفضل ما لديها.", es: "Empieza a usar SaaS potentes desde solo $9/mes. Únete al ecosistema global que ayuda a empresas, organizaciones y comunidades a dar lo mejor de sí.", pt: "Comece a usar SaaS poderosos a partir de apenas $9/mês. Junte-se ao ecossistema global que ajuda empresas, organizações e comunidades a operar da melhor forma." },
  'finalCta.title': { en: "Ready to transform how you work?", fr: "Prêt à transformer votre façon de travailler ?", ar: "هل أنت مستعد لتغيير طريقة عملك؟", es: "¿Listo para transformar tu forma de trabajar?", pt: "Pronto para transformar a forma como você trabalha?" },
  'footer.about': { en: "About", fr: "À propos", ar: "من نحن", es: "Nosotros", pt: "Sobre nós" },
  'footer.careers': { en: "Careers", fr: "Carrières", ar: "الوظائف", es: "Empleo", pt: "Carreiras" },
  'footer.company': { en: "Company", fr: "Entreprise", ar: "الشركة", es: "Empresa", pt: "Empresa" },
  'footer.contact': { en: "Contact", fr: "Contact", ar: "اتصل بنا", es: "Contacto", pt: "Contato" },
  'footer.developers': { en: "Developers", fr: "Développeurs", ar: "المطورون", es: "Desarrolladores", pt: "Desenvolvedores" },
  'footer.industries': { en: "Industries", fr: "Industries", ar: "القطاعات", es: "Industrias", pt: "Indústrias" },
  'footer.legal': { en: "Legal", fr: "Mentions légales", ar: "قانوني", es: "Legal", pt: "Legal" },
  'footer.privacy': { en: "Privacy Policy", fr: "Politique de confidentialité", ar: "سياسة الخصوصية", es: "Política de privacidad", pt: "Política de privacidade" },
  'footer.products': { en: "Products", fr: "Produits", ar: "المنتجات", es: "Productos", pt: "Produtos" },
  'footer.refund': { en: "Refund Policy", fr: "Politique de remboursement", ar: "سياسة الاسترداد", es: "Política de reembolso", pt: "Política de reembolso" },
  'footer.resources': { en: "Resources", fr: "Ressources", ar: "الموارد", es: "Recursos", pt: "Recursos" },
  'footer.rights': { en: "LiAfrik. All rights reserved.", fr: "LiAfrik. Tous droits réservés.", ar: "LiAfrik. جميع الحقوق محفوظة.", es: "LiAfrik. Todos los derechos reservados.", pt: "LiAfrik. Todos os direitos reservados." },
  'footer.solutions': { en: "Solutions", fr: "Solutions", ar: "الحلول", es: "Soluciones", pt: "Soluções" },
  'footer.support': { en: "Support", fr: "Support", ar: "الدعم", es: "Soporte", pt: "Suporte" },
  'footer.tagline': { en: "A global SaaS ecosystem. African roots, global vision. One connected experience for commerce, healthcare, education, HR, finance and more.", fr: "Un écosystème SaaS mondial. Racines africaines, vision globale. Une expérience connectée pour le commerce, la santé, l'éducation, les RH, la finance et plus encore.", ar: "نظام برمجي عالمي متكامل. جذور أفريقية ورؤية عالمية. تجربة مترابطة للتجارة والصحة والتعليم والموارد البشرية والتمويل وأكثر.", es: "Un ecosistema SaaS global. Raíces africanas, visión global. Una experiencia conectada para comercio, salud, educación, RR. HH., finanzas y más.", pt: "Um ecossistema SaaS global. Raízes africanas, visão global. Uma experiência conectada para comércio, saúde, educação, RH, finanças e muito mais." },
  'footer.terms': { en: "Terms of Service", fr: "Conditions d'utilisation", ar: "شروط الخدمة", es: "Términos de servicio", pt: "Termos de serviço" },
  'founder.cta': { en: "Meet the Founder", fr: "Rencontrer le fondateur", ar: "تعرّف على المؤسس", es: "Conoce al fundador", pt: "Conheça o fundador" },
  'founder.desc': { en: "A global SaaS ecosystem born from African ambition — building technology that elevates how communities and businesses work everywhere.", fr: "Un écosystème SaaS mondial né d'une ambition africaine — construisant des technologies qui élèvent la manière dont les communautés et les entreprises travaillent partout.", ar: "نظام برمجي عالمي متكامل وُلد من طموح أفريقي — يبني تقنيات ترتقي بطريقة عمل المجتمعات والشركات في كل مكان.", es: "Un ecosistema SaaS global nacido de la ambición africana, construyendo tecnología que mejora cómo trabajan comunidades y empresas en todas partes.", pt: "Um ecossistema SaaS global nascido da ambição africana — construindo tecnologia que eleva a forma como comunidades e empresas trabalham em todo o lugar." },
  'founder.tag': { en: "About the Founder", fr: "À propos du fondateur", ar: "عن المؤسس", es: "Sobre el fundador", pt: "Sobre o fundador" },
  'founder.title': { en: "A vision born in Africa, built for the world", fr: "Une vision née en Afrique, conçue pour le monde", ar: "رؤية وُلدت في أفريقيا، صُممت للعالم", es: "Una visión nacida en África, creada para el mundo", pt: "Uma visão nascida em África, criada para o mundo" },
  'founderPage.desc': { en: "Meet Vincent Nogue — the founder and CEO building a global SaaS ecosystem with African roots.", fr: "Rencontrez Vincent Nogue — le fondateur et CEO qui construit un écosystème SaaS mondial avec des racines africaines.", ar: "تعرّف على Vincent Nogue — المؤسس والرئيس التنفيذي الذي يبني نظاماً برمجياً عالمياً متكاملاً بجذور أفريقية.", es: "Conoce a Vincent Nogue, el fundador y CEO que construye un ecosistema SaaS global con raíces africanas.", pt: "Conheça Vincent Nogue — o fundador e CEO que constrói um ecossistema SaaS global com raízes africanas." },
  'founderPage.group.cta': { en: "Explore the ecosystem", fr: "Explorer l'écosystème", ar: "استكشف النظام المتكامل", es: "Explorar el ecosistema", pt: "Explorar o ecossistema" },
  'founderPage.group.desc': { en: "From Cameroon to Dubai, from design to full-stack engineering — the LiAfrik ecosystem reflects a journey of continuous learning and global ambition.", fr: "Du Cameroun à Dubaï, du design à l'ingénierie full-stack — l'écosystème LiAfrik reflète un parcours d'apprentissage continu et d'ambition mondiale.", ar: "من الكاميرون إلى دبي، من التصميم إلى الهندسة الشاملة — يعكس نظام LiAfrik المتكامل رحلة من التعلّم المستمر والطموح العالمي.", es: "De Camerún a Dubái, del diseño a la ingeniería full-stack: el ecosistema LiAfrik refleja un recorrido de aprendizaje continuo y ambición global.", pt: "De Camarões a Dubai, do design à engenharia full-stack — o ecossistema LiAfrik reflete uma jornada de aprendizado contínuo e ambição global." },
  'founderPage.group.title': { en: "A vision built on global experience", fr: "Une vision fondée sur l'expérience mondiale", ar: "رؤية مبنية على خبرة عالمية", es: "Una visión basada en experiencia global", pt: "Uma visão construída sobre experiência global" },
  'founderPage.title': { en: "The vision behind LiAfrik", fr: "La vision derrière LiAfrik", ar: "الرؤية وراء LiAfrik", es: "La visión detrás de LiAfrik", pt: "A visão por trás da LiAfrik" },
  'founderPage.vision.body': { en: "LiAfrik was founded with a clear conviction: that technology built with African roots can serve the world. The platform brings together specialized SaaS for commerce, healthcare, education, HR, finance, real estate, restaurants and community — all connected within a single ecosystem.", fr: "LiAfrik a été fondé avec une conviction claire : la technologie née avec des racines africaines peut servir le monde. La plateforme réunit des SaaS spécialisés pour le commerce, la santé, l'éducation, les RH, la finance, l'immobilier, la restauration et la communauté — tous connectés au sein d'un seul écosystème.", ar: "تأسست LiAfrik انطلاقاً من قناعة واضحة: أن التقنية ذات الجذور الأفريقية يمكنها خدمة العالم. تجمع المنصة برمجيات متخصصة للتجارة والصحة والتعليم والموارد البشرية والتمويل والعقارات والمطاعم والمجتمع — كلها مترابطة ضمن نظام واحد متكامل.", es: "LiAfrik fue fundada con una convicción clara: que la tecnología con raíces africanas puede servir al mundo. La plataforma reúne SaaS especializados para comercio, salud, educación, RR. HH., finanzas, bienes raíces, restaurantes y comunidad, todos conectados en un solo ecosistema.", pt: "A LiAfrik foi fundada com uma convicção clara: que a tecnologia construída com raízes africanas pode servir o mundo. A plataforma reúne SaaS especializados para comércio, saúde, educação, RH, finanças, imóveis, restaurantes e comunidade — todos conectados dentro de um único ecossistema." },
  'founderPage.vision.body2': { en: "The mission is simple: give businesses, organizations, professionals and communities the tools they need to manage, grow and operate more effectively — wherever they are.", fr: "La mission est simple : donner aux entreprises, organisations, professionnels et communautés les outils dont ils ont besoin pour gérer, croître et opérer plus efficacement — où qu'ils soient.", ar: "المهمة بسيطة: تزويد الشركات والمؤسسات والمهنيين والمجتمعات بالأدوات التي يحتاجونها لإدارة أعمالهم والنمو والعمل بكفاءة أكبر — أينما كانوا.", es: "La misión es simple: dar a empresas, organizaciones, profesionales y comunidades las herramientas que necesitan para gestionar, crecer y operar de forma más eficaz, estén donde estén.", pt: "A missão é simples: dar a empresas, organizações, profissionais e comunidades as ferramentas de que precisam para gerir, crescer e operar de forma mais eficaz — onde quer que estejam." },
  'founderPage.vision.title': { en: "A vision born in Africa, built for the world", fr: "Une vision née en Afrique, conçue pour le monde", ar: "رؤية وُلدت في أفريقيا، صُممت للعالم", es: "Una visión nacida en África, creada para el mundo", pt: "Uma visão nascida em África, criada para o mundo" },
  'hero.cta.demo': { en: "Request Demo", fr: "Demander une démo", ar: "اطلب عرضاً توضيحياً", es: "Solicitar demo", pt: "Solicitar demonstração" },
  'hero.cta.ecosystem': { en: "Explore the Ecosystem", fr: "Explorer l'écosystème", ar: "استكشف النظام المتكامل", es: "Explorar el ecosistema", pt: "Explorar o ecossistema" },
  'hero.cta.start': { en: "Start Free", fr: "Commencer gratuitement", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" },
  'hero.headline': { en: "One Ecosystem. Powerful SaaS. Built for the World.", fr: "Un écosystème. Des SaaS puissants. Conçu pour le monde.", ar: "نظام واحد متكامل. برمجيات قوية كخدمة. مصمم للعالم.", es: "Un ecosistema. SaaS potentes. Creado para el mundo.", pt: "Um ecossistema. SaaS poderosos. Criado para o mundo." },
  'hero.sub1': { en: "LiAfrik brings together powerful, specialized SaaS platforms that help businesses, organizations, institutions and communities manage the most important parts of their operations — all within one connected ecosystem.", fr: "LiAfrik réunit des plateformes SaaS spécialisées et puissantes qui aident les entreprises, organisations, institutions et communautés à gérer les parties les plus importantes de leurs opérations — au sein d'un seul écosystème connecté.", ar: "يجمع LiAfrik بين منصات برمجية متخصصة وقوية تساعد الشركات والمؤسسات والهيئات والمجتمعات على إدارة أهم جوانب عملياتها — كل ذلك ضمن نظام واحد متكامل ومترابط.", es: "LiAfrik reúne plataformas SaaS potentes y especializadas que ayudan a empresas, organizaciones, instituciones y comunidades a gestionar las partes más importantes de sus operaciones, todo dentro de un solo ecosistema conectado.", pt: "A LiAfrik reúne plataformas SaaS poderosas e especializadas que ajudam empresas, organizações, instituições e comunidades a gerir as partes mais importantes das suas operações — tudo dentro de um único ecossistema conectado." },
  'hero.sub2': { en: "African-born. Global by design. Commerce, healthcare, education, HR, finance, real estate, restaurants, community — everything connected.", fr: "Né en Afrique. Global par conception. Commerce, santé, éducation, RH, finance, immobilier, restauration, communauté — tout est connecté.", ar: "وُلد في أفريقيا. عالمي بالتصميم. التجارة، الصحة، التعليم، الموارد البشرية، التمويل، العقارات، المطاعم، المجتمع — كل شيء مترابط.", es: "Nacido en África. Global por diseño. Comercio, salud, educación, RR. HH., finanzas, bienes raíces, restaurantes, comunidad: todo conectado.", pt: "Nascido em África. Global por design. Comércio, saúde, educação, RH, finanças, imóveis, restaurantes, comunidade — tudo conectado." },
  'hero.trust': { en: "African roots. Global vision. Powerful SaaS for the world.", fr: "Racines africaines. Vision globale. Des SaaS puissants pour le monde.", ar: "جذور أفريقية. رؤية عالمية. برمجيات قوية للعالم.", es: "Raíces africanas. Visión global. SaaS potentes para el mundo.", pt: "Raízes africanas. Visão global. SaaS poderosos para o mundo." },
  'how.step1.desc': { en: "Sign up and set up your company in minutes. No technical skills required.", fr: "Inscrivez-vous et configurez votre entreprise en quelques minutes. Aucune compétence technique requise.", ar: "سجّل وأعدّ شركتك في دقائق معدودة. لا حاجة لأي مهارات تقنية.", es: "Regístrate y configura tu empresa en minutos. No se requieren conocimientos técnicos.", pt: "Cadastre-se e configure sua empresa em minutos. Nenhuma habilidade técnica necessária." },
  'how.step1.title': { en: "Create your workspace", fr: "Créez votre espace de travail", ar: "أنشئ مساحة عملك", es: "Crea tu espacio de trabajo", pt: "Crie o seu espaço de trabalho" },
  'how.step2.desc': { en: "Turn on POS, Faka (HR), Klasoo (Education), Nutro (Restaurants) or any other module with a single click.", fr: "Activez POS, Faka (RH), Klasoo (Éducation), Nutro (Restauration) ou tout autre module d'un simple clic.", ar: "فعّل POS، أو Faka (الموارد البشرية)، أو Klasoo (التعليم)، أو Nutro (المطاعم) أو أي وحدة أخرى بنقرة واحدة.", es: "Activa POS, Faka (RR. HH.), Klasoo (Educación), Nutro (Restaurantes) o cualquier otro módulo con un solo clic.", pt: "Ative o POS, Faka (RH), Klasoo (Educação), Nutro (Restaurantes) ou qualquer outro módulo com um único clique." },
  'how.step2.title': { en: "Activate the apps you need", fr: "Activez les applications dont vous avez besoin", ar: "فعّل التطبيقات التي تحتاجها", es: "Activa las aplicaciones que necesitas", pt: "Ative os aplicativos que você precisa" },
  'how.step3.desc': { en: "One login, one dashboard, one subscription. Everything stays in sync.", fr: "Un identifiant, un tableau de bord, un abonnement. Tout reste synchronisé.", ar: "حساب دخول واحد، لوحة تحكم واحدة، اشتراك واحد. كل شيء يبقى متزامناً.", es: "Un inicio de sesión, un panel, una suscripción. Todo permanece sincronizado.", pt: "Um login, um painel, uma assinatura. Tudo permanece sincronizado." },
  'how.step3.title': { en: "Run your entire business", fr: "Pilotez toute votre entreprise", ar: "أدر شركتك بالكامل", es: "Gestiona todo tu negocio", pt: "Administre todo o seu negócio" },
  'how.tag': { en: "How It Works", fr: "Comment ça marche", ar: "كيف يعمل", es: "Cómo funciona", pt: "Como funciona" },
  'how.title': { en: "Get running in three steps", fr: "Opérationnel en trois étapes", ar: "ابدأ العمل في ثلاث خطوات", es: "Empieza en tres pasos", pt: "Comece em três passos" },
  'industries.sub': { en: "From the corner shop to national enterprises — LiAfrik adapts to how you work.", fr: "Du commerce de quartier aux entreprises nationales — LiAfrik s'adapte à votre façon de travailler.", ar: "من متجر الحي إلى الشركات الوطنية الكبرى — يتكيف LiAfrik مع طريقة عملك.", es: "Desde la tienda de barrio hasta las grandes empresas nacionales: LiAfrik se adapta a tu forma de trabajar.", pt: "Da loja de bairro às grandes empresas nacionais — a LiAfrik se adapta à sua forma de trabalhar." },
  'industries.tag': { en: "Industries", fr: "Industries", ar: "القطاعات", es: "Industrias", pt: "Indústrias" },
  'industries.title': { en: "Built for every sector of the global economy", fr: "Conçu pour chaque secteur de l'économie mondiale", ar: "مصمم لكل قطاع من قطاعات الاقتصاد العالمي", es: "Creado para todos los sectores de la economía global", pt: "Criado para todos os setores da economia global" },
  'nav.about': { en: "About", fr: "À propos", ar: "من نحن", es: "Nosotros", pt: "Sobre nós" },
  'nav.bookDemo': { en: "Book Demo", fr: "Réserver une démo", ar: "احجز عرضاً توضيحياً", es: "Reservar demo", pt: "Agendar demonstração" },
  'nav.contact': { en: "Contact", fr: "Contact", ar: "اتصل بنا", es: "Contacto", pt: "Contato" },
  'nav.features': { en: "Features", fr: "Fonctionnalités", ar: "الميزات", es: "Funciones", pt: "Funcionalidades" },
  'nav.founder': { en: "Founder", fr: "Fondateur", ar: "المؤسس", es: "Fundador", pt: "Fundador" },
  'nav.industries': { en: "Industries", fr: "Industries", ar: "القطاعات", es: "Industrias", pt: "Indústrias" },
  'nav.presence': { en: "Presence", fr: "Présence", ar: "حضورنا", es: "Presencia", pt: "Presença" },
  'nav.products': { en: "Products", fr: "Produits", ar: "المنتجات", es: "Productos", pt: "Produtos" },
  'nav.security': { en: "Security", fr: "Sécurité", ar: "الأمان", es: "Seguridad", pt: "Segurança" },
  'nav.solutions': { en: "Solutions", fr: "Solutions", ar: "الحلول", es: "Soluciones", pt: "Soluções" },
  'nav.startFree': { en: "Start Free", fr: "Commencer gratuitement", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" },
  'nav.support': { en: "Support", fr: "Support", ar: "الدعم", es: "Soporte", pt: "Suporte" },
  'powered.sub': { en: "Built using modern cloud technologies trusted by millions of businesses worldwide.", fr: "Construit avec des technologies cloud modernes, plébiscitées par des millions d'entreprises dans le monde.", ar: "مبني باستخدام تقنيات سحابية حديثة تثق بها ملايين الشركات حول العالم.", es: "Creado con tecnologías cloud modernas, en las que confían millones de empresas en todo el mundo.", pt: "Criado com tecnologias de nuvem modernas, nas quais milhões de empresas em todo o mundo confiam." },
  'powered.title': { en: "Powered by World-Class Technologies", fr: "Propulsé par des technologies de classe mondiale", ar: "مدعوم بتقنيات عالمية المستوى", es: "Impulsado por tecnologías de clase mundial", pt: "Impulsionado por tecnologias de classe mundial" },
  'presence.digital.desc': { en: "While our offices are in Dubai and Yaoundé, LiAfrik platforms serve businesses and organizations worldwide. Our cloud infrastructure is built to scale across continents.", fr: "Bien que nos bureaux soient à Dubaï et Yaoundé, les plateformes LiAfrik servent les entreprises et organisations du monde entier. Notre infrastructure cloud est conçue pour passer à l'échelle intercontinentale.", ar: "رغم أن مكاتبنا تقع في دبي وياوندي، فإن منصات LiAfrik تخدم شركات ومؤسسات حول العالم. بنيتنا التحتية السحابية مصممة للتوسع عبر القارات.", es: "Aunque nuestras oficinas están en Dubái y Yaundé, las plataformas LiAfrik sirven a empresas y organizaciones en todo el mundo. Nuestra infraestructura en la nube está diseñada para escalar entre continentes.", pt: "Embora nossos escritórios estejam em Dubai e Yaoundé, as plataformas LiAfrik atendem empresas e organizações em todo o mundo. Nossa infraestrutura em nuvem é projetada para escalar entre continentes." },
  'presence.digital.title': { en: "Global digital reach", fr: "Portée numérique mondiale", ar: "انتشار رقمي عالمي", es: "Alcance digital global", pt: "Alcance digital global" },
  'presence.sub': { en: "A physical presence in two hubs, with global digital reach.", fr: "Une présence physique dans deux hubs, avec une portée numérique mondiale.", ar: "حضور فعلي في مركزين، مع انتشار رقمي عالمي.", es: "Presencia física en dos sedes, con alcance digital global.", pt: "Presença física em dois polos, com alcance digital global." },
  'presence.tag': { en: "Our Presence", fr: "Notre présence", ar: "حضورنا", es: "Nuestra presencia", pt: "Nossa presença" },
  'presence.title': { en: "Where we are", fr: "Où nous sommes", ar: "أين نحن", es: "Dónde estamos", pt: "Onde estamos" },
  'product.appSoon': { en: "Platform launching soon", fr: "Plateforme bientôt disponible", ar: "المنصة قريباً", es: "Plataforma disponible pronto", pt: "Plataforma disponível em breve" },
  'product.appSoonDesc': { en: "This product's app is being finalized. Get notified or talk to our team.", fr: "L'application de ce produit est en cours de finalisation. Soyez prévenu ou contactez notre équipe.", ar: "تطبيق هذا المنتج قيد الإنجاز النهائي. اطلب أن تُعلَم أو تواصل مع فريقنا.", es: "La aplicación de este producto está siendo finalizada. Recibe una notificación o habla con nuestro equipo.", pt: "O aplicativo deste produto está sendo finalizado. Seja notificado ou fale com nossa equipe." },
  'product.back': { en: "Back to ecosystem", fr: "Retour à l'écosystème", ar: "العودة إلى النظام المتكامل", es: "Volver al ecosistema", pt: "Voltar ao ecossistema" },
  'product.benefits': { en: "Benefits", fr: "Bénéfices", ar: "الفوائد", es: "Beneficios", pt: "Benefícios" },
  'product.choosePlan': { en: "Choose plan", fr: "Choisir ce plan", ar: "اختر هذه الخطة", es: "Elegir plan", pt: "Escolher plano" },
  'product.contact': { en: "Talk to sales", fr: "Contacter les ventes", ar: "تحدث مع المبيعات", es: "Hablar con ventas", pt: "Falar com vendas" },
  'product.cta': { en: "Get started", fr: "Démarrer", ar: "ابدأ الآن", es: "Empezar", pt: "Começar" },
  'product.features': { en: "Features", fr: "Fonctionnalités", ar: "الميزات", es: "Funciones", pt: "Funcionalidades" },
  'product.industries': { en: "Industries", fr: "Industries", ar: "القطاعات", es: "Industrias", pt: "Indústrias" },
  'product.mostPopular': { en: "Most popular", fr: "Le plus populaire", ar: "الأكثر شيوعاً", es: "Más popular", pt: "Mais popular" },
  'product.openApp': { en: "Open the application", fr: "Ouvrir l'application", ar: "افتح التطبيق", es: "Abrir la aplicación", pt: "Abrir o aplicativo" },
  'product.perMonth': { en: "/mo", fr: "/mois", ar: "/شهرياً", es: "/mes", pt: "/mês" },
  'product.pricingSub': { en: "Choose the plan that fits your business today. Upgrade anytime.", fr: "Choisissez le plan adapté à votre entreprise aujourd'hui. Changez à tout moment.", ar: "اختر الخطة التي تناسب عملك اليوم. يمكنك الترقية في أي وقت.", es: "Elige el plan que se ajusta a tu negocio hoy. Mejora cuando quieras.", pt: "Escolha o plano ideal para o seu negócio hoje. Faça upgrade quando quiser." },
  'product.pricingTitle': { en: "Simple, transparent pricing", fr: "Une tarification simple et transparente", ar: "أسعار بسيطة وشفافة", es: "Precios simples y transparentes", pt: "Preços simples e transparentes" },
  'product.viewDemo': { en: "View live demo", fr: "Voir la démo en direct", ar: "شاهد العرض التوضيحي المباشر", es: "Ver demo en vivo", pt: "Ver demonstração ao vivo" },
  'products.available': { en: "Available now", fr: "Disponible", ar: "متاح الآن", es: "Disponible ahora", pt: "Disponível agora" },
  'products.category.business': { en: "Business & Commerce", fr: "Commerce & Affaires", ar: "الأعمال والتجارة", es: "Negocios y comercio", pt: "Negócios e comércio" },
  'products.category.community': { en: "Community & Wellbeing", fr: "Communauté & Bien-être", ar: "المجتمع والرفاهية", es: "Comunidad y bienestar", pt: "Comunidade e bem-estar" },
  'products.category.education': { en: "Education & Learning", fr: "Éducation & Apprentissage", ar: "التعليم والتعلّم", es: "Educación y aprendizaje", pt: "Educação e aprendizagem" },
  'products.category.industry': { en: "Industry & Operations", fr: "Industrie & Opérations", ar: "الصناعة والعمليات", es: "Industria y operaciones", pt: "Indústria e operações" },
  'products.comingSoon': { en: "Coming soon", fr: "Bientôt disponible", ar: "قريباً", es: "Próximamente", pt: "Em breve" },
  'products.explore': { en: "Explore", fr: "Explorer", ar: "استكشف", es: "Explorar", pt: "Explorar" },
  'products.filterAll': { en: "All Platforms", fr: "Toutes les plateformes", ar: "كل المنصات", es: "Todas las plataformas", pt: "Todas as plataformas" },
  'products.joinWaitlist': { en: "Join Waitlist", fr: "Rejoindre la liste d'attente", ar: "انضم إلى قائمة الانتظار", es: "Unirse a la lista de espera", pt: "Entrar na lista de espera" },
  'products.launch': { en: "Launch App", fr: "Lancer l'app", ar: "شغّل التطبيق", es: "Abrir app", pt: "Abrir app" },
  'products.pricingFrom': { en: "from", fr: "à partir de", ar: "ابتداءً من", es: "desde", pt: "a partir de" },
  'products.sub': { en: "Specialized SaaS for every part of your operations — all connected, all under one ecosystem.", fr: "Des SaaS spécialisés pour chaque partie de vos opérations — tous connectés, tous sous un seul écosystème.", ar: "برمجيات متخصصة لكل جزء من عملياتك — كلها مترابطة، وكلها ضمن نظام واحد متكامل.", es: "SaaS especializados para cada parte de tus operaciones, todos conectados en un solo ecosistema.", pt: "SaaS especializados para cada parte das suas operações — todos conectados, todos em um único ecossistema." },
  'products.tag': { en: "The Ecosystem", fr: "L'écosystème", ar: "النظام المتكامل", es: "El ecosistema", pt: "O ecossistema" },
  'products.title': { en: "Explore every LiAfrik platform", fr: "Explorez chaque plateforme LiAfrik", ar: "استكشف كل منصات LiAfrik", es: "Explora todas las plataformas LiAfrik", pt: "Explore todas as plataformas LiAfrik" },
  'sec.audit.desc': { en: "Full traceability of every action and access across your workspace.", fr: "Traçabilité complète de chaque action et accès dans votre espace.", ar: "تتبّع كامل لكل إجراء وكل عملية دخول في مساحة عملك.", es: "Trazabilidad completa de cada acción y acceso en tu espacio de trabajo.", pt: "Rastreabilidade completa de cada ação e acesso no seu espaço de trabalho." },
  'sec.audit.title': { en: "Audit logs", fr: "Journaux d'audit", ar: "سجلات التدقيق", es: "Registros de auditoría", pt: "Registros de auditoria" },
  'sec.backup.desc': { en: "Continuous backups and disaster recovery so you never lose a thing.", fr: "Sauvegardes continues et reprise après sinistre, pour ne rien perdre.", ar: "نسخ احتياطي مستمر وخطة تعافٍ من الكوارث حتى لا تفقد أي شيء.", es: "Copias de seguridad continuas y recuperación ante desastres para que nunca pierdas nada.", pt: "Backups contínuos e recuperação de desastres para que você nunca perca nada." },
  'sec.backup.title': { en: "Automatic backups", fr: "Sauvegardes automatiques", ar: "نسخ احتياطي تلقائي", es: "Copias de seguridad automáticas", pt: "Backups automáticos" },
  'sec.compliance.desc': { en: "Designed with strong data protection and privacy practices in mind.", fr: "Conçu avec de solides pratiques de protection des données et de confidentialité.", ar: "مصمم وفق ممارسات صارمة لحماية البيانات والخصوصية.", es: "Diseñado con sólidas prácticas de protección de datos y privacidad.", pt: "Projetado com fortes práticas de proteção de dados e privacidade." },
  'sec.compliance.title': { en: "Data compliance", fr: "Conformité des données", ar: "الامتثال في البيانات", es: "Cumplimiento de datos", pt: "Conformidade de dados" },
  'sec.encryption.desc': { en: "Data is encrypted in transit and at rest using industry-leading protocols.", fr: "Données chiffrées en transit et au repos via les protocoles les plus avancés.", ar: "يتم تشفير البيانات أثناء النقل وأثناء التخزين باستخدام أحدث البروتوكولات.", es: "Los datos se cifran en tránsito y en reposo con protocolos líderes del sector.", pt: "Os dados são criptografados em trânsito e em repouso, usando protocolos líderes do setor." },
  'sec.encryption.title': { en: "Encrypted end to end", fr: "Chiffré de bout en bout", ar: "مشفّر من طرف إلى طرف", es: "Cifrado de extremo a extremo", pt: "Criptografado de ponta a ponta" },
  'sec.hosting.desc': { en: "Redundant infrastructure on world-class cloud providers with failover.", fr: "Infrastructure redondante sur des clouds de classe mondiale avec basculement.", ar: "بنية تحتية احتياطية لدى مزودي خدمات سحابية عالميين مع نظام تبديل تلقائي عند الأعطال.", es: "Infraestructura redundante en proveedores cloud de clase mundial con conmutación por error.", pt: "Infraestrutura redundante em provedores de nuvem de classe mundial com failover." },
  'sec.hosting.title': { en: "Secure cloud hosting", fr: "Hébergement cloud sécurisé", ar: "استضافة سحابية آمنة", es: "Alojamiento en la nube seguro", pt: "Hospedagem em nuvem segura" },
  'sec.privacy.desc': { en: "Special care for sensitive data — health, HR, finance, savings. Always private.", fr: "Soin particulier pour les données sensibles — santé, RH, finance, épargne. Toujours privé.", ar: "عناية خاصة بالبيانات الحساسة — الصحة، الموارد البشرية، التمويل، المدخرات. خاصة دائماً.", es: "Especial cuidado con los datos sensibles: salud, RR. HH., finanzas, ahorros. Siempre privados.", pt: "Cuidado especial com dados sensíveis — saúde, RH, finanças, poupança. Sempre privado." },
  'sec.privacy.title': { en: "Privacy by design", fr: "Confidentialité par conception", ar: "الخصوصية بالتصميم", es: "Privacidad desde el diseño", pt: "Privacidade desde a conceção" },
  'sec.roles.desc': { en: "Granular control over who can see, edit and approve what.", fr: "Contrôle précis de qui peut voir, modifier et approuver quoi.", ar: "تحكّم دقيق في من يمكنه العرض والتعديل والموافقة على ماذا.", es: "Control granular sobre quién puede ver, editar y aprobar qué.", pt: "Controle granular sobre quem pode ver, editar e aprovar o quê." },
  'sec.roles.title': { en: "Role permissions", fr: "Permissions par rôle", ar: "صلاحيات الأدوار", es: "Permisos por rol", pt: "Permissões por função" },
  'sec.sub': { en: "Built to bank-grade standards — because your business deserves nothing less.", fr: "Conçu selon des standards niveau bancaire — parce que votre entreprise mérite l'excellence.", ar: "مبني وفق معايير مصرفية صارمة — لأن عملك يستحق الأفضل.", es: "Creado con estándares de nivel bancario, porque tu negocio se merece lo mejor.", pt: "Criado com padrões de nível bancário — porque o seu negócio merece o melhor." },
  'sec.tag': { en: "Security & Trust", fr: "Sécurité & Confiance", ar: "الأمان والثقة", es: "Seguridad y confianza", pt: "Segurança e confiança" },
  'sec.title': { en: "Your data is safe with LiAfrik", fr: "Vos données sont en sécurité avec LiAfrik", ar: "بياناتك آمنة مع LiAfrik", es: "Tus datos están seguros con LiAfrik", pt: "Seus dados estão seguros com a LiAfrik" },
  'secPage.audit.desc': { en: "Full traceability of every action and access across your workspace, so you always know who did what.", fr: "Traçabilité complète de chaque action et accès dans votre espace, pour toujours savoir qui a fait quoi.", ar: "تتبّع كامل لكل إجراء وعملية دخول في مساحة عملك، لتعرف دائماً من فعل ماذا.", es: "Trazabilidad completa de cada acción y acceso en tu espacio de trabajo, para que siempre sepas quién hizo qué.", pt: "Rastreabilidade completa de cada ação e acesso no seu espaço de trabalho, para que você sempre saiba quem fez o quê." },
  'secPage.audit.title': { en: "Audit logs & traceability", fr: "Journaux d'audit & traçabilité", ar: "سجلات التدقيق وإمكانية التتبع", es: "Registros de auditoría y trazabilidad", pt: "Registros de auditoria e rastreabilidade" },
  'secPage.backup.desc': { en: "Continuous backups and a tested disaster recovery strategy so your data is never lost.", fr: "Sauvegardes continues et stratégie de reprise après sinistre testée, pour ne jamais perdre vos données.", ar: "نسخ احتياطي مستمر واستراتيجية تعافٍ من الكوارث مُختبَرة، حتى لا تفقد بياناتك أبداً.", es: "Copias de seguridad continuas y una estrategia de recuperación ante desastres probada para que nunca pierdas tus datos.", pt: "Backups contínuos e uma estratégia testada de recuperação de desastres para que seus dados nunca se percam." },
  'secPage.backup.title': { en: "Automated backups & disaster recovery", fr: "Sauvegardes automatiques & reprise après sinistre", ar: "نسخ احتياطي تلقائي وتعافٍ من الكوارث", es: "Copias de seguridad automáticas y recuperación ante desastres", pt: "Backups automáticos e recuperação de desastres" },
  'secPage.contactSecurity': { en: "Contact our security team", fr: "Contacter notre équipe sécurité", ar: "تواصل مع فريق الأمان لدينا", es: "Contactar a nuestro equipo de seguridad", pt: "Fale com nossa equipe de segurança" },
  'secPage.encryption.desc': { en: "All data is encrypted using industry-leading protocols, both while being transmitted and when stored.", fr: "Toutes les données sont chiffrées via des protocoles de pointe, en transit comme au repos.", ar: "يتم تشفير جميع البيانات باستخدام أحدث البروتوكولات، سواء أثناء النقل أو أثناء التخزين.", es: "Todos los datos se cifran con protocolos líderes del sector, tanto al transmitirse como al almacenarse.", pt: "Todos os dados são criptografados usando protocolos líderes do setor, tanto durante a transmissão quanto no armazenamento." },
  'secPage.encryption.title': { en: "Encryption in transit & at rest", fr: "Chiffrement en transit & au repos", ar: "تشفير أثناء النقل وأثناء التخزين", es: "Cifrado en tránsito y en reposo", pt: "Criptografia em trânsito e em repouso" },
  'secPage.hosting.desc': { en: "Redundant infrastructure on world-class cloud providers with automatic failover and high availability.", fr: "Infrastructure redondante sur des clouds de classe mondiale avec basculement automatique et haute disponibilité.", ar: "بنية تحتية احتياطية لدى مزودي خدمات سحابية عالميين، مع تبديل تلقائي عند الأعطال وتوافر عالٍ.", es: "Infraestructura redundante en proveedores cloud de clase mundial con conmutación automática por error y alta disponibilidad.", pt: "Infraestrutura redundante em provedores de nuvem de classe mundial, com failover automático e alta disponibilidade." },
  'secPage.hosting.title': { en: "Secure cloud infrastructure", fr: "Infrastructure cloud sécurisée", ar: "بنية تحتية سحابية آمنة", es: "Infraestructura en la nube segura", pt: "Infraestrutura em nuvem segura" },
  'secPage.infra.desc': { en: "Our infrastructure is designed to handle millions of transactions, patient records, student profiles and financial operations — securely and reliably.", fr: "Notre infrastructure est conçue pour gérer des millions de transactions, dossiers de patients, profils d'élèves et opérations financières — de façon sécurisée et fiable.", ar: "بنيتنا التحتية مصممة للتعامل مع ملايين المعاملات وسجلات المرضى وملفات الطلاب والعمليات المالية — بأمان وموثوقية.", es: "Nuestra infraestructura está diseñada para manejar millones de transacciones, historiales de pacientes, perfiles de estudiantes y operaciones financieras, de forma segura y fiable.", pt: "Nossa infraestrutura é projetada para lidar com milhões de transações, prontuários de pacientes, perfis de alunos e operações financeiras — com segurança e confiabilidade." },
  'secPage.infra.title': { en: "Built for scale and reliability", fr: "Conçu pour la performance et la fiabilité", ar: "مصمم للتوسع والموثوقية", es: "Diseñado para la escala y la fiabilidad", pt: "Projetado para escala e confiabilidade" },
  'secPage.privacy.desc': { en: "Special care for sensitive data — health, HR, finance, savings. Always private, always protected.", fr: "Soin particulier pour les données sensibles — santé, RH, finance, épargne. Toujours privé, toujours protégé.", ar: "عناية خاصة بالبيانات الحساسة — الصحة، الموارد البشرية، التمويل، المدخرات. خاصة ومحمية دائماً.", es: "Especial cuidado con los datos sensibles: salud, RR. HH., finanzas, ahorros. Siempre privados, siempre protegidos.", pt: "Cuidado especial com dados sensíveis — saúde, RH, finanças, poupança. Sempre privado, sempre protegido." },
  'secPage.privacy.title': { en: "Privacy by design", fr: "Confidentialité par conception", ar: "الخصوصية بالتصميم", es: "Privacidad desde el diseño", pt: "Privacidade desde a conceção" },
  'secPage.roles.desc': { en: "Granular control over who can see, edit and approve what — across every platform in the ecosystem.", fr: "Contrôle précis de qui peut voir, modifier et approuver quoi — sur chaque plateforme de l'écosystème.", ar: "تحكّم دقيق في من يمكنه العرض والتعديل والموافقة على ماذا — عبر كل منصة في النظام المتكامل.", es: "Control granular sobre quién puede ver, editar y aprobar qué, en cada plataforma del ecosistema.", pt: "Controle granular sobre quem pode ver, editar e aprovar o quê — em todas as plataformas do ecossistema." },
  'secPage.roles.title': { en: "Role-based permissions", fr: "Permissions par rôle", ar: "صلاحيات قائمة على الأدوار", es: "Permisos basados en roles", pt: "Permissões baseadas em função" },
  'secPage.sub': { en: "Every LiAfrik platform is designed with strong data protection and privacy practices — from encryption to infrastructure to access control.", fr: "Chaque plateforme LiAfrik est conçue avec de solides pratiques de protection des données et de confidentialité — du chiffrement à l'infrastructure au contrôle d'accès.", ar: "كل منصة من منصات LiAfrik مصممة وفق ممارسات صارمة لحماية البيانات والخصوصية — من التشفير إلى البنية التحتية إلى التحكم في الوصول.", es: "Cada plataforma LiAfrik está diseñada con sólidas prácticas de protección de datos y privacidad, desde el cifrado hasta la infraestructura y el control de acceso.", pt: "Cada plataforma LiAfrik é projetada com fortes práticas de proteção de dados e privacidade — da criptografia à infraestrutura e ao controle de acesso." },
  'secPage.tag': { en: "Security & Trust", fr: "Sécurité & Confiance", ar: "الأمان والثقة", es: "Seguridad y confianza", pt: "Segurança e confiança" },
  'secPage.tenant.desc': { en: "Every account runs in its own strictly isolated workspace across all LiAfrik apps — one shared platform, zero data leakage between tenants.", fr: "Chaque compte s'exécute dans son propre espace strictement isolé, sur toutes les applications LiAfrik — une seule plateforme partagée, aucune fuite de données entre comptes.", ar: "يعمل كل حساب ضمن مساحة عمل معزولة تماماً عبر جميع تطبيقات LiAfrik — منصة واحدة مشتركة، بدون أي تسرب للبيانات بين الحسابات.", es: "Cada cuenta funciona en su propio espacio de trabajo estrictamente aislado en todas las aplicaciones LiAfrik: una sola plataforma compartida, sin fugas de datos entre cuentas.", pt: "Cada conta funciona em seu próprio espaço de trabalho estritamente isolado em todos os aplicativos LiAfrik — uma plataforma compartilhada, sem vazamento de dados entre contas." },
  'secPage.tenant.title': { en: "Strict multi-tenant isolation", fr: "Isolation stricte multi-tenant", ar: "عزل صارم متعدد المستأجرين", es: "Aislamiento estricto multi-tenant", pt: "Isolamento rigoroso multi-tenant" },
  'secPage.title': { en: "Security at the core of everything we build", fr: "La sécurité au cœur de tout ce que nous construisons", ar: "الأمان في صميم كل ما نبنيه", es: "La seguridad en el centro de todo lo que construimos", pt: "A segurança no centro de tudo o que construímos" },
  'stack.added': { en: "Connected", fr: "Connecté", ar: "متصل", es: "Conectado", pt: "Conectado" },
  'stack.choose': { en: "Choose your industry", fr: "Choisissez votre secteur", ar: "اختر قطاعك", es: "Elige tu sector", pt: "Escolha o seu setor" },
  'stack.demo': { en: "Book a Demo", fr: "Réserver une démo", ar: "احجز عرضاً توضيحياً", es: "Reservar una demo", pt: "Agendar uma demonstração" },
  'stack.empty': { en: "Select an industry above to see your recommended modules.", fr: "Sélectionnez un secteur pour voir vos modules recommandés.", ar: "اختر قطاعاً أعلاه لرؤية الوحدات الموصى بها لك.", es: "Selecciona un sector arriba para ver tus módulos recomendados.", pt: "Selecione um setor acima para ver os módulos recomendados." },
  'stack.modules': { en: "modules", fr: "modules", ar: "وحدات", es: "módulos", pt: "módulos" },
  'stack.start': { en: "Start Free", fr: "Commencer gratuitement", ar: "ابدأ مجاناً", es: "Empezar gratis", pt: "Começar grátis" },
  'stack.sub': { en: "Pick your industry and watch your platform come together in real time.", fr: "Choisissez votre secteur et regardez votre plateforme s'assembler en temps réel.", ar: "اختر قطاعك وشاهد منصتك تتشكل في الوقت الفعلي.", es: "Elige tu sector y observa cómo tu plataforma se arma en tiempo real.", pt: "Escolha o seu setor e veja a sua plataforma se montar em tempo real." },
  'stack.summary': { en: "Here is your LiAfrik ecosystem", fr: "Voici votre écosystème LiAfrik", ar: "هذا هو نظام LiAfrik المتكامل الخاص بك", es: "Este es tu ecosistema LiAfrik", pt: "Aqui está o seu ecossistema LiAfrik" },
  'stack.tag': { en: "Build Your Stack", fr: "Construisez votre stack", ar: "ابنِ مجموعتك", es: "Arma tu stack", pt: "Monte seu stack" },
  'stack.title': { en: "Assemble your LiAfrik ecosystem", fr: "Assemblez votre écosystème LiAfrik", ar: "اجمع نظام LiAfrik المتكامل الخاص بك", es: "Arma tu ecosistema LiAfrik", pt: "Monte o seu ecossistema LiAfrik" },
  'stack.yourStack': { en: "Your LiAfrik ecosystem", fr: "Votre écosystème LiAfrik", ar: "نظام LiAfrik المتكامل الخاص بك", es: "Tu ecosistema LiAfrik", pt: "O seu ecossistema LiAfrik" },
  'stats.sub': { en: "A platform engineered for scale and reliability.", fr: "Une plateforme conçue pour la performance et la fiabilité.", ar: "منصة مصممة للتوسع والموثوقية.", es: "Una plataforma diseñada para la escala y la fiabilidad.", pt: "Uma plataforma projetada para escala e confiabilidade." },
  'stats.title': { en: "Numbers that speak for themselves", fr: "Des chiffres qui parlent d'eux-mêmes", ar: "أرقام تتحدث عن نفسها", es: "Cifras que hablan por sí solas", pt: "Números que falam por si" },
  'support.form.sub': { en: "Tell us what you need and we will get back to you quickly.", fr: "Dites-nous ce dont vous avez besoin et nous reviendrons vers vous rapidement.", ar: "أخبرنا بما تحتاجه وسنعاود التواصل معك بسرعة.", es: "Cuéntanos qué necesitas y te responderemos rápidamente.", pt: "Diga-nos do que você precisa e retornaremos rapidamente." },
  'support.form.title': { en: "Send us a message", fr: "Envoyez-nous un message", ar: "أرسل لنا رسالة", es: "Envíanos un mensaje", pt: "Envie-nos uma mensagem" },
  'support.sub': { en: "Get help with any LiAfrik platform — our team replies within one business day.", fr: "Obtenez de l'aide sur toute plateforme LiAfrik — notre équipe répond sous un jour ouvré.", ar: "احصل على المساعدة بخصوص أي منصة من منصات LiAfrik — يرد فريقنا خلال يوم عمل واحد.", es: "Obtén ayuda con cualquier plataforma LiAfrik: nuestro equipo responde en un día hábil.", pt: "Obtenha ajuda com qualquer plataforma LiAfrik — nossa equipe responde em até um dia útil." },
  'support.tag': { en: "Support", fr: "Support", ar: "الدعم", es: "Soporte", pt: "Suporte" },
  'support.title': { en: "We are here to help", fr: "Nous sommes là pour vous aider", ar: "نحن هنا لمساعدتك", es: "Estamos aquí para ayudarte", pt: "Estamos aqui para ajudar" },
  'testi.example': { en: "Example of typical feedback", fr: "Exemple de retour type", ar: "مثال على تعليق نموذجي", es: "Ejemplo de opinión típica", pt: "Exemplo de feedback típico" },
  'testi.placeholder': { en: "Real testimonials from our first customers coming soon", fr: "Vrais témoignages de nos premiers clients bientôt disponibles", ar: "شهادات حقيقية من عملائنا الأوائل قريباً", es: "Testimonios reales de nuestros primeros clientes, próximamente", pt: "Depoimentos reais de nossos primeiros clientes em breve" },
  'testi.placeholderSub': { en: "We are onboarding our first businesses worldwide. Their stories will appear here.", fr: "Nous accueillons nos premières entreprises dans le monde. Leurs histoires apparaîtront ici.", ar: "نحن نستقبل أولى الشركات حول العالم. ستظهر قصصهم هنا.", es: "Estamos incorporando a nuestras primeras empresas en todo el mundo. Sus historias aparecerán aquí.", pt: "Estamos integrando nossas primeiras empresas em todo o mundo. As histórias delas aparecerão aqui." },
  'testi.real': { en: "Verified customer", fr: "Client vérifié", ar: "عميل موثّق", es: "Cliente verificado", pt: "Cliente verificado" },
  'testi.sub': { en: "Real stories from operators running on LiAfrik.", fr: "De vraies histoires d'opérateurs qui utilisent LiAfrik.", ar: "قصص حقيقية من مشغّلين يعملون على LiAfrik.", es: "Historias reales de operadores que usan LiAfrik.", pt: "Histórias reais de operadores que usam a LiAfrik." },
  'testi.tag': { en: "Testimonials", fr: "Témoignages", ar: "آراء العملاء", es: "Testimonios", pt: "Depoimentos" },
  'testi.title': { en: "Loved by ambitious businesses worldwide", fr: "Adopté par les entreprises ambitieuses du monde entier", ar: "يحظى بثقة الشركات الطموحة حول العالم", es: "Querido por empresas ambiciosas de todo el mundo", pt: "Amado por empresas ambiciosas em todo o mundo" },
  'why.connected': { en: "Everything connected.", fr: "Tout est connecté.", ar: "كل شيء مترابط.", es: "Todo conectado.", pt: "Tudo conectado." },
  'why.dashboards': { en: "10 dashboards", fr: "10 tableaux de bord", ar: "10 لوحات تحكم", es: "10 paneles", pt: "10 painéis" },
  'why.databases': { en: "10 databases", fr: "10 bases de données", ar: "10 قواعد بيانات", es: "10 bases de datos", pt: "10 bancos de dados" },
  'why.insteadOf': { en: "Instead of", fr: "Au lieu de", ar: "بدلاً من", es: "En lugar de", pt: "Em vez de" },
  'why.invoices': { en: "10 invoices", fr: "10 factures", ar: "10 فواتير", es: "10 facturas", pt: "10 faturas" },
  'why.logins': { en: "10 logins", fr: "10 identifiants", ar: "10 حسابات دخول", es: "10 credenciales de acceso", pt: "10 logins" },
  'why.oneDashboard': { en: "One Dashboard", fr: "Un seul tableau de bord", ar: "لوحة تحكم واحدة", es: "Un panel", pt: "Um painel" },
  'why.oneDatabase': { en: "One Database", fr: "Une seule base de données", ar: "قاعدة بيانات واحدة", es: "Una base de datos", pt: "Um banco de dados" },
  'why.oneLogin': { en: "One Login", fr: "Un seul identifiant", ar: "حساب دخول واحد", es: "Una credencial de acceso", pt: "Um login" },
  'why.onePlatform': { en: "One Platform", fr: "Une seule plateforme", ar: "منصة واحدة", es: "Una plataforma", pt: "Uma plataforma" },
  'why.oneSubscription': { en: "One Subscription", fr: "Un seul abonnement", ar: "اشتراك واحد", es: "Una suscripción", pt: "Uma assinatura" },
  'why.softwares': { en: "10 software tools", fr: "10 logiciels", ar: "10 برامج", es: "10 herramientas de software", pt: "10 ferramentas de software" },
  'why.tag': { en: "Why LiAfrik", fr: "Pourquoi LiAfrik", ar: "لماذا LiAfrik", es: "Por qué LiAfrik", pt: "Por que LiAfrik" },
  'why.title': { en: "Stop juggling 10 tools. Run one platform.", fr: "Arrêtez de jongler avec 10 outils. Utilisez une seule plateforme.", ar: "توقف عن التنقل بين 10 أدوات. استخدم منصة واحدة.", es: "Deja de usar 10 herramientas a la vez. Usa una sola plataforma.", pt: "Pare de lidar com 10 ferramentas. Use uma única plataforma." },
  'why.use': { en: "You get", fr: "Vous obtenez", ar: "تحصل على", es: "Obtienes", pt: "Você obtém" },
  'world.sub': { en: "African-born architecture, cloud-native delivery, and infrastructure ready to scale across continents.", fr: "Architecture née en Afrique, livraison cloud-native et infrastructure prête à passer à l'échelle intercontinentale.", ar: "بنية وُلدت في أفريقيا، وتوصيل سحابي أصيل، وبنية تحتية جاهزة للتوسع عبر القارات.", es: "Arquitectura nacida en África, entrega nativa en la nube e infraestructura lista para escalar entre continentes.", pt: "Arquitetura nascida em África, entrega nativa em nuvem e infraestrutura pronta para escalar entre continentes." },
  'world.tag': { en: "Global Scale", fr: "Portée mondiale", ar: "انتشار عالمي", es: "Escala global", pt: "Escala global" },
  'world.title': { en: "African roots. Global scale.", fr: "Racines africaines. Portée mondiale.", ar: "جذور أفريقية. انتشار عالمي.", es: "Raíces africanas. Escala global.", pt: "Raízes africanas. Escala global." },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'liafrik-lang';

/**
 * The language now lives in the URL (/en/... or /fr/...), which is what
 * lets Google index each language as its own page (proper international
 * SEO) instead of one URL whose content silently changes client-side.
 *
 * `lang` is passed in by the router layout (derived from the :lang path
 * segment). `setLang` navigates to the equivalent path under the new
 * language rather than just flipping local state — everything else
 * (useLang()'s shape, all `t()` call sites) is unchanged.
 */
export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    if (l === lang) return;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
    const rest = location.pathname.replace(/^\/(en|fr|ar|es|pt)/, '');
    navigate(`${rest === '' ? `/${l}` : `/${l}${rest}`}${location.search}${location.hash}`);
  };

  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    t: (key: string) => translations[key]?.[lang] ?? key,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [lang, location.pathname]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Pick the right value for the current language out of a fully-localized record. */
export function pick<T>(lang: Lang, values: Record<Lang, T>): T {
  return values[lang];
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
