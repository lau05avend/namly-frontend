import { toGreetingName } from "@/features/profile/utils/resolve-user-display-name";

export const HOME_COPY = {
  greeting: (displayName?: string | null) => {
    const trimmed = displayName?.trim();
    if (!trimmed) {
      return "Qué bueno verte otra vez 🌿";
    }

    return `Qué bueno verte otra vez, ${toGreetingName(trimmed)} 🌿`;
  },
  tabs: {
    today: "Hoy",
    rhythm: "Tu ritmo",
  },
  sections: {
    streakShort: "",
    upcoming: "Lo que sigue",
    dayRecap: "Tu día hasta ahora",
    dayRecapSubtitle: (count: number) =>
      count === 1
        ? "1 comida registrada hoy"
        : `${count} comidas registradas hoy`,
    recommendation: "Recomendación del día",
  },
  nextMeal: {
    ariaLabel: (slotLabel: string) => `Próxima comida: ${slotLabel}`,
    plannedMeal: "Comida planeada",
    expressNote: "Nota rápida",
    moreRecipes: (count: number) =>
      count === 1 ? "+1 más" : `+${count} más`,
  },
  streak: {
    days: (count: number) => `${count} días`,
    personalBestDays: (count: number) => `Mejor: ${count} días`,
    personalBest: "récord personal",
    mealsProgress: (logged: number, goal: number) =>
      `${logged} de ${goal} comidas hoy`,
    mealsProgressShort: (logged: number, goal: number) =>
      `${logged} de ${goal} hoy`,
  },
  rhythmPlaceholder: "Tu ritmo llegará pronto.",
  fabLabel: "Registrar comida",
  notifications: "Notificaciones",
} as const;
