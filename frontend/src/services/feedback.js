import { supabase } from "../lib/supabaseClient";

// ---------- Add Feedback ----------
export async function addFeedback(feedback) {
  const { data, error } = await supabase
    .from("feedback")
    .insert([feedback]);

  if (error) throw error;
  return data;
}

// ---------- Get Feedback for a Product ----------
export async function getFeedbackByProduct(productId) {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ---------- Get All Feedback (Admin) ----------
export async function getAllFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*, products(name)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
