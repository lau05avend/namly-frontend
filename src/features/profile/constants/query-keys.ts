export const profileQueryKeys = {
  all: ["profile"] as const,
  detail: () => [...profileQueryKeys.all, "detail"] as const,
  avatarDisplayUrl: (avatarRef: string) =>
    [...profileQueryKeys.all, "avatar-display-url", avatarRef] as const,
};
