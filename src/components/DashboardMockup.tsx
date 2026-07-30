import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingCart, Users, BarChart3, Settings,
  Bell, Search, ChevronRight, TrendingUp, TrendingDown,
} from 'lucide-react';
import type { DashboardSpec } from '@/data/products';

interface Props {
  spec: DashboardSpec;
  productName?: string;
  accent?: string;
  variant?: 'product' | 'hero';
  compact?: boolean;
}

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: ShoppingCart, label: 'Orders' },
  { icon: Users, label: 'Customers' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
];

export default function DashboardMockup({ spec, productName, accent = '#0070E0', variant = 'product', compact = false }: Props) {
  const isHero = variant === 'hero';
  const panels = spec.panels;
  const mainPanel = panels[0];
  const sidePanels = panels.slice(1, compact ? 3 : 4);

  return (
    <div
      className={`relative w-full rounded-2xl bg-white overflow-hidden ${isHero ? 'shadow-2xl ring-1 ring-liafrik-100/50' : 'shadow-float border border-cloud-200/70'}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-cloud-100/80 border-b border-cloud-200">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-lg bg-white border border-cloud-200 px-3 py-1 text-[10px] text-ink-light max-w-[220px]">
          <span className="h-2.5 w-2.5 rounded-full border border-cloud-300 flex items-center justify-center">
            <span className="h-1 w-1 rounded-full bg-liafrik-500" />
          </span>
          <span className="truncate">{productName ? `${productName.toLowerCase()}.liafrik.com` : 'app.liafrik.com'}</span>
        </div>
        <div className="w-10" />
      </div>

      {/* App body */}
      <div className="flex" style={{ minHeight: compact ? 240 : 300 }}>
        {/* Sidebar */}
        <div
          className="hidden sm:flex flex-col w-12 lg:w-14 shrink-0 py-3 gap-1.5 border-r border-cloud-200"
          style={{ background: `linear-gradient(180deg, ${accent}0D, ${accent}05)` }}
        >
          <div
            className="grid place-items-center h-8 w-8 mx-auto rounded-xl text-white text-[10px] font-bold mb-2 shadow-sm"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)` }}
          >
            {productName?.charAt(0).toUpperCase() ?? 'L'}
          </div>
          {NAV_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`grid place-items-center h-8 w-8 mx-auto rounded-lg transition-colors ${item.active ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}
              style={item.active ? { boxShadow: `0 1px 3px ${accent}30` } : undefined}
            >
              <item.icon
                className="h-4 w-4"
                strokeWidth={item.active ? 2.4 : 1.8}
                style={{ color: item.active ? accent : '#94A3B8' }}
              />
            </div>
          ))}
          <div className="mt-auto mx-auto h-8 w-8 rounded-full bg-gradient-to-br from-liafrik-200 to-cyanx-200 ring-2 ring-white shadow-sm" />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-cloud-100">
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-[10px] font-semibold text-ink-soft truncate">{spec.title.en}</p>
              <ChevronRight className="h-3 w-3 text-ink-light shrink-0" />
              <span className="text-[10px] text-ink-light hidden sm:inline">{spec.metric.label.en}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-cloud-100 border border-cloud-200 px-2 py-1">
                <Search className="h-3 w-3 text-ink-light" />
                <span className="text-[9px] text-ink-light">Search...</span>
              </div>
              <div className="relative grid place-items-center h-6 w-6 rounded-lg hover:bg-cloud-100 transition-colors">
                <Bell className="h-3.5 w-3.5 text-ink-light" />
                <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              </div>
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-liafrik-200 to-cyanx-200 ring-1 ring-white shadow-sm" />
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex-1 p-3 sm:p-3.5 space-y-2.5 bg-cloud-50/50">
            {/* KPI row */}
            <div className="flex items-center justify-between gap-3 rounded-xl bg-white border border-cloud-200 px-3.5 py-2.5 shadow-sm">
              <div className="min-w-0">
                <p className="text-[9px] text-ink-light font-medium">{spec.metric.label.en}</p>
                <p className="text-base sm:text-lg font-bold tabular-nums leading-tight" style={{ color: accent }}>
                  {spec.metric.value}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    spec.metric.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                  }`}
                >
                  {spec.metric.up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                  {spec.metric.delta}
                </span>
                {/* Sparkline */}
                <Sparkline data={mainPanel?.data ?? [40, 55, 48, 70, 62, 85, 95]} accent={accent} />
              </div>
            </div>

            {/* Main chart panel */}
            {mainPanel && (
              <div className="rounded-xl bg-white border border-cloud-200 p-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] text-ink-light font-medium">{mainPanel.title.en}</p>
                  <span className="text-[8px] text-ink-light/70">7d</span>
                </div>
                <ChartArea panel={mainPanel} accent={accent} />
              </div>
            )}

            {/* Side panels grid */}
            <div className={`grid gap-2.5 ${compact ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {sidePanels.map((panel, i) => (
                <PanelContent key={i} panel={panel} accent={accent} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ data, accent }: { data: number[]; accent: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 16;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const path = `M ${points.join(' L ')}`;
  const areaPath = `${path} L ${w},${h} L 0,${h} Z`;
  const gid = `spark-${accent.replace('#', '')}`;

  return (
    <svg width={w} height={h} className="overflow-visible">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={h - ((data[data.length - 1] - min) / range) * h} r="1.5" fill={accent} />
    </svg>
  );
}

function ChartArea({ panel, accent }: { panel: DashboardSpec['panels'][0]; accent: string }) {
  if ((panel.kind === 'line' || panel.kind === 'bars') && panel.data) {
    const data = panel.data;
    const max = Math.max(...data);
    const w = 100;
    const h = 56;
    const barW = w / data.length;

    if (panel.kind === 'line') {
      const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - (v / max) * h;
        return `${x},${y}`;
      });
      const path = `M ${points.join(' L ')}`;
      const areaPath = `${path} L ${w},${h} L 0,${h} Z`;
      const gid = `chart-${accent.replace('#', '')}-${Math.random().toString(36).slice(2, 6)}`;

      return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" y1={h * g} x2={w} y2={h * g} stroke="#EFF4FB" strokeWidth="0.3" />
          ))}
          <motion.path
            d={areaPath}
            fill={`url(#${gid})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeInOut' }}
          />
          {data.map((v, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - (v / max) * h;
            return i === data.length - 1 ? (
              <circle key={i} cx={x} cy={y} r="1.5" fill={accent} />
            ) : null;
          })}
        </svg>
      );
    }

    // Bars
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14" preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" y1={h * g} x2={w} y2={h * g} stroke="#EFF4FB" strokeWidth="0.3" />
        ))}
        {data.map((v, i) => {
          const x = i * barW + barW * 0.15;
          const barHeight = (v / max) * h;
          const y = h - barHeight;
          return (
            <motion.rect
              key={i}
              x={x}
              initial={{ y: h, height: 0 }}
              whileInView={{ y, height: barHeight }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              width={barW * 0.7}
              rx="0.8"
              fill={accent}
              opacity={0.85}
            />
          );
        })}
      </svg>
    );
  }

  if (panel.kind === 'donut' && panel.segments) {
    const segs = panel.segments;
    let offset = 0;
    return (
      <div className="flex items-center gap-3">
        <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0">
          {segs.map((s, i) => {
            const dash = (s.value / 100) * (2 * Math.PI * 22);
            const el = (
              <motion.circle
                key={i}
                cx="28" cy="28" r="22" fill="none"
                stroke={s.color} strokeWidth="6"
                strokeDasharray={`${dash} ${2 * Math.PI * 22 - dash}`}
                strokeDashoffset={-offset}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                transform="rotate(-90 28 28)"
              />
            );
            offset += dash;
            return el;
          })}
          <circle cx="28" cy="28" r="16" fill="white" />
          <text x="28" y="31" textAnchor="middle" className="text-[8px] font-bold fill-ink">{segs.reduce((a, s) => a + s.value, 0)}%</text>
        </svg>
        <div className="space-y-1 min-w-0 flex-1">
          {segs.slice(0, 4).map((seg, j) => (
            <div key={j} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: seg.color }} />
              <span className="text-[9px] text-ink-muted truncate flex-1">{seg.label.en}</span>
              <span className="text-[9px] font-semibold text-ink-soft shrink-0">{seg.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for list/stat/progress in main slot
  return <PanelContent panel={panel} accent={accent} index={0} />;
}

function PanelContent({ panel, accent, index }: { panel: DashboardSpec['panels'][0]; accent: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.08 }}
      className="rounded-xl bg-white border border-cloud-200 p-2.5 shadow-sm overflow-hidden"
    >
      <p className="text-[9px] text-ink-light font-medium mb-2">{panel.title.en}</p>

      {panel.kind === 'line' && panel.data && (
        <ChartArea panel={panel} accent={accent} />
      )}

      {panel.kind === 'bars' && panel.data && (
        <ChartArea panel={panel} accent={accent} />
      )}

      {panel.kind === 'donut' && panel.segments && (
        <ChartArea panel={panel} accent={accent} />
      )}

      {panel.kind === 'list' && panel.items && (
        <div className="space-y-1.5">
          {panel.items.slice(0, 3).map((item, j) => (
            <div key={j} className="flex items-center justify-between gap-2 text-[10px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="h-4 w-4 rounded-md shrink-0" style={{ background: `${accent}15` }} />
                <span className="text-ink-muted truncate">{item.label.en}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {item.sub && (
                  <span className="text-[8px] px-1 py-0.5 rounded bg-cloud-100 text-ink-light font-medium">{item.sub}</span>
                )}
                <span className="font-semibold text-ink-soft tabular-nums">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {panel.kind === 'stat' && panel.stats && (
        <div className="grid grid-cols-2 gap-1.5">
          {panel.stats.slice(0, 4).map((stat, j) => (
            <div key={j} className="rounded-lg bg-cloud-50 border border-cloud-100 px-2 py-1.5">
              <p className="text-[13px] font-bold text-ink tabular-nums leading-tight">{stat.value}</p>
              <div className="flex items-center justify-between gap-1">
                <p className="text-[8px] text-ink-light truncate">{stat.label.en}</p>
                {stat.delta && (
                  <span className={`text-[8px] font-bold ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {stat.up ? '↑' : '↓'}{stat.delta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {panel.kind === 'progress' && panel.progress && (
        <div className="space-y-2">
          {panel.progress.slice(0, 4).map((prog, j) => (
            <div key={j}>
              <div className="flex justify-between text-[9px] mb-0.5">
                <span className="text-ink-muted truncate pr-2">{prog.label.en}</span>
                <span className="text-ink-soft font-semibold shrink-0">{prog.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-cloud-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${prog.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + j * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: prog.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
