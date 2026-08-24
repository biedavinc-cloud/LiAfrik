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
  sm: { box: 'h-7 w-7', icon: 'h-4 w-4', text: 'text-[18px]' },
  md: { box: 'h-9 w-9', icon: 'h-5 w-5', text: 'text-[22px]' },
  lg: { box: 'h-12 w-12', icon: 'h-7 w-7', text: 'text-[28px]' },
};

export default function Logo({ className = '', variant = 'color', showText = true, size = 'md' }: LogoProps) {
  const s = sizeMap[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-ink';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-ink-light';

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
  const glow = variant === 'color' ? 'shadow-glow-blue' : '';

  // On dark backgrounds ('light' variant), invert the mark so the black
  // linework reads as white. On white/light backgrounds it renders as-is.
  const imgFilter = variant === 'light' ? 'invert(1) brightness(1.15)' : 'none';

  return (
    <motion.span
      whileHover={{ rotate: 6, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      className={`relative grid place-items-center ${s.box} rounded-full overflow-hidden bg-white ${glow}`}
    >
      {/*
        LiAfrik logo mark.
        TO REPLACE: swap the file at
        public/images/brand/liafrik-logo.png with your own image
        (same filename) — no code change needed.
      */}
      <img
        src="/images/brand/liafrik-logo.png"
        alt="LiAfrik"
        className="h-full w-full object-contain"
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
