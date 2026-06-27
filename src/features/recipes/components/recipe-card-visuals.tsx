"use client";

import type { ReactNode } from "react";
import { useResolvedRecipeCoverUrl } from "@/features/recipes/hooks/use-resolved-recipe-cover-url";
import { getRecipeOriginBadgeStyles } from "@/features/recipes/constants/recipe-filters";
import { RecipePlaceholderIcon } from "@/features/recipes/constants/recipe-placeholder";
import { resolveRecipeOriginBadgeId } from "@/features/recipes/utils/resolve-recipe-origin";
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

function getOriginBadge(recipe: {
  isSuggested?: boolean;
  isPublic?: boolean;
}) {
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
  recipe: {
    isSuggested?: boolean;
    isPublic?: boolean;
  };
  reserveSelectionSpace?: boolean;
  className?: string;
};

export function RecipeOriginBadge({
  recipe,
  reserveSelectionSpace = false,
  className,
}: RecipeOriginBadgeProps) {
  const badge = getOriginBadge(recipe);

  if (!badge) {
    return null;
  }

  const Icon = badge.icon;

  return (
    <span
      className={cn(
        "absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold shadow-sm backdrop-blur-md",
        reserveSelectionSpace
          ? "max-w-[calc(100%-3.5rem)]"
          : "max-w-[calc(100%-1.25rem)]",
        badge.chipClassName,
        className,
      )}
    >
      <Icon
        className={cn("size-3 shrink-0", badge.iconClassName)}
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
      className="absolute right-2.5 bottom-2.5 z-10 flex size-7 items-center justify-center rounded-full border border-cta/35 bg-background/90 shadow-sm backdrop-blur-md"
      aria-label="Favorita"
    >
      <Heart
        className="size-[18px] fill-cta text-cta"
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
  const { displayUrl, isResolving } = useResolvedRecipeCoverUrl(
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
