import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';

export default function TermsOfService() {
  const { lang } = useLang();
  const en = lang === 'en';

  const sections = en ? [
    { title: '1. Purpose of the Service', body: 'LiAfrik provides a global SaaS ecosystem offering multiple specialized platforms for commerce, healthcare, education, HR, finance, real estate, restaurants, and community management. By using any LiAfrik platform, you agree to these Terms of Service.' },
    { title: '2. Eligibility and Accounts', body: 'You must be at least 18 years old and have legal authority to bind your organization to these terms. You are responsible for maintaining the security of your account credentials and for all activities under your account. Each platform may have additional role-based access controls.' },
    { title: '3. Acceptable Use', body: 'You agree not to use LiAfrik platforms for unlawful activities, to infringe intellectual property rights, to transmit malware or harmful code, or to attempt unauthorized access. You are responsible for the accuracy and legality of all data you enter into our platforms.' },
    { title: '4. Intellectual Property', body: 'LiAfrik, including its platform names (OS, POS, CRM, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, EAT), logos, designs, and software, is the property of LiAfrik. You retain full ownership of all data you create within our platforms.' },
    { title: '5. Subscriptions and Payments', body: 'Some LiAfrik platforms operate on subscription models. Pricing varies by platform and plan. Subscriptions auto-renew unless cancelled. You can manage or cancel subscriptions from your account settings. Detailed pricing is available on individual product pages or within each SaaS application.' },
    { title: '6. Data and Privacy', body: 'Your use of LiAfrik is also governed by our Privacy Policy. We process your data in accordance with that policy. You are responsible for ensuring you have proper consent to process any personal data (including employee, patient, customer, or student data) you enter into our platforms.' },
    { title: '7. Service Availability', body: 'We strive for 99.99% uptime but do not guarantee uninterrupted service. We may perform maintenance, updates, or changes that temporarily affect availability. We are not liable for outages caused by factors beyond our control.' },
    { title: '8. Limitation of Liability', body: 'LiAfrik is provided "as is" without warranties of any kind. To the maximum extent permitted by law, LiAfrik shall not be liable for indirect, incidental, or consequential damages, including loss of profits, data, or business, arising from your use of our platforms.' },
    { title: '9. Termination', body: 'You may close your account at any time. We may suspend or terminate access if you violate these terms, if your account is inactive for an extended period, or for security reasons. Upon termination, your data may be deleted after a reasonable retention period.' },
    { title: '10. Governing Law', body: 'These terms are governed by the laws of the United Arab Emirates, where LiAfrik operates. Disputes shall be resolved in the courts of Dubai, UAE, unless otherwise required by local consumer protection laws.' },
    { title: '11. Changes to These Terms', body: 'We may update these Terms of Service from time to time. We will notify you of significant changes through our platforms or by email. Continued use of LiAfrik after changes constitutes acceptance of the updated terms.' },
    { title: '12. Contact', body: 'For questions about these Terms of Service, contact us at cs@liafrik.com or support@liafrik.com.' },
  ] : [
    { title: '1. Objet du service', body: 'LiAfrik fournit un écosystème SaaS mondial offrant plusieurs plateformes spécialisées pour le commerce, la santé, l\'éducation, les RH, la finance, l\'immobilier, la restauration et la gestion communautaire. En utilisant toute plateforme LiAfrik, vous acceptez ces Conditions d\'Utilisation.' },
    { title: '2. Éligibilité et comptes', body: 'Vous devez avoir au moins 18 ans et avoir l\'autorité légale pour engager votre organisation. Vous êtes responsable de la sécurité de vos identifiants de compte et de toutes les activités effectuées depuis votre compte. Chaque plateforme peut avoir des contrôles d\'accès supplémentaires basés sur les rôles.' },
    { title: '3. Utilisation acceptable', body: 'Vous acceptez de ne pas utiliser les plateformes LiAfrik pour des activités illégales, porter atteinte aux droits de propriété intellectuelle, transmettre des logiciels malveillants, ou tenter un accès non autorisé. Vous êtes responsable de l\'exactitude et de la légalité de toutes les données que vous saisissez.' },
    { title: '4. Propriété intellectuelle', body: 'LiAfrik, y compris les noms de ses plateformes (OS, POS, CRM, LiBooks, Faka, Health, Mafo, Kolo, Bailly, Skills, Klasoo, EAT), logos, designs et logiciels, est la propriété de LiAfrik. Vous conservez la pleine propriété de toutes les données que vous créez dans nos plateformes.' },
    { title: '5. Abonnements et paiements', body: 'Certaines plateformes LiAfrik fonctionnent sur un modèle d\'abonnement. Les prix varient selon la plateforme et le plan. Les abonnements se renouvellent automatiquement sauf annulation. Vous pouvez gérer ou annuler vos abonnements depuis vos paramètres de compte. Les tarifs détaillés sont disponibles sur les pages produit ou dans chaque application SaaS.' },
    { title: '6. Données et confidentialité', body: 'Votre utilisation de LiAfrik est également régie par notre Politique de Confidentialité. Nous traitons vos données conformément à cette politique. Vous êtes responsable de l\'obtention du consentement approprié pour traiter toute donnée personnelle (employés, patients, clients, élèves) que vous saisissez.' },
    { title: '7. Disponibilité du service', body: 'Nous visons une disponibilité de 99,99 % mais ne garantissons pas un service ininterrompu. Nous pouvons effectuer des maintenance, mises à jour ou modifications affectant temporairement la disponibilité. Nous ne sommes pas responsables des interruptions causées par des facteurs hors de notre contrôle.' },
    { title: '8. Limitation de responsabilité', body: 'LiAfrik est fourni « tel quel » sans garantie d\'aucune sorte. Dans la mesure maximale permise par la loi, LiAfrik ne saurait être tenu responsable de dommages indirects, accessoires ou consécutifs, incluant la perte de profits, de données ou d\'activité, découlant de l\'utilisation de nos plateformes.' },
    { title: '9. Résiliation', body: 'Vous pouvez fermer votre compte à tout moment. Nous pouvons suspendre ou résilier l\'accès en cas de violation de ces conditions, d\'inactivité prolongée du compte, ou pour des raisons de sécurité. Lors de la résiliation, vos données peuvent être supprimées après une période de conservation raisonnable.' },
    { title: '10. Droit applicable', body: 'Ces conditions sont régies par les lois des Émirats Arabes Unis, où LiAfrik opère. Les litiges seront tranchés par les tribunaux de Dubaï, EAU, sauf disposition contraire du droit local de protection des consommateurs.' },
    { title: '11. Modifications de ces conditions', body: 'Nous pouvons mettre à jour ces Conditions d\'Utilisation de temps à autre. Nous vous notifierons les changements importants via nos plateformes ou par e-mail. L\'utilisation continue de LiAfrik après les modifications vaut acceptation des conditions mises à jour.' },
    { title: '12. Contact', body: 'Pour toute question concernant ces Conditions d\'Utilisation, contactez-nous à cs@liafrik.com ou support@liafrik.com.' },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          tag={en ? 'Legal' : 'Mentions légales'}
          title={en ? 'Terms of Service' : "Conditions d'Utilisation"}
          subtitle={en ? 'The terms and conditions for using LiAfrik and our SaaS platforms.' : 'Les termes et conditions d\'utilisation de LiAfrik et de nos plateformes SaaS.'}
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
              ? 'These terms apply to all LiAfrik platforms. For details on how we handle your data, see our Privacy Policy.'
              : 'Ces conditions s\'appliquent à toutes les plateformes LiAfrik. Pour plus de détails sur la gestion de vos données, consultez notre Politique de Confidentialité.'}
          </p>
        </div>

        <div className="mt-10 text-center">
          <LinkButton to="/privacy" variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
            {en ? 'View Privacy Policy' : 'Voir la Politique de Confidentialité'}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
