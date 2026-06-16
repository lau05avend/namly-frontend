import { CalendarDays, CalendarPlus, UtensilsCrossed } from "lucide-react";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import type { PlannerDayPeriod } from "@/features/planner/utils/resolve-planner-day-period";

type PlannerDayEmptyProps = {
  period: PlannerDayPeriod;
};

const periodIcon = {
  today: UtensilsCrossed,
  future: CalendarPlus,
  past: CalendarDays,
} as const;

export function PlannerDayEmpty({ period }: PlannerDayEmptyProps) {
  const copy = PLANNER_COPY.emptyDay[period];
  const Icon = periodIcon[period];

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-foreground/5 text-foreground/35">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium leading-relaxed text-foreground/60">
          {copy.title}
        </p>
        <p className="max-w-xs text-sm leading-relaxed text-foreground/42">
          {copy.subtitle}
        </p>
      </div>
    </div>
  );
}
