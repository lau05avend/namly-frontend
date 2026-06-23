"use client";

import { useLayoutEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
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

function CoverError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="rounded-xl border border-cta/25 bg-cta/8 px-3 py-2.5 text-xs leading-relaxed font-medium text-cta"
    >
      {message}
    </p>
  );
}

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
          className="flex h-24 w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-dashed border-foreground/15 bg-card/60 transition-colors hover:border-primary/20 hover:bg-mint/15"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-mint text-primary">
            <ImagePlus className="size-5" aria-hidden />
          </span>
          <span className="text-sm font-medium text-foreground/75">
            {copy.add}
          </span>
        </button>
        {error ? <CoverError message={error} /> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-28 overflow-hidden rounded-2xl bg-foreground/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoUrl} alt="" className="size-full object-cover" />
        <button
          type="button"
          onClick={onPickPhoto}
          className="absolute right-2.5 bottom-2.5 cursor-pointer rounded-full bg-card/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm"
        >
          {copy.change}
        </button>
      </div>
      {error ? <CoverError message={error} /> : null}
    </div>
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
  const displayPhotoUrl = previewUrl ?? undefined;

  useLayoutEffect(() => {
    if (!previewUrl?.startsWith("blob:") || coverUrl === previewUrl) {
      return;
    }

    setValue("coverUrl", previewUrl, {
      shouldDirty: true,
    });
  }, [coverUrl, previewUrl, setValue]);

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
        onPickPhoto={() => setIsSourceOpen(true)}
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
