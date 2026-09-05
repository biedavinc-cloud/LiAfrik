import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles, Clock } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang, type Lang } from '@/i18n/LanguageContext';

interface Testimonial {
  quote: Record<Lang, string>;
  name: string;
  role: Record<Lang, string>;
  company: string;
  initials: string;
}

const examples: Testimonial[] = [
  {
    quote: {
      en: 'LiAfrik would replace five separate tools for us. An entire retail operation — POS, inventory, staff, payments — running from one dashboard, with numbers visible in real time.',
      fr: 'LiAfrik remplacerait cinq outils distincts pour nous. Toute une opération de vente au détail — POS, stocks, personnel, paiements — depuis un seul tableau de bord, avec des chiffres visibles en temps réel.',
      ar: 'يمكن أن يحل LiAfrik محل خمس أدوات منفصلة بالنسبة لنا. عملية بيع بالتجزئة كاملة — نقاط البيع، المخزون، الموظفون، المدفوعات — تعمل من لوحة تحكم واحدة، مع أرقام مرئية في الوقت الفعلي.',
      es: 'LiAfrik reemplazaría cinco herramientas separadas para nosotros. Toda una operación minorista — POS, inventario, personal, pagos — funcionando desde un solo panel, con cifras visibles en tiempo real.',
      pt: 'A LiAfrik substituiria cinco ferramentas separadas para nós. Uma operação de varejo inteira — PDV, estoque, equipe, pagamentos — rodando a partir de um único painel, com números visíveis em tempo real.',
    },
    name: 'Example',
    role: {
      en: 'Retail Store Owner', fr: 'Propriétaire de boutique', ar: 'مالك متجر تجزئة', es: 'Propietario de tienda minorista', pt: 'Proprietário de loja de varejo',
    },
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quote: {
      en: 'Running a 120-bed hospital means coordinating across systems. With Health, admissions, appointments and medical records would be unified, reducing wait times dramatically.',
      fr: "Gérer un hôpital de 120 lits implique de coordonner plusieurs systèmes. Avec Health, admissions, rendez-vous et dossiers médicaux seraient unifiés, réduisant les temps d'attente de façon spectaculaire.",
      ar: 'إدارة مستشفى بسعة 120 سريراً تعني التنسيق بين أنظمة متعددة. مع Health، ستتوحد عمليات القبول والمواعيد والسجلات الطبية، مما يقلص أوقات الانتظار بشكل كبير.',
      es: 'Gestionar un hospital de 120 camas significa coordinar varios sistemas. Con Health, los ingresos, las citas y los historiales médicos se unificarían, reduciendo drásticamente los tiempos de espera.',
      pt: 'Administrar um hospital de 120 leitos significa coordenar vários sistemas. Com a Health, admissões, consultas e prontuários médicos seriam unificados, reduzindo drasticamente os tempos de espera.',
    },
    name: 'Example',
    role: {
      en: 'Hospital Director', fr: "Directeur d'hôpital", ar: 'مدير مستشفى', es: 'Director de hospital', pt: 'Diretor de hospital',
    },
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quote: {
      en: 'Managing 2,000 students across three campuses. Klasoo would centralize enrollment, grading and parent communication, keeping parents connected to what we do.',
      fr: 'Gérer 2 000 élèves sur trois campus. Klasoo centraliserait les inscriptions, la notation et la communication avec les parents, gardant les parents connectés à notre travail.',
      ar: 'إدارة 2000 طالب عبر ثلاث حرم جامعية. سيوحّد Klasoo عمليات التسجيل والتقييم والتواصل مع أولياء الأمور، مما يبقيهم على اطلاع دائم بما نقوم به.',
      es: 'Gestionar 2000 estudiantes en tres campus. Klasoo centralizaría la matrícula, las calificaciones y la comunicación con los padres, manteniéndolos conectados con lo que hacemos.',
      pt: 'Gerenciar 2.000 alunos em três campi. A Klasoo centralizaria matrículas, notas e comunicação com os pais, mantendo-os conectados ao que fazemos.',
    },
    name: 'Example',
    role: {
      en: 'School Administrator', fr: 'Administrateur scolaire', ar: 'مدير مدرسة', es: 'Administrador escolar', pt: 'Administrador escolar',
    },
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quote: {
      en: 'The kitchen display and table management would change how we serve. Orders flowing from waiters to cooks instantly, two outlets from the same system — a game changer for restaurants.',
      fr: "L'affichage cuisine et la gestion des tables changeraient notre service. Des commandes passant des serveurs aux cuisiniers instantanément, deux établissements depuis le même système — décisif pour les restaurants.",
      ar: 'شاشة عرض المطبخ وإدارة الطاولات ستُغيّر طريقة تقديم الخدمة لدينا. طلبات تنتقل من النادلين إلى الطهاة فوراً، ومنفذان يعملان بنفس النظام — نقلة نوعية للمطاعم.',
      es: 'La pantalla de cocina y la gestión de mesas cambiarían nuestra forma de servir. Pedidos que fluyen de los meseros a los cocineros al instante, dos locales con el mismo sistema: un cambio radical para los restaurantes.',
      pt: 'A exibição de cozinha e a gestão de mesas mudariam a forma como atendemos. Pedidos fluindo dos garçons para os cozinheiros instantaneamente, dois estabelecimentos no mesmo sistema — um divisor de águas para restaurantes.',
    },
    name: 'Example',
    role: {
      en: 'Restaurant Owner', fr: 'Restaurateur', ar: 'صاحب مطعم', es: 'Propietario de restaurante', pt: 'Proprietário de restaurante',
    },
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quote: {
      en: 'Bailly would let us manage 1,200 units with a tiny team. Rent collection automated, maintenance requests tracked, and clear financial reports for our investors.',
      fr: 'Bailly nous permettrait de gérer 1 200 unités avec une équipe réduite. Recouvrement des loyers automatisé, demandes de maintenance suivies, et rapports financiers clairs pour nos investisseurs.',
      ar: 'يمكن أن يتيح لنا Bailly إدارة 1200 وحدة بفريق صغير. تحصيل إيجارات آلي، وتتبّع لطلبات الصيانة، وتقارير مالية واضحة لمستثمرينا.',
      es: 'Bailly nos permitiría gestionar 1200 unidades con un equipo reducido. Cobro de alquileres automatizado, solicitudes de mantenimiento rastreadas e informes financieros claros para nuestros inversionistas.',
      pt: 'A Bailly nos permitiria gerenciar 1.200 unidades com uma equipe pequena. Cobrança de aluguel automatizada, solicitações de manutenção rastreadas e relatórios financeiros claros para nossos investidores.',
    },
    name: 'Example',
    role: {
      en: 'Real Estate Company', fr: 'Société immobilière', ar: 'شركة عقارية', es: 'Empresa inmobiliaria', pt: 'Empresa imobiliária',
    },
    company: 'Type use case',
    initials: 'EX',
  },
  {
    quote: {
      en: 'As a founder, I would stop spending evenings reconciling tools. With LiAfrik, commerce, finance and HR connected — focus on growth, not on software. The future for ambitious businesses.',
      fr: "En tant que fondateur, je cesserais de passer mes soirées à réconcilier des outils. Avec LiAfrik, commerce, finance et RH connectés — se concentrer sur la croissance, pas sur les logiciels. Le futur pour les entreprises ambitieuses.",
      ar: 'بصفتي مؤسساً، سأتوقف عن قضاء أمسياتي في التوفيق بين الأدوات المختلفة. مع LiAfrik، تتصل التجارة والتمويل والموارد البشرية — للتركيز على النمو، لا على البرمجيات. المستقبل للشركات الطموحة.',
      es: 'Como fundador, dejaría de pasar las noches conciliando herramientas. Con LiAfrik, comercio, finanzas y RR. HH. conectados: centrarse en el crecimiento, no en el software. El futuro para las empresas ambiciosas.',
      pt: 'Como fundador, eu pararia de passar as noites conciliando ferramentas. Com a LiAfrik, comércio, finanças e RH conectados — foco no crescimento, não no software. O futuro para empresas ambiciosas.',
    },
    name: 'Example',
    role: {
      en: 'SME Founder', fr: 'Fondateur de PME', ar: 'مؤسس شركة صغيرة ومتوسطة', es: 'Fundador de pyme', pt: 'Fundador de PME',
    },
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
                  "{active.quote[lang]}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white font-bold shadow-glow-blue">
                    {active.initials}
                  </span>
                  <div>
                    <p className="font-display font-bold text-ink">{active.role[lang]}</p>
                    <p className="text-sm text-ink-light">{t('testi.example')} · {active.company}</p>
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
