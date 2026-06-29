"use client";

import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanEntryMode } from "@/features/planner/schemas/plan-meal.schema";
import { cn } from "@/lib/utils";
import { Check, NotebookPen, UtensilsCrossed } from "lucide-react";

type EntryModeSelectorProps = {
  value: PlanEntryMode;
  onChange: (mode: PlanEntryMode) => void;
};

const MODES: {
  id: PlanEntryMode;
  label: string;
  hint: string;
  icon: typeof UtensilsCrossed;
}[] = [
  {
    id: "recipe",
    label: PLAN_MEAL_COPY.modes.recipe,
    hint: PLAN_MEAL_COPY.modes.recipeHint,
    icon: UtensilsCrossed,
  },
  {
    id: "express",
    label: PLAN_MEAL_COPY.modes.express,
    hint: PLAN_MEAL_COPY.modes.expressHint,
    icon: NotebookPen,
  },
];

export function EntryModeSelector({ value, onChange }: EntryModeSelectorProps) {
  return (
    <div
      className="grid grid-cols-2 gap-2"
      role="radiogroup"
      aria-label={PLAN_MEAL_COPY.sections.entryMode}
    >
      {MODES.map((mode) => {
        const selected = value === mode.id;
        const Icon = mode.icon;

        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(mode.id)}
            className={cn(
              "relative flex min-w-0 cursor-pointer flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-colors",
              selected
                ? "border-primary/30 bg-mint/35"
                : "border-foreground/8 bg-card hover:bg-mint/15",
            )}
          >
            {selected ? (
              <Check
                className="absolute top-3 right-3 size-4 text-primary"
                aria-hidden
              />
            ) : null}

            <Icon className="size-4 shrink-0 text-primary" aria-hidden />

            <span className="pr-4 text-sm font-semibold leading-snug text-foreground">
              {mode.label}
            </span>

            <span className="text-xs leading-snug text-foreground/50">
              {mode.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
