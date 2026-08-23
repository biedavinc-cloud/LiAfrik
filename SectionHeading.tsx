import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Props {
  tag?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
  tagClassName?: string;
}

export default function SectionHeading({
  tag, title, subtitle, align = 'center', className, tagClassName,
}: Props) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={cn('flex flex-col gap-4 max-w-3xl', alignment, className)}>
      {tag && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-liafrik-700 bg-liafrik-50 border border-liafrik-100',
            tagClassName
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-liafrik-600" />
          {tag}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight leading-[1.1] text-ink"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
