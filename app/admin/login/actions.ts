"use server";

import { redirect } from "next/navigation";
import { clearAdminSessionCookie, setAdminSessionCookie } from "@/lib/admin-auth";

export async function adminLoginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const expected = process.env.ADMIN_CONTROL_PASSWORD;

  if (!expected) {
    throw new Error("ADMIN_CONTROL_PASSWORD is not configured.");
  }

  if (password !== expected) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSessionCookie();
  redirect("/admin/dashboard");
}

export async function adminLogoutAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
