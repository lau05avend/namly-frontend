export type HomeMealTypeApiDto = {
  id: string;
  name: string;
  sortOrder: number;
};

export type HomeMealItemApiDto = {
  id: string;
  label: string;
};

export type HomeScheduledMealApiDto = {
  id: string;
  mealType: HomeMealTypeApiDto;
  entryDate: string;
  plannedTime: string;
  isExpress: boolean;
  title: string;
  items: HomeMealItemApiDto[];
  moreCount: number;
  totalDurationMinutes?: number | null;
};

export type HomeStreakApiDto = {
  currentDays: number;
  mealsLoggedToday: number;
  mealsGoalToday: number;
  growthStageId: number;
};

export type HomeRegisteredMealApiDto = {
  id: string;
  mealTypeName: string;
  loggedAt: string;
  detail: string;
  mediaUrl?: string | null;
};

export type HomeRegisteredTodayApiDto = {
  count: number;
  meals: HomeRegisteredMealApiDto[];
};

export type HomeRecommendationApiDto = {
  id: string;
  title: string;
  meta: string;
  imageUrl?: string | null;
  totalDurationMinutes?: number | null;
};

export type HomeSummaryApiDto = {
  date: string;
  nextMeal: HomeScheduledMealApiDto | null;
  streak: HomeStreakApiDto;
  upcomingMeals: HomeScheduledMealApiDto[];
  registeredToday: HomeRegisteredTodayApiDto;
  recommendation: HomeRecommendationApiDto | null;
};
