export const recipeQueryKeys = {
  all: ["recipes"] as const,
  list: (params: {
    filter: string;
    tags: string;
    title: string;
  }) => [...recipeQueryKeys.all, "list", params] as const,
};
