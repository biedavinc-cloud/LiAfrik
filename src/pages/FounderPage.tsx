import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, Award, User } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';

export default function FounderPage() {
  const { t, lang } = useLang();

  const timeline = [
    { year: '2012', text: lang === 'en' ? 'Began career in digital as a Graphic Designer in Cameroon' : 'Débuts dans le numérique en tant que Designer Graphique au Cameroun' },
    { year: '2015', text: lang === 'en' ? 'Transitioned into e-commerce' : 'Passage à l\'e-commerce' },
    { year: '2019', text: lang === 'en' ? 'Founded LIYAH GROUP, a web & digital agency' : 'Fondation de LIYAH GROUP, agence web & digital' },
    { year: '2022', text: lang === 'en' ? 'Restructured and expanded LIYAH GROUP' : 'Refonte et amélioration de LIYAH GROUP' },
    { year: '2025', text: lang === 'en' ? 'Launched LiAfrik with the full suite of SaaS platforms' : 'Lancement de LiAfrik avec l\'ensemble des plateformes SaaS' },
  ];

  const education = [
    { icon: GraduationCap, title: lang === 'en' ? 'Master in E-commerce' : 'Master en E-commerce', school: 'Learners Point Academy Intl, Dubai', note: lang === 'en' ? 'With distinction' : 'Mention très bien' },
    { icon: Award, title: lang === 'en' ? 'Full Stack Web Dev / SaaS Expert Diploma' : 'Diplôme Full Stack Web Dev / SaaS Expert', school: 'Learners Point Academy Intl, Dubai', note: lang === 'en' ? 'With distinction' : 'Mention très bien' },
    { icon: Briefcase, title: lang === 'en' ? 'Complementary Diplomas' : 'Diplômes complémentaires', school: 'Dubai Knowledge Academy (DKA)', note: '' },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading tag={t('founder.tag')} title={t('founderPage.title')} subtitle={t('founderPage.desc')} />

        {/* Founder portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-6 rounded-3xl glass-card-strong p-8"
        >
          <div className="shrink-0 grid place-items-center h-28 w-28 rounded-3xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white shadow-glow-blue">
            <User className="h-12 w-12" strokeWidth={1.5} />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="font-display font-bold text-2xl text-ink">Vincent Nogue</h3>
            <p className="text-sm font-medium text-liafrik-700 mt-1">{lang === 'en' ? 'CEO & Founder of LiAfrik' : 'CEO & Fondateur de LiAfrik'}</p>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-md">
              {lang === 'en'
                ? 'A designer-turned-developer-turned-founder, Vincent built LiAfrik from a conviction: that technology with African roots can serve the world.'
                : 'Designer devenu développeur devenu fondateur, Vincent a construit LiAfrik avec une conviction : la technologie née avec des racines africaines peut servir le monde.'}
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
          <h3 className="font-display font-bold text-xl text-ink mb-6">{lang === 'en' ? 'The journey' : 'Le parcours'}</h3>
          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-cloud-200">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-[18px] top-1 h-3 w-3 rounded-full bg-liafrik-600 ring-4 ring-liafrik-50" />
                <span className="text-sm font-bold text-liafrik-700">{item.year}</span>
                <p className="text-sm text-ink-muted mt-0.5">{item.text}</p>
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
          <h3 className="font-display font-bold text-xl text-ink mb-6">{lang === 'en' ? 'Education' : 'Formation'}</h3>
          <div className="space-y-5">
            {education.map((edu, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-liafrik-50 text-liafrik-600 shrink-0">
                  <edu.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">{edu.title}</p>
                  <p className="text-sm text-ink-muted mt-0.5">{edu.school}</p>
                  {edu.note && <p className="text-xs text-liafrik-700 font-medium mt-0.5">{edu.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 rounded-3xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 p-8 sm:p-10 text-center shadow-glow-blue relative overflow-hidden"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
          <div className="relative">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">{t('founderPage.vision.title')}</h3>
            <p className="mt-3 text-liafrik-100 max-w-2xl mx-auto leading-relaxed">{t('founderPage.vision.body')}</p>
            <p className="mt-3 text-liafrik-100 max-w-2xl mx-auto leading-relaxed">{t('founderPage.vision.body2')}</p>
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
