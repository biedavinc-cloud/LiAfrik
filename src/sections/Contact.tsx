import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, Headset, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';
import { supabase } from '@/lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim() || null;
    const message = String(data.get('message') ?? '').trim();

    setStatus('submitting');
    const { error } = await supabase.from('contact_submissions').insert({
      name, email, company, message, lang,
    });

    if (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }
    setStatus('success');
    form.reset();
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-cloud-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading tag={t('contact.tag')} title={t('contact.title')} subtitle={t('contact.sub')} />

        <div className="mt-12 grid lg:grid-cols-5 gap-5">
          {/* Contact info cards */}
          <div className="lg:col-span-2 space-y-4">
            <InfoCard icon={Phone} title={t('contact.phone')} lines={['+971 50 385 7203', '+237 6XX XXX XXX']} />
            <InfoCard icon={Mail} title={t('contact.email')} lines={['cs@liafrik.com', 'support@liafrik.com']} />
            <InfoCard icon={MapPin} title={lang === 'en' ? 'Presence' : 'Présence'} lines={['Dubai · Yaoundé']} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-gradient-to-br from-liafrik-600 to-liafrik-700 p-5 text-white shadow-glow-blue"
            >
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-xl bg-white/15"><Headset className="h-5 w-5" /></span>
                <div>
                  <p className="font-display font-bold text-sm">{t('contact.support.title')}</p>
                  <p className="text-xs text-liafrik-100">{t('contact.support.desc')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 rounded-3xl bg-white border border-cloud-200 shadow-premium p-6 sm:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t('contact.form.name')} name="name" type="text" required />
              <Field label={t('contact.form.email')} name="email" type="email" required />
            </div>
            <Field label={t('contact.form.company')} name="company" type="text" />
            <div>
              <label className="block text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wider">{t('contact.form.message')}</label>
              <textarea name="message" rows={4} required
                className="w-full rounded-xl border border-cloud-200 bg-cloud-50/50 px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:bg-white focus:ring-2 focus:ring-liafrik-100 outline-none transition-all resize-none" />
            </div>
            <div className="flex items-center justify-between gap-4 pt-1">
              <p className="text-xs text-ink-light">{lang === 'en' ? 'We reply within one business day.' : 'Nous répondons sous un jour ouvré.'}</p>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === 'submitting' || status === 'success'}
                iconRight={
                  status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" />
                  : status === 'success' ? <CheckCircle2 className="h-4 w-4" />
                  : status === 'error' ? <AlertCircle className="h-4 w-4" />
                  : <Send className="h-4 w-4" />
                }
              >
                {status === 'submitting'
                  ? (lang === 'en' ? 'Sending...' : 'Envoi...')
                  : status === 'success'
                    ? t('contact.form.success')
                    : status === 'error'
                      ? (lang === 'en' ? 'Try again' : 'Réessayer')
                      : t('contact.form.send')}
              </Button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {lang === 'en' ? 'Something went wrong. Please try again or email us directly.' : 'Une erreur est survenue. Veuillez réessayer ou nous écrire directement.'}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof Phone; title: string; lines: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-white border border-cloud-200 p-5 shadow-card hover:shadow-float transition-shadow"
    >
      <div className="flex items-center gap-3">
        <span className="grid place-items-center h-10 w-10 rounded-xl bg-liafrik-50 text-liafrik-600"><Icon className="h-5 w-5" /></span>
        <div>
          <p className="text-xs font-semibold text-ink-light uppercase tracking-wider">{title}</p>
          {lines.map((l) => <p key={l} className="text-sm font-medium text-ink-soft">{l}</p>)}
        </div>
      </div>
    </motion.div>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wider">{label}</label>
      <input name={name} type={type} required={required}
        className="w-full rounded-xl border border-cloud-200 bg-cloud-50/50 px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:bg-white focus:ring-2 focus:ring-liafrik-100 outline-none transition-all" />
    </div>
  );
}

export function FloatingContact() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 300, damping: 18 }}
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((v) => !v)}
          className="relative grid place-items-center h-14 w-14 rounded-full bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white shadow-glow-blue"
          aria-label="Contact support"
        >
          <span className="absolute inset-0 rounded-full bg-liafrik-400 animate-pulse-ring" />
          {open ? <MessageCircle className="h-6 w-6" /> : <Headset className="h-6 w-6" />}
        </motion.button>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute bottom-16 right-0 w-72 rounded-2xl bg-white border border-cloud-200 shadow-premium p-5"
          >
            <p className="font-display font-bold text-ink text-sm">{t('contact.support.title')}</p>
            <p className="text-xs text-ink-light mt-0.5">{t('contact.support.desc')}</p>
            <div className="mt-4 space-y-2">
              <a href="mailto:cs@liafrik.com" className="flex items-center gap-2.5 rounded-xl bg-cloud-50 px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-liafrik-50 transition-colors">
                <Mail className="h-4 w-4 text-liafrik-600" /> cs@liafrik.com
              </a>
              <a href="tel:+971503857203" className="flex items-center gap-2.5 rounded-xl bg-cloud-50 px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-liafrik-50 transition-colors">
                <Phone className="h-4 w-4 text-liafrik-600" /> +971 50 385 7203
              </a>
            </div>
            <p className="mt-4 text-[11px] text-ink-light">{lang === 'en' ? 'LiAfrik — Dubai, UAE' : 'LiAfrik — Dubaï, EAU'}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
