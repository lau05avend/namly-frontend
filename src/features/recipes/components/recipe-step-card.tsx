"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { cn } from "@/lib/utils";
import { GripVertical, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

const SORTABLE_TRANSITION = "transform 520ms cubic-bezier(0.22, 0.03, 0.26, 1)";

type RecipeStepCardProps = {
  sortableId: string;
  index: number;
  stepNumber: number;
  isLast?: boolean;
  onRemove: () => void;
};

export function RecipeStepCard({
  sortableId,
  index,
  stepNumber,
  isLast = false,
  onRemove,
}: RecipeStepCardProps) {
  const copy = RECIPES_COPY.create.steps;
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeFormValues>();
  const durationField = register(`steps.${index}.durationMinutes`, {
    setValueAs: (value) => {
      if (value === "" || value == null) {
        return null;
      }

      const parsed = Number(value);
      return Number.isNaN(parsed) ? null : parsed;
    },
  });
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

  const descriptionError = errors.steps?.[index]?.description?.message;

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? undefined : (transition ?? SORTABLE_TRANSITION),
      }}
      className={cn(
        "py-2.5",
        !isLast && "border-b border-foreground/6",
        isDragging && "bg-mint/10",
      )}
      {...attributes}
    >
      <input type="hidden" {...register(`steps.${index}.fieldKey`)} />

      <div className="flex items-start gap-2">
        <span className="w-5 shrink-0 pt-0.5 text-sm font-medium tabular-nums text-primary/55">
          {stepNumber}.
        </span>

        <textarea
          {...register(`steps.${index}.description`)}
          placeholder={copy.descriptionPlaceholder}
          rows={2}
          className="min-w-0 flex-1 resize-none bg-transparent text-[14px] font-medium leading-relaxed text-foreground placeholder:text-foreground/35 focus-visible:outline-none"
        />

        <div className="flex shrink-0 items-baseline gap-px pt-0.5">
          <input
            {...durationField}
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            placeholder={copy.durationPlaceholder}
            onKeyDown={(event) => {
              if (["e", "E", "+", "-", "."].includes(event.key)) {
                event.preventDefault();
              }
            }}
            className="min-w-[2ch] max-w-[4ch] [field-sizing:content] shrink-0 bg-transparent p-0 text-sm font-medium tabular-nums text-primary/75 placeholder:text-foreground/30 focus-visible:outline-none [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="shrink-0 text-xs font-medium text-primary/55">
            {copy.durationLabel}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-0.5 pt-0.5">
          <button
            type="button"
            className="cursor-grab touch-none rounded-md p-1 text-foreground/20 active:cursor-grabbing"
            aria-label={copy.reorder}
            {...listeners}
          >
            <GripVertical className="size-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={copy.remove}
            className="cursor-pointer rounded-md p-1 text-foreground/25 transition-colors hover:text-cta"
          >
            <X className="size-3.5" aria-hidden />
          </button>
        </div>
      </div>

      {descriptionError ? (
        <p className="mt-1 pl-7 text-xs text-cta">{descriptionError}</p>
      ) : null}
    </li>
  );
}
