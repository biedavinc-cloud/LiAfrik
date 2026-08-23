import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, Award } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';

export default function FounderPage() {
  const { t, lang } = useLang();
  const en = lang === 'en';

  const timeline = [
    { year: '2012', text: en ? 'Began career in digital as a Graphic Designer in Cameroon' : 'Débuts dans le numérique en tant que Designer Graphique au Cameroun' },
    { year: '2015', text: en ? 'Transitioned into e-commerce in Cameroon' : "Passage à l'e-commerce au Cameroun" },
    { year: '2019', text: en ? 'Founded LIYAH GROUP, a web & digital agency in Cameroon' : 'Fondation de LIYAH GROUP, une agence web & digital au Cameroun' },
    { year: '2022', text: en ? 'Restructured and expanded operations of LIYAH GROUP in Abu Dhabi, UAE' : 'Refonte et expansion des opérations de LIYAH GROUP à Abu Dhabi, EAU' },
    { year: '2025', text: en ? 'Launched LiAfrik with the full suite of SaaS platforms in Dubai, UAE' : "Lancement de LiAfrik avec l'ensemble des plateformes SaaS à Dubaï, EAU" },
  ];

  const education = [
    { icon: GraduationCap, title: en ? 'Master in E-commerce' : 'Master en E-commerce', school: 'Learners Point Academy Intl, Dubai', note: en ? 'With distinction' : 'Mention très bien' },
    { icon: Award, title: en ? 'Full Stack Web Dev / SaaS Expert Diploma' : 'Diplôme Full Stack Web Dev / SaaS Expert', school: 'Learners Point Academy Intl, Dubai', note: en ? 'With distinction' : 'Mention très bien' },
    { icon: Briefcase, title: en ? 'Complementary Diplomas' : 'Diplômes complémentaires', school: 'Dubai Knowledge Academy (DKA)', note: '' },
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
            <p className="text-sm font-medium text-liafrik-700 mt-1">{en ? 'CEO & Founder of LiAfrik' : 'CEO & Fondateur de LiAfrik'}</p>
            <p className="mt-1 text-xs text-ink-light uppercase tracking-wider">{en ? 'Dubai, UAE · Yaoundé, Cameroon' : 'Dubaï, EAU · Yaoundé, Cameroun'}</p>
            <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-md">
              {en
                ? 'A designer-turned-developer-turned-founder, Vincent built LiAfrik from a conviction: technology with African roots can serve the world. Over 12 years building digital products, he combined his background in design, e-commerce, and engineering to create an ecosystem that works for any ambitious business, anywhere.'
                : "Designer devenu développeur devenu fondateur, Vincent a construit LiAfrik avec une conviction : la technologie née en Afrique peut servir le monde. En plus de 12 ans à construire des produits numériques, il a combiné son expérience en design, e-commerce et ingénierie pour créer un écosystème qui fonctionne pour toute entreprise ambitieuse, partout."}
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
          <h3 className="font-display font-bold text-xl text-ink mb-8">{en ? 'The journey' : 'Le parcours'}</h3>
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
          <h3 className="font-display font-bold text-xl text-ink mb-6">{en ? 'Education' : 'Formation'}</h3>
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
              {en ? '"African roots. Global ambition."' : '"Racines africaines. Ambition mondiale."'}
            </h3>
            <p className="mt-4 text-liafrik-100 max-w-2xl mx-auto leading-relaxed">
              {en
                ? 'LiAfrik was built from the belief that powerful, elegant software should not be the privilege of any single continent. Every platform in the ecosystem reflects the real problems Vincent encountered across Africa and the Middle East — and the conviction that they deserve world-class solutions.'
                : "LiAfrik a été construit avec la conviction que des logiciels puissants et élégants ne devraient pas être le privilège d'un seul continent. Chaque plateforme de l'écosystème reflète des problèmes réels rencontrés en Afrique et au Moyen-Orient — et la conviction qu'ils méritent des solutions de classe mondiale."}
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
