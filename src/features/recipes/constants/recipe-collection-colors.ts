export const RECIPE_COLLECTION_COLOR_PRESETS = [
  { label: "Verde Palma", value: "#2D9E64" },
  { label: "Menta", value: "#32A873" },
  { label: "Mamey", value: "#F28D52" },
  { label: "Polen", value: "#FFD166" },
  { label: "Coral", value: "#F28482" },
  { label: "Lavanda", value: "#9B8AFB" },
] as const;

export const DEFAULT_RECIPE_COLLECTION_COLOR =
  RECIPE_COLLECTION_COLOR_PRESETS[0].value;
