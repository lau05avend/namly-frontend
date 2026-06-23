"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ScreenTopBar } from "@/components/layout/screen-top-bar";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { SCREEN_LAYOUT } from "@/constants/screen-layout";
import { RecipeCollectionCard } from "@/features/recipes/components/recipe-collection-card";
import { RecipeLibraryCard } from "@/features/recipes/components/recipe-library-card";
import { RecipesLibraryHeader } from "@/features/recipes/components/recipes-library-header";
import { RecipesLibraryToolbar } from "@/features/recipes/components/recipes-library-toolbar";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import {
  RECIPES_VIEW_SLIDE,
  RECIPES_VIEW_TRANSITION,
} from "@/features/recipes/constants/recipes-library-motion";
import { useCollectionCoverUrls } from "@/features/recipes/queries/use-collection-cover-urls";
import { useRecipeCollections } from "@/features/recipes/queries/use-recipe-collections";
import { useRecipePickerList } from "@/features/recipes/queries/use-recipe-picker-list";
import type { RecipeListFilter } from "@/features/recipes/types/recipe.types";
import type { RecipesLibraryView } from "@/features/recipes/types/recipes-library.types";
import { useRecipeTags } from "@/features/tags/queries/use-recipe-tags";
import { toast } from "sonner";

type RecipesLibraryScreenProps = {
  initialView?: RecipesLibraryView;
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

function viewPanelVariants(direction: number) {
  return {
    initial: {
      opacity: 0,
      x: direction > 0 ? RECIPES_VIEW_SLIDE : -RECIPES_VIEW_SLIDE,
    },
    animate: { opacity: 1, x: 0 },
    exit: {
      opacity: 0,
      x: direction > 0 ? -RECIPES_VIEW_SLIDE : RECIPES_VIEW_SLIDE,
    },
  };
}

export function RecipesLibraryScreen({
  initialView = "recipes",
}: RecipesLibraryScreenProps) {
  const router = useRouter();
  const [view, setView] = useState<RecipesLibraryView>(initialView);
  const [slideDirection, setSlideDirection] = useState(1);
  const [titleSearch, setTitleSearch] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [filter, setFilter] = useState<RecipeListFilter>("all");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [tagsSheetOpen, setTagsSheetOpen] = useState(false);

  const { data: tags = [] } = useRecipeTags(true);

  const {
    recipes,
    isPending: recipesPending,
    isError: recipesError,
  } = useRecipePickerList({
    enabled: view === "recipes",
    filter,
    tags: selectedTagIds,
    title: debouncedTitle,
  });

  const {
    data: collections = [],
    isPending: collectionsPending,
    isError: collectionsError,
  } = useRecipeCollections({
    enabled: view === "collections",
  });

  const { coverUrlByCollectionId } = useCollectionCoverUrls(
    view === "collections" ? collections : [],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedTitle(titleSearch);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [titleSearch]);

  const handleViewChange = useCallback(
    (nextView: RecipesLibraryView) => {
      if (nextView === view) {
        return;
      }

      setSlideDirection(nextView === "collections" ? 1 : -1);
      setView(nextView);

      const params = new URLSearchParams();
      if (nextView === "collections") {
        params.set("view", "collections");
      }

      const query = params.toString();
      router.replace(query ? `/recipes?${query}` : "/recipes", { scroll: false });
    },
    [router, view],
  );

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((current) =>
      current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId],
    );
  };

  const handleFabClick = () => {
    if (view === "collections") {
      toast.info(RECIPES_COPY.fab.addCollection, {
        description: "Muy pronto podrás hacerlo desde aquí.",
      });
      return;
    }

    router.push("/recipes/new");
  };

  const panelVariants = viewPanelVariants(slideDirection);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-background pb-18">
      <ScreenTopBar
        variant="sticky"
        className={view === "recipes" ? "border-b-0" : undefined}
      >
        <RecipesLibraryHeader view={view} onViewChange={handleViewChange} />
      </ScreenTopBar>

      <AnimatePresence mode="wait" initial={false}>
        {view === "recipes" ? (
          <motion.div
            key="recipes-toolbar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={RECIPES_VIEW_TRANSITION}
            className="shrink-0 overflow-hidden border-foreground/8 bg-background/95 backdrop-blur-sm"
          >
            <div className={`${SCREEN_LAYOUT.content} pb-3 pt-1`}>
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
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main
        className={`${SCREEN_LAYOUT.content} flex min-h-0 flex-1 flex-col overflow-x-hidden py-3`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {view === "recipes" ? (
            <motion.div
              key="recipes-panel"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={RECIPES_VIEW_TRANSITION}
              className="min-h-0 flex-1 overflow-y-auto pb-2"
            >
              {recipesPending ? <RecipeGridSkeleton /> : null}

              {recipesError ? (
                <p className="py-8 text-center text-sm text-foreground/60">
                  {RECIPES_COPY.loadError}
                </p>
              ) : null}

              {!recipesPending && !recipesError && recipes.length === 0 ? (
                <ModuleEmptyState
                  module="recipes"
                  title={RECIPES_COPY.noResults}
                  description={RECIPES_COPY.noResultsHint}
                />
              ) : null}

              {!recipesPending && !recipesError && recipes.length > 0 ? (
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
            </motion.div>
          ) : (
            <motion.div
              key="collections-panel"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={RECIPES_VIEW_TRANSITION}
              className="min-h-0 flex-1 overflow-y-auto pb-2"
            >
              {collectionsPending ? <RecipeGridSkeleton /> : null}

              {collectionsError ? (
                <p className="py-8 text-center text-sm text-foreground/60">
                  {RECIPES_COPY.collectionsLoadError}
                </p>
              ) : null}

              {!collectionsPending &&
              !collectionsError &&
              collections.length === 0 ? (
                <ModuleEmptyState
                  module="collections"
                  title={RECIPES_COPY.collectionsEmpty}
                  description={RECIPES_COPY.collectionsEmptyHint}
                />
              ) : null}

              {!collectionsPending &&
              !collectionsError &&
              collections.length > 0 ? (
                <ul className="grid w-full min-w-0 grid-cols-2 gap-2.5">
                  {collections.map((collection) => (
                    <li key={collection.id}>
                      <RecipeCollectionCard
                        collection={collection}
                        coverUrl={coverUrlByCollectionId.get(collection.id)}
                        href={`/recipes/collections/${collection.id}`}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FloatingActionButton
        label={
          view === "collections"
            ? RECIPES_COPY.fab.addCollection
            : RECIPES_COPY.fab.addRecipe
        }
        icon="plus"
        onClick={handleFabClick}
      />

      <BottomNav activeId="recipes" />
    </div>
  );
}
