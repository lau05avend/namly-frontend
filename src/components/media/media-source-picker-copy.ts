export type MediaSourcePickerContext = "meal" | "recipe" | "profile";

export const MEDIA_SOURCE_PICKER_COPY = {
  title: "Agrega una foto",
  cameraLabel: "Tomar una foto",
  galleryLabel: "Elegir de la galería",
  cancel: "Cancelar",
  subtitleByContext: {
    meal: "Tu próxima comida merece una foto",
    recipe: "Una buena receta también entra por los ojos",
    profile: "Elige la foto con la que te sientas tú",
  },
} as const satisfies {
  title: string;
  cameraLabel: string;
  galleryLabel: string;
  cancel: string;
  subtitleByContext: Record<MediaSourcePickerContext, string>;
};

export function getMediaSourcePickerSubtitle(
  context: MediaSourcePickerContext,
): string {
  return MEDIA_SOURCE_PICKER_COPY.subtitleByContext[context];
}
