"use client";

import {
  RecipeCover,
  RecipeOriginBadge,
} from "@/features/recipes/components/recipe-card-visuals";
import { RecipeDetailCompatibilityWarning } from "@/features/recipes/components/detail/recipe-detail-compatibility-warning";
import { RecipeDetailFavoriteButton } from "@/features/recipes/components/detail/recipe-detail-favorite-button";
import { RecipeDetailTagChip } from "@/features/recipes/components/detail/recipe-detail-tag-chip";
import type { RecipeDetail } from "@/features/recipes/types/recipe-detail.types";
import { UserRound } from "lucide-react";

type RecipeDetailHeroProps = {
  recipe: RecipeDetail;
  recipeId: string;
  isFavorite: boolean;
};

export function RecipeDetailHero({
  recipe,
  recipeId,
  isFavorite,
}: RecipeDetailHeroProps) {
  const hasCover = Boolean(recipe.coverUrl?.trim());
  const hasMeta =
    recipe.tags.length > 0 ||
    recipe.hasCompatibilityWarning ||
    Boolean(recipe.sourceLabel || recipe.authorName);

  return (
    <header className="flex flex-col gap-6">
      <RecipeCover
        coverUrl={recipe.coverUrl}
        aspectClassName={
          hasCover ? "aspect-[4/3] rounded-2xl" : "aspect-[2/1] rounded-2xl"
        }
      >
        <RecipeOriginBadge recipe={recipe} />
        <RecipeDetailFavoriteButton
          recipeId={recipeId}
          isFavorite={isFavorite}
        />
      </RecipeCover>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold leading-tight text-foreground">
          {recipe.title}
        </h1>

        {recipe.description ? (
          <div className="pl-1">
            <p className="text-[15px] leading-relaxed text-foreground/65">
              {recipe.description}
            </p>
          </div>
        ) : null}

        {hasMeta ? (
          <div className="flex flex-col gap-3">
            {recipe.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {recipe.tags.map((tag) => (
                  <RecipeDetailTagChip key={tag.id} tag={tag} />
                ))}
              </div>
            ) : null}

            {recipe.hasCompatibilityWarning ? (
              <RecipeDetailCompatibilityWarning />
            ) : null}

            {recipe.sourceLabel || recipe.authorName ? (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-foreground/45">
                {recipe.sourceLabel ? (
                  <span>{recipe.sourceLabel}</span>
                ) : null}

                {recipe.authorName ? (
                  <span className="inline-flex items-center gap-1.5">
                    {recipe.authorAvatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={recipe.authorAvatarUrl}
                        alt=""
                        className="size-4 rounded-full object-cover"
                      />
                    ) : (
                      <UserRound className="size-3.5" aria-hidden />
                    )}
                    <span>{recipe.authorName}</span>
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
