import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { LinkButton } from '@/components/Button';
import { useLang } from '@/i18n/LanguageContext';
import { useSEO } from '@/lib/useSEO';

export default function PrivacyPolicy() {
  const { t, lang } = useLang();
  const en = lang === 'en';
  useSEO({
    title: en ? 'Privacy Policy | LiAfrik' : 'Politique de confidentialité | LiAfrik',
    description: en
      ? 'How LiAfrik collects, uses, and protects your data across every app in the ecosystem, with strict multi-tenant data isolation.'
      : "Comment LiAfrik collecte, utilise et protège vos données à travers chaque application de l'écosystème, avec une isolation stricte des données multi-tenant.",
  });

  const sections = en ? [
    { title: '1. Data We Collect', body: 'LiAfrik collects data that you provide directly when creating an account, using our SaaS platforms, or contacting our support team. This includes your name, email address, company information, billing details, and any content you create within our platforms (such as customer records, invoices, employee profiles, health records, and financial data).' },
    { title: '2. How We Use Your Data', body: 'We use your data to provide and improve the LiAfrik SaaS ecosystem — operating platforms for commerce, healthcare, education, HR, finance, real estate, restaurants, and community management. We also use data for authentication, security, analytics, billing, and customer support.' },
    { title: '3. SaaS-Specific Data Processing', body: 'Each LiAfrik platform processes specific categories of data: Sellia and POS process orders and customer data; Atlas and CRM process leads and customer relationship data, with strict multi-tenant isolation between accounts; Health processes patient and medical records; Faka processes employee and HR data; LiBooks processes financial and accounting data; Kolo processes community savings and contribution data; Mafo processes women\'s health data. All sensitive data is encrypted and access-controlled.' },
    { title: '4. Cookies and Tracking', body: 'LiAfrik uses essential cookies for authentication and session management, and analytical cookies to understand how our platforms are used. You can control cookie preferences in your account settings. We do not sell your data to third parties.' },
    { title: '5. Data Sharing', body: 'We do not sell or rent your personal data. We may share data with trusted cloud infrastructure providers and payment processors who operate under strict data protection agreements. We only share the minimum data necessary to provide our services.' },
    { title: '6. Data Security', body: 'All data is encrypted in transit and at rest using industry-leading protocols. Access is controlled through role-based permissions. Our cloud infrastructure includes automated backups, disaster recovery, and 24/7 monitoring. Learn more on our Security page.' },
    { title: '7. Your Rights', body: 'You have the right to access, correct, export, or delete your personal data. You can manage most of these actions directly within your LiAfrik account settings. For additional requests, contact us at cs@liafrik.com.' },
    { title: '8. Data Retention', body: 'We retain your data for as long as your account is active or as needed to provide our services. After account closure, we may retain certain data for legal, accounting, or security purposes for a limited period.' },
    { title: '9. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes through our platforms or by email. Continued use of LiAfrik after changes constitutes acceptance of the updated policy.' },
    { title: '10. Contact', body: 'For any questions about this Privacy Policy or your personal data, contact us at cs@liafrik.com or support@liafrik.com.' },
  ] : [
    { title: '1. Données que nous collectons', body: 'LiAfrik collecte les données que vous fournissez directement lors de la création d\'un compte, de l\'utilisation de nos plateformes SaaS, ou en contactant notre équipe support. Cela inclut votre nom, adresse e-mail, informations d\'entreprise, coordonnées de facturation, et tout contenu créé dans nos plateformes (dossiers clients, factures, profils d\'employés, dossiers médicaux et données financières).' },
    { title: '2. Utilisation de vos données', body: 'Nous utilisons vos données pour fournir et améliorer l\'écosystème SaaS LiAfrik — exploiter des plateformes pour le commerce, la santé, l\'éducation, les RH, la finance, l\'immobilier, la restauration et la gestion communautaire. Nous utilisons également les données pour l\'authentification, la sécurité, l\'analyse, la facturation et le support client.' },
    { title: '3. Traitement des données par SaaS', body: 'Chaque plateforme LiAfrik traite des catégories spécifiques de données : Sellia et POS traitent les commandes et données clients ; Atlas et CRM traitent les leads et données de relation client, avec une isolation stricte multi-tenant entre les comptes ; Health traite les dossiers patients et médicaux ; Faka traite les données employés et RH ; LiBooks traite les données financières et comptables ; Kolo traite les données d\'épargne communautaire ; Mafo traite les données de santé féminine. Toutes les données sensibles sont chiffrées et à accès contrôlé.' },
    { title: '4. Cookies et suivi', body: 'LiAfrik utilise des cookies essentiels pour l\'authentification et la gestion de session, et des cookies analytiques pour comprendre l\'utilisation de nos plateformes. Vous pouvez contrôler les préférences de cookies dans vos paramètres de compte. Nous ne vendons pas vos données à des tiers.' },
    { title: '5. Partage des données', body: 'Nous ne vendons ni ne louons vos données personnelles. Nous pouvons partager des données avec des fournisseurs d\'infrastructure cloud et de traitement de paiement de confiance, opérant sous des accords stricts de protection des données. Nous ne partageons que le minimum nécessaire pour fournir nos services.' },
    { title: '6. Sécurité des données', body: 'Toutes les données sont chiffrées en transit et au repos via des protocoles de pointe. L\'accès est contrôlé par permissions basées sur les rôles. Notre infrastructure cloud inclut des sauvegardes automatiques, une reprise après sinistre et une surveillance 24/7. En savoir plus sur notre page Sécurité.' },
    { title: '7. Vos droits', body: 'Vous avez le droit d\'accéder, corriger, exporter ou supprimer vos données personnelles. Vous pouvez gérer la plupart de ces actions directement dans vos paramètres de compte LiAfrik. Pour des demandes supplémentaires, contactez-nous à cs@liafrik.com.' },
    { title: '8. Conservation des données', body: 'Nous conservons vos données tant que votre compte est actif ou selon les besoins pour fournir nos services. Après la fermeture du compte, nous pouvons conserver certaines données à des fins légales, comptables ou de sécurité pour une durée limitée.' },
    { title: '9. Modifications de cette politique', body: 'Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous notifierons les changements importants via nos plateformes ou par e-mail. L\'utilisation continue de LiAfrik après les modifications vaut acceptation de la politique mise à jour.' },
    { title: '10. Contact', body: 'Pour toute question concernant cette Politique de Confidentialité ou vos données personnelles, contactez-nous à cs@liafrik.com ou support@liafrik.com.' },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          tag={en ? 'Legal' : 'Mentions légales'}
          title={en ? 'Privacy Policy' : 'Politique de Confidentialité'}
          subtitle={en ? 'How LiAfrik collects, uses, and protects your data across our SaaS ecosystem.' : 'Comment LiAfrik collecte, utilise et protège vos données dans notre écosystème SaaS.'}
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

        <div className="mt-10 rounded-2xl bg-liafrik-50 border border-liafrik-100 p-6 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-liafrik-600 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-muted">
            {en
              ? 'LiAfrik is committed to protecting your privacy. This policy applies to all platforms in the LiAfrik ecosystem. For security details, visit our Security page.'
              : 'LiAfrik s\'engage à protéger votre confidentialité. Cette politique s\'applique à toutes les plateformes de l\'écosystème LiAfrik. Pour les détails de sécurité, visitez notre page Sécurité.'}
          </p>
        </div>

        <div className="mt-10 text-center">
          <LinkButton to="/security" variant="outline" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
            {en ? 'Explore Security' : 'Voir la sécurité'}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
