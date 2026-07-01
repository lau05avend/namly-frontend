"use client";

import { RecipeLibraryCard } from "@/features/recipes/components/recipe-library-card";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeListItem } from "@/features/recipes/types/recipe.types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type RecipeCollectionRecipeCardProps = {
  recipe: RecipeListItem;
  href: string;
  onRemove: () => void;
  isRemoving?: boolean;
  className?: string;
};

export function RecipeCollectionRecipeCard({
  recipe,
  href,
  onRemove,
  isRemoving = false,
  className,
}: RecipeCollectionRecipeCardProps) {
  const copy = RECIPES_COPY.collections;

  return (
    <div className={cn("relative", className)}>
      <RecipeLibraryCard recipe={recipe} href={href} />

      <button
        type="button"
        aria-label={copy.removeRecipe}
        disabled={isRemoving}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove();
        }}
        className={cn(
          "absolute top-2 right-2 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full",
          "border border-foreground/10 bg-background/90 text-foreground/55 shadow-sm backdrop-blur-sm",
          "transition-colors hover:bg-cta/10 hover:text-cta",
          isRemoving && "cursor-not-allowed opacity-60",
        )}
      >
        <X className="size-3.5" strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}
