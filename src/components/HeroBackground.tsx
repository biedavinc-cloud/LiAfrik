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
