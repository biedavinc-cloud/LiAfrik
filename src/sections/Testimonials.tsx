import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles, Clock } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';

interface Testimonial {
  quoteEn: string;
  quoteFr: string;
  name: string;
  roleEn: string;
  roleFr: string;
  company: string;
  initials: string;
}

const examples: Testimonial[] = [
  {
    quoteEn: 'LiAfrik would replace five separate tools for us. An entire retail operation — POS, inventory, staff, payments — running from one dashboard, with numbers visible in real time.',
    quoteFr: 'LiAfrik remplacerait cinq outils distincts pour nous. Toute une opération de vente au détail — POS, stocks, personnel, paiements — depuis un seul tableau de bord, avec des chiffres visibles en temps réel.',
    name: 'Example',
    roleEn: 'Retail Store Owner',
    roleFr: 'Propriétaire de boutique',
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quoteEn: 'Running a 120-bed hospital means coordinating across systems. With Health, admissions, appointments and medical records would be unified, reducing wait times dramatically.',
    quoteFr: "Gérer un hôpital de 120 lits implique de coordonner plusieurs systèmes. Avec Health, admissions, rendez-vous et dossiers médicaux seraient unifiés, réduisant les temps d'attente de façon spectaculaire.",
    name: 'Example',
    roleEn: 'Hospital Director',
    roleFr: "Directeur d'hôpital",
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quoteEn: 'Managing 2,000 students across three campuses. KlasSo would centralize enrollment, grading and parent communication, keeping parents connected to what we do.',
    quoteFr: 'Gérer 2 000 élèves sur trois campus. KlasSo centraliserait les inscriptions, la notation et la communication avec les parents, gardant les parents connectés à notre travail.',
    name: 'Example',
    roleEn: 'School Administrator',
    roleFr: 'Administrateur scolaire',
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quoteEn: 'The kitchen display and table management would change how we serve. Orders flowing from waiters to cooks instantly, two outlets from the same system — a game changer for restaurants.',
    quoteFr: "L'affichage cuisine et la gestion des tables changeraient notre service. Des commandes passant des serveurs aux cuisiniers instantanément, deux établissements depuis le même système — décisif pour les restaurants.",
    name: 'Example',
    roleEn: 'Restaurant Owner',
    roleFr: 'Restaurateur',
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quoteEn: 'Bailly would let us manage 1,200 units with a tiny team. Rent collection automated, maintenance requests tracked, and clear financial reports for our investors.',
    quoteFr: 'Bailly nous permettrait de gérer 1 200 unités avec une équipe réduite. Recouvrement des loyers automatisé, demandes de maintenance suivies, et rapports financiers clairs pour nos investisseurs.',
    name: 'Example',
    roleEn: 'Real Estate Company',
    roleFr: 'Société immobilière',
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quoteEn: 'As a founder, I would stop spending evenings reconciling tools. With LiAfrik, commerce, finance and HR connected — focus on growth, not on software. The future for ambitious businesses.',
    quoteFr: "En tant que fondateur, je cesserais de passer mes soirées à réconcilier des outils. Avec LiAfrik, commerce, finance et RH connectés — se concentrer sur la croissance, pas sur les logiciels. Le futur pour les entreprises ambitieuses.",
    name: 'Example',
    roleEn: 'SME Founder',
    roleFr: 'Fondateur de PME',
    company: 'Type use case',
    initials: 'EX',
  },
];

export default function Testimonials() {
  const { t, lang } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = examples.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const active = examples[index];

  return (
    <section className="relative py-20 sm:py-28 bg-cloud-100/60">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading tag={t('testi.tag')} title={t('testi.title')} subtitle={t('testi.sub')} />

        {/* Honesty banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 rounded-full bg-amber-50 border border-amber-100 px-4 py-2 text-xs font-semibold text-amber-700 max-w-fit mx-auto"
        >
          <Clock className="h-3.5 w-3.5" />
          {t('testi.placeholder')}
        </motion.div>

        <div
          className="mt-8 relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-3xl bg-white border border-cloud-200 shadow-premium p-6 sm:p-10 overflow-hidden min-h-[300px]">
            <Quote className="absolute top-6 right-6 h-16 w-16 text-liafrik-100" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 border border-amber-100">
                    <Sparkles className="h-3 w-3" /> {t('testi.example')}
                  </span>
                </div>
                <p className="font-display text-lg sm:text-xl text-ink leading-relaxed font-medium">
                  "{lang === 'en' ? active.quoteEn : active.quoteFr}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white font-bold shadow-glow-blue">
                    {active.initials}
                  </span>
                  <div>
                    <p className="font-display font-bold text-ink">{lang === 'en' ? active.roleEn : active.roleFr}</p>
                    <p className="text-sm text-ink-light">{t('testi.example')} · {lang === 'en' ? active.company : active.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => go(-1)} className="grid place-items-center h-10 w-10 rounded-full bg-white border border-cloud-200 text-ink-soft hover:bg-liafrik-50 hover:text-liafrik-700 transition-colors shadow-card" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {examples.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} aria-label={`Go to ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-liafrik-600' : 'w-2 bg-cloud-300 hover:bg-liafrik-300'}`} />
              ))}
            </div>
            <button onClick={() => go(1)} className="grid place-items-center h-10 w-10 rounded-full bg-white border border-cloud-200 text-ink-soft hover:bg-liafrik-50 hover:text-liafrik-700 transition-colors shadow-card" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
