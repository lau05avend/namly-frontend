"use client";

import { CreateRecipeBasicSection } from "@/features/recipes/components/sections/create-recipe-basic-section";
import { CreateRecipeBodyTabsSection } from "@/features/recipes/components/sections/create-recipe-body-tabs-section";
import { CreateRecipeCoverSection } from "@/features/recipes/components/sections/create-recipe-cover-section";
import { CreateRecipePublicSection } from "@/features/recipes/components/sections/create-recipe-public-section";
import { CreateRecipeTagsSection } from "@/features/recipes/components/sections/create-recipe-tags-section";
import type { MealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";

type CreateRecipeContentProps = {
  photoPicker: MealPhotoPicker;
};

export function CreateRecipeContent({ photoPicker }: CreateRecipeContentProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-7 overflow-x-hidden px-4 pb-28 pt-4">
      <CreateRecipeBasicSection />

      <CreateRecipeCoverSection
        refs={photoPicker.refs}
        state={photoPicker.state}
        actions={photoPicker.actions}
      />

      <CreateRecipeBodyTabsSection />

      <div className="flex flex-col gap-6 border-t border-foreground/6 pt-6">
        <CreateRecipeTagsSection />
        <CreateRecipePublicSection />
      </div>
    </div>
  );
}
