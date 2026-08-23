# Logos des applications LiAfrik

Ce dossier contient le logo de chaque application affiché dans :
- la grille "Écosystème" sur la page d'accueil,
- la page /products,
- le pied de page (footer).

## Comment changer un logo (sans toucher au code)

1. Prépare ton image (PNG, JPG, SVG ou WEBP — carrée de préférence,
   fond transparent si possible, ~256×256px).
2. Renomme-la EXACTEMENT comme le fichier attendu pour cette app
   (voir tableau ci-dessous).
3. Remplace le fichier existant dans ce dossier par le tien.
4. Redéploie sur Cloudflare. C'est tout — aucun code à modifier.

Si un fichier attendu est absent ou ne charge pas, le site affiche
automatiquement l'icône + dégradé de secours à la place, donc rien
ne casse jamais visuellement.

## Fichiers attendus par app

| App     | Fichier attendu           | Statut        |
|---------|----------------------------|---------------|
| POS     | pos.png                    | Actif         |
| Sellia  | sellia.png                 | Actif         |
| CRM     | crm.png                    | Actif         |
| Faka    | faka.png                   | Actif         |
| Klasoo  | klasoo.png                 | À venir       |
| Nutro   | nutro.png                  | Actif         |
| Health  | health.png                 | Actif         |
| Bailly  | bailly.png                 | Actif         |
| Kolo    | kolo.png                   | Actif         |
| Skills  | skills.png                 | Actif         |
| Mafo    | mafo.png                   | Actif         |
| LiBooks | libooks.png                | Actif         |
| Zando   | zando.png                  | À venir       |
| Atlas   | atlas.png                  | Actif         |

## Changer l'extension (ex: utiliser un .svg au lieu de .png)

Ouvre `src/data/products.ts`, trouve le produit concerné, et modifie
sa ligne `logo:` pour pointer vers ton nouveau nom de fichier, ex :

```ts
logo: '/images/logos/sellia.svg',
```

## Fichier `_liafrik-placeholder.png`

C'est le logo LiAfrik que tu as fourni — conservé ici comme référence,
il n'est utilisé par aucun composant du code.
