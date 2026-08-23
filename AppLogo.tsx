import { useState } from 'react';
import type { Product } from '@/data/products';
import { cn } from '@/lib/cn';

interface AppLogoProps {
  product: Product;
  className?: string;
  iconClassName?: string;
  rounded?: string;
}

/**
 * Renders a product's logo image (from /public/images/logos/<slug>.png).
 *
 * TO CHANGE A LOGO: just replace the image file at that path with your own
 * (same filename, any of .png/.jpg/.svg/.webp works if you update the
 * `logo` path in src/data/products.ts). No other code needs to change.
 *
 * If the image is missing or fails to load, this automatically falls back
 * to the existing icon + gradient badge, so the site never breaks.
 */
export default function AppLogo({ product, className, iconClassName, rounded = 'rounded-2xl' }: AppLogoProps) {
  const [failed, setFailed] = useState(false);
  const Icon = product.icon;

  if (failed || !product.logo) {
    return (
      <span className={cn('grid place-items-center bg-gradient-to-br text-white shrink-0', rounded, product.gradient, className)}>
        <Icon className={iconClassName} strokeWidth={2.2} />
      </span>
    );
  }

  return (
    <span className={cn('grid place-items-center bg-white shrink-0 overflow-hidden border border-cloud-200', rounded, className)}>
      <img
        src={product.logo}
        alt={`${product.name} logo`}
        className="h-full w-full object-contain p-1.5"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
