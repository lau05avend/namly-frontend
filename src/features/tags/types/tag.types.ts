export type Tag = {
  id: string;
  category: string;
  name: string;
  iconName: string | null;
};

export type CreateTagInput = {
  name: string;
  iconName: string | null;
};

export type CreateTagsPayload = {
  category: string;
  tags: CreateTagInput[];
};
