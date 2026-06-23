"use client";

import Link from "next/link";
import { EditRecipeScreen } from "@/features/recipes/components/edit-recipe-screen";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useRecipeEditForm } from "@/features/recipes/queries/use-recipe-edit-form";

type EditRecipePageClientProps = {
  recipeId: string;
};

export function EditRecipePageClient({ recipeId }: EditRecipePageClientProps) {
  const { data: initialValues, isPending, isError } = useRecipeEditForm(recipeId);
  const copy = RECIPES_COPY.edit;

  if (isPending) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-lg items-center justify-center px-4">
        <p className="text-sm text-foreground/50">{RECIPES_COPY.recipeDetail.loading}</p>
      </div>
    );
  }

  if (isError || !initialValues) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-foreground/60">{copy.loadError}</p>
        <Link
          href={`/recipes/${recipeId}`}
          className="text-sm font-semibold text-primary"
        >
          {RECIPES_COPY.recipeDetail.back}
        </Link>
      </div>
    );
  }

  return (
    <EditRecipeScreen recipeId={recipeId} initialValues={initialValues} />
  );
}
