"use client";

import type { PlanReminderFormValue } from "@/features/planner/schemas/plan-meal.schema";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { cn } from "@/lib/utils";

type ReminderRowProps = {
  reminder: PlanReminderFormValue;
  onLabelChange: (value: string) => void;
  onToggleEnabled: (enabled: boolean) => void;
  onRemove: () => void;
};

export function ReminderRow({
  reminder,
  onLabelChange,
  onToggleEnabled,
  onRemove,
}: ReminderRowProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        value={reminder.label}
        onChange={(event) => onLabelChange(event.target.value)}
        placeholder={PLAN_MEAL_COPY.reminders.placeholder}
        className="h-11 min-w-0 flex-1 rounded-2xl border border-foreground/8 bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
      />
      <button
        type="button"
        role="switch"
        aria-checked={reminder.enabled}
        onClick={() => onToggleEnabled(!reminder.enabled)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors",
          reminder.enabled ? "bg-primary" : "bg-foreground/15",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform",
            reminder.enabled ? "left-5" : "left-0.5",
          )}
        />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs font-medium text-foreground/40"
        aria-label="Quitar recordatorio"
      >
        ×
      </button>
    </div>
  );
}
