import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';
import SectionHeading from '@/components/SectionHeading';
import DashboardMockup from '@/components/DashboardMockup';
import { cn } from '@/lib/cn';

const CARD_WIDTH = 320;
const GAP = 24;
const STRIDE = CARD_WIDTH + GAP;

export default function Ecosystem() {
  const { t, lang } = useLang();
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  const looped = [...products, ...products];
  const trackWidth = products.length * STRIDE;

  // Continuous auto-scroll via rAF (right → left)
  useEffect(() => {
    let current = x.get();
    lastRef.current = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastRef.current, 64);
      lastRef.current = now;
      if (!paused) {
        // ~40px per second
        current -= (dt / 1000) * 36;
        // wrap to keep within [-trackWidth, 0)
        if (current <= -trackWidth) current += trackWidth;
        if (current > 0) current -= trackWidth;
        x.set(current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, trackWidth, x]);

  const onDragStart = () => { lastRef.current = performance.now(); };
  const onDrag = () => {
    // While dragging, sync `current` baseline so auto-scroll resumes smoothly
  };
  const onDragEnd = () => {
    let cur = x.get();
    if (cur <= -trackWidth) cur += trackWidth;
    if (cur > 0) cur -= trackWidth;
    x.set(cur);
  };

  return (
    <section id="ecosystem" className="relative py-20 sm:py-28 overflow-hidden">
      <div aria-hidden className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-liafrik-200/30 blur-3xl animate-blob" />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyanx-400/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          tag={lang === 'en' ? 'The Ecosystem' : "L'écosystème"}
          title={<span className="text-gradient-blue-strong">{t('eco.title')}</span>}
          subtitle={t('eco.sub')}
        />
      </div>

      <div
        className="relative mt-12 sm:mt-16 perspective-2000"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <motion.div
          className="flex gap-6 will-change-transform cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -trackWidth, right: trackWidth }}
          dragElastic={0.12}
          dragMomentum={false}
        >
          {looped.map((product, i) => (
            <ProductCard key={`${product.slug}-${i}`} product={product} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent" />
      </div>

      <div className="mt-10 flex justify-center">
        <span className="inline-flex items-center gap-2 text-xs text-ink-light">
          <span className="h-1.5 w-1.5 rounded-full bg-liafrik-400 animate-pulse" />
          {t('eco.drag')}
        </span>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useLang();
  const Icon = product.icon;

  return (
    <motion.div
      className="group relative shrink-0 w-[300px] sm:w-[340px] self-stretch"
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ y: -10, rotateY: 4, rotateX: -2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="relative rounded-3xl glass-card-strong overflow-hidden flex flex-col h-full">
        <div className="relative p-5 pb-3 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className={cn('grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br text-white shadow-glow-blue shrink-0', product.gradient)}>
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-lg text-ink leading-tight truncate">{product.name}</h3>
                <p className="text-[11px] font-medium text-ink-light uppercase tracking-wider truncate">{product.category[lang]}</p>
              </div>
            </div>
            {product.available ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 border border-amber-100">
                <Clock className="h-3 w-3" /> {t('eco.comingSoon')}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm text-ink-muted leading-relaxed line-clamp-2 min-h-[40px]">
            {product.tagline[lang]}
          </p>
        </div>

        <div className="px-4 pb-3 shrink-0">
          <DashboardMockup spec={product.dashboard} compact productName={product.name} accent={product.accent} />
        </div>

        <div className="px-5 pb-5 pt-1 mt-auto">
          <p className="text-[11px] font-semibold text-ink-light uppercase tracking-wider mb-2">{t('eco.features')}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.features.slice(0, 3).map((f, i) => (
              <span key={i} className="rounded-full bg-cloud-100 border border-cloud-200 px-2.5 py-1 text-[11px] font-medium text-ink-soft">
                {f[lang]}
              </span>
            ))}
          </div>

          <Link
            to={`/products/${product.slug}`}
            className={cn(
              'group/btn inline-flex items-center justify-center gap-1.5 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition-all',
              product.available
                ? 'bg-liafrik-600 text-white hover:bg-liafrik-700 shadow-card hover:shadow-glow-blue'
                : 'bg-liafrik-50 text-liafrik-700 border border-liafrik-100 hover:bg-liafrik-100'
            )}
          >
            {product.available ? t('eco.learnMore') : t('eco.notify')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>

        <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-liafrik-300/50" />
      </div>
    </motion.div>
  );
}
