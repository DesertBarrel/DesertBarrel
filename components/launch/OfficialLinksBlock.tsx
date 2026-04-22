import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import SectionBlock from "./SectionBlock";

function PlaceholderOrLink({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  const isPlaceholder =
    href.includes("REAL_HANDLE") ||
    href.includes("REAL_CONTRACT") ||
    href.includes("PASTE_");

  if (isPlaceholder) {
    return (
      <div className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1.25rem", fontSize: "0.95rem", opacity: 0.7 }}>
        {label} — pending
      </div>
    );
  }

  return (
    <Link href={href} className="bg-panel" style={{ display: "block", border: "1px solid var(--line)", borderRadius: "1rem", padding: "1.25rem", fontSize: "0.95rem" }}>
      {label}
    </Link>
  );
}

export default function OfficialLinksBlock() {
  return (
    <SectionBlock id="official-links" eyebrow="OFFICIAL LINKS" title="One signal. One source of truth.">
      <div style={{ maxWidth: "42rem", display: "grid", gap: "1.25rem", fontSize: "1rem", lineHeight: 1.9 }}>
        <p>
          Use this section as your source of truth for official DBRL links. If
          a link, contract address, or launch notice is not listed or confirmed
          through verified DBRL channels, do not trust it.
        </p>
      </div>

      <div style={{ marginTop: "2rem", display: "grid", gap: "1rem" }}>
        <PlaceholderOrLink label="Official Website" href={SITE_CONFIG.website} />
        <PlaceholderOrLink label="Official X" href={SITE_CONFIG.x} />
        <PlaceholderOrLink label="Official Telegram" href={SITE_CONFIG.telegram} />
        <PlaceholderOrLink label="Official Contract" href={SITE_CONFIG.contract} />
        <PlaceholderOrLink label="Launch Notice" href={SITE_CONFIG.launchInfo} />
      </div>

      <p className="text-slate" style={{ marginTop: "1.5rem", fontSize: "0.95rem", lineHeight: 1.8 }}>
        Always compare what you see here with the pinned messages on official channels.
      </p>
    </SectionBlock>
  );
}
