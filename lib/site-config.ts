import { LIVE_VALUES } from "@/lib/live-values";

export const SITE_CONFIG = {
  name: "Desert Barrel",
  ticker: "DBRL",
  domain: "desertbarrel.com",

  website: LIVE_VALUES.website,
  publicEmail: LIVE_VALUES.publicEmail,

  x: LIVE_VALUES.x,
  telegram: LIVE_VALUES.telegram,
  contract: LIVE_VALUES.contract,
  launchInfo: LIVE_VALUES.launchInfo,

  ogImage: `${LIVE_VALUES.website}/og-dbrl.jpg`,
  favicon: "/favicon.ico"
} as const;
