"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { AuthLoading } from "@/components/auth/auth-loading";
import { useAuth } from "@/hooks/use-auth";

type WelcomeGateProps = {
  children: ReactNode;
};

export function WelcomeGate({ children }: WelcomeGateProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <AuthLoading />;
  }

  if (isAuthenticated) {
    return null;
  }

  return children;
}
