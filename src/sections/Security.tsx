import { motion } from 'framer-motion';
import {
  Lock, Cloud, RefreshCw, ScrollText, ShieldCheck, BadgeCheck, EyeOff,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';

interface SecItem {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  color: string;
}

const items: SecItem[] = [
  { icon: Lock, titleKey: 'sec.encryption.title', descKey: 'sec.encryption.desc', color: 'from-liafrik-600 to-liafrik-400' },
  { icon: Cloud, titleKey: 'sec.hosting.title', descKey: 'sec.hosting.desc', color: 'from-cyanx-500 to-liafrik-500' },
  { icon: RefreshCw, titleKey: 'sec.backup.title', descKey: 'sec.backup.desc', color: 'from-liafrik-500 to-cyanx-500' },
  { icon: ScrollText, titleKey: 'sec.audit.title', descKey: 'sec.audit.desc', color: 'from-liafrik-700 to-liafrik-500' },
  { icon: ShieldCheck, titleKey: 'sec.roles.title', descKey: 'sec.roles.desc', color: 'from-liafrik-600 to-cyanx-400' },
  { icon: BadgeCheck, titleKey: 'sec.compliance.title', descKey: 'sec.compliance.desc', color: 'from-cyanx-600 to-liafrik-600' },
  { icon: EyeOff, titleKey: 'sec.privacy.title', descKey: 'sec.privacy.desc', color: 'from-liafrik-500 to-liafrik-700' },
];

export default function Security() {
  const { t, lang } = useLang();

  return (
    <section id="security" className="relative py-20 sm:py-28 bg-cloud-100/60">
      <div aria-hidden className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-liafrik-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('sec.tag')} title={t('sec.title')} subtitle={t('sec.sub')} />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl bg-white border border-cloud-200 p-6 shadow-card hover:shadow-float transition-shadow"
              >
                <span className={`grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-glow-blue group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 font-display font-bold text-base text-ink leading-tight">{t(item.titleKey)}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{t(item.descKey)}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-liafrik-600 to-cyanx-500 p-5 sm:p-6 flex items-center gap-4 text-white shadow-glow-blue"
        >
          <ShieldCheck className="h-8 w-8 shrink-0" />
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            {lang === 'en'
              ? 'From Health to Mafo, from LiBooks to Kolo — sensitive data is treated with the highest standard of confidentiality and care.'
              : "De Health à Mafo, de LiBooks à Kolo — les données sensibles sont traitées selon les standards les plus stricts de confidentialité et d'attention."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
