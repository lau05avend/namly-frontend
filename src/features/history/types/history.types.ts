export type HistoryDayPreview = {
  date: string;
  mealCount: number;
  thumbnailUrl: string | null;
};

export type HistoryMonthTimeline = {
  monthKey: string;
  previewByDate: Record<string, HistoryDayPreview>;
};

export type HistoryMealLog = {
  id: string;
  mediaUrl: string | null;
  loggedAt: string;
  loggedAtTime: string;
  mealTypeName: string;
  mealTypeId: string | null;
  isLinkedToPlan: boolean;
};

export type HistoryMonthActivityDay = {
  date: string;
  hasLogged: boolean;
};

export type HistoryMonthActivity = {
  month: string;
  days: HistoryMonthActivityDay[];
};

export type HistoryDay = {
  date: string;
  logs: HistoryMealLog[];
};

export type HistoryViewMode = "calendar" | "agenda";

export type HistoryMealLogRecipe = {
  id: string;
  recipeId: string;
  title: string;
  coverUrl: string | null;
  sortOrder: number;
};

export type HistoryMealLogTag = {
  id: string;
  name: string;
  iconName: string | null;
};

export type HistoryMealLogScheduledMeal = {
  id: string;
  entryDate: string;
  plannedTime: string;
  isExpress: boolean;
  expressNote: string | null;
  mealTypeName: string;
  recipes: HistoryMealLogRecipe[];
};

export type HistoryMealLogDetail = {
  id: string;
  mediaUrl: string | null;
  content: string | null;
  score: number | null;
  loggedAt: string;
  loggedAtTime: string;
  mealTypeName: string;
  mealTypeId: string | null;
  scheduledMeal: HistoryMealLogScheduledMeal | null;
  isLinkedToPlan: boolean;
  recipes: HistoryMealLogRecipe[];
  tags: HistoryMealLogTag[];
};
