import { useState, useMemo } from 'react';
import { Link } from '@/components/Link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Clock, Check, Search } from 'lucide-react';
import { products, type Product } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';
import Logo from '@/components/Logo';
import AppLogo from '@/components/AppLogo';
import SectionHeading from '@/components/SectionHeading';
import { cn } from '@/lib/cn';
import { useSEO } from '@/lib/useSEO';

type CategoryFilter = 'all' | 'business' | 'industry' | 'education' | 'community';

const categoryMap: Record<CategoryFilter, string[]> = {
  all: [],
  business: ['pos', 'sellia', 'crm', 'libooks', 'faka', 'atlas'],
  industry: ['health', 'bailly', 'nutro', 'zando', 'litrek'],
  education: ['klasoo', 'skills'],
  community: ['kolo', 'mafo'],
};

export default function ProductsPage() {
  const { t, lang } = useLang();
  useSEO({
    title: lang === 'en'
      ? 'All Products — LiAfrik SaaS Ecosystem'
      : 'Tous les produits — Écosystème SaaS LiAfrik',
    description: lang === 'en'
      ? 'Explore every LiAfrik app: POS, Sellia, CRM, Atlas, Faka, Klasoo, Nutro, Health, Bailly, Kolo, Skills, Mafo, LiBooks, Zando, Litrek — one connected ecosystem, built for the world.'
      : "Découvrez toutes les applications LiAfrik : POS, Sellia, CRM, Atlas, Faka, Klasoo, Nutro, Health, Bailly, Kolo, Skills, Mafo, LiBooks, Zando, Litrek — un écosystème connecté, pensé pour le monde entier.",
  });
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = products;
    if (filter !== 'all') {
      const slugs = categoryMap[filter];
      list = list.filter((p) => slugs.includes(p.slug));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline[lang].toLowerCase().includes(q) ||
        p.category[lang].toLowerCase().includes(q),
      );
    }
    return list;
  }, [filter, query, lang]);

  const filters: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: t('products.filterAll') },
    { id: 'business', label: t('products.category.business') },
    { id: 'industry', label: t('products.category.industry') },
    { id: 'education', label: t('products.category.education') },
    { id: 'community', label: t('products.category.community') },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen bg-gradient-to-b from-cloud-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          tag={t('products.tag')}
          title={t('products.title')}
          subtitle={t('products.sub')}
        />

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-all border',
                  filter === f.id
                    ? 'bg-liafrik-600 text-white border-liafrik-600 shadow-glow-blue'
                    : 'bg-white text-ink-soft border-cloud-200 hover:border-liafrik-300 hover:bg-liafrik-50',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-light" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search platforms...' : 'Rechercher...'}
              className="w-full rounded-full border border-cloud-200 bg-white pl-9 pr-4 py-2.5 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:ring-2 focus:ring-liafrik-100 outline-none transition-all"
            />
          </div>
        </div>

        <motion.div layout className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-ink-light">
            {lang === 'en' ? 'No platforms found. Try a different search.' : 'Aucune plateforme trouvée. Essayez une autre recherche.'}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-liafrik-700 hover:text-liafrik-800 transition-colors">
            <Logo size="sm" />
            {lang === 'en' ? 'Back to home' : "Retour à l'accueil"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { t, lang } = useLang();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-3xl bg-white border border-cloud-200 p-5 shadow-card hover:shadow-float transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <AppLogo product={product} className="h-12 w-12" iconClassName="h-6 w-6" rounded="rounded-2xl" />
        {product.available ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 border border-emerald-100">
            <Check className="h-3 w-3" /> {t('products.available')}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 border border-amber-100">
            <Clock className="h-3 w-3" /> {t('products.comingSoon')}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display font-bold text-lg text-ink leading-tight">{product.name}</h3>
      <p className="text-[11px] font-medium text-ink-light uppercase tracking-wider mt-0.5">{product.category[lang]}</p>
      <p className="mt-2.5 text-sm text-ink-muted leading-relaxed line-clamp-2 flex-1">{product.tagline[lang]}</p>

      <div className="mt-4 pt-4 border-t border-cloud-200 flex items-center justify-between">
        {product.appUrl && product.available ? (
          <a
            href={product.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-liafrik-700 hover:text-liafrik-800 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" /> {t('products.launch')}
          </a>
        ) : (
          <span className="text-xs text-ink-light">{lang === 'en' ? 'Explore plans' : 'Voir les offres'}</span>
        )}

        <Link
          to={`/products/${product.slug}`}
          className="inline-flex items-center gap-1 rounded-full bg-liafrik-50 text-liafrik-700 text-xs font-bold px-3 py-1.5 hover:bg-liafrik-100 transition-colors"
        >
          {t('products.explore')} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
}
