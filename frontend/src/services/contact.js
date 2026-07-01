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

export async function sendContactEmail(inquiry) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiry),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "Failed to send your message by email.");
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
