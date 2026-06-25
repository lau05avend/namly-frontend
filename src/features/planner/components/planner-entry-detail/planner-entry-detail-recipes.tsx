"use client";

import { useRouter } from "next/navigation";
import { PlannerSection } from "@/components/planner/planner-section";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { PLANNER_DETAIL_SECTION_CLASS } from "@/features/planner/constants/planner-detail-surfaces";
import type { PlannerScheduledMealRecipe } from "@/features/planner/types/planner-detail.types";
import { cn } from "@/lib/utils";
import { ChevronRight, Salad } from "lucide-react";

type PlannerEntryDetailRecipesProps = {
  recipes: PlannerScheduledMealRecipe[];
  scheduledMealId: string;
  dateKey: string;
  className?: string;
};

type PlannerEntryDetailRecipeRowProps = {
  recipe: PlannerScheduledMealRecipe;
  onPress?: (recipe: PlannerScheduledMealRecipe) => void;
};

function PlannerEntryDetailRecipeRow({
  recipe,
  onPress,
}: PlannerEntryDetailRecipeRowProps) {
  const isInteractive = Boolean(onPress && recipe.recipeId);

  const content = (
    <>
      <Salad
        className="size-3.5 shrink-0 text-primary"
        strokeWidth={1.5}
        aria-hidden
      />
      <span className="min-w-0 flex-1 truncate text-sm leading-snug text-foreground/70 group-hover:text-foreground/80">
        {recipe.title}
      </span>
      {isInteractive ? (
        <ChevronRight
          className="size-3.5 shrink-0 text-foreground/40 transition-colors group-hover:text-foreground/30"
          strokeWidth={1.75}
          aria-hidden
        />
      ) : null}
    </>
  );

  if (!isInteractive) {
    return (
      <div className="flex w-full min-w-0 items-center gap-2.5 py-0.5">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onPress?.(recipe)}
      aria-label={PLANNER_COPY.detail.openRecipeAria(recipe.title)}
      className="group flex w-full min-w-0 cursor-pointer items-center gap-2.5 py-0.5 text-left transition-opacity hover:opacity-60 active:opacity-70"
    >
      {content}
    </button>
  );
}

export function PlannerEntryDetailRecipes({
  recipes,
  scheduledMealId,
  dateKey,
  className,
}: PlannerEntryDetailRecipesProps) {
  const router = useRouter();

  if (recipes.length === 0) {
    return null;
  }

  const plannerReturnTo = `/planner/${scheduledMealId}?date=${dateKey}`;

  const handleRecipePress = (recipe: PlannerScheduledMealRecipe) => {
    if (!recipe.recipeId) {
      return;
    }

    const params = new URLSearchParams({
      returnTo: plannerReturnTo,
    });

    router.push(`/recipes/${recipe.recipeId}?${params.toString()}`);
  };

  return (
    <PlannerSection
      label={PLANNER_COPY.detail.recipesLabel}
      className={cn(PLANNER_DETAIL_SECTION_CLASS, className)}
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-xs text-foreground/45">
          {PLANNER_COPY.detail.recipeCount(recipes.length)}
        </p>
        <ul className="flex flex-col gap-1.5">
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <PlannerEntryDetailRecipeRow
                recipe={recipe}
                onPress={handleRecipePress}
              />
            </li>
          ))}
        </ul>
      </div>
    </PlannerSection>
  );
}
