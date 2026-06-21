"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import {
  RecipeCover,
  RecipeRatingStars,
} from "@/features/recipes/components/recipe-card-visuals";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeListItem } from "@/features/recipes/types/recipe.types";
import { ArrowLeft } from "lucide-react";

type RecipeDetailScreenProps = {
  recipeId: string;
};

function findRecipeInCache(
  queryClient: ReturnType<typeof useQueryClient>,
  recipeId: string,
): RecipeListItem | null {
  const queries = queryClient.getQueriesData<RecipeListItem[]>({
    queryKey: recipeQueryKeys.all,
  });

  for (const [, data] of queries) {
    const match = data?.find((recipe) => recipe.id === recipeId);
    if (match) {
      return match;
    }
  }

  return null;
}

export function RecipeDetailScreen({ recipeId }: RecipeDetailScreenProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const recipe = useMemo(
    () => findRecipeInCache(queryClient, recipeId),
    [queryClient, recipeId],
  );

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-lg px-4 py-3">
          <header className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => router.back()}
              aria-label={RECIPES_COPY.recipeDetail.back}
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50 hover:text-primary"
            >
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            </button>
            <h1 className="min-w-0 truncate text-lg font-bold text-foreground">
              {recipe?.title ?? RECIPES_COPY.views.recipes}
            </h1>
          </header>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-lg flex-col gap-4 px-4 pt-[calc(env(safe-area-inset-top)+4.25rem)]">
        {recipe ? (
          <>
            <div className="overflow-hidden rounded-2xl border border-foreground/8 bg-card">
              <RecipeCover
                coverUrl={recipe.coverUrl}
                aspectClassName="aspect-[4/3]"
              />
              <div className="flex flex-col gap-2 px-4 py-4">
                <h2 className="text-xl font-bold text-foreground">
                  {recipe.title}
                </h2>
                {recipe.rating != null ? (
                  <RecipeRatingStars rating={recipe.rating} />
                ) : null}
                <p className="text-sm text-foreground/50">
                  {RECIPES_COPY.recipeDetail.comingSoon}
                </p>
              </div>
            </div>
          </>
        ) : (
          <ModuleEmptyState
            module="recipes"
            title={RECIPES_COPY.recipeDetail.notFound}
          >
            <Link
              href="/recipes"
              className="text-sm font-semibold text-primary"
            >
              {RECIPES_COPY.recipeDetail.back}
            </Link>
          </ModuleEmptyState>
        )}
      </main>

      <BottomNav activeId="recipes" />
    </div>
  );
}
