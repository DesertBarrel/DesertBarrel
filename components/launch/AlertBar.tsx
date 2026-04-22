import { getLaunchControl } from "@/lib/launch-control";

function getAlertMessage() {
  const control = getLaunchControl();

  switch (control.launchMode) {
    case "live":
      return "DBRL is live. Only trust verified official channels, pinned official posts, and the exact official contract.";
    case "paused":
      return "DBRL activity is temporarily paused. Wait for pinned official updates before taking any action.";
    case "warning":
      return "Security warning: verify every link and contract detail through the official website and pinned official posts only.";
    case "archived":
      return "DBRL is archived. Treat historical content cautiously and rely only on official records.";
    case "prelaunch":
    default:
      return control.alertBar;
  }
}

export default function AlertBar() {
  return (
    <div className="border-b border-line bg-panel px-4 py-3 text-center text-xs text-slate">
      {getAlertMessage()}
    </div>
  );
}
