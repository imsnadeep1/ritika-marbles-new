import { createClient } from "@supabase/supabase-js";

const fallbackSupabaseUrl = "https://tjslxhwneivmidkwreie.supabase.co";
const fallbackSupabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqc2x4aHduZWl2bWlka3dyZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDcxMTQsImV4cCI6MjA5MzcyMzExNH0.U_Hrm45L4JslXSMPjoIUBYoBHeKsJb-qs74SYzpr5GY";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL || "").trim() || fallbackSupabaseUrl;
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim() || fallbackSupabaseAnonKey;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);
