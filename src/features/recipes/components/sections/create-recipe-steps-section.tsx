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
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlannerDashedAddButton } from "@/components/planner/planner-dashed-add-button";
import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { RecipeStepCard } from "@/features/recipes/components/recipe-step-card";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { createRecipeItemId } from "@/features/recipes/utils/create-recipe-item-id";

export function CreateRecipeStepsSection() {
  const copy = RECIPES_COPY.create.steps;
  const { control, formState: { errors } } = useFormContext<CreateRecipeFormValues>();
  const { fields, append, remove, update, move } = useFieldArray({
    control,
    name: "steps",
    keyName: "fieldKey",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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

  const addStep = () => {
    append({
      fieldKey: createRecipeItemId(),
      description: "",
      durationMinutes: null,
    });
  };

  return (
    <>
      {fields.length === 0 ? (
        <ModuleEmptyState module="recipes" variant="inline" title={copy.empty} />
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
                <RecipeStepCard
                  key={field.fieldKey}
                  sortableId={field.fieldKey}
                  stepNumber={index + 1}
                  step={field}
                  isFirst={index === 0}
                  isLast={index === fields.length - 1}
                  onDescriptionChange={(description) =>
                    update(index, { ...field, description })
                  }
                  onDurationChange={(durationMinutes) =>
                    update(index, { ...field, durationMinutes })
                  }
                  onRemove={() => remove(index)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <PlannerDashedAddButton label={copy.add} onClick={addStep} />

      {errors.steps?.message ? (
        <p className="text-xs text-cta">{String(errors.steps.message)}</p>
      ) : null}
    </>
  );
}
