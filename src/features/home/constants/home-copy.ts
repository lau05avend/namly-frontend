import { toGreetingName } from "@/features/profile/utils/resolve-user-display-name";

type HomeGreetingOptions = {
  displayName?: string | null;
  isReturningUser?: boolean;
};

export const HOME_COPY = {
  greeting: ({ displayName, isReturningUser = true }: HomeGreetingOptions = {}) => {
    const trimmed = displayName?.trim();
    const lead = isReturningUser
      ? "Un buen momento para empezar"
      : "Un buen momento para empezar";

    if (!trimmed) {
      return `${lead} 🌿`;
    }

    return `${lead}, ${toGreetingName(trimmed)} 🌿`;
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
    recommendationOpenAria: (title: string) => `Ver receta recomendada: ${title}`,
    upcomingEmptyTitle: "Tu menú del día aún está por descubrirse",
    upcomingEmptyHint:
      "Empieza planeando tus siguientes comidas cuando quieras",
  },
  nextMeal: {
    label: "Próxima comida",
    ariaLabel: (slotLabel: string) => `Próxima comida: ${slotLabel}`,
    emptyDayAriaLabel: "Próxima comida",
    emptyDay: "Un buen lugar para empezar",
    emptyDayHint: "Te invitamos a registrar tu primera comida del día",
    plannedMeal: "Comida planeada",
    expressNote: "Nota rápida",
    moreRecipes: (count: number) =>
      count === 1 ? "+1 receta más" : `+${count} recetas más`,
    andMoreRecipes: (count: number) =>
      count === 1 ? "y 1 receta más" : `y ${count} recetas más`,
    emptyRecipes: "Empieza a planear esta comida.",
  },
  streak: {
    days: (count: number) => {
      // if (count === 0) {
      //   return "Tu racha empieza aquí";
      // }

      if (count === 1) {
        return "1 día";
      }

      return `${count} días`;
    },
    personalBestDays: (count: number) => `Mejor: ${count} días`,
    personalBest: "récord personal",
    mealsProgress: (logged: number, goal: number) =>
      `${logged} de ${goal} comidas hoy`,
    mealsProgressShort: (logged: number, goal: number) => {
      if (logged === 0 && goal === 0) {
        return "Tu día apenas comienza";
      }
      const goalLabel = goal === 1 ? "comida" : "comidas";
      return `Llevas ${logged} de ${goal} ${goalLabel} hoy`;
    },
  },
  rhythmPlaceholder: "Tu ritmo llegará pronto.",
  fabLabel: "Registrar comida",
  notifications: "Notificaciones",
} as const;
