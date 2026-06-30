"use client";

import Link from "next/link";
import { EditRecipeScreen } from "@/features/recipes/components/edit-recipe-screen";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useRecipeEditForm } from "@/features/recipes/queries/use-recipe-edit-form";
import { buildRecipeDetailPath } from "@/lib/navigation/meal-routes";
import { toAppNavigationHref } from "@/lib/navigation/to-app-navigation-href";
import { useReturnToSearchParam } from "@/lib/navigation/use-return-to-search-param";

type EditRecipePageClientProps = {
  recipeId: string;
  returnTo?: string;
};

export function EditRecipePageClient({
  recipeId,
  returnTo,
}: EditRecipePageClientProps) {
  const { data: initialValues, isPending, isError } = useRecipeEditForm(recipeId);
  const copy = RECIPES_COPY.edit;
  const detailReturnPath = useReturnToSearchParam(returnTo);

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
          href={
            toAppNavigationHref(
              detailReturnPath ?? buildRecipeDetailPath(recipeId),
            ) ?? buildRecipeDetailPath(recipeId)
          }
          className="text-sm font-semibold text-primary"
        >
          {RECIPES_COPY.recipeDetail.back}
        </Link>
      </div>
    );
  }

  return (
    <EditRecipeScreen
      recipeId={recipeId}
      initialValues={initialValues}
      returnTo={returnTo}
    />
  );
}
