import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Check } from 'lucide-react';
import type { Sector, Product } from '@/data/products';
import { sectors, products, getProductBySlug } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import AppLogo from '@/components/AppLogo';
import { cn } from '@/lib/cn';

export default function BuildYourStack() {
  const { t, lang } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeSector: Sector | null = sectors.find((s) => s.id === activeId) ?? null;
  const selectedProducts: Product[] = activeSector
    ? activeSector.productSlugs.map(getProductBySlug).filter((p): p is Product => Boolean(p))
    : [];

  return (
    <section id="build" className="relative py-20 sm:py-28 overflow-hidden">
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-liafrik-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('stack.tag')} title={t('stack.title')} subtitle={t('stack.sub')} />

        {/* Sector selector */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            const active = activeId === sector.id;
            return (
              <motion.button
                key={sector.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveId(active ? null : sector.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all border',
                  active
                    ? 'bg-liafrik-600 text-white border-liafrik-600 shadow-glow-blue'
                    : 'bg-white text-ink-soft border-cloud-200 hover:border-liafrik-300 hover:bg-liafrik-50'
                )}
              >
                <Icon className="h-4 w-4" />
                {sector.name[lang]}
              </motion.button>
            );
          })}
        </div>

        {/* Visualization */}
        <div className="mt-12 grid lg:grid-cols-5 gap-6 items-center">
          {/* Hub + orbiting modules */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-br from-cloud-50 to-cloud-100 border border-cloud-200 p-6 sm:p-10 min-h-[360px] flex items-center justify-center overflow-hidden">
              <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-30" />

              {!activeSector ? (
                <div className="relative text-center max-w-sm">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="mx-auto grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white shadow-glow-blue mb-4"
                  >
                    <Sparkles className="h-7 w-7" />
                  </motion.div>
                  <p className="text-sm text-ink-muted">{t('stack.empty')}</p>
                </div>
              ) : (
                <StackOrbit products={selectedProducts} />
              )}
            </div>
          </div>

          {/* Summary panel */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {activeSector ? (
                <motion.div
                  key={activeSector.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl bg-white border border-cloud-200 shadow-premium p-6"
                >
                  <div className="flex items-center gap-2 text-liafrik-700">
                    <Zap className="h-4 w-4" />
                    <p className="text-xs font-bold uppercase tracking-wider">{t('stack.summary')}</p>
                  </div>
                  <p className="mt-2 font-display text-lg font-bold text-ink">{activeSector.name[lang]}</p>

                  <ul className="mt-4 space-y-2.5">
                    {selectedProducts.map((p, i) => (
                      <motion.li
                        key={p.slug}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex items-center gap-3 rounded-2xl bg-cloud-50 border border-cloud-200 px-3.5 py-2.5"
                      >
                        <AppLogo product={p} className="h-8 w-8 shrink-0" iconClassName="h-4 w-4" rounded="rounded-xl" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-ink leading-tight">{p.name}</p>
                          <p className="text-[11px] text-ink-light truncate">{p.tagline[lang]}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                          <Check className="h-3 w-3" /> {t('stack.added')}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-cloud-200">
                    <p className="text-xs text-ink-light mb-3">{selectedProducts.length} {t('stack.modules')}</p>
                    <div className="flex flex-wrap gap-2.5">
                      <LinkButton to="/products" variant="primary" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
                        {t('stack.start')}
                      </LinkButton>
                      <LinkButton to="/support" variant="outline" size="md">
                        {t('stack.demo')}
                      </LinkButton>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-3xl bg-white/60 border border-dashed border-cloud-300 p-6 text-center"
                >
                  <p className="text-sm text-ink-light">{t('stack.empty')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackOrbit({ products: mods }: { products: Product[] }) {
  const { lang } = useLang();
  const count = mods.length;
  const radius = 120;

  return (
    <div className="relative grid place-items-center w-full max-w-[300px] mx-auto" style={{ height: 300 }}>
      {/* connection rings */}
      <motion.div
        className="absolute rounded-full border-2 border-liafrik-200/50"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-liafrik-400" />
      </motion.div>

      {/* connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
        {mods.map((_, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
          const x2 = 150 + Math.cos(angle) * radius;
          const y2 = 150 + Math.sin(angle) * radius;
          return (
            <motion.line
              key={i}
              x1="150" y1="150" x2={x2} y2={y2}
              stroke="#0070E0" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
            />
          );
        })}
      </svg>

      {/* Central hub */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative z-10 grid place-items-center h-20 w-20 rounded-2xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 text-white shadow-glow-blue"
      >
        <span className="font-display font-bold text-xl leading-none">LiAfrik</span>
        <motion.span
          className="absolute inset-0 rounded-2xl border-2 border-liafrik-300"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Orbiting modules */}
      {mods.map((p, i) => {
        const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <motion.div
            key={p.slug}
            className="absolute z-10"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ x, y, opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200, damping: 16 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              className="flex flex-col items-center gap-1.5"
            >
              <AppLogo product={p} className="h-12 w-12 shadow-glow-blue" iconClassName="h-5 w-5" rounded="rounded-2xl" />
              <span className="text-[10px] font-semibold text-ink-soft bg-white/90 rounded-full px-2 py-0.5 shadow-card whitespace-nowrap">
                {p.name}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
