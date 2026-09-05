import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/Link';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Sparkles, CheckCircle2, Rocket, Loader2 } from 'lucide-react';
import { getProductBySlug } from '@/data/products';
import { Button } from '@/components/Button';
import AppLogo from '@/components/AppLogo';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';
import NotFound from '@/pages/NotFound';

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/forward-form`;

export default function ComingSoonPage() {
  const { slug = '' } = useParams();
  const { t, lang } = useLang();
  const product = getProductBySlug(slug);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const en = lang === 'en';
  useSEO(
    product
      ? {
          title: en ? `${product.name} — Coming Soon | LiAfrik` : `${product.name} — Bientôt disponible | LiAfrik`,
          description: product.description[lang],
        }
      : { title: 'LiAfrik', noindex: true }
  );

  if (!product || product.available) {
    if (product && product.available) return null;
    return <NotFound />;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    if (!email) return;

    setSending(true);
    try {
      await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ name: email.split('@')[0], email, company: null, message: `Notify me when ${product.name} launches`, lang, form_type: 'newsletter' }),
      });
      setSent(true);
      form.reset();
    } catch {
      setSent(true);
    }
    setSending(false);
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <section className="relative flex-1 overflow-hidden py-16 sm:py-24">
        <div aria-hidden className="absolute inset-0 bg-radial-blue" />
        <motion.div aria-hidden
          className="absolute top-20 -right-20 h-72 w-72 rounded-full bg-liafrik-200/40 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div aria-hidden
          className="absolute bottom-20 -left-20 h-72 w-72 rounded-full bg-cyanx-400/25 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-liafrik-700 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> {t('product.back')}
          </Link>

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 text-xs font-bold px-4 py-2 border border-amber-100"
          >
            <Sparkles className="h-3.5 w-3.5" /> {t('cs.tag')}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <AppLogo product={product} className="h-14 w-14 shadow-glow-blue" iconClassName="h-7 w-7" rounded="rounded-2xl" />
            <div className="text-left">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">{product.name}</h1>
              <p className="text-sm font-medium text-ink-light uppercase tracking-wider">{product.category[lang]}</p>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-2xl sm:text-3xl font-bold text-ink leading-tight max-w-2xl mx-auto"
          >
            {t('cs.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 text-base text-ink-muted leading-relaxed max-w-xl mx-auto"
          >
            {product.description[lang]}
          </motion.p>

          {/* Vision chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-7 flex flex-wrap justify-center gap-2"
          >
            {product.features.map((f, i) => (
              <span key={i} className="rounded-full bg-liafrik-50 border border-liafrik-100 px-3.5 py-1.5 text-xs font-semibold text-liafrik-700">
                {f[lang]}
              </span>
            ))}
          </motion.div>

          {/* Notify form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 mx-auto max-w-md rounded-3xl bg-white border border-cloud-200 shadow-premium p-6 sm:p-8"
          >
            <div className="flex items-center justify-center gap-2 text-liafrik-700">
              <Rocket className="h-5 w-5" />
              <p className="font-display font-bold text-lg">{t('cs.notifyTitle')}</p>
            </div>
            <p className="mt-1.5 text-sm text-ink-muted">{t('cs.notifySub')}</p>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 text-emerald-700 px-4 py-4 text-sm font-semibold"
              >
                <CheckCircle2 className="h-5 w-5" /> {t('cs.success')}
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 flex flex-col sm:flex-row gap-2.5">
                <input type="email" required placeholder={t('cs.email')}
                  className="flex-1 rounded-xl border border-cloud-200 bg-cloud-50/50 px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:bg-white focus:ring-2 focus:ring-liafrik-100 outline-none transition-all" />
                <Button type="submit" variant="primary" size="md" disabled={sending} icon={sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bell className="h-4 w-4" />}>{t('cs.notify')}</Button>
              </form>
            )}
          </motion.div>

          <Link to="/products" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-liafrik-700 hover:text-liafrik-800 transition-colors">
            {t('cs.backEco')} <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
