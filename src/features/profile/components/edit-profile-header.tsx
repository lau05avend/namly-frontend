"use client";

import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";

type EditProfileHeaderProps = {
  onCancel: () => void;
  title?: string;
  subtitle?: string;
  isSaving?: boolean;
  withSave?: boolean;
};

export function EditProfileHeader({
  onCancel,
  title = PROFILE_COPY.editTitle,
  subtitle,
  isSaving = false,
  withSave = true,
}: EditProfileHeaderProps) {
  const resolvedSubtitle =
    subtitle ?? (withSave ? PROFILE_COPY.editProfile.subtitle : undefined);

  return (
    <FormScreenHeader
      className="pt-safe"
      title={title}
      subtitle={resolvedSubtitle}
      backLabel={PROFILE_COPY.back}
      saveLabel={PROFILE_COPY.saveChanges}
      onBack={onCancel}
      isSaving={isSaving}
      saveType="submit"
      hideSave={!withSave}
    />
  );
}
