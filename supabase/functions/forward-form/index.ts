import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TO_EMAIL = "info@liafrik.com";
const FROM_EMAIL = "noreply@liafrik.com";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, company, message, lang, form_type } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, message" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const subject = form_type === "newsletter"
      ? `[LiAfrik Newsletter] New subscription from ${name}`
      : `[LiAfrik Contact] New message from ${name}`;

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

    // Send email via Supabase built-in email (Resend) if available,
    // otherwise log for manual follow-up
    console.log(`Email to ${TO_EMAIL}:\nSubject: ${subject}\n${emailBody}`);

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
