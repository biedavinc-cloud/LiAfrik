# Liafrik

Marketing site for the Liafrik SaaS ecosystem — React + Vite + Tailwind, pre-rendered
to static HTML for SEO, deployed on **Cloudflare Pages** with **Neon** (Postgres) as database.

## Stack

| Layer | What |
|---|---|
| Front end | React 18, Vite, Tailwind, react-router (5 languages: en, fr, ar, es, pt) |
| Hosting | Cloudflare Pages (static `dist/` + Pages Functions) |
| API | `functions/api/forward-form.ts` — Cloudflare Pages Function, `POST /api/forward-form` |
| Database | Neon Postgres (`contact_submissions`, see `db/schema.sql`) |
| Email | Resend |

## Backend configuration (Cloudflare Pages → Settings → Variables and Secrets)

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | yes | Neon connection string (pooled). Store as an **encrypted secret**. |
| `RESEND_API_KEY` | yes | Resend API key. **Encrypted secret.** The sender domain (`liafrik.com`) must be verified in Resend. |
| `PARTNER_TO_EMAIL` | no | Recipients of Partners & Investors requests. Default `cs@liafrik.com`. |
| `CONTACT_TO_EMAIL` | no | Recipients of contact / newsletter. Default `cs@liafrik.com,support@liafrik.com`. |
| `FROM_EMAIL` | no | Default `noreply@liafrik.com`. |

The table is created automatically on the first request; `db/schema.sql` is the reference.
Without `RESEND_API_KEY` requests are still saved; without `DATABASE_URL` they are still emailed.

Local test of the API: `npm run build && npx wrangler pages dev dist` (put the variables in a `.dev.vars` file, never commit it).

## SEO architecture (why the site is built this way)

- `scripts/prerender.mjs` (runs after `vite build`) writes a real HTML file for every route in every
  language (title, description, canonical, hreflang, Open Graph, JSON-LD, readable body), plus
  `sitemap.xml` (with hreflang alternates) and `404.html`.
- **One source of truth for search copy**: `src/data/pageSeo.ts` (static pages), `src/lib/seoCopy.ts`
  (products, "alternative to X" pages) and `src/data/alternatives.ts`. Both the React pages and the
  pre-renderer read them, so the static HTML and the rendered page never disagree.
- **Alternative pages** (`/{lang}/alternatives/{competitor}`): add an entry in `src/data/alternatives.ts`
  (competitor name, what it is, what its users rely on) and it is generated in 5 languages, added to
  the sitemap, the hub page and the product page automatically. Only link a competitor to a Liafrik
  app that is `available: true`, and keep claims about competitors factual and neutral.
- `public/_redirects` deliberately has **no `/* → index.html` catch-all**: unknown URLs receive
  `404.html` with a real HTTP 404. If you add a new route, it must be pre-rendered (or redirected).
- Brand palette / logo files: see `tailwind.config.js` and `public/images/brand/`.

## Scripts

`npm run dev` · `npm run build` (build + pre-render) · `npm run typecheck` · `npm run lint`
