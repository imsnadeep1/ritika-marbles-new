
import { supabase } from "../lib/supabaseClient";
import { ensureSupabaseAdminSession, requireSupabase, validateUploadFile } from "../lib/supabaseAdmin";

const isSupabaseReady = Boolean(supabase);

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
  await ensureSupabaseAdminSession();
  const safeName = validateUploadFile(file, { kind: "image" });
  const fileName = `${Date.now()}-${safeName}`;

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

export async function uploadProductImages(files = []) {
  const uploads = Array.from(files).filter(Boolean);
  return Promise.all(uploads.map((file) => uploadProductImage(file)));
}

function normalizeImageUrls(imageUrls, imageUrl) {
  const urls = Array.isArray(imageUrls)
    ? imageUrls.map((url) => String(url).trim()).filter(Boolean)
    : [];

  if (urls.length > 0) {
    return { image_urls: urls, image_url: urls[0] };
  }

  const cover = imageUrl ? String(imageUrl).trim() : "";
  return {
    image_urls: cover ? [cover] : [],
    image_url: cover || null,
  };
}

export async function uploadProductVideo(file) {
  requireSupabase();
  await ensureSupabaseAdminSession();
  const safeName = validateUploadFile(file, { kind: "video" });
  const fileName = `video-${Date.now()}-${safeName}`;

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
  await ensureSupabaseAdminSession();
  const images = normalizeImageUrls(product.image_urls, product.image_url);
  const { data, error } = await supabase.from("products").insert([
    {
      name: product.name,
      price: product.price,
      description: product.description,
      category_id: product.category_id,
      image_url: images.image_url,
      image_urls: images.image_urls,
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
  await ensureSupabaseAdminSession();
  const payload = { ...updates };

  if ("image_urls" in updates || "image_url" in updates) {
    const images = normalizeImageUrls(updates.image_urls, updates.image_url);
    payload.image_urls = images.image_urls;
    payload.image_url = images.image_url;
  }

  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
  return data;
}

// -------- Delete ----------
export async function deleteProduct(id) {
  requireSupabase();
  await ensureSupabaseAdminSession();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
