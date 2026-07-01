const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@ritikamarbles.com";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Ritika Marbles <onboarding@resend.dev>";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ||
  "https://ritikamarbles.com,https://www.ritikamarbles.com,http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 60 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);

const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  subject: 200,
  message: 5000,
};

const rateLimitStore = new Map();

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getResendErrorMessage(errorBody) {
  if (!errorBody) return "Failed to send email notification.";
  if (typeof errorBody === "string") return errorBody;
  if (errorBody.message) return errorBody.message;
  if (Array.isArray(errorBody.errors) && errorBody.errors.length > 0) {
    return errorBody.errors.map((item) => item.message).filter(Boolean).join(" ");
  }
  return "Failed to send email notification.";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function trimField(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return entry.count > RATE_LIMIT_MAX;
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function contactHandler(req, res) {
  applyCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed", success: false });
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: "Origin not allowed", success: false });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Too many requests. Please try again later.",
      success: false,
    });
  }

  const { name, email, phone, subject, message, source, website } = req.body || {};

  if (website?.trim()) {
    return res.status(200).json({ success: true });
  }

  const safeName = trimField(name, FIELD_LIMITS.name);
  const safeEmail = trimField(email, FIELD_LIMITS.email);
  const safePhone = trimField(phone, FIELD_LIMITS.phone);
  const safeSubject = trimField(subject, FIELD_LIMITS.subject);
  const safeMessage = trimField(message, FIELD_LIMITS.message);

  if (!safeName || !safeEmail || !safeSubject || !safeMessage) {
    return res.status(400).json({ error: "Please fill in all required fields.", success: false });
  }

  if (!isValidEmail(safeEmail)) {
    return res.status(400).json({ error: "Please enter a valid email address.", success: false });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(503).json({
      error: "Email service is not configured. Add RESEND_API_KEY in Vercel environment variables.",
      success: false,
    });
  }

  const sourceLabel = source === "custom-order" ? "Custom Order" : "Get a Quote";

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      subject: `[${sourceLabel}] ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1F3D36;">
          <h2 style="margin-bottom: 8px;">New website inquiry</h2>
          <p style="margin-top: 0; color: #666;">Submitted from the ${sourceLabel} form.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${escapeHtml(safeName)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${escapeHtml(safeEmail)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td>${escapeHtml(safePhone || "Not provided")}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Subject</td><td>${escapeHtml(safeSubject)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td><td>${escapeHtml(safeMessage).replace(/\n/g, "<br>")}</td></tr>
          </table>
          <p style="margin-top: 16px; color: #666;">Reply directly to ${escapeHtml(safeEmail)} to respond to this inquiry.</p>
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
