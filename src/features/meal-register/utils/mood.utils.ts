import { MOOD_OPTIONS } from "@/features/meal-register/constants/mood-options";
import type { MoodValue } from "@/features/meal-register/schemas/register-meal.schema";

export function mapMoodToScore(mood: MoodValue): number {
  const index = MOOD_OPTIONS.findIndex((option) => option.value === mood);

  if (index === -1) {
    throw new Error(`Unknown mood: ${mood}`);
  }

  return index + 1;
}

export function mapScoreToMood(
  score: number | null | undefined,
): MoodValue | undefined {
  if (score === null || score === undefined) {
    return undefined;
  }

  if (score < 1 || score > MOOD_OPTIONS.length) {
    return undefined;
  }

  return MOOD_OPTIONS[score - 1]?.value;
}
