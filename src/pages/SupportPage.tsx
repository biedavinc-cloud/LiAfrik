import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Headset, MessageSquare, Clock, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton, Button } from '@/components/Button';
import { useLang, pick } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/forward-form`;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function SupportPage() {
  const { t, lang } = useLang();
  useSEO({
    title: 'Support | LiAfrik',
    description: pick(lang, {
      en: 'Get help from the LiAfrik team — customer support, customer service, and general inquiries for every app in the ecosystem.',
      fr: "Obtenez de l'aide de l'équipe LiAfrik — support client, service client et demandes générales pour chaque application de l'écosystème.",
      ar: 'احصل على المساعدة من فريق LiAfrik — دعم العملاء، وخدمة العملاء، والاستفسارات العامة لكل تطبيق في النظام المتكامل.',
      es: 'Obtén ayuda del equipo de LiAfrik: soporte técnico, atención al cliente y consultas generales para cada app del ecosistema.',
      pt: 'Obtenha ajuda da equipe da LiAfrik — suporte ao cliente, atendimento ao cliente e perguntas gerais para cada aplicativo do ecossistema.',
    }),
  });
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
    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ name, email, company, message, lang, form_type: 'contact' }),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const channels = [
    { icon: Mail, label: 'Customer Support', email: 'support@liafrik.com', desc: pick(lang, { en: 'Technical issues and product help', fr: 'Problèmes techniques et aide produit', ar: 'المشكلات التقنية ومساعدة المنتج', es: 'Problemas técnicos y ayuda con el producto', pt: 'Problemas técnicos e ajuda com o produto' }) },
    { icon: Headset, label: 'Customer Service', email: 'cs@liafrik.com', desc: pick(lang, { en: 'Account and billing questions', fr: 'Questions de compte et de facturation', ar: 'أسئلة الحساب والفوترة', es: 'Preguntas de cuenta y facturación', pt: 'Perguntas sobre conta e faturamento' }) },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading tag={t('support.tag')} title={t('support.title')} subtitle={t('support.sub')} />

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {channels.map((c, i) => (
            <motion.a
              key={i}
              href={`mailto:${c.email}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white border border-cloud-200 p-6 shadow-card hover:shadow-float transition-shadow"
            >
              <span className="grid place-items-center h-12 w-12 rounded-2xl bg-liafrik-50 text-liafrik-600 mb-4">
                <c.icon className="h-6 w-6" strokeWidth={2.2} />
              </span>
              <p className="font-display font-bold text-lg text-ink">{c.label}</p>
              <p className="text-sm text-liafrik-700 font-medium mt-1">{c.email}</p>
              <p className="text-sm text-ink-muted mt-2">{c.desc}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid lg:grid-cols-5 gap-8"
        >
          <div className="lg:col-span-3 rounded-3xl bg-white border border-cloud-200 p-6 sm:p-8 shadow-card">
            <h3 className="font-display font-bold text-lg text-ink mb-1">{t('support.form.title')}</h3>
            <p className="text-sm text-ink-muted mb-6">{t('support.form.sub')}</p>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label={t('contact.form.name')} name="name" type="text" required />
                <Field label={t('contact.form.email')} name="email" type="email" required />
              </div>
              <Field label={t('contact.form.company')} name="company" type="text" />
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-ink-soft mb-1.5">{t('contact.form.message')}</label>
                <textarea id="message" name="message" rows={4} required
                  className="w-full rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:ring-2 focus:ring-liafrik-100 outline-none transition-all resize-none" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-ink-light flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {pick(lang, { en: 'We reply within one business day', fr: 'Réponse sous un jour ouvré', ar: 'نرد خلال يوم عمل واحد', es: 'Respondemos en un día hábil', pt: 'Respondemos em até um dia útil' })}</p>
                <Button type="submit" variant="primary" size="md" disabled={status === 'submitting' || status === 'success'}
                  iconRight={status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : status === 'success' ? <CheckCircle2 className="h-4 w-4" /> : status === 'error' ? <AlertCircle className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}>
                  {status === 'submitting' ? pick(lang, { en: 'Sending...', fr: 'Envoi...', ar: 'جارٍ الإرسال...', es: 'Enviando...', pt: 'Enviando...' }) : status === 'success' ? t('contact.form.success') : status === 'error' ? pick(lang, { en: 'Try again', fr: 'Réessayer', ar: 'حاول مرة أخرى', es: 'Inténtalo de nuevo', pt: 'Tente novamente' }) : t('contact.form.send')}
                </Button>
              </div>
              {status === 'error' && (
                <p className="text-xs text-red-600 flex items-center gap-1.5"><AlertCircle className="h-3.5 w-3.5" /> {pick(lang, { en: 'Something went wrong. Please try again or email us directly.', fr: 'Une erreur est survenue. Veuillez réessayer ou nous écrire directement.', ar: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر البريد الإلكتروني.', es: 'Algo salió mal. Inténtalo de nuevo o escríbenos directamente.', pt: 'Algo deu errado. Tente novamente ou envie um e-mail diretamente.' })}</p>
              )}
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl bg-cloud-50 border border-cloud-200 p-6">
              <MessageSquare className="h-8 w-8 text-liafrik-600 mb-3" />
              <h4 className="font-display font-bold text-sm text-ink">{pick(lang, { en: 'Response times', fr: 'Temps de réponse', ar: 'أوقات الاستجابة', es: 'Tiempos de respuesta', pt: 'Tempos de resposta' })}</h4>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>{pick(lang, { en: 'Critical issues: under 2 hours', fr: 'Problèmes critiques : sous 2h', ar: 'المشكلات الحرجة: خلال أقل من ساعتين', es: 'Problemas críticos: en menos de 2 horas', pt: 'Problemas críticos: em menos de 2 horas' })}</li>
                <li>{pick(lang, { en: 'General support: within 1 business day', fr: 'Support général : sous 1 jour ouvré', ar: 'الدعم العام: خلال يوم عمل واحد', es: 'Soporte general: en 1 día hábil', pt: 'Suporte geral: em até 1 dia útil' })}</li>
                <li>{pick(lang, { en: '24/7 cloud monitoring', fr: 'Surveillance cloud 24/7', ar: 'مراقبة سحابية على مدار الساعة', es: 'Monitoreo en la nube 24/7', pt: 'Monitoramento em nuvem 24/7' })}</li>
              </ul>
            </div>
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

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-ink-soft mb-1.5">{label}</label>
      <input id={name} name={name} type={type} required={required}
        className="w-full rounded-xl border border-cloud-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:ring-2 focus:ring-liafrik-100 outline-none transition-all" />
    </div>
  );
}
