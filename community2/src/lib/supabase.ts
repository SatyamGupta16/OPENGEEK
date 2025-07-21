import { createClient } from '@supabase/supabase-js';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

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
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('username', usernameOrEmail)
        .single();

      if (profileError || !profile?.email) {
        console.error('Error finding user by username:', profileError);
        return { data: null, error: { message: 'User not found' } };
      }

      email = profile.email;
    }

    console.log('Attempting sign in for email:', email);

    // Sign in with email
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }

    if (data?.user) {
      // Get the user's complete profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile after sign in:', profileError);
      }

      return { data: { ...data, profile }, error: null };
    }

    return { data, error };
  } catch (error) {
    console.error('Unexpected error during sign in:', error);
    return { data: null, error: { message: 'An error occurred during sign in' } };
  }
};

export const signUpWithUsername = async (username: string, password: string) => {
  try {
    console.log('Starting signup process for username:', username);

  // First check if username already exists in metadata
    const { data: existingUsers, error: checkError } = await supabase
      .from('user_profiles')
    .select('username')
    .eq('username', username)
    .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing username:', checkError);
      return { data: null, error: checkError };
    }

  if (existingUsers) {
      console.log('Username already exists:', username);
    return { data: null, error: { message: 'Username already taken' } };
  }

  // Convert username to our internal email format
  const email = generateEmail(username);
    
    console.log('Creating auth user with email:', email);
  
  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
          username: username,
          full_name: '',
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`,
      },
    },
  });

    if (error) {
      console.error('Error during signup:', error);
      return { data: null, error };
    }

    console.log('User created successfully:', data);

    // The profile will be created automatically by the database trigger
    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error during signup:', error);
    return { data: null, error: { message: 'An error occurred during sign up' } };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during sign out:', error);
      return { error };
    }
  return { error: null };
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return { error: { message: 'An error occurred during sign out' } };
  }
};

export const getCurrentUser = async () => {
  try {
    console.log('Getting current user...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('Error getting auth user:', authError);
      return { user: null, error: authError };
    }

  if (user) {
      console.log('Found auth user:', user);
    // Get the user's profile with username
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
      }

      return { user: { ...user, ...profile }, error: null };
  }

    return { user: null, error: null };
  } catch (error) {
    console.error('Unexpected error in getCurrentUser:', error);
    return { user: null, error: { message: 'An error occurred while getting current user' } };
  }
};

// Auth state change listener
export const onAuthStateChange = (callback: (event: AuthChangeEvent, session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Helper function to generate an email from username
const generateEmail = (username: string) => `${username}@users.platform.local`; 