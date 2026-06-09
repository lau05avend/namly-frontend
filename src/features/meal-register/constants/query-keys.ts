export const registerMealQueryKeys = {
  all: ["meal-register"] as const,
  defaults: (date?: string) =>
    [...registerMealQueryKeys.all, "defaults", date ?? ""] as const,
};
