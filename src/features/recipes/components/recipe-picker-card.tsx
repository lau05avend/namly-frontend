"use client";

import { getRecipeOriginBadgeStyles } from "@/features/recipes/constants/recipe-filters";
import { resolveRecipeOriginBadgeId } from "@/features/recipes/utils/resolve-recipe-origin";
import { RecipePlaceholderIcon } from "@/features/recipes/constants/recipe-placeholder";
import type { RecipeListItem } from "@/features/recipes/types/recipe.types";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { cn } from "@/lib/utils";
import { Check, Heart, Star } from "lucide-react";

type RecipePickerCardProps = {
  recipe: RecipeListItem;
  selected: boolean;
  onToggle: () => void;
};

const METADATA_RATING_HEIGHT = "h-3.5";
const STAR_COUNT = 5;

function RecipeRatingStars({ rating }: { rating: number }) {
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

function RecipeOriginBadge({ recipe }: { recipe: RecipeListItem }) {
  const badge = getOriginBadge(recipe);

  if (!badge) {
    return null;
  }

  const Icon = badge.icon;

  return (
    <span
      className={cn(
        "absolute top-2 left-2 z-10 inline-flex max-w-[calc(100%-3rem)] items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold",
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

function FavoriteBadge({ isFavorite }: { isFavorite: boolean }) {
  if (!isFavorite) {
    return null;
  }

  return (
    <span
      className="absolute right-2 bottom-2 z-10 flex size-6 items-center justify-center rounded-full border-cta/30 bg-card"
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

function SelectionCheckIndicator({ selected }: { selected: boolean }) {
  return (
    <span
      className={cn(
        "absolute top-2 right-2 z-50 flex size-5 items-center justify-center rounded-md border",
        selected
          ? "border-primary bg-primary"
          : "border-foreground/25 bg-card/90 shadow-sm",
      )}
      aria-hidden
    >
      {selected ? (
        <Check className="size-3 text-background" strokeWidth={2.5} />
      ) : null}
    </span>
  );
}

export function RecipePickerCard({
  recipe,
  selected,
  onToggle,
}: RecipePickerCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card text-left transition-colors",
        selected
          ? "border-primary/60"
          : "border-foreground/8 hover:border-foreground/14",
      )}
    >
      <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-foreground/[0.04]">
        {recipe.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recipe.coverUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <span
            className="relative flex size-full items-center justify-center bg-card"
            aria-hidden
          >
            <RecipePlaceholderIcon
              className="size-11 text-foreground/[0.05]"
              strokeWidth={1}
            />
          </span>
        )}

        <RecipeOriginBadge recipe={recipe} />
        <FavoriteBadge isFavorite={recipe.isFavorite} />
        <SelectionCheckIndicator selected={selected} />
      </div>

      <div className="flex flex-col gap-0.5 border-t border-foreground/6 bg-card px-2.5 py-2">
        <p className="line-clamp-2 text-[13px] leading-tight font-semibold text-foreground">
          {recipe.title}
        </p>
        <div className={cn("flex items-center", METADATA_RATING_HEIGHT)}>
          {recipe.rating != null ? (
            <RecipeRatingStars rating={recipe.rating} />
          ) : null}
        </div>
      </div>

      {selected ? (
        <span
          className="pointer-events-none absolute inset-0 z-40 rounded-2xl bg-mint/70"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
