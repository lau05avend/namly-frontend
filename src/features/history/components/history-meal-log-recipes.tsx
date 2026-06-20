import { PlannerSection } from "@/components/planner/planner-section";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type { HistoryMealLogRecipe } from "@/features/history/types/history.types";
import { cn } from "@/lib/utils";
import { ChevronRight, Salad } from "lucide-react";

type HistoryMealLogRecipesProps = {
  recipes: HistoryMealLogRecipe[];
  onRecipePress?: (recipe: HistoryMealLogRecipe) => void;
  className?: string;
};

type HistoryMealLogRecipeRowProps = {
  recipe: HistoryMealLogRecipe;
  onPress?: (recipe: HistoryMealLogRecipe) => void;
};

function HistoryMealLogRecipeRow({
  recipe,
  onPress,
}: HistoryMealLogRecipeRowProps) {
  return (
    <button
      type="button"
      onClick={() => onPress?.(recipe)}
      aria-label={HISTORY_COPY.openRecipeAria(recipe.title)}
      className="group flex w-full min-w-0 cursor-pointer items-center gap-2.5 py-0.5 text-left transition-opacity hover:opacity-60 active:opacity-70"
    >
      <Salad
        className="size-3.5 shrink-0 text-primary"
        strokeWidth={1.5}
        aria-hidden
      />
      <span className="min-w-0 flex-1 text-sm truncate leading-snug text-foreground/70 group-hover:text-foreground/80">
        {recipe.title}
      </span>
      <ChevronRight
        className="size-3.5 shrink-0 text-foreground/40 transition-colors group-hover:text-foreground/30"
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}

export function HistoryMealLogRecipes({
  recipes,
  onRecipePress,
  className,
}: HistoryMealLogRecipesProps) {
  if (recipes.length === 0) {
    return null;
  }

  return (
    <PlannerSection
      label={HISTORY_COPY.recipesLabel}
      className={cn("gap-2", className)}
    >
      <p className="text-xs text-foreground/45">
        {HISTORY_COPY.recipeCount(recipes.length)}
      </p>
      <ul className="flex flex-col gap-2">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <HistoryMealLogRecipeRow
              recipe={recipe}
              onPress={onRecipePress}
            />
          </li>
        ))}
      </ul>
    </PlannerSection>
  );
}
