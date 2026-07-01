import { getAccessToken } from "@/lib/api/auth";
import { ApiError, parseApiError } from "@/lib/api/errors";
import { handleGuestSessionExpired } from "@/lib/api/handle-guest-session-expired";
import { handleUnauthorizedSession } from "@/lib/api/handle-unauthorized-session";
import {
  GUEST_FEATURE_RESTRICTED_CODE,
  GUEST_SESSION_EXPIRED_CODE,
} from "@/lib/auth/guest-session";
import { BACKEND_API_URL } from "@/lib/env";
import { toast } from "sonner";

export type ApiClientOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiClient<TResponse>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<TResponse> {
  const { body, headers: customHeaders, ...rest } = options;

  const token = await getAccessToken();
  const headers = new Headers(customHeaders);

  if (!headers.has("Content-Type") && body !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    ...rest,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await parseApiError(response);

    if (error.status === 401) {
      void handleUnauthorizedSession();
    }

    if (error.status === 403 && error.code === GUEST_SESSION_EXPIRED_CODE) {
      void handleGuestSessionExpired();
    }

    if (error.status === 403 && error.code === GUEST_FEATURE_RESTRICTED_CODE) {
      toast.error("Esta función requiere crear una cuenta.");
    }

    throw error;
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

export { ApiError };
