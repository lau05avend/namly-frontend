"use client";

import { useEffect } from "react";
import type { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { getCurrentMealTime } from "@/components/meal/meal-datetime";

export function useSyncMealTimeOnOpen<T extends FieldValues>(
  setValue: UseFormSetValue<T>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    setValue("time" as Path<T>, getCurrentMealTime() as T[Path<T>], {
      shouldDirty: false,
    });
  }, [enabled, setValue]);
}
