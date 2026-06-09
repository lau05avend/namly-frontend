import { z } from "zod";
import { MEAL_SLOTS } from "@/constants/meal-slots";

export const MOOD_VALUES = [
  "rough",
  "low",
  "okay",
  "good",
  "great",
] as const;

export const PLAN_LINK_STATUSES = [
  "none",
  "suggested",
  "linked",
  "dismissed",
] as const;

export const registerRecipeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Nombre requerido"),
});

export const registerMealFormSchema = z
  .object({
    photoUrl: z.string().optional(),
    note: z.string(),
    mood: z.enum(MOOD_VALUES).optional(),
    date: z.string().min(1),
    time: z.string().min(1),
    mealSlot: z.enum(MEAL_SLOTS),
    planLinkStatus: z.enum(PLAN_LINK_STATUSES),
    linkedPlanId: z.string().optional(),
    recipes: z.array(registerRecipeSchema),
    tags: z.array(z.string()),
  })
  .superRefine((values, ctx) => {
    const hasContent =
      values.note.trim().length > 0 ||
      values.recipes.length > 0 ||
      Boolean(values.photoUrl);

    if (!hasContent) {
      ctx.addIssue({
        code: "custom",
        message: "Añade una nota, receta o foto",
        path: ["note"],
      });
    }
  });

export type RegisterMealFormValues = z.infer<typeof registerMealFormSchema>;
export type MoodValue = (typeof MOOD_VALUES)[number];
export type PlanLinkStatus = (typeof PLAN_LINK_STATUSES)[number];
export type RegisterRecipeFormValue = z.infer<typeof registerRecipeSchema>;
