import SectionBlock from "./SectionBlock";
import { getLaunchControl } from "@/lib/launch-control";

export default function SourceOfTruthBlock() {
  const control = getLaunchControl();

  return (
    <SectionBlock eyebrow="OFFICIAL SOURCE OF TRUTH" title="Verify everything through one path.">
      <div className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1.5rem", padding: "1.5rem" }}>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>
          {control.sourceOfTruth}
        </p>
        <p className="text-slate" style={{ marginTop: "1rem", fontSize: "0.95rem", lineHeight: 1.8 }}>
          {control.dmWarning}
        </p>
      </div>
    </SectionBlock>
  );
}
