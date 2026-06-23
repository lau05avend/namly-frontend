"use client";

import { useState } from "react";
import { TabBar } from "@/components/navigation/tab-bar";
import { CreateRecipeIngredientsSection } from "@/features/recipes/components/sections/create-recipe-ingredients-section";
import { CreateRecipeStepsSection } from "@/features/recipes/components/sections/create-recipe-steps-section";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

type RecipeBodyTabId = "ingredients" | "preparation";

const RECIPE_BODY_TABS = [
  {
    id: "ingredients" as const,
    label: RECIPES_COPY.create.tabs.ingredients,
  },
  {
    id: "preparation" as const,
    label: RECIPES_COPY.create.tabs.preparation,
  },
];

export function CreateRecipeBodyTabsSection() {
  const [activeTab, setActiveTab] = useState<RecipeBodyTabId>("ingredients");

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        items={RECIPE_BODY_TABS}
        activeId={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "ingredients" ? (
        <CreateRecipeIngredientsSection />
      ) : (
        <CreateRecipeStepsSection />
      )}
    </div>
  );
}
