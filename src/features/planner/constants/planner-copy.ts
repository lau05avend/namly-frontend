export const PLANNER_COPY = {
  sections: {
    nextMeal: "Próxima comida",
    upcoming: "Lo que sigue",
    incomplete: {
      title: "Sin completar",
    },
    completed: {
      title: "Completadas",
      subtitle: (count: number) =>
        count === 1
          ? "Registraste 1 comida este día."
          : `Registraste ${count} comidas este día.`,
    },
  },
  emptyDay: {
    today: {
      title: "Aún no hay comidas planeadas para hoy.",
      subtitle: "Comienza planeando tu próxima comida.",
    },
    future: {
      title: "Este día aún está en blanco.",
      subtitle: "Comienza planeando una comida para este día.",
    },
    past: {
      title: "Sin comidas planeadas",
      subtitle: "Todavía tienes muchos días por planear.",
    },
  },
  fabLabel: "Agregar al plan",
  quickNoteBadge: "Nota rápida",
} as const;
