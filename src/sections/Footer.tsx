import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Linkedin, Facebook, Instagram, Twitter, Youtube, Clock,
  ArrowRight, Mail, MapPin, Send, CheckCircle2, Loader2,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { products } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/forward-form`;

export default function Footer() {
  const { t, lang } = useLang();
  const [nlStatus, setNlStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    if (!email) return;

    setNlStatus('submitting');
    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ name: email.split('@')[0], email, company: null, message: 'Newsletter subscription', lang, form_type: 'newsletter' }),
      });
      if (res.ok) {
        setNlStatus('success');
        form.reset();
      } else {
        setNlStatus('error');
      }
    } catch {
      setNlStatus('error');
    }
    setTimeout(() => setNlStatus('idle'), 4000);
  };

  return (
    <footer id="about" className="relative bg-gradient-to-b from-white to-cloud-100/70 border-t border-cloud-200 overflow-hidden">
      <div aria-hidden className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-liafrik-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-8">
        {/* Top — brand + newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 pb-10 border-b border-cloud-200">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-sm">{t('footer.tagline')}</p>
            <div className="mt-5 flex items-center gap-2.5">
              {[Linkedin, Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <motion.a key={i} href="#" target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="grid place-items-center h-9 w-9 rounded-xl bg-white border border-cloud-200 text-ink-light hover:bg-liafrik-600 hover:text-white hover:border-liafrik-600 transition-colors shadow-card" aria-label="social">
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="font-display font-bold text-sm text-ink mb-3">{lang === 'en' ? 'Stay in the loop' : 'Restez informé'}</p>
            <p className="text-sm text-ink-muted mb-4">{lang === 'en' ? 'Product updates and ecosystem news.' : "Mises à jour produit et actualités de l'écosystème."}</p>
            <form onSubmit={onNewsletter} className="flex items-center gap-2">
              <input name="email" type="email" placeholder={lang === 'en' ? 'Your email' : 'Votre e-mail'}
                className="flex-1 min-w-0 rounded-xl border border-cloud-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:ring-2 focus:ring-liafrik-100 outline-none transition-all" />
              <button type="submit" disabled={nlStatus === 'submitting' || nlStatus === 'success'}
                className="grid place-items-center h-10 w-10 shrink-0 rounded-xl bg-liafrik-600 text-white hover:bg-liafrik-700 shadow-card transition-colors disabled:opacity-60" aria-label="Subscribe">
                {nlStatus === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : nlStatus === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
            <AnimatePresence>
              {nlStatus === 'success' && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-2 text-xs text-emerald-600 font-medium">
                  {lang === 'en' ? 'Subscribed! Welcome to the ecosystem.' : 'Inscrit ! Bienvenue dans l\'écosystème.'}
                </motion.p>
              )}
              {nlStatus === 'error' && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-2 text-xs text-red-500 font-medium">
                  {lang === 'en' ? 'Something went wrong. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-2">
            <p className="font-display font-bold text-sm text-ink mb-3">{t('footer.contact')}</p>
            <ul className="space-y-2.5">
              <li><a href="mailto:info@liafrik.com" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-liafrik-700 transition-colors"><Mail className="h-4 w-4 text-liafrik-600" /> info@liafrik.com</a></li>
              <li><a href="mailto:support@liafrik.com" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-liafrik-700 transition-colors"><Mail className="h-4 w-4 text-liafrik-600" /> support@liafrik.com</a></li>
              <li><span className="inline-flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4 text-liafrik-600" /> {lang === 'en' ? 'Dubai · Yaoundé' : 'Dubaï · Yaoundé'}</span></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-display font-bold text-sm text-ink mb-3">{lang === 'en' ? 'Get started' : 'Démarrer'}</p>
            <div className="space-y-2.5">
              <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-liafrik-700 hover:text-liafrik-800 transition-colors">
                {t('nav.startFree')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div>
                <Link to="/support" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-liafrik-700 transition-colors">
                  {t('nav.bookDemo')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Middle — all products */}
        <div className="py-10 border-b border-cloud-200">
          <p className="font-display font-bold text-sm text-ink mb-5">{t('footer.products')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {products.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`}
                className="group inline-flex items-center gap-2 rounded-xl bg-white border border-cloud-200 px-3 py-2.5 hover:border-liafrik-300 hover:shadow-card transition-all">
                <span className={`grid place-items-center h-7 w-7 rounded-lg bg-gradient-to-br ${p.gradient} text-white shrink-0`}>
                  <p.icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink-soft truncate group-hover:text-liafrik-700 transition-colors">{p.name}</span>
                  <span className="block text-[10px] text-ink-light truncate">{p.category[lang]}</span>
                </div>
                {!p.available && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 text-amber-700 text-[9px] font-bold px-1.5 py-0.5 border border-amber-100 shrink-0">
                    <Clock className="h-2.5 w-2.5" />
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom — link columns */}
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-8 pt-10">
          <div>
            <p className="font-display font-bold text-sm text-ink mb-4">{t('footer.products')}</p>
            <ul className="space-y-2.5">
              <li><Link to="/products" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{lang === 'en' ? 'All platforms' : 'Toutes les plateformes'}</Link></li>
              <li><Link to="/products/os" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">OS</Link></li>
              <li><Link to="/products/pos" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">POS</Link></li>
              <li><Link to="/products/crm" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">CRM</Link></li>
              <li><Link to="/products/libooks" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">LiBooks</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-ink mb-4">{t('footer.company')}</p>
            <ul className="space-y-2.5">
              <li><Link to="/#about" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{t('footer.about')}</Link></li>
              <li><Link to="/founder" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{t('nav.founder')}</Link></li>
              <li><Link to="/presence" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{t('nav.presence')}</Link></li>
              <li><Link to="/security" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{t('nav.security')}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-ink mb-4">{t('footer.support')}</p>
            <ul className="space-y-2.5">
              <li><a href="mailto:info@liafrik.com" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{lang === 'en' ? 'General Inquiries' : 'Demandes générales'}</a></li>
              <li><a href="mailto:support@liafrik.com" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{lang === 'en' ? 'Customer Support' : 'Support client'}</a></li>
              <li><Link to="/support" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-ink mb-4">{t('footer.legal')}</p>
            <ul className="space-y-2.5">
              <li><Link to="/privacy" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms" className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cloud-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-light text-center sm:text-left">{t('footer.rights')} · © {new Date().getFullYear()}</p>
          <p className="text-xs text-ink-light text-center sm:text-right">
            {lang === 'en' ? 'LIYAH GROUP · SPC FZC, UAE — operating LiAfrik' : 'LIYAH GROUP · SPC FZC, EAU — exploitant LiAfrik'}
          </p>
        </div>
      </div>
    </footer>
  );
}
