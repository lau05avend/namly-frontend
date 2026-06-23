"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { RecipeDetailBodyTabs } from "@/features/recipes/components/detail/recipe-detail-body-tabs";
import { RecipeDetailHero } from "@/features/recipes/components/detail/recipe-detail-hero";
import { RecipeDetailSkeleton } from "@/features/recipes/components/detail/recipe-detail-skeleton";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useRecipeDetail } from "@/features/recipes/queries/use-recipe-detail";
import { SCREEN_LAYOUT } from "@/constants/screen-layout";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type RecipeDetailScreenProps = {
  recipeId: string;
};

export function RecipeDetailScreen({ recipeId }: RecipeDetailScreenProps) {
  const router = useRouter();
  const {
    data: page,
    isPending,
    isError,
    refetch,
  } = useRecipeDetail(recipeId);
  const copy = RECIPES_COPY.recipeDetail;

  const recipe = page?.recipe;
  const interactions = page?.interactions;

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-30",
          SCREEN_LAYOUT.topBar,
        )}
      >
        <div className={cn(SCREEN_LAYOUT.topBarInner, "pt-safe")}>
          <header>
            <button
              type="button"
              onClick={() => router.back()}
              aria-label={copy.back}
              className={SCREEN_LAYOUT.iconButton}
            >
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            </button>
          </header>
        </div>
      </div>

      <main
        className={cn(
          SCREEN_LAYOUT.content,
          "flex flex-col pb-8",
          "pt-[calc(env(safe-area-inset-top)+5.35rem)]",
        )}
      >
        {isPending ? <RecipeDetailSkeleton /> : null}

        {isError ? (
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
        ) : null}

        {recipe && !isPending ? (
          <>
            <RecipeDetailHero
              recipe={recipe}
              recipeId={recipe.id}
              isFavorite={interactions?.isFavorite ?? false}
            />

            <RecipeDetailBodyTabs
              recipe={recipe}
              interactions={interactions ?? null}
            />
          </>
        ) : null}

        {!isPending && !isError && !recipe ? (
          <ModuleEmptyState module="recipes" title={copy.notFound}>
            <Link href="/recipes" className="text-sm font-semibold text-primary">
              {copy.back}
            </Link>
          </ModuleEmptyState>
        ) : null}
      </main>

      <BottomNav activeId="recipes" />
    </div>
  );
}
