"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { RecipeCollectionAddRecipesSheet } from "@/features/recipes/components/recipe-collection-add-recipes-sheet";
import { RecipeCollectionEditorSheet } from "@/features/recipes/components/recipe-collection-editor-sheet";
import { RecipeCollectionRecipeCard } from "@/features/recipes/components/recipe-collection-recipe-card";
import { RecipesLibraryToolbar } from "@/features/recipes/components/recipes-library-toolbar";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useRecipeCollection } from "@/features/recipes/queries/use-recipe-collections";
import { useRecipePickerList } from "@/features/recipes/queries/use-recipe-picker-list";
import { useRemoveRecipesFromCollection } from "@/features/recipes/queries/use-remove-recipes-from-collection";
import type { RecipeListFilter } from "@/features/recipes/types/recipe.types";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { useRecipeTags } from "@/features/tags/queries/use-recipe-tags";
import { ArrowLeft, Pencil } from "lucide-react";

type RecipeCollectionDetailScreenProps = {
  collectionId: string;
};

function RecipeGridSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-2.5" aria-hidden>
      {Array.from({ length: 4 }, (_, index) => (
        <li
          key={index}
          className="aspect-[4/5] animate-pulse rounded-2xl bg-foreground/[0.06]"
        />
      ))}
    </ul>
  );
}

export function RecipeCollectionDetailScreen({
  collectionId,
}: RecipeCollectionDetailScreenProps) {
  const router = useRouter();
  const copy = RECIPES_COPY.collectionDetail;
  const collectionsCopy = RECIPES_COPY.collections;
  const [titleSearch, setTitleSearch] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [filter, setFilter] = useState<RecipeListFilter>("all");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [tagsSheetOpen, setTagsSheetOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [addRecipesOpen, setAddRecipesOpen] = useState(false);
  const [removingRecipeId, setRemovingRecipeId] = useState<string | null>(null);

  const removeMutation = useRemoveRecipesFromCollection();
  const { data: tags = [] } = useRecipeTags(true);
  const {
    data: collection,
    isPending: collectionPending,
    isError: collectionError,
  } = useRecipeCollection({ collectionId });

  const {
    recipes,
    isPending: recipesPending,
    isError: recipesError,
  } = useRecipePickerList({
    enabled: Boolean(collection),
    filter,
    tags: selectedTagIds,
    title: debouncedTitle,
    folderId: collectionId,
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedTitle(titleSearch);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [titleSearch]);

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((current) =>
      current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId],
    );
  };

  const handleRemoveRecipe = async (recipeId: string) => {
    setRemovingRecipeId(recipeId);

    try {
      await removeMutation.mutateAsync({
        collectionId,
        recipeIds: [recipeId],
      });
      toast.success(collectionsCopy.removeRecipeSuccess);
    } catch (error) {
      toast.error(
        getUserFacingErrorMessage(error, collectionsCopy.removeRecipeError),
      );
    } finally {
      setRemovingRecipeId(null);
    }
  };

  const isLoading = collectionPending || (collection != null && recipesPending);
  const showNotFound = !collectionPending && collectionError;

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background pb-28">
      <RecipeCollectionEditorSheet
        open={editorOpen}
        onOpenChange={setEditorOpen}
        mode="edit"
        collection={collection ?? undefined}
        onDeleted={() => router.replace("/recipes?view=collections")}
      />

      <RecipeCollectionAddRecipesSheet
        open={addRecipesOpen}
        onOpenChange={setAddRecipesOpen}
        collectionId={collectionId}
      />

      <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-lg px-4 py-3">
          <header className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => router.push("/recipes?view=collections")}
              aria-label={copy.back}
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50 hover:text-primary"
            >
              <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
            </button>

            {collection ? (
              <>
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: collection.colorHex }}
                  aria-hidden
                />
                <h1 className="min-w-0 flex-1 truncate text-lg font-bold text-foreground">
                  {collection.name}
                </h1>
                <button
                  type="button"
                  onClick={() => setEditorOpen(true)}
                  aria-label={copy.edit}
                  className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-mint/60 hover:text-primary"
                >
                  <Pencil className="size-4" strokeWidth={2} aria-hidden />
                </button>
              </>
            ) : (
              <h1 className="text-lg font-bold text-foreground">
                {RECIPES_COPY.views.collections}
              </h1>
            )}
          </header>
        </div>
      </div>

      <main className="mx-auto flex w-full min-w-0 max-w-lg flex-col gap-4 px-4 pt-[calc(env(safe-area-inset-top)+4.25rem)]">
        {showNotFound ? (
          <ModuleEmptyState
            module="collections"
            title={copy.notFound}
          >
            <Link
              href="/recipes?view=collections"
              className="text-sm font-semibold text-primary"
            >
              {copy.back}
            </Link>
          </ModuleEmptyState>
        ) : (
          <>
            <RecipesLibraryToolbar
              titleSearch={titleSearch}
              onTitleSearchChange={setTitleSearch}
              filter={filter}
              onFilterChange={setFilter}
              tags={tags}
              selectedTagIds={selectedTagIds}
              onToggleTag={toggleTag}
              onClearTags={() => setSelectedTagIds([])}
              tagsSheetOpen={tagsSheetOpen}
              onTagsSheetOpenChange={setTagsSheetOpen}
            />

            {isLoading ? <RecipeGridSkeleton /> : null}

            {collectionError || recipesError ? (
              <p className="py-8 text-center text-sm text-foreground/60">
                {copy.loadError}
              </p>
            ) : null}

            {!isLoading &&
            !recipesError &&
            collection &&
            recipes.length === 0 ? (
              <ModuleEmptyState
                module="recipes"
                title={copy.emptyTitle}
                description={copy.emptyHint}
              />
            ) : null}

            {!isLoading && !recipesError && recipes.length > 0 ? (
              <ul className="grid w-full min-w-0 grid-cols-2 gap-2.5">
                {recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <RecipeCollectionRecipeCard
                      recipe={recipe}
                      href={`/recipes/${recipe.id}`}
                      onRemove={() => void handleRemoveRecipe(recipe.id)}
                      isRemoving={removingRecipeId === recipe.id}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </main>

      {collection ? (
        <FloatingActionButton
          label={RECIPES_COPY.fab.addRecipesToCollection}
          icon="plus"
          onClick={() => setAddRecipesOpen(true)}
        />
      ) : null}

      <BottomNav activeId="recipes" />
    </div>
  );
}
