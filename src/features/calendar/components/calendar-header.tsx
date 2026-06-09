"use client";

import { formatMonthYear } from "@/features/calendar/utils/date";
import { cn } from "@/lib/utils";
import { CalendarDays, LayoutGrid } from "lucide-react";

type CalendarHeaderProps = {
  visibleMonth: Date;
  isExpanded: boolean;
  onToggleExpand: () => void;
  className?: string;
};

export function CalendarHeader({
  visibleMonth,
  isExpanded,
  onToggleExpand,
  className,
}: CalendarHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <h2 className="text-xl font-bold text-foreground">
        {formatMonthYear(visibleMonth)}
      </h2>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Ver semana" : "Ver mes"}
          className={cn(
            "flex size-10 items-center justify-center rounded-2xl bg-card text-foreground/60 transition-colors",
            isExpanded && "bg-mint text-primary",
          )}
        >
          <CalendarDays className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Vista de planificación"
          className="flex size-10 items-center justify-center rounded-2xl bg-card text-foreground/60"
        >
          <LayoutGrid className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
