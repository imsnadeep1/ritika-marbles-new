import { supabase } from "../lib/supabaseClient";

const isSupabaseReady = Boolean(supabase);

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.",
    );
  }
}

/* ================= ADMIN ================= */

// Get all reviews (admin)
export async function getAllReviews() {
  if (!isSupabaseReady) return [];
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllReviews error:", error);
    return [];
  }

  return data;
}

// Approve review
export async function approveReview(id) {
  requireSupabase();
  const { error } = await supabase
    .from("reviews")
    .update({ approved: true })
    .eq("id", id);

  if (error) {
    console.error("approveReview error:", error);
    throw error;
  }
}

// Delete review
export async function deleteReview(id) {
  requireSupabase();
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteReview error:", error);
    throw error;
  }
}

/* ================= PUBLIC ================= */

// Get only approved reviews
export const getApprovedProductReviews = async () => {
  if (!isSupabaseReady) return [];
  const { data, error } = await supabase
    .from('feedback')
    .select(`
      id,
      name,
      rating,
      message,
      products (
        id,
        name,
        slug
      )
    `)
    .eq('approved', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase feedback fetch error:', error);
    return [];
  }

  return data;
};
// Add new review (from product / public form)
export async function addReview(payload) {
  requireSupabase();
  const { error } = await supabase.from("reviews").insert(payload);

  if (error) {
    console.error("addReview error:", error);
    throw error;
  }
}
