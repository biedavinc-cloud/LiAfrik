-- Neon (Postgres) schema for the Liafrik website forms.
-- The Pages Function (functions/api/forward-form.ts) creates this table
-- automatically on first use, so running this file is optional — keep it as
-- the reference / to create the table ahead of time:
--   psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  lang text NOT NULL DEFAULT 'en',
  status text NOT NULL DEFAULT 'new',           -- new / contacted / closed
  form_type text NOT NULL DEFAULT 'contact',    -- contact / newsletter / partner
  details jsonb,                                -- extra fields (partner & investor form)
  country text,                                 -- visitor country (Cloudflare CF-IPCountry)
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions (status);
