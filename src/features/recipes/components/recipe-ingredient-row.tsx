"use client";

import { useFormContext } from "react-hook-form";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import type { MeasurementUnit } from "@/features/recipes/types/measurement-unit.types";
import { resolveMeasurementUnitById } from "@/features/recipes/utils/resolve-default-measurement-unit";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type RecipeIngredientRowProps = {
  index: number;
  unitId: string;
  units: MeasurementUnit[];
  isLast?: boolean;
  onOpenUnitPicker: () => void;
  onRemove: () => void;
};

export function RecipeIngredientRow({
  index,
  unitId,
  units,
  isLast = false,
  onOpenUnitPicker,
  onRemove,
}: RecipeIngredientRowProps) {
  const copy = RECIPES_COPY.create.ingredients;
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeFormValues>();

  const unit = resolveMeasurementUnitById(units, unitId);
  const nameError = errors.ingredients?.[index]?.name?.message;
  const quantityError = errors.ingredients?.[index]?.quantity?.message;

  return (
    <li
      className={cn(
        "py-2.5",
        !isLast && "border-b border-foreground/6",
      )}
    >
      <div className="flex items-center gap-2">
        <input
          {...register(`ingredients.${index}.name`)}
          placeholder={copy.namePlaceholder}
          className="min-w-0 flex-1 bg-transparent text-base font-medium text-foreground placeholder:text-foreground/35 focus-visible:outline-none"
        />

        <input
          {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          placeholder={copy.quantityPlaceholder}
          className="w-9 shrink-0 bg-transparent text-right text-xs text-foreground/50 placeholder:text-foreground/30 focus-visible:outline-none"
        />

        <span className="shrink-0 text-xs text-foreground/25" aria-hidden>
          ·
        </span>

        <button
          type="button"
          onClick={onOpenUnitPicker}
          className="shrink-0 cursor-pointer text-xs font-medium text-foreground/45 transition-colors hover:text-primary"
        >
          {unit?.abbreviation ?? copy.unitFallback}
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label={copy.remove}
          className="shrink-0 cursor-pointer rounded-md p-1 text-foreground/25 transition-colors hover:text-cta"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>

      {nameError || quantityError ? (
        <p className="mt-1 text-xs text-cta">{nameError ?? quantityError}</p>
      ) : null}
    </li>
  );
}
