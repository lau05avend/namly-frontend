export function formatPlannedTimeLabel(plannedTime: string): string {
  const [hours, minutes] = plannedTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("es", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatCountdownLabel(
  entryDate: string,
  plannedTime: string,
): string {
  const [year, month, day] = entryDate.split("-").map(Number);
  const [hours, minutes] = plannedTime.split(":").map(Number);
  const planned = new Date(year, month - 1, day, hours, minutes);
  const diffMs = planned.getTime() - Date.now();

  if (diffMs <= 0) {
    return "";
  }

  const diffMin = Math.round(diffMs / 60_000);

  if (diffMin < 60) {
    return `En ${diffMin} min`;
  }

  const diffHours = Math.floor(diffMin / 60);
  const remainingMinutes = diffMin % 60;

  if (remainingMinutes === 0) {
    return `En ${diffHours} h`;
  }

  return `En ${diffHours} h ${remainingMinutes} min`;
}

export function formatLoggedAtTimeLabel(loggedAt: string): string {
  return new Date(loggedAt).toLocaleTimeString("es", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
