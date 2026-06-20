import { MOOD_OPTIONS } from "@/features/meal-register/constants/mood-options";

export function resolveMoodFromScore(score: number | null): {
  emoji: string;
  label: string;
} | null {
  if (score === null || score < 1 || score > MOOD_OPTIONS.length) {
    return null;
  }

  const option = MOOD_OPTIONS[score - 1];

  if (!option) {
    return null;
  }

  return {
    emoji: option.emoji,
    label: option.label,
  };
}
