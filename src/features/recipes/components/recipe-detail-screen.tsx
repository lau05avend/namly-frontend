"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { RecipeDetailBodyTabs } from "@/features/recipes/components/detail/recipe-detail-body-tabs";
import { RecipeDetailDeleteSheet } from "@/features/recipes/components/detail/recipe-detail-delete-sheet";
import {
  RECIPE_DETAIL_CONTENT_OFFSET_CLASS,
  RecipeDetailHeader,
} from "@/features/recipes/components/detail/recipe-detail-header";
import { RecipeDetailHero } from "@/features/recipes/components/detail/recipe-detail-hero";
import { RecipeDetailSkeleton } from "@/features/recipes/components/detail/recipe-detail-skeleton";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useDeleteRecipe } from "@/features/recipes/queries/use-delete-recipe";
import { useRecipeDetail } from "@/features/recipes/queries/use-recipe-detail";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { useReturnToSearchParam } from "@/lib/navigation/use-return-to-search-param";
import {
  buildRecipeDetailPath,
  buildRecipeEditPath,
} from "@/lib/navigation/meal-routes";

type RecipeDetailScreenProps = {
  recipeId: string;
  returnTo?: string;
};

export function RecipeDetailScreen({
  recipeId,
  returnTo,
}: RecipeDetailScreenProps) {
  const router = useRouter();
  const safeReturnTo = useReturnToSearchParam(returnTo);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteRecipe();
  const {
    data: page,
    isPending,
    isError,
    refetch,
  } = useRecipeDetail(recipeId);
  const copy = RECIPES_COPY.recipeDetail;

  const recipe = page?.recipe;
  const interactions = page?.interactions;

  const handleEdit = useCallback(() => {
    router.push(
      buildRecipeEditPath(
        recipeId,
        buildRecipeDetailPath(recipeId, safeReturnTo),
      ),
    );
  }, [recipeId, router, safeReturnTo]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteMutation.mutateAsync(recipeId);
      setIsDeleteOpen(false);
      toast.success(copy.deleteRecipeSuccess);
      router.replace("/recipes");
    } catch (error) {
      toast.error(
        getUserFacingErrorMessage(error, copy.deleteRecipeError),
      );
    }
  }, [copy.deleteRecipeError, copy.deleteRecipeSuccess, deleteMutation, recipeId, router]);

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <RecipeDetailDeleteSheet
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
      />

      <RecipeDetailHeader
        returnTo={safeReturnTo}
        onEdit={recipe?.canEdit ? handleEdit : undefined}
        onDelete={
          recipe?.canDelete ? () => setIsDeleteOpen(true) : undefined
        }
      />

      <main
        className={`mx-auto w-full max-w-lg px-4 pb-8 ${RECIPE_DETAIL_CONTENT_OFFSET_CLASS}`}
      >
        {isPending ? <RecipeDetailSkeleton /> : null}

        {isError ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <p className="text-sm text-foreground/60">{copy.loadError}</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="cursor-pointer text-sm font-semibold text-primary underline-offset-2 hover:underline"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : null}

        {recipe && !isPending ? (
          <div className="flex flex-col gap-6">
            <RecipeDetailHero
              recipe={recipe}
              recipeId={recipe.id}
              isFavorite={interactions?.isFavorite ?? false}
            />

            <RecipeDetailBodyTabs
              recipe={recipe}
              interactions={interactions ?? null}
            />
          </div>
        ) : null}

        {!isPending && !isError && !recipe ? (
          <div className="flex flex-col gap-6">
            <ModuleEmptyState module="recipes" title={copy.notFound}>
              <Link href="/recipes" className="text-sm font-semibold text-primary">
                {copy.back}
              </Link>
            </ModuleEmptyState>
          </div>
        ) : null}
      </main>

      <BottomNav activeId="recipes" />
    </div>
  );
}
