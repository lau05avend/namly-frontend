"use client";

import { useId, useState } from "react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WELCOME_COPY } from "@/features/auth/constants/welcome-copy";
import { WelcomeDivider } from "@/features/auth/components/welcome-divider";
import { useAuthActions } from "@/features/auth/hooks/use-auth-actions";

export function WelcomeForm() {
  const nameFieldId = useId();
  const [name, setName] = useState("");
  const { signInWithGoogle, continueAsGuest, isSigningIn } = useAuthActions();

  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor={nameFieldId}
          className="text-xs font-semibold tracking-wide text-foreground/55 uppercase"
        >
          {WELCOME_COPY.nameLabel}
        </label>
        <Input
          id={nameFieldId}
          name="name"
          type="text"
          autoComplete="given-name"
          placeholder={WELCOME_COPY.namePlaceholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <Button
        variant="outline"
        onClick={() => signInWithGoogle(name)}
        disabled={isSigningIn}
        aria-label={WELCOME_COPY.googleCta}
        className="justify-start gap-3 px-5"
      >
        <GoogleIcon className="shrink-0" />
        <span className="flex-1 text-center">{WELCOME_COPY.googleCta}</span>
      </Button>

      <WelcomeDivider />

      <div className="flex flex-col items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => continueAsGuest(name)}
          className="w-auto min-w-0 px-2 font-semibold text-foreground"
        >
          {WELCOME_COPY.guestCta}
        </Button>
        <p className="text-xs text-foreground/45">{WELCOME_COPY.guestHint}</p>
      </div>
    </section>
  );
}
