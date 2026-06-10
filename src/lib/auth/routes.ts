export const PUBLIC_ROUTES = ["/", "/auth/callback"] as const;

export const PROTECTED_ROUTE_PREFIXES = [
  "/home",
  "/planner",
  "/recipes",
  "/history",
  "/meals",
  "/profile",
] as const;

export function isPublicRoute(pathname: string): boolean {
  if (pathname === "/") {
    return true;
  }

  return pathname === "/auth/callback" || pathname.startsWith("/auth/callback/");
}

export function isProtectedRoute(pathname: string): boolean {
  if (isPublicRoute(pathname)) {
    return false;
  }

  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
