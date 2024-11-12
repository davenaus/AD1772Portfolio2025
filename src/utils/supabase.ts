import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Add this debug function
export const debugSupabase = async () => {
  const { data, error } = await supabase
    .from('post_details')
    .select('*');
  
  console.log('Supabase Response:', { data, error });
  return { data, error };
};