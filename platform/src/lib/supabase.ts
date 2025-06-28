import { createClient } from '@supabase/supabase-js';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if string is email
const isEmail = (str: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

export const signIn = async (usernameOrEmail: string, password: string) => {
  try {
    let email = usernameOrEmail;

    // If input is not an email, try to find the user's email from profiles
    if (!isEmail(usernameOrEmail)) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', usernameOrEmail)
        .single();

      if (!profile?.email) {
        return { data: null, error: { message: 'User not found' } };
      }

      email = profile.email;
    }

    // Sign in with email
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data?.user) {
      // Get the user's complete profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      return { data: { ...data, profile }, error: null };
    }

    return { data, error };
  } catch (error) {
    return { data: null, error: { message: 'An error occurred during sign in' } };
  }
};

export const signUpWithUsername = async (username: string, password: string) => {
  // First check if username already exists in metadata
  const { data: existingUsers } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .single();

  if (existingUsers) {
    return { data: null, error: { message: 'Username already taken' } };
  }

  // Convert username to our internal email format
  const email = generateEmail(username);
  
  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username, // Store username in user metadata
      },
    },
  });

  if (data?.user && !error) {
    // Create a profile record for the user
    await supabase.from('profiles').insert([
      {
        id: data.user.id,
        username: username,
        created_at: new Date().toISOString(),
      },
    ]);
  }

  return { data, error };
};

export const signOut = async () => {
  await supabase.auth.signOut();
  return { error: null };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (user) {
    // Get the user's profile with username
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    return { user: { ...user, ...profile }, error };
  }
  return { user, error };
};

// Auth state change listener
export const onAuthStateChange = (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Helper function to generate an email from username
const generateEmail = (username: string) => `${username}@users.platform.local`; 