/**
 * Supabase project config (auth + storage only — not the NestJS API).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const SUPABASE_AVATAR_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_AVATAR_BUCKET ?? "avatars";

export const SUPABASE_MEAL_PHOTO_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_MEAL_PHOTO_BUCKET ?? "meal-logs-photos";

export const SUPABASE_RECIPE_COVER_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_RECIPE_COVER_BUCKET ?? "recipe-covers";
