import { RecipeDetailScreen } from "@/features/recipes/components/recipe-detail-screen";

export const metadata = {
  title: "Receta",
  description: "Detalle de receta.",
};

type RecipeDetailPageProps = {
  params: Promise<{
    recipeId: string;
  }>;
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export default async function RecipeDetailPage({
  params,
  searchParams,
}: RecipeDetailPageProps) {
  const { recipeId } = await params;
  const { returnTo } = await searchParams;

  return <RecipeDetailScreen recipeId={recipeId} returnTo={returnTo} />;
}
