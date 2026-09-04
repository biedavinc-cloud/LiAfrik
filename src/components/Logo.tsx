import { Link } from '@/components/Link';
import { motion } from 'framer-motion';

type Variant = 'color' | 'light' | 'dark';

interface LogoProps {
  className?: string;
  variant?: Variant;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { markHeight: 'h-7', text: 'text-[18px]' },
  md: { markHeight: 'h-9', text: 'text-[22px]' },
  lg: { markHeight: 'h-12', text: 'text-[28px]' },
};

export default function Logo({ className = '', variant = 'color', showText = false, size = 'md' }: LogoProps) {
  const s = sizeMap[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-ink';

  return (
    <Link to="/" className={className} aria-label="LiAfrik — home">
      <span className="flex items-center gap-2.5">
        <LogoMark variant={variant} size={size} />
        {showText && (
          <span className="flex flex-col leading-none">
            <span className={`font-display font-bold ${s.text} tracking-tight ${textColor}`}>
              LiAfrik
            </span>
          </span>
        )}
      </span>
    </Link>
  );
}

export function LogoMark({ variant = 'color', size = 'md' }: { variant?: Variant; size?: 'sm' | 'md' | 'lg' }) {
  const s = sizeMap[size];

  // On dark backgrounds ('light' variant), invert the mark so the dark
  // linework reads as white. On white/light backgrounds it renders as-is.
  const imgFilter = variant === 'light' ? 'invert(1) brightness(1.15)' : 'none';

  return (
    <motion.span
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      className={`relative grid place-items-center ${s.markHeight}`}
    >
      {/*
        LiAfrik logo mark — full lockup (icon + wordmark), used as designed.
        TO REPLACE: swap the file at
        public/images/brand/liafrik-logo.png with your own image
        (same filename) — no code change needed.
      */}
      <img
        src="/images/brand/liafrik-logo.png"
        alt="LiAfrik"
        className="h-full w-auto object-contain"
        style={{ filter: imgFilter }}
      />
    </motion.span>
  );
}

export function LogoWordmark({ variant = 'color' }: { variant?: Variant }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink';
  return (
    <span className={`font-display font-bold text-2xl tracking-tight ${textColor}`}>
      LiAfrik
    </span>
  );
}
