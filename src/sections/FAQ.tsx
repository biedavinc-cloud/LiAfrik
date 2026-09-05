import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang, type Lang } from '@/i18n/LanguageContext';

interface QA {
  q: Record<Lang, string>;
  a: Record<Lang, string>;
}

const faqs: QA[] = [
  {
    q: { en: 'Can I use only one application?', fr: 'Puis-je utiliser une seule application ?', ar: 'هل يمكنني استخدام تطبيق واحد فقط؟', es: '¿Puedo usar una sola aplicación?', pt: 'Posso usar apenas um aplicativo?' },
    a: { en: 'Absolutely. You can start with a single app — POS, Faka (HR), Klasoo (Education) or any other — and expand whenever you are ready. Every module works perfectly on its own.', fr: 'Absolument. Vous pouvez commencer avec une seule application — POS, Faka (RH), Klasoo (Éducation) ou toute autre — et étendre quand vous le souhaitez. Chaque module fonctionne parfaitement seul.', ar: 'بالتأكيد. يمكنك البدء بتطبيق واحد فقط — POS، أو Faka (الموارد البشرية)، أو Klasoo (التعليم) أو أي تطبيق آخر — والتوسع متى شئت. تعمل كل وحدة بشكل ممتاز بمفردها.', es: 'Por supuesto. Puedes empezar con una sola app —POS, Faka (RR. HH.), Klasoo (Educación) o cualquier otra— y expandirte cuando estés listo. Cada módulo funciona perfectamente por sí solo.', pt: 'Com certeza. Você pode começar com um único aplicativo — POS, Faka (RH), Klasoo (Educação) ou qualquer outro — e expandir quando estiver pronto. Cada módulo funciona perfeitamente sozinho.' },
  },
  {
    q: { en: 'Can I activate more applications later?', fr: "Puis-je activer d'autres applications plus tard ?", ar: 'هل يمكنني تفعيل تطبيقات إضافية لاحقاً؟', es: '¿Puedo activar más aplicaciones más adelante?', pt: 'Posso ativar mais aplicativos depois?' },
    a: { en: 'Yes. Activate new modules with a single click from your workspace. Your data stays connected across every application you turn on.', fr: "Oui. Activez de nouveaux modules d'un simple clic depuis votre espace. Vos données restent connectées entre toutes les applications activées.", ar: 'نعم. فعّل وحدات جديدة بنقرة واحدة من مساحة عملك. تبقى بياناتك مترابطة عبر كل تطبيق تقوم بتفعيله.', es: 'Sí. Activa nuevos módulos con un solo clic desde tu espacio de trabajo. Tus datos permanecen conectados en todas las aplicaciones que actives.', pt: 'Sim. Ative novos módulos com um único clique a partir do seu espaço de trabalho. Seus dados permanecem conectados em todos os aplicativos que você ativar.' },
  },
  {
    q: { en: 'Can I manage multiple companies?', fr: 'Puis-je gérer plusieurs sociétés ?', ar: 'هل يمكنني إدارة عدة شركات؟', es: '¿Puedo gestionar varias empresas?', pt: 'Posso gerenciar várias empresas?' },
    a: { en: 'Yes. LiAfrik supports multi-company and multi-branch setups, so you can run your entire group from one login.', fr: 'Oui. LiAfrik gère les configurations multi-sociétés et multi-agences, pour piloter tout votre groupe depuis un seul identifiant.', ar: 'نعم. يدعم LiAfrik إعدادات متعددة الشركات ومتعددة الفروع، بحيث تدير مجموعتك بالكامل من حساب دخول واحد.', es: 'Sí. LiAfrik admite configuraciones multiempresa y multisucursal, para que puedas gestionar todo tu grupo desde un solo inicio de sesión.', pt: 'Sim. A LiAfrik oferece suporte a configurações multi-empresa e multi-filial, para que você possa administrar todo o seu grupo a partir de um único login.' },
  },
  {
    q: { en: 'Does LiAfrik work on mobile?', fr: 'LiAfrik fonctionne-t-il sur mobile ?', ar: 'هل يعمل LiAfrik على الهاتف المحمول؟', es: '¿LiAfrik funciona en el móvil?', pt: 'A LiAfrik funciona no celular?' },
    a: { en: 'Yes. Every module is mobile-friendly and works beautifully on phones and tablets, online or offline.', fr: 'Oui. Chaque module est adapté au mobile et fonctionne parfaitement sur téléphone et tablette, en ligne ou hors-ligne.', ar: 'نعم. كل وحدة متوافقة مع الهاتف المحمول وتعمل بسلاسة على الهواتف والأجهزة اللوحية، سواء متصلاً بالإنترنت أو دون اتصال.', es: 'Sí. Cada módulo está optimizado para móviles y funciona de maravilla en teléfonos y tablets, con o sin conexión.', pt: 'Sim. Cada módulo é compatível com dispositivos móveis e funciona perfeitamente em celulares e tablets, online ou offline.' },
  },
  {
    q: { en: 'Is my data secure?', fr: 'Mes données sont-elles sécurisées ?', ar: 'هل بياناتي آمنة؟', es: '¿Mis datos están seguros?', pt: 'Meus dados estão seguros?' },
    a: { en: "Yes. Every LiAfrik app is built multi-tenant with strict data isolation — your account runs in its own walled-off workspace, never mixed with anyone else's. On top of that, data is encrypted, backed up continuously, and protected by granular role permissions and full audit logs. We hold security to bank-grade standards.", fr: "Oui. Chaque application LiAfrik est construite en multi-tenant avec une isolation stricte des données — votre compte s'exécute dans son propre espace cloisonné, jamais mélangé avec celui d'un autre. En plus de cela, vos données sont chiffrées, sauvegardées en continu et protégées par des permissions par rôle et des journaux d'audit complets. Nous appliquons des standards de sécurité niveau bancaire.", ar: 'نعم. كل تطبيق من تطبيقات LiAfrik مبني بنظام متعدد المستأجرين مع عزل صارم للبيانات — يعمل حسابك ضمن مساحة عمل معزولة تماماً، لا تختلط أبداً ببيانات أي شخص آخر. علاوة على ذلك، تُشفَّر البيانات، ويُنسخ احتياطياً باستمرار، وتُحمى بصلاحيات أدوار دقيقة وسجلات تدقيق كاملة. نلتزم بمعايير أمان بمستوى مصرفي.', es: 'Sí. Cada aplicación de LiAfrik está construida con arquitectura multi-tenant y aislamiento estricto de datos: tu cuenta funciona en su propio espacio cerrado, nunca mezclado con el de nadie más. Además, los datos se cifran, se respaldan continuamente y se protegen con permisos de rol granulares y registros de auditoría completos. Mantenemos la seguridad con estándares de nivel bancario.', pt: 'Sim. Cada aplicativo da LiAfrik é construído em arquitetura multi-tenant com isolamento rigoroso de dados — sua conta roda em seu próprio espaço isolado, nunca misturado com o de outra pessoa. Além disso, os dados são criptografados, copiados continuamente e protegidos por permissões de função granulares e registros de auditoria completos. Mantemos a segurança em padrões de nível bancário.' },
  },
  {
    q: { en: 'Do you offer onboarding?', fr: 'Proposez-vous un accompagnement ?', ar: 'هل تقدمون خدمة التأهيل والإعداد؟', es: '¿Ofrecen incorporación (onboarding)?', pt: 'Vocês oferecem onboarding?' },
    a: { en: 'Yes. Our team helps you set up your workspace, import existing data, and train your staff so you are productive from day one.', fr: 'Oui. Notre équipe vous aide à configurer votre espace, importer vos données existantes et former vos équipes pour être productif dès le premier jour.', ar: 'نعم. يساعدك فريقنا في إعداد مساحة عملك واستيراد بياناتك الحالية وتدريب موظفيك لتكون منتجاً منذ اليوم الأول.', es: 'Sí. Nuestro equipo te ayuda a configurar tu espacio de trabajo, importar tus datos existentes y capacitar a tu personal para que seas productivo desde el primer día.', pt: 'Sim. Nossa equipe ajuda você a configurar seu espaço de trabalho, importar dados existentes e treinar sua equipe para que você seja produtivo desde o primeiro dia.' },
  },
  {
    q: { en: 'How much does LiAfrik cost?', fr: 'Combien coûte LiAfrik ?', ar: 'كم تبلغ تكلفة LiAfrik؟', es: '¿Cuánto cuesta LiAfrik?', pt: 'Quanto custa a LiAfrik?' },
    a: { en: 'Each platform has its own plans. Open the platform you are interested in and explore the plan that fits your business — start free and upgrade as you grow.', fr: 'Chaque plateforme a ses propres plans. Ouvrez la plateforme qui vous intéresse et explorez le plan adapté à votre entreprise — commencez gratuitement et évoluez selon votre croissance.', ar: 'لكل منصة خططها الخاصة. افتح المنصة التي تهمك واستكشف الخطة التي تناسب عملك — ابدأ مجاناً وترقّ مع نموك.', es: 'Cada plataforma tiene sus propios planes. Abre la plataforma que te interese y explora el plan que se ajusta a tu negocio: empieza gratis y mejora a medida que creces.', pt: 'Cada plataforma tem seus próprios planos. Abra a plataforma de seu interesse e explore o plano ideal para o seu negócio — comece grátis e faça upgrade conforme cresce.' },
  },
];

export default function FAQ() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading tag={t('faq.tag')} title={t('faq.title')} subtitle={t('faq.sub')} />

        <div className="mt-10 space-y-3">
          {faqs.map((qa, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-cloud-200 overflow-hidden shadow-card"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display font-semibold text-[15px] text-ink">{qa.q[lang]}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 grid place-items-center h-7 w-7 rounded-full bg-liafrik-50 text-liafrik-600">
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-ink-muted leading-relaxed">{qa.a[lang]}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
