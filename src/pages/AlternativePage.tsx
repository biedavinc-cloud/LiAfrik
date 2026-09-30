import { useParams } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from '@/components/Link';
import { LinkButton, AnchorButton } from '@/components/Button';
import AppLogo from '@/components/AppLogo';
import { getProductBySlug } from '@/data/products';
import { getAlternative } from '@/data/alternatives';
import { alternativePage } from '@/lib/seoCopy';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';
import NotFound from '@/pages/NotFound';

export default function AlternativePage() {
  const { slug = '' } = useParams();
  const { lang } = useLang();
  const alt = getAlternative(slug);
  const product = alt ? getProductBySlug(alt.product) : undefined;
  const page = alt && product ? alternativePage(alt, product, lang) : null;

  useSEO({
    title: page?.title ?? 'Liafrik',
    description: page?.description,
    noindex: !page,
  });

  if (!alt || !product || !page || !product.available) return <NotFound />;

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div aria-hidden className="absolute inset-0 bg-radial-blue" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Link to="/alternatives" className="inline-flex items-center gap-1.5 py-2 text-sm text-ink-muted hover:text-liafrik-700 transition-colors">
            {page.cta.all}
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <AppLogo product={product} className="h-12 w-12" iconClassName="h-6 w-6" rounded="rounded-2xl" />
            <span className="text-sm font-semibold uppercase tracking-wider text-ink-light">{product.category[lang]}</span>
          </div>
          <h1 className="mt-5 font-display text-3xl sm:text-5xl font-bold text-ink leading-tight">{page.h1}</h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">{page.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {product.appUrl && (
              <AnchorButton href={product.appUrl} external variant="primary" size="lg" icon={<ExternalLink className="h-4 w-4" />}>
                {page.cta.open}
              </AnchorButton>
            )}
            <LinkButton to="/support" variant="secondary" size="lg" icon={<MessageCircle className="h-4 w-4" />}>
              {page.cta.contact}
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Features + benefits */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{page.featuresH}</h2>
            <ul className="mt-4 space-y-2.5">
              {page.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-liafrik-600" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">{page.benefitsH}</h2>
            <ul className="mt-4 space-y-2.5">
              {page.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-ink-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Versus */}
      <section className="py-12 sm:py-16 bg-cloud-100/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">{page.versusH}</h2>
          <p className="mt-3 text-ink-muted leading-relaxed">{page.versusIntro}</p>
          <div className={`mt-8 grid gap-5 ${page.chooseC.length ? 'md:grid-cols-2' : ''}`}>
            {page.chooseC.length > 0 && (
              <div className="rounded-3xl bg-white border border-cloud-200 p-6 shadow-card">
                <h3 className="font-display font-bold text-lg text-ink">{page.chooseCH}</h3>
                <ul className="mt-4 space-y-2.5">
                  {page.chooseC.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-light rtl:rotate-180" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-3xl bg-white border-2 border-liafrik-600 p-6 shadow-card">
              <h3 className="font-display font-bold text-lg text-ink">{page.choosePH}</h3>
              <ul className="mt-4 space-y-2.5">
                {page.chooseP.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-ink-muted leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-liafrik-600" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-ink">{page.pricingH}</h2>
          <p className="mt-3 text-ink-muted leading-relaxed">{page.pricing}</p>
          <div className="mt-5">
            <LinkButton to={`/products/${product.slug}`} variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4 rtl:rotate-180" />}>
              {page.cta.product}
            </LinkButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-cloud-100/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">{page.faqH}</h2>
          <div className="mt-6 space-y-3">
            {page.faq.map((item) => (
              <details key={item.q} className="group rounded-2xl bg-white border border-cloud-200 px-5 py-4 open:shadow-card">
                <summary className="cursor-pointer list-none font-semibold text-ink flex items-center justify-between gap-4">
                  {item.q}
                  <span aria-hidden className="text-liafrik-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-xs text-ink-light leading-relaxed">{page.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
