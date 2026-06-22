"use client";

import { useRouter } from "next/navigation";
import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

type CreateRecipeHeaderProps = {
  onSave: () => void;
  isSaving?: boolean;
};

export function CreateRecipeHeader({
  onSave,
  isSaving = false,
}: CreateRecipeHeaderProps) {
  const router = useRouter();
  const copy = RECIPES_COPY.create;

  return (
    <FormScreenHeader
      title={copy.title}
      backLabel={copy.back}
      saveLabel={copy.save}
      onBack={() => router.back()}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
}
