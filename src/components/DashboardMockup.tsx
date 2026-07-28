import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Sparkles, Bell, Search } from 'lucide-react';
import type { DashboardSpec, DashboardPanel } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';
import { cn } from '@/lib/cn';

interface Props {
  spec: DashboardSpec;
  productName?: string;
  accent?: string;
  className?: string;
  compact?: boolean;
}

export default function DashboardMockup({ spec, productName, accent = '#0070E0', className = '', compact = false }: Props) {
  const { lang } = useLang();

  return (
    <div className={cn('relative w-full rounded-3xl glass-card-strong overflow-hidden', className)}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-cloud-200/70">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-light">
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{spec.title[lang]}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Bell className="h-4 w-4 text-ink-light" />
          <span className="grid place-items-center h-7 w-7 rounded-full text-white text-[11px] font-bold" style={{ background: `linear-gradient(135deg, ${accent}, #00BFE0)` }}>
            {productName ? productName.slice(0, 2).toUpperCase() : 'LA'}
          </span>
        </div>
      </div>

      <div className={cn('p-5', compact ? 'space-y-4' : 'space-y-5')}>
        {/* Hero metric */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-ink-light uppercase tracking-wider">{spec.metric.label[lang]}</p>
            <div className="mt-1 flex items-end gap-2">
              <AnimatedMetric value={spec.metric.value} accent={accent} />
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 text-xs font-bold mb-1.5 px-2 py-0.5 rounded-full',
                  spec.metric.up ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50',
                )}
              >
                {spec.metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {spec.metric.delta}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold" style={{ background: `${accent}15`, color: accent }}>
            <Sparkles className="h-3.5 w-3.5" />
            {lang === 'en' ? 'AI insight' : 'Insight IA'}
          </div>
        </div>

        {/* Panels */}
        <div className="grid gap-3 sm:grid-cols-2">
          {spec.panels.slice(0, compact ? 2 : 4).map((panel, i) => (
            <Panel key={i} panel={panel} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedMetric({ value, accent }: { value: string; accent: string }) {
  const target = numericPart(value);
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [text, setText] = useState('0');

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setText(formatLike(value, v)));
    const controls = animate(mv, target, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    const interval = setInterval(() => {
      animate(mv, target * (0.985 + Math.random() * 0.03), { duration: 1.6, ease: 'easeInOut' });
    }, 3200);
    return () => { controls.stop(); unsub(); clearInterval(interval); };
  }, [target, value, mv, rounded]);

  return (
    <motion.span
      className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums"
      style={{ color: '#0F172A' }}
    >
      {text}
    </motion.span>
  );
}

function Panel({ panel, index, accent }: { panel: DashboardPanel; index: number; accent: string }) {
  const { lang } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-white/80 border border-cloud-200 p-4 hover:border-liafrik-200 hover:shadow-card transition-all"
    >
      <p className="text-[11px] font-semibold text-ink-light uppercase tracking-wider mb-3">{panel.title[lang]}</p>
      {panel.kind === 'line' && <LineChart data={panel.data ?? []} accent={accent} />}
      {panel.kind === 'bars' && <BarsChart data={panel.data ?? []} accent={accent} />}
      {panel.kind === 'donut' && <DonutChart segments={panel.segments ?? []} />}
      {panel.kind === 'list' && <ListPanel items={panel.items ?? []} accent={accent} />}
      {panel.kind === 'stat' && <StatGrid stats={panel.stats ?? []} />}
      {panel.kind === 'progress' && <ProgressPanel progress={panel.progress ?? []} />}
    </motion.div>
  );
}

function LineChart({ data, accent }: { data: number[]; accent: string }) {
  const max = Math.max(...data, 1);
  const w = 200, h = 64;
  const stepX = w / (data.length - 1);
  const points = data.map((d, i) => [i * stepX, h - (d / max) * (h - 8) - 4]);
  const path = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const gradId = `lg-${accent.replace('#', '')}-${data.length}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={area} fill={`url(#${gradId})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
      <motion.path d={path} fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
      {points.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2.4" fill={accent}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 + i * 0.05 }} />
      ))}
    </svg>
  );
}

function BarsChart({ data, accent }: { data: number[]; accent: string }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1.5 h-16">
      {data.map((d, i) => (
        <motion.div key={i} className="flex-1 rounded-md"
          style={{ background: `linear-gradient(to top, ${accent}, ${accent}aa)` }}
          initial={{ height: 0 }} whileInView={{ height: `${(d / max) * 100}%` }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }} />
      ))}
    </div>
  );
}

function DonutChart({ segments }: { segments: { label: { en: string; fr: string }; value: number; color: string }[] }) {
  const { lang } = useLang();
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 28, c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 72 72" className="w-16 h-16 -rotate-90">
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const el = (
            <motion.circle key={i} cx="36" cy="36" r={r} fill="none" stroke={s.color} strokeWidth="9"
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset}
              initial={{ opacity: 0, strokeDasharray: `0 ${c}` }} whileInView={{ opacity: 1, strokeDasharray: `${len} ${c - len}` }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }} />
          );
          offset += len;
          return el;
        })}
        <circle cx="36" cy="36" r="22" fill="white" />
      </svg>
      <div className="space-y-1">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px] text-ink-muted">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            <span className="font-medium">{s.label[lang]}</span>
            <span className="text-ink-light">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListPanel({ items, accent }: { items: { label: { en: string; fr: string }; value: string; sub?: string }[]; accent: string }) {
  const { lang } = useLang();
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-ink-soft truncate">{it.label[lang]}</p>
            {it.sub && <p className="text-[10px] text-ink-light">{it.sub}</p>}
          </div>
          <span className="text-xs font-bold tabular-nums whitespace-nowrap" style={{ color: accent }}>{it.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

function StatGrid({ stats }: { stats: { label: { en: string; fr: string }; value: string; delta?: string; up?: boolean }[] }) {
  const { lang } = useLang();
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          className="rounded-xl bg-cloud-50 p-2.5">
          <p className="text-[10px] text-ink-light uppercase tracking-wide">{s.label[lang]}</p>
          <p className="text-base font-bold text-ink mt-0.5">{s.value}</p>
          {s.delta && <p className={cn('text-[10px] font-semibold', s.up ? 'text-emerald-600' : 'text-rose-600')}>{s.delta}</p>}
        </motion.div>
      ))}
    </div>
  );
}

function ProgressPanel({ progress }: { progress: { label: { en: string; fr: string }; value: number; color: string }[] }) {
  const { lang } = useLang();
  return (
    <div className="space-y-2.5">
      {progress.map((p, i) => (
        <div key={i}>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-medium text-ink-soft">{p.label[lang]}</span>
            <span className="text-ink-light tabular-nums">{p.value}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-cloud-200 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: p.color }}
              initial={{ width: 0 }} whileInView={{ width: `${p.value}%` }} viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function numericPart(value: string): number {
  const m = value.replace(/[^0-9.]/g, '');
  return m ? parseFloat(m) : 0;
}

function formatLike(template: string, num: number): string {
  if (template.includes('$')) {
    const suffix = template.includes('M') ? 'M' : template.includes('k') ? 'k' : '';
    const decimals = template.includes('.') ? 1 : 0;
    return '$' + num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  }
  if (template.includes('%')) return Math.round(num) + '%';
  return Math.round(num).toLocaleString('en-US');
}
