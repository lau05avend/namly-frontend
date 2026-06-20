"use client";

import { useState } from "react";
import { NamlySplashScreen } from "@/components/brand/namly-splash-screen";
import { BRAND_SPLASH_COPY } from "@/components/brand/brand-assets";
import { cn } from "@/lib/utils";

const VARIANTS = [
  {
    id: "session",
    label: "Sesión",
    message: BRAND_SPLASH_COPY.sessionLoading,
  },
  {
    id: "oauth",
    label: "OAuth",
    message: BRAND_SPLASH_COPY.signingIn,
  },
  {
    id: "silent",
    label: "Sin texto",
    message: null,
  },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];

export function DevSplashPreview() {
  const [variantId, setVariantId] = useState<VariantId>("session");
  const variant = VARIANTS.find((item) => item.id === variantId) ?? VARIANTS[0];

  return (
    <div className="relative min-h-dvh">
      <NamlySplashScreen key={variantId} message={variant.message} />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-4 pb-safe">
        <div className="pointer-events-auto mx-auto flex max-w-lg flex-col gap-2 rounded-2xl border border-foreground/10 bg-background/95 p-3 shadow-lg backdrop-blur-sm">
          <p className="text-center text-xs font-medium text-foreground/55">
            Vista previa dev — splash in-app
          </p>
          <div className="flex gap-2">
            {VARIANTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setVariantId(item.id)}
                className={cn(
                  "flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors",
                  variantId === item.id
                    ? "bg-primary text-white"
                    : "bg-mint/50 text-foreground/70 hover:bg-mint",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
