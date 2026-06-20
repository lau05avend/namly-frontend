"use client";

import { useRouter } from "next/navigation";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { formatHistoryMealLogHeaderDate } from "@/features/history/utils/format-history-meal-log-date";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

type HistoryMealLogHeaderProps = {
  dateKey: string;
  loggedAtTime?: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
};

export function HistoryMealLogHeader({
  dateKey,
  loggedAtTime,
  onEdit,
  onDelete,
  onBack,
}: HistoryMealLogHeaderProps) {
  const router = useRouter();
  const heading = formatHistoryMealLogHeaderDate(dateKey);
  const showActions = Boolean(onEdit || onDelete);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.replace("/history");
  };

  return (
    <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
      <div className="relative mx-auto flex w-full max-w-lg items-center gap-1 px-4 py-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label={HISTORY_COPY.back}
          className="relative z-10 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-mint text-primary"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>

        <div className="pointer-events-none absolute inset-x-0 flex flex-col items-center px-16">
          <h1 className="max-w-full truncate text-base font-bold text-foreground">
            {heading}
          </h1>
          {loggedAtTime ? (
            <p className="text-xs text-foreground/45">{loggedAtTime}</p>
          ) : null}
        </div>

        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            aria-label={HISTORY_COPY.editMeal}
            className="relative z-10 ml-auto flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-mint/60 hover:text-primary"
          >
            <Pencil className="size-4" strokeWidth={2} aria-hidden />
          </button>
        ) : null}

        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            aria-label={HISTORY_COPY.deleteMeal}
            className={cn(
              "relative z-10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-cta/10 hover:text-cta",
              !onEdit && "ml-auto",
            )}
          >
            <Trash2 className="size-4" strokeWidth={2} aria-hidden />
          </button>
        ) : null}

        {!showActions ? (
          <span className="ml-auto size-10 shrink-0" aria-hidden />
        ) : null}
      </div>
    </div>
  );
}
