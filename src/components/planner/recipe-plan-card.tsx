"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PlanRecipeFormValue } from "@/features/planner/schemas/plan-meal.schema";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { RecipeCoverThumb } from "@/features/recipes/components/recipe-cover-thumb";
import { cn } from "@/lib/utils";
import { GripVertical, X } from "lucide-react";

const SORTABLE_TRANSITION = "transform 520ms cubic-bezier(0.22, 0.03, 0.26, 1)";

type RecipePlanListItemProps = {
  sortableId: string;
  recipe: PlanRecipeFormValue;
  isFirst?: boolean;
  isLast?: boolean;
  onRemove: () => void;
};

export function RecipePlanCard({
  sortableId,
  recipe,
  isFirst = false,
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

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? undefined : (transition ?? SORTABLE_TRANSITION),
      }}
      className={cn(
        "relative flex cursor-grab touch-none items-center gap-2.5 border-b border-foreground/6 bg-card px-2.5 py-2.5 active:cursor-grabbing last:border-b-0",
        isDragging && "z-50 shadow-[0_10px_28px_-10px_rgba(30,45,34,0.14)]",
        isFirst && isLast && "rounded-2xl border-b-0",
        isFirst && !isLast && "rounded-t-2xl",
        isLast && !isFirst && "rounded-b-2xl border-b-0",
      )}
      {...attributes}
      {...listeners}
    >
      <GripVertical
        className="size-4 shrink-0 text-foreground/25"
        aria-hidden
      />

      <RecipeCoverThumb coverUrl={recipe.coverUrl} />

      <div className="min-w-0 flex-1 select-none">
        <p className="line-clamp-2 text-sm font-medium text-foreground">
          {recipe.title}
        </p>
        {recipe.subtitle ? (
          <p className="line-clamp-1 text-xs text-foreground/50">
            {recipe.subtitle}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={onRemove}
        aria-label={PLAN_MEAL_COPY.recipes.remove}
        className="shrink-0 cursor-pointer rounded-md p-1 text-foreground/35 transition-colors hover:text-cta"
      >
        <X className="size-4" aria-hidden />
      </button>
    </li>
  );
}
