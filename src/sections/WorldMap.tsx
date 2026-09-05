import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import { useLang, pick } from '@/i18n/LanguageContext';

const cities = [
  { name: 'Yaoundé', x: 52, y: 62, delay: 0 },
  { name: 'Dubai', x: 65, y: 49, delay: 0.3 },
];

export default function WorldMap() {
  const { t, lang } = useLang();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('world.tag')} title={<span className="text-gradient-blue-strong">{t('world.title')}</span>} subtitle={t('world.sub')} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 relative rounded-3xl bg-gradient-to-br from-cloud-50 to-cloud-100 border border-cloud-200 p-6 sm:p-10 overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-40" />

          <div className="relative aspect-[2/1] w-full">
            <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Simplified world landmasses as soft blobs */}
              <g fill="#D2E7FF" stroke="#A8D0FF" strokeWidth="0.15">
                {/* Americas */}
                <path d="M10,18 Q14,14 18,18 L20,24 Q18,30 16,34 L14,40 Q12,42 10,40 L8,34 Q6,28 8,22 Z" />
                {/* Europe */}
                <path d="M44,14 Q48,12 52,14 L54,18 Q52,20 50,20 L46,19 Q44,17 44,15 Z" />
                {/* Africa — emphasized */}
                <path d="M46,20 Q52,18 56,22 L58,28 Q60,34 58,40 L54,44 Q50,45 48,42 L46,36 Q44,30 45,24 Z" fill="#0070E0" fillOpacity="0.18" stroke="#0070E0" strokeWidth="0.2" />
                {/* Middle East */}
                <path d="M58,20 Q62,18 64,22 L62,26 Q60,27 58,25 Z" />
                {/* Asia */}
                <path d="M60,16 Q70,12 80,16 L84,22 Q82,28 78,30 L72,28 Q66,26 62,22 Z" />
                {/* Oceania */}
                <path d="M80,34 Q84,32 86,36 L84,40 Q82,41 80,39 Z" />
              </g>

              {/* Africa highlight glow */}
              <motion.circle
                cx="52" cy="32" r="14"
                fill="none" stroke="#0070E0" strokeWidth="0.3" strokeOpacity="0.4"
                animate={{ r: [13, 15, 13], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>

            {/* City pins */}
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                className="absolute"
                style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 300, damping: 18 }}
              >
                <span className="relative grid place-items-center">
                  <span className="absolute h-3 w-3 rounded-full bg-liafrik-500 animate-pulse-ring" />
                  <span className="relative h-2 w-2 rounded-full bg-liafrik-600 ring-2 ring-white shadow-glow-blue" />
                </span>
                <span className="absolute left-1/2 top-full -translate-x-1/2 mt-1 whitespace-nowrap text-[9px] font-semibold text-liafrik-700 opacity-0 group-hover:opacity-100">
                  {city.name}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-light">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-liafrik-600" /> {pick(lang, { en: 'Active deployments', fr: 'Déploiements actifs', ar: 'عمليات نشر فعّالة', es: 'Implementaciones activas', pt: 'Implantações ativas' })}</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyanx-400" /> {pick(lang, { en: 'Cloud regions', fr: 'Régions cloud', ar: 'مناطق سحابية', es: 'Regiones de nube', pt: 'Regiões de nuvem' })}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
