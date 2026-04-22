import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/site-config";
import { getLaunchControl } from "@/lib/launch-control";

export async function GET() {
  const control = getLaunchControl();

  return NextResponse.json({
    ok: true,
    launchMode: control.launchMode,
    contractMode: control.contractMode,
    alertBar: control.alertBar,
    sourceOfTruth: control.sourceOfTruth,
    dmWarning: control.dmWarning,
    website: SITE_CONFIG.website,
    x: SITE_CONFIG.x,
    telegram: SITE_CONFIG.telegram,
    contract: SITE_CONFIG.contract,
    publicEmail: SITE_CONFIG.publicEmail
  });
}
