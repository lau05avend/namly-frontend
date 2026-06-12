"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AuthLoading } from "@/components/auth/auth-loading";
import { clearOnboardingFlow } from "@/features/onboarding/constants/onboarding-flow-storage";
import { resolvePostAuthDestination } from "@/features/onboarding/utils/post-auth-redirect";
import { supabase } from "@/lib/supabase/client";

function redirectTo(path: string) {
  // Full navigation avoids stale Turbopack chunks after OAuth in dev.
  window.location.replace(path);
}

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const completeOAuthFlow = async () => {
      const oauthError = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (oauthError) {
        if (!isMounted) {
          return;
        }

        setMessage(
          errorDescription ?? "No se pudo completar el inicio de sesión.",
        );
        router.replace("/");
        return;
      }

      const code = searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          if (!isMounted) {
            return;
          }

          setMessage("No se pudo completar el inicio de sesión.");
          router.replace("/");
          return;
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (session) {
        try {
          clearOnboardingFlow();
          const destination = await resolvePostAuthDestination();
          redirectTo(destination);
        } catch {
          redirectTo("/home");
        }
        return;
      }

      setMessage("No se encontró una sesión activa.");
      router.replace("/");
    };

    void completeOAuthFlow();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  if (message) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-6">
        <p className="text-center text-sm text-foreground/60">{message}</p>
      </div>
    );
  }

  return <AuthLoading />;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <AuthCallbackHandler />
    </Suspense>
  );
}
