import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import type { PlannerScheduledMealDetail } from "@/features/planner/types/planner-detail.types";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

type PlannerEntryDetailMetaProps = {
  detail: PlannerScheduledMealDetail;
  className?: string;
};

function resolveStatusBadgeClass(status: PlannerScheduledMealDetail["status"]) {
  switch (status) {
    case "next":
      return "border-primary/20 bg-primary/10 text-primary";
    case "missed":
      return "border-cta/20 bg-cta/10 text-cta";
    case "completed":
      return "border-primary/15 bg-primary/10 text-primary/80";
    case "upcoming":
    default:
      return "border-foreground/10 bg-foreground/[0.04] text-foreground/55";
  }
}

function resolveStatusDotClass(status: PlannerScheduledMealDetail["status"]) {
  switch (status) {
    case "next":
      return "bg-primary";
    case "missed":
      return "bg-cta";
    case "completed":
      return "bg-primary/70";
    case "upcoming":
    default:
      return "bg-foreground/35";
  }
}

function splitTimeLabel(timeLabel: string): { time: string; period?: string } {
  const match = timeLabel.match(/^(\d{1,2}:\d{2})\s+(.+)$/);

  if (!match) {
    return { time: timeLabel };
  }

  return {
    time: match[1],
    period: match[2].replace(/\s/g, "").toLowerCase(),
  };
}

export function PlannerEntryDetailMeta({
  detail,
  className,
}: PlannerEntryDetailMetaProps) {
  const { time, period } = splitTimeLabel(detail.timeLabel);

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
            resolveStatusBadgeClass(detail.status),
          )}
        >
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              resolveStatusDotClass(detail.status),
            )}
            aria-hidden
          />
          {detail.statusLabel}
        </span>

        {detail.isExpress ? (
          <span className="rounded-full bg-cta/12 px-2.5 py-1 text-[11px] font-semibold text-cta">
            {PLANNER_COPY.quickNoteBadge}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-primary/15 bg-mint/10 px-3 py-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/10">
          <CalendarDays className="size-4" strokeWidth={1.75} aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-foreground">
            {detail.dateLabel}
          </p>
        </div>

        <p className="flex shrink-0 items-baseline gap-1 tabular-nums">
          <span className="text-sm font-semibold leading-none text-primary">
            {time}
          </span>
          {period ? (
            <span className="text-[10px] font-semibold tracking-wide text-primary/70">
              {period}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
