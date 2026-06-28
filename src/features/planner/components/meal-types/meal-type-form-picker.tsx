"use client";

import { useMemo } from "react";
import { MealTypeQuickChip } from "@/features/planner/components/meal-types/meal-type-quick-chip";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { useFrequentMealTypes } from "@/features/planner/queries/use-frequent-meal-types";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { mergeSelectedIntoFrequentMealTypes } from "@/features/planner/utils/meal-type-order";
import { cn } from "@/lib/utils";

type MealTypeFormPickerProps = {
  value: string;
  onChange: (mealTypeId: string) => void;
  className?: string;
};

export function MealTypeFormPicker({
  value,
  onChange,
  className,
}: MealTypeFormPickerProps) {
  const {
    data: frequentMealTypes,
    isPending: isFrequentPending,
    isError: isFrequentError,
  } = useFrequentMealTypes();
  const { data: allMealTypes } = useMealTypes();

  const displayMealTypes = useMemo(
    () =>
      mergeSelectedIntoFrequentMealTypes(
        frequentMealTypes ?? [],
        value,
        allMealTypes ?? [],
      ),
    [allMealTypes, frequentMealTypes, value],
  );

  if (isFrequentPending) {
    return (
      <p className="text-sm text-foreground/50">{MEAL_TYPES_COPY.loading}</p>
    );
  }

  if (isFrequentError) {
    return (
      <p className="text-sm text-foreground/60">{MEAL_TYPES_COPY.loadError}</p>
    );
  }

  if (displayMealTypes.length === 0) {
    return (
      <p className="text-sm text-foreground/50">{MEAL_TYPES_COPY.empty}</p>
    );
  }

  return (
    <div
      className={cn(
        "-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      role="radiogroup"
      aria-label="Tipo de comida"
    >
      {displayMealTypes.map((mealType) => (
        <MealTypeQuickChip
          key={mealType.id}
          label={mealType.name}
          selected={value === mealType.id}
          onSelect={() => onChange(mealType.id)}
        />
      ))}
    </div>
  );
}
