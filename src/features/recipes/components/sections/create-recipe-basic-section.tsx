"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { cn } from "@/lib/utils";

export function CreateRecipeBasicSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateRecipeFormValues>();
  const copy = RECIPES_COPY.create;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Input
          {...register("title")}
          placeholder={copy.fields.titlePlaceholder}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title?.message ? (
          <p className="px-2 text-xs text-cta">{errors.title.message}</p>
        ) : null}
      </div>

      <textarea
        {...register("description")}
        placeholder={copy.fields.descriptionPlaceholder}
        rows={3}
        className="w-full resize-none rounded-3xl border border-foreground/10 bg-card px-5 py-4 text-base text-foreground placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      <Controller
        name="isPublic"
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-foreground/8 bg-card px-4 py-3.5">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {copy.fields.publicLabel}
              </p>
              <p className="text-xs text-foreground/45">
                {copy.fields.publicHint}
              </p>
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
    </div>
  );
}
