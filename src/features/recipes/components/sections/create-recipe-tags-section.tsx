"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RecipeTagPicker } from "@/features/recipes/components/recipe-tag-picker";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { useRecipeTags } from "@/features/tags/queries/use-recipe-tags";

export function CreateRecipeTagsSection() {
  const copy = RECIPES_COPY.create;
  const { control } = useFormContext<CreateRecipeFormValues>();
  const {
    data: availableTags = [],
    isPending,
    isError,
  } = useRecipeTags(true);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-foreground/80">
          {copy.sections.classification}
        </h2>
        <p className="text-xs text-foreground/40">{copy.tags.classificationHint}</p>
      </div>

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <RecipeTagPicker
            availableTags={availableTags}
            selectedTags={field.value}
            onChange={field.onChange}
            isLoading={isPending}
            isError={isError}
          />
        )}
      />
    </section>
  );
}
