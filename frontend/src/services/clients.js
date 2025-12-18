import { supabase } from "@/lib/supabase";

/* ================= PUBLIC ================= */

export async function getClients() {
  const { data, error } = await supabase
    .from("esteemed_clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getClients error:", error);
    return [];
  }

  return data;
}

/* ================= ADMIN ================= */

export async function addClient(payload) {
  const { error } = await supabase.from("esteemed_clients").insert(payload);

  if (error) {
    console.error("addClient error:", error);
    throw error;
  }
}

export async function deleteClient(id) {
  const { error } = await supabase
    .from("esteemed_clients")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteClient error:", error);
    throw error;
  }
}

/* ================= STORAGE ================= */

export async function uploadClientLogo(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("clients")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("uploadClientLogo error:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("clients")
    .getPublicUrl(fileName);

  return data.publicUrl;
}
