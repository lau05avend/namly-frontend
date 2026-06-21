"use client";

import { AnimatePresence, motion } from "motion/react";
import { FolderHeart, BookOpen, type LucideIcon } from "lucide-react";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import {
  RECIPES_VIEW_SPRING,
  RECIPES_VIEW_TRANSITION,
} from "@/features/recipes/constants/recipes-library-motion";
import type { RecipesLibraryView } from "@/features/recipes/types/recipes-library.types";
import { SCREEN_LAYOUT } from "@/constants/screen-layout";

type RecipesLibraryHeaderProps = {
  view: RecipesLibraryView;
  onViewChange: (view: RecipesLibraryView) => void;
};

const SWITCH_CONFIG: Record<
  RecipesLibraryView,
  { target: RecipesLibraryView; label: string; icon: LucideIcon }
> = {
  recipes: {
    target: "collections",
    label: RECIPES_COPY.views.collections,
    icon: FolderHeart,
  },
  collections: {
    target: "recipes",
    label: RECIPES_COPY.views.recipes,
    icon: BookOpen,
  },
};

export function RecipesLibraryHeader({
  view,
  onViewChange,
}: RecipesLibraryHeaderProps) {
  const title =
    view === "recipes"
      ? RECIPES_COPY.views.recipes
      : RECIPES_COPY.views.collections;

  const switchAction = SWITCH_CONFIG[view];
  const SwitchIcon = switchAction.icon;

  return (
    <header className={SCREEN_LAYOUT.headerRow}>
      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h1
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={RECIPES_VIEW_TRANSITION}
            className={SCREEN_LAYOUT.headerTitle}
          >
            {title}
          </motion.h1>
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        onClick={() => onViewChange(switchAction.target)}
        aria-label={`Ver ${switchAction.label.toLowerCase()}`}
        whileTap={{ scale: 0.94 }}
        transition={RECIPES_VIEW_SPRING}
        className={SCREEN_LAYOUT.iconButton}
      >
        <SwitchIcon className="size-4" strokeWidth={2} aria-hidden />
      </motion.button>
    </header>
  );
}
