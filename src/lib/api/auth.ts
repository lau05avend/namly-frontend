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

export function isAnonymousSessionUser(user: { is_anonymous?: boolean } | null | undefined): boolean {
  return user?.is_anonymous === true;
}

export async function signInAnonymously(): Promise<void> {
  const { error } = await supabase.auth.signInAnonymously();

  if (error) {
    throw error;
  }
}

export async function ensureAnonymousSession(): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (isAnonymousSessionUser(session?.user)) {
    return;
  }

  await signInAnonymously();
}

export async function signInWithGoogleOAuth(): Promise<void> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (isAnonymousSessionUser(session?.user)) {
    const { error } = await supabase.auth.linkIdentity({
      provider: "google",
      options: {
        redirectTo: `${resolveOAuthRedirectOrigin()}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    return;
  }

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
