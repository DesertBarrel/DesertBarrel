import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, isValidAdminSessionValue } from "@/lib/admin-session";
import { getOperatorChecklist, saveOperatorChecklist } from "@/lib/operator-checklist";

async function isAuthorized() {
  const cookieStore = await cookies();
  const value = cookieStore.get(getAdminCookieName())?.value;
  return isValidAdminSessionValue(value);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, checklist: getOperatorChecklist() });
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const checklist = saveOperatorChecklist(body);
    return NextResponse.json({ ok: true, checklist });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to save checklist." },
      { status: 400 }
    );
  }
}
