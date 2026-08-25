import { motion } from 'framer-motion';
import {
  Lock, Cloud, DatabaseBackup, ScrollText, UserCog, ShieldCheck, Eye, ServerCog,
  ArrowRight, Boxes,
} from 'lucide-react';
import { LinkButton } from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function SecurityPage() {
  const { t, lang } = useLang();
  useSEO({
    title: lang === 'en' ? 'Security & Trust | LiAfrik' : 'Sécurité et confiance | LiAfrik',
    description: lang === 'en'
      ? 'How LiAfrik protects your data: strict multi-tenant isolation, encryption, cloud infrastructure, backups, and role-based access across every app.'
      : "Comment LiAfrik protège vos données : isolation stricte multi-tenant, chiffrement, infrastructure cloud, sauvegardes, et accès par rôle sur chaque application.",
  });

  const pillars = [
    { icon: Boxes, title: t('secPage.tenant.title'), desc: t('secPage.tenant.desc') },
    { icon: Lock, title: t('secPage.encryption.title'), desc: t('secPage.encryption.desc') },
    { icon: Cloud, title: t('secPage.hosting.title'), desc: t('secPage.hosting.desc') },
    { icon: DatabaseBackup, title: t('secPage.backup.title'), desc: t('secPage.backup.desc') },
    { icon: ScrollText, title: t('secPage.audit.title'), desc: t('secPage.audit.desc') },
    { icon: UserCog, title: t('secPage.roles.title'), desc: t('secPage.roles.desc') },
    { icon: Eye, title: t('secPage.privacy.title'), desc: t('secPage.privacy.desc') },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          tag={t('secPage.tag')}
          title={t('secPage.title')}
          subtitle={t('secPage.sub')}
        />

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-white border border-cloud-200 p-6 shadow-card hover:shadow-float transition-shadow"
            >
              <span className="grid place-items-center h-12 w-12 rounded-2xl bg-liafrik-50 text-liafrik-600 mb-4">
                <p.icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <h3 className="font-display font-bold text-lg text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 rounded-3xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 p-8 sm:p-10 text-center shadow-glow-blue relative overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
          <div className="relative">
            <ServerCog className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">{t('secPage.infra.title')}</h3>
            <p className="mt-3 text-liafrik-100 max-w-2xl mx-auto">{t('secPage.infra.desc')}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <LinkButton to="/products" variant="white" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                {t('nav.startFree')}
              </LinkButton>
              <LinkButton to="/support" variant="ghost" size="lg" className="text-white border border-white/30 hover:bg-white/10">
                {t('secPage.contactSecurity')}
              </LinkButton>
            </div>
          </div>
        </motion.div>

        <p className="mt-10 text-center text-xs text-ink-light max-w-2xl mx-auto">
          {lang === 'en'
            ? 'LiAfrik is designed with strong data protection and privacy practices in mind. Specific compliance certifications will be documented here as they are verified.'
            : 'LiAfrik est conçu avec de solides pratiques de protection des données et de confidentialité. Les certifications de conformité spécifiques seront documentées ici dès qu\'elles seront vérifiées.'}
        </p>
      </div>
    </div>
  );
}
