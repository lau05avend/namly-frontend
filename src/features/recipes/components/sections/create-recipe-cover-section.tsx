"use client";

import { useLayoutEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { PhotoMealCard } from "@/components/meal-register/photo-meal-card";
import { PhotoSourceSheet } from "@/features/meal-register/components/photo-source-sheet";
import {
  MEAL_PHOTO_ACCEPT,
  type MealPhotoPickerActions,
  type MealPhotoPickerRefs,
  type MealPhotoPickerState,
} from "@/features/meal-register/hooks/use-meal-photo-picker";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { ImagePlus } from "lucide-react";

type CreateRecipeCoverSectionProps = {
  refs: MealPhotoPickerRefs;
  state: MealPhotoPickerState;
  actions: MealPhotoPickerActions;
};

function RecipeCoverCard({
  photoUrl,
  onPickPhoto,
  error,
}: {
  photoUrl?: string;
  onPickPhoto: () => void;
  error?: string | null;
}) {
  const copy = RECIPES_COPY.create.cover;

  if (!photoUrl) {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onPickPhoto}
          className="flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-foreground/15 bg-card/60 p-6"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-mint text-primary">
            <ImagePlus className="size-6" aria-hidden />
          </span>
          <span className="text-sm font-semibold text-foreground">
            {copy.add}
          </span>
          <span className="text-xs text-foreground/45">{copy.hint}</span>
        </button>
        {error ? (
          <p
            role="alert"
            className="rounded-xl border border-cta/25 bg-cta/8 px-3 py-2.5 text-xs leading-relaxed font-medium text-cta"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <PhotoMealCard
      photoUrl={photoUrl}
      onPickPhoto={onPickPhoto}
      error={error}
    />
  );
}

export function CreateRecipeCoverSection({
  refs,
  state,
  actions,
}: CreateRecipeCoverSectionProps) {
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const { setValue, watch } = useFormContext<CreateRecipeFormValues>();
  const coverUrl = watch("coverUrl");
  const { galleryInputRef, cameraInputRef } = refs;
  const { previewUrl, pickError } = state;
  const { openGallery, openCamera, handleFileChange } = actions;
  const displayPhotoUrl = previewUrl ?? coverUrl ?? undefined;

  useLayoutEffect(() => {
    if (!previewUrl || coverUrl === previewUrl) {
      return;
    }

    setValue("coverUrl", previewUrl, {
      shouldDirty: true,
    });
  }, [coverUrl, previewUrl, setValue]);

  const openPicker = () => {
    if (displayPhotoUrl) {
      setIsSourceOpen(true);
      return;
    }

    setIsSourceOpen(true);
  };

  return (
    <>
      <input
        ref={galleryInputRef}
        type="file"
        accept={MEAL_PHOTO_ACCEPT}
        className="sr-only"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept={MEAL_PHOTO_ACCEPT}
        capture="environment"
        className="sr-only"
        onChange={handleFileChange}
      />

      <RecipeCoverCard
        photoUrl={displayPhotoUrl}
        onPickPhoto={openPicker}
        error={pickError}
      />

      <PhotoSourceSheet
        open={isSourceOpen}
        onOpenChange={setIsSourceOpen}
        onTakePhoto={openCamera}
        onChooseFromGallery={openGallery}
      />
    </>
  );
}
