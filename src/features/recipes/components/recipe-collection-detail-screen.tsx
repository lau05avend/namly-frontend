"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { RecipeLibraryCard } from "@/features/recipes/components/recipe-library-card";
import { RecipesLibraryToolbar } from "@/features/recipes/components/recipes-library-toolbar";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useRecipeCollection } from "@/features/recipes/queries/use-recipe-collections";
import { useRecipePickerList } from "@/features/recipes/queries/use-recipe-picker-list";
import type { RecipeListFilter } from "@/features/recipes/types/recipe.types";
import { useRecipeTags } from "@/features/tags/queries/use-recipe-tags";
import { ArrowLeft } from "lucide-react";

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
  const [titleSearch, setTitleSearch] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [filter, setFilter] = useState<RecipeListFilter>("all");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [tagsSheetOpen, setTagsSheetOpen] = useState(false);

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

  const isLoading = collectionPending || (collection != null && recipesPending);
  const showNotFound = !collectionPending && collectionError;

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background pb-28">
      <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-lg px-4 py-3">
          <header className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => router.push("/recipes?view=collections")}
              aria-label={RECIPES_COPY.collectionDetail.back}
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
                <h1 className="min-w-0 truncate text-lg font-bold text-foreground">
                  {collection.name}
                </h1>
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
            title={RECIPES_COPY.collectionDetail.notFound}
          >
            <Link
              href="/recipes?view=collections"
              className="text-sm font-semibold text-primary"
            >
              {RECIPES_COPY.collectionDetail.back}
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
                {RECIPES_COPY.collectionDetail.loadError}
              </p>
            ) : null}

            {!isLoading &&
            !recipesError &&
            collection &&
            recipes.length === 0 ? (
              <ModuleEmptyState
                module="recipes"
                title={RECIPES_COPY.noResults}
                description={RECIPES_COPY.noResultsHint}
              />
            ) : null}

            {!isLoading && !recipesError && recipes.length > 0 ? (
              <ul className="grid w-full min-w-0 grid-cols-2 gap-2.5">
                {recipes.map((recipe) => (
                  <li key={recipe.id}>
                    <RecipeLibraryCard
                      recipe={recipe}
                      href={`/recipes/${recipe.id}`}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </main>

      <BottomNav activeId="recipes" />
    </div>
  );
}
