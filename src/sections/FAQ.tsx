import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';

interface QA {
  qEn: string;
  qFr: string;
  aEn: string;
  aFr: string;
}

const faqs: QA[] = [
  {
    qEn: 'Can I use only one application?',
    qFr: 'Puis-je utiliser une seule application ?',
    aEn: 'Absolutely. You can start with a single app — POS, Faka (HR), Klasoo (Education) or any other — and expand whenever you are ready. Every module works perfectly on its own.',
    aFr: 'Absolument. Vous pouvez commencer avec une seule application — POS, Faka (RH), Klasoo (Éducation) ou toute autre — et étendre quand vous le souhaitez. Chaque module fonctionne parfaitement seul.',
  },
  {
    qEn: 'Can I activate more applications later?',
    qFr: "Puis-je activer d'autres applications plus tard ?",
    aEn: 'Yes. Activate new modules with a single click from your workspace. Your data stays connected across every application you turn on.',
    aFr: "Oui. Activez de nouveaux modules d'un simple clic depuis votre espace. Vos données restent connectées entre toutes les applications activées.",
  },
  {
    qEn: 'Can I manage multiple companies?',
    qFr: 'Puis-je gérer plusieurs sociétés ?',
    aEn: 'Yes. LiAfrik supports multi-company and multi-branch setups, so you can run your entire group from one login.',
    aFr: 'Oui. LiAfrik gère les configurations multi-sociétés et multi-agences, pour piloter tout votre groupe depuis un seul identifiant.',
  },
  {
    qEn: 'Does LiAfrik work on mobile?',
    qFr: 'LiAfrik fonctionne-t-il sur mobile ?',
    aEn: 'Yes. Every module is mobile-friendly and works beautifully on phones and tablets, online or offline.',
    aFr: 'Oui. Chaque module est adapté au mobile et fonctionne parfaitement sur téléphone et tablette, en ligne ou hors-ligne.',
  },
  {
    qEn: 'Is my data secure?',
    qFr: 'Mes données sont-elles sécurisées ?',
    aEn: 'Yes. Every LiAfrik app is built multi-tenant with strict data isolation — your account runs in its own walled-off workspace, never mixed with anyone else\'s. On top of that, data is encrypted, backed up continuously, and protected by granular role permissions and full audit logs. We hold security to bank-grade standards.',
    aFr: "Oui. Chaque application LiAfrik est construite en multi-tenant avec une isolation stricte des données — votre compte s'exécute dans son propre espace cloisonné, jamais mélangé avec celui d'un autre. En plus de cela, vos données sont chiffrées, sauvegardées en continu et protégées par des permissions par rôle et des journaux d'audit complets. Nous appliquons des standards de sécurité niveau bancaire.",
  },
  {
    qEn: 'Do you offer onboarding?',
    qFr: 'Proposez-vous un accompagnement ?',
    aEn: 'Yes. Our team helps you set up your workspace, import existing data, and train your staff so you are productive from day one.',
    aFr: 'Oui. Notre équipe vous aide à configurer votre espace, importer vos données existantes et former vos équipes pour être productif dès le premier jour.',
  },
  {
    qEn: 'How much does LiAfrik cost?',
    qFr: 'Combien coûte LiAfrik ?',
    aEn: 'Each platform has its own plans. Open the platform you are interested in and explore the plan that fits your business — start free and upgrade as you grow.',
    aFr: 'Chaque plateforme a ses propres plans. Ouvrez la plateforme qui vous intéresse et explorez le plan adapté à votre entreprise — commencez gratuitement et évoluez selon votre croissance.',
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
                  <span className="font-display font-semibold text-[15px] text-ink">{lang === 'en' ? qa.qEn : qa.qFr}</span>
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
                      <p className="px-5 pb-5 text-sm text-ink-muted leading-relaxed">{lang === 'en' ? qa.aEn : qa.aFr}</p>
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
