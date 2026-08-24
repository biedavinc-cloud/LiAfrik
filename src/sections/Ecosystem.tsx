import { Link } from '@/components/Link';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';
import SectionHeading from '@/components/SectionHeading';
import AppLogo from '@/components/AppLogo';

export default function Ecosystem() {
  const { t, lang } = useLang();

  return (
    <section id="ecosystem" className="relative py-20 sm:py-28 overflow-hidden">
      <div aria-hidden className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-liafrik-200/30 blur-3xl animate-blob" />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyanx-400/20 blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          tag={lang === 'en' ? 'The Ecosystem' : "L'écosystème"}
          title={<span className="text-gradient-blue-strong">{t('eco.title')}</span>}
          subtitle={t('eco.sub')}
        />

        {/* Odoo-style apps grid — bare icon tiles, no card chrome */}
        <div className="mt-14 sm:mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10">
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.35), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group flex flex-col items-center text-center gap-2.5"
      >
        <div className="relative">
          <AppLogo
            product={product}
            className="h-16 w-16 sm:h-[70px] sm:w-[70px] shadow-card group-hover:shadow-float group-hover:-translate-y-1 transition-all duration-300"
            iconClassName="h-7 w-7 sm:h-8 sm:w-8"
            rounded="rounded-2xl"
          />
          {!product.available && (
            <span className="absolute -top-1.5 -right-1.5 rounded-full bg-amber-400 h-4 w-4 grid place-items-center border-2 border-white shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-display font-bold text-[13px] sm:text-sm text-ink leading-tight truncate max-w-[92px] sm:max-w-[100px] group-hover:text-liafrik-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] text-ink-light truncate max-w-[92px] sm:max-w-[100px] mt-0.5">
            {product.available ? product.category[lang] : t('eco.comingSoon')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
