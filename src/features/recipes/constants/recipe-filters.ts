import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Grid2X2,
  Heart,
  ThumbsUp,
  User,
} from "lucide-react";
import type { RecipeListFilter } from "@/features/recipes/types/recipe.types";

export type RecipeFilterConfig = {
  id: RecipeListFilter;
  label: string;
  icon: LucideIcon;
  activeClassName: string;
  inactiveClassName: string;
  iconActiveClassName: string;
  iconInactiveClassName: string;
};

export const RECIPE_LIST_FILTERS: RecipeFilterConfig[] = [
  {
    id: "all",
    label: "Todas",
    icon: Grid2X2,
    activeClassName: "border-foreground/10 bg-foreground/[0.08] text-foreground/75",
    inactiveClassName: "border-foreground/10 bg-card text-foreground/70",
    iconActiveClassName: "text-foreground/40",
    iconInactiveClassName: "text-foreground/45",
  },
  {
    id: "favorites",
    label: "Favoritas",
    icon: Heart,
    activeClassName: "border-cta/35 bg-cta/10 text-cta",
    inactiveClassName: "border-foreground/10 bg-card text-foreground/70",
    iconActiveClassName: "text-cta fill-cta/20",
    iconInactiveClassName: "text-foreground/45",
  },
  {
    id: "suggested",
    label: "Sugeridas",
    icon: ThumbsUp,
    activeClassName: "border-highlight/50 bg-highlight/25 text-foreground",
    inactiveClassName: "border-foreground/10 bg-card text-foreground/70",
    iconActiveClassName: "text-highlight",
    iconInactiveClassName: "text-foreground/45",
  },
  {
    id: "public",
    label: "Públicas",
    icon: Globe,
    activeClassName: "border-sky-300/50 bg-sky-50 text-sky-800",
    inactiveClassName: "border-foreground/10 bg-card text-foreground/70",
    iconActiveClassName: "text-sky-600",
    iconInactiveClassName: "text-foreground/45",
  },
  {
    id: "own",
    label: "Propias",
    icon: User,
    activeClassName: "border-primary/30 bg-mint/60 text-primary",
    inactiveClassName: "border-foreground/10 bg-card text-foreground/70",
    iconActiveClassName: "text-primary",
    iconInactiveClassName: "text-foreground/45",
  },
];

export type RecipeOriginBadgeId = "suggested" | "public";

export function getRecipeOriginBadgeStyles(id: RecipeOriginBadgeId) {
  const config = RECIPE_LIST_FILTERS.find((item) => item.id === id);

  if (!config) {
    throw new Error(`Unknown recipe origin badge: ${id}`);
  }

  const cardChipClassName =
    id === "suggested"
      ? "border-highlight/50 bg-card/95 text-foreground"
      : "border-sky-300/50 bg-card/95 text-sky-800";

  return {
    icon: config.icon,
    chipClassName: cardChipClassName,
    iconClassName: config.iconActiveClassName,
  };
}
