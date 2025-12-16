import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vregrvhkuutpnvnkyfyf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZWdydmhrdXV0cG52bmt5ZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTgxNzQsImV4cCI6MjA4MTQ3NDE3NH0.DfolmD05sb3UabaE5XYkym_LeL03tApQ8U_2R3MXXhA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
