import { z } from "zod";

export const profileFormSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Escribe tu nombre")
    .max(80, "El nombre es demasiado largo"),
  avatarUrl: z.string(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
