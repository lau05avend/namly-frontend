import { apiClient } from "@/lib/api/api-client";
import type {
  BootstrapUserPayload,
  BootstrapUserResponse,
  Profile,
  UpdateProfilePayload,
} from "@/features/profile/types/profile.types";

export async function bootstrapUser(
  payload: BootstrapUserPayload = {},
): Promise<BootstrapUserResponse> {
  return apiClient<BootstrapUserResponse>("/api/v1/auth/me", {
    method: "POST",
    body: payload,
  });
}

export async function fetchProfile(): Promise<Profile> {
  return apiClient<Profile>("/api/v1/profile");
}

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<Profile> {
  return apiClient<Profile>("/api/v1/profile", {
    method: "PATCH",
    body: payload,
  });
}

export async function bootstrapAndFetchProfile(
  displayName?: string,
): Promise<Profile> {
  await bootstrapUser(displayName ? { displayName } : {});
  return fetchProfile();
}
