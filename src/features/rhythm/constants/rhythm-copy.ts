export const RHYTHM_COPY = {
  sections: {
    thisWeek: "Esta semana",
    habits: "Tus hábitos",
    journey: "Tu recorrido",
  },
  weekly: {
    activeDays: (active: number, total: number) =>
      `${active} de ${total} días activos`,
    weekComparisonValue: (percent: number) => `+${percent}%`,
    weekComparisonLabel: "Más actividad que la semana pasada",
    averageCompletionValue: (percent: number) => `${percent}%`,
    averageCompletionLabel: "Promedio esta semana",
  },
  habits: {
    emptyTitle: "Todavía estamos conociendo tus hábitos",
    emptyDescription:
      "Registra unas comidas más y aquí verás patrones suaves sobre tu rutina.",
  },
  lifetime: {
    longestStreak: (days: number) => `Tu mejor racha: ${days} días`,
    bestWeek: (percent: number) =>
      `Tu mejor semana: ${percent}% de cumplimiento`,
    totalMeals: (count: number) => `Has registrado ${count} comidas`,
  },
  loadError: "No pudimos cargar tu ritmo. Intenta de nuevo.",
} as const;
