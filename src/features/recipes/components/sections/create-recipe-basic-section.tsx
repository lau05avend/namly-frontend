"use client";

import { useFormContext } from "react-hook-form";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";

export function CreateRecipeBasicSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeFormValues>();
  const copy = RECIPES_COPY.create.fields;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <input
          {...register("title")}
          placeholder={copy.titlePlaceholder}
          aria-invalid={Boolean(errors.title)}
          className="w-full bg-transparent text-2xl font-semibold leading-tight text-foreground placeholder:text-foreground/30 focus-visible:outline-none"
        />
        {errors.title?.message ? (
          <p className="text-xs text-cta">{errors.title.message}</p>
        ) : null}
      </div>

      <textarea
        {...register("description")}
        placeholder={copy.descriptionPlaceholder}
        rows={2}
        className="w-full resize-none bg-transparent text-base leading-relaxed text-foreground/75 placeholder:text-foreground/35 focus-visible:outline-none"
      />
    </div>
  );
}
