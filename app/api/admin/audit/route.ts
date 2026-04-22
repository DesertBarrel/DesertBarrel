import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, isValidAdminSessionValue } from "@/lib/admin-session";
import { getLaunchAudit } from "@/lib/launch-audit";

async function isAuthorized() {
  const cookieStore = await cookies();
  const value = cookieStore.get(getAdminCookieName())?.value;
  return isValidAdminSessionValue(value);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, audit: getLaunchAudit() });
}
