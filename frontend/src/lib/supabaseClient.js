import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tjslxhwneivmidkwreie.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqc2x4aHduZWl2bWlka3dyZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDcxMTQsImV4cCI6MjA5MzcyMzExNH0.U_Hrm45L4JslXSMPjoIUBYoBHeKsJb-qs74SYzpr5GY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
