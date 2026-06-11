// True when Supabase env vars are present. When absent (e.g. a content-only
// deployment), the app runs in read-only mode: lessons and the roadmap work,
// accounts and progress tracking are disabled.
export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
