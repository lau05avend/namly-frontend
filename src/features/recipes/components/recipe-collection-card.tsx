"use client";

import Link from "next/link";
import { RecipeCover } from "@/features/recipes/components/recipe-card-visuals";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeCollection } from "@/features/recipes/types/recipe-collection.types";
import { cn } from "@/lib/utils";

type RecipeCollectionCardProps = {
  collection: RecipeCollection;
  coverUrl?: string | null;
  href: string;
  className?: string;
};

export function RecipeCollectionCard({
  collection,
  coverUrl = null,
  href,
  className,
}: RecipeCollectionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-card text-left transition-colors hover:border-foreground/14",
        className,
      )}
    >
      <RecipeCover
        coverUrl={coverUrl}
        aspectClassName="aspect-square"
        className={cn(!coverUrl && "bg-card")}
      >
        {!coverUrl ? (
          <span
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ backgroundColor: collection.colorHex }}
            aria-hidden
          />
        ) : null}
      </RecipeCover>

      <div className="flex flex-col gap-0.5 px-3 py-2.5">
        <p className="line-clamp-2 text-[13px] leading-tight font-semibold text-foreground">
          {collection.name}
        </p>
        <p className="text-xs text-foreground/45">
          {RECIPES_COPY.recipeCount(collection.recipesCount)}
        </p>
      </div>
    </Link>
  );
}
