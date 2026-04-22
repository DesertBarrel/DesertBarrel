type AuditEntry = {
  id: string;
  changedAt: string;
  action: string;
  note: string | null;
  operator: string | null;
  changes: Array<{
    field: string;
    previousValue: string;
    newValue: string;
  }>;
};

type IncidentDashboardProps = {
  launchMode: string;
  contractMode: string;
  alertBar: string;
  sourceOfTruth: string;
  dmWarning: string;
  website: string;
  x: string;
  telegram: string;
  contract: string;
  publicEmail: string;
  recentAudit: AuditEntry[];
};

export default function IncidentDashboard(props: IncidentDashboardProps) {
  const latestRollback =
    props.recentAudit.find((entry) => entry.action === "launch_control_rolled_back") || null;

  const latestNote =
    props.recentAudit.find((entry) => entry.note && entry.note.trim().length > 0) || null;

  const snapshotRows = [
    ["Launch Mode", props.launchMode],
    ["Contract Mode", props.contractMode],
    ["Website", props.website],
    ["X", props.x],
    ["Telegram", props.telegram],
    ["Contract", props.contract],
    ["Public Email", props.publicEmail]
  ];

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div className="card-soft">
        <div className="eyebrow">INCIDENT SNAPSHOT</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Current public state</h2>

        <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
          {snapshotRows.map(([label, value]) => (
            <div key={label} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
              <div className="eyebrow">{label}</div>
              <div style={{ marginTop: "0.5rem", fontSize: "0.95rem", lineHeight: 1.7, wordBreak: "break-all" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-soft">
        <div className="eyebrow">LIVE MESSAGING</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Active public copy</h2>

        <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
          <div className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
            <div className="eyebrow">Alert Bar</div>
            <div style={{ marginTop: "0.5rem", fontSize: "0.95rem", lineHeight: 1.7 }}>{props.alertBar}</div>
          </div>

          <div className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
            <div className="eyebrow">Source Of Truth</div>
            <div style={{ marginTop: "0.5rem", fontSize: "0.95rem", lineHeight: 1.7 }}>{props.sourceOfTruth}</div>
          </div>

          <div className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
            <div className="eyebrow">DM Warning</div>
            <div style={{ marginTop: "0.5rem", fontSize: "0.95rem", lineHeight: 1.7 }}>{props.dmWarning}</div>
          </div>
        </div>
      </div>

      {latestNote ? (
        <div className="card-soft">
          <div className="eyebrow">LATEST INCIDENT NOTE</div>
          <div style={{ marginTop: "0.75rem", fontSize: "1rem", lineHeight: 1.8 }}>{latestNote.note}</div>
          <div className="text-slate" style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
            {new Date(latestNote.changedAt).toLocaleString()}
            {latestNote.operator ? ` • ${latestNote.operator}` : ""}
          </div>
        </div>
      ) : null}

      {latestRollback ? (
        <div className="card-soft">
          <div className="eyebrow">LATEST ROLLBACK</div>
          <div style={{ marginTop: "0.75rem", fontSize: "1rem", fontWeight: 700 }}>{latestRollback.action}</div>
          <div className="text-slate" style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
            {new Date(latestRollback.changedAt).toLocaleString()}
            {latestRollback.operator ? ` • ${latestRollback.operator}` : ""}
          </div>
          {latestRollback.note ? <div style={{ marginTop: "0.75rem", fontSize: "0.95rem", lineHeight: 1.7 }}>{latestRollback.note}</div> : null}
        </div>
      ) : null}

      <div className="card-soft">
        <div className="eyebrow">RECENT ACTIVITY</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Last 5 control events</h2>

        <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
          {props.recentAudit.length === 0 ? (
            <div className="text-slate">No recent audit events.</div>
          ) : (
            props.recentAudit.map((entry) => (
              <div key={entry.id} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
                <div className="eyebrow">{entry.action}</div>
                <div className="text-slate" style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                  {new Date(entry.changedAt).toLocaleString()}
                  {entry.operator ? ` • ${entry.operator}` : ""}
                </div>
                {entry.note ? <div style={{ marginTop: "0.6rem", fontSize: "0.95rem", lineHeight: 1.7 }}>{entry.note}</div> : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
