"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  profileFormSchema,
  type ProfileFormValues,
} from "@/features/profile/schemas/profile.schema";

export function useProfileForm(defaultValues: ProfileFormValues) {
  return useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onSubmit",
  });
}
