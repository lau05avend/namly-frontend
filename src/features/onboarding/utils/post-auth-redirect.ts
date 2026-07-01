import type { BootstrapUserResponse } from "@/features/profile/types/profile.types";
import { getOrCreateDeviceId } from "@/lib/auth/device-id";
import { bootstrapUser } from "@/features/profile/services/profile.service";

export type PostAuthDestination = "/onboarding/welcome" | "/home";

export function resolvePostAuthDestinationFromBootstrap(
  bootstrap: BootstrapUserResponse,
): PostAuthDestination {
  if (bootstrap.hasCompletedOnboarding) {
    return "/home";
  }

  if (bootstrap.isNewUser) {
    return "/onboarding/welcome";
  }

  return "/home";
}

export async function resolvePostAuthDestination(
  displayName?: string,
): Promise<{
  destination: PostAuthDestination;
  bootstrap: BootstrapUserResponse;
}> {
  const bootstrap = await bootstrapUser({
    deviceId: getOrCreateDeviceId(),
    ...(displayName ? { displayName } : {}),
  });

  return {
    destination: resolvePostAuthDestinationFromBootstrap(bootstrap),
    bootstrap,
  };
}
