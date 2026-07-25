import { motion } from 'framer-motion';
import {
  Cloud, Building2, GitBranch, ShieldCheck, Workflow, Cpu,
  BarChart3, Plug, WifiOff, Database, ScrollText, Lock, Brain, BellRing, Smartphone, Globe2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';

interface Feature {
  icon: LucideIcon;
  en: string;
  fr: string;
  descEn: string;
  descFr: string;
}

const features: Feature[] = [
  { icon: Cloud, en: 'Cloud Infrastructure', fr: 'Infrastructure cloud', descEn: 'Hosted on world-class cloud providers.', descFr: 'Hébergé sur des clouds de classe mondiale.' },
  { icon: Building2, en: 'Multi Company', fr: 'Multi-sociétés', descEn: 'Run several companies from one account.', descFr: 'Gérez plusieurs sociétés depuis un compte.' },
  { icon: GitBranch, en: 'Multi Branch', fr: 'Multi-agences', descEn: 'Connect all your locations in real time.', descFr: 'Connectez tous vos sites en temps réel.' },
  { icon: ShieldCheck, en: 'Role Permissions', fr: 'Permissions par rôle', descEn: 'Granular control over who sees what.', descFr: 'Contrôle précis de qui voit quoi.' },
  { icon: Workflow, en: 'Automation', fr: 'Automatisation', descEn: 'Automate repetitive business workflows.', descFr: 'Automatisez les tâches répétitives.' },
  { icon: Cpu, en: 'Workflow Engine', fr: 'Moteur de flux', descEn: 'Build custom workflows visually.', descFr: 'Créez des flux personnalisés visuellement.' },
  { icon: BarChart3, en: 'Analytics', fr: 'Analyses', descEn: 'Real-time insights across your business.', descFr: 'Indicateurs en temps réel sur votre activité.' },
  { icon: Plug, en: 'API Ready', fr: 'API prête', descEn: 'Connect LiAfrik to your other tools.', descFr: 'Connectez LiAfrik à vos autres outils.' },
  { icon: WifiOff, en: 'Offline Sync', fr: 'Sync hors-ligne', descEn: 'Keep working even without internet.', descFr: 'Travaillez même sans connexion.' },
  { icon: Database, en: 'Cloud Backup', fr: 'Sauvegarde cloud', descEn: 'Your data is always safe and recoverable.', descFr: 'Vos données sont sûres et récupérables.' },
  { icon: ScrollText, en: 'Audit Logs', fr: "Journaux d'audit", descEn: 'Full traceability of every action.', descFr: 'Traçabilité complète de chaque action.' },
  { icon: Lock, en: 'Secure Payments', fr: 'Paiements sécurisés', descEn: 'Encrypted transactions you can trust.', descFr: 'Transactions chiffrées et fiables.' },
  { icon: Brain, en: 'AI Ready', fr: "Prêt pour l'IA", descEn: 'Built-in AI assistance across modules.', descFr: 'Assistant IA intégré dans tous les modules.' },
  { icon: BellRing, en: 'Notifications', fr: 'Notifications', descEn: 'Stay informed on every important event.', descFr: 'Restez informé de chaque événement clé.' },
  { icon: Smartphone, en: 'Mobile Friendly', fr: 'Adapté au mobile', descEn: 'A beautiful experience on any device.', descFr: 'Une expérience fluide sur tout appareil.' },
  { icon: Globe2, en: 'African-first Architecture', fr: "Architecture africaine d'abord", descEn: 'Designed for African business realities.', descFr: 'Pensé pour les réalités africaines.' },
];

export default function Features() {
  const { t, lang } = useLang();

  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('features.tag')} title={t('features.title')} subtitle={t('features.sub')} />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl bg-white border border-cloud-200 p-5 shadow-card hover:shadow-float transition-all"
            >
              <span className="grid place-items-center h-10 w-10 rounded-xl bg-liafrik-50 text-liafrik-600 group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <h3 className="mt-3 font-display font-bold text-sm text-ink leading-tight">{lang === 'en' ? f.en : f.fr}</h3>
              <p className="mt-1.5 text-xs text-ink-light leading-relaxed">{lang === 'en' ? f.descEn : f.descFr}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
