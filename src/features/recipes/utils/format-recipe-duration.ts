import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

const MINUTES_LABEL = RECIPES_COPY.create.steps.durationLabel;

export const RECIPE_NO_DURATION_LABEL = "Sin duración configurada";

export function formatRecipeDuration(
  minutes: number | null | undefined,
): string | null {
  if (minutes == null || minutes <= 0) {
    return null;
  }

  if (minutes < 60) {
    return `${minutes} ${MINUTES_LABEL}`;
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (rest === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${rest} ${MINUTES_LABEL}`;
}

export function formatRecipeDurationAriaLabel(
  minutes: number | null | undefined,
): string | null {
  if (minutes == null || minutes <= 0) {
    return null;
  }

  if (minutes < 60) {
    return minutes === 1 ? "1 minuto" : `${minutes} minutos`;
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  const hoursLabel = hours === 1 ? "1 hora" : `${hours} horas`;

  if (rest === 0) {
    return hoursLabel;
  }

  const restLabel = rest === 1 ? "1 minuto" : `${rest} minutos`;
  return `${hoursLabel} ${restLabel}`;
}
