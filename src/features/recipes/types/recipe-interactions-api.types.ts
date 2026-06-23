export type RecipeInteractionsApiDto = {
  rating: number | null;
  publicComment: string | null;
  isFavorite: boolean;
  isHidden: boolean;
};

export type CreateRecipeInteractionsPayload = {
  rating: number | null;
  publicComment: string | null;
  isFavorite: boolean;
  isHidden: boolean;
};

export type PatchRecipeInteractionsPayload = {
  rating?: number | null;
  publicComment?: string | null;
  isFavorite?: boolean;
  isHidden?: boolean;
};
