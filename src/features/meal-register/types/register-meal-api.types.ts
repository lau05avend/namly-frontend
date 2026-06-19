export type ScheduledMealSuggestionMealTypeApiDto = {
  id: string;
  name: string;
  sortOrder: number;
};

export type ScheduledMealSuggestionRecipeApiDto = {
  id: string;
  recipeId: string | null;
  title: string;
  coverUrl: string | null;
  sortOrder: number;
};

export type ScheduledMealSuggestionApiDto = {
  id: string;
  plannedTime: string;
  mealType: ScheduledMealSuggestionMealTypeApiDto;
  recipes: ScheduledMealSuggestionRecipeApiDto[];
  isExpress: boolean;
  expressNote: string | null;
};

export type CreateMealLogApiPayload = {
  mediaUrl: string;
  loggedAt: string;
  scheduledMealId?: string;
  mealTypeId?: string;
  content?: string;
  recipeIds?: string[];
  score?: number;
  tagIds?: string[];
};

export type CreateMealLogApiResponse = {
  id: string;
};
