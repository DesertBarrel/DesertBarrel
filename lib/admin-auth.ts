import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminSessionValue, getAdminCookieName, isValidAdminSessionValue } from "@/lib/admin-session";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(getAdminCookieName())?.value;

  if (!isValidAdminSessionValue(value)) {
    redirect("/admin/login");
  }
}

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), createAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/"
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(getAdminCookieName(), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    expires: new Date(0)
  });
}
