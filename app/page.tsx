import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site-config";
import AlertBar from "@/components/launch/AlertBar";
import ButtonLink from "@/components/launch/ButtonLink";
import ContractPanel from "@/components/launch/ContractPanel";
import OfficialLinksBlock from "@/components/launch/OfficialLinksBlock";
import SectionBlock from "@/components/launch/SectionBlock";
import SourceOfTruthBlock from "@/components/launch/SourceOfTruthBlock";

const faq = [
  {
    q: "What is DBRL?",
    a: "DBRL is an original meme asset built around pressure, scarcity-styled branding, and a sharp desert-industrial identity."
  },
  {
    q: "Is DBRL affiliated with any government, institution, or commodity producer?",
    a: "No. DBRL is an independent project with original branding."
  },
  {
    q: "Is DBRL financial advice or a guaranteed opportunity?",
    a: "No. DBRL is a speculative digital asset and carries significant risk."
  },
  {
    q: "Where will the official contract be posted?",
    a: "Only through verified DBRL channels and official pinned messages."
  },
  {
    q: "What makes DBRL different?",
    a: "A more focused visual identity, stronger symbolic language, and a cleaner launch story than generic meme projects."
  },
  {
    q: "What should I avoid during launch?",
    a: "Avoid fake links, copied contracts, impersonator accounts, DMs, and any source that is not officially verified."
  }
];

const howToBuy = [
  {
    title: "Set up a supported wallet",
    body: "Use a wallet that supports the network and tools used for the official DBRL launch."
  },
  {
    title: "Fund your wallet",
    body: "Add the network token needed for swaps, transaction fees, and launch participation."
  },
  {
    title: "Use only the official contract",
    body: "Only use the DBRL contract address posted through verified official channels."
  },
  {
    title: "Double-check every detail",
    body: "Confirm the contract, token name, ticker, website, and official links before approving anything."
  },
  {
    title: "Follow official updates",
    body: "Stay on official channels for launch notices, warnings, and confirmed information."
  }
];

export default function HomePage() {
  return (
    <main>
      <AlertBar />

      <section className="section-space">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="eyebrow">DESERT BARREL</div>
              <h1
                style={{
                  marginTop: "1rem",
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em"
                }}
              >
                DBRL is built for pressure, scarcity, and attention.
              </h1>
              <p
                className="text-slate"
                style={{
                  marginTop: "1.5rem",
                  maxWidth: "42rem",
                  fontSize: "1.125rem",
                  lineHeight: 1.8
                }}
              >
                Desert Barrel is an original meme asset with reserve-style branding,
                hard visual identity, and a community-first launch built to feel
                sharp, simple, and memorable.
              </p>
              <div
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem"
                }}
              >
                <ButtonLink href="#community">Join Community</ButtonLink>
                <ButtonLink href={SITE_CONFIG.launchInfo} secondary>
                  Read Launch Info
                </ButtonLink>
              </div>
              <p
                className="text-slate"
                style={{ marginTop: "1.25rem", fontSize: "0.95rem" }}
              >
                Original brand. No fake affiliations. High-risk digital asset.
              </p>
            </div>

            <div className="card-soft">
              <div className="eyebrow">DBRL SIGNAL</div>
              <div
                style={{
                  marginTop: "1rem",
                  fontSize: "2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.03em"
                }}
              >
                Built for signal. Shaped by pressure.
              </div>
              <div
                style={{ marginTop: "1.5rem", display: "grid", gap: "0.75rem" }}
                className="text-slate"
              >
                {[
                  "Original meme asset",
                  "Community-driven launch",
                  "Official links only",
                  "High risk / do your own research"
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: "1rem",
                      padding: "0.9rem 1rem"
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SourceOfTruthBlock />

      <SectionBlock eyebrow="WHAT IS DBRL" title="A meme asset built with weight.">
        <div style={{ maxWidth: "42rem", display: "grid", gap: "1.25rem", fontSize: "1rem", lineHeight: 1.9 }}>
          <p>Desert Barrel is built around a clear identity: heat, pressure, reserves, signal, and scarcity-styled branding. The goal is not to be everything at once. The goal is to be immediately recognizable, easy to talk about, and strong enough to anchor a real community.</p>
          <p>DBRL is designed for people who respond to hard visuals, clean symbols, and focused rollout energy. It is culture-first, brand-first, and built to feel deliberate from the first impression.</p>
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="WHY DBRL" title="Strong symbols travel faster.">
        <div style={{ display: "grid", gap: "2rem" }}>
          <div style={{ maxWidth: "42rem", display: "grid", gap: "1.25rem", fontSize: "1rem", lineHeight: 1.9 }}>
            <p>The strongest meme launches usually do one thing well: they create a signal people remember. DBRL is built around a tighter visual language, a sharper tone, and a simpler story than generic meme projects that try to do too much.</p>
            <p>Desert Barrel is meant to feel controlled, heavy, and clear. That gives the community something consistent to rally around instead of a weak identity that changes every day.</p>
          </div>

          <div style={{ display: "grid", gap: "0.75rem" }}>
            {[
              "Reserve-style visual identity",
              "Pressure-built brand tone",
              "Simple, recognizable message",
              "Community-focused rollout"
            ].map((item) => (
              <div key={item} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1rem" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="BRAND THESIS" title="Built for signal. Shaped by pressure.">
        <div style={{ maxWidth: "42rem", display: "grid", gap: "1.25rem", fontSize: "1rem", lineHeight: 1.9 }}>
          <p>DBRL is not pretending to be a government project, commodity vehicle, or institutional product. It is an original meme asset with a strong symbolic frame and a public community rollout.</p>
          <p>That matters because clarity creates trust. The cleaner the story, the easier it is for people to understand what they are looking at, where to find official information, and how to follow the project without confusion.</p>
        </div>
      </SectionBlock>

      <SectionBlock id="launch-info" eyebrow="TOKEN SNAPSHOT" title="The essential details.">
        <div style={{ display: "grid", gap: "1rem" }}>
          {[
            ["Name", SITE_CONFIG.name],
            ["Ticker", SITE_CONFIG.ticker],
            ["Category", "Meme asset"],
            ["Launch style", "Public community-first rollout"],
            ["Brand profile", "Reserve-inspired / desert-industrial"],
            ["Official site", SITE_CONFIG.website]
          ].map(([label, value]) => (
            <div key={label} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1.25rem" }}>
              <div className="text-slate" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.16em" }}>{label}</div>
              <div style={{ marginTop: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>{value}</div>
            </div>
          ))}
        </div>
        <p className="text-slate" style={{ marginTop: "1.5rem", maxWidth: "42rem", fontSize: "0.95rem", lineHeight: 1.8 }}>
          Final launch details, official contract information, and live trading links will only be posted through official verified project channels.
        </p>
      </SectionBlock>

      <SectionBlock eyebrow="HOW IT WORKS" title="Simple brand. Clear path.">
        <div style={{ maxWidth: "42rem", display: "grid", gap: "1.25rem", fontSize: "1rem", lineHeight: 1.9 }}>
          <p>DBRL is built to keep the public experience straightforward. Follow official channels, verify every link, confirm the official contract address, and use your own judgment before taking any action.</p>
          <p>The project is designed around identity, rollout discipline, and community participation rather than complicated mechanics or inflated promises.</p>
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="HOW TO BUY" title="Move carefully. Verify everything.">
        <div style={{ display: "grid", gap: "1rem" }}>
          {howToBuy.map((step, index) => (
            <div key={step.title} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--accent)" }}>Step {index + 1}</div>
              <div style={{ marginTop: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>{step.title}</div>
              <p className="text-slate" style={{ marginTop: "0.75rem", fontSize: "0.95rem", lineHeight: 1.8 }}>{step.body}</p>
            </div>
          ))}
        </div>

        <div className="bg-panel" style={{ marginTop: "2rem", border: "1px solid var(--line)", borderRadius: "1.5rem", padding: "1.5rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "var(--accent)" }}>Safety Notice</div>
          <p style={{ marginTop: "0.75rem", maxWidth: "42rem", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Never trust copied contract addresses from replies, DMs, fake support accounts, or unofficial groups. If it is not posted through the verified DBRL channels, treat it as unsafe.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock id="community" eyebrow="COMMUNITY" title="DBRL is built to be recognized and shared.">
        <div style={{ maxWidth: "42rem", display: "grid", gap: "1.25rem", fontSize: "1rem", lineHeight: 1.9 }}>
          <p>Desert Barrel is a community-driven meme asset. That means the launch depends on clear communication, recognizable branding, and a community that knows where the official signal lives.</p>
          <p>Expect official updates, launch notices, pinned safety warnings, community drops, and a consistent project voice across all public channels.</p>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <ButtonLink href={SITE_CONFIG.telegram}>Join Telegram</ButtonLink>
          <ButtonLink href={SITE_CONFIG.x} secondary>Follow on X</ButtonLink>
        </div>
      </SectionBlock>

      <OfficialLinksBlock />
      <ContractPanel />

      <SectionBlock eyebrow="CONTACT" title="Official contact.">
        <div className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1.5rem", padding: "1.5rem" }}>
          <div className="text-slate" style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>Public contact:</div>
          <div style={{ marginTop: "0.5rem", fontSize: "1.125rem", fontWeight: 600 }}>
            <a href={`mailto:${SITE_CONFIG.publicEmail}`}>{SITE_CONFIG.publicEmail}</a>
          </div>
          <p className="text-slate" style={{ marginTop: "1rem", fontSize: "0.95rem", lineHeight: 1.8 }}>
            If a contact method is not listed on this website or pinned official posts, do not treat it as official.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="FAQ" title="Answers before launch.">
        <div style={{ display: "grid", gap: "1rem" }}>
          {faq.map((item) => (
            <div key={item.q} className="bg-panel" style={{ border: "1px solid var(--line)", borderRadius: "1rem", padding: "1.25rem" }}>
              <div style={{ fontSize: "1.125rem", fontWeight: 600 }}>{item.q}</div>
              <p className="text-slate" style={{ marginTop: "0.75rem", fontSize: "0.95rem", lineHeight: 1.8 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="risk" eyebrow="RISK DISCLAIMER" title="Read this before doing anything.">
        <div className="text-slate" style={{ maxWidth: "48rem", fontSize: "0.95rem", lineHeight: 1.9 }}>
          DBRL is a speculative digital asset created for community and meme culture purposes. Nothing on this website is financial advice, investment advice, legal advice, or a promise of performance. Digital assets are volatile and risky. Always do your own research, verify every official link, and never risk funds you cannot afford to lose.
        </div>
      </SectionBlock>

      <section className="section-space">
        <div className="container-shell card-soft">
          <div className="eyebrow">DESERT BARREL</div>
          <h2 style={{ marginTop: "0.75rem", fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 700, letterSpacing: "-0.03em" }}>
            Built for pressure. Built for attention.
          </h2>
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <ButtonLink href="#official-links">Enter Official Channels</ButtonLink>
            <ButtonLink href="#contract" secondary>View Official Contract</ButtonLink>
          </div>

          <div className="text-slate" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1.25rem", fontSize: "0.95rem" }}>
            <Link href={SITE_CONFIG.website}>Website</Link>
            <Link href={SITE_CONFIG.x}>X</Link>
            <Link href={SITE_CONFIG.telegram}>Telegram</Link>
            <Link href="#risk">Risk Notice</Link>
            <a href={`mailto:${SITE_CONFIG.publicEmail}`}>{SITE_CONFIG.publicEmail}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
