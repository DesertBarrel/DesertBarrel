import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLaunchControl, saveLaunchControl } from "@/lib/launch-control";
import { getAdminCookieName, isValidAdminSessionValue } from "@/lib/admin-session";

async function isAuthorized() {
  const cookieStore = await cookies();
  const value = cookieStore.get(getAdminCookieName())?.value;
  return isValidAdminSessionValue(value);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, control: getLaunchControl() });
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const control = saveLaunchControl(body, {
      note: typeof body.note === "string" ? body.note : null,
      operator: typeof body.operator === "string" ? body.operator : null
    });
    return NextResponse.json({ ok: true, control });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Failed to save control state." },
      { status: 400 }
    );
  }
}
