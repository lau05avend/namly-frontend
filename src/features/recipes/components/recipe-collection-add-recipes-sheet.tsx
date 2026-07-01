"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { RecipePickerCard } from "@/features/recipes/components/recipe-picker-card";
import { RecipePrimaryFilters } from "@/features/recipes/components/recipe-primary-filters";
import { RecipeTagFilters } from "@/features/recipes/components/recipe-tag-filters";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useAddRecipesToCollection } from "@/features/recipes/queries/use-add-recipes-to-collection";
import { useRecipes } from "@/features/recipes/queries/use-recipes";
import { useRecipePickerList } from "@/features/recipes/queries/use-recipe-picker-list";
import type { RecipeListFilter, RecipeListItem } from "@/features/recipes/types/recipe.types";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { useRecipeTags } from "@/features/tags/queries/use-recipe-tags";
import { Search, X } from "lucide-react";

type RecipeCollectionAddRecipesSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: string;
};

export function RecipeCollectionAddRecipesSheet({
  open,
  onOpenChange,
  collectionId,
}: RecipeCollectionAddRecipesSheetProps) {
  const copy = RECIPES_COPY.collections;
  const addMutation = useAddRecipesToCollection();
  const [titleSearch, setTitleSearch] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [filter, setFilter] = useState<RecipeListFilter>("all");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [draftSelection, setDraftSelection] = useState<RecipeListItem[]>([]);
  const [tagsSheetOpen, setTagsSheetOpen] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);

  const folderRecipesQuery = useRecipes({
    enabled: open,
    folderId: collectionId,
  });

  const existingIds = useMemo(() => {
    const folderRecipes = folderRecipesQuery.data ?? [];
    return new Set(folderRecipes.map((recipe) => recipe.id));
  }, [folderRecipesQuery.data]);

  if (open !== prevOpen) {
    setPrevOpen(open);

    if (!open) {
      setTitleSearch("");
      setDebouncedTitle("");
      setFilter("all");
      setSelectedTagIds([]);
      setDraftSelection([]);
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

  const availableRecipes = useMemo(
    () => recipes.filter((recipe) => !existingIds.has(recipe.id)),
    [existingIds, recipes],
  );

  const selectedIds = useMemo(
    () => new Set(draftSelection.map((recipe) => recipe.id)),
    [draftSelection],
  );

  const toggleRecipe = (recipe: RecipeListItem) => {
    if (existingIds.has(recipe.id)) {
      return;
    }

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
      setDraftSelection([]);
      setTagsSheetOpen(false);
    }

    onOpenChange(nextOpen);
  };

  const handleConfirm = async () => {
    if (draftSelection.length === 0) {
      toast.info(copy.addRecipesEmpty);
      return;
    }

    try {
      await addMutation.mutateAsync({
        collectionId,
        recipeIds: draftSelection.map((recipe) => recipe.id),
      });
      toast.success(copy.addRecipesSuccess);
      handleOpenChange(false);
    } catch (error) {
      toast.error(getUserFacingErrorMessage(error, copy.addRecipesError));
    }
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={handleOpenChange}
      scrollableContent={false}
      title={copy.addRecipesTitle}
      description={copy.addRecipesDescription}
      footer={
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={draftSelection.length === 0 || addMutation.isPending}
          >
            {copy.addRecipesConfirm(draftSelection.length)}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleOpenChange(false)}
          >
            {copy.cancel}
          </Button>
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 flex-col gap-3 border-b border-foreground/6 pb-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-foreground/35"
              aria-hidden
            />
            <Input
              value={titleSearch}
              onChange={(event) => setTitleSearch(event.target.value)}
              placeholder={RECIPES_COPY.searchPlaceholder}
              className="h-9 px-3.5 pl-9 text-sm"
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
                {copy.clearSelection}
              </button>
            </div>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto py-3 pb-4">
          {isPending ? (
            <p className="py-8 text-center text-sm text-foreground/50">
              {RECIPES_COPY.loading}
            </p>
          ) : null}

          {isError ? (
            <p className="py-8 text-center text-sm text-foreground/60">
              {RECIPES_COPY.loadError}
            </p>
          ) : null}

          {!isPending && !isError && availableRecipes.length === 0 ? (
            <ModuleEmptyState
              module="recipes"
              title={RECIPES_COPY.noResults}
              description={copy.alreadyInCollection}
              className="py-8"
            />
          ) : null}

          {!isPending && !isError && availableRecipes.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2.5">
              {availableRecipes.map((recipe) => (
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
