import { z } from "zod";

export const mealTypeNameSchema = z
  .string()
  .trim()
  .min(1, "Escribe un nombre")
  .max(48, "El nombre es demasiado largo");

export const mealTypeFormSchema = z.object({
  name: mealTypeNameSchema,
});

export type MealTypeFormValues = z.infer<typeof mealTypeFormSchema>;
