export const ONBOARDING_COPY = {
  welcome: {
    eyebrow: "¡Bienvenida a Namly!",
    headline: "Aquí podrás comer saludable, consciente y delicioso.",
    supporting:
      "Antes de continuar, queremos conocerte mejor para acompañarte de la mejor manera.",
    infoCard:
      "Responde las siguientes preguntas y personalizaremos tu experiencia.",
    start: "Comenzar",
    respondLater: "Responder más tarde",
    respondLaterHint:
      "El progreso actual no se guardará, pero podrás responder estas preguntas más adelante desde tu perfil.",
  },
  wizard: {
    progress: (current: number, total: number) => `${current} de ${total}`,
    continue: "Continuar",
    finish: "Finalizar",
    respondLater: "Responder más tarde",
    respondLaterHint:
      "Ten en cuenta que el progreso actual se perderá, pero podrás responder estas preguntas cuando quieras desde tu perfil.",
    submitting: "Guardando…",
    previous: "Pregunta anterior",
    next: "Siguiente pregunta",
    customPlaceholder: "Otra opción…",
    maxSelections: (max: number) => {
      if (!Number.isFinite(max) || max <= 0) {
        return "Selecciona las opciones que apliquen";
      }

      return max === 1
        ? "Selecciona una opción"
        : `Selecciona hasta ${max} opciones`;
    },
    loadError: "No pudimos cargar las preguntas. Intenta de nuevo.",
    submitError: "No pudimos guardar tus respuestas. Intenta de nuevo.",
    empty: "No hay preguntas disponibles por ahora.",
    retry: "Reintentar",
  },
} as const;
