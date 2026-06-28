"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { FormFieldError } from "@/components/ui/form-field-error";
import { Input } from "@/components/ui/input";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { useCreateMealType } from "@/features/planner/queries/use-create-meal-type";
import { useDeleteMealType } from "@/features/planner/queries/use-delete-meal-type";
import { useUpdateMealType } from "@/features/planner/queries/use-update-meal-type";
import {
  mealTypeFormSchema,
  type MealTypeFormValues,
} from "@/features/planner/schemas/meal-type.schema";
import type { MealType } from "@/features/planner/types/meal-type.types";
import { getNextSortOrder } from "@/features/planner/utils/meal-type-order";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

type MealTypeEditorSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  mealType?: MealType;
  existingMealTypes?: MealType[];
  onCreated?: (mealType: MealType) => void;
  onUpdated?: (mealType: MealType) => void;
  onDeleted?: (mealTypeId: string) => void;
};

export function MealTypeEditorSheet({
  open,
  onOpenChange,
  mode,
  mealType,
  existingMealTypes = [],
  onCreated,
  onUpdated,
  onDeleted,
}: MealTypeEditorSheetProps) {
  const createMutation = useCreateMealType();
  const updateMutation = useUpdateMealType();
  const deleteMutation = useDeleteMealType();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MealTypeFormValues>({
    resolver: zodResolver(mealTypeFormSchema),
    defaultValues: { name: "" },
  });

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  useEffect(() => {
    if (!open) {
      reset({ name: "" });
      setDeleteError(null);
      return;
    }

    reset({ name: mode === "edit" && mealType ? mealType.name : "" });
  }, [open, mode, mealType, reset]);

  const handleSave = handleSubmit(async (values) => {
    try {
      if (mode === "create") {
        const created = await createMutation.mutateAsync({
          name: values.name,
          sortOrder: getNextSortOrder(existingMealTypes),
        });

        toast.success(MEAL_TYPES_COPY.createSuccess);
        onCreated?.(created);
        onOpenChange(false);
        return;
      }

      if (mode === "edit" && mealType) {
        const updated = await updateMutation.mutateAsync({
          mealTypeId: mealType.id,
          payload: {
            name: values.name,
            sortOrder: mealType.sortOrder,
          },
        });

        toast.success(MEAL_TYPES_COPY.updateSuccess);
        onUpdated?.(updated);
        onOpenChange(false);
      }
    } catch (error) {
      toast.error(
        getUserFacingErrorMessage(error, MEAL_TYPES_COPY.saveError),
      );
    }
  });

  const handleDelete = async () => {
    if (!mealType) {
      return;
    }

    setDeleteError(null);

    try {
      await deleteMutation.mutateAsync(mealType.id);
      toast.success(MEAL_TYPES_COPY.management.deleteSuccess);
      onDeleted?.(mealType.id);
      onOpenChange(false);
    } catch (error) {
      setDeleteError(
        getUserFacingErrorMessage(error, MEAL_TYPES_COPY.management.deleteError),
      );
    }
  };

  const title =
    mode === "create"
      ? MEAL_TYPES_COPY.management.createTitle
      : MEAL_TYPES_COPY.management.editTitle;

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      compact
      footer={
        <div className="flex flex-col gap-2 pb-3">
          <Button
            type="button"
            disabled={isSaving}
            onClick={() => void handleSave()}
          >
            {mode === "create" ? MEAL_TYPES_COPY.create : MEAL_TYPES_COPY.save}
          </Button>

          {mode === "edit" ? (
            <Button
              type="button"
              variant="ghost"
              disabled={isSaving}
              onClick={() => void handleDelete()}
              className="text-destructive hover:text-destructive"
            >
              {MEAL_TYPES_COPY.management.delete}
            </Button>
          ) : null}

          <Button
            type="button"
            variant="outline"
            disabled={isSaving}
            onClick={() => onOpenChange(false)}
          >
            {MEAL_TYPES_COPY.cancel}
          </Button>
        </div>
      }
    >
      <form
        className="flex flex-col gap-2 pb-5"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
      >
        <label className="text-sm font-medium text-foreground/60">
          {MEAL_TYPES_COPY.nameLabel}
        </label>
        <Input
          {...register("name")}
          autoFocus
          placeholder={MEAL_TYPES_COPY.namePlaceholder}
          aria-invalid={Boolean(errors.name)}
          className="h-11 text-sm"
        />
        {errors.name ? (
          <FormFieldError message={errors.name.message ?? ""} />
        ) : null}
        {deleteError ? <FormFieldError message={deleteError} /> : null}
      </form>
    </BottomSheet>
  );
}
