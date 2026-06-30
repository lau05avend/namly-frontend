import { Suspense } from "react";
import { RecipeDetailScreen } from "@/features/recipes/components/recipe-detail-screen";
import { RecipeDetailSkeleton } from "@/features/recipes/components/detail/recipe-detail-skeleton";
import { RECIPE_DETAIL_CONTENT_OFFSET_CLASS } from "@/features/recipes/components/detail/recipe-detail-header";

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

function RecipeDetailPageFallback() {
  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <main
        className={`mx-auto w-full max-w-lg px-4 pb-8 ${RECIPE_DETAIL_CONTENT_OFFSET_CLASS}`}
      >
        <RecipeDetailSkeleton />
      </main>
    </div>
  );
}

export default async function RecipeDetailPage({
  params,
  searchParams,
}: RecipeDetailPageProps) {
  const { recipeId } = await params;
  const { returnTo } = await searchParams;

  return (
    <Suspense fallback={<RecipeDetailPageFallback />}>
      <RecipeDetailScreen recipeId={recipeId} returnTo={returnTo} />
    </Suspense>
  );
}
