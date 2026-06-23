"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RECIPE_PUBLIC_THEME } from "@/features/recipes/constants/recipe-filters";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export function CreateRecipePublicSection() {
  const { control } = useFormContext<CreateRecipeFormValues>();
  const copy = RECIPES_COPY.create.fields;
  const theme = RECIPE_PUBLIC_THEME;

  return (
    <Controller
      name="isPublic"
      control={control}
      render={({ field }) => (
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border px-2.5 py-2.5 transition-colors",
            field.value ? theme.surfaceActive : theme.surface,
          )}
        >
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full",
              theme.iconBg,
            )}
          >
            <Globe className={cn("size-3.5", theme.icon)} aria-hidden />
          </span>

          <div className="min-w-0 flex-1">
            <p className={cn("text-[13px] leading-tight", theme.label)}>
              {copy.publicLabel}
            </p>
            <p className={cn("mt-0.5 text-[11px] leading-snug", theme.hint)}>
              {copy.publicHint}
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={field.value}
            onClick={() => field.onChange(!field.value)}
            className={cn(
              "relative h-6 w-10 shrink-0 rounded-full transition-colors",
              field.value ? theme.switchOn : "bg-foreground/12",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform",
                field.value ? "left-4.5" : "left-0.5",
              )}
            />
          </button>
        </div>
      )}
    />
  );
}
