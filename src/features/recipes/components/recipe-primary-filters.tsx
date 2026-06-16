"use client";

import { RECIPE_LIST_FILTERS } from "@/features/recipes/constants/recipe-filters";
import type { RecipeListFilter } from "@/features/recipes/types/recipe.types";
import { cn } from "@/lib/utils";

type RecipePrimaryFiltersProps = {
  value: RecipeListFilter;
  onChange: (filter: RecipeListFilter) => void;
};

export function RecipePrimaryFilters({
  value,
  onChange,
}: RecipePrimaryFiltersProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {RECIPE_LIST_FILTERS.map((item) => {
        const selected = value === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              selected ? item.activeClassName : item.inactiveClassName,
            )}
          >
            <Icon
              className={cn(
                "size-3.5",
                selected
                  ? item.iconActiveClassName
                  : item.iconInactiveClassName,
              )}
              aria-hidden
            />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
