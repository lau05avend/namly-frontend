export const GUEST_SESSION_EXPIRED_CODE = "GUEST_SESSION_EXPIRED";

export const GUEST_FEATURE_RESTRICTED_CODE = "GUEST_FEATURE_RESTRICTED";

export const GUEST_DEVICE_SESSION_EXISTS_CODE = "GUEST_DEVICE_SESSION_EXISTS";

export type GuestSessionState = {
  isGuest: boolean;
  guestExpiresAt: string | null;
};

const GUEST_STATE_STORAGE_KEY = "namly_guest_state";

export function saveGuestSessionState(state: GuestSessionState): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(GUEST_STATE_STORAGE_KEY, JSON.stringify(state));
}

export function loadGuestSessionState(): GuestSessionState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(GUEST_STATE_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (
      parsed &&
      typeof parsed === "object" &&
      "isGuest" in parsed &&
      typeof parsed.isGuest === "boolean"
    ) {
      const guestExpiresAt =
        "guestExpiresAt" in parsed &&
        (typeof parsed.guestExpiresAt === "string" || parsed.guestExpiresAt === null)
          ? parsed.guestExpiresAt
          : null;

      return {
        isGuest: parsed.isGuest,
        guestExpiresAt,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function clearGuestSessionState(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(GUEST_STATE_STORAGE_KEY);
}
