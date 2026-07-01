import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";
import type {
  CreateScheduledMealApiPayload,
  UpdateScheduledMealApiPayload,
} from "@/features/planner/types/plan-meal-api.types";
import type { ScheduledMealReminderApiDto } from "@/features/planner/types/planner-api.types";
import { sortRemindersByOffsetDesc } from "@/features/planner/utils/plan-reminder-sort.utils";

export type PlanMealReminderDirtyFields = {
  reminders?: boolean;
  remindersEnabled?: boolean;
};

function toApiReminders(
  values: PlanMealFormValues,
): ScheduledMealReminderApiDto[] {
  if (!values.remindersEnabled) {
    return [];
  }

  return sortRemindersByOffsetDesc(values.reminders).map((reminder) => ({
    offsetMinutes: reminder.offsetMinutes,
  }));
}

function toScheduledMealBasePayload(
  payload: PlanMealFormValues,
): Omit<CreateScheduledMealApiPayload, "reminders"> {
  const isExpress = payload.entryMode === "express";

  if (isExpress) {
    return {
      mealTypeId: payload.mealTypeId,
      entryDate: payload.date,
      plannedTime: payload.time,
      isExpress: true,
      expressNote: payload.expressNote.trim(),
      recipeIds: [],
    };
  }

  return {
    mealTypeId: payload.mealTypeId,
    entryDate: payload.date,
    plannedTime: payload.time,
    isExpress: false,
    recipeIds: payload.recipes.map((recipe) => recipe.id),
  };
}

export function toCreateScheduledMealPayload(
  payload: PlanMealFormValues,
): CreateScheduledMealApiPayload {
  return {
    ...toScheduledMealBasePayload(payload),
    reminders: toApiReminders(payload),
  };
}

function areRemindersDirty(
  dirtyFields?: PlanMealReminderDirtyFields,
): boolean {
  return Boolean(dirtyFields?.reminders || dirtyFields?.remindersEnabled);
}

export function toUpdateScheduledMealPayload(
  payload: PlanMealFormValues,
  dirtyFields?: PlanMealReminderDirtyFields,
): UpdateScheduledMealApiPayload {
  const basePayload = toScheduledMealBasePayload(payload);

  if (!payload.remindersEnabled) {
    if (!areRemindersDirty(dirtyFields)) {
      return basePayload;
    }

    return {
      ...basePayload,
      reminders: [],
    };
  }

  if (!areRemindersDirty(dirtyFields)) {
    return basePayload;
  }

  return {
    ...basePayload,
    reminders: toApiReminders(payload),
  };
}
