"use client";

import { useRouter } from "next/navigation";
import { FormScreenHeader } from "@/components/navigation/form-screen-header";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

type CreateRecipeHeaderProps = {
  isSaving?: boolean;
};

export function CreateRecipeHeader({
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
      isSaving={isSaving}
      saveType="submit"
    />
  );
}
