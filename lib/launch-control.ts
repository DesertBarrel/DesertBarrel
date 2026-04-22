import fs from "node:fs";
import path from "node:path";
import { DEFAULT_LAUNCH_CONTROL, type LaunchControlState, type LaunchMode, type ContractMode } from "@/lib/launch-defaults";
import { appendLaunchAudit, buildLaunchAuditEntry } from "@/lib/launch-audit";

const CONTROL_FILE_PATH = path.join(process.cwd(), "data", "launch-control.json");

function isLaunchMode(value: string): value is LaunchMode {
  return ["prelaunch", "live", "paused", "warning", "archived"].includes(value);
}

function isContractMode(value: string): value is ContractMode {
  return ["pending", "live", "warning", "disabled"].includes(value);
}

function sanitizeState(input: Partial<LaunchControlState>): LaunchControlState {
  return {
    launchMode: isLaunchMode(String(input.launchMode)) ? (String(input.launchMode) as LaunchMode) : DEFAULT_LAUNCH_CONTROL.launchMode,
    contractMode: isContractMode(String(input.contractMode)) ? (String(input.contractMode) as ContractMode) : DEFAULT_LAUNCH_CONTROL.contractMode,
    alertBar: String(input.alertBar || DEFAULT_LAUNCH_CONTROL.alertBar).trim(),
    sourceOfTruth: String(input.sourceOfTruth || DEFAULT_LAUNCH_CONTROL.sourceOfTruth).trim(),
    dmWarning: String(input.dmWarning || DEFAULT_LAUNCH_CONTROL.dmWarning).trim()
  };
}

function writeLaunchControl(state: LaunchControlState) {
  fs.mkdirSync(path.dirname(CONTROL_FILE_PATH), { recursive: true });
  fs.writeFileSync(CONTROL_FILE_PATH, JSON.stringify(state, null, 2), "utf8");
}

export function getLaunchControl(): LaunchControlState {
  try {
    if (!fs.existsSync(CONTROL_FILE_PATH)) {
      return DEFAULT_LAUNCH_CONTROL;
    }
    const raw = fs.readFileSync(CONTROL_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<LaunchControlState>;
    return sanitizeState(parsed);
  } catch {
    return DEFAULT_LAUNCH_CONTROL;
  }
}

export function saveLaunchControl(
  input: Partial<LaunchControlState>,
  meta?: { note?: string | null; operator?: string | null }
): LaunchControlState {
  const current = getLaunchControl();
  const next = sanitizeState({ ...current, ...input });
  writeLaunchControl(next);

  const auditEntry = buildLaunchAuditEntry(current, next, "launch_control_updated", meta?.note, meta?.operator);
  if (auditEntry) appendLaunchAudit(auditEntry);
  return next;
}

export function overwriteLaunchControl(
  nextState: LaunchControlState,
  action: "launch_control_updated" | "launch_control_rolled_back" = "launch_control_rolled_back",
  meta?: { note?: string | null; operator?: string | null }
): LaunchControlState {
  const current = getLaunchControl();
  const next = sanitizeState(nextState);
  writeLaunchControl(next);

  const auditEntry = buildLaunchAuditEntry(current, next, action, meta?.note, meta?.operator);
  if (auditEntry) appendLaunchAudit(auditEntry);
  return next;
}
