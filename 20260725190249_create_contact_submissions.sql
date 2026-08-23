/*
# Create contact_submissions table

1. Purpose
- Stores inquiries submitted through the site's contact form so the LiAfrik
  team can follow up with potential customers.

2. New Tables
- `contact_submissions`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email
  - `company` (text, nullable) — optional company name
  - `message` (text, not null) — the inquiry body
  - `lang` (text, not null, default 'en') — language the form was submitted in
  - `status` (text, not null, default 'new') — triage state: new / contacted / closed
  - `created_at` (timestamptz, default now()) — submission timestamp

3. Indexes
- `idx_contact_submissions_created_at` on `created_at DESC` for recent-first listing.
- `idx_contact_submissions_status` on `status` for filtering by triage state.

4. Security
- Enable RLS on `contact_submissions`.
- This is a no-auth public marketing site: anonymous visitors submit the form.
- INSERT is allowed for anon + authenticated (anyone can submit an inquiry).
- SELECT/UPDATE/DELETE are restricted to authenticated users (the LiAfrik team)
  so the public cannot read or modify other people's submissions.
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  lang text NOT NULL DEFAULT 'en',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status
  ON contact_submissions (status);

-- Public can submit inquiries (no sign-in required on the marketing site)
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated staff can read submissions
DROP POLICY IF EXISTS "auth_select_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_select_contact_submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated staff can update triage status
DROP POLICY IF EXISTS "auth_update_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_update_contact_submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Only authenticated staff can delete submissions
DROP POLICY IF EXISTS "auth_delete_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_delete_contact_submissions"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (true);
