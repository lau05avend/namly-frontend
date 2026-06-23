"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CREATE_RECIPE_DEFAULTS,
  createRecipeFormSchema,
  type CreateRecipeFormValues,
} from "@/features/recipes/schemas/create-recipe.schema";

export function useCreateRecipeForm(
  defaults: CreateRecipeFormValues = CREATE_RECIPE_DEFAULTS,
) {
  return useForm<CreateRecipeFormValues>({
    resolver: zodResolver(createRecipeFormSchema),
    defaultValues: defaults,
    mode: "onSubmit",
  });
}
