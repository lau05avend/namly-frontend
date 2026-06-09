import { z } from "zod";
import { MEAL_SLOTS } from "@/constants/meal-slots";

export const PLAN_ENTRY_MODES = ["recipe", "express"] as const;

export const planRecipeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Añade un nombre de receta"),
  subtitle: z.string().optional(),
});

export const planReminderSchema = z.object({
  id: z.string(),
  label: z.string().min(1, "Escribe el recordatorio"),
  enabled: z.boolean(),
});

export const planMealFormSchema = z
  .object({
    date: z.string().min(1),
    time: z.string().min(1),
    mealSlot: z.enum(MEAL_SLOTS),
    entryMode: z.enum(PLAN_ENTRY_MODES),
    expressNote: z.string(),
    recipes: z.array(planRecipeSchema),
    remindersEnabled: z.boolean(),
    reminders: z.array(planReminderSchema),
  })
  .superRefine((values, ctx) => {
    if (values.reminders.length > 3) {
      ctx.addIssue({
        code: "custom",
        message: "Máximo 3 recordatorios",
        path: ["reminders"],
      });
    }

    if (values.entryMode === "recipe" && values.recipes.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Añade al menos una receta",
        path: ["recipes"],
      });
    }

    if (
      values.entryMode === "express" &&
      values.expressNote.trim().length === 0
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Escribe una nota rápida",
        path: ["expressNote"],
      });
    }
  });

export type PlanMealFormValues = z.infer<typeof planMealFormSchema>;
export type PlanEntryMode = (typeof PLAN_ENTRY_MODES)[number];
export type PlanRecipeFormValue = z.infer<typeof planRecipeSchema>;
export type PlanReminderFormValue = z.infer<typeof planReminderSchema>;
