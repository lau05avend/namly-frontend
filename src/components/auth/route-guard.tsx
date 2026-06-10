"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { AuthLoading } from "@/components/auth/auth-loading";
import { useAuth } from "@/hooks/use-auth";
import { isProtectedRoute } from "@/lib/auth/routes";

type RouteGuardProps = {
  children: ReactNode;
};

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading || !isProtectedRoute(pathname)) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading) {
    return <AuthLoading />;
  }

  if (!isAuthenticated && isProtectedRoute(pathname)) {
    return null;
  }

  return children;
}
