import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang, pick, type Lang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

interface Section {
  title: Record<Lang, string>;
  body: Record<Lang, string>;
}

const sections: Section[] = [
  {
    title: { en: '1. Data We Collect', fr: '1. Données que nous collectons', ar: '1. البيانات التي نجمعها', es: '1. Datos que recopilamos', pt: '1. Dados que coletamos' },
    body: {
      en: 'LiAfrik collects data that you provide directly when creating an account, using our SaaS platforms, or contacting our support team. This includes your name, email address, company information, billing details, and any content you create within our platforms (such as customer records, invoices, employee profiles, health records, and financial data).',
      fr: "LiAfrik collecte les données que vous fournissez directement lors de la création d'un compte, de l'utilisation de nos plateformes SaaS, ou en contactant notre équipe support. Cela inclut votre nom, adresse e-mail, informations d'entreprise, coordonnées de facturation, et tout contenu créé dans nos plateformes (dossiers clients, factures, profils d'employés, dossiers médicaux et données financières).",
      ar: 'يجمع LiAfrik البيانات التي تقدّمها مباشرة عند إنشاء حساب، أو استخدام منصاتنا البرمجية، أو التواصل مع فريق الدعم لدينا. يشمل ذلك اسمك، وبريدك الإلكتروني، ومعلومات شركتك، وتفاصيل الفوترة، وأي محتوى تنشئه ضمن منصاتنا (مثل سجلات العملاء، والفواتير، وملفات الموظفين، والسجلات الصحية، والبيانات المالية).',
      es: 'LiAfrik recopila los datos que proporcionas directamente al crear una cuenta, usar nuestras plataformas SaaS o contactar a nuestro equipo de soporte. Esto incluye tu nombre, correo electrónico, información de la empresa, datos de facturación y cualquier contenido que crees dentro de nuestras plataformas (como registros de clientes, facturas, perfiles de empleados, historiales de salud y datos financieros).',
      pt: 'A LiAfrik coleta os dados que você fornece diretamente ao criar uma conta, usar nossas plataformas SaaS ou entrar em contato com nossa equipe de suporte. Isso inclui seu nome, e-mail, informações da empresa, dados de faturamento e qualquer conteúdo que você criar em nossas plataformas (como registros de clientes, faturas, perfis de funcionários, prontuários de saúde e dados financeiros).',
    },
  },
  {
    title: { en: '2. How We Use Your Data', fr: '2. Utilisation de vos données', ar: '2. كيف نستخدم بياناتك', es: '2. Cómo usamos tus datos', pt: '2. Como usamos seus dados' },
    body: {
      en: 'We use your data to provide and improve the LiAfrik SaaS ecosystem — operating platforms for commerce, healthcare, education, HR, finance, real estate, restaurants, and community management. We also use data for authentication, security, analytics, billing, and customer support.',
      fr: "Nous utilisons vos données pour fournir et améliorer l'écosystème SaaS LiAfrik — exploiter des plateformes pour le commerce, la santé, l'éducation, les RH, la finance, l'immobilier, la restauration et la gestion communautaire. Nous utilisons également les données pour l'authentification, la sécurité, l'analyse, la facturation et le support client.",
      ar: 'نستخدم بياناتك لتقديم نظام LiAfrik المتكامل وتحسينه — من خلال تشغيل منصات للتجارة والصحة والتعليم والموارد البشرية والتمويل والعقارات والمطاعم وإدارة المجتمع. كما نستخدم البيانات لأغراض المصادقة والأمان والتحليلات والفوترة ودعم العملاء.',
      es: 'Utilizamos tus datos para ofrecer y mejorar el ecosistema SaaS LiAfrik, operando plataformas de comercio, salud, educación, RR. HH., finanzas, bienes raíces, restaurantes y gestión comunitaria. También usamos los datos para autenticación, seguridad, análisis, facturación y atención al cliente.',
      pt: 'Usamos seus dados para fornecer e melhorar o ecossistema SaaS da LiAfrik — operando plataformas de comércio, saúde, educação, RH, finanças, imóveis, restaurantes e gestão comunitária. Também usamos os dados para autenticação, segurança, análises, faturamento e suporte ao cliente.',
    },
  },
  {
    title: { en: '3. SaaS-Specific Data Processing', fr: '3. Traitement des données par SaaS', ar: '3. معالجة البيانات الخاصة بكل منصة', es: '3. Procesamiento de datos por plataforma', pt: '3. Processamento de dados por plataforma' },
    body: {
      en: "Each LiAfrik platform processes specific categories of data: Sellia and POS process orders and customer data; Atlas and CRM process leads and customer relationship data, with strict multi-tenant isolation between accounts; Health processes patient and medical records; Faka processes employee and HR data; LiBooks processes financial and accounting data; Kolo processes community savings and contribution data; Mafo processes women's health data; Litrek processes trip bookings and travel data for riders and agencies, each agency's data isolated from others. All sensitive data is encrypted and access-controlled.",
      fr: "Chaque plateforme LiAfrik traite des catégories spécifiques de données : Sellia et POS traitent les commandes et données clients ; Atlas et CRM traitent les leads et données de relation client, avec une isolation stricte multi-tenant entre les comptes ; Health traite les dossiers patients et médicaux ; Faka traite les données employés et RH ; LiBooks traite les données financières et comptables ; Kolo traite les données d'épargne communautaire ; Mafo traite les données de santé féminine ; Litrek traite les réservations de trajets et données de voyage des usagers et agences, les données de chaque agence étant isolées des autres. Toutes les données sensibles sont chiffrées et à accès contrôlé.",
      ar: 'تعالج كل منصة من منصات LiAfrik فئات محددة من البيانات: تعالج Sellia وPOS الطلبات وبيانات العملاء؛ وتعالج Atlas وCRM العملاء المحتملين وبيانات علاقات العملاء، مع عزل صارم متعدد المستأجرين بين الحسابات؛ وتعالج Health سجلات المرضى والسجلات الطبية؛ وتعالج Faka بيانات الموظفين والموارد البشرية؛ وتعالج LiBooks البيانات المالية والمحاسبية؛ وتعالج Kolo بيانات الادخار والمساهمات المجتمعية؛ وتعالج Mafo بيانات صحة المرأة؛ وتعالج Litrek حجوزات الرحلات وبيانات السفر للركاب والوكالات، مع عزل بيانات كل وكالة عن غيرها. جميع البيانات الحساسة مشفّرة وخاضعة للتحكم في الوصول.',
      es: 'Cada plataforma LiAfrik procesa categorías específicas de datos: Sellia y POS procesan pedidos y datos de clientes; Atlas y CRM procesan clientes potenciales y datos de relación con clientes, con estricto aislamiento multi-tenant entre cuentas; Health procesa historiales de pacientes y registros médicos; Faka procesa datos de empleados y RR. HH.; LiBooks procesa datos financieros y contables; Kolo procesa datos de ahorro y contribuciones comunitarias; Mafo procesa datos de salud femenina; Litrek procesa reservas de viajes y datos de viaje de pasajeros y agencias, con los datos de cada agencia aislados de los demás. Todos los datos sensibles están cifrados y con acceso controlado.',
      pt: 'Cada plataforma da LiAfrik processa categorias específicas de dados: Sellia e POS processam pedidos e dados de clientes; Atlas e CRM processam leads e dados de relacionamento com o cliente, com isolamento rigoroso multi-tenant entre contas; Health processa prontuários de pacientes e registros médicos; Faka processa dados de funcionários e RH; LiBooks processa dados financeiros e contábeis; Kolo processa dados de poupança e contribuições comunitárias; Mafo processa dados de saúde da mulher; Litrek processa reservas de viagens e dados de viagem de passageiros e agências, com os dados de cada agência isolados dos demais. Todos os dados sensíveis são criptografados e têm acesso controlado.',
    },
  },
  {
    title: { en: '4. Cookies and Tracking', fr: '4. Cookies et suivi', ar: '4. ملفات تعريف الارتباط والتتبع', es: '4. Cookies y seguimiento', pt: '4. Cookies e rastreamento' },
    body: {
      en: 'LiAfrik uses essential cookies for authentication and session management, and analytical cookies to understand how our platforms are used. You can control cookie preferences in your account settings. We do not sell your data to third parties.',
      fr: "LiAfrik utilise des cookies essentiels pour l'authentification et la gestion de session, et des cookies analytiques pour comprendre l'utilisation de nos plateformes. Vous pouvez contrôler les préférences de cookies dans vos paramètres de compte. Nous ne vendons pas vos données à des tiers.",
      ar: 'يستخدم LiAfrik ملفات تعريف ارتباط أساسية للمصادقة وإدارة الجلسات، وملفات تحليلية لفهم كيفية استخدام منصاتنا. يمكنك التحكم في تفضيلات ملفات تعريف الارتباط من إعدادات حسابك. نحن لا نبيع بياناتك لأطراف ثالثة.',
      es: 'LiAfrik utiliza cookies esenciales para la autenticación y la gestión de sesiones, y cookies analíticas para entender cómo se usan nuestras plataformas. Puedes controlar las preferencias de cookies en la configuración de tu cuenta. No vendemos tus datos a terceros.',
      pt: 'A LiAfrik usa cookies essenciais para autenticação e gerenciamento de sessão, e cookies analíticos para entender como nossas plataformas são usadas. Você pode controlar as preferências de cookies nas configurações da sua conta. Não vendemos seus dados a terceiros.',
    },
  },
  {
    title: { en: '5. Data Sharing', fr: '5. Partage des données', ar: '5. مشاركة البيانات', es: '5. Compartición de datos', pt: '5. Compartilhamento de dados' },
    body: {
      en: 'We do not sell or rent your personal data. We may share data with trusted cloud infrastructure providers and payment processors who operate under strict data protection agreements. We only share the minimum data necessary to provide our services.',
      fr: "Nous ne vendons ni ne louons vos données personnelles. Nous pouvons partager des données avec des fournisseurs d'infrastructure cloud et de traitement de paiement de confiance, opérant sous des accords stricts de protection des données. Nous ne partageons que le minimum nécessaire pour fournir nos services.",
      ar: 'نحن لا نبيع أو نؤجر بياناتك الشخصية. قد نشارك البيانات مع مزودي بنية تحتية سحابية وموردي خدمات دفع موثوقين يعملون بموجب اتفاقيات صارمة لحماية البيانات. نشارك فقط الحد الأدنى من البيانات اللازمة لتقديم خدماتنا.',
      es: 'No vendemos ni alquilamos tus datos personales. Podemos compartir datos con proveedores de infraestructura en la nube y procesadores de pagos de confianza que operan bajo estrictos acuerdos de protección de datos. Solo compartimos los datos mínimos necesarios para prestar nuestros servicios.',
      pt: 'Não vendemos nem alugamos seus dados pessoais. Podemos compartilhar dados com provedores de infraestrutura em nuvem e processadores de pagamento confiáveis que operam sob rigorosos acordos de proteção de dados. Compartilhamos apenas o mínimo de dados necessário para prestar nossos serviços.',
    },
  },
  {
    title: { en: '6. Data Security', fr: '6. Sécurité des données', ar: '6. أمان البيانات', es: '6. Seguridad de los datos', pt: '6. Segurança dos dados' },
    body: {
      en: 'All data is encrypted in transit and at rest using industry-leading protocols. Access is controlled through role-based permissions. Our cloud infrastructure includes automated backups, disaster recovery, and 24/7 monitoring. Learn more on our Security page.',
      fr: "Toutes les données sont chiffrées en transit et au repos via des protocoles de pointe. L'accès est contrôlé par permissions basées sur les rôles. Notre infrastructure cloud inclut des sauvegardes automatiques, une reprise après sinistre et une surveillance 24/7. En savoir plus sur notre page Sécurité.",
      ar: 'تُشفَّر جميع البيانات أثناء النقل وأثناء التخزين باستخدام أحدث البروتوكولات. يُتحكَّم بالوصول عبر صلاحيات قائمة على الأدوار. تشمل بنيتنا التحتية السحابية نسخاً احتياطية تلقائية وتعافياً من الكوارث ومراقبة على مدار الساعة. تعرّف على المزيد في صفحة الأمان لدينا.',
      es: 'Todos los datos se cifran en tránsito y en reposo mediante protocolos líderes del sector. El acceso se controla mediante permisos basados en roles. Nuestra infraestructura en la nube incluye copias de seguridad automáticas, recuperación ante desastres y monitoreo 24/7. Obtén más información en nuestra página de Seguridad.',
      pt: 'Todos os dados são criptografados em trânsito e em repouso, usando protocolos líderes do setor. O acesso é controlado por meio de permissões baseadas em função. Nossa infraestrutura em nuvem inclui backups automáticos, recuperação de desastres e monitoramento 24/7. Saiba mais em nossa página de Segurança.',
    },
  },
  {
    title: { en: '7. Your Rights', fr: '7. Vos droits', ar: '7. حقوقك', es: '7. Tus derechos', pt: '7. Seus direitos' },
    body: {
      en: 'You have the right to access, correct, export, or delete your personal data. You can manage most of these actions directly within your LiAfrik account settings. For additional requests, contact us at cs@liafrik.com.',
      fr: 'Vous avez le droit d\'accéder, corriger, exporter ou supprimer vos données personnelles. Vous pouvez gérer la plupart de ces actions directement dans vos paramètres de compte LiAfrik. Pour des demandes supplémentaires, contactez-nous à cs@liafrik.com.',
      ar: 'يحق لك الوصول إلى بياناتك الشخصية أو تصحيحها أو تصديرها أو حذفها. يمكنك إدارة معظم هذه الإجراءات مباشرة من إعدادات حساب LiAfrik الخاص بك. للطلبات الإضافية، تواصل معنا عبر cs@liafrik.com.',
      es: 'Tienes derecho a acceder, corregir, exportar o eliminar tus datos personales. Puedes gestionar la mayoría de estas acciones directamente desde la configuración de tu cuenta LiAfrik. Para solicitudes adicionales, contáctanos en cs@liafrik.com.',
      pt: 'Você tem o direito de acessar, corrigir, exportar ou excluir seus dados pessoais. Você pode gerenciar a maioria dessas ações diretamente nas configurações da sua conta LiAfrik. Para solicitações adicionais, entre em contato conosco em cs@liafrik.com.',
    },
  },
  {
    title: { en: '8. Data Retention', fr: '8. Conservation des données', ar: '8. الاحتفاظ بالبيانات', es: '8. Retención de datos', pt: '8. Retenção de dados' },
    body: {
      en: 'We retain your data for as long as your account is active or as needed to provide our services. After account closure, we may retain certain data for legal, accounting, or security purposes for a limited period.',
      fr: "Nous conservons vos données tant que votre compte est actif ou selon les besoins pour fournir nos services. Après la fermeture du compte, nous pouvons conserver certaines données à des fins légales, comptables ou de sécurité pour une durée limitée.",
      ar: 'نحتفظ ببياناتك طالما كان حسابك نشطاً أو حسب الحاجة لتقديم خدماتنا. بعد إغلاق الحساب، قد نحتفظ ببعض البيانات لأغراض قانونية أو محاسبية أو أمنية لفترة محدودة.',
      es: 'Conservamos tus datos mientras tu cuenta esté activa o según sea necesario para prestar nuestros servicios. Tras el cierre de la cuenta, podemos conservar ciertos datos con fines legales, contables o de seguridad durante un período limitado.',
      pt: 'Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para prestar nossos serviços. Após o encerramento da conta, podemos reter determinados dados para fins legais, contábeis ou de segurança por um período limitado.',
    },
  },
  {
    title: { en: '9. Changes to This Policy', fr: '9. Modifications de cette politique', ar: '9. تعديلات على هذه السياسة', es: '9. Cambios en esta política', pt: '9. Alterações a esta política' },
    body: {
      en: 'We may update this Privacy Policy from time to time. We will notify you of significant changes through our platforms or by email. Continued use of LiAfrik after changes constitutes acceptance of the updated policy.',
      fr: "Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous notifierons les changements importants via nos plateformes ou par e-mail. L'utilisation continue de LiAfrik après les modifications vaut acceptation de la politique mise à jour.",
      ar: 'يجوز لنا تحديث سياسة الخصوصية هذه من وقت لآخر. سنُعلمك بالتغييرات الجوهرية عبر منصاتنا أو عبر البريد الإلكتروني. يُعد استمرارك في استخدام LiAfrik بعد إجراء التعديلات بمثابة موافقة على السياسة المحدَّثة.',
      es: 'Podemos actualizar esta Política de Privacidad de vez en cuando. Te notificaremos los cambios significativos a través de nuestras plataformas o por correo electrónico. El uso continuado de LiAfrik después de los cambios constituye la aceptación de la política actualizada.',
      pt: 'Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas por meio de nossas plataformas ou por e-mail. O uso contínuo da LiAfrik após as alterações constitui aceitação da política atualizada.',
    },
  },
  {
    title: { en: '10. Contact', fr: '10. Contact', ar: '10. الاتصال', es: '10. Contacto', pt: '10. Contato' },
    body: {
      en: 'For any questions about this Privacy Policy or your personal data, contact us at cs@liafrik.com or support@liafrik.com.',
      fr: "Pour toute question concernant cette Politique de Confidentialité ou vos données personnelles, contactez-nous à cs@liafrik.com ou support@liafrik.com.",
      ar: 'لأي أسئلة حول سياسة الخصوصية هذه أو بياناتك الشخصية، تواصل معنا عبر cs@liafrik.com أو support@liafrik.com.',
      es: 'Si tienes preguntas sobre esta Política de Privacidad o tus datos personales, contáctanos en cs@liafrik.com o support@liafrik.com.',
      pt: 'Para dúvidas sobre esta Política de Privacidade ou seus dados pessoais, entre em contato conosco em cs@liafrik.com ou support@liafrik.com.',
    },
  },
];

export default function PrivacyPolicy() {
  const { lang } = useLang();
  useSEO({
    title: pick(lang, {
      en: 'Privacy Policy | LiAfrik', fr: 'Politique de confidentialité | LiAfrik',
      ar: 'سياسة الخصوصية | LiAfrik', es: 'Política de privacidad | LiAfrik', pt: 'Política de privacidade | LiAfrik',
    }),
    description: pick(lang, {
      en: 'How LiAfrik collects, uses, and protects your data across every app in the ecosystem, with strict multi-tenant data isolation.',
      fr: "Comment LiAfrik collecte, utilise et protège vos données à travers chaque application de l'écosystème, avec une isolation stricte des données multi-tenant.",
      ar: 'كيف يجمع LiAfrik بياناتك ويستخدمها ويحميها عبر كل تطبيق في النظام المتكامل، مع عزل صارم متعدد المستأجرين للبيانات.',
      es: 'Cómo LiAfrik recopila, usa y protege tus datos en cada app del ecosistema, con estricto aislamiento de datos multi-tenant.',
      pt: 'Como a LiAfrik coleta, usa e protege seus dados em cada aplicativo do ecossistema, com isolamento rigoroso de dados multi-tenant.',
    }),
  });

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          tag={pick(lang, { en: 'Legal', fr: 'Mentions légales', ar: 'قانوني', es: 'Legal', pt: 'Legal' })}
          title={pick(lang, { en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية', es: 'Política de Privacidad', pt: 'Política de Privacidade' })}
          subtitle={pick(lang, {
            en: 'How LiAfrik collects, uses, and protects your data across our SaaS ecosystem.',
            fr: 'Comment LiAfrik collecte, utilise et protège vos données dans notre écosystème SaaS.',
            ar: 'كيف يجمع LiAfrik بياناتك ويستخدمها ويحميها عبر نظامنا المتكامل.',
            es: 'Cómo LiAfrik recopila, usa y protege tus datos en nuestro ecosistema SaaS.',
            pt: 'Como a LiAfrik coleta, usa e protege seus dados em nosso ecossistema SaaS.',
          })}
        />

        <div className="mt-10 space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl bg-white border border-cloud-200 p-6 shadow-card"
            >
              <h3 className="font-display font-bold text-base text-ink">{s.title[lang]}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.body[lang]}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-liafrik-50 border border-liafrik-100 p-6 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-liafrik-600 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-muted">
            {pick(lang, {
              en: 'LiAfrik is committed to protecting your privacy. This policy applies to all platforms in the LiAfrik ecosystem. For security details, visit our Security page.',
              fr: "LiAfrik s'engage à protéger votre confidentialité. Cette politique s'applique à toutes les plateformes de l'écosystème LiAfrik. Pour les détails de sécurité, visitez notre page Sécurité.",
              ar: 'يلتزم LiAfrik بحماية خصوصيتك. تنطبق هذه السياسة على جميع منصات نظام LiAfrik المتكامل. لمزيد من تفاصيل الأمان، تفضل بزيارة صفحة الأمان لدينا.',
              es: 'LiAfrik se compromete a proteger tu privacidad. Esta política se aplica a todas las plataformas del ecosistema LiAfrik. Para más detalles de seguridad, visita nuestra página de Seguridad.',
              pt: 'A LiAfrik está comprometida em proteger sua privacidade. Esta política se aplica a todas as plataformas do ecossistema LiAfrik. Para detalhes de segurança, visite nossa página de Segurança.',
            })}
          </p>
        </div>

        <div className="mt-10 text-center">
          <LinkButton to="/security" variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
            {pick(lang, { en: 'Explore Security', fr: 'Voir la sécurité', ar: 'استكشف الأمان', es: 'Explorar seguridad', pt: 'Explorar segurança' })}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
