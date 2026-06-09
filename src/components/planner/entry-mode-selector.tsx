"use client";

import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanEntryMode } from "@/features/planner/schemas/plan-meal.schema";
import { cn } from "@/lib/utils";
import { NotebookPen, UtensilsCrossed } from "lucide-react";

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
      aria-label="Tipo de entrada"
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
              "flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-colors",
              selected
                ? "border-primary/30 bg-mint/40"
                : "border-foreground/8 bg-card hover:bg-mint/20",
            )}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full border-2",
                selected ? "border-primary bg-primary" : "border-foreground/20",
              )}
            >
              {selected ? (
                <span className="size-2 rounded-full bg-white" aria-hidden />
              ) : null}
            </span>
            <Icon className="size-4 text-primary" aria-hidden />
            <span className="text-sm font-semibold text-foreground">
              {mode.label}
            </span>
            <span className="text-xs text-foreground/50">{mode.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
