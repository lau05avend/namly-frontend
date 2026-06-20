import { z } from "zod";

export const MOOD_VALUES = ["rough", "low", "okay", "good", "great"] as const;

export const PLAN_LINK_STATUSES = [
  "none",
  "suggested",
  "linked",
  "dismissed",
] as const;

export const registerRecipeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Añade un nombre de receta"),
  coverUrl: z.string().nullable().optional(),
});

export const registerTagFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  iconName: z.string().nullable(),
  isPending: z.boolean().optional(),
});

export const registerMealFormSchema = z.object({
  photoUrl: z.string().min(1, "Añade una foto de tu comida"),
  note: z.string(),
  mood: z.enum(MOOD_VALUES).optional(),
  date: z.string().min(1),
  time: z.string().min(1),
  mealTypeId: z.string().uuid("Selecciona un tipo de comida"),
  planLinkStatus: z.enum(PLAN_LINK_STATUSES),
  linkedPlanId: z.string().optional(),
  recipes: z.array(registerRecipeSchema),
  tags: z.array(registerTagFormSchema),
});

export type RegisterMealFormValues = z.infer<typeof registerMealFormSchema>;
export type MoodValue = (typeof MOOD_VALUES)[number];
export type PlanLinkStatus = (typeof PLAN_LINK_STATUSES)[number];
export type RegisterRecipeFormValue = z.infer<typeof registerRecipeSchema>;
export type RegisterTagFormValue = z.infer<typeof registerTagFormSchema>;
