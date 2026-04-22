import { requireAdminSession } from "@/lib/admin-auth";
import { getLaunchControl } from "@/lib/launch-control";
import { getLaunchAudit } from "@/lib/launch-audit";
import { SITE_CONFIG } from "@/lib/site-config";
import IncidentDashboard from "@/components/admin/IncidentDashboard";
import OperatorChecklistCard from "@/components/admin/OperatorChecklistCard";

export default async function AdminDashboardPage() {
  await requireAdminSession();

  const control = getLaunchControl();
  const audit = getLaunchAudit().slice(0, 5);

  return (
    <main className="section-space">
      <div className="container-shell">
        <div className="card-soft" style={{ marginBottom: "1rem" }}>
          <div className="eyebrow">ADMIN DASHBOARD</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Incident dashboard
          </h1>
          <p className="text-slate" style={{ marginTop: "0.75rem" }}>
            Monitor the current public-facing launch state and recent incident activity in one place.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <a href="/admin/dashboard" className="button-secondary">Dashboard</a>
            <a href="/admin/control" className="button-secondary">Control</a>
            <a href="/admin/audit" className="button-secondary">Audit</a>
          </div>
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          <OperatorChecklistCard />
          <IncidentDashboard
            launchMode={control.launchMode}
            contractMode={control.contractMode}
            alertBar={control.alertBar}
            sourceOfTruth={control.sourceOfTruth}
            dmWarning={control.dmWarning}
            website={SITE_CONFIG.website}
            x={SITE_CONFIG.x}
            telegram={SITE_CONFIG.telegram}
            contract={SITE_CONFIG.contract}
            publicEmail={SITE_CONFIG.publicEmail}
            recentAudit={audit}
          />
        </div>
      </div>
    </main>
  );
}
