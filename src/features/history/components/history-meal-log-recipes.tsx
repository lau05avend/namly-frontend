import { MealRecipeDetailRow } from "@/components/meal/meal-recipe-detail-row";
import { PlannerSection } from "@/components/planner/planner-section";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type { HistoryMealLogRecipe } from "@/features/history/types/history.types";
import { buildMenuSummaryDescription } from "@/features/planner/utils/plan-menu-summary.utils";
import { cn } from "@/lib/utils";

type HistoryMealLogRecipesProps = {
  recipes: HistoryMealLogRecipe[];
  onRecipePress?: (recipe: HistoryMealLogRecipe) => void;
  className?: string;
};

export function HistoryMealLogRecipes({
  recipes,
  onRecipePress,
  className,
}: HistoryMealLogRecipesProps) {
  if (recipes.length === 0) {
    return null;
  }

  const menuSummaryLabel = buildMenuSummaryDescription(recipes);

  return (
    <PlannerSection
      label={HISTORY_COPY.recipesLabel}
      description={menuSummaryLabel}
      className={cn("gap-2", className)}
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
                onRecipePress ? () => onRecipePress(recipe) : undefined
              }
              ariaLabel={HISTORY_COPY.openRecipeAria(recipe.title)}
            />
          </li>
        ))}
      </ul>
    </PlannerSection>
  );
}
