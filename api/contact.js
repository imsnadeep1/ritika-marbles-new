const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@ritikamarbles.com";
// Uses Resend's default sender until ritikamarbles.com is verified in Resend.
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Ritika Marbles <onboarding@resend.dev>";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message, source } = req.body || {};

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(503).json({
      error: "Email service is not configured. Set RESEND_API_KEY in Vercel.",
    });
  }

  const sourceLabel = source === "custom-order" ? "Custom Order" : "Get a Quote";
  const safeName = escapeHtml(name.trim());
  const safeEmail = escapeHtml(email.trim());
  const safePhone = escapeHtml(phone?.trim() || "Not provided");
  const safeSubject = escapeHtml(subject.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email.trim(),
      subject: `[${sourceLabel}] ${subject.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1F3D36;">
          <h2 style="margin-bottom: 8px;">New website inquiry</h2>
          <p style="margin-top: 0; color: #666;">Submitted from the ${sourceLabel} form.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${safeName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${safeEmail}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td>${safePhone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Subject</td><td>${safeSubject}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td><td>${safeMessage}</td></tr>
          </table>
        </div>
      `,
    }),
  });

  if (!emailResponse.ok) {
    const errorBody = await emailResponse.text();
    console.error("Resend email failed:", errorBody);
    return res.status(502).json({ error: "Failed to send email notification" });
  }

  return res.status(200).json({ success: true });
}
