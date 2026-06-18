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
