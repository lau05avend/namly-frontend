export const HOME_COPY = {
  tabs: {
    today: "Hoy",
    rhythm: "Tu ritmo",
  },
  sections: {
    nextMeal: "Próxima comida",
    upcoming: "Lo que sigue",
    registered: "Registrados hoy",
    recommendation: "Recomendación del día",
  },
  streak: {
    personalBest: "récord personal",
    mealsProgress: (logged: number, goal: number) =>
      `${logged} de ${goal} comidas hoy`,
  },
  rhythmPlaceholder: "Tu ritmo llegará pronto.",
  fabLabel: "Registrar comida",
  notifications: "Notificaciones",
} as const;
