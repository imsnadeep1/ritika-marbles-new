import { createClient } from "@supabase/supabase-js";
import {
  SUPABASE_ANON_KEY_FALLBACK,
  SUPABASE_URL_FALLBACK,
} from "@/lib/supabaseStaticConfig";

const supabaseUrl = (
  import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL_FALLBACK || ""
).trim();
const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY_FALLBACK || ""
).trim();

const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasSupabaseEnv) {
  console.warn(
    "Supabase env vars are missing. Public pages will render with empty data until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.",
  );
}

export const supabase = hasSupabaseEnv
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export { hasSupabaseEnv };
