import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { formatReminderOffsetLabel } from "@/features/planner/utils/plan-reminder-label.utils";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type PlanReminderRowProps = {
  offsetMinutes: number;
  onRemove: () => void;
  className?: string;
};

export function PlanReminderRow({
  offsetMinutes,
  onRemove,
  className,
}: PlanReminderRowProps) {
  const label = formatReminderOffsetLabel(offsetMinutes);

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Clock
        className="size-3.5 shrink-0 text-foreground/40"
        strokeWidth={2}
        aria-hidden
      />

      <p className="min-w-0 flex-1 text-sm font-medium text-foreground/75">
        {label}
      </p>

      <button
        type="button"
        onClick={onRemove}
        className="flex size-6 shrink-0 items-center justify-center text-base leading-none text-foreground/30 transition-colors hover:text-foreground/50"
        aria-label={PLAN_MEAL_COPY.reminders.removeAriaLabel}
      >
        ×
      </button>
    </div>
  );
}
