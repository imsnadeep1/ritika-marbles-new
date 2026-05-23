
import { supabase } from "../lib/supabaseClient";

const CATEGORIES_STORAGE_KEY = "ritika-categories-local";

function getLocalCategories() {
  try {
    const raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalCategories(categories) {
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
}

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
    throw new Error("Admin session unavailable. Changes will be saved locally in admin mode.");
  }
}

export async function getCategories() {
  requireSupabase();

  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  setLocalCategories(data || []);
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
