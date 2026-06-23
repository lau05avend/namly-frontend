import type { RecipeInteractionsApiDto } from "@/features/recipes/types/recipe-interactions-api.types";
import type { RecipeInteractions } from "@/features/recipes/types/recipe-interactions.types";

export function mapRecipeInteractionsApiToDomain(
  dto: RecipeInteractionsApiDto,
): RecipeInteractions {
  const comment = dto.publicComment?.trim() ?? "";

  return {
    rating: dto.rating,
    publicComment: comment.length > 0 ? comment : null,
    isFavorite: dto.isFavorite,
    isHidden: dto.isHidden,
  };
}
