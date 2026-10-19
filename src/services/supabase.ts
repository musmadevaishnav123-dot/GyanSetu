import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from environment or fallback safely for local dev mode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const isSupabaseConfigured = () => {
  return (
    Boolean(import.meta.env.VITE_SUPABASE_URL) &&
    import.meta.env.VITE_SUPABASE_URL !== 'https://your-project.supabase.co' &&
    Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY)
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
