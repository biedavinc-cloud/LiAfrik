import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, Phone, Mail, Sparkles, ShieldCheck, Zap,
  ExternalLink, Clock,
} from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import DashboardMockup from '@/components/DashboardMockup';
import { LinkButton, Button } from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { useLang } from '@/i18n/LanguageContext';
import NotFound from '@/pages/NotFound';

export default function ProductPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useLang();
  const product = getProductBySlug(slug);

  if (!product || !product.available) {
    if (product && !product.available) {
      // Coming soon product — redirect handled by ComingSoon page via routing, but guard here
      return null;
    }
    return <NotFound />;
  }

  const Icon = product.icon;

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
                <span className={`grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br ${product.gradient} text-white shadow-glow-blue`}>
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
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
                  <a href={product.appUrl} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center justify-center gap-2 rounded-full bg-liafrik-600 text-white text-base font-semibold px-7 py-3.5 hover:bg-liafrik-700 shadow-premium hover:shadow-glow-blue hover:-translate-y-0.5 active:translate-y-0 transition-all">
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
          <SectionHeading tag={t('product.features')} title={`${product.name} ${lang === 'en' ? 'features' : 'fonctionnalités'}`} align="left" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-white border border-cloud-200 p-5 shadow-card hover:shadow-float transition-shadow"
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
          <SectionHeading tag={t('product.benefits')} title={lang === 'en' ? 'Why teams choose it' : 'Pourquoi les équipes le choisissent'} align="left" />
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
                  <Sparkles className="h-4.5 w-4.5" />
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
          <SectionHeading tag={t('product.industries')} title={lang === 'en' ? 'Built for your industry' : 'Conçu pour votre industrie'} align="left" />
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

      {/* Pricing */}
      {product.pricing.length > 0 && (
        <section className="py-16 sm:py-20 bg-cloud-100/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading tag={lang === 'en' ? 'Pricing' : 'Tarification'} title={t('product.pricingTitle')} subtitle={t('product.pricingSub')} />
            <div className="mt-10 grid md:grid-cols-3 gap-5 items-stretch">
              {product.pricing.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col ${plan.popular ? 'bg-white border-2 border-liafrik-400 shadow-glow-blue md:-translate-y-3' : 'bg-white border border-cloud-200 shadow-card'}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-liafrik-600 to-cyanx-500 text-white text-[11px] font-bold px-3 py-1 shadow-glow-blue">
                      {t('product.mostPopular')}
                    </span>
                  )}
                  <p className="font-display font-bold text-lg text-ink">{plan.name[lang]}</p>
                  <p className="text-sm text-ink-muted mt-1 min-h-[40px]">{plan.description[lang]}</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="font-display text-4xl font-bold text-ink">{plan.price}</span>
                    {plan.period && <span className="text-sm text-ink-light mb-1">{t('product.perMonth')}</span>}
                  </div>
                  <ul className="mt-6 space-y-2.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-soft">
                        <Check className="h-4 w-4 text-liafrik-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                        {f[lang]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    {plan.popular ? (
                      <LinkButton to="/products" variant="primary" size="md" className="w-full justify-center">{plan.cta[lang]}</LinkButton>
                    ) : (
                      <LinkButton to="/products" variant="outline" size="md" className="w-full justify-center">{plan.cta[lang]}</LinkButton>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
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
                <ShieldCheck className="h-4 w-4" /> {lang === 'en' ? 'Secure · Scalable · Global' : 'Sécurisé · Évolutif · Global'}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">{lang === 'en' ? `Run your business on ${product.name}` : `Pilotez votre entreprise avec ${product.name}`}</h2>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <LinkButton to="/products" variant="white" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>{t('product.cta')}</LinkButton>
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
