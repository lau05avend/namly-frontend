"use client";

import { useRouter } from "next/navigation";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { formatHistoryMealLogHeaderDate } from "@/features/history/utils/format-history-meal-log-date";
import { ArrowLeft } from "lucide-react";

type HistoryMealLogHeaderProps = {
  dateKey: string;
  loggedAtTime?: string | null;
};

export function HistoryMealLogHeader({
  dateKey,
  loggedAtTime,
}: HistoryMealLogHeaderProps) {
  const router = useRouter();
  const heading = formatHistoryMealLogHeaderDate(dateKey);

  return (
    <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-lg items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={HISTORY_COPY.back}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-mint text-primary"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>

        <div className="min-w-0 flex-1 text-center">
          <h1 className="truncate text-base font-bold text-foreground">
            {heading}
          </h1>
          {loggedAtTime ? (
            <p className="text-xs text-foreground/45">{loggedAtTime}</p>
          ) : null}
        </div>

        <span className="size-10 shrink-0" aria-hidden />
      </div>
    </div>
  );
}
