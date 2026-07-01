import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeDetailIngredient } from "@/features/recipes/types/recipe-detail.types";
import { formatRecipeIngredientQuantity } from "@/features/recipes/utils/format-recipe-ingredient-quantity";
import { cn } from "@/lib/utils";

type RecipeDetailIngredientsSectionProps = {
  ingredients: RecipeDetailIngredient[];
  flaggedIngredientIds?: string[];
};

export function RecipeDetailIngredientsSection({
  ingredients,
  flaggedIngredientIds = [],
}: RecipeDetailIngredientsSectionProps) {
  const copy = RECIPES_COPY.recipeDetail;
  const flaggedIds = new Set(flaggedIngredientIds);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-foreground/80">
        {copy.sections.ingredients}
      </h2>

      {ingredients.length === 0 ? (
        <p className="text-sm text-foreground/45">{copy.ingredientsEmpty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2.5">
          {ingredients.map((ingredient) => {
            const isFlagged = flaggedIds.has(ingredient.id);

            return (
              <li
                key={ingredient.id}
                className={cn(
                  "min-w-0 rounded-xl border px-3 py-2.5",
                  isFlagged
                    ? "border-highlight/35 bg-highlight/10"
                    : "border-foreground/6 bg-card/40",
                )}
              >
                <p className="text-[14px] font-medium leading-snug text-foreground">
                  {ingredient.name}
                </p>
                <p className="mt-0.5 text-xs text-foreground/45">
                  {formatRecipeIngredientQuantity(
                    ingredient.quantity,
                    ingredient.unitAbbreviation,
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
