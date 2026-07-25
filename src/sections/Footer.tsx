import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Linkedin, Facebook, Instagram, Twitter, Youtube, Clock,
  ArrowRight, Mail, MapPin, Send,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { products } from '@/data/products';
import { useLang } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t, lang } = useLang();

  const columns = [
    {
      title: t('footer.solutions'),
      links: [
        { label: lang === 'en' ? 'How it works' : 'Comment ça marche', href: '/#how' },
        { label: lang === 'en' ? 'Why LiAfrik' : 'Pourquoi LiAfrik', href: '/#why' },
        { label: lang === 'en' ? 'Build your stack' : 'Construisez votre stack', href: '/#build' },
        { label: lang === 'en' ? 'Features' : 'Fonctionnalités', href: '/#features' },
        { label: lang === 'en' ? 'Security' : 'Sécurité', href: '/#security' },
        { label: lang === 'en' ? 'Industries' : 'Industries', href: '/#industries' },
      ],
    },
    {
      title: t('footer.developers'),
      links: [
        { label: lang === 'en' ? 'API Reference' : 'Référence API', href: '/#features' },
        { label: lang === 'en' ? 'Integrations' : 'Intégrations', href: '/#features' },
        { label: lang === 'en' ? 'Documentation' : 'Documentation', href: '/#features' },
        { label: lang === 'en' ? 'Status' : 'Statut', href: '/#features' },
      ],
    },
    {
      title: t('footer.about'),
      links: [
        { label: t('footer.about'), href: '/#about' },
        { label: t('footer.careers'), href: '/#contact' },
        { label: t('footer.contact'), href: '/#contact' },
        { label: lang === 'en' ? 'Blog' : 'Blog', href: '/#contact' },
      ],
    },
  ];

  return (
    <footer id="about" className="relative bg-gradient-to-b from-white to-cloud-100/70 border-t border-cloud-200 overflow-hidden">
      <div aria-hidden className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-liafrik-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-8">
        {/* Top — brand + newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 pb-10 border-b border-cloud-200">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-sm">{t('footer.tagline')}</p>
            <p className="mt-3 text-xs text-ink-light">{lang === 'en' ? 'A LIYAH GROUP company' : 'Une société LIYAH GROUP'} · liyahgroup.me</p>
            <div className="mt-5 flex items-center gap-2.5">
              {[Linkedin, Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <motion.a key={i} href="https://liyahgroup.me" target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="grid place-items-center h-9 w-9 rounded-xl bg-white border border-cloud-200 text-ink-light hover:bg-liafrik-600 hover:text-white hover:border-liafrik-600 transition-colors shadow-card" aria-label="social">
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="font-display font-bold text-sm text-ink mb-3">{lang === 'en' ? 'Stay in the loop' : 'Restez informé'}</p>
            <p className="text-sm text-ink-muted mb-4">{lang === 'en' ? 'Product updates, launches and African business insights.' : 'Mises à jour, lancements et actualités pour les entreprises africaines.'}</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input type="email" placeholder={lang === 'en' ? 'Your email' : 'Votre e-mail'}
                className="flex-1 min-w-0 rounded-xl border border-cloud-200 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:ring-2 focus:ring-liafrik-100 outline-none transition-all" />
              <button type="submit" className="grid place-items-center h-10 w-10 shrink-0 rounded-xl bg-liafrik-600 text-white hover:bg-liafrik-700 shadow-card transition-colors" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <p className="font-display font-bold text-sm text-ink mb-3">{lang === 'en' ? 'Contact' : 'Contact'}</p>
            <ul className="space-y-2.5">
              <li><a href="mailto:cs@liafrik.com" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-liafrik-700 transition-colors"><Mail className="h-4 w-4 text-liafrik-600" /> cs@liafrik.com</a></li>
              <li><a href="mailto:support@liafrik.com" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-liafrik-700 transition-colors"><Mail className="h-4 w-4 text-liafrik-600" /> support@liafrik.com</a></li>
              <li><span className="inline-flex items-center gap-2 text-sm text-ink-muted"><MapPin className="h-4 w-4 text-liafrik-600" /> Dubai · Yaoundé · Lagos</span></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-display font-bold text-sm text-ink mb-3">{lang === 'en' ? 'Get started' : 'Démarrer'}</p>
            <div className="space-y-2.5">
              <Link to="/#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-liafrik-700 hover:text-liafrik-800 transition-colors">
                {t('nav.startFree')} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div>
                <Link to="/#contact" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-liafrik-700 transition-colors">
                  {t('nav.bookDemo')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Middle — all products (wrap on two lines) */}
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

        {/* Bottom — link columns + legal */}
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-8 pt-10">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display font-bold text-sm text-ink mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-ink-muted hover:text-liafrik-700 transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-cloud-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-light text-center sm:text-left">{t('footer.rights')} · © {new Date().getFullYear()}</p>
          <div className="flex items-center gap-5">
            <a href="/#contact" className="text-xs text-ink-light hover:text-liafrik-700 transition-colors">{t('footer.privacy')}</a>
            <a href="/#contact" className="text-xs text-ink-light hover:text-liafrik-700 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
