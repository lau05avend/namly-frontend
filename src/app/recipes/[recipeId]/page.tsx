import { RecipeDetailScreen } from "@/features/recipes/components/recipe-detail-screen";

export const metadata = {
  title: "Receta",
  description: "Detalle de receta.",
};

type RecipeDetailPageProps = {
  params: Promise<{
    recipeId: string;
  }>;
};

export default async function RecipeDetailPage({
  params,
}: RecipeDetailPageProps) {
  const { recipeId } = await params;

  return <RecipeDetailScreen recipeId={recipeId} />;
}
