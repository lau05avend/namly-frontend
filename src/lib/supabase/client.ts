import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";

function createSupabaseClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

const globalForSupabase = globalThis as typeof globalThis & {
  __namlySupabase?: SupabaseClient;
};

export const supabase =
  globalForSupabase.__namlySupabase ?? createSupabaseClient();

if (process.env.NODE_ENV !== "production") {
  globalForSupabase.__namlySupabase = supabase;
}
