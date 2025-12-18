import { supabase } from "@/lib/supabase";

/* ================= ADMIN ================= */

// Get all reviews (admin)
export async function getAllReviews() {
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
export async function getApprovedReviews(limit = 6) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getApprovedReviews error:", error);
    return [];
  }

  return data;
}

// Add new review (from product / public form)
export async function addReview(payload) {
  const { error } = await supabase.from("reviews").insert(payload);

  if (error) {
    console.error("addReview error:", error);
    throw error;
  }
}
