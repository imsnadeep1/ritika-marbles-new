
import { supabase } from "../lib/supabaseClient";

const isSupabaseReady = Boolean(supabase);

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.",
    );
  }
}

async function ensureSupabaseAdminSession() {
  requireSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Admin session expired. Please sign in again.");
  }
}

export async function getCategories() {
  if (!isSupabaseReady) return [];
  await ensureSupabaseAdminSession();
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
}

export async function addCategory(category) {
  requireSupabase();
  await ensureSupabaseAdminSession();
  const { data, error } = await supabase.from("categories").insert([category]);
  if (error) throw error;
  return data;
}

export async function updateCategory(id, updates) {
  requireSupabase();
  await ensureSupabaseAdminSession();
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  requireSupabase();
  await ensureSupabaseAdminSession();
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function uploadCategoryImage(file) {
  requireSupabase();
  await ensureSupabaseAdminSession();
  const fileName = `cat-${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("categories")
    .upload(fileName, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("categories").getPublicUrl(fileName);

  return publicUrl;
}
