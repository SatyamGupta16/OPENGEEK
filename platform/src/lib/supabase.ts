import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Custom auth helper functions
export const signIn = async (username: string, password: string) => {
  try {
    // Query the applications table to find the user
    const { data: users, error: queryError } = await supabase
      .from('applications')
      .select('*')
      .eq('username', username)
      .eq('hashed_password', password)
      .single();

    if (queryError) {
      return { error: queryError };
    }

    if (!users) {
      return { error: { message: 'Invalid username or password' } };
    }

    // If we found a matching user, return it
    return { data: { user: users }, error: null };
  } catch (error) {
    return { error: { message: 'An error occurred during sign in' } };
  }
};

export const signOut = async () => {
  // Since we're using custom auth, we just need to clear any local state
  return { error: null };
};

export const getCurrentUser = async () => {
  // You might want to store the user info in localStorage or a state management solution
  // For now, we'll return null to indicate no user is logged in
  return { user: null, error: null };
}; 