"use client";

import { Input } from "@/components/ui/input";
import { RecipePrimaryFilters } from "@/features/recipes/components/recipe-primary-filters";
import { RecipeTagFilters } from "@/features/recipes/components/recipe-tag-filters";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeListFilter } from "@/features/recipes/types/recipe.types";
import type { Tag } from "@/features/tags/types/tag.types";
import { Search } from "lucide-react";

type RecipesLibraryToolbarProps = {
  titleSearch: string;
  onTitleSearchChange: (value: string) => void;
  filter: RecipeListFilter;
  onFilterChange: (filter: RecipeListFilter) => void;
  tags: Tag[];
  selectedTagIds: string[];
  onToggleTag: (tagId: string) => void;
  onClearTags: () => void;
  tagsSheetOpen: boolean;
  onTagsSheetOpenChange: (open: boolean) => void;
  layout?: "sheet" | "page";
};

export function RecipesLibraryToolbar({
  titleSearch,
  onTitleSearchChange,
  filter,
  onFilterChange,
  tags,
  selectedTagIds,
  onToggleTag,
  onClearTags,
  tagsSheetOpen,
  onTagsSheetOpenChange,
  layout = "page",
}: RecipesLibraryToolbarProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-foreground/35"
          aria-hidden
        />
        <Input
          value={titleSearch}
          onChange={(event) => onTitleSearchChange(event.target.value)}
          placeholder={RECIPES_COPY.searchPlaceholder}
          className="h-9 px-3.5 pl-9 text-sm"
        />
      </div>

      <RecipePrimaryFilters
        value={filter}
        onChange={onFilterChange}
        layout={layout}
      />

      <RecipeTagFilters
        tags={tags}
        selectedTagIds={selectedTagIds}
        onToggleTag={onToggleTag}
        onClearTags={onClearTags}
        tagsSheetOpen={tagsSheetOpen}
        onTagsSheetOpenChange={onTagsSheetOpenChange}
        parentOpen
        layout={layout}
      />
    </div>
  );
}
