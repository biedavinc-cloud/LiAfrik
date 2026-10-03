import { ArrowRight, Clock } from 'lucide-react';
import { Link } from '@/components/Link';
import AppLogo from '@/components/AppLogo';
import { getProductBySlug } from '@/data/products';
import { postPath, readingMinutes, type BlogLang, type BlogPost } from '@/data/blog';
import { UI } from './blogUi';

export default function BlogCard({ post, lang, featured = false, as: Heading = 'h3' }: { post: BlogPost; lang: BlogLang; featured?: boolean; as?: 'h2' | 'h3' }) {
  const product = getProductBySlug(post.product);
  const c = post[lang];
  const ui = UI[lang];
  if (!product) return null;
  return (
    <Link
      to={postPath(post, lang)}
      className={`group flex overflow-hidden rounded-3xl border border-cloud-200 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-premium ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}
    >
      <div
        className={`relative grid place-items-center bg-gradient-to-br from-liafrik-700 to-cyanx-500 ${featured ? 'min-h-[180px] md:min-h-full md:w-2/5' : 'h-36'}`}
      >
        <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
        <AppLogo product={product} className="relative h-16 w-16 shadow-lg" iconClassName="h-8 w-8" rounded="rounded-2xl" />
        {!product.available && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-liafrik-700">
            {ui.soon}
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-8' : 'p-6'}`}>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent-700">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" /> {c.category}
        </div>
        <Heading className={`mt-3 font-display font-bold leading-snug text-ink ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{c.title}</Heading>
        <p className={`mt-3 text-ink-muted leading-relaxed ${featured ? 'text-base' : 'line-clamp-3 text-sm'}`}>{c.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-5 text-sm">
          <span className="inline-flex items-center gap-1.5 text-ink-light">
            <Clock className="h-4 w-4" /> {readingMinutes(c)} {ui.minRead}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-liafrik-700">
            {ui.read}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </span>
        </div>
      </div>
    </Link>
  );
}
