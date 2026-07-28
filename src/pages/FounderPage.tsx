import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';

export default function FounderPage() {
  const { t, lang } = useLang();

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading tag={t('founder.tag')} title={t('founderPage.title')} subtitle={t('founderPage.desc')} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 rounded-3xl glass-card-strong p-8 sm:p-10"
        >
          <h3 className="font-display font-bold text-xl text-ink">{t('founderPage.vision.title')}</h3>
          <p className="mt-4 text-ink-muted leading-relaxed">{t('founderPage.vision.body')}</p>
          <p className="mt-4 text-ink-muted leading-relaxed">{t('founderPage.vision.body2')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-3xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 p-8 sm:p-10 text-center shadow-glow-blue relative overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
          <div className="relative">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">{t('founderPage.group.title')}</h3>
            <p className="mt-3 text-liafrik-100 max-w-2xl mx-auto">{t('founderPage.group.desc')}</p>
            <a href="https://liyahgroup.me" target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-liafrik-700 text-base font-semibold px-6 py-3.5 hover:bg-cloud-50 transition-colors">
              {t('founderPage.group.cta')} <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <LinkButton to="/products" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            {t('nav.startFree')}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
