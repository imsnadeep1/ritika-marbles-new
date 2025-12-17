
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

export async function uploadCategoryImage(file) {
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
