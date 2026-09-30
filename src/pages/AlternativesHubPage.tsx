import { ArrowRight } from 'lucide-react';
import { Link } from '@/components/Link';
import { products } from '@/data/products';
import { alternativesHub } from '@/lib/seoCopy';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function AlternativesHubPage() {
  const { lang } = useLang();
  const hub = alternativesHub(products, lang);
  useSEO({ title: hub.title, description: hub.description });

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div aria-hidden className="absolute inset-0 bg-radial-blue" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink leading-tight">{hub.h1}</h1>
          <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed">{hub.description}</p>
        </div>
      </section>
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 grid sm:grid-cols-2 gap-5">
          {hub.groups.map((g) => (
            <div key={g.product} className="rounded-3xl bg-white border border-cloud-200 p-6 shadow-card">
              <h2 className="font-display font-bold text-lg text-ink">{g.heading}</h2>
              <ul className="mt-4 space-y-1">
                {g.links.map((l) => (
                  <li key={l.slug}>
                    <Link
                      to={`/alternatives/${l.slug}`}
                      className="group flex items-center justify-between gap-3 py-2 text-liafrik-700 font-semibold hover:text-liafrik-800"
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
