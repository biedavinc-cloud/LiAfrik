import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { LinkButton } from '@/components/Button';
import { useLang, pick } from '@/i18n/LanguageContext';

export default function SecurityTeaser() {
  const { t, lang } = useLang();

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-br from-liafrik-700 via-liafrik-600 to-cyanx-500 p-8 sm:p-12 overflow-hidden shadow-glow-blue"
        >
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
          <div aria-hidden className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-cyanx-400/30 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-liafrik-100 text-xs font-semibold mb-3">
                <ShieldCheck className="h-4 w-4" /> {t('sec.tag')}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {pick(lang, { en: 'Your data is protected by design', fr: 'Vos données sont protégées par conception', ar: 'بياناتك محمية بالتصميم', es: 'Tus datos están protegidos desde el diseño', pt: 'Seus dados são protegidos desde a conceção' })}
              </h2>
              <p className="mt-3 text-liafrik-100 max-w-xl">
                {pick(lang, {
                  en: 'Encryption, secure cloud infrastructure, automated backups and role-based permissions — built into every LiAfrik platform.',
                  fr: 'Chiffrement, infrastructure cloud sécurisée, sauvegardes automatiques et permissions par rôle — intégrés dans chaque plateforme LiAfrik.',
                  ar: 'التشفير، والبنية التحتية السحابية الآمنة، والنسخ الاحتياطي التلقائي، والصلاحيات القائمة على الأدوار — مدمجة في كل منصة من منصات LiAfrik.',
                  es: 'Cifrado, infraestructura en la nube segura, copias de seguridad automáticas y permisos basados en roles, integrados en cada plataforma LiAfrik.',
                  pt: 'Criptografia, infraestrutura em nuvem segura, backups automáticos e permissões baseadas em função — integrados em cada plataforma LiAfrik.',
                })}
              </p>
            </div>
            <div className="shrink-0">
              <LinkButton to="/security" variant="white" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                {pick(lang, { en: 'Explore Security', fr: 'Voir la sécurité', ar: 'استكشف الأمان', es: 'Explorar seguridad', pt: 'Explorar segurança' })}
              </LinkButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
