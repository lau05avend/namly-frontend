/**
 * NestJS backend base URL.
 * Must be NEXT_PUBLIC_* because apiClient runs in client components.
 */
function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export function getBackendApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  if (!url) {
    return "";
  }

  return normalizeBaseUrl(url);
}

export const BACKEND_API_URL = getBackendApiUrl();
