import type { OnboardingCompletionStatus } from "@/features/onboarding/utils/onboarding-response.utils";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { cn } from "@/lib/utils";
import { CheckCircle2, ListChecks } from "lucide-react";

type OnboardingPreferencesStatusProps = {
  status: OnboardingCompletionStatus;
  answeredCount: number;
  totalCount: number;
};

export function OnboardingPreferencesStatus({
  status,
  answeredCount,
  totalCount,
}: OnboardingPreferencesStatusProps) {
  const copy =
    status === "empty"
      ? PROFILE_COPY.preferences.statusEmpty
      : status === "partial"
        ? PROFILE_COPY.preferences.statusPartial(answeredCount, totalCount)
        : PROFILE_COPY.preferences.statusComplete;

  if (status === "empty") {
    return (
      <div className="rounded-xl bg-foreground/[0.03] px-3.5 py-3">
        <p className="text-sm font-semibold text-foreground/75">{copy.title}</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/45">
          {copy.description}
        </p>
      </div>
    );
  }

  if (status === "partial") {
    return (
      <div className="flex flex-col gap-2 rounded-xl bg-highlight/20 px-3.5 py-2.5">
        <div className="flex items-start gap-2.5">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-highlight/45">
            <ListChecks
              className="size-3.5 text-foreground/55"
              strokeWidth={2}
              aria-hidden
            />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-xs font-semibold leading-snug text-foreground/78">
              {copy.title}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-foreground/45">
              {copy.description}
            </p>
          </div>
        </div>

        {totalCount > 0 ? (
          <div className="h-1 overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-primary/50 transition-all"
              style={{ width: `${(answeredCount / totalCount) * 100}%` }}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl bg-highlight/32 px-3.5 py-2.5",
      )}
    >
      <CheckCircle2
        className="mt-0.5 size-4 shrink-0 text-foreground/55"
        strokeWidth={2}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-foreground/82">{copy.title}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-foreground/48">
          {copy.description}
        </p>
      </div>
    </div>
  );
}
