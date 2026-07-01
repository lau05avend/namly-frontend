const DEVICE_ID_STORAGE_KEY = "namly_device_id";

function createDeviceId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") {
    return createDeviceId();
  }

  const existing = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY)?.trim();

  if (existing) {
    return existing;
  }

  const deviceId = createDeviceId();
  window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId);

  return deviceId;
}
