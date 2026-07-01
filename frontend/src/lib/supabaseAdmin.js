import { supabase } from "./supabaseClient";

export function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel, then redeploy.",
    );
  }
}

export async function ensureSupabaseAdminSession() {
  requireSupabase();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Admin session expired. Please sign in again.");
  }

  const { data: isAdmin, error } = await supabase.rpc("is_admin");
  if (error || !isAdmin) {
    throw new Error("This account is not authorized for admin access.");
  }
}

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

export function validateUploadFile(file, { kind = "image" } = {}) {
  if (!file) {
    throw new Error("No file selected.");
  }

  const allowedTypes = kind === "video" ? VIDEO_TYPES : IMAGE_TYPES;
  const maxBytes = kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;

  if (!allowedTypes.has(file.type)) {
    throw new Error(`Unsupported ${kind} type. Please upload a common ${kind} format.`);
  }

  if (file.size > maxBytes) {
    throw new Error(`File is too large. Maximum ${kind} size is ${Math.round(maxBytes / (1024 * 1024))}MB.`);
  }

  const safeName = String(file.name || `${kind}`)
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .slice(0, 120);

  return safeName || `${kind}-upload`;
}
