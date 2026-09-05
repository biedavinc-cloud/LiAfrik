import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
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
    title: { en: '1. Purpose of the Service', fr: '1. Objet du service', ar: '1. الغرض من الخدمة', es: '1. Propósito del servicio', pt: '1. Finalidade do serviço' },
    body: {
      en: 'LiAfrik provides a global SaaS ecosystem offering multiple specialized platforms for commerce, healthcare, education, HR, finance, real estate, restaurants, and community management. By using any LiAfrik platform, you agree to these Terms of Service.',
      fr: "LiAfrik fournit un écosystème SaaS mondial offrant plusieurs plateformes spécialisées pour le commerce, la santé, l'éducation, les RH, la finance, l'immobilier, la restauration et la gestion communautaire. En utilisant toute plateforme LiAfrik, vous acceptez ces Conditions d'Utilisation.",
      ar: 'يوفر LiAfrik نظاماً برمجياً عالمياً متكاملاً يضم منصات متخصصة متعددة للتجارة والصحة والتعليم والموارد البشرية والتمويل والعقارات والمطاعم وإدارة المجتمع. باستخدامك لأي منصة من منصات LiAfrik، فإنك توافق على شروط الخدمة هذه.',
      es: 'LiAfrik ofrece un ecosistema SaaS global con múltiples plataformas especializadas para comercio, salud, educación, RR. HH., finanzas, bienes raíces, restaurantes y gestión comunitaria. Al usar cualquier plataforma LiAfrik, aceptas estos Términos de Servicio.',
      pt: 'A LiAfrik oferece um ecossistema SaaS global com várias plataformas especializadas para comércio, saúde, educação, RH, finanças, imóveis, restaurantes e gestão comunitária. Ao usar qualquer plataforma da LiAfrik, você concorda com estes Termos de Serviço.',
    },
  },
  {
    title: { en: '2. Eligibility and Accounts', fr: '2. Éligibilité et comptes', ar: '2. الأهلية والحسابات', es: '2. Elegibilidad y cuentas', pt: '2. Elegibilidade e contas' },
    body: {
      en: 'You must be at least 18 years old and have legal authority to bind your organization to these terms. You are responsible for maintaining the security of your account credentials and for all activities under your account. Each platform may have additional role-based access controls.',
      fr: "Vous devez avoir au moins 18 ans et avoir l'autorité légale pour engager votre organisation. Vous êtes responsable de la sécurité de vos identifiants de compte et de toutes les activités effectuées depuis votre compte. Chaque plateforme peut avoir des contrôles d'accès supplémentaires basés sur les rôles.",
      ar: 'يجب أن تكون بالغاً من العمر 18 عاماً على الأقل وأن تملك السلطة القانونية لإلزام مؤسستك بهذه الشروط. أنت مسؤول عن الحفاظ على أمان بيانات اعتماد حسابك وعن جميع الأنشطة التي تتم من خلاله. قد تحتوي كل منصة على ضوابط وصول إضافية قائمة على الأدوار.',
      es: 'Debes tener al menos 18 años y contar con la autoridad legal para vincular a tu organización a estos términos. Eres responsable de mantener la seguridad de tus credenciales de cuenta y de todas las actividades realizadas bajo tu cuenta. Cada plataforma puede tener controles de acceso adicionales basados en roles.',
      pt: 'Você deve ter pelo menos 18 anos e possuir autoridade legal para vincular sua organização a estes termos. Você é responsável por manter a segurança das credenciais da sua conta e por todas as atividades realizadas nela. Cada plataforma pode ter controles de acesso adicionais baseados em função.',
    },
  },
  {
    title: { en: '3. Acceptable Use', fr: '3. Utilisation acceptable', ar: '3. الاستخدام المقبول', es: '3. Uso aceptable', pt: '3. Uso aceitável' },
    body: {
      en: 'You agree not to use LiAfrik platforms for unlawful activities, to infringe intellectual property rights, to transmit malware or harmful code, or to attempt unauthorized access. You are responsible for the accuracy and legality of all data you enter into our platforms.',
      fr: "Vous acceptez de ne pas utiliser les plateformes LiAfrik pour des activités illégales, porter atteinte aux droits de propriété intellectuelle, transmettre des logiciels malveillants, ou tenter un accès non autorisé. Vous êtes responsable de l'exactitude et de la légalité de toutes les données que vous saisissez.",
      ar: 'توافق على عدم استخدام منصات LiAfrik في أنشطة غير قانونية، أو انتهاك حقوق الملكية الفكرية، أو نقل برمجيات ضارة أو تعليمات برمجية مؤذية، أو محاولة الوصول غير المصرح به. أنت مسؤول عن دقة وقانونية جميع البيانات التي تُدخلها في منصاتنا.',
      es: 'Aceptas no usar las plataformas LiAfrik para actividades ilegales, infringir derechos de propiedad intelectual, transmitir malware o código dañino, ni intentar accesos no autorizados. Eres responsable de la exactitud y legalidad de todos los datos que introduzcas en nuestras plataformas.',
      pt: 'Você concorda em não usar as plataformas da LiAfrik para atividades ilegais, infringir direitos de propriedade intelectual, transmitir malware ou código nocivo, ou tentar acesso não autorizado. Você é responsável pela precisão e legalidade de todos os dados que inserir em nossas plataformas.',
    },
  },
  {
    title: { en: '4. Intellectual Property', fr: '4. Propriété intellectuelle', ar: '4. الملكية الفكرية', es: '4. Propiedad intelectual', pt: '4. Propriedade intelectual' },
    body: {
      en: 'LiAfrik, including its platform names (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek), logos, designs, and software, is the property of LiAfrik. You retain full ownership of all data you create within our platforms.',
      fr: "LiAfrik, y compris les noms de ses plateformes (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek), logos, designs et logiciels, est la propriété de LiAfrik. Vous conservez la pleine propriété de toutes les données que vous créez dans nos plateformes.",
      ar: 'إن LiAfrik، بما في ذلك أسماء منصاته (Sellia وPOS وCRM وAtlas وLiBooks وFaka وHealth وMafo وKolo وBailly وSkills وKlasoo وNutro وZando وLitrek)، والشعارات، والتصاميم، والبرمجيات، هي ملك لـ LiAfrik. تحتفظ أنت بالملكية الكاملة لجميع البيانات التي تنشئها ضمن منصاتنا.',
      es: 'LiAfrik, incluidos los nombres de sus plataformas (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek), logotipos, diseños y software, es propiedad de LiAfrik. Conservas la propiedad total de todos los datos que crees dentro de nuestras plataformas.',
      pt: 'A LiAfrik, incluindo os nomes de suas plataformas (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek), logotipos, designs e software, é propriedade da LiAfrik. Você mantém total propriedade de todos os dados que criar em nossas plataformas.',
    },
  },
  {
    title: { en: '5. Subscriptions and Payments', fr: '5. Abonnements et paiements', ar: '5. الاشتراكات والمدفوعات', es: '5. Suscripciones y pagos', pt: '5. Assinaturas e pagamentos' },
    body: {
      en: 'Some LiAfrik platforms operate on subscription models. Pricing varies by platform and plan. Subscriptions auto-renew unless cancelled. You can manage or cancel subscriptions from your account settings. Detailed pricing is available on individual product pages or within each SaaS application.',
      fr: "Certaines plateformes LiAfrik fonctionnent sur un modèle d'abonnement. Les prix varient selon la plateforme et le plan. Les abonnements se renouvellent automatiquement sauf annulation. Vous pouvez gérer ou annuler vos abonnements depuis vos paramètres de compte. Les tarifs détaillés sont disponibles sur les pages produit ou dans chaque application SaaS.",
      ar: 'تعمل بعض منصات LiAfrik وفق نماذج اشتراك. تختلف الأسعار حسب المنصة والخطة. تتجدد الاشتراكات تلقائياً ما لم يتم إلغاؤها. يمكنك إدارة أو إلغاء اشتراكاتك من إعدادات حسابك. تتوفر الأسعار التفصيلية على صفحات المنتجات الفردية أو داخل كل تطبيق SaaS.',
      es: 'Algunas plataformas LiAfrik funcionan con modelos de suscripción. Los precios varían según la plataforma y el plan. Las suscripciones se renuevan automáticamente a menos que se cancelen. Puedes gestionar o cancelar tus suscripciones desde la configuración de tu cuenta. Los precios detallados están disponibles en las páginas de cada producto o dentro de cada aplicación SaaS.',
      pt: 'Algumas plataformas da LiAfrik funcionam com modelos de assinatura. Os preços variam de acordo com a plataforma e o plano. As assinaturas são renovadas automaticamente, a menos que sejam canceladas. Você pode gerenciar ou cancelar assinaturas nas configurações da sua conta. Preços detalhados estão disponíveis nas páginas de cada produto ou dentro de cada aplicativo SaaS.',
    },
  },
  {
    title: { en: '6. Data and Privacy', fr: '6. Données et confidentialité', ar: '6. البيانات والخصوصية', es: '6. Datos y privacidad', pt: '6. Dados e privacidade' },
    body: {
      en: 'Your use of LiAfrik is also governed by our Privacy Policy. We process your data in accordance with that policy. You are responsible for ensuring you have proper consent to process any personal data (including employee, patient, customer, or student data) you enter into our platforms.',
      fr: "Votre utilisation de LiAfrik est également régie par notre Politique de Confidentialité. Nous traitons vos données conformément à cette politique. Vous êtes responsable de l'obtention du consentement approprié pour traiter toute donnée personnelle (employés, patients, clients, élèves) que vous saisissez.",
      ar: 'يخضع استخدامك لـ LiAfrik أيضاً لسياسة الخصوصية الخاصة بنا. نعالج بياناتك وفقاً لتلك السياسة. أنت مسؤول عن ضمان حصولك على الموافقة المناسبة لمعالجة أي بيانات شخصية (بما في ذلك بيانات الموظفين أو المرضى أو العملاء أو الطلاب) تُدخلها في منصاتنا.',
      es: 'El uso de LiAfrik también se rige por nuestra Política de Privacidad. Procesamos tus datos de acuerdo con dicha política. Eres responsable de garantizar que cuentas con el consentimiento adecuado para procesar cualquier dato personal (incluidos datos de empleados, pacientes, clientes o estudiantes) que introduzcas en nuestras plataformas.',
      pt: 'O seu uso da LiAfrik também é regido por nossa Política de Privacidade. Processamos seus dados de acordo com essa política. Você é responsável por garantir que possui o consentimento adequado para processar quaisquer dados pessoais (incluindo dados de funcionários, pacientes, clientes ou alunos) que insira em nossas plataformas.',
    },
  },
  {
    title: { en: '7. Service Availability', fr: '7. Disponibilité du service', ar: '7. توافر الخدمة', es: '7. Disponibilidad del servicio', pt: '7. Disponibilidade do serviço' },
    body: {
      en: 'We strive for 99.99% uptime but do not guarantee uninterrupted service. We may perform maintenance, updates, or changes that temporarily affect availability. We are not liable for outages caused by factors beyond our control.',
      fr: 'Nous visons une disponibilité de 99,99 % mais ne garantissons pas un service ininterrompu. Nous pouvons effectuer des maintenance, mises à jour ou modifications affectant temporairement la disponibilité. Nous ne sommes pas responsables des interruptions causées par des facteurs hors de notre contrôle.',
      ar: 'نسعى لتحقيق نسبة توافر 99.99% لكننا لا نضمن خدمة دون انقطاع. قد نجري أعمال صيانة أو تحديثات أو تغييرات قد تؤثر مؤقتاً على التوافر. لسنا مسؤولين عن الأعطال الناجمة عن عوامل خارجة عن سيطرتنا.',
      es: 'Nos esforzamos por lograr un 99,99 % de disponibilidad, pero no garantizamos un servicio ininterrumpido. Podemos realizar mantenimiento, actualizaciones o cambios que afecten temporalmente la disponibilidad. No somos responsables de las interrupciones causadas por factores fuera de nuestro control.',
      pt: 'Buscamos 99,99% de disponibilidade, mas não garantimos um serviço ininterrupto. Podemos realizar manutenção, atualizações ou alterações que afetem temporariamente a disponibilidade. Não somos responsáveis por interrupções causadas por fatores fora do nosso controle.',
    },
  },
  {
    title: { en: '8. Limitation of Liability', fr: '8. Limitation de responsabilité', ar: '8. تحديد المسؤولية', es: '8. Limitación de responsabilidad', pt: '8. Limitação de responsabilidade' },
    body: {
      en: 'LiAfrik is provided "as is" without warranties of any kind. To the maximum extent permitted by law, LiAfrik shall not be liable for indirect, incidental, or consequential damages, including loss of profits, data, or business, arising from your use of our platforms.',
      fr: 'LiAfrik est fourni « tel quel » sans garantie d\'aucune sorte. Dans la mesure maximale permise par la loi, LiAfrik ne saurait être tenu responsable de dommages indirects, accessoires ou consécutifs, incluant la perte de profits, de données ou d\'activité, découlant de l\'utilisation de nos plateformes.',
      ar: 'يُقدَّم LiAfrik "كما هو" دون أي ضمانات من أي نوع. وإلى أقصى حد يسمح به القانون، لا يتحمل LiAfrik المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية، بما في ذلك خسارة الأرباح أو البيانات أو الأعمال، الناتجة عن استخدامك لمنصاتنا.',
      es: 'LiAfrik se ofrece "tal cual", sin garantías de ningún tipo. En la máxima medida permitida por la ley, LiAfrik no será responsable de daños indirectos, incidentales o consecuentes, incluida la pérdida de beneficios, datos o negocio, derivados del uso de nuestras plataformas.',
      pt: 'A LiAfrik é fornecida "como está", sem garantias de qualquer tipo. Na máxima extensão permitida por lei, a LiAfrik não será responsável por danos indiretos, incidentais ou consequenciais, incluindo perda de lucros, dados ou negócios, decorrentes do uso de nossas plataformas.',
    },
  },
  {
    title: { en: '9. Termination', fr: '9. Résiliation', ar: '9. الإنهاء', es: '9. Terminación', pt: '9. Rescisão' },
    body: {
      en: 'You may close your account at any time. We may suspend or terminate access if you violate these terms, if your account is inactive for an extended period, or for security reasons. Upon termination, your data may be deleted after a reasonable retention period.',
      fr: "Vous pouvez fermer votre compte à tout moment. Nous pouvons suspendre ou résilier l'accès en cas de violation de ces conditions, d'inactivité prolongée du compte, ou pour des raisons de sécurité. Lors de la résiliation, vos données peuvent être supprimées après une période de conservation raisonnable.",
      ar: 'يمكنك إغلاق حسابك في أي وقت. يجوز لنا تعليق أو إنهاء الوصول في حال مخالفتك لهذه الشروط، أو عدم نشاط حسابك لفترة طويلة، أو لأسباب أمنية. عند الإنهاء، قد تُحذف بياناتك بعد فترة احتفاظ معقولة.',
      es: 'Puedes cerrar tu cuenta en cualquier momento. Podemos suspender o cancelar el acceso si incumples estos términos, si tu cuenta permanece inactiva durante un período prolongado, o por motivos de seguridad. Al finalizar, tus datos podrán eliminarse tras un período de retención razonable.',
      pt: 'Você pode encerrar sua conta a qualquer momento. Podemos suspender ou encerrar o acesso caso você viole estes termos, se sua conta ficar inativa por um período prolongado, ou por motivos de segurança. Após o encerramento, seus dados poderão ser excluídos após um período razoável de retenção.',
    },
  },
  {
    title: { en: '10. Governing Law', fr: '10. Droit applicable', ar: '10. القانون الحاكم', es: '10. Ley aplicable', pt: '10. Lei aplicável' },
    body: {
      en: 'These terms are governed by the laws of the United Arab Emirates, where LiAfrik operates. Disputes shall be resolved in the courts of Dubai, UAE, unless otherwise required by local consumer protection laws.',
      fr: 'Ces conditions sont régies par les lois des Émirats Arabes Unis, où LiAfrik opère. Les litiges seront tranchés par les tribunaux de Dubaï, EAU, sauf disposition contraire du droit local de protection des consommateurs.',
      ar: 'تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة، حيث يعمل LiAfrik. تُحل النزاعات أمام محاكم دبي، الإمارات، ما لم تقتض قوانين حماية المستهلك المحلية خلاف ذلك.',
      es: 'Estos términos se rigen por las leyes de los Emiratos Árabes Unidos, donde opera LiAfrik. Las disputas se resolverán en los tribunales de Dubái, EAU, salvo que las leyes locales de protección al consumidor exijan lo contrario.',
      pt: 'Estes termos são regidos pelas leis dos Emirados Árabes Unidos, onde a LiAfrik opera. As disputas serão resolvidas nos tribunais de Dubai, EAU, salvo disposição em contrário exigida pelas leis locais de proteção ao consumidor.',
    },
  },
  {
    title: { en: '11. Changes to These Terms', fr: '11. Modifications de ces conditions', ar: '11. تعديلات على هذه الشروط', es: '11. Cambios en estos términos', pt: '11. Alterações a estes termos' },
    body: {
      en: 'We may update these Terms of Service from time to time. We will notify you of significant changes through our platforms or by email. Continued use of LiAfrik after changes constitutes acceptance of the updated terms.',
      fr: "Nous pouvons mettre à jour ces Conditions d'Utilisation de temps à autre. Nous vous notifierons les changements importants via nos plateformes ou par e-mail. L'utilisation continue de LiAfrik après les modifications vaut acceptation des conditions mises à jour.",
      ar: 'يجوز لنا تحديث شروط الخدمة هذه من وقت لآخر. سنُعلمك بالتغييرات الجوهرية عبر منصاتنا أو عبر البريد الإلكتروني. يُعد استمرارك في استخدام LiAfrik بعد إجراء التعديلات بمثابة موافقة على الشروط المحدَّثة.',
      es: 'Podemos actualizar estos Términos de Servicio de vez en cuando. Te notificaremos los cambios significativos a través de nuestras plataformas o por correo electrónico. El uso continuado de LiAfrik después de los cambios constituye la aceptación de los términos actualizados.',
      pt: 'Podemos atualizar estes Termos de Serviço periodicamente. Notificaremos você sobre alterações significativas por meio de nossas plataformas ou por e-mail. O uso contínuo da LiAfrik após as alterações constitui aceitação dos termos atualizados.',
    },
  },
  {
    title: { en: '12. Contact', fr: '12. Contact', ar: '12. الاتصال', es: '12. Contacto', pt: '12. Contato' },
    body: {
      en: 'For questions about these Terms of Service, contact us at cs@liafrik.com or support@liafrik.com.',
      fr: "Pour toute question concernant ces Conditions d'Utilisation, contactez-nous à cs@liafrik.com ou support@liafrik.com.",
      ar: 'لأي أسئلة حول شروط الخدمة هذه، تواصل معنا عبر cs@liafrik.com أو support@liafrik.com.',
      es: 'Si tienes preguntas sobre estos Términos de Servicio, contáctanos en cs@liafrik.com o support@liafrik.com.',
      pt: 'Para dúvidas sobre estes Termos de Serviço, entre em contato conosco em cs@liafrik.com ou support@liafrik.com.',
    },
  },
];

export default function TermsOfService() {
  const { lang } = useLang();
  useSEO({
    title: pick(lang, {
      en: 'Terms of Service | LiAfrik', fr: "Conditions d'utilisation | LiAfrik",
      ar: 'شروط الخدمة | LiAfrik', es: 'Términos de servicio | LiAfrik', pt: 'Termos de serviço | LiAfrik',
    }),
    description: pick(lang, {
      en: 'The terms governing your use of the LiAfrik SaaS ecosystem — accounts, acceptable use, subscriptions, and liability.',
      fr: "Les conditions régissant votre utilisation de l'écosystème SaaS LiAfrik — comptes, utilisation acceptable, abonnements et responsabilité.",
      ar: 'الشروط الحاكمة لاستخدامك لنظام LiAfrik المتكامل — الحسابات، والاستخدام المقبول، والاشتراكات، والمسؤولية.',
      es: 'Los términos que rigen el uso del ecosistema SaaS LiAfrik: cuentas, uso aceptable, suscripciones y responsabilidad.',
      pt: 'Os termos que regem o uso do ecossistema SaaS LiAfrik — contas, uso aceitável, assinaturas e responsabilidade.',
    }),
  });

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          tag={pick(lang, { en: 'Legal', fr: 'Mentions légales', ar: 'قانوني', es: 'Legal', pt: 'Legal' })}
          title={pick(lang, { en: 'Terms of Service', fr: "Conditions d'Utilisation", ar: 'شروط الخدمة', es: 'Términos de servicio', pt: 'Termos de serviço' })}
          subtitle={pick(lang, {
            en: 'The terms and conditions for using LiAfrik and our SaaS platforms.',
            fr: "Les termes et conditions d'utilisation de LiAfrik et de nos plateformes SaaS.",
            ar: 'الشروط والأحكام لاستخدام LiAfrik ومنصاتنا البرمجية.',
            es: 'Los términos y condiciones para usar LiAfrik y nuestras plataformas SaaS.',
            pt: 'Os termos e condições para usar a LiAfrik e nossas plataformas SaaS.',
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

        <div className="mt-10 rounded-2xl bg-cloud-50 border border-cloud-200 p-6 flex items-start gap-3">
          <FileText className="h-5 w-5 text-liafrik-600 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-muted">
            {pick(lang, {
              en: 'These terms apply to all LiAfrik platforms. For details on how we handle your data, see our Privacy Policy.',
              fr: "Ces conditions s'appliquent à toutes les plateformes LiAfrik. Pour plus de détails sur la gestion de vos données, consultez notre Politique de Confidentialité.",
              ar: 'تنطبق هذه الشروط على جميع منصات LiAfrik. لمزيد من التفاصيل حول كيفية تعاملنا مع بياناتك، راجع سياسة الخصوصية الخاصة بنا.',
              es: 'Estos términos se aplican a todas las plataformas LiAfrik. Para más detalles sobre cómo tratamos tus datos, consulta nuestra Política de Privacidad.',
              pt: 'Estes termos se aplicam a todas as plataformas da LiAfrik. Para detalhes sobre como tratamos seus dados, consulte nossa Política de Privacidade.',
            })}
          </p>
        </div>

        <div className="mt-10 text-center">
          <LinkButton to="/privacy" variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
            {pick(lang, { en: 'View Privacy Policy', fr: 'Voir la Politique de Confidentialité', ar: 'عرض سياسة الخصوصية', es: 'Ver Política de Privacidad', pt: 'Ver Política de Privacidade' })}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
