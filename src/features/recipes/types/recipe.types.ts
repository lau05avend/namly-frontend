export type RecipeListFilter =
  | "all"
  | "favorites"
  | "suggested"
  | "public"
  | "own";

export type RecipeListItem = {
  id: string;
  title: string;
  coverUrl: string | null;
  rating: number | null;
  durationMinutes: number | null;
  isFavorite: boolean;
  isHidden: boolean;
  isSuggested?: boolean;
  isPublic?: boolean;
  updatedAt: string;
  createdAt: string;
};

export type RecipeListParams = {
  filter?: RecipeListFilter;
  tags?: string[];
  title?: string;
  folderId?: string;
};
