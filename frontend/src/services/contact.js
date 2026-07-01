import { supabase } from "../lib/supabaseClient";

const isSupabaseReady = Boolean(supabase);

export async function saveContactInquiry(inquiry) {
  if (!isSupabaseReady) return false;

  const { error } = await supabase.from("contact_inquiries").insert([
    {
      name: inquiry.name.trim(),
      email: inquiry.email.trim(),
      phone: inquiry.phone?.trim() || null,
      subject: inquiry.subject.trim(),
      message: inquiry.message.trim(),
      source: inquiry.source || "quote",
    },
  ]);

  if (error) {
    console.error("Failed to save contact inquiry:", error);
    return false;
  }

  return true;
}

async function parseContactApiResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const body = await response.text();
    if (body.includes("<!doctype html") || body.includes("<html")) {
      throw new Error(
        "The contact email service is not reachable. Redeploy the site with the /api/contact serverless function enabled.",
      );
    }

    throw new Error("Unexpected response from the email service.");
  }

  return response.json();
}

export async function sendContactEmail(inquiry) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiry),
  });

  const payload = await parseContactApiResponse(response).catch((error) => {
    if (error instanceof Error) throw error;
    throw new Error("Failed to send your message by email.");
  });

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.error || "Failed to send your message by email.");
  }

  return true;
}

export async function submitContactInquiry(inquiry) {
  const saved = await saveContactInquiry(inquiry);

  try {
    await sendContactEmail(inquiry);
    return { saved, emailed: true };
  } catch (error) {
    if (saved) {
      return { saved: true, emailed: false, warning: error.message };
    }
    throw error;
  }
}
