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
  isFirst?: boolean;
  isLast?: boolean;
  onOpenUnitPicker: () => void;
  onRemove: () => void;
};

export function RecipeIngredientRow({
  index,
  unitId,
  units,
  isFirst = false,
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
        "border-b border-foreground/6 px-3 py-2.5 last:border-b-0",
        isFirst && isLast && "rounded-2xl border-b-0",
        isFirst && !isLast && "rounded-t-2xl",
        isLast && !isFirst && "rounded-b-2xl border-b-0",
      )}
    >
      <div className="flex items-center gap-2">
        <input
          {...register(`ingredients.${index}.name`)}
          placeholder={copy.namePlaceholder}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-foreground/40 focus-visible:outline-none"
        />

        <input
          {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          placeholder={copy.quantityPlaceholder}
          className="w-14 shrink-0 bg-transparent text-right text-sm text-foreground/70 placeholder:text-foreground/35 focus-visible:outline-none"
        />

        <button
          type="button"
          onClick={onOpenUnitPicker}
          className="shrink-0 cursor-pointer rounded-full border border-foreground/10 bg-background px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-foreground/60 transition-colors hover:border-primary/25 hover:bg-mint/30 hover:text-primary"
        >
          {unit?.abbreviation ?? "—"}
        </button>

        <button
          type="button"
          onClick={onRemove}
          aria-label={copy.remove}
          className="shrink-0 cursor-pointer rounded-md p-1 text-foreground/35 transition-colors hover:text-cta"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>

      {nameError || quantityError ? (
        <p className="mt-1 text-xs text-cta">
          {nameError ?? quantityError}
        </p>
      ) : null}
    </li>
  );
}
