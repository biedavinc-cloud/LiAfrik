import { motion } from 'framer-motion';
import {
  ShoppingBag, UtensilsCrossed, HeartPulse, GraduationCap, Hotel,
  Landmark, Building2, Briefcase, Building, LandPlot, HandHeart, Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';

interface Industry {
  icon: LucideIcon;
  en: string;
  fr: string;
  descEn: string;
  descFr: string;
}

const industries: Industry[] = [
  { icon: ShoppingBag, en: 'Retail', fr: 'Commerce de détail', descEn: 'Stores, supermarkets, pharmacies', descFr: 'Boutiques, supermarchés, pharmacies' },
  { icon: UtensilsCrossed, en: 'Restaurants', fr: 'Restauration', descEn: 'Restaurants, cafés, chains', descFr: 'Restaurants, cafés, chaînes' },
  { icon: HeartPulse, en: 'Healthcare', fr: 'Santé', descEn: 'Hospitals, clinics, pharmacies', descFr: 'Hôpitaux, cliniques, pharmacies' },
  { icon: GraduationCap, en: 'Education', fr: 'Éducation', descEn: 'Schools, universities, centers', descFr: 'Écoles, universités, centres' },
  { icon: Hotel, en: 'Hospitality', fr: 'Hôtellerie', descEn: 'Hotels, lodges, guesthouses', descFr: "Hôtels, lodges, maisons d'hôtes" },
  { icon: Landmark, en: 'Finance', fr: 'Finance', descEn: 'Cooperatives, microfinance', descFr: 'Coopératives, microfinance' },
  { icon: Building2, en: 'Real Estate', fr: 'Immobilier', descEn: 'Agencies, property managers', descFr: 'Agences, gestionnaires' },
  { icon: Briefcase, en: 'SMEs', fr: 'PME', descEn: 'Small & medium enterprises', descFr: 'Petites et moyennes entreprises' },
  { icon: Building, en: 'Large Enterprises', fr: 'Grandes entreprises', descEn: 'National & regional groups', descFr: 'Groupes nationaux et régionaux' },
  { icon: LandPlot, en: 'Government', fr: 'Gouvernement', descEn: 'Public sector & agencies', descFr: 'Secteur public et agences' },
  { icon: HandHeart, en: 'NGOs', fr: 'ONG', descEn: 'Non-profits & foundations', descFr: 'À but non lucratif et fondations' },
  { icon: Users, en: 'Cooperatives', fr: 'Coopératives', descEn: 'Savings & producer groups', descFr: "Groupes d'épargne et producteurs" },
];

export default function Industries() {
  const { t, lang } = useLang();

  return (
    <section id="industries" className="relative py-20 sm:py-28 bg-cloud-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('industries.tag')} title={t('industries.title')} subtitle={t('industries.sub')} />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-white border border-cloud-200 p-5 shadow-card hover:shadow-float transition-shadow cursor-default"
            >
              <span className="grid place-items-center h-11 w-11 rounded-xl bg-liafrik-50 text-liafrik-600 group-hover:bg-gradient-to-br group-hover:from-liafrik-600 group-hover:to-cyanx-500 group-hover:text-white transition-all duration-300">
                <ind.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <h3 className="mt-3.5 font-display font-bold text-[15px] text-ink leading-tight">{lang === 'en' ? ind.en : ind.fr}</h3>
              <p className="mt-1 text-xs text-ink-light leading-relaxed">{lang === 'en' ? ind.descEn : ind.descFr}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
