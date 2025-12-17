import { supabase } from "../lib/supabaseClient";

// -------- Get All Products ----------
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)");
  if (error) throw error;
  return data;
}

// -------- Create / Upload Product Image ----------
export async function uploadProductImage(file) {
  const fileName = `${Date.now()}-${file.name}`;
  
  const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

// -------- Create Product ----------
export async function addProduct(product) {
  const { data, error } = await supabase.from("products").insert([
    {
      name: product.name,
      price: product.price,
      description: product.description,
      category_id: product.category_id,
      image_url: product.image_url,
      slug: product.slug || product.name.toLowerCase().replace(/\s+/g, "-")
    }
  ]);

  if (error) throw error;
  return data;
}


// -------- Update Product ----------
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  return data;
}

// -------- Delete ----------
export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
