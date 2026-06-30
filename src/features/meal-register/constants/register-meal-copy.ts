export const REGISTER_MEAL_COPY = {
  title: "Registrar comida",
  editTitle: "Editar comida",
  save: "Guardar registro",
  saveEdit: "Guardar cambios",
  back: "Volver",
  sections: {
    photo: "",
    note: "¿Algo que quieras recordar?",
    mood: "¿Cómo te hizo sentir esta comida?",
    when: "Fecha y hora",
    plan: "¿Parte de tu plan?",
    mealType: "Tipo de comida",
    context: "Organiza tu comida",
    tags: "¿Cómo la describirías?",
  },
  photo: {
    add: "Tomar foto",
    change: "Cambiar foto",
    emptyHint: "La foto es obligatoria para guardar el registro",
    takePhoto: "Tomar foto",
    chooseFromGallery: "Elegir de galería",
    cancel: "Cancelar",
    errors: {
      title: "No pudimos usar esa foto",
      tooLarge:
        "No pudimos dejarla por debajo de 5 MB. Prueba otra más cercana o elige una imagen más ligera.",
      compressFailed:
        "No pudimos comprimir la foto por debajo de 5 MB. Prueba otra más cercana.",
      prepareFailed: "No pudimos preparar la foto. Intenta con otra imagen.",
      invalidType: "Usa una imagen en JPG, PNG, WebP o GIF.",
    },
  },
  note: {
    placeholder: "Cómo te sentiste, un detalle, una nota personal…",
  },
  when: {
    dateLabel: "Fecha",
    timeLabel: "Hora",
  },
  plan: {
    suggestedLabel: "Sugerencia",
    link: "Vincular",
    seeOthers: "Buscar más",
    linkedLabel: "Vinculada",
    noMatch: "",
    searchPlan: "Buscar en tu plan",
    expressDetail: "Nota rápida",
    pickerTitle: "Elegir del plan",
    pickerDescription: "Selecciona la comida planificada que quieres vincular.",
    pickerConfirm: "Vincular comida",
    pickerEmpty: "No hay comidas planificadas para este día.",
    pickerDateLabel: "Fecha",
    pickerCurrentLabel: "Vinculación actual",
    unlinkAria: "Desvincular del plan",
    cancel: "Cancelar",
    info: {
      ariaLabel: "Información sobre vincular al plan",
      title: "Si vinculas:",
      autofillBullet: "Rellenamos tipo de comida y recetas por ti.",
      unlinkBullet:
        "Puedes desvincular cuando quieras; se restaura lo que tenías antes.",
    },
    dateReset: {
      title: "Otro día, otro contexto",
      description:
        "Si cambias la fecha, tu plan actual se desvinculará. No pasa nada: puedes volver a vincular cuando quieras.",
      confirm: "Cambiar fecha",
      cancel: "Mejor no",
    },
  },
  context: {
    collapsedEmpty: "Toca para añadir plan, tipo de comida o recetas",
    collapsedSummary: {
      noPlan: "Sin plan",
      noMealType: "Sin tipo",
      noRecipes: "Sin recetas",
      recipesSelected: (recipeCount: number) =>
        recipeCount === 1
          ? "1 receta seleccionada"
          : `${recipeCount} recetas seleccionadas`,
    },
    expandAriaLabel: "Expandir organización de tu comida",
    collapseAriaLabel: "Contraer organización de tu comida",
    info: {
      ariaLabel: "Información sobre organizar tu comida",
      body: "Complementa tu registro con tipo de comida, recetas y, si quieres, una vinculación con tu plan. Todo es opcional.",
    },
  },
  tags: {
    add: "Agregar etiquetas",
    clear: "Limpiar",
    info: {
      ariaLabel: "Qué son las etiquetas en tu registro",
      body: "Detalles opcionales para recordar mejor esta comida después.",
    },
    sheetTitle: "Clasifica esta comida",
    sheetDescription: "Elige una o varias etiquetas para describirla.",
    searchPlaceholder: "Buscar etiqueta…",
    createNew: "Nueva",
    createNamed: (name: string) => name,
    done: "Listo",
    clearAll: "Limpiar todo",
    remove: (name: string) => `Quitar etiqueta ${name}`,
    emptySearch: "No encontramos esa etiqueta",
    loading: "Cargando etiquetas…",
    loadError: "No pudimos cargar las etiquetas.",
  },
  errors: {
    load: "No pudimos abrir el registro. Intenta de nuevo.",
    save: "No pudimos guardar tu comida. Intenta de nuevo.",
    photoRequired: "Añade una foto antes de guardar.",
  },
} as const;
