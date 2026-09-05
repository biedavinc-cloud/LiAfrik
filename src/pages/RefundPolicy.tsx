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
    title: { en: '1. Scope', fr: "1. Champ d'application", ar: '1. النطاق', es: '1. Alcance', pt: '1. Escopo' },
    body: {
      en: 'This Refund Policy applies to paid subscriptions and one-time purchases made across LiAfrik platforms (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek). It complements our Terms of Service.',
      fr: "Cette Politique de remboursement s'applique aux abonnements payants et achats ponctuels effectués sur les plateformes LiAfrik (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek). Elle complète nos Conditions d'Utilisation.",
      ar: 'تنطبق سياسة الاسترداد هذه على الاشتراكات المدفوعة والمشتريات لمرة واحدة عبر منصات LiAfrik (Sellia وPOS وCRM وAtlas وLiBooks وFaka وHealth وMafo وKolo وBailly وSkills وKlasoo وNutro وZando وLitrek). وهي تكمّل شروط الخدمة الخاصة بنا.',
      es: 'Esta Política de reembolso se aplica a las suscripciones pagas y compras únicas realizadas en las plataformas LiAfrik (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek). Complementa nuestros Términos de Servicio.',
      pt: 'Esta Política de reembolso aplica-se a assinaturas pagas e compras únicas feitas nas plataformas da LiAfrik (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek). Ela complementa nossos Termos de Serviço.',
    },
  },
  {
    title: { en: '2. Free Trials', fr: '2. Essais gratuits', ar: '2. الفترات التجريبية المجانية', es: '2. Pruebas gratuitas', pt: '2. Testes gratuitos' },
    body: {
      en: 'Where a free trial is offered, no charges are made until the trial ends and you have opted into a paid plan. You may cancel at any time during the trial at no cost.',
      fr: "Lorsqu'un essai gratuit est proposé, aucun prélèvement n'est effectué avant la fin de l'essai et votre passage à un plan payant. Vous pouvez annuler à tout moment pendant l'essai, sans frais.",
      ar: 'عندما تُقدَّم فترة تجريبية مجانية، لا يتم تحصيل أي رسوم حتى انتهاء الفترة التجريبية واختيارك خطة مدفوعة. يمكنك الإلغاء في أي وقت خلال الفترة التجريبية دون أي تكلفة.',
      es: 'Cuando se ofrece una prueba gratuita, no se realiza ningún cargo hasta que finalice la prueba y hayas optado por un plan de pago. Puedes cancelar en cualquier momento durante la prueba sin costo alguno.',
      pt: 'Quando um teste gratuito é oferecido, nenhuma cobrança é feita até o fim do teste e a sua adesão a um plano pago. Você pode cancelar a qualquer momento durante o teste, sem custo.',
    },
  },
  {
    title: { en: '3. Subscription Cancellations', fr: "3. Annulation d'abonnement", ar: '3. إلغاء الاشتراك', es: '3. Cancelación de suscripciones', pt: '3. Cancelamento de assinaturas' },
    body: {
      en: 'You may cancel a subscription at any time from your account settings. Cancellation stops future billing at the end of the current billing cycle; you retain access to paid features until that cycle ends. We do not provide partial-period refunds for unused time, except where required by law.',
      fr: "Vous pouvez annuler un abonnement à tout moment depuis les paramètres de votre compte. L'annulation arrête la facturation future à la fin du cycle de facturation en cours ; vous conservez l'accès aux fonctionnalités payantes jusqu'à la fin de ce cycle. Nous ne remboursons pas le temps non utilisé sur une période déjà entamée, sauf disposition légale contraire.",
      ar: 'يمكنك إلغاء اشتراكك في أي وقت من إعدادات حسابك. يوقف الإلغاء الفوترة المستقبلية في نهاية دورة الفوترة الحالية؛ وتحتفظ بإمكانية الوصول إلى الميزات المدفوعة حتى نهاية تلك الدورة. لا نقدّم استرداداً جزئياً للوقت غير المستخدم، إلا إذا اقتضى القانون خلاف ذلك.',
      es: 'Puedes cancelar una suscripción en cualquier momento desde la configuración de tu cuenta. La cancelación detiene la facturación futura al final del ciclo de facturación actual; conservas el acceso a las funciones pagas hasta que finalice ese ciclo. No ofrecemos reembolsos parciales por tiempo no utilizado, salvo que la ley lo exija.',
      pt: 'Você pode cancelar uma assinatura a qualquer momento nas configurações da sua conta. O cancelamento interrompe a cobrança futura no fim do ciclo de faturamento atual; você mantém acesso aos recursos pagos até o fim desse ciclo. Não oferecemos reembolsos parciais por tempo não utilizado, exceto quando exigido por lei.',
    },
  },
  {
    title: { en: '4. Eligibility for Refunds', fr: "4. Conditions d'éligibilité au remboursement", ar: '4. أهلية الاسترداد', es: '4. Elegibilidad para reembolsos', pt: '4. Elegibilidade para reembolso' },
    body: {
      en: 'A refund may be granted, at our discretion, if: (a) you were charged in error or as a result of a duplicate transaction, (b) a paid feature was materially unavailable due to a fault on our side and we could not remedy it within a reasonable time, or (c) you request cancellation within 14 days of an initial paid subscription and have not made substantial use of the service.',
      fr: "Un remboursement peut être accordé, à notre discrétion, si : (a) vous avez été facturé par erreur ou à la suite d'une transaction en double, (b) une fonctionnalité payante était matériellement indisponible en raison d'un problème de notre côté que nous n'avons pas pu résoudre dans un délai raisonnable, ou (c) vous demandez l'annulation dans les 14 jours suivant un premier abonnement payant et n'avez pas fait un usage substantiel du service.",
      ar: 'يجوز منح استرداد، وفقاً لتقديرنا، في حال: (أ) تم تحصيل رسوم منك عن طريق الخطأ أو نتيجة معاملة مكررة، (ب) كانت ميزة مدفوعة غير متاحة فعلياً بسبب خلل من جانبنا ولم نتمكن من إصلاحه خلال وقت معقول، أو (ج) طلبت الإلغاء خلال 14 يوماً من الاشتراك المدفوع الأول ولم تستخدم الخدمة بشكل جوهري.',
      es: 'Podremos conceder un reembolso, a nuestra discreción, si: (a) se te cobró por error o debido a una transacción duplicada, (b) una función paga estuvo materialmente indisponible por un fallo de nuestra parte que no pudimos solucionar en un plazo razonable, o (c) solicitas la cancelación dentro de los 14 días posteriores a una suscripción paga inicial y no has hecho un uso sustancial del servicio.',
      pt: 'Um reembolso poderá ser concedido, a nosso critério, se: (a) você foi cobrado por engano ou devido a uma transação duplicada, (b) um recurso pago esteve materialmente indisponível por uma falha de nossa parte que não pudemos corrigir em um prazo razoável, ou (c) você solicitar o cancelamento dentro de 14 dias após uma assinatura paga inicial e não tiver feito uso substancial do serviço.',
    },
  },
  {
    title: { en: '5. Non-Refundable Cases', fr: '5. Cas non remboursables', ar: '5. الحالات غير القابلة للاسترداد', es: '5. Casos no reembolsables', pt: '5. Casos não reembolsáveis' },
    body: {
      en: 'Refunds are not provided for: partial months or unused time after the 14-day window, dissatisfaction with a feature that performs as described, third-party fees (e.g. payment processor charges), or accounts suspended or terminated for violation of our Terms of Service.',
      fr: "Aucun remboursement n'est accordé pour : les périodes partielles ou le temps non utilisé après le délai de 14 jours, une insatisfaction liée à une fonctionnalité qui fonctionne comme décrite, les frais tiers (ex. frais du prestataire de paiement), ou les comptes suspendus ou résiliés pour violation de nos Conditions d'Utilisation.",
      ar: 'لا يُقدَّم استرداد مقابل: الأشهر الجزئية أو الوقت غير المستخدم بعد فترة الـ14 يوماً، أو عدم الرضا عن ميزة تعمل كما هو موصوف، أو رسوم أطراف ثالثة (مثل رسوم مزود الدفع)، أو الحسابات المعلَّقة أو المنهاة بسبب مخالفة شروط الخدمة لدينا.',
      es: 'No se otorgan reembolsos por: meses parciales o tiempo no utilizado después del período de 14 días, insatisfacción con una función que funciona según lo descrito, tarifas de terceros (p. ej., cargos del procesador de pagos), o cuentas suspendidas o canceladas por incumplir nuestros Términos de Servicio.',
      pt: 'Não são fornecidos reembolsos para: meses parciais ou tempo não utilizado após o período de 14 dias, insatisfação com um recurso que funciona conforme descrito, taxas de terceiros (ex.: cobranças do processador de pagamento), ou contas suspensas ou encerradas por violação de nossos Termos de Serviço.',
    },
  },
  {
    title: { en: '6. How to Request a Refund', fr: '6. Comment demander un remboursement', ar: '6. كيفية طلب الاسترداد', es: '6. Cómo solicitar un reembolso', pt: '6. Como solicitar um reembolso' },
    body: {
      en: 'Send a request to cs@liafrik.com or support@liafrik.com with your account email, the platform concerned, the transaction date, and the reason for your request. We aim to respond within 5 business days.',
      fr: "Envoyez une demande à cs@liafrik.com ou support@liafrik.com avec l'e-mail de votre compte, la plateforme concernée, la date de la transaction et le motif de votre demande. Nous visons à répondre sous 5 jours ouvrés.",
      ar: 'أرسل طلباً إلى cs@liafrik.com أو support@liafrik.com مع بريد حسابك الإلكتروني، والمنصة المعنية، وتاريخ المعاملة، وسبب طلبك. نسعى للرد خلال 5 أيام عمل.',
      es: 'Envía una solicitud a cs@liafrik.com o support@liafrik.com con el correo de tu cuenta, la plataforma en cuestión, la fecha de la transacción y el motivo de tu solicitud. Procuramos responder en un plazo de 5 días hábiles.',
      pt: 'Envie uma solicitação para cs@liafrik.com ou support@liafrik.com com o e-mail da sua conta, a plataforma em questão, a data da transação e o motivo da solicitação. Nosso objetivo é responder em até 5 dias úteis.',
    },
  },
  {
    title: { en: '7. Processing Time', fr: '7. Délai de traitement', ar: '7. مدة المعالجة', es: '7. Tiempo de procesamiento', pt: '7. Prazo de processamento' },
    body: {
      en: 'Approved refunds are issued to the original payment method and may take 5–10 business days to appear, depending on your bank or payment provider.',
      fr: "Les remboursements approuvés sont émis sur le moyen de paiement d'origine et peuvent prendre 5 à 10 jours ouvrés pour apparaître, selon votre banque ou prestataire de paiement.",
      ar: 'تُصدَر المبالغ المستردة المعتمدة إلى وسيلة الدفع الأصلية وقد تستغرق من 5 إلى 10 أيام عمل لتظهر، حسب البنك أو مزود الدفع الخاص بك.',
      es: 'Los reembolsos aprobados se emiten al método de pago original y pueden tardar entre 5 y 10 días hábiles en aparecer, según tu banco o proveedor de pagos.',
      pt: 'Os reembolsos aprovados são emitidos para o método de pagamento original e podem levar de 5 a 10 dias úteis para aparecer, dependendo do seu banco ou provedor de pagamento.',
    },
  },
  {
    title: { en: '8. Chargebacks', fr: '8. Rétrofacturations', ar: '8. عمليات الاسترداد البنكي', es: '8. Contracargos', pt: '8. Estornos' },
    body: {
      en: 'We encourage you to contact us before initiating a chargeback with your bank or card issuer, so we can resolve billing issues directly and quickly.',
      fr: "Nous vous encourageons à nous contacter avant d'initier une rétrofacturation (« chargeback ») auprès de votre banque ou émetteur de carte, afin que nous puissions résoudre le problème de facturation directement et rapidement.",
      ar: 'نشجعك على التواصل معنا قبل بدء عملية استرداد بنكي (chargeback) لدى بنكك أو مُصدر بطاقتك، حتى نتمكن من حل مشكلات الفوترة مباشرة وبسرعة.',
      es: 'Te recomendamos contactarnos antes de iniciar un contracargo con tu banco o emisor de tarjeta, para que podamos resolver los problemas de facturación de forma directa y rápida.',
      pt: 'Recomendamos que você entre em contato conosco antes de iniciar um estorno junto ao seu banco ou emissor do cartão, para que possamos resolver problemas de faturamento de forma direta e rápida.',
    },
  },
  {
    title: { en: '9. Changes to This Policy', fr: '9. Modifications de cette politique', ar: '9. تعديلات على هذه السياسة', es: '9. Cambios en esta política', pt: '9. Alterações a esta política' },
    body: {
      en: 'We may update this Refund Policy from time to time. Material changes will be communicated through our platforms or by email. Continued use of LiAfrik after changes constitutes acceptance of the updated policy.',
      fr: "Nous pouvons mettre à jour cette Politique de remboursement de temps à autre. Les changements importants seront communiqués via nos plateformes ou par e-mail. L'utilisation continue de LiAfrik après modification vaut acceptation de la politique mise à jour.",
      ar: 'يجوز لنا تحديث سياسة الاسترداد هذه من وقت لآخر. سيتم إبلاغك بالتغييرات الجوهرية عبر منصاتنا أو عبر البريد الإلكتروني. يُعد استمرارك في استخدام LiAfrik بعد التعديل بمثابة موافقة على السياسة المحدَّثة.',
      es: 'Podemos actualizar esta Política de reembolso de vez en cuando. Los cambios importantes se comunicarán a través de nuestras plataformas o por correo electrónico. El uso continuado de LiAfrik después de los cambios constituye la aceptación de la política actualizada.',
      pt: 'Podemos atualizar esta Política de reembolso periodicamente. Alterações relevantes serão comunicadas por meio de nossas plataformas ou por e-mail. O uso contínuo da LiAfrik após as alterações constitui aceitação da política atualizada.',
    },
  },
  {
    title: { en: '10. Contact', fr: '10. Contact', ar: '10. الاتصال', es: '10. Contacto', pt: '10. Contato' },
    body: {
      en: 'For billing or refund questions, contact us at cs@liafrik.com or support@liafrik.com.',
      fr: 'Pour toute question relative à la facturation ou au remboursement, contactez-nous à cs@liafrik.com ou support@liafrik.com.',
      ar: 'لأي أسئلة تتعلق بالفوترة أو الاسترداد، تواصل معنا عبر cs@liafrik.com أو support@liafrik.com.',
      es: 'Si tienes preguntas sobre facturación o reembolsos, contáctanos en cs@liafrik.com o support@liafrik.com.',
      pt: 'Para dúvidas sobre faturamento ou reembolso, entre em contato conosco em cs@liafrik.com ou support@liafrik.com.',
    },
  },
];

export default function RefundPolicy() {
  const { lang } = useLang();
  useSEO({
    title: pick(lang, {
      en: 'Refund Policy | LiAfrik', fr: 'Politique de remboursement | LiAfrik',
      ar: 'سياسة الاسترداد | LiAfrik', es: 'Política de reembolso | LiAfrik', pt: 'Política de reembolso | LiAfrik',
    }),
    description: pick(lang, {
      en: 'How refunds, cancellations, and billing disputes are handled across the LiAfrik SaaS ecosystem.',
      fr: "Comment les remboursements, annulations et litiges de facturation sont gérés au sein de l'écosystème SaaS LiAfrik.",
      ar: 'كيف تُدار عمليات الاسترداد والإلغاء ومنازعات الفوترة عبر نظام LiAfrik المتكامل.',
      es: 'Cómo se gestionan los reembolsos, cancelaciones y disputas de facturación en el ecosistema SaaS LiAfrik.',
      pt: 'Como reembolsos, cancelamentos e disputas de faturamento são tratados no ecossistema SaaS LiAfrik.',
    }),
  });

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          tag={pick(lang, { en: 'Legal', fr: 'Mentions légales', ar: 'قانوني', es: 'Legal', pt: 'Legal' })}
          title={pick(lang, { en: 'Refund Policy', fr: 'Politique de remboursement', ar: 'سياسة الاسترداد', es: 'Política de reembolso', pt: 'Política de reembolso' })}
          subtitle={pick(lang, {
            en: 'How refunds, cancellations, and billing disputes are handled.',
            fr: 'Comment les remboursements, annulations et litiges de facturation sont gérés.',
            ar: 'كيف تُدار عمليات الاسترداد والإلغاء ومنازعات الفوترة.',
            es: 'Cómo se gestionan los reembolsos, cancelaciones y disputas de facturación.',
            pt: 'Como reembolsos, cancelamentos e disputas de faturamento são tratados.',
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
              en: 'This policy works alongside our Terms of Service and Privacy Policy. For billing questions, reach out before opening a dispute with your bank.',
              fr: "Cette politique s'applique avec nos Conditions d'Utilisation et notre Politique de Confidentialité. Pour toute question de facturation, contactez-nous avant d'ouvrir un litige auprès de votre banque.",
              ar: 'تعمل هذه السياسة جنباً إلى جنب مع شروط الخدمة وسياسة الخصوصية الخاصة بنا. لأي أسئلة تتعلق بالفوترة، تواصل معنا قبل فتح نزاع مع بنكك.',
              es: 'Esta política funciona junto con nuestros Términos de Servicio y Política de Privacidad. Para preguntas de facturación, contáctanos antes de abrir una disputa con tu banco.',
              pt: 'Esta política funciona em conjunto com nossos Termos de Serviço e Política de Privacidade. Para dúvidas de faturamento, entre em contato antes de abrir uma disputa com seu banco.',
            })}
          </p>
        </div>

        <div className="mt-10 text-center">
          <LinkButton to="/terms" variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
            {pick(lang, { en: 'View Terms of Service', fr: "Voir les Conditions d'Utilisation", ar: 'عرض شروط الخدمة', es: 'Ver Términos de servicio', pt: 'Ver Termos de serviço' })}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
