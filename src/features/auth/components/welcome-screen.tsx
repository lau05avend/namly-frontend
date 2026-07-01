import { Suspense } from "react";
import { GuestExpiredNotice } from "@/features/auth/components/guest-expired-notice";
import { WelcomeBranding } from "@/features/auth/components/welcome-branding";
import { WelcomeForm } from "@/features/auth/components/welcome-form";
import { WelcomeGate } from "@/features/auth/components/welcome-gate";
import { WelcomeVisualHeader } from "@/features/auth/components/welcome-visual-header";

export function WelcomeScreen() {
  return (
    <WelcomeGate>
      <div className="flex min-h-dvh flex-col bg-background">
        <WelcomeVisualHeader />

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8 px-6 pt-8 pb-safe">
          <Suspense fallback={null}>
            <GuestExpiredNotice />
          </Suspense>
          <WelcomeBranding />
          <WelcomeForm />
        </div>
      </div>
    </WelcomeGate>
  );
}
