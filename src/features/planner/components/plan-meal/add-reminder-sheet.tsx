"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { PLAN_REMINDER_PRESET_OFFSETS } from "@/features/planner/constants/plan-reminder-presets";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { formatReminderOffsetLabel } from "@/features/planner/utils/plan-reminder-label.utils";
import { cn } from "@/lib/utils";

type AddReminderSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOffsets: number[];
  onSelect: (offsetMinutes: number) => void;
};

export function AddReminderSheet({
  open,
  onOpenChange,
  selectedOffsets,
  onSelect,
}: AddReminderSheetProps) {
  const selectedSet = new Set(selectedOffsets);
  const availableOffsets = PLAN_REMINDER_PRESET_OFFSETS.filter(
    (offset) => !selectedSet.has(offset),
  );

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={PLAN_MEAL_COPY.reminders.sheetTitle}
      compact
      scrollableContent={false}
    >
      <ul className="flex flex-col gap-1 pb-2">
        {availableOffsets.map((offsetMinutes) => (
          <li key={offsetMinutes}>
            <button
              type="button"
              onClick={() => {
                onSelect(offsetMinutes);
                onOpenChange(false);
              }}
              className={cn(
                "flex w-full cursor-pointer items-center rounded-2xl px-3 py-3.5 text-left text-sm font-medium text-foreground/80 transition-colors",
                "hover:bg-foreground/[0.04] active:bg-foreground/[0.06]",
              )}
            >
              {formatReminderOffsetLabel(offsetMinutes)}
            </button>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}
