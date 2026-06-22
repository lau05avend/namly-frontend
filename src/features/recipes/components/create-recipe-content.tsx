"use client";

import { PlannerSection } from "@/components/planner/planner-section";
import { CreateRecipeBasicSection } from "@/features/recipes/components/sections/create-recipe-basic-section";
import { CreateRecipeCoverSection } from "@/features/recipes/components/sections/create-recipe-cover-section";
import { CreateRecipeIngredientsSection } from "@/features/recipes/components/sections/create-recipe-ingredients-section";
import { CreateRecipeStepsSection } from "@/features/recipes/components/sections/create-recipe-steps-section";
import { CreateRecipeTagsSection } from "@/features/recipes/components/sections/create-recipe-tags-section";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { MealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";

type CreateRecipeContentProps = {
  photoPicker: MealPhotoPicker;
};

export function CreateRecipeContent({ photoPicker }: CreateRecipeContentProps) {
  const copy = RECIPES_COPY.create;

  return (
    <div className="flex flex-col gap-6 px-4 pb-28 pt-4">
      <CreateRecipeCoverSection
        refs={photoPicker.refs}
        state={photoPicker.state}
        actions={photoPicker.actions}
      />

      <PlannerSection label={copy.sections.basic}>
        <CreateRecipeBasicSection />
      </PlannerSection>

      <PlannerSection label={copy.sections.ingredients}>
        <CreateRecipeIngredientsSection />
      </PlannerSection>

      <PlannerSection label={copy.sections.steps}>
        <CreateRecipeStepsSection />
      </PlannerSection>

      <PlannerSection label={copy.sections.tags}>
        <CreateRecipeTagsSection />
      </PlannerSection>
    </div>
  );
}
