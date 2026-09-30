// Cloudflare Pages Function — POST /api/forward-form
//
// Receives every form on the site (newsletter, contact/support, partner &
// investor requests), stores it in Neon (Postgres) and emails the team
// through Resend.
//
// Required environment variables (Cloudflare Pages → Settings → Variables):
//   DATABASE_URL     Neon connection string (use the *pooled* one, encrypted)
//   RESEND_API_KEY   Resend API key (encrypted)
// Optional:
//   PARTNER_TO_EMAIL comma-separated recipients for partner/investor requests
//                    (default: cs@liafrik.com)
//   CONTACT_TO_EMAIL comma-separated recipients for contact/newsletter
//                    (default: cs@liafrik.com,support@liafrik.com)
//   FROM_EMAIL       sender address on a Resend-verified domain
//                    (default: noreply@liafrik.com)
//
// Without RESEND_API_KEY the request is still saved to the database.
// Without DATABASE_URL the request is still emailed.

import { neon } from '@neondatabase/serverless';

interface Env {
  DATABASE_URL?: string;
  NEON_DATABASE_URL?: string;
  RESEND_API_KEY?: string;
  PARTNER_TO_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  FROM_EMAIL?: string;
}

interface Ctx {
  request: Request;
  env: Env;
}

type Body = Record<string, unknown>;

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LANGS = ['en', 'fr', 'ar', 'es', 'pt'];

const INQUIRY_LABELS: Record<string, string> = {
  investor: 'Investor',
  strategic: 'Strategic partner',
  technology: 'Technology partner',
  business: 'Business partner',
};

// Trim, cap length, strip control characters (keeps newlines when multiline).
const clean = (v: unknown, max: number, multiline = false): string => {
  let out = typeof v === 'string' ? v : '';
  // eslint-disable-next-line no-control-regex -- stripping control characters is the point
  out = out.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, ' ');
  return out.trim().slice(0, max);
};

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const list = (v: string | undefined, fallback: string[]) => {
  const items = (v ?? '').split(',').map((e) => e.trim()).filter(Boolean);
  return items.length ? items : fallback;
};

// Only accept browser requests coming from our own site (or previews / local dev).
function originAllowed(request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true; // non-browser clients (curl, server-side): no Origin header
  try {
    const host = new URL(origin).hostname;
    return (
      host === 'liafrik.com' ||
      host.endsWith('.liafrik.com') ||
      host.endsWith('.pages.dev') ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------

let schemaReady = false;

type Sql = ReturnType<typeof neon<false, false>>;

async function ensureSchema(sql: Sql) {
  if (schemaReady) return;
  await sql`CREATE TABLE IF NOT EXISTS contact_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    company text,
    message text NOT NULL,
    lang text NOT NULL DEFAULT 'en',
    status text NOT NULL DEFAULT 'new',
    form_type text NOT NULL DEFAULT 'contact',
    details jsonb,
    country text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  // Tables created by an earlier version of the site may lack these columns.
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS form_type text NOT NULL DEFAULT 'contact'`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS details jsonb`;
  await sql`ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS country text`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions (status)`;
  schemaReady = true;
}

interface Row {
  name: string;
  email: string;
  company: string | null;
  message: string;
  lang: string;
  formType: string;
  details: Record<string, unknown> | null;
  country: string | null;
}

async function saveSubmission(env: Env, row: Row): Promise<boolean> {
  const url = env.DATABASE_URL || env.NEON_DATABASE_URL;
  if (!url) {
    console.warn('DATABASE_URL not set — submission not saved to the database.');
    return false;
  }
  try {
    const sql = neon(url);
    await ensureSchema(sql);
    await sql`INSERT INTO contact_submissions (name, email, company, message, lang, form_type, details, country)
      VALUES (${row.name}, ${row.email}, ${row.company}, ${row.message}, ${row.lang}, ${row.formType},
              ${row.details ? JSON.stringify(row.details) : null}::jsonb, ${row.country})`;
    return true;
  } catch (e) {
    console.error('Neon insert failed:', e);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Email (Resend)
// ---------------------------------------------------------------------------

async function sendEmail(
  env: Env,
  opts: { fromName: string; to: string[]; replyTo: string; subject: string; text: string; html?: string },
): Promise<boolean> {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — email not sent.');
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: `${opts.fromName} <${env.FROM_EMAIL || 'noreply@liafrik.com'}>`,
        to: opts.to,
        reply_to: opts.replyTo,
        subject: opts.subject.replace(/[\r\n]+/g, ' ').slice(0, 200),
        text: opts.text,
        ...(opts.html ? { html: opts.html } : {}),
      }),
    });
    if (!res.ok) console.error('Resend send failed:', await res.text());
    return res.ok;
  } catch (e) {
    console.error('Resend error:', e);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

async function handlePartner(body: Body, env: Env, country: string | null): Promise<Response> {
  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (clean(body.hp, 50)) return json({ success: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const company = clean(body.company, 160);
  const message = clean(body.message, 5000, true);
  const lang = LANGS.includes(clean(body.lang, 5)) ? clean(body.lang, 5) : 'en';
  const inquiry = clean(body.inquiry_type, 20);
  const jobTitle = clean(body.job_title, 120);
  const phone = clean(body.phone, 40);
  const ctry = clean(body.country, 80);
  const website = clean(body.website, 200);
  const investorType = clean(body.investor_type, 80);
  const ticketSize = clean(body.ticket_size, 80);
  const apps = Array.isArray(body.apps) ? body.apps.slice(0, 30).map((a) => clean(a, 60)).filter(Boolean) : [];

  if (!name || !company || !message || !EMAIL_RE.test(email) || !INQUIRY_LABELS[inquiry] || body.consent !== true) {
    return json({ error: 'Missing or invalid fields' }, 400);
  }

  const inquiryLabel = INQUIRY_LABELS[inquiry];
  const rows: [string, string][] = [
    ['Request type', inquiryLabel],
    ['Name', name],
    ['Email', email],
    ['Organization', company],
    ['Job title', jobTitle],
    ['Phone / WhatsApp', phone],
    ['Country', ctry],
    ['Website', website],
    ...(inquiry === 'investor'
      ? ([['Investor type', investorType], ['Ticket size (USD)', ticketSize]] as [string, string][])
      : ([['Apps of interest', apps.join(', ')]] as [string, string][])),
    ['Language', lang],
  ];
  const filled = rows.filter(([, v]) => v);

  const text =
    `New ${inquiryLabel.toLowerCase()} request from the Partners & Investors page\n\n` +
    filled.map(([k, v]) => `${k}: ${v}`).join('\n') +
    `\n\nMessage:\n${message}\n`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#031637;max-width:640px">
<h2 style="margin:0 0 4px;color:#031637">New ${escapeHtml(inquiryLabel.toLowerCase())} request</h2>
<p style="margin:0 0 16px;color:#475569;font-size:13px">Partners &amp; Investors page — reply to this email to answer ${escapeHtml(name)} directly.</p>
<table style="border-collapse:collapse;width:100%;font-size:14px">${filled
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748B;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`)
    .join('')}</table>
<h3 style="margin:20px 0 6px;font-size:14px">Message</h3>
<p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.55">${escapeHtml(message)}</p>
</div>`;

  const to = list(env.PARTNER_TO_EMAIL, ['cs@liafrik.com']);
  const [dbOk, emailSent] = await Promise.all([
    saveSubmission(env, {
      name, email, company, message: text, lang, formType: 'partner', country,
      details: { inquiry, jobTitle, phone, country: ctry, website, investorType, ticketSize, apps },
    }),
    sendEmail(env, {
      fromName: 'Liafrik Partners', to, replyTo: email,
      subject: `[Liafrik Partners] ${inquiryLabel} — ${company} — ${name}`, text, html,
    }),
  ]);

  console.log(`Partner request — ${inquiryLabel} — ${email} — dbOk=${dbOk} emailSent=${emailSent} — to: ${to.join(', ')}`);
  if (!dbOk && !emailSent) return json({ error: 'Could not process the request' }, 502);
  return json({ success: true });
}

async function handleContact(body: Body, env: Env, country: string | null): Promise<Response> {
  const formType = clean(body.form_type, 20) === 'newsletter' ? 'newsletter' : 'contact';
  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const company = clean(body.company, 160) || null;
  const message = clean(body.message, 5000, true);
  const lang = LANGS.includes(clean(body.lang, 5)) ? clean(body.lang, 5) : 'en';

  if (!name || !EMAIL_RE.test(email) || !message) {
    return json({ error: 'Missing required fields: name, email, message' }, 400);
  }

  const subject =
    formType === 'newsletter'
      ? `[Liafrik Newsletter] New subscription from ${name}`
      : `[Liafrik Contact] New message from ${name}`;
  const text =
    formType === 'newsletter'
      ? `New newsletter subscription:\n\nName: ${name}\nEmail: ${email}\nLanguage: ${lang}\n`
      : `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nLanguage: ${lang}\n\nMessage:\n${message}\n`;

  const to = list(env.CONTACT_TO_EMAIL, ['cs@liafrik.com', 'support@liafrik.com']);
  const [dbOk, emailSent] = await Promise.all([
    saveSubmission(env, { name, email, company, message, lang, formType, details: null, country }),
    sendEmail(env, { fromName: 'Liafrik', to, replyTo: email, subject, text }),
  ]);

  console.log(`${formType} — ${email} — dbOk=${dbOk} emailSent=${emailSent}`);
  if (!dbOk && !emailSent) return json({ error: 'Could not process the request' }, 502);
  return json({ success: true });
}

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  if (!originAllowed(request)) return json({ error: 'Forbidden' }, 403);

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }
  if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, 400);

  // Cloudflare adds the visitor's country — useful to see where demand comes from.
  const country = request.headers.get('CF-IPCountry');

  try {
    if (body.form_type === 'partner') return await handlePartner(body, env, country);
    return await handleContact(body, env, country);
  } catch (e) {
    console.error('forward-form error:', e);
    return json({ error: 'Internal error' }, 500);
  }
};

// Anything other than POST → 405.
export const onRequest = async (): Promise<Response> =>
  new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { ...JSON_HEADERS, Allow: 'POST' },
  });
