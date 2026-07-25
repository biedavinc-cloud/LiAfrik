import { Link } from 'react-router-dom';
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
            <span className={`font-display font-extrabold ${s.text} tracking-tight ${textColor}`}>
              Li<span className="text-gradient-blue">Afrik</span>
            </span>
          </span>
        )}
      </span>
    </Link>
  );
}

export function LogoMark({ variant = 'color', size = 'md' }: { variant?: Variant; size?: 'sm' | 'md' | 'lg' }) {
  const s = sizeMap[size];

  const fillStart = variant === 'color' ? '#0070E0' : variant === 'light' ? '#FFFFFF' : '#0F172A';
  const fillEnd = variant === 'color' ? '#00BFE0' : variant === 'light' ? '#EAF4FF' : '#1E293B';
  const strokeColor = variant === 'color' ? '#FFFFFF' : variant === 'light' ? '#0070E0' : '#0070E0';
  const glow = variant === 'color' ? 'shadow-glow-blue' : '';

  return (
    <motion.span
      whileHover={{ rotate: 6, scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      className={`relative grid place-items-center ${s.box} rounded-[10px] overflow-hidden ${glow}`}
      style={{ background: variant === 'color' ? undefined : variant === 'light' ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.06)' }}
    >
      {variant === 'color' && (
        <span className="absolute inset-0 bg-gradient-to-br from-liafrik-600 to-cyanx-500" />
      )}
      <svg viewBox="0 0 32 32" className={`relative ${s.icon} z-10`} fill="none">
        <defs>
          <linearGradient id="lm-grad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor={fillStart} />
            <stop offset="100%" stopColor={fillEnd} />
          </linearGradient>
        </defs>
        {/* Network hub — central node with radiating connections forming an "L" + African geometric accent */}
        <circle cx="16" cy="16" r="3.2" fill={strokeColor} />
        {/* Connection lines forming interconnected nodes */}
        <g stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" opacity={variant === 'color' ? 0.9 : 0.8}>
          <path d="M16 12.8 L16 7" />
          <path d="M16 19.2 L16 25" />
          <path d="M12.8 16 L7 16" />
          <path d="M19.2 16 L25 16" />
          <path d="M13.7 13.7 L9.5 9.5" />
          <path d="M18.3 18.3 L22.5 22.5" />
        </g>
        {/* Outer nodes — the ecosystem modules */}
        <g fill={strokeColor}>
          <circle cx="16" cy="6.5" r="1.8" />
          <circle cx="25.5" cy="16" r="1.8" />
          <circle cx="16" cy="25.5" r="1.8" />
          <circle cx="6.5" cy="16" r="1.8" />
          <circle cx="9" cy="9" r="1.4" opacity="0.7" />
          <circle cx="23" cy="23" r="1.4" opacity="0.7" />
        </g>
        {/* Accent arc — subtle nod to African geometric patterns */}
        <path d="M16 2.5 A13.5 13.5 0 0 1 29.5 16" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" fill="none" />
      </svg>
    </motion.span>
  );
}

export function LogoWordmark({ variant = 'color' }: { variant?: Variant }) {
  const textColor = variant === 'light' ? 'text-white' : 'text-ink';
  return (
    <span className={`font-display font-extrabold text-2xl tracking-tight ${textColor}`}>
      Li<span className="text-gradient-blue">Afrik</span>
    </span>
  );
}
