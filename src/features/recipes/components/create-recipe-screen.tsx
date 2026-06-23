"use client";

import { useState } from "react";
import { FormProvider, type FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateRecipeContent } from "@/features/recipes/components/create-recipe-content";
import { CreateRecipeHeader } from "@/features/recipes/components/create-recipe-header";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useCreateRecipeForm } from "@/features/recipes/hooks/use-create-recipe-form";
import { useCreateRecipe } from "@/features/recipes/queries/use-create-recipe";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { getFirstFieldErrorMessage } from "@/lib/form/get-first-field-error-message";

export function CreateRecipeScreen() {
  const router = useRouter();
  const form = useCreateRecipeForm();
  const photoPicker = useMealPhotoPicker();
  const createMutation = useCreateRecipe();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleInvalid = (errors: FieldErrors<CreateRecipeFormValues>) => {
    const message =
      getFirstFieldErrorMessage(errors) ?? RECIPES_COPY.create.errors.validation;
    setSaveError(message);
    toast.error(message);
  };

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);
    photoPicker.actions.clearPickError();

    try {
      await createMutation.mutateAsync({
        values,
        coverFile: photoPicker.actions.getPendingFile() ?? undefined,
      });

      router.replace("/recipes");
    } catch (error) {
      const message = getUserFacingErrorMessage(
        error,
        RECIPES_COPY.create.errors.save,
      );
      setSaveError(message);
      toast.error(message, { duration: 6000 });
    }
  }, handleInvalid);

  return (
    <FormProvider {...form}>
      <form
        className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background"
        onSubmit={handleSave}
        noValidate
      >
        <CreateRecipeHeader
          isSaving={createMutation.isPending}
        />
        {saveError ? (
          <p className="px-4 pt-3 text-center text-sm text-cta">{saveError}</p>
        ) : null}
        <CreateRecipeContent photoPicker={photoPicker} />
      </form>
    </FormProvider>
  );
}
