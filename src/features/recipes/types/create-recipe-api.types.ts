export type CreateRecipeIngredientPayload = {
  name: string;
  quantity: number;
  unitId: string;
};

export type CreateRecipeStepPayload = {
  stepOrder: number;
  description: string;
  durationMinutes: number | null;
};

export type CreateRecipePayload = {
  title: string;
  description: string | null;
  coverUrl: string | null;
  isPublic: boolean;
  ingredients: CreateRecipeIngredientPayload[];
  steps: CreateRecipeStepPayload[];
  tagIds: string[];
};

export type CreateRecipeResponse = {
  id: string;
};
