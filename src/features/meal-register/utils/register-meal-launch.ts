export type PendingRegisterLaunch = {
  file: File;
  date?: string;
};

let pendingLaunch: PendingRegisterLaunch | null = null;
let cachedInitialPhoto: File | null | undefined;

export function setPendingRegisterLaunch(launch: PendingRegisterLaunch) {
  pendingLaunch = launch;
  cachedInitialPhoto = undefined;
}

export function consumePendingRegisterLaunch(): PendingRegisterLaunch | null {
  const launch = pendingLaunch;
  pendingLaunch = null;
  return launch;
}

export function resolveInitialRegisterPhoto(): File | null {
  if (cachedInitialPhoto === undefined) {
    cachedInitialPhoto = consumePendingRegisterLaunch()?.file ?? null;
  }

  return cachedInitialPhoto;
}

export function resetInitialRegisterPhotoCache() {
  cachedInitialPhoto = undefined;
}
