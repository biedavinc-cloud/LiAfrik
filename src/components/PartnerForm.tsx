import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Handshake, TrendingUp, Cpu, Building2, Send, Mail, ArrowRight,
  CheckCircle2, AlertCircle, Loader2, ShieldCheck,
} from 'lucide-react';
import { Button, LinkButton, AnchorButton } from '@/components/Button';
import { Link } from '@/components/Link';
import { useLang } from '@/i18n/LanguageContext';
import { products } from '@/data/products';
import { cn } from '@/lib/cn';

export type PartnerType = 'investor' | 'strategic' | 'technology' | 'business';

// Cloudflare Pages Function (functions/api/forward-form.ts): same origin, no key needed.
const EDGE_URL = '/api/forward-form';
const PARTNER_EMAIL = 'cs@liafrik.com';

async function submitPartnerForm(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch(EDGE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl border border-cloud-200 bg-cloud-50/50 px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:border-liafrik-400 focus:bg-white focus:ring-2 focus:ring-liafrik-100 outline-none transition-all';
const labelCls = 'block text-xs font-semibold text-ink-soft mb-1.5 uppercase tracking-wider';

// Canonical (English) values are what the team receives by email; labels are localized.
const INVESTOR_TYPES = ['Venture capital', 'Angel investor', 'Family office', 'Corporate / strategic investor', 'Other'];
const TICKET_SIZES = ['Under $50k', '$50k – $250k', '$250k – $1M', '$1M+', 'Prefer to discuss'];

interface Props {
  type: PartnerType;
  onTypeChange: (t: PartnerType) => void;
}

export default function PartnerForm({ type, onTypeChange }: Props) {
  const { lang } = useLang();
  const [status, setStatus] = useState<Status>('idle');
  const [apps, setApps] = useState<string[]>([]);

  // Compact 5-language helper (same pattern as the rest of the site).
  const L = (en: string, fr: string, ar: string, es: string, pt: string) =>
    ({ en, fr, ar, es, pt })[lang] ?? en;

  const types: { id: PartnerType; icon: typeof Handshake; label: string }[] = [
    { id: 'investor', icon: TrendingUp, label: L('Investor', 'Investisseur', 'مستثمر', 'Inversor', 'Investidor') },
    { id: 'strategic', icon: Handshake, label: L('Strategic partner', 'Partenaire stratégique', 'شريك استراتيجي', 'Socio estratégico', 'Parceiro estratégico') },
    { id: 'technology', icon: Cpu, label: L('Technology partner', 'Partenaire technologique', 'شريك تقني', 'Socio tecnológico', 'Parceiro de tecnologia') },
    { id: 'business', icon: Building2, label: L('Business partner', 'Partenaire commercial', 'شريك تجاري', 'Socio comercial', 'Parceiro comercial') },
  ];

  const investorTypeLabels = [
    L('Venture capital', 'Capital-risque', 'رأس مال مغامر', 'Capital riesgo', 'Capital de risco'),
    L('Angel investor', 'Business angel', 'مستثمر ملاك', 'Inversor ángel', 'Investidor-anjo'),
    L('Family office', 'Family office', 'مكتب عائلي', 'Family office', 'Family office'),
    L('Corporate / strategic investor', 'Investisseur corporate / stratégique', 'مستثمر مؤسسي / استراتيجي', 'Inversor corporativo / estratégico', 'Investidor corporativo / estratégico'),
    L('Other', 'Autre', 'أخرى', 'Otro', 'Outro'),
  ];
  const ticketLabels = [
    L('Under $50k', 'Moins de 50 k$', 'أقل من 50 ألف $', 'Menos de 50 k$', 'Menos de US$ 50 mil'),
    L('$50k – $250k', '50 k$ – 250 k$', '50 – 250 ألف $', '50 k$ – 250 k$', 'US$ 50 mil – 250 mil'),
    L('$250k – $1M', '250 k$ – 1 M$', '250 ألف – 1 مليون $', '250 k$ – 1 M$', 'US$ 250 mil – 1 mi'),
    L('$1M+', '1 M$ et plus', '1 مليون $ فأكثر', '1 M$ o más', 'US$ 1 mi+'),
    L('Prefer to discuss', 'À discuter', 'أفضّل النقاش', 'Prefiero hablarlo', 'Prefiro conversar'),
  ];

  const toggleApp = (name: string) =>
    setApps((cur) => (cur.includes(name) ? cur.filter((a) => a !== name) : [...cur, name]));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    const form = e.currentTarget as HTMLFormElement;
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? '').trim();

    setStatus('submitting');
    const ok = await submitPartnerForm({
      form_type: 'partner',
      inquiry_type: type,
      name: v('name'),
      email: v('email'),
      company: v('company'),
      job_title: v('job_title'),
      phone: v('phone'),
      country: v('country'),
      website: v('website'),
      investor_type: type === 'investor' ? v('investor_type') : '',
      ticket_size: type === 'investor' ? v('ticket_size') : '',
      apps: type === 'investor' ? [] : apps,
      message: v('message'),
      consent: d.get('consent') === 'on',
      hp: v('hp_field'),
      lang,
    });

    if (ok) {
      setStatus('success');
      form.reset();
      setApps([]);
    } else {
      setStatus('error');
    }
  };

  const steps = [
    L('We review your request', 'Nous étudions votre demande', 'نراجع طلبك', 'Revisamos tu solicitud', 'Analisamos sua solicitação'),
    L('The right person from our team gets back to you', 'La bonne personne de notre équipe vous répond', 'يتواصل معك الشخص المناسب من فريقنا', 'La persona adecuada de nuestro equipo te responde', 'A pessoa certa da nossa equipe entra em contato'),
    type === 'investor'
      ? L('We share our materials and set up an intro call', 'Nous partageons nos documents et planifions un premier échange', 'نشارك موادنا ونحدد مكالمة تعارف', 'Compartimos nuestros materiales y agendamos una llamada', 'Compartilhamos nossos materiais e agendamos uma conversa')
      : L('We explore the fit and define next steps', 'Nous explorons la complémentarité et définissons les prochaines étapes', 'نستكشف مدى التوافق ونحدد الخطوات التالية', 'Exploramos el encaje y definimos los próximos pasos', 'Exploramos a afinidade e definimos os próximos passos'),
  ];

  return (
    <section id="partner-form" className="mt-10 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid lg:grid-cols-5 gap-5"
      >
        {/* Left — context */}
        <div className="lg:col-span-2 self-start lg:sticky lg:top-28 rounded-3xl bg-gradient-to-br from-liafrik-700 to-cyanx-500 p-8 sm:p-10 text-white shadow-glow-blue relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 bg-grid-soft opacity-10" />
          <div className="relative">
            <h3 className="font-display text-2xl font-bold">
              {L('Ready to talk?', 'Prêt à en discuter ?', 'هل أنت مستعد للحديث؟', '¿Listo para hablar?', 'Pronto para conversar?')}
            </h3>
            <p className="mt-3 text-liafrik-100 text-sm leading-relaxed">
              {L(
                'Tell us about your organization and how you would like to work with Liafrik.',
                'Parlez-nous de votre organisation et de la façon dont vous aimeriez travailler avec Liafrik.',
                'أخبرنا عن مؤسستك وكيف تودّ العمل مع Liafrik.',
                'Cuéntanos sobre tu organización y cómo te gustaría trabajar con Liafrik.',
                'Conte-nos sobre sua organização e como você gostaria de trabalhar com a Liafrik.',
              )}
            </p>

            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-liafrik-100">
              {L('What happens next', 'Et ensuite ?', 'ماذا بعد ذلك؟', '¿Qué sucede después?', 'O que acontece depois')}
            </p>
            <ol className="mt-3 space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="grid place-items-center h-6 w-6 shrink-0 rounded-full bg-white/15 text-xs font-bold">{i + 1}</span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-3">
              <AnchorButton href={`mailto:${PARTNER_EMAIL}`} external variant="white" size="md" icon={<Mail className="h-4 w-4" />} className="[font-family:system-ui,-apple-system,sans-serif]">
                {PARTNER_EMAIL}
              </AnchorButton>
              <LinkButton to="/support" variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4" />} className="!text-white !border-white/40 hover:!bg-white/10">
                {L('Talk to Liafrik', 'Parler à Liafrik', 'تحدث مع Liafrik', 'Hablar con Liafrik', 'Falar com a Liafrik')}
              </LinkButton>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3 rounded-3xl bg-white border border-cloud-200 shadow-premium p-6 sm:p-8">
          {status === 'success' ? (
            <div role="status" className="py-10 text-center">
              <span className="mx-auto grid place-items-center h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display font-bold text-xl text-ink">
                {L('Thank you — your request has been sent', 'Merci — votre demande a bien été envoyée', 'شكراً لك — تم إرسال طلبك', 'Gracias — tu solicitud ha sido enviada', 'Obrigado — sua solicitação foi enviada')}
              </h3>
              <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
                {L(
                  'Our team will review it and get back to you within one business day.',
                  'Notre équipe l’étudiera et vous répondra sous un jour ouvré.',
                  'سيراجع فريقنا طلبك ويرد عليك خلال يوم عمل واحد.',
                  'Nuestro equipo la revisará y te responderá en un día hábil.',
                  'Nossa equipe irá analisá-la e responder em até um dia útil.',
                )}
              </p>
              <div className="mt-6">
                <Button variant="secondary" size="md" onClick={() => setStatus('idle')}>
                  {L('Send another request', 'Envoyer une autre demande', 'إرسال طلب آخر', 'Enviar otra solicitud', 'Enviar outra solicitação')}
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <h3 className="font-display font-bold text-xl text-ink">
                  {L('Get in touch', 'Contactez-nous', 'تواصل معنا', 'Ponte en contacto', 'Entre em contato')}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  {L('Fields marked * are required.', 'Les champs marqués * sont obligatoires.', 'الحقول المميزة بـ * إلزامية.', 'Los campos marcados con * son obligatorios.', 'Os campos marcados com * são obrigatórios.')}
                </p>
              </div>

              {/* Request type */}
              <fieldset>
                <legend className={labelCls}>{L('I am a', 'Je suis', 'أنا', 'Soy', 'Sou')} *</legend>
                <div role="radiogroup" className="grid grid-cols-2 gap-2">
                  {types.map((t) => {
                    const active = type === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onTypeChange(t.id)}
                        className={cn(
                          'flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-start text-sm font-semibold transition-all',
                          active
                            ? 'border-liafrik-500 bg-liafrik-50 text-liafrik-700 ring-2 ring-liafrik-100'
                            : 'border-cloud-200 bg-cloud-50/50 text-ink-soft hover:border-liafrik-300 hover:bg-white',
                        )}
                      >
                        <t.icon className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                        <span className="leading-tight">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="pf-name" name="name" label={L('Full name', 'Nom complet', 'الاسم الكامل', 'Nombre completo', 'Nome completo')} required autoComplete="name" maxLength={120} />
                <Field id="pf-email" name="email" type="email" label={L('Work email', 'E-mail professionnel', 'البريد الإلكتروني المهني', 'Correo profesional', 'E-mail profissional')} required autoComplete="email" maxLength={200} />
                <Field id="pf-company" name="company" label={L('Organization', 'Organisation', 'المؤسسة', 'Organización', 'Organização')} required autoComplete="organization" maxLength={160} />
                <Field id="pf-title" name="job_title" label={L('Job title', 'Fonction', 'المسمى الوظيفي', 'Cargo', 'Cargo')} autoComplete="organization-title" maxLength={120} />
                <Field id="pf-phone" name="phone" type="tel" label={L('Phone / WhatsApp', 'Téléphone / WhatsApp', 'الهاتف / واتساب', 'Teléfono / WhatsApp', 'Telefone / WhatsApp')} autoComplete="tel" maxLength={40} />
                <Field id="pf-country" name="country" label={L('Country', 'Pays', 'الدولة', 'País', 'País')} autoComplete="country-name" maxLength={80} />
              </div>
              <Field id="pf-website" name="website" type="url" label={L('Website', 'Site web', 'الموقع الإلكتروني', 'Sitio web', 'Site')} placeholder="https://" autoComplete="url" maxLength={200} />

              {/* Type-specific */}
              {type === 'investor' ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pf-investor-type" className={labelCls}>{L('Investor type', 'Type d’investisseur', 'نوع المستثمر', 'Tipo de inversor', 'Tipo de investidor')}</label>
                    <select id="pf-investor-type" name="investor_type" defaultValue="" className={inputCls}>
                      <option value="">—</option>
                      {INVESTOR_TYPES.map((v, i) => <option key={v} value={v}>{investorTypeLabels[i]}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pf-ticket" className={labelCls}>{L('Indicative ticket size', 'Ticket indicatif', 'حجم الاستثمار التقريبي', 'Ticket indicativo', 'Ticket indicativo')}</label>
                    <select id="pf-ticket" name="ticket_size" defaultValue="" className={inputCls}>
                      <option value="">—</option>
                      {TICKET_SIZES.map((v, i) => <option key={v} value={v}>{ticketLabels[i]}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <fieldset>
                  <legend className={labelCls}>{L('Liafrik apps of interest', 'Applications Liafrik concernées', 'تطبيقات Liafrik المهتم بها', 'Aplicaciones Liafrik de interés', 'Aplicativos Liafrik de interesse')}</legend>
                  <div className="flex flex-wrap gap-2">
                    {products.map((p) => {
                      const on = apps.includes(p.name);
                      return (
                        <button
                          key={p.slug}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleApp(p.name)}
                          className={cn(
                            'text-xs font-medium rounded-full px-3 py-1.5 border transition-all',
                            on
                              ? 'border-liafrik-500 bg-liafrik-600 text-white'
                              : 'border-cloud-200 bg-white text-liafrik-700 hover:border-liafrik-300 hover:bg-liafrik-50',
                          )}
                        >
                          {p.name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              <div>
                <label htmlFor="pf-message" className={labelCls}>{L('How would you like to work with us?', 'Comment souhaitez-vous collaborer ?', 'كيف تودّ العمل معنا؟', '¿Cómo te gustaría colaborar?', 'Como você gostaria de colaborar?')} *</label>
                <textarea id="pf-message" name="message" rows={5} required maxLength={5000} className={cn(inputCls, 'resize-none')} />
              </div>

              {/* Honeypot — hidden from people, bots fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>Leave empty<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" /></label>
              </div>

              <label className="flex items-start gap-3 text-xs text-ink-muted leading-relaxed cursor-pointer">
                <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 rounded border-cloud-300 accent-liafrik-600" />
                <span>
                  {L('I agree that Liafrik may use these details to contact me about my request, as described in the ', 'J’accepte que Liafrik utilise ces informations pour me contacter au sujet de ma demande, comme décrit dans la ', 'أوافق على أن تستخدم Liafrik هذه البيانات للتواصل معي بشأن طلبي، كما هو موضح في ', 'Acepto que Liafrik use estos datos para contactarme sobre mi solicitud, como se describe en la ', 'Concordo que a Liafrik use esses dados para entrar em contato sobre minha solicitação, conforme descrito na ')}
                  <Link to="/privacy" className="font-semibold text-liafrik-700 underline underline-offset-2 hover:text-liafrik-800">
                    {L('Privacy Policy', 'Politique de confidentialité', 'سياسة الخصوصية', 'Política de privacidad', 'Política de privacidade')}
                  </Link>. *
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="text-xs text-ink-light flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-liafrik-600" />
                  {L('We reply within one business day.', 'Nous répondons sous un jour ouvré.', 'نرد خلال يوم عمل واحد.', 'Respondemos en un día hábil.', 'Respondemos em até um dia útil.')}
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={status === 'submitting'}
                  iconRight={status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                >
                  {status === 'submitting'
                    ? L('Sending...', 'Envoi...', 'جارٍ الإرسال...', 'Enviando...', 'Enviando...')
                    : L('Send request', 'Envoyer la demande', 'إرسال الطلب', 'Enviar solicitud', 'Enviar solicitação')}
                </Button>
              </div>

              {status === 'error' && (
                <p role="alert" className="text-xs text-red-600 flex items-start gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    {L('Something went wrong. Please try again or email us at ', 'Une erreur est survenue. Veuillez réessayer ou nous écrire à ', 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا على ', 'Algo salió mal. Inténtalo de nuevo o escríbenos a ', 'Algo deu errado. Tente novamente ou escreva para ')}
                    <a href={`mailto:${PARTNER_EMAIL}`} className="font-semibold underline [font-family:system-ui,-apple-system,sans-serif]">{PARTNER_EMAIL}</a>.
                  </span>
                </p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function Field({
  id, name, label, type = 'text', required, placeholder, autoComplete, maxLength,
}: {
  id: string; name: string; label: string; type?: string; required?: boolean;
  placeholder?: string; autoComplete?: string; maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}{required ? ' *' : ''}</label>
      <input
        id={id} name={name} type={type} required={required} placeholder={placeholder}
        autoComplete={autoComplete} maxLength={maxLength} className={inputCls}
      />
    </div>
  );
}
