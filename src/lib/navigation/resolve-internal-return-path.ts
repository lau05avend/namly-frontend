function decodeReturnToParamValue(value: string): string {
  let current = value.trim();

  for (let attempt = 0; attempt < 2; attempt += 1) {
    if (!current.includes("%")) {
      break;
    }

    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) {
        break;
      }
      current = decoded;
    } catch {
      break;
    }
  }

  return current;
}

export function resolveInternalReturnPath(
  value?: string | null,
): string | null {
  if (!value?.trim()) {
    return null;
  }

  const trimmed = decodeReturnToParamValue(value);

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return null;
  }

  return trimmed;
}

export function normalizeReturnToQueryValue(value: string): string {
  return decodeReturnToParamValue(value);
}
