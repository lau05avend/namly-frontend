export type RecipeCollectionApiDto = {
  id: string;
  name: string;
  colorHex: string;
  recipesCount: number;
};

export type CreateRecipeCollectionApiPayload = {
  name: string;
  colorHex: string;
};

export type UpdateRecipeCollectionApiPayload = {
  name: string;
  colorHex: string;
};

export type RecipeCollectionRecipesApiPayload = {
  recipeIds: string[];
};
