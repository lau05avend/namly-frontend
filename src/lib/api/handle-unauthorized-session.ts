import { signOutSession } from "@/lib/api/auth";

let isHandlingUnauthorized = false;

/**
 * Ends a stale client session when the API rejects the JWT (401).
 * Deduped so parallel failing requests only trigger one sign-out + redirect.
 */
export async function handleUnauthorizedSession(): Promise<void> {
  if (typeof window === "undefined" || isHandlingUnauthorized) {
    return;
  }

  isHandlingUnauthorized = true;

  try {
    await signOutSession();
  } catch {
    // Still redirect — local session may already be invalid.
  }

  window.location.replace("/");
}
