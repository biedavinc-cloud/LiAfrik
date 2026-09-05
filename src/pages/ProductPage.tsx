import { useParams } from 'react-router-dom';
import { Link } from '@/components/Link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, Phone, Mail, Sparkles, ShieldCheck,
  ExternalLink, Clock, LayoutDashboard,
} from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import DashboardMockup from '@/components/DashboardMockup';
import AppLogo from '@/components/AppLogo';
import { LinkButton } from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { useLang, pick } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';
import NotFound from '@/pages/NotFound';

export default function ProductPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useLang();
  const product = getProductBySlug(slug);

  useSEO({
    title: product ? `${product.name} — ${product.tagline[lang]} | LiAfrik` : 'LiAfrik',
    description: product?.description[lang],
  });

  if (!product || !product.available) {
    if (product && !product.available) return null;
    return <NotFound />;
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div aria-hidden className="absolute inset-0 bg-radial-blue" />
        <div aria-hidden className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-liafrik-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-liafrik-700 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> {t('product.back')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5"
              >
                <AppLogo product={product} className="h-12 w-12 shadow-glow-blue" iconClassName="h-6 w-6" rounded="rounded-2xl" />
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">{product.name}</h1>
                  <p className="text-sm font-medium text-ink-light uppercase tracking-wider">{product.category[lang]}</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 text-xl font-display font-semibold text-ink-soft leading-snug"
              >
                {product.tagline[lang]}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 text-base text-ink-muted leading-relaxed max-w-xl"
              >
                {product.description[lang]}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                {product.appUrl ? (
                  <a
                    href={product.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-liafrik-600 text-white text-base font-semibold px-7 py-3.5 hover:bg-liafrik-700 shadow-premium hover:shadow-glow-blue hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <ExternalLink className="h-4 w-4" /> {t('product.openApp')}
                  </a>
                ) : (
                  <LinkButton to="/products" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>{t('product.cta')}</LinkButton>
                )}
                <LinkButton to="/support" variant="outline" size="lg" icon={<Phone className="h-4 w-4" />}>{t('product.contact')}</LinkButton>
              </motion.div>

              {!product.appUrl && product.available && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3 py-1.5 font-medium"
                >
                  <Clock className="h-3.5 w-3.5" /> {t('product.appSoon')}
                </motion.p>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
                <DashboardMockup spec={product.dashboard} productName={product.name} accent={product.accent} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading tag={t('product.features')} title={`${product.name} ${pick(lang, { en: 'features', fr: 'fonctionnalités', ar: 'الميزات', es: 'funciones', pt: 'funcionalidades' })}`} align="left" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-white border border-cloud-200 p-5 shadow-card hover:shadow-float hover:-translate-y-0.5 transition-all"
              >
                <span className="grid place-items-center h-9 w-9 rounded-xl bg-liafrik-50 text-liafrik-600 mb-3">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <p className="text-sm font-semibold text-ink">{f[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 bg-cloud-100/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading tag={t('product.benefits')} title={pick(lang, { en: 'Why teams choose it', fr: 'Pourquoi les équipes le choisissent', ar: 'لماذا تختاره الفرق', es: 'Por qué los equipos lo eligen', pt: 'Por que as equipes escolhem' })} align="left" />
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {product.benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="flex items-start gap-3 rounded-2xl bg-white border border-cloud-200 p-5 shadow-card"
              >
                <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white shrink-0">
                  <Sparkles className="h-4 w-4" />
                </span>
                <p className="text-sm font-medium text-ink-soft leading-relaxed pt-1.5">{b[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading tag={t('product.industries')} title={pick(lang, { en: 'Built for your industry', fr: 'Conçu pour votre industrie', ar: 'مصمم لقطاعك', es: 'Creado para tu industria', pt: 'Criado para o seu setor' })} align="left" />
          <div className="mt-8 flex flex-wrap gap-3">
            {product.industries.map((ind, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 18 }}
                className="rounded-full bg-liafrik-50 border border-liafrik-100 px-4 py-2 text-sm font-semibold text-liafrik-700"
              >
                {ind[lang]}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Plan — replaces pricing table */}
      {product.appUrl && (
        <section className="py-16 sm:py-20 bg-cloud-100/60">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white border border-cloud-200 p-10 sm:p-14 shadow-card"
            >
              <span className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white shadow-glow-blue mx-auto mb-5">
                <LayoutDashboard className="h-7 w-7" strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {pick(lang, { en: `Start using ${product.name}`, fr: `Commencer avec ${product.name}`, ar: `ابدأ استخدام ${product.name}`, es: `Empieza a usar ${product.name}`, pt: `Comece a usar ${product.name}` })}
              </h3>
              <p className="mt-3 text-base text-ink-muted max-w-sm mx-auto leading-relaxed">
                {pick(lang, {
                  en: `Discover the full pricing and plan options directly inside ${product.name}. Start free and upgrade as you grow.`,
                  fr: `Découvrez les prix et options de plan directement dans ${product.name}. Commencez gratuitement et évoluez selon votre croissance.`,
                  ar: `اكتشف الأسعار الكاملة وخيارات الخطط مباشرة داخل ${product.name}. ابدأ مجاناً وترقّ مع نموك.`,
                  es: `Descubre todos los precios y opciones de plan directamente en ${product.name}. Empieza gratis y mejora a medida que creces.`,
                  pt: `Descubra os preços completos e as opções de plano diretamente na ${product.name}. Comece grátis e faça upgrade conforme cresce.`,
                })}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={product.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-liafrik-600 text-white text-base font-semibold px-8 py-3.5 hover:bg-liafrik-700 shadow-premium hover:shadow-glow-blue hover:-translate-y-0.5 active:translate-y-0 transition-all w-full sm:w-auto"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {pick(lang, { en: 'Explore Plan', fr: 'Voir le Plan', ar: 'استعرض الخطة', es: 'Ver plan', pt: 'Ver plano' })}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <LinkButton to="/support" variant="outline" size="lg" icon={<Phone className="h-4 w-4" />} className="w-full sm:w-auto justify-center">
                  {t('product.contact')}
                </LinkButton>
              </div>
              <p className="mt-5 text-xs text-ink-light">
                {pick(lang, { en: 'No credit card required to get started.', fr: 'Aucune carte de crédit requise pour démarrer.', ar: 'لا حاجة إلى بطاقة ائتمان للبدء.', es: 'No se requiere tarjeta de crédito para empezar.', pt: 'Não é necessário cartão de crédito para começar.' })}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 p-8 sm:p-12 text-center shadow-glow-blue relative overflow-hidden">
            <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 text-liafrik-100 text-xs font-semibold mb-3">
                <ShieldCheck className="h-4 w-4" /> {pick(lang, { en: 'Secure · Scalable · Global', fr: 'Sécurisé · Évolutif · Global', ar: 'آمن · قابل للتوسع · عالمي', es: 'Seguro · Escalable · Global', pt: 'Seguro · Escalável · Global' })}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {pick(lang, { en: `Run your business on ${product.name}`, fr: `Pilotez votre entreprise avec ${product.name}`, ar: `أدر عملك باستخدام ${product.name}`, es: `Gestiona tu negocio con ${product.name}`, pt: `Administre seu negócio com ${product.name}` })}
              </h2>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {product.appUrl ? (
                  <a
                    href={product.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-liafrik-700 text-base font-semibold px-7 py-3.5 hover:bg-cloud-50 shadow-premium hover:-translate-y-0.5 transition-all"
                  >
                    {pick(lang, { en: 'Explore Plan', fr: 'Voir le Plan', ar: 'استعرض الخطة', es: 'Ver plan', pt: 'Ver plano' })} <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <LinkButton to="/products" variant="white" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>{t('product.cta')}</LinkButton>
                )}
                <a href="mailto:cs@liafrik.com" className="inline-flex items-center gap-2 rounded-full text-white border border-white/30 px-7 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors">
                  <Mail className="h-4 w-4" /> {t('product.contact')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
