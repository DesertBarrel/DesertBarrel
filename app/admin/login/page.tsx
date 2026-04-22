import { adminLoginAction } from "./actions";

type Props = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const params = (await searchParams) || {};
  const invalid = params.error === "invalid";

  return (
    <main className="section-space">
      <div className="container-shell">
        <div className="card-soft" style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div className="eyebrow">ADMIN LOGIN</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Launch control access
          </h1>
          <p className="text-slate" style={{ marginTop: "0.75rem" }}>
            Enter the admin control password to access the launch control panel.
          </p>

          <form action={adminLoginAction} style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
            <label>
              <div className="eyebrow">Password</div>
              <input className="field" name="password" type="password" placeholder="Enter password" />
            </label>

            <button type="submit" className="button-primary">
              Sign In
            </button>
          </form>

          {invalid ? (
            <p style={{ marginTop: "1rem", color: "#fca5a5", fontSize: "0.95rem" }}>
              Invalid password.
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
