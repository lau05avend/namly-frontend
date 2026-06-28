"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { MeasurementUnitPickerSheet } from "@/features/recipes/components/measurement-unit-picker-sheet";
import { RecipeIngredientRow } from "@/features/recipes/components/recipe-ingredient-row";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useMeasurementUnits } from "@/features/recipes/queries/use-measurement-units";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { createRecipeItemId } from "@/features/recipes/utils/create-recipe-item-id";
import { resolveDefaultMeasurementUnitId } from "@/features/recipes/utils/resolve-default-measurement-unit";

export function CreateRecipeIngredientsSection() {
  const copy = RECIPES_COPY.create.ingredients;
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<CreateRecipeFormValues>();
  const { fields, append, remove, update, move } = useFieldArray({
    control,
    name: "ingredients",
    keyName: "fieldKey",
  });
  const { data: units = [], isPending, isError } = useMeasurementUnits();
  const [unitPickerIndex, setUnitPickerIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const defaultUnitId = resolveDefaultMeasurementUnitId(units);
  const canAddIngredient = !isPending && defaultUnitId.length > 0;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = fields.findIndex((field) => field.fieldKey === active.id);
    const newIndex = fields.findIndex((field) => field.fieldKey === over.id);

    if (oldIndex >= 0 && newIndex >= 0) {
      move(oldIndex, newIndex);
    }
  };

  const addIngredient = () => {
    if (!canAddIngredient) {
      return;
    }

    append({
      fieldKey: createRecipeItemId(),
      name: "",
      quantity: 1,
      unitId: defaultUnitId,
    });
  };

  const handleUnitSelect = (unitId: string, index: number) => {
    const ingredient = getValues(`ingredients.${index}`);

    if (!ingredient) {
      return;
    }

    update(index, {
      ...ingredient,
      unitId,
    });
    setUnitPickerIndex(null);
  };

  if (isError) {
    return (
      <p className="text-sm text-foreground/60">{copy.loadUnitsError}</p>
    );
  }

  return (
    <>
      {fields.length === 0 ? (
        <p className="py-1 text-sm text-foreground/45">{copy.empty}</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((field) => field.fieldKey)}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {fields.map((field, index) => (
                <RecipeIngredientRow
                  key={field.fieldKey}
                  sortableId={field.fieldKey}
                  index={index}
                  units={units}
                  isLast={index === fields.length - 1}
                  onOpenUnitPicker={() => setUnitPickerIndex(index)}
                  onRemove={() => remove(index)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <PlannerDashedAddButton
        label={copy.add}
        onClick={addIngredient}
        disabled={!canAddIngredient}
        variant="compact"
      />

      {errors.ingredients?.message ? (
        <p className="text-xs text-destructive">{String(errors.ingredients.message)}</p>
      ) : null}

      <MeasurementUnitPickerSheet
        open={unitPickerIndex != null}
        ingredientIndex={unitPickerIndex}
        onOpenChange={(open) => {
          if (!open) {
            setUnitPickerIndex(null);
          }
        }}
        units={units}
        selectedUnitId={
          unitPickerIndex != null
            ? getValues(`ingredients.${unitPickerIndex}.unitId`)
            : undefined
        }
        onSelect={handleUnitSelect}
      />
    </>
  );
}
