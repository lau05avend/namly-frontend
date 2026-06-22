"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateRecipeContent } from "@/features/recipes/components/create-recipe-content";
import { CreateRecipeHeader } from "@/features/recipes/components/create-recipe-header";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useCreateRecipeForm } from "@/features/recipes/hooks/use-create-recipe-form";
import { useCreateRecipe } from "@/features/recipes/queries/use-create-recipe";
import { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";

export function CreateRecipeScreen() {
  const router = useRouter();
  const form = useCreateRecipeForm();
  const photoPicker = useMealPhotoPicker();
  const createMutation = useCreateRecipe();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);
    photoPicker.actions.clearPickError();

    try {
      const response = await createMutation.mutateAsync({
        values,
        coverFile: photoPicker.actions.getPendingFile() ?? undefined,
      });

      router.replace(`/recipes/${response.id}`);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : RECIPES_COPY.create.errors.save;
      setSaveError(message);
      toast.error(message, { duration: 6000 });
    }
  });

  return (
    <FormProvider {...form}>
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background">
        <CreateRecipeHeader
          onSave={handleSave}
          isSaving={createMutation.isPending}
        />
        {saveError ? (
          <p className="px-4 pt-3 text-center text-sm text-cta">{saveError}</p>
        ) : null}
        <CreateRecipeContent photoPicker={photoPicker} />
      </div>
    </FormProvider>
  );
}
