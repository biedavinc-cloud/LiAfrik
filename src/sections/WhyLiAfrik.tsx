import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';

export default function WhyLiAfrik() {
  const { t, lang } = useLang();
  const insteadOf = [
    t('why.softwares'), t('why.dashboards'), t('why.databases'), t('why.logins'), t('why.invoices'),
  ];
  const youGet = [
    t('why.onePlatform'), t('why.oneDashboard'), t('why.oneDatabase'), t('why.oneLogin'), t('why.oneSubscription'),
  ];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('why.tag')} title={t('why.title')} subtitle={t('why.connected')} />

        <div className="mt-12 grid md:grid-cols-2 gap-5 lg:gap-6">
          {/* Instead of */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-cloud-100 border border-cloud-200 p-6 sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-light mb-5">{t('why.insteadOf')}</p>
            <ul className="space-y-3">
              {insteadOf.map((item, i) => (
                <motion.li key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/70 border border-cloud-200 px-4 py-3"
                >
                  <span className="grid place-items-center h-7 w-7 rounded-full bg-rose-50 text-rose-500 shrink-0">
                    <X className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-ink-muted line-through decoration-rose-300/60">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* You get */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl bg-gradient-to-br from-liafrik-600 to-liafrik-700 p-6 sm:p-8 overflow-hidden shadow-glow-blue"
          >
            <div aria-hidden className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-cyanx-400/30 blur-2xl" />
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-liafrik-100 mb-5">{t('why.use')}</p>
            <ul className="space-y-3">
              {youGet.map((item, i) => (
                <motion.li key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur border border-white/15 px-4 py-3"
                >
                  <span className="grid place-items-center h-7 w-7 rounded-full bg-white text-liafrik-700 shrink-0">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6">
              <LinkButton to="/#ecosystem" variant="white" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>
                {lang === 'en' ? 'Explore the ecosystem' : "Explorer l'écosystème"}
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
