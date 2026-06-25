"use client";

import { useRouter } from "next/navigation";
import { PlannerSection } from "@/components/planner/planner-section";
import { MealPhotoImage } from "@/features/meal-register/components/meal-photo-image";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { PLANNER_DETAIL_SECTION_CLASS } from "@/features/planner/constants/planner-detail-surfaces";
import type { PlannerCompletionMealLog } from "@/features/planner/types/planner-detail.types";
import { cn } from "@/lib/utils";
import { ChevronRight, CircleCheck, ImageIcon } from "lucide-react";

type PlannerEntryDetailCompletionLogProps = {
  mealLog: PlannerCompletionMealLog;
  mealTypeName: string;
  scheduledMealId: string;
  entryDate: string;
  className?: string;
};

function CompletionLogThumb({ mediaUrl }: { mediaUrl: string | null }) {
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-primary/10 bg-card ring-1 ring-primary/5">
      {mediaUrl ? (
        <MealPhotoImage
          mediaRef={mediaUrl}
          className="size-full"
          imageClassName="size-full object-cover"
        />
      ) : (
        <span className="flex size-full items-center justify-center text-foreground/20">
          <ImageIcon className="size-4" strokeWidth={1.5} aria-hidden />
        </span>
      )}
    </div>
  );
}

export function PlannerEntryDetailCompletionLog({
  mealLog,
  mealTypeName,
  scheduledMealId,
  entryDate,
  className,
}: PlannerEntryDetailCompletionLogProps) {
  const router = useRouter();
  const detailLine = mealLog.content?.trim() || mealTypeName;

  const handleOpen = () => {
    const params = new URLSearchParams({
      date: mealLog.dateKey,
      returnTo: `/planner/${scheduledMealId}?date=${entryDate}`,
    });

    router.push(`/history/meals/${mealLog.id}?${params.toString()}`);
  };

  return (
    <PlannerSection
      label={PLANNER_COPY.detail.registeredMealLabel}
      className={cn(PLANNER_DETAIL_SECTION_CLASS, className)}
    >
      <button
        type="button"
        onClick={handleOpen}
        aria-label={PLANNER_COPY.detail.openRegisteredMealAria}
        className="group flex w-full min-w-0 cursor-pointer items-center gap-3 rounded-2xl border border-primary/20 bg-mint/25 px-3 py-2.5 text-left transition-opacity hover:opacity-90 active:opacity-80 mt-2"
      >
        <CompletionLogThumb mediaUrl={mealLog.mediaUrl} />

        <div className="min-w-0 flex-1">
          <p className="flex min-w-0 items-center gap-1.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
              <CircleCheck className="size-3" strokeWidth={2.25} aria-hidden />
            </span>
            <span className="truncate text-sm font-semibold leading-snug text-primary">
              {PLANNER_COPY.detail.registeredMealContextLabel}
            </span>
          </p>
          <p className="mt-1 truncate text-xs leading-relaxed text-foreground/50 group-hover:text-foreground/60">
            {mealLog.loggedAtTime} · {detailLine}
          </p>
        </div>

        <ChevronRight
          className="size-5 shrink-0 text-primary/90 transition-colors group-hover:text-primary/80"
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
    </PlannerSection>
  );
}
