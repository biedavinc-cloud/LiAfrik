import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck, TrendingUp } from 'lucide-react';
import { LinkButton } from '@/components/Button';
import DashboardMockup from '@/components/DashboardMockup';
import HeroBackground from '@/components/HeroBackground';
import { useLang, pick } from '@/i18n/LanguageContext';
import { posProductDashboard } from '@/data/heroDashboard';

export default function Hero() {
  const { t, lang } = useLang();

  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
      {/* Animated tech background */}
      <HeroBackground />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* Centered text block */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-liafrik-100 px-3.5 py-1.5 text-xs font-semibold text-liafrik-700 shadow-card"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t('hero.trust')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-4xl sm:text-5xl lg:text-[58px] xl:text-[64px] font-bold leading-[1.08] tracking-tight text-ink max-w-4xl"
          >
            {t('hero.headline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl"
          >
            {t('hero.sub1')}{' '}
            <span className="text-ink-soft font-medium">{t('hero.sub2')}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <LinkButton to="/products" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              {t('hero.cta.start')}
            </LinkButton>
            <LinkButton to="/#ecosystem" variant="white" size="lg" icon={<Play className="h-4 w-4" />}>
              {t('hero.cta.ecosystem') ?? t('hero.cta.demo')}
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-light"
          >
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-liafrik-600" /> {pick(lang, { en: 'Bank-grade security', fr: 'Sécurité niveau bancaire', ar: 'أمان بمستوى مصرفي', es: 'Seguridad de nivel bancario', pt: 'Segurança de nível bancário' })}</span>
            <span className="inline-flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-liafrik-600" /> 99.99% uptime</span>
          </motion.div>
        </div>
      </div>

      {/* Full-width animated dashboard mockup, below the text — same treatment
          PayUnit uses for its hero product shot. */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 mt-14 lg:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative perspective-2000"
        >
          {/* Ambient glow behind the mockup */}
          <div aria-hidden className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-b from-liafrik-200/40 via-cyanx-200/20 to-transparent blur-3xl -z-10" />

          {/* Clipped to roughly half height — a "peek" of the dashboard
              rather than the full mockup, so it doesn't eat vertical space.
              Same float animation as before, just cropped + faded out. */}
          <div className="relative overflow-hidden rounded-t-2xl max-h-[220px] sm:max-h-[260px] lg:max-h-[300px]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <DashboardMockup
                spec={posProductDashboard}
                productName="POS"
                accent="#0070E0"
                variant="hero"
              />
            </motion.div>

            {/* Fade-out mask at the bottom, into the page background */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-b from-transparent to-[#F7F9FC]" />
          </div>

          {/* Floating notification cards */}
          <FloatingNotifications />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingNotifications() {
  const { lang } = useLang();
  const cards = [
    { icon: TrendingUp, label: pick(lang, { en: 'New order', fr: 'Nouvelle commande', ar: 'طلب جديد', es: 'Nuevo pedido', pt: 'Novo pedido' }), value: '+$1,240', color: 'from-liafrik-500 to-cyanx-500', delay: 0, x: '-left-4 sm:-left-10 lg:-left-16', top: 'top-4 sm:top-8' },
    { icon: Sparkles, label: pick(lang, { en: 'AI insight', fr: 'Insight IA', ar: 'رؤية ذكاء اصطناعي', es: 'Información de IA', pt: 'Insight de IA' }), value: pick(lang, { en: 'Restock soon', fr: 'Réappro bientôt', ar: 'إعادة التخزين قريباً', es: 'Reponer pronto', pt: 'Reabastecer em breve' }), color: 'from-cyanx-500 to-liafrik-500', delay: 1.4, x: '-right-2 sm:-right-8 lg:-right-14', top: 'top-1/3' },
    { icon: ShieldCheck, label: pick(lang, { en: 'Backup done', fr: 'Sauvegarde ok', ar: 'تم النسخ الاحتياطي', es: 'Copia de seguridad lista', pt: 'Backup concluído' }), value: pick(lang, { en: 'All data synced', fr: 'Données synchronisées', ar: 'تمت مزامنة جميع البيانات', es: 'Todos los datos sincronizados', pt: 'Todos os dados sincronizados' }), color: 'from-liafrik-600 to-liafrik-400', delay: 2.6, x: '-left-2 sm:-left-6 lg:-left-10', top: 'bottom-6 sm:bottom-10' },
  ];
  return (
    <>
      {cards.map((c, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2 + i * 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${c.x} ${c.top} hidden sm:flex z-10`}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
            className="flex items-center gap-2.5 rounded-2xl glass-card px-3.5 py-2.5"
          >
            <span className={`grid place-items-center h-8 w-8 rounded-xl bg-gradient-to-br ${c.color} text-white`}>
              <c.icon className="h-4 w-4" />
            </span>
            <div className="pr-1">
              <p className="text-[11px] font-semibold text-ink-soft leading-tight">{c.label}</p>
              <p className="text-[10px] text-ink-light leading-tight">{c.value}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
