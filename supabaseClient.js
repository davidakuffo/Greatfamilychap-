import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_KEY.\nPlease set them in your .env file or Vite environment configuration.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
