export const registerMealQueryKeys = {
  all: ["meal-register"] as const,
  suggestions: (loggedAt: string) =>
    [...registerMealQueryKeys.all, "suggestions", loggedAt] as const,
  mealPhotoDisplayUrl: (mediaRef: string) =>
    [...registerMealQueryKeys.all, "meal-photo-display-url", mediaRef] as const,
};
