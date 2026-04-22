"use client";

import { useEffect, useState } from "react";
import PublicStatePreview from "@/components/admin/PublicStatePreview";

type LaunchMode = "prelaunch" | "live" | "paused" | "warning" | "archived";
type ContractMode = "pending" | "live" | "warning" | "disabled";

type ControlState = {
  launchMode: LaunchMode;
  contractMode: ContractMode;
  alertBar: string;
  sourceOfTruth: string;
  dmWarning: string;
};

type StatusState = ControlState & {
  website: string;
  x: string;
  telegram: string;
  contract: string;
  publicEmail: string;
};

const INITIAL: ControlState = {
  launchMode: "prelaunch",
  contractMode: "pending",
  alertBar: "Official DBRL updates are posted only through verified project channels. Always verify links and contract details before taking action.",
  sourceOfTruth: "Only trust the official website, pinned official posts, and verified project channels.",
  dmWarning: "We will never DM you first. Ignore copied contracts, screenshots, reply links, and fake support accounts."
};

const PRESETS: Record<string, ControlState> = {
  warningMode: {
    launchMode: "warning",
    contractMode: "warning",
    alertBar: "Security warning: verify every link and contract detail through the official website and pinned official posts only.",
    sourceOfTruth: "Only trust the official website, pinned official posts, and verified project channels.",
    dmWarning: "We will never DM you first. Ignore copied contracts, screenshots, reply links, and fake support accounts."
  },
  pauseContractActions: {
    launchMode: "paused",
    contractMode: "disabled",
    alertBar: "DBRL activity is temporarily paused. Wait for pinned official updates before taking any action.",
    sourceOfTruth: "Only trust the official website, pinned official posts, and verified project channels.",
    dmWarning: "Do not act on DMs, copied contracts, screenshots, or reply links. Wait for pinned official updates."
  },
  restorePrelaunch: INITIAL,
  restoreLive: {
    launchMode: "live",
    contractMode: "live",
    alertBar: "DBRL is live. Only trust verified official channels, pinned official posts, and the exact official contract.",
    sourceOfTruth: "Only trust the official website, pinned official posts, and verified project channels.",
    dmWarning: "We will never DM you first. Ignore copied contracts, screenshots, reply links, and fake support accounts."
  }
};

export default function ControlForm() {
  const [state, setState] = useState<ControlState>(INITIAL);
  const [status, setStatus] = useState<StatusState | null>(null);
  const [message, setMessage] = useState("Loading current control state...");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [operator, setOperator] = useState("");

  async function loadState() {
    const [controlRes, statusRes] = await Promise.all([
      fetch("/api/admin/control"),
      fetch("/api/status")
    ]);

    const controlData = await controlRes.json();
    const statusData = await statusRes.json();

    if (!controlData.ok) {
      setMessage(controlData.error || "Failed to load state.");
      return;
    }

    setState(controlData.control);

    if (statusData.ok) {
      setStatus({
        launchMode: statusData.launchMode,
        contractMode: statusData.contractMode,
        alertBar: statusData.alertBar,
        sourceOfTruth: statusData.sourceOfTruth,
        dmWarning: statusData.dmWarning,
        website: statusData.website,
        x: statusData.x,
        telegram: statusData.telegram,
        contract: statusData.contract,
        publicEmail: statusData.publicEmail
      });
    }

    setMessage("Loaded current control state.");
  }

  async function saveState(nextState?: ControlState, presetName?: string) {
    setBusy(true);
    const payload = {
      ...(nextState || state),
      note: note || (presetName ? `Applied preset: ${presetName}` : ""),
      operator
    };

    const res = await fetch("/api/admin/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setBusy(false);

    if (!data.ok) {
      setMessage(data.error || "Failed to save state.");
      return;
    }

    setState(data.control);
    setMessage("Saved control state.");
    setNote("");
    await loadState();
  }

  async function applyPreset(presetKey: keyof typeof PRESETS) {
    const confirmed = window.confirm(`Apply preset: ${presetKey}?`);
    if (!confirmed) return;
    await saveState(PRESETS[presetKey], presetKey);
    setMessage(`Applied preset: ${presetKey}.`);
  }

  useEffect(() => { loadState(); }, []);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div className="card-soft">
        <p className="text-slate" style={{ marginBottom: "1rem" }}>{message}</p>

        <div style={{ display: "grid", gap: "1rem" }}>
          <label><div className="eyebrow">Launch Mode</div>
            <select className="field" value={state.launchMode} onChange={(e) => setState((prev) => ({ ...prev, launchMode: e.target.value as LaunchMode }))}>
              <option value="prelaunch">prelaunch</option><option value="live">live</option><option value="paused">paused</option><option value="warning">warning</option><option value="archived">archived</option>
            </select>
          </label>

          <label><div className="eyebrow">Contract Mode</div>
            <select className="field" value={state.contractMode} onChange={(e) => setState((prev) => ({ ...prev, contractMode: e.target.value as ContractMode }))}>
              <option value="pending">pending</option><option value="live">live</option><option value="warning">warning</option><option value="disabled">disabled</option>
            </select>
          </label>

          <label><div className="eyebrow">Alert Bar</div>
            <textarea className="field" rows={3} value={state.alertBar} onChange={(e) => setState((prev) => ({ ...prev, alertBar: e.target.value }))} />
          </label>

          <label><div className="eyebrow">Source Of Truth</div>
            <textarea className="field" rows={3} value={state.sourceOfTruth} onChange={(e) => setState((prev) => ({ ...prev, sourceOfTruth: e.target.value }))} />
          </label>

          <label><div className="eyebrow">DM Warning</div>
            <textarea className="field" rows={3} value={state.dmWarning} onChange={(e) => setState((prev) => ({ ...prev, dmWarning: e.target.value }))} />
          </label>

          <label><div className="eyebrow">Incident Note</div>
            <textarea className="field" rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="reply scam wave, contract confusion, temporary pause for verification..." />
          </label>

          <label><div className="eyebrow">Operator</div>
            <input className="field" value={operator} onChange={(e) => setOperator(e.target.value)} placeholder="Connor / Ops / Admin" />
          </label>
        </div>

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button className="button-secondary" onClick={loadState} disabled={busy}>Reload</button>
          <button className="button-primary" onClick={() => saveState()} disabled={busy}>Save State</button>
        </div>
      </div>

      <div className="card-soft">
        <div className="eyebrow">INCIDENT MODE PRESETS</div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">One-click operational presets</h2>
        <p className="text-slate" style={{ marginTop: "0.75rem" }}>
          Use these to react quickly without manually editing every field.
        </p>

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button className="button-secondary" onClick={() => applyPreset("warningMode")} disabled={busy}>Trigger Warning Mode</button>
          <button className="button-secondary" onClick={() => applyPreset("pauseContractActions")} disabled={busy}>Pause Contract Actions</button>
          <button className="button-secondary" onClick={() => applyPreset("restorePrelaunch")} disabled={busy}>Restore Prelaunch</button>
          <button className="button-primary" onClick={() => applyPreset("restoreLive")} disabled={busy}>Restore Live</button>
        </div>
      </div>

      {status ? (
        <PublicStatePreview
          launchMode={status.launchMode}
          contractMode={status.contractMode}
          alertBar={status.alertBar}
          sourceOfTruth={status.sourceOfTruth}
          dmWarning={status.dmWarning}
          website={status.website}
          x={status.x}
          telegram={status.telegram}
          contract={status.contract}
          publicEmail={status.publicEmail}
        />
      ) : null}
    </div>
  );
}
