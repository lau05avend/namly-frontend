"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { cn } from "@/lib/utils";

export function CreateRecipePublicSection() {
  const { control } = useFormContext<CreateRecipeFormValues>();
  const copy = RECIPES_COPY.create.fields;

  return (
    <Controller
      name="isPublic"
      control={control}
      render={({ field }) => (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-foreground/75">{copy.publicLabel}</p>
            <p className="text-xs text-foreground/40">{copy.publicHint}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={field.value}
            onClick={() => field.onChange(!field.value)}
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-full transition-colors",
              field.value ? "bg-primary" : "bg-foreground/15",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform",
                field.value ? "left-5" : "left-0.5",
              )}
            />
          </button>
        </div>
      )}
    />
  );
}
