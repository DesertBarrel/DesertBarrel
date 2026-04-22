import fs from "node:fs";
import path from "node:path";

export type OperatorChecklistState = {
  websiteChecked: boolean;
  xChecked: boolean;
  telegramChecked: boolean;
  contractConsistencyChecked: boolean;
  pinnedPostsChecked: boolean;
};

const DEFAULT_OPERATOR_CHECKLIST: OperatorChecklistState = {
  websiteChecked: false,
  xChecked: false,
  telegramChecked: false,
  contractConsistencyChecked: false,
  pinnedPostsChecked: false
};

const CHECKLIST_FILE_PATH = path.join(process.cwd(), "data", "operator-checklist.json");

function ensureChecklistFile() {
  fs.mkdirSync(path.dirname(CHECKLIST_FILE_PATH), { recursive: true });
  if (!fs.existsSync(CHECKLIST_FILE_PATH)) {
    fs.writeFileSync(CHECKLIST_FILE_PATH, JSON.stringify(DEFAULT_OPERATOR_CHECKLIST, null, 2), "utf8");
  }
}

function sanitizeChecklist(input: Partial<OperatorChecklistState>): OperatorChecklistState {
  return {
    websiteChecked: Boolean(input.websiteChecked),
    xChecked: Boolean(input.xChecked),
    telegramChecked: Boolean(input.telegramChecked),
    contractConsistencyChecked: Boolean(input.contractConsistencyChecked),
    pinnedPostsChecked: Boolean(input.pinnedPostsChecked)
  };
}

export function getOperatorChecklist(): OperatorChecklistState {
  try {
    ensureChecklistFile();
    const raw = fs.readFileSync(CHECKLIST_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<OperatorChecklistState>;
    return { ...DEFAULT_OPERATOR_CHECKLIST, ...sanitizeChecklist(parsed) };
  } catch {
    return DEFAULT_OPERATOR_CHECKLIST;
  }
}

export function saveOperatorChecklist(input: Partial<OperatorChecklistState>): OperatorChecklistState {
  const current = getOperatorChecklist();
  const next = { ...current, ...sanitizeChecklist(input) };

  fs.mkdirSync(path.dirname(CHECKLIST_FILE_PATH), { recursive: true });
  fs.writeFileSync(CHECKLIST_FILE_PATH, JSON.stringify(next, null, 2), "utf8");

  return next;
}
