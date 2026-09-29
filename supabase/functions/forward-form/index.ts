import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TO_EMAILS = ["cs@liafrik.com", "support@liafrik.com"];
const FROM_EMAIL = "noreply@liafrik.com";

// Partner & investor requests go to cs@liafrik.com only.
// Override without redeploying code: supabase secrets set PARTNER_TO_EMAIL=addr1,addr2
const PARTNER_TO_EMAILS = (Deno.env.get("PARTNER_TO_EMAIL") ?? "cs@liafrik.com")
  .split(",").map((e) => e.trim()).filter(Boolean);

const INQUIRY_LABELS: Record<string, string> = {
  investor: "Investor",
  strategic: "Strategic partner",
  technology: "Technology partner",
  business: "Business partner",
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// Trim, cap the length, and strip control characters (keeps newlines when multiline).
const clean = (v: unknown, max: number, multiline = false): string => {
  let out = typeof v === "string" ? v : "";
  out = out.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ");
  return out.trim().slice(0, max);
};

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function handlePartner(body: Record<string, unknown>): Promise<Response> {
  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (clean(body.hp, 50)) return json({ success: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const company = clean(body.company, 160);
  const message = clean(body.message, 5000, true);
  const lang = clean(body.lang, 5) || "en";
  const inquiry = clean(body.inquiry_type, 20);
  const jobTitle = clean(body.job_title, 120);
  const phone = clean(body.phone, 40);
  const country = clean(body.country, 80);
  const website = clean(body.website, 200);
  const investorType = clean(body.investor_type, 80);
  const ticketSize = clean(body.ticket_size, 80);
  const apps = Array.isArray(body.apps)
    ? body.apps.slice(0, 30).map((a) => clean(a, 60)).filter(Boolean)
    : [];

  if (!name || !company || !message || !EMAIL_RE.test(email) || !INQUIRY_LABELS[inquiry] || body.consent !== true) {
    return json({ error: "Missing or invalid fields" }, 400);
  }

  const inquiryLabel = INQUIRY_LABELS[inquiry];
  const rows: [string, string][] = [
    ["Request type", inquiryLabel],
    ["Name", name],
    ["Email", email],
    ["Organization", company],
    ["Job title", jobTitle],
    ["Phone / WhatsApp", phone],
    ["Country", country],
    ["Website", website],
    ...(inquiry === "investor"
      ? ([["Investor type", investorType], ["Ticket size (USD)", ticketSize]] as [string, string][])
      : ([["Apps of interest", apps.join(", ")]] as [string, string][])),
    ["Language", lang],
  ];
  const filled = rows.filter(([, v]) => v);

  const text = `New ${inquiryLabel.toLowerCase()} request from the Partners & Investors page\n\n` +
    filled.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}\n`;

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:#0F172A;max-width:640px">
<h2 style="margin:0 0 4px;color:#05183A">New ${escapeHtml(inquiryLabel.toLowerCase())} request</h2>
<p style="margin:0 0 16px;color:#475569;font-size:13px">Partners &amp; Investors page — reply to this email to answer ${escapeHtml(name)} directly.</p>
<table style="border-collapse:collapse;width:100%;font-size:14px">${filled
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748B;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
<h3 style="margin:20px 0 6px;font-size:14px;color:#05183A">Message</h3>
<p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.55">${escapeHtml(message)}</p>
</div>`;

  const subject = `[Liafrik Partners] ${inquiryLabel} — ${company} — ${name}`.replace(/[\r\n]+/g, " ").slice(0, 200);

  // Save to the same table as the contact form (the full request is kept in `message`).
  let dbOk = false;
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const dbRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceKey,
        "Authorization": `Bearer ${serviceKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ name, email, company, message: text, lang, status: "new" }),
    });
    dbOk = dbRes.ok;
    if (!dbOk) console.error("DB insert failed (partner):", await dbRes.text());
  } catch (e) {
    console.error("DB insert error (partner):", e);
  }

  let emailSent = false;
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  if (resendApiKey) {
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${resendApiKey}` },
        body: JSON.stringify({
          from: `Liafrik Partners <${FROM_EMAIL}>`,
          to: PARTNER_TO_EMAILS,
          reply_to: email,
          subject,
          text,
          html,
        }),
      });
      emailSent = emailRes.ok;
      if (!emailSent) console.error("Resend send failed (partner):", await emailRes.text());
    } catch (e) {
      console.error("Resend error (partner):", e);
    }
  } else {
    console.warn("RESEND_API_KEY not set — partner email not sent, request only saved to DB.");
  }

  console.log(`Partner request — ${inquiryLabel} — ${email} — dbOk=${dbOk} emailSent=${emailSent} — to: ${PARTNER_TO_EMAILS.join(", ")}`);

  // Only tell the visitor it worked if the request reached us somewhere.
  if (!dbOk && !emailSent) return json({ error: "Could not process the request" }, 502);
  return json({ success: true, message: "Form submitted successfully" });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    if (body?.form_type === "partner") return await handlePartner(body);
    const { name, email, company, message, lang, form_type } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const subject = form_type === "newsletter"
      ? `[Liafrik Newsletter] New subscription from ${name}`
      : `[Liafrik Contact] New message from ${name}`;

    const emailBody = form_type === "newsletter"
      ? `New newsletter subscription:\n\nName: ${name}\nEmail: ${email}\n`
      : `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nLanguage: ${lang || "en"}\n\nMessage:\n${message}\n`;

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const dbRes = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": serviceKey,
        "Authorization": `Bearer ${serviceKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ name, email, company: company || null, message, lang: lang || "en" }),
    });

    if (!dbRes.ok) {
      console.error("DB insert failed:", await dbRes.text());
    }

    // Send the actual email via Resend (https://resend.com).
    // Requires a RESEND_API_KEY secret set on the Supabase project:
    //   supabase secrets set RESEND_API_KEY=re_xxx
    // Without it, the submission is still saved to the database above,
    // but no email goes out — check the function logs for a warning.
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;

    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `Liafrik <${FROM_EMAIL}>`,
          to: TO_EMAILS,
          reply_to: email,
          subject,
          text: emailBody,
        }),
      });

      if (emailRes.ok) {
        emailSent = true;
      } else {
        console.error("Resend send failed:", await emailRes.text());
      }
    } else {
      console.warn("RESEND_API_KEY not set — email not sent, submission only saved to DB.");
    }

    console.log(`Contact submission from ${email} — emailSent=${emailSent} — to: ${TO_EMAILS.join(", ")}\nSubject: ${subject}\n${emailBody}`);

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
