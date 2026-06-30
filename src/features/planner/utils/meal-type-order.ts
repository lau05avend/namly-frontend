import type { MealType } from "@/features/planner/types/meal-type.types";
import type { UpdateMealTypePayload } from "@/features/planner/types/meal-type-api.types";

export function sortMealTypes(mealTypes: MealType[]): MealType[] {
  return [...mealTypes].sort((left, right) => left.sortOrder - right.sortOrder);
}

export function reorderMealTypesList(
  mealTypes: MealType[],
  fromIndex: number,
  toIndex: number,
): MealType[] {
  const items = [...mealTypes];
  const [removed] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, removed);

  return items.map((mealType, index) => ({
    ...mealType,
    sortOrder: index,
  }));
}

export type MealTypeReorderPatch = {
  mealTypeId: string;
  payload: UpdateMealTypePayload;
};

export function getMealTypeReorderPatches(
  original: MealType[],
  reordered: MealType[],
): MealTypeReorderPatch[] {
  return reordered.flatMap((mealType, index) => {
    const previous = original.find((item) => item.id === mealType.id);

    if (!previous || previous.sortOrder === index) {
      return [];
    }

    return [
      {
        mealTypeId: mealType.id,
        payload: {
          name: mealType.name,
          sortOrder: index,
        },
      },
    ];
  });
}

export function getNextSortOrder(mealTypes: MealType[]): number {
  if (mealTypes.length === 0) {
    return 0;
  }

  return Math.max(...mealTypes.map((mealType) => mealType.sortOrder)) + 1;
}

export function mergeSelectedIntoFrequentMealTypes(
  frequentMealTypes: MealType[],
  selectedId: string | undefined,
  allMealTypes: MealType[],
): MealType[] {
  if (!selectedId || frequentMealTypes.some((mealType) => mealType.id === selectedId)) {
    return frequentMealTypes;
  }

  const selected = allMealTypes.find((mealType) => mealType.id === selectedId);

  if (!selected) {
    return frequentMealTypes;
  }

  return [selected, ...frequentMealTypes];
}

export function normalizeMealTypeName(name: string): string {
  return name.trim().toLocaleLowerCase("es");
}
