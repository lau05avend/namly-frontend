import { z } from "zod";

export const createRecipeTagSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  iconName: z.string().nullable(),
  isPending: z.boolean().optional(),
});

export const createRecipeIngredientSchema = z.object({
  fieldKey: z.string(),
  name: z.string().min(1, "Escribe el nombre del ingrediente"),
  quantity: z.number().positive("La cantidad debe ser mayor a 0"),
  unitId: z.string().min(1, "Selecciona una unidad"),
});

export const createRecipeStepSchema = z.object({
  fieldKey: z.string(),
  description: z.string().min(1, "Describe el paso"),
  durationMinutes: z.number().int().min(0).nullable().optional(),
});

export const createRecipeFormSchema = z
  .object({
    title: z.string().trim().min(1, "Escribe un título"),
    description: z.string(),
    coverUrl: z.string().nullable().optional(),
    isPublic: z.boolean(),
    ingredients: z.array(createRecipeIngredientSchema),
    steps: z.array(createRecipeStepSchema),
    tags: z.array(createRecipeTagSchema),
  })
  .superRefine((values, ctx) => {
    if (values.ingredients.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Agrega al menos un ingrediente",
        path: ["ingredients"],
      });
    }

    if (values.steps.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Agrega al menos un paso",
        path: ["steps"],
      });
    }
  });

export type CreateRecipeFormValues = z.infer<typeof createRecipeFormSchema>;
export type CreateRecipeTagFormValue = z.infer<typeof createRecipeTagSchema>;
export type CreateRecipeIngredientFormValue = z.infer<
  typeof createRecipeIngredientSchema
>;
export type CreateRecipeStepFormValue = z.infer<typeof createRecipeStepSchema>;

export const CREATE_RECIPE_DEFAULTS: CreateRecipeFormValues = {
  title: "",
  description: "",
  coverUrl: null,
  isPublic: true,
  ingredients: [],
  steps: [],
  tags: [],
};
