"use client";

export default function ContractActions({ contract }: { contract: string }) {
  return (
    <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <button
        type="button"
        className="button-primary"
        onClick={async () => {
          await navigator.clipboard.writeText(contract);
          alert("Contract copied.");
        }}
      >
        Copy Contract
      </button>

      <a href={contract} target="_blank" rel="noreferrer" className="button-secondary">
        Open Contract Link
      </a>
    </div>
  );
}
