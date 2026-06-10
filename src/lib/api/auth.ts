import { getFrontendUrl } from "@/lib/env";
import { supabase } from "@/lib/supabase/client";

function resolveOAuthRedirectOrigin(): string {
  const configured = getFrontendUrl();
  if (configured) {
    return configured;
  }

  return window.location.origin;
}

export async function getAccessToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token ?? null;
}

export async function signInWithGoogleOAuth(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${resolveOAuthRedirectOrigin()}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }
}

export async function signOutSession(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
