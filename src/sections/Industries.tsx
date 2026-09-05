import { motion } from 'framer-motion';
import {
  ShoppingBag, UtensilsCrossed, HeartPulse, GraduationCap, Hotel,
  Landmark, Building2, Briefcase, Building, LandPlot, HandHeart, Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang, type Lang } from '@/i18n/LanguageContext';

interface Industry {
  icon: LucideIcon;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
}

const industries: Industry[] = [
  { icon: ShoppingBag, name: { en: 'Retail', fr: 'Commerce de détail', ar: 'التجزئة', es: 'Comercio minorista', pt: 'Varejo' }, desc: { en: 'Stores, supermarkets, pharmacies', fr: 'Boutiques, supermarchés, pharmacies', ar: 'متاجر، سوبر ماركت، صيدليات', es: 'Tiendas, supermercados, farmacias', pt: 'Lojas, supermercados, farmácias' } },
  { icon: UtensilsCrossed, name: { en: 'Restaurants', fr: 'Restauration', ar: 'المطاعم', es: 'Restaurantes', pt: 'Restaurantes' }, desc: { en: 'Restaurants, cafés, chains', fr: 'Restaurants, cafés, chaînes', ar: 'مطاعم، مقاهي، سلاسل', es: 'Restaurantes, cafeterías, cadenas', pt: 'Restaurantes, cafés, redes' } },
  { icon: HeartPulse, name: { en: 'Healthcare', fr: 'Santé', ar: 'الرعاية الصحية', es: 'Salud', pt: 'Saúde' }, desc: { en: 'Hospitals, clinics, pharmacies', fr: 'Hôpitaux, cliniques, pharmacies', ar: 'مستشفيات، عيادات، صيدليات', es: 'Hospitales, clínicas, farmacias', pt: 'Hospitais, clínicas, farmácias' } },
  { icon: GraduationCap, name: { en: 'Education', fr: 'Éducation', ar: 'التعليم', es: 'Educación', pt: 'Educação' }, desc: { en: 'Schools, universities, centers', fr: 'Écoles, universités, centres', ar: 'مدارس، جامعات، مراكز', es: 'Colegios, universidades, centros', pt: 'Escolas, universidades, centros' } },
  { icon: Hotel, name: { en: 'Hospitality', fr: 'Hôtellerie', ar: 'الضيافة', es: 'Hostelería', pt: 'Hotelaria' }, desc: { en: 'Hotels, lodges, guesthouses', fr: "Hôtels, lodges, maisons d'hôtes", ar: 'فنادق، نُزل، بيوت ضيافة', es: 'Hoteles, lodges, casas de huéspedes', pt: 'Hotéis, pousadas, casas de hóspedes' } },
  { icon: Landmark, name: { en: 'Finance', fr: 'Finance', ar: 'التمويل', es: 'Finanzas', pt: 'Finanças' }, desc: { en: 'Cooperatives, microfinance', fr: 'Coopératives, microfinance', ar: 'تعاونيات، تمويل أصغر', es: 'Cooperativas, microfinanzas', pt: 'Cooperativas, microfinanças' } },
  { icon: Building2, name: { en: 'Real Estate', fr: 'Immobilier', ar: 'العقارات', es: 'Bienes raíces', pt: 'Imóveis' }, desc: { en: 'Agencies, property managers', fr: 'Agences, gestionnaires', ar: 'وكالات، مدراء عقارات', es: 'Agencias, administradores de propiedades', pt: 'Agências, gestores de imóveis' } },
  { icon: Briefcase, name: { en: 'SMEs', fr: 'PME', ar: 'الشركات الصغيرة والمتوسطة', es: 'Pymes', pt: 'PMEs' }, desc: { en: 'Small & medium enterprises', fr: 'Petites et moyennes entreprises', ar: 'المؤسسات الصغيرة والمتوسطة', es: 'Pequeñas y medianas empresas', pt: 'Pequenas e médias empresas' } },
  { icon: Building, name: { en: 'Large Enterprises', fr: 'Grandes entreprises', ar: 'الشركات الكبرى', es: 'Grandes empresas', pt: 'Grandes empresas' }, desc: { en: 'National & regional groups', fr: 'Groupes nationaux et régionaux', ar: 'مجموعات وطنية وإقليمية', es: 'Grupos nacionales y regionales', pt: 'Grupos nacionais e regionais' } },
  { icon: LandPlot, name: { en: 'Government', fr: 'Gouvernement', ar: 'الحكومة', es: 'Gobierno', pt: 'Governo' }, desc: { en: 'Public sector & agencies', fr: 'Secteur public et agences', ar: 'القطاع العام والوكالات', es: 'Sector público y agencias', pt: 'Setor público e agências' } },
  { icon: HandHeart, name: { en: 'NGOs', fr: 'ONG', ar: 'المنظمات غير الحكومية', es: 'ONGs', pt: 'ONGs' }, desc: { en: 'Non-profits & foundations', fr: 'À but non lucratif et fondations', ar: 'منظمات غير ربحية ومؤسسات', es: 'Sin fines de lucro y fundaciones', pt: 'Sem fins lucrativos e fundações' } },
  { icon: Users, name: { en: 'Cooperatives', fr: 'Coopératives', ar: 'التعاونيات', es: 'Cooperativas', pt: 'Cooperativas' }, desc: { en: 'Savings & producer groups', fr: "Groupes d'épargne et producteurs", ar: 'مجموعات ادخار ومنتجين', es: 'Grupos de ahorro y productores', pt: 'Grupos de poupança e produtores' } },
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
              key={ind.name.en}
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
              <h3 className="mt-3.5 font-display font-bold text-[15px] text-ink leading-tight">{ind.name[lang]}</h3>
              <p className="mt-1 text-xs text-ink-light leading-relaxed">{ind.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
