import crypto from "node:crypto";

const COOKIE_NAME = "dbrl_admin_session";

function getSecret() {
  const secret = process.env.ADMIN_CONTROL_SECRET;
  if (!secret) {
    throw new Error("ADMIN_CONTROL_SECRET is not configured.");
  }
  return secret;
}

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createAdminSessionValue() {
  const payload = "dbrl-admin";
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function isValidAdminSessionValue(value: string | undefined | null) {
  if (!value) return false;

  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;
  if (payload !== "dbrl-admin") return false;

  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");

  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
