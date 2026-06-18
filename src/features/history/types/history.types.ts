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
