import { Link } from '@/components/Link';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang, pick } from '@/i18n/LanguageContext';

export default function Founder() {
  const { t, lang } = useLang();

  return (
    <section id="founder" className="relative py-20 sm:py-28 overflow-hidden">
      <div aria-hidden className="absolute top-1/2 -translate-y-1/2 right-0 h-[400px] w-[400px] rounded-full bg-liafrik-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <SectionHeading tag={t('founder.tag')} title={t('founder.title')} subtitle={t('founder.desc')} align="left" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 rounded-full bg-liafrik-600 text-white text-base font-semibold px-6 py-3.5 hover:bg-liafrik-700 shadow-premium hover:shadow-glow-blue hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                {t('founder.cta')} <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="block perspective-1200"
            >
              <div className="relative rounded-3xl glass-card-strong p-8 text-center">
                <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-30 rounded-3xl" />
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="mx-auto grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 text-white shadow-glow-blue"
                  >
                    <User className="h-8 w-8" strokeWidth={1.8} />
                  </motion.div>
                  <p className="mt-4 font-display font-bold text-lg text-ink">Vincent Nogue</p>
                  <p className="text-sm text-liafrik-700 font-medium">{pick(lang, { en: 'CEO & Founder', fr: 'CEO & Fondateur', ar: 'الرئيس التنفيذي والمؤسس', es: 'CEO y fundador', pt: 'CEO e fundador' })}</p>
                  <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                    {pick(lang, { en: 'Building technology that elevates how the world works.', fr: 'Construire des technologies qui élèvent la façon dont le monde travaille.', ar: 'نبني تقنية ترتقي بطريقة عمل العالم.', es: 'Construyendo tecnología que eleva la forma en que el mundo trabaja.', pt: 'Construindo tecnologia que eleva a forma como o mundo trabalha.' })}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
