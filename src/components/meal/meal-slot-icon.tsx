import type { MealSlot } from "@/constants/meal-slots";
import { MEAL_SLOT_LABELS } from "@/features/planner/constants/meal-slot-labels";
import { cn } from "@/lib/utils";
import { Coffee, Cookie, Moon, Sun, type LucideIcon } from "lucide-react";

const SLOT_ICONS: Record<MealSlot, LucideIcon> = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: Cookie,
};

type MealSlotIconProps = {
  slot: MealSlot;
  className?: string;
  showLabel?: boolean;
};

export function MealSlotIcon({
  slot,
  className,
  showLabel = false,
}: MealSlotIconProps) {
  const Icon = SLOT_ICONS[slot];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-mint/70 text-primary">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      {showLabel ? (
        <span className="text-xs font-medium text-foreground/55">
          {MEAL_SLOT_LABELS[slot]}
        </span>
      ) : null}
    </div>
  );
}
