import type {
  ScheduledMealApiDto,
  ScheduledMealReminderApiDto,
} from "@/features/planner/types/planner-api.types";

export type { ScheduledMealReminderApiDto };

export type CreateScheduledMealApiPayload = {
  mealTypeId: string;
  entryDate: string;
  plannedTime: string;
  isExpress: boolean;
  expressNote?: string;
  recipeIds?: string[];
  reminders?: ScheduledMealReminderApiDto[];
};

export type CreateScheduledMealApiResponse = ScheduledMealApiDto;

export type UpdateScheduledMealApiPayload = {
  mealTypeId?: string;
  entryDate?: string;
  plannedTime?: string;
  isExpress?: boolean;
  expressNote?: string | null;
  recipeIds?: string[];
  reminders?: ScheduledMealReminderApiDto[];
};
