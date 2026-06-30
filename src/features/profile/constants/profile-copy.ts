export const PROFILE_COPY = {
  title: "Configuración",
  editTitle: "Editar perfil",
  back: "Volver",
  sections: {
    account: "Cuenta",
    personalPreferences: "Preferencias personales",
    mealTypes: "Tipos de comida",
    appPreferences: "Preferencias de app",
  },
  editProfile: {
    title: "Editar perfil",
    subtitle: "",
  },
  signOut: {
    title: "Cerrar sesión",
    subtitle: "Salir de tu cuenta",
    confirming: "Cerrando sesión…",
  },
  allergies: {
    title: "Alergias y restricciones",
    subtitle: "Editar preferencias del onboarding",
  },
  preferences: {
    title: "Alergias y restricciones",
    statusEmpty: {
      title: "Personaliza tu experiencia",
      description:
        "Responde unas preguntas rápidas para que Namly se adapte mejor a ti.",
    },
    statusPartial: (answered: number, total: number) => {
      const remaining = total - answered;

      return {
        title: `Ya respondiste ${answered} de ${total} preguntas`,
        description:
          remaining === 1
            ? "Te falta una — puedes completarla cuando quieras."
            : "Puedes completar el resto cuando quieras.",
      };
    },
    statusComplete: {
      title: "Preferencias guardadas",
      description: "Puedes actualizar tus respuestas en cualquier momento.",
    },
    unanswered: "Sin responder",
    save: "Guardar preferencias",
    saving: "Guardando…",
    saveSuccess: "Preferencias actualizadas",
    saveClearedWarning:
      "Quitamos las respuestas que desmarcaste o borraste.",
    saveValidationError:
      "Cada pregunta editada necesita al menos una opción o un valor en «Otra opción».",
    saveError: "No pudimos guardar tus preferencias. Intenta de nuevo.",
    loadError: "No pudimos cargar tus preferencias. Intenta de nuevo.",
  },
  mealTypes: {
    title: "Tipos de comida",
    subtitle: "Crear, editar y ordenar",
  },
  units: {
    title: "Unidades de medida",
    value: "Métrico",
  },
  language: {
    title: "Idioma",
    value: "Español",
  },
  theme: {
    title: "Tema visual",
    value: "Claro",
  },
  loadError: "No pudimos cargar tu perfil. Intenta de nuevo.",
  saveError: "No pudimos guardar los cambios. Intenta de nuevo.",
  saveSuccess: "Perfil actualizado",
  avatarSection: "Foto de perfil",
  changePhoto: "Cambiar foto",
  removePhoto: "Eliminar",
  nameSection: "Nombre",
  displayNameLabel: "¿Cómo quieres aparecer en Namly?",
  displayNamePlaceholder: "Tu nombre",
  linkedAccountSection: "Cuenta vinculada",
  saveChanges: "Guardar cambios",
  saving: "Guardando…",
  uploadError: "No pudimos subir la foto. Intenta de nuevo.",
  avatarAlt: "Foto de perfil",
} as const;
