/**
 * Canonical frontend app URL (OAuth redirects, absolute links).
 * Falls back to browser origin when unset in the client.
 */
function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getFrontendUrl(): string {
  const url = process.env.NEXT_PUBLIC_FRONTEND_URL;

  if (!url) {
    return "";
  }

  return normalizeBaseUrl(url);
}

export const FRONTEND_URL = getFrontendUrl();
