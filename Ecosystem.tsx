import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';
import SectionHeading from '@/components/SectionHeading';
import AppLogo from '@/components/AppLogo';
import { cn } from '@/lib/cn';

export default function Ecosystem() {
  const { t, lang } = useLang();

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

        {/* Odoo-style apps grid — one tile per app, logo-first */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {products.map((product, i) => (
            <AppTile key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AppTile({ product, index }: { product: Product; index: number }) {
  const { t, lang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group relative flex flex-col items-center text-center gap-3 rounded-2xl border border-cloud-200 bg-white p-5 shadow-card hover:shadow-float hover:border-liafrik-300 hover:-translate-y-1 transition-all duration-300"
      >
        {!product.available && (
          <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 border border-amber-100">
            <Clock className="h-2.5 w-2.5" />
          </span>
        )}

        <AppLogo
          product={product}
          className="h-16 w-16 sm:h-[72px] sm:w-[72px]"
          iconClassName="h-7 w-7 sm:h-8 sm:w-8"
          rounded="rounded-[18px]"
        />

        <div className="min-w-0">
          <h3 className="font-display font-bold text-sm sm:text-base text-ink leading-tight truncate">{product.name}</h3>
          <p className="text-[10px] sm:text-[11px] font-medium text-ink-light uppercase tracking-wider truncate mt-0.5">
            {product.category[lang]}
          </p>
        </div>

        <span
          className={cn(
            'text-[11px] font-semibold transition-colors',
            product.available ? 'text-liafrik-700 group-hover:text-liafrik-800' : 'text-ink-light',
          )}
        >
          {product.available ? t('eco.learnMore') : t('eco.comingSoon')}
        </span>
      </Link>
    </motion.div>
  );
}
