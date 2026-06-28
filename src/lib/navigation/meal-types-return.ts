import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { resolveInternalReturnPath } from "@/lib/navigation/resolve-internal-return-path";

export function resolveFormReturnPath(
  pathname: string,
  search = "",
): string | null {
  if (pathname.startsWith("/profile")) {
    return null;
  }

  const path = search ? `${pathname}${search}` : pathname;

  return resolveInternalReturnPath(path);
}

export function buildMealTypesManagementPath(
  returnTo?: string | null,
): string {
  const safeReturnTo = resolveInternalReturnPath(returnTo);

  if (!safeReturnTo) {
    return "/profile/meal-types";
  }

  const params = new URLSearchParams({ returnTo: safeReturnTo });

  return `/profile/meal-types?${params.toString()}`;
}

export function resolveMealTypesBackLabel(returnTo?: string | null): string {
  const safeReturnTo = resolveInternalReturnPath(returnTo);

  if (!safeReturnTo) {
    return PROFILE_COPY.back;
  }

  if (safeReturnTo.startsWith("/planner/plan")) {
    return MEAL_TYPES_COPY.management.backToPlanMeal;
  }

  if (safeReturnTo.startsWith("/meals/register")) {
    return MEAL_TYPES_COPY.management.backToRegisterMeal;
  }

  return PROFILE_COPY.back;
}
