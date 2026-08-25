import { motion, useReducedMotion } from 'framer-motion';

export default function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-liafrik-50 via-white to-cyanx-50" />

      {/* Animated mesh blobs — tech blue/cyan, not rainbow */}
      {/* FIX: taille + blur réduits sur mobile (blur-[60px] au lieu de 100px sous sm) pour alléger le rendu sur petits écrans/appareils moins puissants */}
      <motion.div
        className="absolute -top-24 -left-24 h-[280px] w-[280px] sm:h-[500px] sm:w-[500px] rounded-full blur-[60px] sm:blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(0,112,224,0.18) 0%, transparent 70%)' }}
        animate={shouldReduceMotion ? undefined : { x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[250px] w-[250px] sm:h-[450px] sm:w-[450px] rounded-full blur-[60px] sm:blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(0,191,224,0.15) 0%, transparent 70%)' }}
        animate={shouldReduceMotion ? undefined : { x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/4 h-[220px] w-[220px] sm:h-[400px] sm:w-[400px] rounded-full blur-[60px] sm:blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(0,112,224,0.10) 0%, transparent 70%)' }}
        animate={shouldReduceMotion ? undefined : { x: [0, 100, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Slow-rotating orbital ring — subtle "connected world" accent */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] sm:h-[720px] sm:w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{ border: '1px dashed #0070E0' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Tech grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,112,224,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,224,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* Animated scan line — subtle tech feel */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,112,224,0.3), transparent)' }}
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Floating particles — FIX: 3 sur mobile, 6 à partir de sm, aucune si reduced-motion */}
      {!shouldReduceMotion &&
        PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i >= 3 ? 'hidden sm:block' : ''}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

      {/* Global network graph — connected nodes with flowing data lines and
          radar pings. This is the "high-tech, worldwide" signature: reads
          as a live, connected network rather than decorative noise. */}
      {!shouldReduceMotion && (
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="net-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0070E0" stopOpacity="0" />
              <stop offset="50%" stopColor="#00BFE0" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0070E0" stopOpacity="0" />
            </linearGradient>
          </defs>

          {NETWORK_LINKS.map(([aIdx, bIdx], i) => {
            const a = NETWORK_NODES[aIdx];
            const b = NETWORK_NODES[bIdx];
            const secondary = i >= 8; // fewer animated lines on mobile for perf
            return (
              <g key={i} className={secondary ? 'hidden sm:block' : undefined}>
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="rgba(0,112,224,0.14)" strokeWidth="0.15"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="url(#net-line)" strokeWidth="0.25"
                  strokeDasharray="6 94" pathLength={1}
                  vectorEffect="non-scaling-stroke"
                  animate={{ strokeDashoffset: [0, -100] }}
                  transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
                />
              </g>
            );
          })}

          {NETWORK_NODES.map((n, i) => (
            <g key={i}>
              {/* radar ping — only on the first half of nodes below sm, to
                  keep mobile animation load light */}
              <motion.circle
                cx={n.x} cy={n.y} r="0.6" fill="none"
                stroke="#0070E0" strokeWidth="0.15"
                className={i >= 6 ? 'hidden sm:block' : undefined}
                initial={{ opacity: 0.6, r: 0.6 }}
                animate={{ opacity: [0.6, 0], r: [0.6, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.5 }}
              />
              <circle cx={n.x} cy={n.y} r="0.5" fill="#0070E0" opacity="0.7" />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}

const PARTICLES = [
  { x: 15, y: 20, size: 3, color: 'rgba(0,112,224,0.4)', duration: 8, delay: 0 },
  { x: 80, y: 15, size: 2, color: 'rgba(0,191,224,0.5)', duration: 10, delay: 1 },
  { x: 45, y: 60, size: 4, color: 'rgba(0,112,224,0.3)', duration: 12, delay: 2 },
  { x: 70, y: 75, size: 2, color: 'rgba(0,191,224,0.4)', duration: 9, delay: 3 },
  { x: 25, y: 80, size: 3, color: 'rgba(0,112,224,0.35)', duration: 11, delay: 1.5 },
  { x: 60, y: 35, size: 2, color: 'rgba(0,191,224,0.3)', duration: 7, delay: 4 },
];

// Node positions (viewBox 0–100) — an irregular, non-grid layout reads
// as a "world map of connections" rather than a mechanical circuit.
const NETWORK_NODES = [
  { x: 8, y: 18 },
  { x: 28, y: 10 },
  { x: 50, y: 22 },
  { x: 72, y: 12 },
  { x: 92, y: 22 },
  { x: 18, y: 45 },
  { x: 62, y: 42 },
  { x: 85, y: 50 },
  { x: 12, y: 78 },
  { x: 38, y: 85 },
  { x: 65, y: 80 },
  { x: 90, y: 82 },
];

// Which node pairs get a connecting line — sparse, so it stays legible.
const NETWORK_LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [1, 6], [2, 6], [4, 7],
  [5, 8], [6, 10], [7, 11], [8, 9], [9, 10], [10, 11],
];
