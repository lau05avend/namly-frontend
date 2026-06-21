export const RECIPES_COPY = {
  title: "Biblioteca",
  views: {
    recipes: "Recetas",
    collections: "Colecciones",
  },
  searchPlaceholder: "Buscar por nombre…",
  loading: "Cargando recetas…",
  loadError: "No pudimos cargar las recetas.",
  noResults: "Aún no hay recetas por aquí.",
  noResultsHint: "Prueba con otra búsqueda o ajusta los filtros.",
  collectionsLoading: "Cargando colecciones…",
  collectionsLoadError: "No pudimos cargar las colecciones.",
  collectionsEmpty: "Aún no tienes colecciones.",
  collectionsEmptyHint: "Desde desayunos rápidos hasta recetas de la abuela, crea colecciones a tu manera.",
  recipeCount: (count: number) =>
    count === 1 ? "1 receta" : `${count} recetas`,
  fab: {
    addRecipe: "Crear receta",
    addCollection: "Crear colección",
  },
  collectionDetail: {
    back: "Volver a biblioteca",
    loading: "Cargando colección…",
    loadError: "No pudimos cargar esta colección.",
    notFound: "No encontramos esta colección.",
  },
  recipeDetail: {
    back: "Volver a biblioteca",
    loading: "Cargando receta…",
    notFound: "No encontramos esta receta.",
    comingSoon: "El detalle completo estará disponible pronto.",
  },
} as const;
