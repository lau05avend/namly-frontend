import type { LucideIcon } from "lucide-react";
import { ChefHat, CookingPot, Salad } from "lucide-react";

export type RecipePlaceholderVariant = "chef-hat" | "cooking-pot" | "salad";

/**
 * Temporary placeholder experiment — switch variant to compare:
 * A. chef-hat  B. cooking-pot  C. salad
 */
export const RECIPE_PLACEHOLDER_VARIANT: RecipePlaceholderVariant = "salad";

const PLACEHOLDER_ICONS: Record<RecipePlaceholderVariant, LucideIcon> = {
  "chef-hat": ChefHat,
  "cooking-pot": CookingPot,
  salad: Salad,
};

export function getRecipePlaceholderIcon(
  variant: RecipePlaceholderVariant = RECIPE_PLACEHOLDER_VARIANT,
): LucideIcon {
  return PLACEHOLDER_ICONS[variant];
}

export const RecipePlaceholderIcon =
  PLACEHOLDER_ICONS[RECIPE_PLACEHOLDER_VARIANT];
