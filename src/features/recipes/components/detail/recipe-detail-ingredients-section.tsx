import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeDetailIngredient } from "@/features/recipes/types/recipe-detail.types";
import { formatRecipeIngredientQuantity } from "@/features/recipes/utils/format-recipe-ingredient-quantity";

type RecipeDetailIngredientsSectionProps = {
  ingredients: RecipeDetailIngredient[];
};

export function RecipeDetailIngredientsSection({
  ingredients,
}: RecipeDetailIngredientsSectionProps) {
  const copy = RECIPES_COPY.recipeDetail;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-foreground/80">
        {copy.sections.ingredients}
      </h2>

      {ingredients.length === 0 ? (
        <p className="text-sm text-foreground/45">{copy.ingredientsEmpty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2.5">
          {ingredients.map((ingredient, index) => (
            <li
              key={`${ingredient.name}-${index}`}
              className="min-w-0 rounded-xl border border-foreground/6 bg-card/40 px-3 py-2.5"
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
          ))}
        </ul>
      )}
    </section>
  );
}
