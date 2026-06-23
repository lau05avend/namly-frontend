"use client";

import { useFormContext } from "react-hook-form";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import type { MeasurementUnit } from "@/features/recipes/types/measurement-unit.types";
import { resolveMeasurementUnitById } from "@/features/recipes/utils/resolve-default-measurement-unit";
import { cn } from "@/lib/utils";
import { GripVertical, X } from "lucide-react";

const SORTABLE_TRANSITION = "transform 520ms cubic-bezier(0.22, 0.03, 0.26, 1)";

type RecipeIngredientRowProps = {
  sortableId: string;
  index: number;
  units: MeasurementUnit[];
  isLast?: boolean;
  onOpenUnitPicker: () => void;
  onRemove: () => void;
};

export function RecipeIngredientRow({
  sortableId,
  index,
  units,
  isLast = false,
  onOpenUnitPicker,
  onRemove,
}: RecipeIngredientRowProps) {
  const copy = RECIPES_COPY.create.ingredients;
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateRecipeFormValues>();
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

  const unitId = watch(`ingredients.${index}.unitId`);
  const unit = resolveMeasurementUnitById(units, unitId);
  const nameError = errors.ingredients?.[index]?.name?.message;
  const quantityError = errors.ingredients?.[index]?.quantity?.message;

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
      <div className="flex items-center gap-2">
        <input
          {...register(`ingredients.${index}.name`)}
          placeholder={copy.namePlaceholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-foreground placeholder:text-foreground/35 focus-visible:outline-none"
        />

        <input
          {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          placeholder={copy.quantityPlaceholder}
          className="w-11 shrink-0 bg-transparent text-right text-xs text-foreground/50 placeholder:text-foreground/30 focus-visible:outline-none"
        />

        <span className="shrink-0 text-xs text-foreground/25" aria-hidden>
          ·
        </span>

        <input type="hidden" {...register(`ingredients.${index}.fieldKey`)} />
        <input type="hidden" {...register(`ingredients.${index}.unitId`)} />

        <button
          type="button"
          onClick={onOpenUnitPicker}
          className="shrink-0 cursor-pointer text-xs font-medium text-foreground/45 transition-colors hover:text-primary"
        >
          {unit?.abbreviation ?? copy.unitFallback}
        </button>

        <div className="flex shrink-0 items-center gap-0.5">
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

      {nameError || quantityError ? (
        <p className="mt-1 text-xs text-cta">{nameError ?? quantityError}</p>
      ) : null}
    </li>
  );
}
