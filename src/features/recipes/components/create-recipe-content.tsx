"use client";

import { CreateRecipeBasicSection } from "@/features/recipes/components/sections/create-recipe-basic-section";
import { CreateRecipeBodyTabsSection } from "@/features/recipes/components/sections/create-recipe-body-tabs-section";
import { CreateRecipeCoverSection } from "@/features/recipes/components/sections/create-recipe-cover-section";
import { CreateRecipePublicSection } from "@/features/recipes/components/sections/create-recipe-public-section";
import { CreateRecipeTagsSection } from "@/features/recipes/components/sections/create-recipe-tags-section";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { MealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";

type CreateRecipeContentProps = {
  photoPicker: MealPhotoPicker;
};

export function CreateRecipeContent({ photoPicker }: CreateRecipeContentProps) {
  const copy = RECIPES_COPY.create;

  return (
    <div className="flex flex-col gap-8 px-4 pb-28 pt-3">
      <CreateRecipeBasicSection />

      <CreateRecipeCoverSection
        refs={photoPicker.refs}
        state={photoPicker.state}
        actions={photoPicker.actions}
      />

      <CreateRecipeBodyTabsSection />

      <div className="flex flex-col gap-5 border-t border-foreground/6 pt-6">
        <CreateRecipePublicSection />

        <div className="flex flex-col gap-2">
          <CreateRecipeTagsSection />
        </div>
      </div>
    </div>
  );
}
