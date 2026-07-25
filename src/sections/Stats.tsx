import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useInViewOnce } from '@/hooks/useInView';
import { useLang } from '@/i18n/LanguageContext';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  labelEn: string;
  labelFr: string;
}

const stats: Stat[] = [
  { value: 50, suffix: '+', labelEn: 'Business Processes', labelFr: 'Processus métier' },
  { value: 12, suffix: '+', labelEn: 'Enterprise Applications', labelFr: 'Applications entreprise' },
  { value: 100, suffix: '%', labelEn: 'Cloud Based', labelFr: 'Basé sur le cloud' },
  { value: 99.99, suffix: '%', decimals: 2, labelEn: 'Availability', labelFr: 'Disponibilité' },
  { value: 24, suffix: '/7', labelEn: 'Support', labelFr: 'Support' },
  { value: 100, suffix: '%', labelEn: 'Unlimited Businesses', labelFr: 'Entreprises illimitées' },
];

const renderLabel = (stat: Stat, lang: 'en' | 'fr') => (lang === 'en' ? stat.labelEn : stat.labelFr);

export default function Stats() {
  const { t, lang } = useLang();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative py-20 sm:py-24 bg-gradient-to-br from-liafrik-700 via-liafrik-600 to-liafrik-500 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
      <div aria-hidden className="absolute -top-20 left-1/3 h-60 w-60 rounded-full bg-cyanx-400/30 blur-3xl animate-blob" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">{t('stats.title')}</h2>
          <p className="mt-3 text-liafrik-100 text-base sm:text-lg">{t('stats.sub')}</p>
        </div>

        <div ref={ref} className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 text-center"
            >
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} decimals={stat.decimals} active={inView} />
              </div>
              <p className="mt-1.5 text-xs font-medium text-liafrik-100 leading-snug">{renderLabel(stat, lang)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
