import { hasSupabaseEnv, supabase } from "./supabaseClient";

const configuredAdminEmail = (import.meta.env.VITE_SUPABASE_ADMIN_EMAIL || "").trim();

export async function verifyAdminAccess() {
  if (!hasSupabaseEnv || !supabase) {
    return { ok: false, reason: "missing_env" };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.email) {
    return { ok: false, reason: "no_session" };
  }

  const email = session.user.email.trim().toLowerCase();

  if (
    configuredAdminEmail &&
    email !== configuredAdminEmail.toLowerCase()
  ) {
    return { ok: false, reason: "email_not_allowed" };
  }

  const { data: isAdmin, error } = await supabase.rpc("is_admin");

  if (error) {
    console.error("Admin verification failed:", error);
    return { ok: false, reason: "verification_failed" };
  }

  if (!isAdmin) {
    return { ok: false, reason: "not_admin" };
  }

  return { ok: true, email: session.user.email };
}

export async function signOutAdmin() {
  if (supabase) {
    await supabase.auth.signOut();
  }
}

export function getAdminAccessErrorMessage(reason) {
  switch (reason) {
    case "missing_env":
      return "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then redeploy.";
    case "email_not_allowed":
    case "not_admin":
      return "This account is not authorized for admin access.";
    case "verification_failed":
      return "Unable to verify admin access. Please try again.";
    default:
      return "Admin session expired. Please sign in again.";
  }
}
