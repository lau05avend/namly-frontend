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
import { RecipePlanCard } from "@/components/planner/recipe-plan-card";
import { AddRecipesSheet } from "@/features/planner/components/plan-meal/add-recipes-sheet";
import { RegisterFormSection } from "@/features/meal-register/components/register-form-section";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { buildMenuSummaryDescription } from "@/features/planner/utils/plan-menu-summary.utils";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function RegisterRecipesSection() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterMealFormValues>();

  const { fields, replace, remove, move } = useFieldArray({
    control,
    name: "recipes",
    keyName: "fieldKey",
  });

  const selectedRecipes = useWatch({ control, name: "recipes" }) ?? [];
  const sortableIds = fields.map((field) => field.fieldKey);
  const isEmpty = fields.length === 0;

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
      <RegisterFormSection
        title={
          isEmpty
            ? PLAN_MEAL_COPY.sections.menuEmpty
            : PLAN_MEAL_COPY.sections.menuFilled
        }
        hint={isEmpty ? PLAN_MEAL_COPY.recipes.menuEmptyHint : undefined}
        description={
          isEmpty ? undefined : buildMenuSummaryDescription(selectedRecipes)
        }
      >
        <div className="flex flex-col gap-3">
          {!isEmpty ? (
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
                <ul className="flex flex-col px-0.5">
                  {fields.map((field, index) => (
                    <RecipePlanCard
                      key={field.fieldKey}
                      sortableId={field.fieldKey}
                      recipe={field}
                      isLast={index === fields.length - 1}
                      onRemove={() => remove(index)}
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          ) : null}

          <PlannerDashedAddButton
            label={PLAN_MEAL_COPY.recipes.add}
            onClick={() => setIsPickerOpen(true)}
          />

          {errors.recipes?.message ? (
            <p className="text-xs text-destructive">
              {String(errors.recipes.message)}
            </p>
          ) : null}
        </div>
      </RegisterFormSection>

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
