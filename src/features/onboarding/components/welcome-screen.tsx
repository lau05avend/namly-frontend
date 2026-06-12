"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { WelcomeIllustrationHeader } from "@/features/onboarding/components/welcome-illustration-header";
import { markOnboardingStarted } from "@/features/onboarding/constants/onboarding-flow-storage";
import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";

export function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    markOnboardingStarted();
    router.push("/onboarding");
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <WelcomeIllustrationHeader />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-between px-6 pt-5 pb-safe">
        <div className="flex flex-col gap-6">
          <header className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-primary">
              {ONBOARDING_COPY.welcome.eyebrow}
            </p>
            <h1 className="mt-2.5 max-w-[19rem] text-2xl font-bold leading-snug text-foreground">
              {ONBOARDING_COPY.welcome.headline}
            </h1>
            <p className="mt-3 max-w-[17rem] text-sm leading-relaxed text-foreground/60">
              {ONBOARDING_COPY.welcome.supporting}
            </p>
          </header>

          <SurfaceCard className="mx-2 flex flex-row items-center gap-3 bg-mint p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-mint/60 text-primary">
              <Heart className="size-5" aria-hidden />
            </span>
            <p className="pr-1.5 text-sm leading-relaxed text-foreground/70">
              {ONBOARDING_COPY.welcome.infoCard}
            </p>
          </SurfaceCard>
        </div>

        <div className="pt-8">
          <Button type="button" onClick={handleStart}>
            {ONBOARDING_COPY.welcome.start}
          </Button>
        </div>
      </div>
    </div>
  );
}
