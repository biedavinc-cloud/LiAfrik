import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

function classes(variant: Variant, size: Size, className?: string) {
  const base = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-spring select-none whitespace-nowrap';
  const sizes: Record<Size, string> = {
    sm: 'text-sm px-4 py-2',
    md: 'text-[15px] px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  };
  const variants: Record<Variant, string> = {
    primary: 'text-white bg-liafrik-600 hover:bg-liafrik-700 shadow-premium hover:shadow-glow-blue hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'text-liafrik-700 bg-liafrik-50 hover:bg-liafrik-100 hover:-translate-y-0.5 active:translate-y-0',
    ghost: 'text-ink-soft hover:text-liafrik-700 hover:bg-liafrik-50',
    white: 'text-liafrik-700 bg-white hover:bg-cloud-50 shadow-card hover:shadow-float hover:-translate-y-0.5',
    outline: 'text-liafrik-700 border border-liafrik-200 hover:border-liafrik-400 hover:bg-liafrik-50 hover:-translate-y-0.5',
  };
  return cn(base, sizes[size], variants[variant], className);
}

interface LinkProps extends BaseProps {
  to: string;
  external?: false;
}
interface AnchorProps extends BaseProps {
  href: string;
  external: true;
}
interface ButtonProps extends BaseProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const motionProps = {
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
};

export function Button({ children, variant = 'primary', size = 'md', className, icon, iconRight, onClick, type = 'button', disabled }: ButtonProps) {
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} className={cn(classes(variant, size, className), disabled && 'opacity-60 cursor-not-allowed pointer-events-none')} {...motionProps}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </motion.button>
  );
}

export function LinkButton({ children, variant = 'primary', size = 'md', className, icon, iconRight, to }: LinkProps) {
  return (
    <motion.div {...motionProps} className="inline-block">
      <Link to={to} className={classes(variant, size, className)}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </Link>
    </motion.div>
  );
}

export function AnchorButton({ children, variant = 'primary', size = 'md', className, icon, iconRight, href }: AnchorProps) {
  return (
    <motion.a href={href} target="_blank" rel="noopener noreferrer" className={classes(variant, size, className)} {...motionProps}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </motion.a>
  );
}
