import type { DashboardSpec } from './products';

export const posProductDashboard: DashboardSpec = {
  title: { en: 'LiAfrik — Operations', fr: 'LiAfrik — Opérations' },
  metric: { label: { en: 'Revenue today', fr: "Chiffre d'affaires du jour" }, value: '$24,580', delta: '+18.2%', up: true },
  panels: [
    {
      kind: 'line',
      title: { en: 'Revenue — last 7 days', fr: 'Revenus — 7 derniers jours' },
      data: [42, 58, 47, 71, 63, 88, 96],
    },
    {
      kind: 'list',
      title: { en: 'Live activity', fr: 'Activité en direct' },
      items: [
        { label: { en: 'New order — OS', fr: 'Nouvelle commande — OS' }, value: '$89', sub: '2s ago' },
        { label: { en: 'Payment — POS', fr: 'Paiement — POS' }, value: '$320', sub: '1m ago' },
        { label: { en: 'Tenant paid — Bailly', fr: 'Locataire payé — Bailly' }, value: '$1,200', sub: '4m ago' },
        { label: { en: 'Tontine payout — Kolo', fr: 'Versement tontine — Kolo' }, value: '$8,200', sub: '12m ago' },
      ],
    },
    {
      kind: 'stat',
      title: { en: 'Across the ecosystem', fr: "Dans tout l'écosystème" },
      stats: [
        { label: { en: 'Orders', fr: 'Commandes' }, value: '1,284', delta: '+24%', up: true },
        { label: { en: 'Customers', fr: 'Clients' }, value: '8,420', delta: '+9%', up: true },
        { label: { en: 'Employees', fr: 'Employés' }, value: '486' },
        { label: { en: 'Properties', fr: 'Biens' }, value: '1,240' },
      ],
    },
    {
      kind: 'donut',
      title: { en: 'Apps in use', fr: 'Apps utilisées' },
      segments: [
        { label: { en: 'POS', fr: 'POS' }, value: 32, color: '#0070E0' },
        { label: { en: 'OS', fr: 'OS' }, value: 26, color: '#3D9BFF' },
        { label: { en: 'HR', fr: 'RH' }, value: 18, color: '#00BFE0' },
        { label: { en: 'Other', fr: 'Autres' }, value: 24, color: '#A8D0FF' },
      ],
    },
  ],
};
