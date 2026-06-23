import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import type { PlannerDayPeriod } from "@/features/planner/utils/resolve-planner-day-period";
import { CalendarDays, CalendarPlus, UtensilsCrossed } from "lucide-react";

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

  return (
    <ModuleEmptyState
      module="planner"
      icon={periodIcon[period]}
      title={copy.title}
      description={copy.subtitle}
    />
  );
}
