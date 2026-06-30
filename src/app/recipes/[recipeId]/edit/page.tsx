import { Suspense } from "react";
import { EditRecipePageClient } from "@/features/recipes/components/edit-recipe-page-client";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

type EditRecipePageProps = {
  params: Promise<{ recipeId: string }>;
  searchParams: Promise<{ returnTo?: string }>;
};

function EditRecipePageFallback() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg items-center justify-center px-4">
      <p className="text-sm text-foreground/50">
        {RECIPES_COPY.recipeDetail.loading}
      </p>
    </div>
  );
}

export default async function EditRecipePage({
  params,
  searchParams,
}: EditRecipePageProps) {
  const { recipeId } = await params;
  const { returnTo } = await searchParams;

  return (
    <Suspense fallback={<EditRecipePageFallback />}>
      <EditRecipePageClient recipeId={recipeId} returnTo={returnTo} />
    </Suspense>
  );
}
