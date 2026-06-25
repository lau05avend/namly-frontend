export function resolveInternalReturnPath(
  value?: string | null,
): string | null {
  if (!value?.trim()) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return null;
  }

  return trimmed;
}
