import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';

export default function FinalCTA() {
  const { t } = useLang();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-liafrik-700 via-liafrik-600 to-cyanx-500 px-6 py-14 sm:px-12 sm:py-20 text-center shadow-glow-blue"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
          <motion.div aria-hidden
            className="absolute -top-16 -left-10 h-60 w-60 rounded-full bg-cyanx-400/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div aria-hidden
            className="absolute -bottom-16 -right-10 h-60 w-60 rounded-full bg-liafrik-300/30 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
              {t('finalCta.title')}
            </h2>
            <p className="mt-4 text-lg text-liafrik-100 max-w-xl mx-auto">
              {t('finalCta.sub')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LinkButton to="/#contact" variant="white" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                {t('finalCta.start')}
              </LinkButton>
              <LinkButton to="/#contact" variant="ghost" size="lg" className="text-white hover:bg-white/10" icon={<Play className="h-4 w-4" />}>
                {t('finalCta.demo')}
              </LinkButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
