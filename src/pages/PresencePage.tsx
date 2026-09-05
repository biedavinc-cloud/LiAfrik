import { motion } from 'framer-motion';
import { MapPin, Globe2, Building, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang, pick } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function PresencePage() {
  const { t, lang } = useLang();
  useSEO({
    title: pick(lang, {
      en: 'Global Presence | LiAfrik', fr: 'Présence mondiale | LiAfrik',
      ar: 'الحضور العالمي | LiAfrik', es: 'Presencia global | LiAfrik', pt: 'Presença global | LiAfrik',
    }),
    description: pick(lang, {
      en: 'LiAfrik operates from Dubai and Yaoundé, built to serve businesses across Africa and the world.',
      fr: "LiAfrik opère depuis Dubaï et Yaoundé, conçu pour servir les entreprises à travers l'Afrique et le monde.",
      ar: 'يعمل LiAfrik من دبي وياوندي، وقد صُمم لخدمة الشركات عبر أفريقيا والعالم.',
      es: 'LiAfrik opera desde Dubái y Yaundé, creado para servir a empresas en toda África y el mundo.',
      pt: 'A LiAfrik opera a partir de Dubai e Yaoundé, criada para atender empresas em toda a África e no mundo.',
    }),
  });

  const locations = [
    {
      city: 'Dubai',
      country: pick(lang, { en: 'United Arab Emirates', fr: 'Émirats arabes unis', ar: 'الإمارات العربية المتحدة', es: 'Emiratos Árabes Unidos', pt: 'Emirados Árabes Unidos' }),
      address: 'Jumeirah 1, Dubai',
      icon: Building,
      accent: 'from-liafrik-600 to-cyanx-500',
    },
    {
      city: 'Yaoundé',
      country: pick(lang, { en: 'Cameroon', fr: 'Cameroun', ar: 'الكاميرون', es: 'Camerún', pt: 'Camarões' }),
      address: pick(lang, { en: 'Yaoundé, Cameroon', fr: 'Yaoundé, Cameroun', ar: 'ياوندي، الكاميرون', es: 'Yaundé, Camerún', pt: 'Yaoundé, Camarões' }),
      icon: MapPin,
      accent: 'from-cyanx-500 to-liafrik-600',
    },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          tag={t('presence.tag')}
          title={t('presence.title')}
          subtitle={t('presence.sub')}
        />

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-white border border-cloud-200 p-8 shadow-card hover:shadow-float transition-shadow"
            >
              <span className={`grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br ${loc.accent} text-white shadow-glow-blue mb-5`}>
                <loc.icon className="h-7 w-7" strokeWidth={2.2} />
              </span>
              <h3 className="font-display font-bold text-xl text-ink">{loc.city}</h3>
              <p className="text-sm font-medium text-liafrik-700 mt-1">{loc.country}</p>
              <p className="mt-3 text-sm text-ink-muted">{loc.address}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 rounded-3xl bg-cloud-50 border border-cloud-200 p-8 text-center"
        >
          <Globe2 className="h-10 w-10 text-liafrik-600 mx-auto mb-4" />
          <h3 className="font-display font-bold text-lg text-ink">{t('presence.digital.title')}</h3>
          <p className="mt-3 text-sm text-ink-muted max-w-2xl mx-auto">{t('presence.digital.desc')}</p>
        </motion.div>

        <div className="mt-12 text-center">
          <LinkButton to="/products" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
            {t('nav.startFree')}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
