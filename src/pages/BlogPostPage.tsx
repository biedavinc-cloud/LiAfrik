import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Check, Clock, Lightbulb } from 'lucide-react';
import { Link } from '@/components/Link';
import AppLogo from '@/components/AppLogo';
import NotFound from '@/pages/NotFound';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';
import { getProductBySlug } from '@/data/products';
import { getPostById, getPostBySlug, isBlogLang, readingMinutes, withBrand, type Block } from '@/data/blog';
import { slugify } from '@/lib/blogMarkup';
import BlogCard from '@/components/blog/BlogCard';
import CtaBox from '@/components/blog/CtaBox';
import RichText from '@/components/blog/RichText';
import { UI, formatDate } from '@/components/blog/blogUi';

/** Thin reading-progress bar under the navbar. */
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('blog-article');
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const total = height - window.innerHeight * 0.6;
      setPct(Math.min(100, Math.max(0, (-top / Math.max(total, 1)) * 100)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div className="h-full bg-gradient-to-r from-liafrik-600 to-accent-500 transition-[width] duration-100" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const { lang } = useLang();
  const hit = getPostBySlug(slug);
  const blogLang = isBlogLang(lang) ? lang : 'en';
  const post = hit?.post;
  const content = post?.[blogLang];
  const product = post ? getProductBySlug(post.product) : undefined;

  useSEO({ title: content?.title ? withBrand(content.title) : 'Liafrik', description: content?.description, noindex: !post });

  if (!hit || !post || !content || !product) return <NotFound />;
  // Wrong language for this slug (or a language without the blog): go to the right URL.
  if (!isBlogLang(lang) || hit.slugLang !== lang) {
    return <Navigate to={`/${blogLang}/blog/${post[blogLang].slug}`} replace />;
  }

  const ui = UI[blogLang];
  const toc = content.blocks.filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2');
  const related = post.related.map(getPostById).filter((p): p is NonNullable<typeof p> => !!p).slice(0, 3);

  const renderBlock = (b: Block, i: number) => {
    switch (b.t) {
      case 'h2':
        return <h2 key={i} id={slugify(b.text)} className="mt-12 scroll-mt-28 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">{b.text}</h2>;
      case 'h3':
        return <h3 key={i} className="mt-8 font-display text-xl font-bold text-ink">{b.text}</h3>;
      case 'p':
        return <p key={i} className="mt-4 text-[17px] leading-8 text-ink-soft"><RichText text={b.text} lang={blogLang} /></p>;
      case 'ul':
        return (
          <ul key={i} className="mt-5 space-y-3">
            {b.items.map((it, j) => (
              <li key={j} className="flex items-start gap-3 text-[17px] leading-8 text-ink-soft">
                <span className="mt-2.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-liafrik-50 text-liafrik-600"><Check className="h-3 w-3" strokeWidth={3} /></span>
                <span><RichText text={it} lang={blogLang} /></span>
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={i} className="mt-5 space-y-3">
            {b.items.map((it, j) => (
              <li key={j} className="flex items-start gap-3 text-[17px] leading-8 text-ink-soft">
                <span className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-liafrik-600 text-xs font-bold text-white">{j + 1}</span>
                <span><RichText text={it} lang={blogLang} /></span>
              </li>
            ))}
          </ol>
        );
      case 'tip':
        return (
          <div key={i} className="my-8 rounded-2xl border-l-4 border-accent-500 bg-accent-50 p-5">
            <p className="flex items-center gap-2 font-bold text-ink"><Lightbulb className="h-4 w-4 text-accent-700" /> {b.title}</p>
            <p className="mt-2 text-[16px] leading-7 text-ink-soft"><RichText text={b.text} lang={blogLang} /></p>
          </div>
        );
      case 'cta':
        return <CtaBox key={i} title={b.title} text={b.text} product={product} lang={blogLang} />;
    }
  };

  return (
    <div className="pt-24">
      <ReadingProgress />
      <header className="relative overflow-hidden py-10 sm:py-14">
        <div aria-hidden className="absolute inset-0 bg-radial-blue" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
         <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-ink-light">
            <Link to="/" className="py-1 hover:text-liafrik-700">{ui.home}</Link>
            <span aria-hidden>/</span>
            <Link to="/blog" className="py-1 hover:text-liafrik-700">{ui.blog}</Link>
            <span aria-hidden>/</span>
            <span className="text-ink-muted">{content.category}</span>
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">{content.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{content.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-light">
            <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-2 rounded-full border border-cloud-200 bg-white py-1 pl-1 pr-3 font-semibold text-liafrik-700 shadow-card">
              <AppLogo product={product} className="h-7 w-7" iconClassName="h-4 w-4" rounded="rounded-full" /> {product.name}
            </Link>
            <span>{ui.team}</span>
            <time dateTime={post.date}>{formatDate(post.date, blogLang)}</time>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {readingMinutes(content)} {ui.minRead}</span>
          </div>
         </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_280px]">
        <article id="blog-article" className="min-w-0 max-w-3xl">
          {/* Mobile table of contents */}
          <details className="mb-2 rounded-2xl border border-cloud-200 bg-white p-4 lg:hidden">
            <summary className="cursor-pointer font-semibold text-ink">{ui.inThisArticle}</summary>
            <ul className="mt-3 space-y-2">
              {toc.map((h) => (
                <li key={h.text}><a href={`#${slugify(h.text)}`} className="text-sm text-liafrik-700">{h.text}</a></li>
              ))}
            </ul>
          </details>

          {content.blocks.map(renderBlock)}

          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{ui.faq}</h2>
            <div className="mt-6 space-y-3">
              {content.faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-cloud-200 bg-white px-5 py-4 open:shadow-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {f.q}
                    <span aria-hidden className="text-xl leading-none text-liafrik-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[16px] leading-7 text-ink-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border border-cloud-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-light">{ui.inThisArticle}</p>
              <ul className="mt-3 space-y-2.5">
                {toc.map((h) => (
                  <li key={h.text}><a href={`#${slugify(h.text)}`} className="text-sm leading-snug text-ink-muted transition-colors hover:text-liafrik-700">{h.text}</a></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-cloud-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-light">{ui.aboutProduct}</p>
              <div className="mt-3 flex items-center gap-3">
                <AppLogo product={product} className="h-10 w-10" iconClassName="h-5 w-5" rounded="rounded-xl" />
                <div>
                  <p className="font-display font-bold text-ink">{product.name}</p>
                  <p className="text-xs text-ink-muted">{product.tagline[blogLang]}</p>
                </div>
              </div>
              <Link to={`/products/${product.slug}`} className="mt-4 inline-flex text-sm font-semibold text-liafrik-700 hover:text-liafrik-800">{ui.discover} {product.name} →</Link>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-cloud-200 bg-cloud-100/60 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-ink">{ui.related}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <BlogCard key={r.id} post={r} lang={blogLang} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
