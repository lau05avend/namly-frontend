export type Profile = {
  displayName: string;
  avatarUrl: string;
  email: string;
  hasCompletedOnboarding: boolean;
};

export type BootstrapUserPayload = {
  displayName?: string;
};

export type BootstrapUserResponse = {
  id: string;
  displayName: string;
  email: string;
  isNewUser: boolean;
};

export type UpdateProfilePayload = {
  displayName: string;
  avatarUrl: string;
};
