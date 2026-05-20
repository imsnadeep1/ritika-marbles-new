
import { supabase } from "../lib/supabaseClient";

const isSupabaseReady = Boolean(supabase);
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
  if (!isSupabaseReady) return getLocalCategories();

  try {
    await ensureSupabaseAdminSession();
  } catch {
    return getLocalCategories();
  }

  const { data, error } = await supabase.from("categories").select("*");
  if (error) return getLocalCategories();
  setLocalCategories(data || []);
  return data;
}

export async function addCategory(category) {
  const localCategory = {
    ...category,
    id: category.id || `local-cat-${Date.now()}`,
  };

  if (!isSupabaseReady) {
    const categories = getLocalCategories();
    const next = [...categories, localCategory];
    setLocalCategories(next);
    return [localCategory];
  }

  try {
    await ensureSupabaseAdminSession();
  } catch {
    const categories = getLocalCategories();
    const next = [...categories, localCategory];
    setLocalCategories(next);
    return [localCategory];
  }

  const { data, error } = await supabase.from("categories").insert([category]);
  if (error) {
    const categories = getLocalCategories();
    const next = [...categories, localCategory];
    setLocalCategories(next);
    return [localCategory];
  }
  return data;
}

export async function updateCategory(id, updates) {
  const updateLocal = () => {
    const categories = getLocalCategories();
    const next = categories.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setLocalCategories(next);
    return next;
  };

  if (!isSupabaseReady) {
    return updateLocal();
  }

  try {
    await ensureSupabaseAdminSession();
  } catch {
    return updateLocal();
  }

  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id);
  if (error) return updateLocal();
  return data;
}

export async function deleteCategory(id) {
  const deleteLocal = () => {
    const categories = getLocalCategories();
    const next = categories.filter((item) => item.id !== id);
    setLocalCategories(next);
  };

  if (!isSupabaseReady) {
    deleteLocal();
    return;
  }

  try {
    await ensureSupabaseAdminSession();
  } catch {
    deleteLocal();
    return;
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) deleteLocal();
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
