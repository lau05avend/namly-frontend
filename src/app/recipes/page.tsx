import { RecipesLibraryScreen } from "@/features/recipes/components/recipes-library-screen";
import type { RecipesLibraryView } from "@/features/recipes/types/recipes-library.types";

export const metadata = {
  title: "Recetas",
  description: "Explora tus recetas y colecciones con calma.",
};

type RecipesPageProps = {
  searchParams: Promise<{
    view?: RecipesLibraryView;
  }>;
};

function resolveView(view?: string): RecipesLibraryView {
  return view === "collections" ? "collections" : "recipes";
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;

  return <RecipesLibraryScreen initialView={resolveView(params.view)} />;
}
