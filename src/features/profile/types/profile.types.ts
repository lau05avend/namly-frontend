export type Profile = {
  displayName: string;
  avatarUrl: string;
  email: string;
};

export type BootstrapUserPayload = {
  displayName?: string;
};

export type BootstrapUserResponse = {
  id: string;
  displayName: string;
  email: string;
};

export type UpdateProfilePayload = {
  displayName: string;
  avatarUrl: string;
};
