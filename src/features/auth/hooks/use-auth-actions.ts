"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { WELCOME_COPY } from "@/features/auth/constants/welcome-copy";
import { useAuth } from "@/hooks/use-auth";
import { ensureAnonymousSession, signOutSession } from "@/lib/api/auth";
import {
  getGuestSignInErrorMessage,
  isGuestDeviceSessionExistsError,
  logGuestSignInSetupHint,
} from "@/lib/auth/guest-mode";
import { resolvePostAuthDestination } from "@/features/onboarding/utils/post-auth-redirect";

export function useAuthActions() {
  const router = useRouter();
  const { signInWithGoogle, applyBootstrapResult } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignInWithGoogle = useCallback(async () => {
    if (isSigningIn) {
      return;
    }

    setIsSigningIn(true);

    try {
      await signInWithGoogle();
    } catch {
      setIsSigningIn(false);
    }
  }, [isSigningIn, signInWithGoogle]);

  const continueAsGuest = useCallback(async () => {
    if (isSigningIn) {
      return;
    }

    setIsSigningIn(true);

    try {
      await ensureAnonymousSession();
      const { destination, bootstrap } = await resolvePostAuthDestination();
      applyBootstrapResult(bootstrap);
      router.replace(destination);
    } catch (error) {
      if (isGuestDeviceSessionExistsError(error)) {
        try {
          await signOutSession();
        } catch {
          // Clear orphan anonymous session when possible.
        }
      }

      logGuestSignInSetupHint(error);
      console.error("[auth] continueAsGuest failed", error);
      toast.error(getGuestSignInErrorMessage(error));
      setIsSigningIn(false);
    }
  }, [applyBootstrapResult, isSigningIn, router]);

  return {
    signInWithGoogle: handleSignInWithGoogle,
    continueAsGuest,
    isSigningIn,
  };
}
