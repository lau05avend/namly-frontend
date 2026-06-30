"use client";

import { useRouter } from "next/navigation";
import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

type CreateRecipeHeaderProps = {
  isSaving?: boolean;
  title?: string;
  saveLabel?: string;
  onBack?: () => void;
};

export function CreateRecipeHeader({
  isSaving = false,
  title,
  saveLabel,
  onBack,
}: CreateRecipeHeaderProps) {
  const router = useRouter();
  const copy = RECIPES_COPY.create;

  return (
    <FormScreenHeader
      title={title ?? copy.title}
      backLabel={copy.back}
      saveLabel={saveLabel ?? copy.save}
      onBack={onBack ?? (() => router.back())}
      isSaving={isSaving}
      saveType="submit"
    />
  );
}
