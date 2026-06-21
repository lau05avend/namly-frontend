import { RecipeCollectionDetailScreen } from "@/features/recipes/components/recipe-collection-detail-screen";

export const metadata = {
  title: "Colección",
  description: "Recetas de tu colección.",
};

type RecipeCollectionPageProps = {
  params: Promise<{
    folderId: string;
  }>;
};

export default async function RecipeCollectionPage({
  params,
}: RecipeCollectionPageProps) {
  const { folderId } = await params;

  return <RecipeCollectionDetailScreen collectionId={folderId} />;
}
