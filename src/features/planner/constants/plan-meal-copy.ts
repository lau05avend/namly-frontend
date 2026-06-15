export const PLAN_MEAL_COPY = {
  title: "Planear comida",
  save: "Guardar plan",
  back: "Volver",
  sections: {
    date: "Fecha y hora",
    mealType: "Tipo de comida",
    entryMode: "Tipo de entrada",
    recipes: "Recetas",
    express: "Nota rápida",
    reminders: "Recordatorios",
  },
  modes: {
    recipe: "Recetas",
    recipeHint: "Varias recetas ordenadas",
    express: "Express",
    expressHint: "Nota rápida",
  },
  recipes: {
    add: "Añadir receta",
    empty: "Aún no hay recetas en este plan.",
    moveUp: "Subir",
    moveDown: "Bajar",
    remove: "Quitar",
    titlePlaceholder: "Nombre de la receta",
    subtitlePlaceholder: "Detalle opcional",
  },
  express: {
    placeholder: "Algo rápido para la tarde…",
    hint: "Ideal cuando no necesitas recetas detalladas.",
  },
  reminders: {
    enable: "Activar recordatorios",
    add: "Añadir recordatorio",
    placeholder: "Recordatorio",
    maxReached: "Máximo 3 recordatorios",
    collapsedHint: "Recordatorios opcionales",
  },
  errors: {
    loadForm: "No pudimos preparar el formulario. Intenta de nuevo.",
    save: "No pudimos guardar tu plan. Revisa los datos e intenta de nuevo.",
  },
} as const;
