"use client";

import { useEffect, useMemo, useState } from "react";

type OperatorChecklistState = {
  websiteChecked: boolean;
  xChecked: boolean;
  telegramChecked: boolean;
  contractConsistencyChecked: boolean;
  pinnedPostsChecked: boolean;
};

const INITIAL: OperatorChecklistState = {
  websiteChecked: false,
  xChecked: false,
  telegramChecked: false,
  contractConsistencyChecked: false,
  pinnedPostsChecked: false
};

export default function OperatorChecklistCard() {
  const [state, setState] = useState<OperatorChecklistState>(INITIAL);
  const [message, setMessage] = useState("Loading operator checklist...");
  const [busy, setBusy] = useState(false);

  const items = useMemo(() => [
    { key: "websiteChecked", label: "Website check" },
    { key: "xChecked", label: "X check" },
    { key: "telegramChecked", label: "Telegram check" },
    { key: "contractConsistencyChecked", label: "Contract consistency check" },
    { key: "pinnedPostsChecked", label: "Pinned posts check" }
  ] as const, []);

  const completedCount = items.filter((item) => state[item.key]).length;
  const allComplete = completedCount === items.length;

  async function loadChecklist() {
    const res = await fetch("/api/admin/checklist");
    const data = await res.json();

    if (!data.ok) {
      setMessage(data.error || "Failed to load checklist.");
      return;
    }

    setState(data.checklist);
    setMessage("Operator checklist loaded.");
  }

  async function saveChecklist(nextState: OperatorChecklistState) {
    setBusy(true);

    const res = await fetch("/api/admin/checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextState)
    });

    const data = await res.json();
    setBusy(false);

    if (!data.ok) {
      setMessage(data.error || "Failed to save checklist.");
      return;
    }

    setState(data.checklist);
    setMessage("Checklist saved.");
  }

  async function toggle(key: keyof OperatorChecklistState) {
    const nextState = { ...state, [key]: !state[key] };
    await saveChecklist(nextState);
  }

  async function resetChecklist() {
    const confirmed = window.confirm("Reset all operator checklist items?");
    if (!confirmed) return;
    await saveChecklist(INITIAL);
  }

  useEffect(() => { loadChecklist(); }, []);

  return (
    <div className="card-soft">
      <div className="eyebrow">OPERATOR CHECKLIST</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">Launch-safety checks</h2>
      <p className="text-slate" style={{ marginTop: "0.75rem" }}>
        Confirm the core public surfaces before or during live operations.
      </p>

      <div style={{ marginTop: "1rem", border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
        <div className="eyebrow">Progress</div>
        <div style={{ marginTop: "0.5rem", fontSize: "1rem", fontWeight: 700 }}>
          {completedCount} / {items.length} complete
        </div>
        <div className="text-slate" style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
          {allComplete ? "All core launch checks are marked complete." : "Some core launch checks are still incomplete."}
        </div>
      </div>

      <p className="text-slate" style={{ marginTop: "1rem" }}>{message}</p>

      <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
        {items.map((item) => (
          <label key={item.key} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem", display: "flex", alignItems: "center", gap: "0.75rem", cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.7 : 1 }}>
            <input type="checkbox" checked={state[item.key]} onChange={() => toggle(item.key)} disabled={busy} />
            <span style={{ fontSize: "0.95rem" }}>{item.label}</span>
          </label>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button className="button-secondary" onClick={loadChecklist} disabled={busy}>Reload Checklist</button>
        <button className="button-secondary" onClick={resetChecklist} disabled={busy}>Reset Checklist</button>
      </div>
    </div>
  );
}
