"use client";

import { MEAL_SLOTS, type MealSlot } from "@/constants/meal-slots";
import { MEAL_SLOT_LABELS } from "@/features/planner/constants/meal-slot-labels";
import { cn } from "@/lib/utils";

type MealTypeSelectorProps = {
  value: MealSlot;
  onChange: (slot: MealSlot) => void;
};

export function MealTypeSelector({ value, onChange }: MealTypeSelectorProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Tipo de comida"
    >
      {MEAL_SLOTS.map((slot) => {
        const selected = value === slot;

        return (
          <button
            key={slot}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(slot)}
            className={cn(
              "rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
              selected
                ? "bg-primary text-white shadow-sm"
                : "bg-mint/50 text-foreground/70 hover:bg-mint",
            )}
          >
            {MEAL_SLOT_LABELS[slot]}
          </button>
        );
      })}
    </div>
  );
}
