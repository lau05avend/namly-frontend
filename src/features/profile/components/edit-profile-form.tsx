"use client";

import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import { EditProfileAvatarSection } from "@/features/profile/components/edit-profile-avatar-section";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import type { AvatarPicker } from "@/features/profile/hooks/use-avatar-picker";
import type { ProfileFormValues } from "@/features/profile/schemas/profile.schema";

type EditProfileFormProps = {
  email: string;
  persistedAvatarUrl: string;
  avatarPicker: AvatarPicker;
  isSaving: boolean;
  saveError: string | null;
  onSubmit: () => void;
};

export function EditProfileForm({
  email,
  persistedAvatarUrl,
  avatarPicker,
  isSaving,
  saveError,
  onSubmit,
}: EditProfileFormProps) {
  const displayNameFieldId = useId();
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const displayName = watch("displayName");
  const avatarUrl = watch("avatarUrl");
  const displayAvatarUrl = avatarUrl || persistedAvatarUrl;

  const fieldError = avatarPicker.pickError ?? saveError;

  return (
    <form
      className="flex flex-col gap-8 pb-8"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input type="hidden" {...register("avatarUrl")} />

      <EditProfileAvatarSection
        displayName={displayName}
        avatarUrl={displayAvatarUrl}
        previewUrl={avatarPicker.previewUrl}
        isSaving={isSaving}
        inputRef={avatarPicker.inputRef}
        onOpenFilePicker={avatarPicker.openFilePicker}
        onFileChange={avatarPicker.handleFileChange}
        onClearSelection={avatarPicker.clearSelection}
      />

      {fieldError ? (
        <p className="text-sm text-cta" role="alert">
          {fieldError}
        </p>
      ) : null}

      <section className="flex flex-col gap-3">
        <SectionHeader title={PROFILE_COPY.nameSection} />
        <div className="flex flex-col gap-2">
          <label
            htmlFor={displayNameFieldId}
            className="text-xs font-semibold tracking-wide text-foreground/55 uppercase"
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
                aria-invalid={Boolean(errors.displayName)}
              />
            )}
          />
          {errors.displayName ? (
            <p className="text-sm text-cta" role="alert">
              {errors.displayName.message}
            </p>
          ) : null}
        </div>
      </section>

      {/* <section className="flex flex-col gap-3">
        <SectionHeader title={PROFILE_COPY.linkedAccountSection} />
        <div className="relative">
          <Input
            type="email"
            value={email}
            readOnly
            tabIndex={-1}
            aria-readonly="true"
            className="cursor-default pr-24"
          />
          <span className="pointer-events-none absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-1.5 rounded-full bg-card px-2 py-1 text-xs font-medium text-foreground/60 shadow-sm">
            <GoogleIcon className="size-3.5" />
            Google
          </span>
        </div>
      </section> */}

      <Button type="submit" disabled={isSaving} aria-busy={isSaving}>
        {isSaving ? PROFILE_COPY.saving : PROFILE_COPY.saveChanges}
      </Button>
    </form>
  );
}
