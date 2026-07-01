import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeCompatibilityConflict } from "@/features/recipes/types/recipe-detail.types";
import { formatRecipeCompatibilityConflict } from "@/features/recipes/utils/format-recipe-compatibility-conflict";
import { AlertCircle } from "lucide-react";

type RecipeDetailCompatibilityWarningProps = {
  conflicts: RecipeCompatibilityConflict[];
};

export function RecipeDetailCompatibilityWarning({
  conflicts,
}: RecipeDetailCompatibilityWarningProps) {
  const copy = RECIPES_COPY.recipeDetail;
  const hasConflictDetails = conflicts.length > 0;

  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-highlight/35 bg-highlight/10 px-3.5 py-3">
      <AlertCircle
        className="mt-0.5 size-4 shrink-0 text-highlight"
        aria-hidden
      />
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className="text-sm leading-relaxed text-foreground/70">
          {hasConflictDetails ? copy.compatibility.intro : copy.compatibilityWarning}
        </p>

        {hasConflictDetails ? (
          <ul className="flex flex-col gap-1 text-sm leading-relaxed text-foreground/65">
            {conflicts.map((conflict, index) => (
              <li
                key={`${conflict.type}-${conflict.label}-${conflict.tagId ?? index}`}
                className="flex gap-2"
              >
                <span className="text-highlight" aria-hidden>
                  ·
                </span>
                <span>{formatRecipeCompatibilityConflict(conflict)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
