import { motion } from 'framer-motion';
import { Rocket, ToggleRight, LayoutDashboard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';

interface Step {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  number: string;
}

const steps: Step[] = [
  { icon: Rocket, titleKey: 'how.step1.title', descKey: 'how.step1.desc', number: '01' },
  { icon: ToggleRight, titleKey: 'how.step2.title', descKey: 'how.step2.desc', number: '02' },
  { icon: LayoutDashboard, titleKey: 'how.step3.title', descKey: 'how.step3.desc', number: '03' },
];

export default function HowItWorks() {
  const { t } = useLang();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('how.tag')} title={t('how.title')} />

        <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-6 relative">
          {/* connector line */}
          <div aria-hidden className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-liafrik-200 via-liafrik-400 to-cyanx-400" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl bg-white border border-cloud-200 p-6 sm:p-7 shadow-card hover:shadow-float transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white shadow-glow-blue">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                  <span className="font-display text-5xl font-extrabold text-cloud-300 leading-none">{step.number}</span>
                </div>
                <h3 className="mt-5 font-display font-bold text-xl text-ink leading-tight">{t(step.titleKey)}</h3>
                <p className="mt-2.5 text-sm text-ink-muted leading-relaxed">{t(step.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
