import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useInViewOnce } from '@/hooks/useInView';
import { useLang, type Lang } from '@/i18n/LanguageContext';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: Record<Lang, string>;
}

const stats: Stat[] = [
  { value: 50, suffix: '+', label: { en: 'Business Processes', fr: 'Processus métier', ar: 'عمليات الأعمال', es: 'Procesos empresariales', pt: 'Processos de negócio' } },
  { value: 16, suffix: '+', label: { en: 'Enterprise Applications', fr: 'Applications entreprise', ar: 'تطبيقات المؤسسات', es: 'Aplicaciones empresariales', pt: 'Aplicativos empresariais' } },
  { value: 100, suffix: '%', label: { en: 'Cloud Based', fr: 'Basé sur le cloud', ar: 'قائم على السحابة', es: 'Basado en la nube', pt: 'Baseado em nuvem' } },
  { value: 99.99, suffix: '%', decimals: 2, label: { en: 'Availability', fr: 'Disponibilité', ar: 'التوافر', es: 'Disponibilidad', pt: 'Disponibilidade' } },
  { value: 24, suffix: '/7', label: { en: 'Support', fr: 'Support', ar: 'الدعم', es: 'Soporte', pt: 'Suporte' } },
  { value: 100, suffix: '%', label: { en: 'Unlimited Businesses', fr: 'Entreprises illimitées', ar: 'شركات غير محدودة', es: 'Empresas ilimitadas', pt: 'Empresas ilimitadas' } },
];

const renderLabel = (stat: Stat, lang: Lang) => stat.label[lang];

export default function Stats() {
  const { t, lang } = useLang();
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="relative py-20 sm:py-24 bg-gradient-to-br from-liafrik-700 via-liafrik-600 to-liafrik-500 overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
      <div aria-hidden className="absolute -top-20 left-1/3 h-60 w-60 rounded-full bg-cyanx-400/30 blur-3xl animate-blob" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">{t('stats.title')}</h2>
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
              <div className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums">
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
