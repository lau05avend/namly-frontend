"use client";

import { useSearchParams } from "next/navigation";
import { resolveInternalReturnPath } from "@/lib/navigation/resolve-internal-return-path";

export function useReturnToSearchParam(
  fallback?: string | null,
): string | null {
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("returnTo");

  return resolveInternalReturnPath(fromUrl ?? fallback);
}
