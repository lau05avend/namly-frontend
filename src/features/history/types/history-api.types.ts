export type MealLogMealTypeApiDto = {
  id: string;
  name: string;
  sortOrder: number;
};

export type MealLogApiDto = {
  id: string;
  mediaUrl: string | null;
  loggedAt: string;
  loggedAtTime: string;
  mealType: MealLogMealTypeApiDto | null;
  isLinkedToPlan: boolean;
};

export type MealLogsCalendarApiResponse = {
  days: string[];
};

export type MealLogDetailRecipeApiDto = {
  id: string;
  recipeId: string;
  title: string;
  coverUrl: string | null;
  sortOrder: number;
  durationMinutes?: number | null;
};

export type MealLogScheduledMealApiDto = {
  id: string;
  entryDate: string;
  plannedTime: string;
  isExpress: boolean;
  expressNote: string | null;
  mealType: MealLogMealTypeApiDto;
  recipes: MealLogDetailRecipeApiDto[];
};

export type MealLogTagApiDto = {
  id: string;
  category: string;
  name: string;
  iconName: string | null;
};

export type MealLogDetailApiDto = {
  id: string;
  mediaUrl: string | null;
  content: string | null;
  score: number | null;
  loggedAt: string;
  loggedAtTime?: string;
  mealType: MealLogMealTypeApiDto | null;
  scheduledMeal: MealLogScheduledMealApiDto | null;
  isLinkedToPlan?: boolean;
  recipes: MealLogDetailRecipeApiDto[];
  tags: MealLogTagApiDto[];
};
