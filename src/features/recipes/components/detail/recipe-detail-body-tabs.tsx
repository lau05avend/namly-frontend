"use client";

import { useState } from "react";
import { TabBar } from "@/components/navigation/tab-bar";
import { RecipeDetailIngredientsSection } from "@/features/recipes/components/detail/recipe-detail-ingredients-section";
import { RecipeDetailOpinionSection } from "@/features/recipes/components/detail/recipe-detail-opinion-section";
import { RecipeDetailPreparationSection } from "@/features/recipes/components/detail/recipe-detail-preparation-section";
import { RecipeDetailRatingSection } from "@/features/recipes/components/detail/recipe-detail-rating-section";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeDetail } from "@/features/recipes/types/recipe-detail.types";
import type { RecipeInteractions } from "@/features/recipes/types/recipe-interactions.types";
import { ChefHat, Star } from "lucide-react";

type RecipeDetailTabId = "cook" | "experience";

const DETAIL_TABS = [
  {
    id: "cook" as const,
    label: RECIPES_COPY.recipeDetail.tabs.cook,
    icon: ChefHat,
  },
  {
    id: "experience" as const,
    label: RECIPES_COPY.recipeDetail.tabs.experience,
    icon: Star,
  },
];

type RecipeDetailBodyTabsProps = {
  recipe: RecipeDetail;
  interactions: RecipeInteractions | null;
};

export function RecipeDetailBodyTabs({
  recipe,
  interactions,
}: RecipeDetailBodyTabsProps) {
  const [activeTab, setActiveTab] = useState<RecipeDetailTabId>("cook");

  return (
    <section className="flex flex-col gap-4 pt-7">
      <TabBar
        items={DETAIL_TABS}
        activeId={activeTab}
        onChange={setActiveTab}
        align="stretch"
      />

      {activeTab === "cook" ? (
        <div className="flex flex-col gap-7">
          <RecipeDetailIngredientsSection ingredients={recipe.ingredients} />
          <RecipeDetailPreparationSection steps={recipe.steps} />
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          <RecipeDetailRatingSection
            recipeId={recipe.id}
            initialRating={interactions?.rating ?? null}
          />
          <RecipeDetailOpinionSection
            recipeId={recipe.id}
            initialComment={interactions?.publicComment ?? null}
          />
        </div>
      )}
    </section>
  );
}
