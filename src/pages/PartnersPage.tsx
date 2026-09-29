import { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, TrendingUp, Cpu, Building2, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import PartnerForm, { type PartnerType } from '@/components/PartnerForm';
import { useLang, pick } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';
import { products } from '@/data/products';

export default function PartnersPage() {
  const { lang } = useLang();
  const [type, setType] = useState<PartnerType>('investor');
  const selectType = (t: PartnerType) => {
    setType(t);
    document.getElementById('partner-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  useSEO({
    title: pick(lang, {
      en: 'Partners & Investors | Liafrik', fr: 'Partenaires & Investisseurs | Liafrik',
      ar: 'الشركاء والمستثمرون | Liafrik', es: 'Socios e Inversores | Liafrik', pt: 'Parceiros e Investidores | Liafrik',
    }),
    description: pick(lang, {
      en: 'Partner with Liafrik or invest in a global SaaS ecosystem spanning commerce, hospitality, healthcare, education, finance and more.',
      fr: "Devenez partenaire de Liafrik ou investissez dans un écosystème SaaS mondial couvrant le commerce, l'hôtellerie, la santé, l'éducation, la finance et plus.",
      ar: 'كن شريكاً لـ Liafrik أو استثمر في نظام SaaS عالمي متكامل يشمل التجارة والضيافة والصحة والتعليم والتمويل وأكثر.',
      es: 'Asóciate con Liafrik o invierte en un ecosistema SaaS global que abarca comercio, hostelería, salud, educación, finanzas y más.',
      pt: 'Seja parceiro da Liafrik ou invista em um ecossistema SaaS global que abrange comércio, hotelaria, saúde, educação, finanças e mais.',
    }),
  });

  const categories = [
    {
      id: 'investor' as PartnerType,
      icon: TrendingUp,
      title: pick(lang, { en: 'Investors', fr: 'Investisseurs', ar: 'المستثمرون', es: 'Inversores', pt: 'Investidores' }),
      desc: pick(lang, {
        en: 'Back a growing, multi-product SaaS ecosystem with real users across several industries.',
        fr: 'Soutenez un écosystème SaaS multi-produits en croissance, avec de vrais utilisateurs dans plusieurs secteurs.',
        ar: 'ادعم نظاماً برمجياً متعدد المنتجات في نمو مستمر، بمستخدمين حقيقيين عبر قطاعات متعددة.',
        es: 'Respalda un ecosistema SaaS multiproducto en crecimiento, con usuarios reales en varios sectores.',
        pt: 'Apoie um ecossistema SaaS multiproduto em crescimento, com usuários reais em vários setores.',
      }),
    },
    {
      id: 'strategic' as PartnerType,
      icon: Handshake,
      title: pick(lang, { en: 'Strategic Partners', fr: 'Partenaires stratégiques', ar: 'الشركاء الاستراتيجيون', es: 'Socios estratégicos', pt: 'Parceiros estratégicos' }),
      desc: pick(lang, {
        en: 'Explore go-to-market, distribution, or co-marketing partnerships across our apps.',
        fr: 'Explorez des partenariats de mise sur le marché, de distribution ou de co-marketing sur nos applications.',
        ar: 'استكشف شراكات في التسويق المشترك أو التوزيع أو دخول السوق عبر تطبيقاتنا.',
        es: 'Explora asociaciones de salida al mercado, distribución o co-marketing en nuestras aplicaciones.',
        pt: 'Explore parcerias de entrada no mercado, distribuição ou co-marketing em nossos aplicativos.',
      }),
    },
    {
      id: 'technology' as PartnerType,
      icon: Cpu,
      title: pick(lang, { en: 'Technology Partners', fr: 'Partenaires technologiques', ar: 'الشركاء التقنيون', es: 'Socios tecnológicos', pt: 'Parceiros de tecnologia' }),
      desc: pick(lang, {
        en: 'Integrate your payment, logistics, or infrastructure services with the Liafrik ecosystem.',
        fr: 'Intégrez vos services de paiement, logistique ou infrastructure à l\'écosystème Liafrik.',
        ar: 'ادمج خدماتك في الدفع أو اللوجستيات أو البنية التحتية مع نظام Liafrik المتكامل.',
        es: 'Integra tus servicios de pago, logística o infraestructura con el ecosistema Liafrik.',
        pt: 'Integre seus serviços de pagamento, logística ou infraestrutura ao ecossistema Liafrik.',
      }),
    },
    {
      id: 'business' as PartnerType,
      icon: Building2,
      title: pick(lang, { en: 'Business Partners', fr: 'Partenaires commerciaux', ar: 'الشركاء التجاريون', es: 'Socios comerciales', pt: 'Parceiros comerciais' }),
      desc: pick(lang, {
        en: 'Resell, implement, or bundle Liafrik apps for your own clients and markets.',
        fr: 'Revendez, déployez ou intégrez les applications Liafrik pour vos propres clients et marchés.',
        ar: 'أعد بيع أو نفّذ أو ادمج تطبيقات Liafrik لعملائك وأسواقك الخاصة.',
        es: 'Revende, implementa o combina las aplicaciones Liafrik para tus propios clientes y mercados.',
        pt: 'Revenda, implemente ou combine os aplicativos da Liafrik para seus próprios clientes e mercados.',
      }),
    },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          tag={pick(lang, { en: 'Partners & Investors', fr: 'Partenaires & Investisseurs', ar: 'الشركاء والمستثمرون', es: 'Socios e Inversores', pt: 'Parceiros e Investidores' })}
          title={pick(lang, {
            en: 'Build the future of the Liafrik ecosystem with us',
            fr: "Construisez l'avenir de l'écosystème Liafrik avec nous",
            ar: 'ابنِ مستقبل نظام Liafrik المتكامل معنا',
            es: 'Construye el futuro del ecosistema Liafrik con nosotros',
            pt: 'Construa o futuro do ecossistema Liafrik conosco',
          })}
          subtitle={pick(lang, {
            en: 'Liafrik is a connected ecosystem of SaaS platforms — commerce, hospitality, healthcare, education, HR, finance, real estate, restaurants and community. We work with investors, strategic and technology partners, and businesses who want to grow with us.',
            fr: "Liafrik est un écosystème connecté de plateformes SaaS — commerce, hôtellerie, santé, éducation, RH, finance, immobilier, restauration et communauté. Nous collaborons avec des investisseurs, des partenaires stratégiques et technologiques, et des entreprises qui veulent grandir avec nous.",
            ar: 'Liafrik هو نظام متكامل ومترابط من منصات SaaS — التجارة، الضيافة، الصحة، التعليم، الموارد البشرية، التمويل، العقارات، المطاعم والمجتمع. نعمل مع المستثمرين والشركاء الاستراتيجيين والتقنيين والشركات الراغبة في النمو معنا.',
            es: 'Liafrik es un ecosistema conectado de plataformas SaaS: comercio, hostelería, salud, educación, RR. HH., finanzas, bienes raíces, restaurantes y comunidad. Trabajamos con inversores, socios estratégicos y tecnológicos, y empresas que quieren crecer con nosotros.',
            pt: 'A Liafrik é um ecossistema conectado de plataformas SaaS — comércio, hotelaria, saúde, educação, RH, finanças, imóveis, restaurantes e comunidade. Trabalhamos com investidores, parceiros estratégicos e tecnológicos, e empresas que querem crescer conosco.',
          })}
        />

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-white border border-cloud-200 p-8 shadow-card hover:shadow-float transition-shadow"
            >
              <span className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-liafrik-600 to-cyanx-500 text-white shadow-glow-blue mb-5">
                <c.icon className="h-7 w-7" strokeWidth={2.2} />
              </span>
              <h3 className="font-display font-bold text-xl text-ink">{c.title}</h3>
              <p className="mt-3 text-sm text-ink-muted leading-relaxed">{c.desc}</p>
              <button
                type="button"
                onClick={() => selectType(c.id)}
                className="mt-3 inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-liafrik-700 hover:text-liafrik-800 group"
              >
                {pick(lang, { en: 'Get in touch', fr: 'Nous contacter', ar: 'تواصل معنا', es: 'Ponte en contacto', pt: 'Entre em contato' })}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 rounded-3xl bg-cloud-50 border border-cloud-200 p-8"
        >
          <h3 className="font-display font-bold text-lg text-ink text-center">
            {pick(lang, { en: 'The Liafrik ecosystem', fr: "L'écosystème Liafrik", ar: 'نظام Liafrik المتكامل', es: 'El ecosistema Liafrik', pt: 'O ecossistema Liafrik' })}
          </h3>
          <p className="mt-2 text-sm text-ink-muted text-center max-w-2xl mx-auto">
            {pick(lang, {
              en: 'One connected platform, many specialized applications.',
              fr: 'Une plateforme connectée, de nombreuses applications spécialisées.',
              ar: 'منصة واحدة متصلة، وتطبيقات متخصصة عديدة.',
              es: 'Una plataforma conectada, muchas aplicaciones especializadas.',
              pt: 'Uma plataforma conectada, muitos aplicativos especializados.',
            })}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {products.map((p) => (
              <span
                key={p.slug}
                className="text-xs font-medium text-liafrik-700 bg-white border border-cloud-200 rounded-full px-3 py-1.5"
              >
                {p.name}
              </span>
            ))}
          </div>
        </motion.div>

        <PartnerForm type={type} onTypeChange={setType} />
      </div>
    </div>
  );
}
