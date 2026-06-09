export const REGISTER_MEAL_COPY = {
  title: "Registrar comida",
  save: "Guardar registro",
  back: "Volver",
  sections: {
    photo: "Foto",
    note: "Nota",
    mood: "¿Cómo te sentiste?",
    when: "Cuándo",
    plan: "¿Parte de tu plan?",
    mealType: "Tipo de comida",
    recipes: "Recetas",
    tags: "Etiquetas",
  },
  photo: {
    add: "Tomar foto",
    change: "Cambiar foto",
    emptyHint: "Opcional — ayuda a recordar el momento",
  },
  note: {
    placeholder: "Descripción opcional…",
  },
  when: {
    edit: "Editar",
  },
  plan: {
    matchTitle: "Coincide con tu plan de hoy",
    link: "Vincular",
    seeOthers: "Ver otros planes",
    linked: "Vinculado a tu plan",
    noMatch: "Sin coincidencia automática",
    searchPlan: "Buscar en tu plan",
  },
  recipes: {
    add: "Añadir receta",
    placeholder: "Nombre de la receta",
    remove: "Quitar",
  },
  tags: {
    add: "Añadir etiqueta",
  },
} as const;
