import type { FieldErrors } from "react-hook-form";

export function getFirstFieldErrorMessage(
  errors: FieldErrors,
): string | undefined {
  for (const value of Object.values(errors)) {
    if (!value) {
      continue;
    }

    if (
      typeof value === "object" &&
      "message" in value &&
      value.message != null
    ) {
      return String(value.message);
    }

    if (typeof value === "object") {
      const nested = getFirstFieldErrorMessage(value as FieldErrors);

      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
}
