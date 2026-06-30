"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MediaPreparingOverlay } from "@/components/media/media-preparing-overlay";
import { MediaSourcePicker } from "@/components/media/media-source-picker";
import { FormAlert } from "@/components/ui/form-alert";
import {
  MEAL_PHOTO_ACCEPT,
  type MealPhotoPickerActions,
  type MealPhotoPickerRefs,
  type MealPhotoPickerState,
} from "@/features/meal-register/hooks/use-meal-photo-picker";
import { getRecentMealPhotoThumbnail } from "@/features/meal-register/utils/recent-meal-photo-cache";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { ImagePlus } from "lucide-react";

type CreateRecipeCoverSectionProps = {
  refs: MealPhotoPickerRefs;
  state: MealPhotoPickerState;
  actions: MealPhotoPickerActions;
};

function CoverError({ message }: { message: string }) {
  return <FormAlert message={message} />;
}

function RecipeCoverCard({
  photoUrl,
  onPickPhoto,
  error,
  isPreparing = false,
}: {
  photoUrl?: string;
  onPickPhoto: () => void;
  error?: string | null;
  isPreparing?: boolean;
}) {
  const copy = RECIPES_COPY.create.cover;

  if (isPreparing && !photoUrl) {
    return (
      <div className="flex flex-col gap-2">
        <MediaPreparingOverlay
          variant="placeholder"
          className="h-24 w-full rounded-2xl"
        />
        {error ? <CoverError message={error} /> : null}
      </div>
    );
  }

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
        {isPreparing ? (
          <MediaPreparingOverlay
            variant="overlay"
            className="rounded-2xl"
            spinnerSize={28}
          />
        ) : null}
        {!isPreparing ? (
          <button
            type="button"
            onClick={onPickPhoto}
            className="absolute right-2.5 bottom-2.5 cursor-pointer rounded-full bg-card/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm"
          >
            {copy.change}
          </button>
        ) : null}
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
  const { previewUrl, pickError, isPreparing } = state;
  const { openGallery, openCamera, handleFileChange } = actions;
  const displayPhotoUrl = previewUrl ?? undefined;

  const galleryThumbnail = useMemo(
    () => (isSourceOpen ? getRecentMealPhotoThumbnail() : null),
    [isSourceOpen],
  );

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
        isPreparing={isPreparing}
        onPickPhoto={() => setIsSourceOpen(true)}
        error={pickError}
      />

      <MediaSourcePicker
        open={isSourceOpen}
        onOpenChange={setIsSourceOpen}
        context="recipe"
        onTakePhoto={openCamera}
        onChooseFromGallery={openGallery}
        galleryThumbnail={galleryThumbnail}
      />
    </>
  );
}
