"use client";

import { useRouter } from "next/navigation";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

export const PLANNER_ENTRY_DETAIL_CONTENT_OFFSET_CLASS =
  "pt-[calc(env(safe-area-inset-top)+4.5rem)]";

type PlannerEntryDetailHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function PlannerEntryDetailHeader({
  title,
  subtitle,
  onBack,
  onEdit,
  onDelete,
}: PlannerEntryDetailHeaderProps) {
  const router = useRouter();
  const showActions = Boolean(onEdit || onDelete);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    router.back();
  };

  return (
    <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
      <div className="relative mx-auto flex w-full max-w-lg items-center gap-1 px-4 py-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label={PLANNER_COPY.detail.back}
          className="relative z-10 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-mint text-primary"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </button>

        <div className="pointer-events-none absolute inset-x-0 flex flex-col items-center px-16">
          <h1 className="max-w-full truncate text-base font-bold text-foreground">
            {title}
          </h1>
          {subtitle ? (
            <p className={cn("text-xs text-foreground/45")}>{subtitle}</p>
          ) : null}
        </div>

        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            aria-label={PLANNER_COPY.detail.editPlan}
            className="relative z-10 ml-auto flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-mint/60 hover:text-primary"
          >
            <Pencil className="size-4" strokeWidth={2} aria-hidden />
          </button>
        ) : null}

        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            aria-label={PLANNER_COPY.detail.deletePlan}
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
