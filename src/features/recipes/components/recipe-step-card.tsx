"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CreateRecipeStepFormValue } from "@/features/recipes/schemas/create-recipe.schema";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { cn } from "@/lib/utils";
import { Clock, GripVertical, X } from "lucide-react";

const SORTABLE_TRANSITION = "transform 520ms cubic-bezier(0.22, 0.03, 0.26, 1)";

type RecipeStepCardProps = {
  sortableId: string;
  stepNumber: number;
  step: CreateRecipeStepFormValue;
  isFirst?: boolean;
  isLast?: boolean;
  onDescriptionChange: (value: string) => void;
  onDurationChange: (value: number | null) => void;
  onRemove: () => void;
};

export function RecipeStepCard({
  sortableId,
  stepNumber,
  step,
  isFirst = false,
  isLast = false,
  onDescriptionChange,
  onDurationChange,
  onRemove,
}: RecipeStepCardProps) {
  const copy = RECIPES_COPY.create.steps;
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
        "relative flex cursor-grab touch-none gap-3 border border-foreground/8 bg-card p-3 active:cursor-grabbing",
        isDragging && "z-50 shadow-[0_10px_28px_-10px_rgba(30,45,34,0.14)]",
        isFirst && isLast && "rounded-2xl",
        isFirst && !isLast && "rounded-t-2xl border-b-0",
        isLast && !isFirst && "rounded-b-2xl",
        !isFirst && !isLast && "border-b-0",
      )}
      {...attributes}
      {...listeners}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mint/70 text-sm font-bold text-primary">
        {stepNumber}
      </span>

      <div className="min-w-0 flex-1 select-none">
        <textarea
          value={step.description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          onPointerDown={(event) => event.stopPropagation()}
          placeholder={copy.descriptionPlaceholder}
          rows={3}
          className="w-full resize-none bg-transparent text-sm leading-relaxed text-foreground placeholder:text-foreground/40 focus-visible:outline-none"
        />

        <div
          className="mt-2 flex items-center gap-2"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <Clock className="size-3.5 text-foreground/35" aria-hidden />
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={step.durationMinutes ?? ""}
            onChange={(event) => {
              const raw = event.target.value;
              onDurationChange(raw === "" ? null : Number(raw));
            }}
            placeholder={copy.durationPlaceholder}
            className="h-8 w-16 rounded-full border border-foreground/10 bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          />
          <span className="text-xs text-foreground/40">{copy.durationLabel}</span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-1">
        <GripVertical
          className="size-4 text-foreground/25"
          aria-hidden
        />
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onRemove}
          aria-label={copy.remove}
          className="cursor-pointer rounded-md p-1 text-foreground/35 transition-colors hover:text-cta"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </li>
  );
}
