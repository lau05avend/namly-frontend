"use client";

import { useEffect, useMemo, useState } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipePickerCard } from "@/features/recipes/components/recipe-picker-card";
import { RecipePrimaryFilters } from "@/features/recipes/components/recipe-primary-filters";
import { RecipeTagFilters } from "@/features/recipes/components/recipe-tag-filters";
import { useRecipePickerList } from "@/features/recipes/queries/use-recipe-picker-list";
import type {
  RecipeListFilter,
  RecipeListItem,
} from "@/features/recipes/types/recipe.types";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanRecipeFormValue } from "@/features/planner/schemas/plan-meal.schema";
import { useRecipeTags } from "@/features/tags/queries/use-recipe-tags";
import { Search, X } from "lucide-react";

type AddRecipesSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRecipes: PlanRecipeFormValue[];
  onConfirm: (recipes: PlanRecipeFormValue[]) => void;
};

function toFormRecipe(recipe: RecipeListItem): PlanRecipeFormValue {
  return {
    id: recipe.id,
    title: recipe.title,
    coverUrl: recipe.coverUrl,
  };
}

function toDraftSelection(recipes: PlanRecipeFormValue[]): RecipeListItem[] {
  return recipes.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    coverUrl: recipe.coverUrl ?? null,
    rating: null,
    isFavorite: false,
    isHidden: false,
    isSuggested: false,
    isPublic: false,
    updatedAt: "",
    createdAt: "",
  }));
}

export function AddRecipesSheet({
  open,
  onOpenChange,
  selectedRecipes,
  onConfirm,
}: AddRecipesSheetProps) {
  const [titleSearch, setTitleSearch] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [filter, setFilter] = useState<RecipeListFilter>("all");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [draftSelection, setDraftSelection] = useState<RecipeListItem[]>([]);
  const [tagsSheetOpen, setTagsSheetOpen] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);

    if (open) {
      setDraftSelection(toDraftSelection(selectedRecipes));
    } else {
      setTitleSearch("");
      setDebouncedTitle("");
      setFilter("all");
      setSelectedTagIds([]);
      setTagsSheetOpen(false);
    }
  }

  const { data: tags = [] } = useRecipeTags(open);
  const {
    recipes,
    isPending,
    isError,
  } = useRecipePickerList({
    enabled: open,
    filter,
    tags: selectedTagIds,
    title: debouncedTitle,
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedTitle(titleSearch);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [titleSearch]);

  const selectedIds = useMemo(
    () => new Set(draftSelection.map((recipe) => recipe.id)),
    [draftSelection],
  );

  const toggleRecipe = (recipe: RecipeListItem) => {
    setDraftSelection((current) => {
      const exists = current.some((item) => item.id === recipe.id);

      if (exists) {
        return current.filter((item) => item.id !== recipe.id);
      }

      return [...current, recipe];
    });
  };

  const clearTags = () => {
    setSelectedTagIds([]);
  };

  const clearSelection = () => {
    setDraftSelection([]);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((current) =>
      current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId],
    );
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTitleSearch("");
      setDebouncedTitle("");
      setFilter("all");
      setSelectedTagIds([]);
      setTagsSheetOpen(false);
    }

    onOpenChange(nextOpen);
  };

  const handleConfirm = () => {
    onConfirm(draftSelection.map(toFormRecipe));
    handleOpenChange(false);
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={handleOpenChange}
      scrollableContent={false}
      title={PLAN_MEAL_COPY.recipes.pickerTitle}
      description={PLAN_MEAL_COPY.recipes.pickerDescription}
      footer={
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={draftSelection.length === 0}
          >
            {PLAN_MEAL_COPY.recipes.confirmSelection(draftSelection.length)}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleOpenChange(false)}
          >
            {PLAN_MEAL_COPY.recipes.cancel}
          </Button>
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 flex-col gap-3 border-b border-foreground/6 pb-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-foreground/35"
              aria-hidden
            />
            <Input
              value={titleSearch}
              onChange={(event) => setTitleSearch(event.target.value)}
              placeholder={PLAN_MEAL_COPY.recipes.searchPlaceholder}
              className="h-10 pl-10"
            />
          </div>

          <RecipePrimaryFilters value={filter} onChange={setFilter} />

          <RecipeTagFilters
            tags={tags}
            selectedTagIds={selectedTagIds}
            onToggleTag={toggleTag}
            onClearTags={clearTags}
            tagsSheetOpen={tagsSheetOpen}
            onTagsSheetOpenChange={setTagsSheetOpen}
            parentOpen={open}
          />

          {draftSelection.length > 0 ? (
            <div className="flex px-1">
              <button
                type="button"
                onClick={clearSelection}
                className="inline-flex items-center gap-1 text-xs font-medium text-foreground/45 transition-colors hover:text-primary"
              >
                <X className="size-3" aria-hidden />
                {PLAN_MEAL_COPY.recipes.clearSelection}
              </button>
            </div>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto py-3 pb-4">
          {isPending ? (
            <p className="py-8 text-center text-sm text-foreground/50">
              {PLAN_MEAL_COPY.recipes.loading}
            </p>
          ) : null}

          {isError ? (
            <p className="py-8 text-center text-sm text-foreground/60">
              {PLAN_MEAL_COPY.recipes.loadError}
            </p>
          ) : null}

          {!isPending && !isError && recipes.length === 0 ? (
            <p className="py-8 text-center text-sm text-foreground/50">
              {PLAN_MEAL_COPY.recipes.noResults}
            </p>
          ) : null}

          {!isPending && !isError && recipes.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2.5">
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <RecipePickerCard
                    recipe={recipe}
                    selected={selectedIds.has(recipe.id)}
                    onToggle={() => toggleRecipe(recipe)}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </BottomSheet>
  );
}
