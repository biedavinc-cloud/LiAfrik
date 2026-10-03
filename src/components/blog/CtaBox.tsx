import { ArrowRight, ExternalLink, Bell } from 'lucide-react';
import { AnchorButton, LinkButton } from '@/components/Button';
import AppLogo from '@/components/AppLogo';
import type { Product } from '@/data/products';
import type { BlogLang } from '@/data/blog';
import { UI } from './blogUi';

/** Call-to-action box. Buttons depend on whether the product is live or coming soon. */
export default function CtaBox({ title, text, product, lang }: { title: string; text: string; product: Product; lang: BlogLang }) {
  const ui = UI[lang];
  const live = product.available && !!product.appUrl;
  return (
    <aside className="not-prose my-10 overflow-hidden rounded-3xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 p-6 text-white shadow-glow-blue sm:p-8">
      <div className="flex items-start gap-4">
        <AppLogo product={product} className="h-12 w-12 shrink-0" iconClassName="h-6 w-6" rounded="rounded-2xl" />
        <div>
          <p className="font-display text-xl font-bold leading-snug sm:text-2xl">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-liafrik-100 sm:text-base">{text}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {live ? (
          <>
            <AnchorButton href={product.appUrl!} external variant="white" size="md" icon={<ExternalLink className="h-4 w-4" />}>
              {ui.tryApp} {product.name}
            </AnchorButton>
            <LinkButton to={`/products/${product.slug}`} variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4 rtl:rotate-180" />} className="!border-white/40 !text-white hover:!bg-white/10">
              {ui.seePlans}
            </LinkButton>
          </>
        ) : (
          <>
            <LinkButton to={`/products/${product.slug}`} variant="white" size="md" icon={<Bell className="h-4 w-4" />}>
              {ui.notify}
            </LinkButton>
            <LinkButton to="/products" variant="outline" size="md" className="!border-white/40 !text-white hover:!bg-white/10">
              {ui.allProducts}
            </LinkButton>
          </>
        )}
      </div>
    </aside>
  );
}
