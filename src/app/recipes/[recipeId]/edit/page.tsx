import { EditRecipePageClient } from "@/features/recipes/components/edit-recipe-page-client";

type EditRecipePageProps = {
  params: Promise<{ recipeId: string }>;
};

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { recipeId } = await params;

  return <EditRecipePageClient recipeId={recipeId} />;
}
