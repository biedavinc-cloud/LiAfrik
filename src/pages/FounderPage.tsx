import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, Award } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang, pick } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function FounderPage() {
  const { t, lang } = useLang();
  useSEO({
    title: pick(lang, {
      en: 'Vincent Nogué — Founder & CEO | LiAfrik',
      fr: 'Vincent Nogué — Fondateur et PDG | LiAfrik',
      ar: 'فينسنت نوغيه — المؤسس والرئيس التنفيذي | LiAfrik',
      es: 'Vincent Nogué — Fundador y CEO | LiAfrik',
      pt: 'Vincent Nogué — Fundador e CEO | LiAfrik',
    }),
    description: pick(lang, {
      en: 'The story behind LiAfrik: from graphic design in Cameroon to building a global SaaS ecosystem, led by founder Vincent Nogué.',
      fr: "L'histoire derrière LiAfrik : du design graphique au Cameroun à la construction d'un écosystème SaaS mondial, menée par le fondateur Vincent Nogué.",
      ar: 'قصة LiAfrik: من التصميم الجرافيكي في الكاميرون إلى بناء نظام SaaS عالمي متكامل، بقيادة المؤسس فينسنت نوغيه.',
      es: 'La historia detrás de LiAfrik: del diseño gráfico en Camerún a construir un ecosistema SaaS global, liderado por el fundador Vincent Nogué.',
      pt: 'A história por trás da LiAfrik: do design gráfico nos Camarões à construção de um ecossistema SaaS global, liderado pelo fundador Vincent Nogué.',
    }),
  });

  const timeline = [
    { year: '2012', text: pick(lang, {
      en: 'Began career in digital as a Graphic Designer in Cameroon',
      fr: 'Débuts dans le numérique en tant que Designer Graphique au Cameroun',
      ar: 'بدأ مسيرته الرقمية كمصمم جرافيك في الكاميرون',
      es: 'Comenzó su carrera digital como diseñador gráfico en Camerún',
      pt: 'Iniciou a carreira digital como Designer Gráfico nos Camarões',
    }) },
    { year: '2015', text: pick(lang, {
      en: 'Transitioned into e-commerce in Cameroon',
      fr: "Passage à l'e-commerce au Cameroun",
      ar: 'انتقل إلى مجال التجارة الإلكترونية في الكاميرون',
      es: 'Hizo la transición al comercio electrónico en Camerún',
      pt: 'Fez a transição para o e-commerce nos Camarões',
    }) },
    { year: '2019', text: pick(lang, {
      en: 'Founded LIYAH GROUP, a web & digital agency in Cameroon',
      fr: 'Fondation de LIYAH GROUP, une agence web & digital au Cameroun',
      ar: 'أسّس LIYAH GROUP، وكالة ويب ورقمية في الكاميرون',
      es: 'Fundó LIYAH GROUP, una agencia web y digital en Camerún',
      pt: 'Fundou a LIYAH GROUP, uma agência web e digital nos Camarões',
    }) },
    { year: '2022', text: pick(lang, {
      en: 'Restructured and expanded operations of LIYAH GROUP in Abu Dhabi, UAE',
      fr: 'Refonte et expansion des opérations de LIYAH GROUP à Abu Dhabi, EAU',
      ar: 'أعاد هيكلة عمليات LIYAH GROUP ووسّعها في أبوظبي، الإمارات',
      es: 'Reestructuró y expandió las operaciones de LIYAH GROUP en Abu Dabi, EAU',
      pt: 'Reestruturou e expandiu as operações da LIYAH GROUP em Abu Dhabi, EAU',
    }) },
    { year: '2025', text: pick(lang, {
      en: 'Launched LiAfrik with the full suite of SaaS platforms in Dubai, UAE',
      fr: "Lancement de LiAfrik avec l'ensemble des plateformes SaaS à Dubaï, EAU",
      ar: 'أطلق LiAfrik بمجموعته الكاملة من منصات SaaS في دبي، الإمارات',
      es: 'Lanzó LiAfrik con la suite completa de plataformas SaaS en Dubái, EAU',
      pt: 'Lançou a LiAfrik com o conjunto completo de plataformas SaaS em Dubai, EAU',
    }) },
  ];

  const education = [
    { icon: GraduationCap, title: pick(lang, { en: 'Master in E-commerce', fr: 'Master en E-commerce', ar: 'ماجستير في التجارة الإلكترونية', es: 'Máster en Comercio Electrónico', pt: 'Mestrado em E-commerce' }), school: 'Learners Point Academy Intl, Dubai', note: pick(lang, { en: 'With distinction', fr: 'Mention très bien', ar: 'بامتياز', es: 'Con distinción', pt: 'Com distinção' }) },
    { icon: Award, title: pick(lang, { en: 'Full Stack Web Dev / SaaS Expert Diploma', fr: 'Diplôme Full Stack Web Dev / SaaS Expert', ar: 'دبلوم تطوير الويب المتكامل / خبير SaaS', es: 'Diploma de Desarrollo Web Full Stack / Experto en SaaS', pt: 'Diploma de Desenvolvimento Web Full Stack / Especialista em SaaS' }), school: 'Learners Point Academy Intl, Dubai', note: pick(lang, { en: 'With distinction', fr: 'Mention très bien', ar: 'بامتياز', es: 'Con distinción', pt: 'Com distinção' }) },
    { icon: Briefcase, title: pick(lang, { en: 'Complementary Diplomas', fr: 'Diplômes complémentaires', ar: 'دبلومات تكميلية', es: 'Diplomas complementarios', pt: 'Diplomas complementares' }), school: 'Dubai Knowledge Academy (DKA)', note: '' },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading tag={t('founder.tag')} title={t('founderPage.title')} subtitle={t('founderPage.desc')} />

        {/* Founder portrait — real photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-8 rounded-3xl bg-white border border-cloud-200 p-8 sm:p-10 shadow-card"
        >
          <div className="shrink-0 relative">
            <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl overflow-hidden ring-4 ring-liafrik-100 shadow-glow-blue">
              <img
                src="/images/founder/IMG_6290.JPG"
                alt="Vincent Nogue — CEO & Founder of LiAfrik"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 h-8 w-8 rounded-xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 shadow-glow-blue" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink">Vincent Nogue</h3>
            <p className="text-sm font-medium text-liafrik-700 mt-1">{pick(lang, { en: 'CEO & Founder of LiAfrik', fr: 'CEO & Fondateur de LiAfrik', ar: 'الرئيس التنفيذي ومؤسس LiAfrik', es: 'CEO y fundador de LiAfrik', pt: 'CEO e fundador da LiAfrik' })}</p>
            <p className="mt-1 text-xs text-ink-light uppercase tracking-wider">{pick(lang, { en: 'Dubai, UAE · Yaoundé, Cameroon', fr: 'Dubaï, EAU · Yaoundé, Cameroun', ar: 'دبي، الإمارات · ياوندي، الكاميرون', es: 'Dubái, EAU · Yaundé, Camerún', pt: 'Dubai, EAU · Yaoundé, Camarões' })}</p>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-md">
              {pick(lang, {
                en: 'A designer-turned-developer-turned-founder, Vincent built LiAfrik from a conviction: technology with African roots can serve the world. Over 12 years building digital products, he combined his background in design, e-commerce, and engineering to create an ecosystem that works for any ambitious business, anywhere.',
                fr: "Designer devenu développeur devenu fondateur, Vincent a construit LiAfrik avec une conviction : la technologie née en Afrique peut servir le monde. En plus de 12 ans à construire des produits numériques, il a combiné son expérience en design, e-commerce et ingénierie pour créer un écosystème qui fonctionne pour toute entreprise ambitieuse, partout.",
                ar: 'مصمم تحوّل إلى مطوّر ثم إلى مؤسس، بنى فينسنت LiAfrik انطلاقاً من قناعة راسخة: أن التقنية ذات الجذور الأفريقية يمكنها خدمة العالم. على مدى أكثر من 12 عاماً في بناء المنتجات الرقمية، جمع بين خبرته في التصميم والتجارة الإلكترونية والهندسة ليصنع نظاماً متكاملاً يخدم أي عمل طموح، في أي مكان.',
                es: 'Diseñador convertido en desarrollador y luego en fundador, Vincent construyó LiAfrik a partir de una convicción: la tecnología con raíces africanas puede servir al mundo. Con más de 12 años creando productos digitales, combinó su experiencia en diseño, comercio electrónico e ingeniería para crear un ecosistema que funciona para cualquier negocio ambicioso, en cualquier lugar.',
                pt: 'De designer a desenvolvedor e depois fundador, Vincent construiu a LiAfrik a partir de uma convicção: a tecnologia com raízes africanas pode servir o mundo. Com mais de 12 anos construindo produtos digitais, ele combinou sua experiência em design, e-commerce e engenharia para criar um ecossistema que funciona para qualquer negócio ambicioso, em qualquer lugar.',
              })}
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 rounded-3xl bg-white border border-cloud-200 p-8 sm:p-10 shadow-card"
        >
          <h3 className="font-display font-bold text-xl text-ink mb-8">{pick(lang, { en: 'The journey', fr: 'Le parcours', ar: 'المسيرة', es: 'El recorrido', pt: 'A jornada' })}</h3>
          <div className="relative pl-8 space-y-7 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-liafrik-300 before:to-cyanx-300/40">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[21px] top-0.5 h-4 w-4 rounded-full bg-white border-2 border-liafrik-500 ring-4 ring-liafrik-50 shadow-sm" />
                <span className="text-sm font-bold text-liafrik-700 tracking-wide">{item.year}</span>
                <p className="text-sm text-ink-muted mt-0.5 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 rounded-3xl bg-white border border-cloud-200 p-8 sm:p-10 shadow-card"
        >
          <h3 className="font-display font-bold text-xl text-ink mb-6">{pick(lang, { en: 'Education', fr: 'Formation', ar: 'التعليم', es: 'Formación', pt: 'Formação' })}</h3>
          <div className="space-y-5">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-cloud-50/60 border border-cloud-100"
              >
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-white border border-cloud-200 text-liafrik-600 shrink-0 shadow-sm">
                  <edu.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{edu.title}</p>
                  <p className="text-sm text-ink-muted mt-0.5">{edu.school}</p>
                  {edu.note && (
                    <span className="inline-block mt-1.5 text-[11px] font-medium text-liafrik-700 bg-liafrik-50 border border-liafrik-100 rounded-full px-2.5 py-0.5">
                      {edu.note}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-3xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 p-8 sm:p-10 text-center shadow-glow-blue relative overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
          <div className="relative">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {pick(lang, {
                en: '"African roots. Global ambition."',
                fr: '"Racines africaines. Ambition mondiale."',
                ar: '"جذور أفريقية. طموح عالمي."',
                es: '"Raíces africanas. Ambición global."',
                pt: '"Raízes africanas. Ambição global."',
              })}
            </h3>
            <p className="mt-4 text-liafrik-100 max-w-2xl mx-auto leading-relaxed">
              {pick(lang, {
                en: 'LiAfrik was built from the belief that powerful, elegant software should not be the privilege of any single continent. Every platform in the ecosystem reflects the real problems Vincent encountered across Africa and the Middle East — and the conviction that they deserve world-class solutions.',
                fr: "LiAfrik a été construit avec la conviction que des logiciels puissants et élégants ne devraient pas être le privilège d'un seul continent. Chaque plateforme de l'écosystème reflète des problèmes réels rencontrés en Afrique et au Moyen-Orient — et la conviction qu'ils méritent des solutions de classe mondiale.",
                ar: 'بُني LiAfrik انطلاقاً من قناعة بأن البرمجيات القوية والأنيقة لا ينبغي أن تكون امتيازاً لقارة واحدة فقط. تعكس كل منصة في هذا النظام المتكامل مشكلات حقيقية واجهها فينسنت في أفريقيا والشرق الأوسط — وقناعة بأنها تستحق حلولاً عالمية المستوى.',
                es: 'LiAfrik se construyó a partir de la convicción de que un software potente y elegante no debería ser el privilegio de un solo continente. Cada plataforma del ecosistema refleja los problemas reales que Vincent encontró en África y Oriente Medio, y la convicción de que merecen soluciones de clase mundial.',
                pt: 'A LiAfrik foi construída a partir da crença de que um software poderoso e elegante não deveria ser privilégio de um único continente. Cada plataforma do ecossistema reflete os problemas reais que Vincent encontrou na África e no Oriente Médio — e a convicção de que eles merecem soluções de classe mundial.',
              })}
            </p>
          </div>
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
