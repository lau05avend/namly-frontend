const STORAGE_KEY_PREFIX = "namly.home.hasVisited:";

function getStorageKey(userId: string): string {
  return `${STORAGE_KEY_PREFIX}${userId}`;
}

export function hasVisitedHome(userId: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(getStorageKey(userId)) === "true";
}

export function markHomeVisited(userId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(getStorageKey(userId), "true");
}
