"use client";

import type { PlanRecipeFormValue } from "@/features/planner/schemas/plan-meal.schema";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { SurfaceCard } from "@/components/ui/surface-card";
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";

type RecipePlanCardProps = {
  recipe: PlanRecipeFormValue;
  index: number;
  total: number;
  onTitleChange: (value: string) => void;
  onSubtitleChange: (value: string) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function RecipePlanCard({
  recipe,
  index,
  total,
  onTitleChange,
  onSubtitleChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: RecipePlanCardProps) {
  return (
    <SurfaceCard className="flex flex-row items-start gap-2 p-3">
      <GripVertical
        className="mt-2 size-4 shrink-0 text-foreground/25"
        aria-hidden
      />

      <span
        className="mt-1.5 flex size-12 shrink-0 items-center justify-center rounded-xl bg-mint/60 text-xs font-semibold text-primary"
        aria-hidden
      >
        {index + 1}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <input
          value={recipe.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder={PLAN_MEAL_COPY.recipes.titlePlaceholder}
          className="w-full bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-foreground/35"
        />
        <input
          value={recipe.subtitle ?? ""}
          onChange={(event) => onSubtitleChange(event.target.value)}
          placeholder={PLAN_MEAL_COPY.recipes.subtitlePlaceholder}
          className="w-full bg-transparent text-xs text-foreground/60 outline-none placeholder:text-foreground/35"
        />
      </div>

      <div className="flex shrink-0 flex-col gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={index === 0}
          aria-label={PLAN_MEAL_COPY.recipes.moveUp}
          className="rounded-lg p-1 text-foreground/40 disabled:opacity-30"
        >
          <ChevronUp className="size-4" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={index === total - 1}
          aria-label={PLAN_MEAL_COPY.recipes.moveDown}
          className="rounded-lg p-1 text-foreground/40 disabled:opacity-30"
        >
          <ChevronDown className="size-4" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={PLAN_MEAL_COPY.recipes.remove}
          className="rounded-lg p-1 text-foreground/40 hover:text-cta"
        >
          <X className="size-4" />
        </button>
      </div>
    </SurfaceCard>
  );
}
