import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function RefundPolicy() {
  const { lang } = useLang();
  const en = lang === 'en';
  useSEO({
    title: en ? 'Refund Policy | LiAfrik' : 'Politique de remboursement | LiAfrik',
    description: en
      ? 'How refunds, cancellations, and billing disputes are handled across the LiAfrik SaaS ecosystem.'
      : 'Comment les remboursements, annulations et litiges de facturation sont gérés au sein de l\'écosystème SaaS LiAfrik.',
  });

  const sections = en ? [
    { title: '1. Scope', body: 'This Refund Policy applies to paid subscriptions and one-time purchases made across LiAfrik platforms (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek). It complements our Terms of Service.' },
    { title: '2. Free Trials', body: 'Where a free trial is offered, no charges are made until the trial ends and you have opted into a paid plan. You may cancel at any time during the trial at no cost.' },
    { title: '3. Subscription Cancellations', body: 'You may cancel a subscription at any time from your account settings. Cancellation stops future billing at the end of the current billing cycle; you retain access to paid features until that cycle ends. We do not provide partial-period refunds for unused time, except where required by law.' },
    { title: '4. Eligibility for Refunds', body: 'A refund may be granted, at our discretion, if: (a) you were charged in error or as a result of a duplicate transaction, (b) a paid feature was materially unavailable due to a fault on our side and we could not remedy it within a reasonable time, or (c) you request cancellation within 14 days of an initial paid subscription and have not made substantial use of the service.' },
    { title: '5. Non-Refundable Cases', body: 'Refunds are not provided for: partial months or unused time after the 14-day window, dissatisfaction with a feature that performs as described, third-party fees (e.g. payment processor charges), or accounts suspended or terminated for violation of our Terms of Service.' },
    { title: '6. How to Request a Refund', body: 'Send a request to cs@liafrik.com or support@liafrik.com with your account email, the platform concerned, the transaction date, and the reason for your request. We aim to respond within 5 business days.' },
    { title: '7. Processing Time', body: 'Approved refunds are issued to the original payment method and may take 5–10 business days to appear, depending on your bank or payment provider.' },
    { title: '8. Chargebacks', body: 'We encourage you to contact us before initiating a chargeback with your bank or card issuer, so we can resolve billing issues directly and quickly.' },
    { title: '9. Changes to This Policy', body: 'We may update this Refund Policy from time to time. Material changes will be communicated through our platforms or by email. Continued use of LiAfrik after changes constitutes acceptance of the updated policy.' },
    { title: '10. Contact', body: 'For billing or refund questions, contact us at cs@liafrik.com or support@liafrik.com.' },
  ] : [
    { title: '1. Champ d\'application', body: 'Cette Politique de remboursement s\'applique aux abonnements payants et achats ponctuels effectués sur les plateformes LiAfrik (Sellia, POS, CRM, Atlas, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, Nutro, Zando, Litrek). Elle complète nos Conditions d\'Utilisation.' },
    { title: '2. Essais gratuits', body: 'Lorsqu\'un essai gratuit est proposé, aucun prélèvement n\'est effectué avant la fin de l\'essai et votre passage à un plan payant. Vous pouvez annuler à tout moment pendant l\'essai, sans frais.' },
    { title: '3. Annulation d\'abonnement', body: 'Vous pouvez annuler un abonnement à tout moment depuis les paramètres de votre compte. L\'annulation arrête la facturation future à la fin du cycle de facturation en cours ; vous conservez l\'accès aux fonctionnalités payantes jusqu\'à la fin de ce cycle. Nous ne remboursons pas le temps non utilisé sur une période déjà entamée, sauf disposition légale contraire.' },
    { title: '4. Conditions d\'éligibilité au remboursement', body: 'Un remboursement peut être accordé, à notre discrétion, si : (a) vous avez été facturé par erreur ou à la suite d\'une transaction en double, (b) une fonctionnalité payante était matériellement indisponible en raison d\'un problème de notre côté que nous n\'avons pas pu résoudre dans un délai raisonnable, ou (c) vous demandez l\'annulation dans les 14 jours suivant un premier abonnement payant et n\'avez pas fait un usage substantiel du service.' },
    { title: '5. Cas non remboursables', body: 'Aucun remboursement n\'est accordé pour : les périodes partielles ou le temps non utilisé après le délai de 14 jours, une insatisfaction liée à une fonctionnalité qui fonctionne comme décrite, les frais tiers (ex. frais du prestataire de paiement), ou les comptes suspendus ou résiliés pour violation de nos Conditions d\'Utilisation.' },
    { title: '6. Comment demander un remboursement', body: 'Envoyez une demande à cs@liafrik.com ou support@liafrik.com avec l\'e-mail de votre compte, la plateforme concernée, la date de la transaction et le motif de votre demande. Nous visons à répondre sous 5 jours ouvrés.' },
    { title: '7. Délai de traitement', body: 'Les remboursements approuvés sont émis sur le moyen de paiement d\'origine et peuvent prendre 5 à 10 jours ouvrés pour apparaître, selon votre banque ou prestataire de paiement.' },
    { title: '8. Rétrofacturations', body: 'Nous vous encourageons à nous contacter avant d\'initier une rétrofacturation (« chargeback ») auprès de votre banque ou émetteur de carte, afin que nous puissions résoudre le problème de facturation directement et rapidement.' },
    { title: '9. Modifications de cette politique', body: 'Nous pouvons mettre à jour cette Politique de remboursement de temps à autre. Les changements importants seront communiqués via nos plateformes ou par e-mail. L\'utilisation continue de LiAfrik après modification vaut acceptation de la politique mise à jour.' },
    { title: '10. Contact', body: 'Pour toute question relative à la facturation ou au remboursement, contactez-nous à cs@liafrik.com ou support@liafrik.com.' },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          tag={en ? 'Legal' : 'Mentions légales'}
          title={en ? 'Refund Policy' : 'Politique de remboursement'}
          subtitle={en ? 'How refunds, cancellations, and billing disputes are handled.' : 'Comment les remboursements, annulations et litiges de facturation sont gérés.'}
        />

        <div className="mt-10 space-y-6">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl bg-white border border-cloud-200 p-6 shadow-card"
            >
              <h3 className="font-display font-bold text-base text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-cloud-50 border border-cloud-200 p-6 flex items-start gap-3">
          <FileText className="h-5 w-5 text-liafrik-600 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-muted">
            {en
              ? 'This policy works alongside our Terms of Service and Privacy Policy. For billing questions, reach out before opening a dispute with your bank.'
              : 'Cette politique s\'applique avec nos Conditions d\'Utilisation et notre Politique de Confidentialité. Pour toute question de facturation, contactez-nous avant d\'ouvrir un litige auprès de votre banque.'}
          </p>
        </div>

        <div className="mt-10 text-center">
          <LinkButton to="/terms" variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
            {en ? 'View Terms of Service' : "Voir les Conditions d'Utilisation"}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
