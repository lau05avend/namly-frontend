export const recipeCollectionQueryKeys = {
  all: ["recipe-collections"] as const,
  list: () => [...recipeCollectionQueryKeys.all, "list"] as const,
  detail: (collectionId: string) =>
    [...recipeCollectionQueryKeys.all, "detail", collectionId] as const,
  cover: (collectionId: string) =>
    [...recipeCollectionQueryKeys.all, "cover", collectionId] as const,
};

export const recipeQueryKeys = {
  all: ["recipes"] as const,
  detail: (recipeId: string) =>
    [...recipeQueryKeys.all, "detail", recipeId] as const,
  interactions: (recipeId: string) =>
    [...recipeQueryKeys.all, "interactions", recipeId] as const,
  list: (params: {
    filter: string;
    tags: string;
    title: string;
    folderId: string;
  }) => [...recipeQueryKeys.all, "list", params] as const,
  editForm: (recipeId: string) =>
    [...recipeQueryKeys.all, "edit-form", recipeId] as const,
};
