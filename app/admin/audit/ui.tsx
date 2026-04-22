"use client";

import { useEffect, useState } from "react";

type LaunchControlState = {
  launchMode: string;
  contractMode: string;
  alertBar: string;
  sourceOfTruth: string;
  dmWarning: string;
};

type AuditFieldChange = {
  field: string;
  previousValue: string;
  newValue: string;
};

type LaunchAuditEntry = {
  id: string;
  changedAt: string;
  action: string;
  changes: AuditFieldChange[];
  previousState: LaunchControlState;
  nextState: LaunchControlState;
  note: string | null;
  operator: string | null;
};

export default function AuditViewer() {
  const [audit, setAudit] = useState<LaunchAuditEntry[]>([]);
  const [message, setMessage] = useState("Loading audit trail...");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [rollbackNotes, setRollbackNotes] = useState<Record<string, string>>({});
  const [rollbackOperators, setRollbackOperators] = useState<Record<string, string>>({});

  async function loadAudit() {
    const res = await fetch("/api/admin/audit");
    const data = await res.json();

    if (!data.ok) {
      setMessage(data.error || "Failed to load audit trail.");
      return;
    }

    setAudit(data.audit || []);
    setMessage("Audit trail loaded.");
  }

  async function rollback(auditId: string) {
    const confirmed = window.confirm("Restore the previous state from this audit entry?");
    if (!confirmed) return;

    setBusyId(auditId);

    const res = await fetch("/api/admin/audit/rollback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auditId,
        note: rollbackNotes[auditId] || "",
        operator: rollbackOperators[auditId] || ""
      })
    });

    const data = await res.json();
    setBusyId(null);

    if (!data.ok) {
      setMessage(data.error || "Rollback failed.");
      return;
    }

    setMessage(`Rollback complete for audit entry ${auditId}.`);
    await loadAudit();
  }

  useEffect(() => { loadAudit(); }, []);

  return (
    <div className="card-soft">
      <p className="text-slate" style={{ marginBottom: "1rem" }}>{message}</p>

      {audit.length === 0 ? (
        <div className="text-slate">No audit entries yet.</div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {audit.map((entry) => (
            <div key={entry.id} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1.25rem" }}>
              <div className="eyebrow">CHANGE EVENT</div>
              <div style={{ marginTop: "0.5rem", fontSize: "1rem", fontWeight: 700 }}>{entry.action}</div>
              <div className="text-slate" style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                {new Date(entry.changedAt).toLocaleString()}
                {entry.operator ? ` • ${entry.operator}` : ""}
              </div>

              {entry.note ? <div className="text-slate" style={{ marginTop: "0.75rem", fontSize: "0.95rem" }}><strong>Note:</strong> {entry.note}</div> : null}
              {entry.operator ? <div className="text-slate" style={{ marginTop: "0.4rem", fontSize: "0.95rem" }}><strong>Operator:</strong> {entry.operator}</div> : null}

              <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
                {entry.changes.map((change, index) => (
                  <div key={`${entry.id}-${change.field}-${index}`} style={{ border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "0.9rem" }}>
                    <div className="eyebrow">{change.field}</div>
                    <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}><strong>Before:</strong> {change.previousValue}</div>
                    <div style={{ marginTop: "0.4rem", fontSize: "0.9rem" }}><strong>After:</strong> {change.newValue}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
                <label>
                  <div className="eyebrow">Rollback Note</div>
                  <textarea className="field" rows={2} value={rollbackNotes[entry.id] || ""} onChange={(e) => setRollbackNotes((prev) => ({ ...prev, [entry.id]: e.target.value }))} placeholder="temporary pause for verification, restoring known-safe state..." />
                </label>

                <label>
                  <div className="eyebrow">Rollback Operator</div>
                  <input className="field" value={rollbackOperators[entry.id] || ""} onChange={(e) => setRollbackOperators((prev) => ({ ...prev, [entry.id]: e.target.value }))} placeholder="Connor / Ops / Admin" />
                </label>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className="button-secondary" onClick={() => rollback(entry.id)} disabled={busyId === entry.id}>
                  {busyId === entry.id ? "Rolling Back..." : "Rollback To Before State"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: "1.5rem" }}>
        <button className="button-secondary" onClick={loadAudit}>Reload Audit</button>
      </div>
    </div>
  );
}
