import type { RecipeInteractionsApiDto } from "@/features/recipes/types/recipe-interactions-api.types";
import type { RecipeDetail } from "@/features/recipes/types/recipe-detail.types";
import type { RecipeInteractions } from "@/features/recipes/types/recipe-interactions.types";

export type RecipeCompatibilityConflictType = "allergen" | "diet" | "custom";

export type RecipeCompatibilityConflictApiDto = {
  type: RecipeCompatibilityConflictType;
  label: string;
  tagId: string | null;
  matchedIngredients: string[];
};

export type RecipeDetailTagApiDto = {
  id: string;
  category: string;
  name: string;
  iconName: string | null;
};

export type RecipeDetailIngredientApiDto = {
  id: string;
  name: string;
  quantity?: number | null;
  unitId?: string | null;
  unit?: {
    id: string;
    name: string;
    abbreviation: string;
  } | null;
};

export type RecipeDetailStepApiDto = {
  id: string;
  stepOrder: number;
  description: string;
  durationMinutes: number | null;
};

export type RecipeSummaryApiDto = {
  id: string;
  title: string;
  description: string | null;
  coverUrl: string | null;
  isPublic: boolean;
  isSuggested?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RecipeDetailApiDto = {
  recipe: RecipeSummaryApiDto;
  ingredients: RecipeDetailIngredientApiDto[];
  steps: RecipeDetailStepApiDto[];
  tags: RecipeDetailTagApiDto[];
  interaction: RecipeInteractionsApiDto;
  canEdit?: boolean;
  canDelete?: boolean;
  hasCompatibilityWarning?: boolean;
  compatibilityConflicts?: RecipeCompatibilityConflictApiDto[];
  flaggedIngredientIds?: string[];
};

export type RecipeDetailPage = {
  recipe: RecipeDetail;
  interactions: RecipeInteractions;
};
