import { getAccessToken } from "@/lib/api/auth";
import { ApiError, parseApiError } from "@/lib/api/errors";
import { BACKEND_API_URL } from "@/lib/env";

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
    throw await parseApiError(response);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

export { ApiError };
