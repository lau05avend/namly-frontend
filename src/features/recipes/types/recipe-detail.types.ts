export type RecipeDetailTag = {
  id: string;
  name: string;
  iconName: string | null;
};

export type RecipeDetailIngredient = {
  name: string;
  quantity: number;
  unitAbbreviation: string;
};

export type RecipeDetailStep = {
  stepOrder: number;
  description: string;
  durationMinutes: number | null;
};

export type RecipeDetail = {
  id: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  isPublic: boolean;
  isSuggested: boolean;
  authorName: string | null;
  authorAvatarUrl: string | null;
  sourceLabel: string | null;
  hasCompatibilityWarning: boolean;
  tags: RecipeDetailTag[];
  ingredients: RecipeDetailIngredient[];
  steps: RecipeDetailStep[];
};
