import { supabase } from "../lib/supabaseClient";

const isSupabaseReady = Boolean(supabase);

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.",
    );
  }
}

// -------- Get All Products ----------
export async function getProducts() {
  if (!isSupabaseReady) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)");
  if (error) throw error;
  return data;
}

// -------- Create / Upload Product Image ----------
export async function uploadProductImage(file) {
  requireSupabase();
  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Image Upload Error:", uploadError);
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("products").getPublicUrl(fileName);

  return publicUrl;
}

export async function uploadProductVideo(file) {
  requireSupabase();
  const fileName = `video-${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Video Upload Error:", uploadError);
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("products").getPublicUrl(fileName);

  return publicUrl;
}


// -------- Create Product ----------
export async function addProduct(product) {
  requireSupabase();
  const { data, error } = await supabase.from("products").insert([
    {
      name: product.name,
      price: product.price,
      description: product.description,
      category_id: product.category_id,
      image_url: product.image_url,
      video_url: product.video_url,
      features: product.features,
      in_stock: product.in_stock,
      slug: product.slug || product.name.toLowerCase().replace(/\s+/g, "-")
    }
  ]);

  if (error) throw error;
  return data;
}


// -------- Update Product ----------
export async function updateProduct(id, updates) {
  requireSupabase();
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  return data;
}

// -------- Delete ----------
export async function deleteProduct(id) {
  requireSupabase();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
