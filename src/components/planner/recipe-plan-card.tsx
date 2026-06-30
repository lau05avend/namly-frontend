"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PlanRecipeFormValue } from "@/features/planner/schemas/plan-meal.schema";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { RecipeCoverThumb } from "@/features/recipes/components/recipe-cover-thumb";
import {
  formatRecipeDuration,
  formatRecipeDurationAriaLabel,
} from "@/features/recipes/utils/format-recipe-duration";
import { cn } from "@/lib/utils";
import { Clock, GripVertical, X } from "lucide-react";

const SORTABLE_TRANSITION = "transform 520ms cubic-bezier(0.22, 0.03, 0.26, 1)";

type RecipePlanListItemProps = {
  sortableId: string;
  recipe: PlanRecipeFormValue;
  isLast?: boolean;
  onRemove: () => void;
};

export function RecipePlanCard({
  sortableId,
  recipe,
  isLast = false,
  onRemove,
}: RecipePlanListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: sortableId,
    transition: {
      duration: 480,
      easing: "cubic-bezier(0.22, 0.03, 0.26, 1)",
    },
  });

  const durationLabel = formatRecipeDuration(recipe.durationMinutes);
  const durationAriaLabel = formatRecipeDurationAriaLabel(recipe.durationMinutes);
  const showsDurationMetadata = recipe.durationMinutes !== undefined;

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? undefined : (transition ?? SORTABLE_TRANSITION),
      }}
      className={cn(
        "group relative flex items-center gap-2.5 py-3.5",
        !isLast && "border-b border-foreground/[0.05]",
        isDragging &&
          "z-50 rounded-2xl border-b-0 bg-card px-2 shadow-[0_10px_28px_-10px_rgba(30,45,34,0.12)]",
      )}
    >
      <button
        type="button"
        aria-label={PLAN_MEAL_COPY.recipes.reorder}
        className="-ml-0.5 flex shrink-0 cursor-grab touch-none items-center self-stretch px-0.5 text-foreground/20 transition-colors active:cursor-grabbing group-hover:text-foreground/30"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-3.5" strokeWidth={2} aria-hidden />
      </button>

      <RecipeCoverThumb
        coverUrl={recipe.coverUrl}
        className="size-14 rounded-[13px] border-foreground/[0.06]"
      />

      <div className="min-w-0 flex-1 select-none py-0.5">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {recipe.title}
        </p>
        {recipe.subtitle ? (
          <p className="mt-1 line-clamp-1 text-xs leading-snug text-foreground/45">
            {recipe.subtitle}
          </p>
        ) : null}
        {showsDurationMetadata ? (
          durationLabel && durationAriaLabel ? (
            <p
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-foreground/45"
              aria-label={durationAriaLabel}
            >
              <Clock className="size-3 shrink-0" aria-hidden />
              <span className="tabular-nums">{durationLabel}</span>
            </p>
          ) : (
            <p className="mt-1 text-xs text-foreground/35">
              {PLAN_MEAL_COPY.recipes.noDuration}
            </p>
          )
        ) : null}
      </div>

      <button
        type="button"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onRemove}
        aria-label={PLAN_MEAL_COPY.recipes.remove}
        className="shrink-0 cursor-pointer rounded-full p-1.5 text-foreground/30 transition-colors hover:text-foreground/50 active:text-destructive"
      >
        <X className="size-3.5" strokeWidth={2.25} aria-hidden />
      </button>
    </li>
  );
}
