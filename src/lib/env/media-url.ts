const DEFAULT_MEDIA_URL_MAX_ATTEMPTS = 2;

/**
 * Max fetch attempts when resolving a private media URL (signed URL flow).
 * Example: 2 = one initial request + one retry.
 */
export function getMediaUrlMaxAttempts(): number {
  const raw = process.env.NEXT_PUBLIC_MEDIA_URL_MAX_ATTEMPTS?.trim();
  if (!raw) {
    return DEFAULT_MEDIA_URL_MAX_ATTEMPTS;
  }

  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return DEFAULT_MEDIA_URL_MAX_ATTEMPTS;
  }

  return parsed;
}

/** TanStack Query `retry` value derived from max attempts. */
export function getMediaUrlQueryRetryCount(): number {
  return Math.max(0, getMediaUrlMaxAttempts() - 1);
}
