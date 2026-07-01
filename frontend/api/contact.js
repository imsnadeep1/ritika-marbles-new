const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@ritikamarbles.com";
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

function getResendErrorMessage(errorBody) {
  if (!errorBody) {
    return "Failed to send email notification.";
  }

  if (typeof errorBody === "string") {
    return errorBody;
  }

  if (errorBody.message) {
    return errorBody.message;
  }

  if (Array.isArray(errorBody.errors) && errorBody.errors.length > 0) {
    return errorBody.errors.map((item) => item.message).filter(Boolean).join(" ");
  }

  return "Failed to send email notification.";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", success: false });
  }

  const { name, email, phone, subject, message, source } = req.body || {};

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Please fill in all required fields.", success: false });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(503).json({
      error: "Email service is not configured. Add RESEND_API_KEY in Vercel environment variables.",
      success: false,
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

  const responseText = await emailResponse.text();
  let responseBody = null;

  try {
    responseBody = responseText ? JSON.parse(responseText) : null;
  } catch {
    responseBody = responseText;
  }

  if (!emailResponse.ok) {
    const errorMessage = getResendErrorMessage(responseBody);
    console.error("Resend email failed:", responseText);

    const needsDomainVerification =
      emailResponse.status === 403 &&
      /verify a domain|only send testing emails/i.test(errorMessage);

    return res.status(502).json({
      success: false,
      error: needsDomainVerification
        ? "Email could not be delivered yet. Verify ritikamarbles.com in Resend and set CONTACT_FROM_EMAIL to an address on your domain (for example noreply@ritikamarbles.com)."
        : errorMessage,
    });
  }

  return res.status(200).json({ success: true });
}
