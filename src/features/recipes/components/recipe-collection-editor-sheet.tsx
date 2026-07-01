"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { FormFieldError } from "@/components/ui/form-field-error";
import { Input } from "@/components/ui/input";
import { RecipeCollectionColorPicker } from "@/features/recipes/components/recipe-collection-color-picker";
import { DEFAULT_RECIPE_COLLECTION_COLOR } from "@/features/recipes/constants/recipe-collection-colors";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useCreateRecipeCollection } from "@/features/recipes/queries/use-create-recipe-collection";
import { useDeleteRecipeCollection } from "@/features/recipes/queries/use-delete-recipe-collection";
import { useUpdateRecipeCollection } from "@/features/recipes/queries/use-update-recipe-collection";
import {
  recipeCollectionFormSchema,
  type RecipeCollectionFormValues,
} from "@/features/recipes/schemas/recipe-collection.schema";
import type { RecipeCollection } from "@/features/recipes/types/recipe-collection.types";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

type RecipeCollectionEditorSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  collection?: RecipeCollection;
  onCreated?: (collection: RecipeCollection) => void;
  onUpdated?: (collection: RecipeCollection) => void;
  onDeleted?: (collectionId: string) => void;
};

export function RecipeCollectionEditorSheet({
  open,
  onOpenChange,
  mode,
  collection,
  onCreated,
  onUpdated,
  onDeleted,
}: RecipeCollectionEditorSheetProps) {
  const copy = RECIPES_COPY.collections;
  const createMutation = useCreateRecipeCollection();
  const updateMutation = useUpdateRecipeCollection();
  const deleteMutation = useDeleteRecipeCollection();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecipeCollectionFormValues>({
    resolver: zodResolver(recipeCollectionFormSchema),
    defaultValues: {
      name: "",
      colorHex: DEFAULT_RECIPE_COLLECTION_COLOR,
    },
  });

  const selectedColor = watch("colorHex");

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  useEffect(() => {
    if (!open) {
      reset({
        name: "",
        colorHex: DEFAULT_RECIPE_COLLECTION_COLOR,
      });
      setDeleteError(null);
      setConfirmDelete(false);
      return;
    }

    reset({
      name: mode === "edit" && collection ? collection.name : "",
      colorHex:
        mode === "edit" && collection
          ? collection.colorHex
          : DEFAULT_RECIPE_COLLECTION_COLOR,
    });
  }, [open, mode, collection, reset]);

  const handleSave = handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        const created = await createMutation.mutateAsync(values);
        toast.success(copy.createSuccess);
        onCreated?.(created);
        onOpenChange(false);
        return;
      }

      if (mode === "edit" && collection) {
        const updated = await updateMutation.mutateAsync({
          collectionId: collection.id,
          payload: values,
        });
        toast.success(copy.updateSuccess);
        onUpdated?.(updated);
        onOpenChange(false);
      }
    } catch (error) {
      toast.error(getUserFacingErrorMessage(error, copy.saveError));
    }
  });

  const handleDelete = async () => {
    if (!collection) {
      return;
    }

    setDeleteError(null);

    try {
      await deleteMutation.mutateAsync(collection.id);
      toast.success(copy.deleteSuccess);
      onDeleted?.(collection.id);
      onOpenChange(false);
    } catch (error) {
      setDeleteError(
        getUserFacingErrorMessage(error, copy.deleteError),
      );
    }
  };

  const title = mode === "create" ? copy.createTitle : copy.editTitle;

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={confirmDelete ? copy.deleteTitle : title}
      description={confirmDelete ? copy.deleteDescription : undefined}
      compact
      footer={
        confirmDelete ? (
          <div className="flex flex-col gap-2 pb-3">
            <Button
              type="button"
              variant="cta"
              className="w-full bg-cta"
              disabled={isSaving}
              onClick={() => void handleDelete()}
            >
              {copy.deleteConfirm}
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={isSaving}
              onClick={() => setConfirmDelete(false)}
            >
              {copy.cancel}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 pb-3">
            <Button
              type="button"
              disabled={isSaving}
              onClick={() => void handleSave()}
            >
              {mode === "create" ? copy.create : copy.save}
            </Button>

            {mode === "edit" ? (
              <Button
                type="button"
                variant="ghost"
                disabled={isSaving}
                onClick={() => setConfirmDelete(true)}
                className="text-destructive hover:text-destructive"
              >
                {copy.delete}
              </Button>
            ) : null}

            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => onOpenChange(false)}
            >
              {copy.cancel}
            </Button>
          </div>
        )
      }
    >
      {confirmDelete ? (
        <div className="pb-4">
          {deleteError ? <FormFieldError message={deleteError} /> : null}
        </div>
      ) : (
        <form
          className="flex flex-col gap-4 pb-5"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSave();
          }}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/60">
              {copy.nameLabel}
            </label>
            <Input
              {...register("name")}
              autoFocus
              placeholder={copy.namePlaceholder}
              aria-invalid={Boolean(errors.name)}
              className="h-11 text-sm"
            />
            {errors.name ? (
              <FormFieldError message={errors.name.message ?? ""} />
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/60">
              {copy.colorLabel}
            </label>
            <RecipeCollectionColorPicker
              value={selectedColor}
              onChange={(colorHex) =>
                setValue("colorHex", colorHex, { shouldValidate: true })
              }
              disabled={isSaving}
            />
            {errors.colorHex ? (
              <FormFieldError message={errors.colorHex.message ?? ""} />
            ) : null}
          </div>
        </form>
      )}
    </BottomSheet>
  );
}
