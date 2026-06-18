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
