"use client";

import Link from "next/link";
import {
  RecipeCardMetadata,
  RecipeCover,
  RecipeFavoriteBadge,
  RecipeOriginBadge,
} from "@/features/recipes/components/recipe-card-visuals";
import type { RecipeListItem } from "@/features/recipes/types/recipe.types";
import { cn } from "@/lib/utils";

type RecipeLibraryCardProps = {
  recipe: RecipeListItem;
  href: string;
  className?: string;
};

export function RecipeLibraryCard({
  recipe,
  href,
  className,
}: RecipeLibraryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-transparent text-left transition-colors hover:border-foreground/12 hover:bg-card/25",
        className,
      )}
    >
      <RecipeCover coverUrl={recipe.coverUrl}>
        <RecipeOriginBadge recipe={recipe} />
        <RecipeFavoriteBadge isFavorite={recipe.isFavorite} />
      </RecipeCover>

      <RecipeCardMetadata title={recipe.title} rating={recipe.rating} />
    </Link>
  );
}
