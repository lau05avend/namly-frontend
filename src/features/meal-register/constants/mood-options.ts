import type { MoodValue } from "@/features/meal-register/schemas/register-meal.schema";

export const MOOD_OPTIONS: { value: MoodValue; emoji: string; label: string }[] =
  [
    { value: "rough", emoji: "😞", label: "Mal" },
    { value: "low", emoji: "😕", label: "Bajo" },
    { value: "okay", emoji: "🙂", label: "Bien" },
    { value: "good", emoji: "😊", label: "Bien" },
    { value: "great", emoji: "😄", label: "Genial" },
  ];
