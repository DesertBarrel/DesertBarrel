import { requireAdminSession } from "@/lib/admin-auth";
import AuditViewer from "./ui";

export default async function AdminAuditPage() {
  await requireAdminSession();

  return (
    <main className="section-space">
      <div className="container-shell">
        <div className="card-soft" style={{ marginBottom: "1rem" }}>
          <div className="eyebrow">ADMIN AUDIT</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Launch control audit trail
          </h1>
          <p className="text-slate" style={{ marginTop: "0.75rem" }}>
            Review every control-panel change, compare before/after values, and restore a previous state when needed.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <a href="/admin/dashboard" className="button-secondary">Dashboard</a>
            <a href="/admin/control" className="button-secondary">Control</a>
            <a href="/admin/audit" className="button-secondary">Audit</a>
          </div>
        </div>

        <AuditViewer />
      </div>
    </main>
  );
}
