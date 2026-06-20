export const registerMealQueryKeys = {
  all: ["meal-register"] as const,
  suggestions: (loggedAt: string, scheduledMealId?: string) =>
    [
      ...registerMealQueryKeys.all,
      "suggestions",
      loggedAt,
      scheduledMealId ?? "",
    ] as const,
  planPicker: (dateKey: string) =>
    [...registerMealQueryKeys.all, "plan-picker", dateKey] as const,
  mealPhotoDisplayUrl: (mediaRef: string) =>
    [...registerMealQueryKeys.all, "meal-photo-display-url", mediaRef] as const,
};
