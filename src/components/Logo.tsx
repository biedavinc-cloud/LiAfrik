import { Link } from '@/components/Link';
import { motion } from 'framer-motion';

type Variant = 'color' | 'light' | 'dark';

interface LogoProps {
  className?: string;
  variant?: Variant;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Fixed box (height + width) for every size, derived from the logo's own
// aspect ratio (767x160 ≈ 4.79:1). Both axes are pinned explicitly so the
// mark can never inflate beyond its intended footprint, regardless of the
// surrounding flex/grid context.
const sizeMap = {
  sm: { markHeight: 'h-5', markWidth: 'w-[96px]', text: 'text-[18px]' },
  md: { markHeight: 'h-6 sm:h-7', markWidth: 'w-[115px] sm:w-[134px]', text: 'text-[22px]' },
  lg: { markHeight: 'h-9', markWidth: 'w-[173px]', text: 'text-[28px]' },
};

export default function Logo({ className = '', variant = 'color', showText = false, size = 'md' }: LogoProps) {
  const s = sizeMap[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-ink';

  return (
    <Link to="/" className={`${className ?? ''} py-2 -my-2`} aria-label="Liafrik — home">
      <span className="flex items-center gap-2.5">
        <LogoMark variant={variant} size={size} />
        {showText && (
          <span className="flex flex-col leading-none">
            <span className={`font-display font-bold ${s.text} tracking-tight ${textColor}`}>
              Liafrik
            </span>
          </span>
        )}
      </span>
    </Link>
  );
}

export function LogoMark({ variant = 'color', size = 'md' }: { variant?: Variant; size?: 'sm' | 'md' | 'lg' }) {
  const s = sizeMap[size];

  // On dark backgrounds ('light' variant), use the white version of the
  // wordmark (orange accents preserved). Otherwise the official navy one.
  const logoSrc = variant === 'light'
    ? '/images/brand/liafrik-wordmark-light.png'
    : '/images/brand/liafrik-wordmark.png';

  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      className={`relative grid place-items-center shrink-0 overflow-hidden ${s.markHeight} ${s.markWidth}`}
    >
      {/*
        Liafrik official wordmark. The full lockup with the tagline is available
        at public/images/brand/liafrik-lockup.png.
        TO REPLACE: swap the file at
        public/images/brand/liafrik-wordmark.png with your own image
        (same filename) — no code change needed. Note: the box above is
        pinned to a fixed height AND width per size (see sizeMap) so the
        mark can't overflow its slot; if you swap in an image with a very
        different aspect ratio, adjust markWidth to match.
      */}
      <img
        src={logoSrc}
        alt="Liafrik"
        className="max-h-full max-w-full w-auto h-auto object-contain"
      />
    </motion.span>
  );
}

export function LogoWordmark({ variant = 'color' }: { variant?: Variant }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink';
  return (
    <span className={`font-display font-bold text-2xl tracking-tight ${textColor}`}>
      Liafrik
    </span>
  );
}
