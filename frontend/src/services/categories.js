
import { supabase } from "../lib/supabaseClient";

const isSupabaseReady = Boolean(supabase);

async function ensureSupabaseAdminSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) return;

  const email = (import.meta.env.VITE_SUPABASE_ADMIN_EMAIL || "").trim();
  const password = (import.meta.env.VITE_SUPABASE_ADMIN_PASSWORD || "").trim();

  if (!email || !password) return;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function getCategories() {
  if (!isSupabaseReady) return [];
  await ensureSupabaseAdminSession();
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
}

export async function addCategory(category) {
  await ensureSupabaseAdminSession();
  const { data, error } = await supabase.from("categories").insert([category]);
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  await ensureSupabaseAdminSession();
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export async function uploadCategoryImage(file) {
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
