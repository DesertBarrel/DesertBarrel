import { SITE_CONFIG } from "@/lib/site-config";
import { getLaunchControl } from "@/lib/launch-control";
import SectionBlock from "./SectionBlock";

function getContractHeadline(contractMode: string) {
  switch (contractMode) {
    case "live":
      return "Use only the official contract shown here and verify it against pinned official posts before taking any action.";
    case "warning":
      return "Warning: contract verification requires extra caution. Use only the official website and pinned official posts.";
    case "disabled":
      return "Contract actions are currently disabled. Wait for pinned official updates before taking any action.";
    case "pending":
    default:
      return "The official DBRL contract address will be posted here at launch and confirmed through verified project channels.";
  }
}

export default function ContractPanel() {
  const control = getLaunchControl();
  const contractIsPlaceholder =
    SITE_CONFIG.contract.includes("REAL_CONTRACT") ||
    SITE_CONFIG.contract.includes("PASTE_");

  const showContract =
    (control.contractMode === "live" || control.contractMode === "warning") &&
    !contractIsPlaceholder;

  const showOpenButton = control.contractMode === "live" && showContract;

  return (
    <SectionBlock
      id="contract"
      eyebrow="OFFICIAL CONTRACT"
      title="Verify before doing anything."
    >
      <div
        className="bg-panel"
        style={{
          border: "1px solid var(--line)",
          borderRadius: "1.5rem",
          padding: "1.5rem"
        }}
      >
        <p className="text-slate" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
          {getContractHeadline(control.contractMode)}
        </p>

        <div
          style={{
            marginTop: "1rem",
            border: "1px dashed var(--line)",
            borderRadius: "1rem",
            padding: "1rem",
            wordBreak: "break-all",
            fontSize: "0.95rem"
          }}
        >
          {showContract ? SITE_CONFIG.contract : "Contract pending"}
        </div>

        {showOpenButton ? (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem"
            }}
          >
            <a
              href={SITE_CONFIG.contract}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              Open Contract Link
            </a>
          </div>
        ) : null}

        <div
          style={{
            marginTop: "1.25rem",
            border: "1px solid var(--accent-line)",
            background: "var(--accent-soft)",
            borderRadius: "1rem",
            padding: "1rem"
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--accent)"
            }}
          >
            Safety Warning
          </div>
          <p style={{ marginTop: "0.6rem", fontSize: "0.95rem", lineHeight: 1.8 }}>
            {control.dmWarning}
          </p>
        </div>

        {control.contractMode === "disabled" ? (
          <div
            style={{
              marginTop: "1rem",
              border: "1px solid var(--line)",
              background: "var(--danger-soft)",
              borderRadius: "1rem",
              padding: "1rem"
            }}
          >
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
              Contract actions are temporarily disabled. Wait for pinned official
              updates before doing anything.
            </p>
          </div>
        ) : null}
      </div>
    </SectionBlock>
  );
}
