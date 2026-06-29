"use client";

import { MealRecipeDetailRow } from "@/components/meal/meal-recipe-detail-row";
import { PlannerSection } from "@/components/planner/planner-section";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { PLANNER_DETAIL_SECTION_CLASS } from "@/features/planner/constants/planner-detail-surfaces";
import type { PlannerScheduledMealRecipe } from "@/features/planner/types/planner-detail.types";
import { buildMenuSummaryDescription } from "@/features/planner/utils/plan-menu-summary.utils";
import { buildPlannerEntryPath } from "@/lib/navigation/meal-routes";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type PlannerEntryDetailRecipesProps = {
  recipes: PlannerScheduledMealRecipe[];
  scheduledMealId: string;
  dateKey: string;
  returnTo?: string | null;
  className?: string;
};

export function PlannerEntryDetailRecipes({
  recipes,
  scheduledMealId,
  dateKey,
  returnTo,
  className,
}: PlannerEntryDetailRecipesProps) {
  const router = useRouter();

  if (recipes.length === 0) {
    return null;
  }

  const plannerReturnTo = buildPlannerEntryPath(
    scheduledMealId,
    dateKey,
    returnTo,
  );

  const handleRecipePress = (recipe: PlannerScheduledMealRecipe) => {
    if (!recipe.recipeId) {
      return;
    }

    const params = new URLSearchParams({
      returnTo: plannerReturnTo,
    });

    router.push(`/recipes/${recipe.recipeId}?${params.toString()}`);
  };

  const menuSummaryLabel = buildMenuSummaryDescription(recipes);

  return (
    <PlannerSection
      label={PLANNER_COPY.detail.recipesLabel}
      description={menuSummaryLabel}
      className={cn(PLANNER_DETAIL_SECTION_CLASS, className)}
    >
      <ul>
        {recipes.map((recipe, index) => (
          <li key={recipe.id}>
            <MealRecipeDetailRow
              title={recipe.title}
              coverUrl={recipe.coverUrl}
              durationMinutes={recipe.durationMinutes}
              isLast={index === recipes.length - 1}
              onPress={
                recipe.recipeId
                  ? () => handleRecipePress(recipe)
                  : undefined
              }
              ariaLabel={PLANNER_COPY.detail.openRecipeAria(recipe.title)}
            />
          </li>
        ))}
      </ul>
    </PlannerSection>
  );
}
