import { adminLogoutAction } from "@/app/admin/login/actions";
import { requireAdminSession } from "@/lib/admin-auth";
import ControlForm from "./ui";

export default async function AdminControlPage() {
  await requireAdminSession();

  return (
    <main className="section-space">
      <div className="container-shell">
        <div className="card-soft" style={{ marginBottom: "1rem" }}>
          <div className="eyebrow">ADMIN CONTROL</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Launch control panel
          </h1>
          <p className="text-slate" style={{ marginTop: "0.75rem" }}>
            Adjust live launch messaging and review the exact public-facing state without leaving admin.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <a href="/admin/dashboard" className="button-secondary">Dashboard</a>
            <a href="/admin/control" className="button-secondary">Control</a>
            <a href="/admin/audit" className="button-secondary">Audit</a>
          </div>

          <form action={adminLogoutAction} style={{ marginTop: "1rem" }}>
            <button type="submit" className="button-secondary">
              Log Out
            </button>
          </form>
        </div>

        <ControlForm />
      </div>
    </main>
  );
}
