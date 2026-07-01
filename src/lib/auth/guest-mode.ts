import { WELCOME_COPY } from "@/features/auth/constants/welcome-copy";
import { ApiError } from "@/lib/api/errors";
import { GUEST_DEVICE_SESSION_EXISTS_CODE } from "@/lib/auth/guest-session";

const GUEST_MODE_ENABLED =
  process.env.NEXT_PUBLIC_GUEST_MODE_ENABLED !== "false";

export function isGuestModeEnabled(): boolean {
  return GUEST_MODE_ENABLED;
}

export function isAnonymousSignInDisabledError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.message.toLowerCase().includes("anonymous sign-ins are disabled");
}

export function isManualLinkingDisabledError(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.message.toLowerCase().includes("manual linking is disabled");
}

export function isGuestDeviceSessionExistsError(error: unknown): boolean {
  return (
    error instanceof ApiError &&
    error.code === GUEST_DEVICE_SESSION_EXISTS_CODE
  );
}

export function getGuestSignInErrorMessage(error: unknown): string {
  if (isGuestDeviceSessionExistsError(error)) {
    return WELCOME_COPY.guestDeviceSessionExists;
  }

  if (isAnonymousSignInDisabledError(error)) {
    return WELCOME_COPY.guestSignInDisabled;
  }

  return WELCOME_COPY.guestSignInError;
}

export function getGoogleSignInErrorMessage(error: unknown): string {
  if (isManualLinkingDisabledError(error)) {
    return WELCOME_COPY.guestManualLinkingDisabled;
  }

  return WELCOME_COPY.googleSignInError;
}

export function logGuestSignInSetupHint(error: unknown): void {
  if (!isAnonymousSignInDisabledError(error)) {
    return;
  }

  console.warn(
    "[auth] Guest mode requires Anonymous Sign-ins in Supabase: Authentication → Sign In / Providers → User Signups → Allow anonymous sign-ins → Save",
  );
}

export function logManualLinkingSetupHint(error: unknown): void {
  if (!isManualLinkingDisabledError(error)) {
    return;
  }

  console.warn(
    "[auth] Guest account linking requires Manual linking in Supabase: Authentication → Sign In / Providers → User Signups → Allow manual linking → Save",
  );
}
