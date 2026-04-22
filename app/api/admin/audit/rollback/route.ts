import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminCookieName, isValidAdminSessionValue } from "@/lib/admin-session";
import { getLaunchAudit } from "@/lib/launch-audit";
import { overwriteLaunchControl } from "@/lib/launch-control";

async function isAuthorized() {
  const cookieStore = await cookies();
  const value = cookieStore.get(getAdminCookieName())?.value;
  return isValidAdminSessionValue(value);
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const auditId = String(body.auditId || "").trim();
    const note = typeof body.note === "string" ? body.note : null;
    const operator = typeof body.operator === "string" ? body.operator : null;

    if (!auditId) {
      return NextResponse.json({ ok: false, error: "auditId is required." }, { status: 400 });
    }

    const audit = getLaunchAudit();
    const entry = audit.find((item) => item.id === auditId);

    if (!entry) {
      return NextResponse.json({ ok: false, error: "Audit entry not found." }, { status: 404 });
    }

    const control = overwriteLaunchControl(entry.previousState, "launch_control_rolled_back", { note, operator });

    return NextResponse.json({ ok: true, control, rolledBackToAuditId: auditId });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Rollback failed." },
      { status: 400 }
    );
  }
}
