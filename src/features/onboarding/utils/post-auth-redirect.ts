import { bootstrapUser, fetchProfile } from "@/features/profile/services/profile.service";
import type {
  BootstrapUserResponse,
  Profile,
} from "@/features/profile/types/profile.types";

export type PostAuthDestination =
  | "/onboarding/welcome"
  | "/home";

export function resolvePostAuthDestinationFromContext(
  bootstrap: BootstrapUserResponse,
  profile: Profile,
): PostAuthDestination {
  if (!bootstrap.isNewUser) {
    return "/home";
  }

  if (profile.hasCompletedOnboarding) {
    return "/home";
  }

  return "/onboarding/welcome";
}

export async function resolvePostAuthDestination(): Promise<PostAuthDestination> {
  const bootstrap = await bootstrapUser();
  const profile = await fetchProfile();

  return resolvePostAuthDestinationFromContext(bootstrap, profile);
}
