import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { AlertCircle } from "lucide-react";

export function RecipeDetailCompatibilityWarning() {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-highlight/35 bg-highlight/10 px-3.5 py-3">
      <AlertCircle
        className="mt-0.5 size-4 shrink-0 text-highlight"
        aria-hidden
      />
      <p className="text-sm leading-relaxed text-foreground/70">
        {RECIPES_COPY.recipeDetail.compatibilityWarning}
      </p>
    </div>
  );
}
