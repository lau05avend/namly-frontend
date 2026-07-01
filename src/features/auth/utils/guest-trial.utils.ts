export function resolveGuestDaysRemaining(
  guestExpiresAt: string | null,
): number | null {
  if (!guestExpiresAt) {
    return null;
  }

  const expiresAtMs = new Date(guestExpiresAt).getTime();
  const diffMs = expiresAtMs - Date.now();

  if (diffMs <= 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(diffMs / (24 * 60 * 60 * 1000)));
}
