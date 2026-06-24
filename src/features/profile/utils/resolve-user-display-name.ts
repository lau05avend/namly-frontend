export function toGreetingName(displayName: string): string {
  const trimmed = displayName.trim();
  const [firstName] = trimmed.split(/\s+/);
  return firstName || trimmed;
}
