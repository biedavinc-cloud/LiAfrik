import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';
import { products } from '@/data/products';
import { POSTS, isBlogLang, withBrand } from '@/data/blog';
import BlogCard from '@/components/blog/BlogCard';
import { UI } from '@/components/blog/blogUi';

export default function BlogHubPage() {
  const { lang } = useLang();
  const blogLang = isBlogLang(lang) ? lang : 'en';
  const ui = UI[blogLang];
  const [filter, setFilter] = useState<string>('all');

  useSEO({ title: withBrand(ui.hubTitle), description: ui.hubIntro });

  const posts = useMemo(() => (filter === 'all' ? POSTS : POSTS.filter((p) => p.product === filter)), [filter]);

  // The blog exists in French and English only: other languages go to English.
  if (!isBlogLang(lang)) return <Navigate to="/en/blog" replace />;

  const [first, ...rest] = posts;

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div aria-hidden className="absolute inset-0 bg-radial-blue" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-cloud-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-liafrik-700 shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> {ui.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">{ui.hubTitle}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">{ui.hubIntro}</p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Product filter */}
          <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="group" aria-label="Filter by product">
            <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
              {[{ slug: 'all', name: ui.all }, ...products.filter((p) => POSTS.some((x) => x.product === p.slug)).map((p) => ({ slug: p.slug, name: p.name }))].map((f) => (
                <button
                  key={f.slug}
                  type="button"
                  aria-pressed={filter === f.slug}
                  onClick={() => setFilter(f.slug)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    filter === f.slug
                      ? 'border-liafrik-600 bg-liafrik-600 text-white'
                      : 'border-cloud-200 bg-white text-liafrik-700 hover:border-liafrik-300 hover:bg-liafrik-50'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {first && (
            <div className="mt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-light">{ui.featured}</p>
              <BlogCard post={first} lang={blogLang} featured as="h2" />
            </div>
          )}

          {rest.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <BlogCard key={p.id} post={p} lang={blogLang} as="h2" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
