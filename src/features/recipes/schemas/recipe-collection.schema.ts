import { z } from "zod";

const colorHexPattern = /^#[0-9A-Fa-f]{6}$/;

export const recipeCollectionFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(80, "Máximo 80 caracteres"),
  colorHex: z.string().regex(colorHexPattern, "Color no válido"),
});

export type RecipeCollectionFormValues = z.infer<
  typeof recipeCollectionFormSchema
>;
