"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Placeholder auth actions until Supabase Google OAuth is wired.
 */
export function useAuthActions() {
  const router = useRouter();

  const signInWithGoogle = useCallback((displayName?: string) => {
    // TODO: integrate Supabase Auth Google OAuth
    console.info("[auth] signInWithGoogle", { displayName });
  }, []);

  const continueAsGuest = useCallback(
    (displayName?: string) => {
      // TODO: persist guest session / route guard
      console.info("[auth] continueAsGuest", { displayName });
      router.push("/home");
    },
    [router],
  );

  return { signInWithGoogle, continueAsGuest };
}
