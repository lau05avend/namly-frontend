"use client";

import { useRouter } from "next/navigation";
import { GUEST_TRIAL_COPY } from "@/features/auth/constants/guest-trial-copy";
import { GUEST_TRIAL_SURFACE } from "@/features/auth/constants/guest-trial-surfaces";
import { resolveGuestDaysRemaining } from "@/features/auth/utils/guest-trial.utils";
import { useProfile } from "@/features/profile/queries/use-profile";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type GuestTrialBannerProps = {
  className?: string;
};

function GuestTrialAction({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 cursor-pointer items-center gap-0.5 text-xs font-semibold text-cta transition-colors hover:text-cta/85"
    >
      {label}
      <ChevronRight className="size-3.5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}

export function GuestTrialBanner({ className }: GuestTrialBannerProps) {
  const router = useRouter();
  const { isGuest, guestExpiresAt, signInWithGoogle } = useAuth();
  const { data: profile } = useProfile();

  if (!isGuest) {
    return null;
  }

  const daysRemaining = resolveGuestDaysRemaining(guestExpiresAt);
  const daysLabel =
    daysRemaining === null
      ? GUEST_TRIAL_COPY.trialFallback
      : GUEST_TRIAL_COPY.daysRemaining(daysRemaining);

  const showOnboardingCta = profile != null && !profile.hasCompletedOnboarding;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-3.5 py-2.5",
        GUEST_TRIAL_SURFACE,
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className="size-2 shrink-0 rounded-full bg-cta shadow-sm shadow-cta/30"
          aria-hidden
        />
        <p className="min-w-0 text-xs leading-snug text-foreground/70">
          <span className="font-semibold text-cta">{GUEST_TRIAL_COPY.label}</span>
          <span aria-hidden> · </span>
          <span>{daysLabel}</span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {showOnboardingCta ? (
          <GuestTrialAction
            label={GUEST_TRIAL_COPY.personalize}
            onClick={() => router.push("/profile/preferences")}
          />
        ) : null}
        <GuestTrialAction
          label={GUEST_TRIAL_COPY.createAccount}
          onClick={() => void signInWithGoogle()}
        />
      </div>
    </div>
  );
}
