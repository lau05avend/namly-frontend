"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function useAuthActions() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignInWithGoogle = useCallback(
    async (_displayName?: string) => {
      if (isSigningIn) {
        return;
      }

      setIsSigningIn(true);

      try {
        await signInWithGoogle();
      } catch (error) {
        console.error("[auth] signInWithGoogle failed", error);
        setIsSigningIn(false);
      }
    },
    [isSigningIn, signInWithGoogle],
  );

  const continueAsGuest = useCallback(
    (displayName?: string) => {
      // TODO: persist guest session / route guard
      console.info("[auth] continueAsGuest", { displayName });
      router.push("/home");
    },
    [router],
  );

  return {
    signInWithGoogle: handleSignInWithGoogle,
    continueAsGuest,
    isSigningIn,
  };
}
