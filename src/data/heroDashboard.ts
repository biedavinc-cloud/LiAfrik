import type { DashboardSpec } from './products';

export const posProductDashboard: DashboardSpec = {
  title: { en: 'LiAfrik Ecosystem — Overview', fr: 'Écosystème LiAfrik — Vue d\'ensemble' },
  metric: { label: { en: 'Ecosystem revenue today', fr: "Chiffre d'affaires écosystème du jour" }, value: '$48,920', delta: '+24.6%', up: true },
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
        { label: { en: 'New order — Sellia', fr: 'Nouvelle commande — Sellia' }, value: '$89', sub: '2s ago' },
        { label: { en: 'Payment — POS', fr: 'Paiement — POS' }, value: '$320', sub: '1m ago' },
        { label: { en: 'Invoice paid — LiBooks', fr: 'Facture payée — LiBooks' }, value: '$1,200', sub: '4m ago' },
        { label: { en: 'New lead — Atlas', fr: 'Nouveau lead — Atlas' }, value: '$8,200', sub: '9m ago' },
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
        { label: { en: 'POS', fr: 'POS' }, value: 30, color: '#0070E0' },
        { label: { en: 'Sellia', fr: 'Sellia' }, value: 24, color: '#3D9BFF' },
        { label: { en: 'Atlas', fr: 'Atlas' }, value: 16, color: '#00BFE0' },
        { label: { en: 'Other', fr: 'Autres' }, value: 30, color: '#A8D0FF' },
      ],
    },
  ],
};
