export function resolveGoogleDisplayName(
  metadata: Record<string, unknown> | undefined,
): string {
  if (!metadata) {
    return "";
  }

  const fullName = metadata.full_name;
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    return fullName.trim();
  }

  const name = metadata.name;
  if (typeof name === "string" && name.trim().length > 0) {
    return name.trim();
  }

  return "";
}
