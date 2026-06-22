// Supabase client.
//
// Reads your project credentials from environment variables (see .env.example).
// Until you add them, `isSupabaseConfigured` is false and the site falls back
// to the local sample content in src/content/ — so it always runs.
//
//   1. Create a free project at https://supabase.com
//   2. Copy .env.example to .env and paste your URL + anon key
//   3. Restart the dev server
//
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null
