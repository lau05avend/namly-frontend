import { apiClient } from "@/lib/api/api-client";
import type {
  BootstrapUserPayload,
  BootstrapUserResponse,
  Profile,
  UpdateProfilePayload,
} from "@/features/profile/types/profile.types";

type BootstrapUserApiResponse = BootstrapUserResponse & {
  is_new_user?: boolean;
};

function normalizeBootstrapResponse(
  raw: BootstrapUserApiResponse,
): BootstrapUserResponse {
  return {
    id: raw.id,
    displayName: raw.displayName,
    email: raw.email,
    isNewUser: raw.isNewUser ?? raw.is_new_user ?? false,
  };
}

export async function bootstrapUser(
  payload: BootstrapUserPayload = {},
): Promise<BootstrapUserResponse> {
  const data = await apiClient<BootstrapUserApiResponse>("/api/v1/auth/me", {
    method: "POST",
    body: payload,
  });

  return normalizeBootstrapResponse(data);
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

export async function saveDisplayName(displayName: string): Promise<Profile> {
  const profile = await fetchProfile();

  return updateProfile({
    displayName: displayName.trim(),
    avatarUrl: profile.avatarUrl,
  });
}
