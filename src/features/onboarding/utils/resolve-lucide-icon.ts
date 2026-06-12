import { Circle, icons, type LucideIcon } from "lucide-react";

function toPascalCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function isRenderableIcon(value: unknown): value is LucideIcon {
  return (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && "$$typeof" in value)
  );
}

function lookupIcon(name: string): LucideIcon | null {
  const candidates = [toPascalCase(name), name, name.charAt(0).toUpperCase() + name.slice(1)];

  for (const key of candidates) {
    const icon = icons[key as keyof typeof icons];
    if (isRenderableIcon(icon)) {
      return icon;
    }
  }

  return null;
}

export function resolveLucideIcon(iconName?: string | null): LucideIcon {
  const normalized = iconName?.trim() ?? "";
  if (!normalized) {
    return Circle;
  }

  return lookupIcon(normalized) ?? Circle;
}
