"use client";

import { useState } from "react";
import { FormProvider, type FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateRecipeContent } from "@/features/recipes/components/create-recipe-content";
import { CreateRecipeHeader } from "@/features/recipes/components/create-recipe-header";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useCreateRecipeForm } from "@/features/recipes/hooks/use-create-recipe-form";
import { useUpdateRecipe } from "@/features/recipes/queries/use-update-recipe";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { useMealPhotoPicker } from "@/features/meal-register/hooks/use-meal-photo-picker";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { getFirstFieldErrorMessage } from "@/lib/form/get-first-field-error-message";

type EditRecipeFormProps = {
  recipeId: string;
  initialValues: CreateRecipeFormValues;
};

function EditRecipeForm({ recipeId, initialValues }: EditRecipeFormProps) {
  const router = useRouter();
  const form = useCreateRecipeForm(initialValues);
  const photoPicker = useMealPhotoPicker({
    initialRemoteMediaUrl: initialValues.coverUrl,
  });
  const updateMutation = useUpdateRecipe();
  const [saveError, setSaveError] = useState<string | null>(null);
  const copy = RECIPES_COPY.edit;
  const createCopy = RECIPES_COPY.create;

  const handleInvalid = (errors: FieldErrors<CreateRecipeFormValues>) => {
    const message =
      getFirstFieldErrorMessage(errors) ?? createCopy.errors.validation;
    setSaveError(message);
    toast.error(message);
  };

  const handleSave = form.handleSubmit(async (values) => {
    setSaveError(null);
    photoPicker.actions.clearPickError();

    try {
      await updateMutation.mutateAsync({
        recipeId,
        values,
        coverFile: photoPicker.actions.getPendingFile() ?? undefined,
        existingCoverUrl: photoPicker.actions.getExistingMediaUrl() ?? undefined,
      });

      router.replace(`/recipes/${recipeId}`);
    } catch (error) {
      const message = getUserFacingErrorMessage(
        error,
        createCopy.errors.save,
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
          title={copy.title}
          saveLabel={copy.save}
          isSaving={updateMutation.isPending}
        />
        {saveError ? (
          <p className="px-4 pt-3 text-center text-sm text-cta">{saveError}</p>
        ) : null}
        <CreateRecipeContent photoPicker={photoPicker} />
      </form>
    </FormProvider>
  );
}

type EditRecipeScreenProps = {
  recipeId: string;
  initialValues: CreateRecipeFormValues;
};

export function EditRecipeScreen({
  recipeId,
  initialValues,
}: EditRecipeScreenProps) {
  return (
    <EditRecipeForm
      key={recipeId}
      recipeId={recipeId}
      initialValues={initialValues}
    />
  );
}
