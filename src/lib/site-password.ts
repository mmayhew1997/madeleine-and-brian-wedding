/**
 * Shared-password gate for the site.
 *
 * The password itself lives in the SITE_PASSWORD env var — never in the repo,
 * which is public. A guest who types it correctly gets a cookie holding an
 * HMAC of a fixed phrase keyed by the password. That lets the server verify
 * the cookie on later requests without ever storing the password in the
 * browser, and it can't be forged by someone who doesn't know the password.
 *
 * Web Crypto (not node:crypto) so this works unchanged whether the proxy runs
 * on the Node.js or Edge runtime.
 */

export const COOKIE_NAME = "mb_unlocked";

/** A year — guests should unlock once per device, not once per visit. */
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const TOKEN_PHRASE = "madeleine-and-brian-2027";

/** The configured password, or undefined if the env var isn't set. */
export function sitePassword(): string | undefined {
  const raw = process.env.SITE_PASSWORD;
  return raw && raw.trim() ? raw : undefined;
}

/**
 * Forgiving comparison — nobody should be locked out over caps or spacing.
 * Spaces are dropped entirely, so a guest who adds one still gets in.
 */
export function normalize(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "");
}

export async function unlockToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(normalize(password)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(TOKEN_PHRASE),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time compare, so a cookie can't be guessed a byte at a time. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
