"use client";

import { useRouter } from "next/navigation";
import { HistoryMealLogMoodBadge } from "@/features/history/components/history-meal-log-mood-badge";
import { HistoryMealLogNoteCard } from "@/features/history/components/history-meal-log-note-card";
import {
  HistoryMealLogPlanLink,
  shouldShowPlanLink,
} from "@/features/history/components/history-meal-log-plan-link";
import { HistoryMealLogRecipes } from "@/features/history/components/history-meal-log-recipes";
import { HistoryMealLogTags } from "@/features/history/components/history-meal-log-tags";
import { HistoryLoading } from "@/features/history/components/history-loading";
import { MealPhotoImage } from "@/features/meal-register/components/meal-photo-image";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { useHistoryMealLog } from "@/features/history/queries/use-history-meal-log";
import type { HistoryMealLogDetail } from "@/features/history/types/history.types";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

type HistoryMealLogDetailContentProps = {
  logId: string;
  className?: string;
};

function resolvePlanDate(log: HistoryMealLogDetail): string {
  return log.scheduledMeal?.entryDate ?? log.loggedAt.slice(0, 10);
}

export function HistoryMealLogDetailContent({
  logId,
  className,
}: HistoryMealLogDetailContentProps) {
  const router = useRouter();
  const { data: log, isPending, isError } = useHistoryMealLog(logId);

  if (isPending) {
    return (
      <div className={cn("px-4 py-2", className)}>
        <HistoryLoading />
      </div>
    );
  }

  if (isError || !log) {
    return (
      <p className={cn("px-4 py-10 text-center text-sm text-foreground/60", className)}>
        {HISTORY_COPY.mealLogLoadError}
      </p>
    );
  }

  const handleOpenPlan = () => {
    if (!shouldShowPlanLink(log)) {
      return;
    }

    router.push(`/planner?date=${resolvePlanDate(log)}`);
  };

  return (
    <div className={cn("flex flex-col gap-4 pb-8", className)}>
      <div className="relative mx-4 overflow-hidden rounded-2xl border border-foreground/8 bg-mint/25">
        {log.mediaUrl ? (
          <MealPhotoImage
            mediaRef={log.mediaUrl}
            alt=""
            className="aspect-[4/5] w-full"
            imageClassName="size-full"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-mint/40 to-card">
            <span className="flex size-16 items-center justify-center rounded-2xl border border-foreground/8 bg-card/80 text-foreground/20">
              <ImageIcon className="size-7" strokeWidth={1.25} aria-hidden />
            </span>
          </div>
        )}

        <HistoryMealLogMoodBadge score={log.score} />
      </div>

      <div className="flex flex-col gap-6 px-4">
        <HistoryMealLogPlanLink log={log} onOpenPlan={handleOpenPlan} />

        {log.content ? <HistoryMealLogNoteCard content={log.content} /> : null}

        <HistoryMealLogRecipes recipes={log.recipes} />

        <HistoryMealLogTags tags={log.tags} />
      </div>
    </div>
  );
}
