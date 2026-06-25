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
      subtitle: "Cuando quieras, puedes empezar con la comida que más te apetezca.",
    },
    past: {
      title: "Este día está en blanco.",
      subtitle: "No pasa nada — cuando quieras, puedes empezar a planear los días por venir.",
    },
  },
  fabLabel: "Agregar al plan",
  quickNoteBadge: "Nota rápida",
  detail: {
    back: "Volver al plan",
    loadError: "No pudimos cargar esta planeación. Intenta de nuevo.",
    recipesLabel: "Recetas",
    recipeCount: (count: number) =>
      count === 1 ? "1 receta" : `${count} recetas`,
    noteLabel: "Nota",
    openRecipeAria: (title: string) => `Ver receta ${title}`,
    registeredMealLabel: "",
    registeredMealContextLabel: "Comida registrada",
    openRegisteredMealAria: "Ver comida registrada",
    status: {
      next: "Próxima comida",
      upcoming: "Programada",
      missed: "Sin completar",
      completed: "Completada",
    },
  },
} as const;
