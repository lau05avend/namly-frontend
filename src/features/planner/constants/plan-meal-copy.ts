import { RECIPE_NO_DURATION_LABEL } from "@/features/recipes/utils/format-recipe-duration";

export const PLAN_MEAL_COPY = {
  title: "Planear comida",
  editTitle: "Editar planeación",
  save: "Guardar plan",
  update: "Guardar cambios",
  back: "Volver",
  sections: {
    date: "Fecha y hora",
    mealType: "Tipo de comida",
    entryMode: "¿Cómo quieres registrar esta comida?",
    recipes: "Recetas",
    menuEmpty: "Empieza tu menú",
    menuFilled: "Menú planificado",
    express: "Nota rápida",
    reminders: "Recordatorios",
  },
  modes: {
    recipe: "Con recetas",
    recipeHint: "Construye tu menú con una o varias recetas",
    express: "Nota rápida",
    expressHint: "Anota de forma rápida lo que te gustaría comer",
  },
  recipes: {
    add: "Agregar recetas",
    menuEmptyHint: "Elige una o varias recetas para esta comida.",
    empty: "Empieza armando tu menú con las recetas que más te gusten.",
    reorder: "Reordenar",
    remove: "Quitar",
    titlePlaceholder: "Nombre de la receta",
    subtitlePlaceholder: "Detalle opcional",
    pickerTitle: "Agregar recetas",
    pickerDescription: "Elige una o varias recetas para esta comida.",
    searchPlaceholder: "Buscar por nombre…",
    loading: "Cargando recetas…",
    loadError: "No pudimos cargar las recetas.",
    noResults: "Aún no hay recetas por aquí.",
    noResultsHint: "Prueba con otra búsqueda o ajusta los filtros.",
    cancel: "Cancelar",
    suggestedBadge: "Sugerida",
    publicBadge: "Pública",
    moreFilters: "Etiquetas",
    moreFiltersCount: (count: number) => `Etiquetas (${count})`,
    tagsSheetTitle: "Filtrar por etiquetas",
    tagsSheetDescription: "Elige una o varias etiquetas para afinar la búsqueda.",
    tagsSheetDone: "Listo",
    clearTags: "Limpiar",
    clearSelection: "Limpiar selección",
    removeTag: (name: string) => `Quitar etiqueta ${name}`,
    confirmSelection: (count: number) =>
      count > 0 ? `Agregar recetas (${count})` : "Agregar recetas",
    menuSummaryCount: (count: number) =>
      count === 1 ? "1 receta" : `${count} recetas`,
    menuSummaryWithDuration: (countLabel: string, duration: string) =>
      `${countLabel} · ${duration} aproximadamente`,
    menuSummaryWithPartialDuration: (countLabel: string, duration: string) =>
      `${countLabel} · ${duration} aproximadamente`,
    prepDuration: (duration: string) => `${duration} aprox.`,
    noDuration: RECIPE_NO_DURATION_LABEL,
  },
  express: {
    placeholder: "Algo rápido para la tarde…",
    hint: "Ideal cuando no necesitas recetas detalladas.",
  },
  reminders: {
    enable: "Activar recordatorios",
    add: "Agregar recordatorio",
    addAnother: "Añadir otro recordatorio",
    sheetTitle: "¿Cuándo quieres recibir el recordatorio?",
    presetAtTime: "A la hora",
    presetMinutesBefore: (minutes: number) =>
      minutes === 1 ? "1 minuto antes" : `${minutes} minutos antes`,
    presetHoursBefore: (hours: number) =>
      hours === 1 ? "1 hora antes" : `${hours} horas antes`,
    removeAriaLabel: "Quitar recordatorio",
    info: {
      ariaLabel: "Información sobre recordatorios",
      body: "Recibe un aviso antes de la hora programada para esta comida. Puedes configurar hasta 3 recordatorios.",
    },
    // customOption: "Personalizado...", — reserved for a future MVP extension
  },
  errors: {
    loadForm: "No pudimos preparar el formulario. Intenta de nuevo.",
    save: "No pudimos guardar tu plan. Revisa los datos e intenta de nuevo.",
  },
} as const;
