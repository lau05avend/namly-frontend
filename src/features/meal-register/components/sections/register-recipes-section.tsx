"use client";

import { useState } from "react";
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
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { PlannerSection } from "@/components/planner/planner-section";
import { RecipePlanCard } from "@/components/planner/recipe-plan-card";
import { AddRecipesSheet } from "@/features/planner/components/plan-meal/add-recipes-sheet";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function RegisterRecipesSection() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { control } = useFormContext<RegisterMealFormValues>();

  const { fields, replace, remove, move } = useFieldArray({
    control,
    name: "recipes",
    keyName: "fieldKey",
  });

  const selectedRecipes = useWatch({ control, name: "recipes" }) ?? [];
  const sortableIds = fields.map((field) => field.fieldKey);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const from = fields.findIndex((field) => field.fieldKey === active.id);
    const to = fields.findIndex((field) => field.fieldKey === over.id);

    if (from >= 0 && to >= 0) {
      move(from, to);
    }
  };

  return (
    <>
      <PlannerSection label={REGISTER_MEAL_COPY.sections.recipes}>
        <div className="flex flex-col gap-2">
          {fields.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortableIds}
                strategy={verticalListSortingStrategy}
              >
                <ul className="relative overflow-hidden rounded-2xl border border-foreground/8 bg-card">
                  {fields.map((field, index) => (
                    <RecipePlanCard
                      key={field.fieldKey}
                      sortableId={field.fieldKey}
                      recipe={field}
                      isFirst={index === 0}
                      isLast={index === fields.length - 1}
                      onRemove={() => remove(index)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-sm text-foreground/50">
              {PLAN_MEAL_COPY.recipes.empty}
            </p>
          )}

          <PlannerDashedAddButton
            label={REGISTER_MEAL_COPY.recipes.add}
            onClick={() => setIsPickerOpen(true)}
            className="py-2.5"
          />
        </div>
      </PlannerSection>

      <AddRecipesSheet
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        selectedRecipes={selectedRecipes}
        onConfirm={(recipes) => {
          replace(recipes);
        }}
      />
    </>
  );
}
