export type ScheduledMealStatusApi =
  | "completed"
  | "next"
  | "upcoming"
  | "missed";

export type ScheduledMealMealTypeApiDto = {
  id: string;
  name: string;
  sortOrder: number;
};

export type ScheduledMealRecipeApiDto = {
  id: string;
  recipeId: string | null;
  title: string;
  coverUrl: string | null;
  sortOrder: number;
};

export type ScheduledMealCompletionMealLogApiDto = {
  id: string;
  mediaUrl: string | null;
  loggedAt: string;
  content: string | null;
  tags: string[];
};

export type ScheduledMealApiDto = {
  id: string;
  mealTypeId: string;
  mealType: ScheduledMealMealTypeApiDto;
  entryDate: string;
  plannedTime: string;
  isExpress: boolean;
  expressNote: string | null;
  recipes?: ScheduledMealRecipeApiDto[];
  status: ScheduledMealStatusApi;
};

export type ScheduledMealDetailApiDto = ScheduledMealApiDto & {
  completionMealLog: ScheduledMealCompletionMealLogApiDto | null;
};

export type ScheduledMealsCalendarApiResponse = {
  days: string[];
};
