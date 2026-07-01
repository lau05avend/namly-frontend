import { signOutSession } from "@/lib/api/auth";
import { clearGuestSessionState } from "@/lib/auth/guest-session";

let isHandlingGuestExpiry = false;

export async function handleGuestSessionExpired(): Promise<void> {
  if (typeof window === "undefined" || isHandlingGuestExpiry) {
    return;
  }

  isHandlingGuestExpiry = true;

  try {
    clearGuestSessionState();
    await signOutSession();
  } catch {
    // Still redirect — local session may already be invalid.
  }

  window.location.replace("/?guest_expired=1");
}
