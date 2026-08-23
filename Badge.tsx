import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
  tone?: 'blue' | 'amber' | 'slate';
  icon?: ReactNode;
}

const tones = {
  blue: 'bg-liafrik-50 text-liafrik-700 border-liafrik-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  slate: 'bg-cloud-200 text-ink-soft border-cloud-300',
};

export default function Badge({ children, className, tone = 'blue', icon }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        tones[tone],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}
