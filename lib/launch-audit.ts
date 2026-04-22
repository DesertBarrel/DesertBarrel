import fs from "node:fs";
import path from "node:path";
import type { LaunchControlState } from "@/lib/launch-defaults";

export type AuditFieldChange = {
  field: keyof LaunchControlState;
  previousValue: string;
  newValue: string;
};

export type LaunchAuditEntry = {
  id: string;
  changedAt: string;
  action: "launch_control_updated" | "launch_control_rolled_back";
  changes: AuditFieldChange[];
  previousState: LaunchControlState;
  nextState: LaunchControlState;
  note: string | null;
  operator: string | null;
};

const AUDIT_FILE_PATH = path.join(process.cwd(), "data", "launch-audit.json");

function ensureAuditFile() {
  fs.mkdirSync(path.dirname(AUDIT_FILE_PATH), { recursive: true });
  if (!fs.existsSync(AUDIT_FILE_PATH)) {
    fs.writeFileSync(AUDIT_FILE_PATH, "[]", "utf8");
  }
}

export function getLaunchAudit(): LaunchAuditEntry[] {
  try {
    ensureAuditFile();
    const raw = fs.readFileSync(AUDIT_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as LaunchAuditEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendLaunchAudit(entry: LaunchAuditEntry) {
  const current = getLaunchAudit();
  current.unshift(entry);
  fs.writeFileSync(AUDIT_FILE_PATH, JSON.stringify(current, null, 2), "utf8");
}

export function buildLaunchAuditEntry(
  previous: LaunchControlState,
  next: LaunchControlState,
  action: "launch_control_updated" | "launch_control_rolled_back" = "launch_control_updated",
  note?: string | null,
  operator?: string | null
): LaunchAuditEntry | null {
  const fields: Array<keyof LaunchControlState> = [
    "launchMode",
    "contractMode",
    "alertBar",
    "sourceOfTruth",
    "dmWarning"
  ];

  const changes = fields.filter((field) => previous[field] !== next[field]).map((field) => ({
    field,
    previousValue: String(previous[field]),
    newValue: String(next[field])
  }));

  if (changes.length === 0) return null;

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    changedAt: new Date().toISOString(),
    action,
    changes,
    previousState: previous,
    nextState: next,
    note: note?.trim() || null,
    operator: operator?.trim() || null
  };
}
