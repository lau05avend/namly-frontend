"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RecipeTagPicker } from "@/features/recipes/components/recipe-tag-picker";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { useRecipeTags } from "@/features/tags/queries/use-recipe-tags";

export function CreateRecipeTagsSection() {
  const { control } = useFormContext<CreateRecipeFormValues>();
  const {
    data: availableTags = [],
    isPending,
    isError,
  } = useRecipeTags(true);

  return (
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
  );
}
