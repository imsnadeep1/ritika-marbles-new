import { supabase } from "../lib/supabaseClient";

const isSupabaseReady = Boolean(supabase);

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.",
    );
  }
}

// ---------- Add Feedback ----------
export async function addFeedback(feedback) {
  requireSupabase();
  const { data, error } = await supabase
    .from("feedback")
    .insert([
      {
        name: String(feedback.name || "").trim().slice(0, 100),
        email: String(feedback.email || "").trim().slice(0, 254),
        rating: Number(feedback.rating) || 5,
        message: String(feedback.message || "").trim().slice(0, 2000),
        product_id: feedback.product_id,
        approved: false,
      },
    ]);

  if (error) throw error;
  return data;
}

// ---------- Get Feedback for a Product ----------
export async function getFeedbackByProduct(productId) {
  if (!isSupabaseReady) return [];
  const { data, error } = await supabase
    .from("feedback")
    .select("id, name, rating, message, created_at, product_id")
    .eq("product_id", productId)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ---------- Get All Feedback (Admin) ----------
export async function getAllFeedback() {
  if (!isSupabaseReady) return [];
  const { data, error } = await supabase
    .from("feedback")
    .select("*, products(name)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
