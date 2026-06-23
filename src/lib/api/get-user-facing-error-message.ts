import { ApiError } from "@/lib/api/errors";

const TECHNICAL_ERROR_PATTERNS: RegExp[] = [
  /^internal server error$/i,
  /^request failed$/i,
  /^failed to fetch$/i,
  /^network ?error$/i,
  /^fetch failed$/i,
  /^bad gateway$/i,
  /^service unavailable$/i,
  /^gateway timeout$/i,
  /^unexpected end of json input$/i,
  /^not found$/i,
  /^unauthorized$/i,
  /^forbidden$/i,
  /^bad request$/i,
];

function isTechnicalErrorMessage(message: string): boolean {
  const trimmed = message.trim();
  if (!trimmed) {
    return true;
  }

  return TECHNICAL_ERROR_PATTERNS.some((pattern) => pattern.test(trimmed));
}

/**
 * Maps thrown errors to copy safe to show in forms.
 * Keeps actionable backend/validation messages; hides generic server noise.
 */
export function getUserFacingErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (!(error instanceof Error)) {
    return fallback;
  }

  const message = error.message.trim();
  if (!message) {
    return fallback;
  }

  if (error instanceof ApiError) {
    if (error.status >= 500 || error.status === 401 || error.status === 403) {
      return fallback;
    }
  }

  if (isTechnicalErrorMessage(message)) {
    return fallback;
  }

  return message;
}
