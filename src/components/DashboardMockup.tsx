import { motion } from 'framer-motion';
import type { DashboardSpec } from '@/data/products';

interface Props {
  spec: DashboardSpec;
  productName?: string;
  accent?: string;
  variant?: 'product' | 'hero';
  compact?: boolean;
}

export default function DashboardMockup({ spec, productName, accent = '#0070E0', variant = 'product', compact = false }: Props) {
  const isHero = variant === 'hero';
  const panelCount = compact ? 3 : 4;

  return (
    <div className={`relative w-full rounded-2xl bg-white shadow-2xl border border-cloud-200/60 overflow-hidden ${isHero ? 'ring-1 ring-liafrik-100/40' : ''}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cloud-50 to-cloud-100/70 border-b border-cloud-200/80">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <div className="ml-3 flex-1 max-w-[200px] rounded-md bg-white/80 border border-cloud-200 px-2.5 py-1 text-[10px] text-ink-light text-center truncate">
          {productName ? `${productName.toLowerCase()}.liafrik.com` : 'app.liafrik.com'}
        </div>
      </div>

      {/* App body */}
      <div className="flex min-h-[280px]">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col w-12 lg:w-14 shrink-0 bg-gradient-to-b from-liafrik-700 to-liafrik-800 p-2 gap-1">
          <div className="grid place-items-center h-8 w-8 mx-auto rounded-lg bg-white/15 text-white text-[9px] font-bold mb-1">L</div>
          {['grid', 'bar', 'pie', 'list', 'settings'].map((_, i) => (
            <div key={i} className="grid place-items-center h-7 w-7 mx-auto rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <div className={`h-3 w-3 rounded-sm ${i === 0 ? 'bg-white/80' : 'bg-white/30'}`} />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 sm:p-5 space-y-4">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-ink-light font-medium">{spec.title.en}</p>
              <p className="text-lg sm:text-xl font-bold text-ink tabular-nums" style={{ color: accent }}>
                {spec.metric.value}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[10px] font-medium ${spec.metric.up ? 'text-green-600' : 'text-red-500'}`}>
                  {spec.metric.up ? '↑' : '↓'} {spec.metric.delta}
                </span>
                <span className="text-[10px] text-ink-light">{spec.metric.label.en}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-liafrik-200 to-cyanx-200" />
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-cyanx-200 to-liafrik-200 -ml-3" />
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-liafrik-100 to-liafrik-300 -ml-3 ring-2 ring-white" />
            </div>
          </div>

          {/* Panels */}
          <div className="grid grid-cols-2 gap-3">
            {spec.panels.slice(0, panelCount).map((panel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className={`rounded-xl border border-cloud-200/70 bg-white p-3 ${i === 0 || i === 3 ? 'col-span-2' : ''}`}
              >
                <p className="text-[9px] text-ink-light font-medium mb-2">{panel.title.en}</p>

                {panel.kind === 'line' && panel.data && (
                  <div className="flex items-end gap-1 h-16">
                    {panel.data.map((v, j) => (
                      <motion.div
                        key={j}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${v}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + j * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-1 rounded-t-sm min-w-0"
                        style={{ background: `linear-gradient(to top, ${accent}, ${accent}99)` }}
                      />
                    ))}
                  </div>
                )}

                {panel.kind === 'bars' && panel.data && (
                  <div className="flex items-end gap-1 h-16">
                    {panel.data.map((v, j) => (
                      <div key={j} className="flex-1 rounded-t-sm min-w-0" style={{ height: `${v}%`, background: `${accent}cc` }} />
                    ))}
                  </div>
                )}

                {panel.kind === 'donut' && panel.segments && panel.segments.length > 0 && (() => {
                  const segs = panel.segments;
                  return (
                    <div className="flex items-center gap-3">
                      <div
                        className="relative h-14 w-14 rounded-full shrink-0"
                        style={{ background: `conic-gradient(${segs.map((s, j) => `${s.color} ${(segs.slice(0, j).reduce((a, seg) => a + seg.value, 0) / 100) * 360}deg ${((segs.slice(0, j).reduce((a, seg) => a + seg.value, 0) + s.value) / 100) * 360}deg`).join(', ')})` }}
                      >
                        <div className="absolute inset-2.5 rounded-full bg-white" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        {segs.slice(0, 3).map((seg, j) => (
                          <div key={j} className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: seg.color }} />
                            <span className="text-[9px] text-ink-muted truncate">{seg.label.en}</span>
                            <span className="text-[9px] font-medium text-ink-soft ml-auto">{seg.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {panel.kind === 'list' && panel.items && (
                  <div className="space-y-1.5">
                    {panel.items.slice(0, 3).map((item, j) => (
                      <div key={j} className="flex items-center justify-between text-[10px]">
                        <span className="text-ink-muted truncate pr-2">{item.label.en}</span>
                        <span className="font-medium text-ink-soft shrink-0">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {panel.kind === 'stat' && panel.stats && (
                  <div className="grid grid-cols-2 gap-2">
                    {panel.stats.slice(0, 4).map((stat, j) => (
                      <div key={j}>
                        <p className="text-sm font-bold text-ink tabular-nums">{stat.value}</p>
                        <p className="text-[9px] text-ink-light">{stat.label.en}</p>
                        {stat.delta && (
                          <span className={`text-[8px] font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                            {stat.up ? '↑' : '↓'} {stat.delta}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {panel.kind === 'progress' && panel.progress && (
                  <div className="space-y-2">
                    {panel.progress.map((prog, j) => (
                      <div key={j}>
                        <div className="flex justify-between text-[9px] mb-0.5">
                          <span className="text-ink-muted truncate">{prog.label.en}</span>
                          <span className="text-ink-soft font-medium">{prog.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-cloud-100 overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${prog.value}%` }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 + j * 0.1 }} className="h-full rounded-full" style={{ background: prog.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
