import { motion } from 'framer-motion';
import {
  Cloud, Building2, GitBranch, ShieldCheck, Workflow, Cpu,
  BarChart3, Plug, WifiOff, Database, ScrollText, Lock, Brain, BellRing, Smartphone, Globe2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useLang, type Lang } from '@/i18n/LanguageContext';

interface Feature {
  icon: LucideIcon;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
}

const features: Feature[] = [
  { icon: Cloud, name: { en: 'Cloud Infrastructure', fr: 'Infrastructure cloud', ar: 'بنية تحتية سحابية', es: 'Infraestructura en la nube', pt: 'Infraestrutura em nuvem' }, desc: { en: 'Hosted on world-class cloud providers.', fr: 'Hébergé sur des clouds de classe mondiale.', ar: 'مستضاف لدى مزودي خدمات سحابية عالميين.', es: 'Alojado en proveedores de nube de clase mundial.', pt: 'Hospedado em provedores de nuvem de classe mundial.' } },
  { icon: Building2, name: { en: 'Multi Company', fr: 'Multi-sociétés', ar: 'متعدد الشركات', es: 'Multiempresa', pt: 'Multi-empresa' }, desc: { en: 'Run several companies from one account.', fr: 'Gérez plusieurs sociétés depuis un compte.', ar: 'أدر عدة شركات من حساب واحد.', es: 'Gestiona varias empresas desde una cuenta.', pt: 'Gerencie várias empresas a partir de uma conta.' } },
  { icon: GitBranch, name: { en: 'Multi Branch', fr: 'Multi-agences', ar: 'متعدد الفروع', es: 'Multisucursal', pt: 'Multi-filial' }, desc: { en: 'Connect all your locations in real time.', fr: 'Connectez tous vos sites en temps réel.', ar: 'اربط جميع مواقعك في الوقت الفعلي.', es: 'Conecta todas tus ubicaciones en tiempo real.', pt: 'Conecte todos os seus locais em tempo real.' } },
  { icon: ShieldCheck, name: { en: 'Role Permissions', fr: 'Permissions par rôle', ar: 'صلاحيات الأدوار', es: 'Permisos por rol', pt: 'Permissões por função' }, desc: { en: 'Granular control over who sees what.', fr: 'Contrôle précis de qui voit quoi.', ar: 'تحكّم دقيق في من يرى ماذا.', es: 'Control granular sobre quién ve qué.', pt: 'Controle granular sobre quem vê o quê.' } },
  { icon: Workflow, name: { en: 'Automation', fr: 'Automatisation', ar: 'الأتمتة', es: 'Automatización', pt: 'Automação' }, desc: { en: 'Automate repetitive business workflows.', fr: 'Automatisez les tâches répétitives.', ar: 'أتمِت سير العمل التجاري المتكرر.', es: 'Automatiza flujos de trabajo repetitivos.', pt: 'Automatize fluxos de trabalho repetitivos.' } },
  { icon: Cpu, name: { en: 'Workflow Engine', fr: 'Moteur de flux', ar: 'محرك سير العمل', es: 'Motor de flujos', pt: 'Motor de fluxos' }, desc: { en: 'Build custom workflows visually.', fr: 'Créez des flux personnalisés visuellement.', ar: 'أنشئ سير عمل مخصصاً بصرياً.', es: 'Crea flujos de trabajo personalizados visualmente.', pt: 'Crie fluxos de trabalho personalizados visualmente.' } },
  { icon: BarChart3, name: { en: 'Analytics', fr: 'Analyses', ar: 'التحليلات', es: 'Análisis', pt: 'Análises' }, desc: { en: 'Real-time insights across your business.', fr: 'Indicateurs en temps réel sur votre activité.', ar: 'رؤى فورية عبر أعمالك.', es: 'Información en tiempo real de tu negocio.', pt: 'Insights em tempo real sobre o seu negócio.' } },
  { icon: Plug, name: { en: 'API Ready', fr: 'API prête', ar: 'جاهز لواجهة برمجة التطبيقات', es: 'Listo para API', pt: 'Pronto para API' }, desc: { en: 'Connect LiAfrik to your other tools.', fr: 'Connectez LiAfrik à vos autres outils.', ar: 'اربط LiAfrik بأدواتك الأخرى.', es: 'Conecta LiAfrik con tus otras herramientas.', pt: 'Conecte a LiAfrik às suas outras ferramentas.' } },
  { icon: WifiOff, name: { en: 'Offline Sync', fr: 'Sync hors-ligne', ar: 'مزامنة دون اتصال', es: 'Sincronización offline', pt: 'Sincronização offline' }, desc: { en: 'Keep working even without internet.', fr: 'Travaillez même sans connexion.', ar: 'استمر في العمل حتى دون إنترنت.', es: 'Sigue trabajando incluso sin internet.', pt: 'Continue trabalhando mesmo sem internet.' } },
  { icon: Database, name: { en: 'Cloud Backup', fr: 'Sauvegarde cloud', ar: 'نسخ احتياطي سحابي', es: 'Copia de seguridad en la nube', pt: 'Backup em nuvem' }, desc: { en: 'Your data is always safe and recoverable.', fr: 'Vos données sont sûres et récupérables.', ar: 'بياناتك آمنة دائماً وقابلة للاسترجاع.', es: 'Tus datos siempre están seguros y son recuperables.', pt: 'Seus dados estão sempre seguros e recuperáveis.' } },
  { icon: ScrollText, name: { en: 'Audit Logs', fr: "Journaux d'audit", ar: 'سجلات التدقيق', es: 'Registros de auditoría', pt: 'Registros de auditoria' }, desc: { en: 'Full traceability of every action.', fr: 'Traçabilité complète de chaque action.', ar: 'تتبّع كامل لكل إجراء.', es: 'Trazabilidad completa de cada acción.', pt: 'Rastreabilidade completa de cada ação.' } },
  { icon: Lock, name: { en: 'Secure Payments', fr: 'Paiements sécurisés', ar: 'مدفوعات آمنة', es: 'Pagos seguros', pt: 'Pagamentos seguros' }, desc: { en: 'Encrypted transactions you can trust.', fr: 'Transactions chiffrées et fiables.', ar: 'معاملات مشفّرة يمكنك الوثوق بها.', es: 'Transacciones cifradas en las que puedes confiar.', pt: 'Transações criptografadas em que você pode confiar.' } },
  { icon: Brain, name: { en: 'AI Ready', fr: "Prêt pour l'IA", ar: 'جاهز للذكاء الاصطناعي', es: 'Listo para IA', pt: 'Pronto para IA' }, desc: { en: 'Built-in AI assistance across modules.', fr: 'Assistant IA intégré dans tous les modules.', ar: 'مساعدة ذكاء اصطناعي مدمجة عبر الوحدات.', es: 'Asistencia de IA integrada en todos los módulos.', pt: 'Assistência de IA integrada em todos os módulos.' } },
  { icon: BellRing, name: { en: 'Notifications', fr: 'Notifications', ar: 'الإشعارات', es: 'Notificaciones', pt: 'Notificações' }, desc: { en: 'Stay informed on every important event.', fr: 'Restez informé de chaque événement clé.', ar: 'ابقَ على اطلاع بكل حدث مهم.', es: 'Mantente informado de cada evento importante.', pt: 'Fique informado sobre cada evento importante.' } },
  { icon: Smartphone, name: { en: 'Mobile Friendly', fr: 'Adapté au mobile', ar: 'متوافق مع الهاتف', es: 'Adaptado a móviles', pt: 'Compatível com celular' }, desc: { en: 'A beautiful experience on any device.', fr: 'Une expérience fluide sur tout appareil.', ar: 'تجربة جميلة على أي جهاز.', es: 'Una experiencia perfecta en cualquier dispositivo.', pt: 'Uma experiência perfeita em qualquer dispositivo.' } },
  { icon: Globe2, name: { en: 'Global Architecture', fr: 'Architecture globale', ar: 'بنية عالمية', es: 'Arquitectura global', pt: 'Arquitetura global' }, desc: { en: 'Designed for business realities worldwide.', fr: 'Pensé pour les réalités commerciales mondiales.', ar: 'مصمم لواقع الأعمال حول العالم.', es: 'Diseñado para las realidades empresariales de todo el mundo.', pt: 'Projetado para as realidades de negócios em todo o mundo.' } },
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
              key={f.name.en}
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
              <h3 className="mt-3 font-display font-bold text-sm text-ink leading-tight">{f.name[lang]}</h3>
              <p className="mt-1.5 text-xs text-ink-light leading-relaxed">{f.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
