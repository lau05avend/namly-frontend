"use client";

import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EditProfileForm } from "@/features/profile/components/edit-profile-form";
import { EditProfileHeader } from "@/features/profile/components/edit-profile-header";
import { ProfileLoading } from "@/features/profile/components/profile-loading";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { useAvatarPicker } from "@/features/profile/hooks/use-avatar-picker";
import { useProfileForm } from "@/features/profile/hooks/use-profile-form";
import { useProfile } from "@/features/profile/queries/use-profile";
import { useUpdateProfile } from "@/features/profile/queries/use-update-profile";
import { uploadAvatar } from "@/features/profile/services/avatar-storage.service";
import { useAuth } from "@/hooks/use-auth";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

export function EditProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: profile, isPending, isError, refetch } = useProfile();
  const updateMutation = useUpdateProfile();
  const avatarPicker = useAvatarPicker();
  const resetAvatarPicker = avatarPicker.reset;
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useProfileForm({
    displayName: "",
    avatarUrl: "",
  });
  const { reset, handleSubmit } = form;

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
      });
      resetAvatarPicker();
    }
  }, [profile, reset, resetAvatarPicker]);

  const handleCancel = () => {
    resetAvatarPicker();
    router.push("/profile");
  };

  const handleSave = handleSubmit(async (values) => {
    if (!user) {
      return;
    }

    setSaveError(null);
    avatarPicker.clearPickError();
    setIsSubmitting(true);

    try {
      let avatarUrl = values.avatarUrl || profile?.avatarUrl || "";
      const pendingFile = avatarPicker.getPendingFile();

      if (pendingFile) {
        avatarUrl = await uploadAvatar(pendingFile, user.id);
      }

      await updateMutation.mutateAsync({
        displayName: values.displayName.trim(),
        avatarUrl,
      });

      await queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
      await queryClient.refetchQueries({
        queryKey: profileQueryKeys.detail(),
      });

      resetAvatarPicker();
      toast.success(PROFILE_COPY.saveSuccess);
      router.push("/profile");
    } catch (error) {
      setSaveError(
        getUserFacingErrorMessage(error, PROFILE_COPY.saveError),
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  if (!user) {
    return null;
  }

  if (isPending && !profile) {
    return (
      <div className="mx-auto max-w-lg px-4 pt-safe">
        <ProfileLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-4 pt-10 text-center">
        <p className="text-sm text-foreground/60">{PROFILE_COPY.loadError}</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="cursor-pointer text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <FormProvider {...form}>
      <form
        className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSave();
        }}
        noValidate
      >
        <EditProfileHeader onCancel={handleCancel} isSaving={isSubmitting} />

        <EditProfileForm
          persistedAvatarUrl={profile.avatarUrl}
          avatarPicker={avatarPicker}
          isSaving={isSubmitting}
          saveError={saveError}
        />
      </form>
    </FormProvider>
  );
}
