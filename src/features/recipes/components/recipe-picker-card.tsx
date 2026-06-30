"use client";

import {
  RecipeCardMetadata,
  RecipeCover,
  RecipeCoverDurationBadge,
  RecipeFavoriteBadge,
  RecipeOriginBadge,
} from "@/features/recipes/components/recipe-card-visuals";
import type { RecipeListItem } from "@/features/recipes/types/recipe.types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type RecipePickerCardProps = {
  recipe: RecipeListItem;
  selected: boolean;
  onToggle: () => void;
};

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
        "relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card/20 text-left transition-colors",
        selected
          ? "border-primary/60 bg-card/5"
          : "border-foreground/6 hover:border-foreground/10 hover:bg-card/35",
      )}
    >
      <RecipeCover coverUrl={recipe.coverUrl}>
        <RecipeOriginBadge recipe={recipe} reserveSelectionSpace />
        <RecipeCoverDurationBadge durationMinutes={recipe.durationMinutes} />
        <RecipeFavoriteBadge isFavorite={recipe.isFavorite} />
        <SelectionCheckIndicator selected={selected} />
      </RecipeCover>

      <RecipeCardMetadata title={recipe.title} rating={recipe.rating} />

      {selected ? (
        <span
          className="pointer-events-none absolute inset-0 z-40 rounded-2xl bg-mint/70"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
