"use client";

import { useId, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MediaSourcePicker } from "@/components/media/media-source-picker";
import { FormAlert } from "@/components/ui/form-alert";
import { FormFieldError } from "@/components/ui/form-field-error";
import { Input } from "@/components/ui/input";
import { EditProfileAvatarSection } from "@/features/profile/components/edit-profile-avatar-section";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import type { AvatarPicker } from "@/features/profile/hooks/use-avatar-picker";
import type { ProfileFormValues } from "@/features/profile/schemas/profile.schema";

type EditProfileFormProps = {
  persistedAvatarUrl: string;
  avatarPicker: AvatarPicker;
  isSaving: boolean;
  saveError: string | null;
};

export function EditProfileForm({
  persistedAvatarUrl,
  avatarPicker,
  isSaving,
  saveError,
}: EditProfileFormProps) {
  const displayNameFieldId = useId();
  const [isMediaSourceOpen, setIsMediaSourceOpen] = useState(false);
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const displayName = watch("displayName");
  const avatarUrl = watch("avatarUrl");
  const displayAvatarUrl = avatarUrl || persistedAvatarUrl;

  return (
    <div className="flex w-full min-w-0 flex-col gap-10 overflow-x-hidden px-4 pb-28 pt-8">
      <input type="hidden" {...register("avatarUrl")} />

      <div className="flex flex-col items-center gap-3">
        <EditProfileAvatarSection
          displayName={displayName}
          avatarUrl={displayAvatarUrl}
          previewUrl={avatarPicker.previewUrl}
          isSaving={isSaving}
          isPreparing={avatarPicker.isPreparing}
          galleryInputRef={avatarPicker.galleryInputRef}
          cameraInputRef={avatarPicker.cameraInputRef}
          onOpenMediaPicker={() => setIsMediaSourceOpen(true)}
          onFileChange={avatarPicker.handleFileChange}
          onClearSelection={avatarPicker.clearSelection}
        />

        {avatarPicker.pickError ? (
          <FormAlert message={avatarPicker.pickError} centered className="w-full" />
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={displayNameFieldId}
          className="text-[11px] font-semibold tracking-wider text-primary uppercase"
        >
          {PROFILE_COPY.displayNameLabel}
        </label>
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={displayNameFieldId}
              type="text"
              autoComplete="name"
              placeholder={PROFILE_COPY.displayNamePlaceholder}
              aria-invalid={errors.displayName ? true : undefined}
              className="h-12 text-[15px]"
            />
          )}
        />
        {errors.displayName ? (
          <FormFieldError message={errors.displayName.message ?? ""} />
        ) : null}
      </div>

      {saveError ? <FormAlert message={saveError} centered /> : null}

      <MediaSourcePicker
        open={isMediaSourceOpen}
        onOpenChange={setIsMediaSourceOpen}
        context="profile"
        onTakePhoto={avatarPicker.openCamera}
        onChooseFromGallery={avatarPicker.openGallery}
        galleryThumbnail={avatarPicker.previewUrl}
      />
    </div>
  );
}
