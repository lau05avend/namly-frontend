import {
  normalizeReturnToQueryValue,
  resolveInternalReturnPath,
} from "@/lib/navigation/resolve-internal-return-path";

/**
 * Builds a router-safe href from a decoded internal path. Values like
 * `/recipes/id?returnTo=/planner/1?date=…&returnTo=/home` break if passed
 * directly to router.replace because the nested `?` is parsed as query syntax.
 */
export function toAppNavigationHref(path?: string | null): string | null {
  const resolved = resolveInternalReturnPath(path);
  if (!resolved) {
    return null;
  }

  const queryIndex = resolved.indexOf("?");
  if (queryIndex === -1) {
    return resolved;
  }

  const pathname = resolved.slice(0, queryIndex);
  const queryPart = resolved.slice(queryIndex + 1);

  if (pathname.startsWith("/recipes/") && queryPart.startsWith("returnTo=")) {
    const returnToValue = normalizeReturnToQueryValue(
      queryPart.slice("returnTo=".length),
    );
    const params = new URLSearchParams();
    params.set("returnTo", returnToValue);
    return `${pathname}?${params.toString()}`;
  }

  const returnToSeparator = "&returnTo=";
  const returnToIndex = queryPart.indexOf(returnToSeparator);
  if (returnToIndex !== -1) {
    const beforeReturnTo = queryPart.slice(0, returnToIndex);
    const returnToValue = normalizeReturnToQueryValue(
      queryPart.slice(returnToIndex + returnToSeparator.length),
    );
    const params = new URLSearchParams(beforeReturnTo);
    params.set("returnTo", returnToValue);
    return `${pathname}?${params.toString()}`;
  }

  if (queryPart.startsWith("returnTo=")) {
    const returnToValue = normalizeReturnToQueryValue(
      queryPart.slice("returnTo=".length),
    );
    const params = new URLSearchParams();
    params.set("returnTo", returnToValue);
    return `${pathname}?${params.toString()}`;
  }

  const params = new URLSearchParams(queryPart);
  return `${pathname}?${params.toString()}`;
}

type AppRouter = {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
};

export function navigateToInternalPath(
  router: AppRouter,
  path: string | null | undefined,
  method: "push" | "replace" = "replace",
): void {
  const href = toAppNavigationHref(path);
  if (!href) {
    router.back();
    return;
  }

  router[method](href);
}
