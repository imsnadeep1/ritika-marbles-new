import { supabase } from "../lib/supabaseClient";

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) throw error;
  return data;
}

export async function addCategory(category) {
  const { data, error } = await supabase.from("categories").insert([category]);
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
