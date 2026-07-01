"use client";

import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { WELCOME_COPY } from "@/features/auth/constants/welcome-copy";
import { WelcomeDivider } from "@/features/auth/components/welcome-divider";
import { useAuthActions } from "@/features/auth/hooks/use-auth-actions";
import { isGuestModeEnabled } from "@/lib/auth/guest-mode";

export function WelcomeForm() {
  const { signInWithGoogle, continueAsGuest, isSigningIn } = useAuthActions();
  const guestModeEnabled = isGuestModeEnabled();

  return (
    <section className="flex w-full flex-col gap-5">
      <Button
        variant="outline"
        onClick={() => void signInWithGoogle()}
        disabled={isSigningIn}
        aria-label={WELCOME_COPY.googleCta}
        className="justify-start gap-3 px-5"
      >
        <GoogleIcon className="shrink-0" />
        <span className="flex-1 text-center">{WELCOME_COPY.googleCta}</span>
      </Button>

      {guestModeEnabled ? (
        <>
          <WelcomeDivider />

          <div className="flex flex-col items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void continueAsGuest()}
              disabled={isSigningIn}
              className="w-auto min-w-0 px-2 font-semibold text-foreground"
            >
              {WELCOME_COPY.guestCta}
            </Button>
            <p className="text-xs text-foreground/45">{WELCOME_COPY.guestHint}</p>
          </div>
        </>
      ) : null}
    </section>
  );
}
