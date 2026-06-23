"use client";

import type { ReactNode } from "react";
import { useResolvedMealPhotoUrl } from "@/features/meal-register/hooks/use-resolved-meal-photo-url";
import { getRecipeOriginBadgeStyles } from "@/features/recipes/constants/recipe-filters";
import { RecipePlaceholderIcon } from "@/features/recipes/constants/recipe-placeholder";
import { resolveRecipeOriginBadgeId } from "@/features/recipes/utils/resolve-recipe-origin";
import type { RecipeListItem } from "@/features/recipes/types/recipe.types";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { cn } from "@/lib/utils";
import { Heart, Star } from "lucide-react";

export const RECIPE_CARD_METADATA_RATING_HEIGHT = "h-3.5";
const STAR_COUNT = 5;

export function RecipeRatingStars({ rating }: { rating: number }) {
  const filledCount = Math.min(STAR_COUNT, Math.max(0, Math.round(rating)));

  return (
    <span
      className="flex items-center gap-px"
      aria-label={`${rating.toFixed(1)} de 5`}
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-2.5",
            index < filledCount
              ? "fill-highlight text-highlight"
              : "fill-foreground/10 text-foreground/20",
          )}
          aria-hidden
        />
      ))}
    </span>
  );
}

function getOriginBadge(recipe: RecipeListItem) {
  const origin = resolveRecipeOriginBadgeId(recipe);

  if (!origin) {
    return null;
  }

  return {
    label:
      origin === "suggested"
        ? PLAN_MEAL_COPY.recipes.suggestedBadge
        : PLAN_MEAL_COPY.recipes.publicBadge,
    ...getRecipeOriginBadgeStyles(origin),
  };
}

type RecipeOriginBadgeProps = {
  recipe: RecipeListItem;
  reserveSelectionSpace?: boolean;
};

export function RecipeOriginBadge({
  recipe,
  reserveSelectionSpace = false,
}: RecipeOriginBadgeProps) {
  const badge = getOriginBadge(recipe);

  if (!badge) {
    return null;
  }

  const Icon = badge.icon;

  return (
    <span
      className={cn(
        "absolute top-2 left-2 z-10 inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold",
        reserveSelectionSpace
          ? "max-w-[calc(100%-3rem)]"
          : "max-w-[calc(100%-1rem)]",
        badge.chipClassName,
      )}
    >
      <Icon
        className={cn("size-2.5 shrink-0", badge.iconClassName)}
        aria-hidden
      />
      <span className="truncate">{badge.label}</span>
    </span>
  );
}

export function RecipeFavoriteBadge({ isFavorite }: { isFavorite: boolean }) {
  if (!isFavorite) {
    return null;
  }

  return (
    <span
      className="absolute right-2 bottom-2 z-10 flex size-6 items-center justify-center rounded-full border-cta/25 bg-background/75 backdrop-blur-sm"
      aria-label="Favorita"
    >
      <Heart
        className="size-4 fill-cta text-cta"
        strokeWidth={2}
        aria-hidden
      />
    </span>
  );
}

type RecipeCoverProps = {
  coverUrl: string | null;
  className?: string;
  aspectClassName?: string;
  children?: ReactNode;
};

export function RecipeCover({
  coverUrl,
  className,
  aspectClassName = "aspect-[2/1]",
  children,
}: RecipeCoverProps) {
  const hasCover = Boolean(coverUrl?.trim());
  const { displayUrl, isResolving } = useResolvedMealPhotoUrl(
    coverUrl ?? undefined,
  );
  const showImage = Boolean(displayUrl) && !isResolving;

  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden",
        hasCover ? "bg-foreground/[0.02]" : "bg-transparent",
        aspectClassName,
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={displayUrl} alt="" className="size-full object-cover" />
      ) : hasCover && isResolving ? (
        <span className="block size-full bg-foreground/5" aria-hidden />
      ) : (
        <span
          className="relative flex size-full items-center justify-center"
          aria-hidden
        >
          <RecipePlaceholderIcon
            className="size-11 text-foreground/[0.07]"
            strokeWidth={1}
          />
        </span>
      )}
      {children}
    </div>
  );
}

type RecipeCardMetadataProps = {
  title: string;
  rating: number | null;
};

export function RecipeCardMetadata({ title, rating }: RecipeCardMetadataProps) {
  return (
    <div className="flex flex-col gap-0.5 border-t border-foreground/5 px-2.5 py-2">
      <p className="line-clamp-2 text-[13px] leading-tight font-semibold text-foreground">
        {title}
      </p>
      <div
        className={cn("flex items-center", RECIPE_CARD_METADATA_RATING_HEIGHT)}
      >
        {rating != null ? <RecipeRatingStars rating={rating} /> : null}
      </div>
    </div>
  );
}
