export type LaunchMode = "prelaunch" | "live" | "paused" | "warning" | "archived";
export type ContractMode = "pending" | "live" | "warning" | "disabled";

export type LaunchControlState = {
  launchMode: LaunchMode;
  contractMode: ContractMode;
  alertBar: string;
  sourceOfTruth: string;
  dmWarning: string;
};

export const DEFAULT_LAUNCH_CONTROL: LaunchControlState = {
  launchMode: "prelaunch",
  contractMode: "pending",
  alertBar: "Official DBRL updates are posted only through verified project channels. Always verify links and contract details before taking action.",
  sourceOfTruth: "Only trust the official website, pinned official posts, and verified project channels.",
  dmWarning: "We will never DM you first. Ignore copied contracts, screenshots, reply links, and fake support accounts."
};
