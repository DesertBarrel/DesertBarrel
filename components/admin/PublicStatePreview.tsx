type PublicStatePreviewProps = {
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
};

export default function PublicStatePreview(props: PublicStatePreviewProps) {
  const rows = [
    ["Launch Mode", props.launchMode],
    ["Contract Mode", props.contractMode],
    ["Website", props.website],
    ["X", props.x],
    ["Telegram", props.telegram],
    ["Contract", props.contract],
    ["Public Email", props.publicEmail]
  ];

  return (
    <div className="card-soft">
      <div className="eyebrow">PUBLIC STATE PREVIEW</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">Current live-facing state</h2>

      <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
        {rows.map(([label, value]) => (
          <div key={label} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
            <div className="eyebrow">{label}</div>
            <div style={{ marginTop: "0.5rem", fontSize: "0.95rem", lineHeight: 1.7, wordBreak: "break-all" }}>{value}</div>
          </div>
        ))}
      </div>

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
  );
}
