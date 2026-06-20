"use client";

import { motion } from "motion/react";
import { NamlyLogo } from "@/components/brand/namly-logo";
import { BRAND_SPLASH_COPY } from "@/components/brand/brand-assets";
import { cn } from "@/lib/utils";

type NamlySplashScreenProps = {
  message?: string | null;
  className?: string;
};

export function NamlySplashScreen({
  message,
  className,
}: NamlySplashScreenProps) {
  const label =
    message === undefined ? BRAND_SPLASH_COPY.sessionLoading : message;

  return (
    <div
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-6",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,var(--color-mint)_0%,transparent_62%)] opacity-80"
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-5"
      >
        <motion.div
          animate={{ scale: [1, 1.035, 1] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <NamlyLogo size={96} priority />
        </motion.div>

        {label ? (
          <p className="text-sm font-medium tracking-wide text-foreground/45">
            {label}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
