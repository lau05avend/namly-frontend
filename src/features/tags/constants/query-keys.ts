export const tagQueryKeys = {
  all: ["tags"] as const,
  byCategory: (category: string) =>
    [...tagQueryKeys.all, "category", category] as const,
};
