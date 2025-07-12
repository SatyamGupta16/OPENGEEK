import { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import { getCurrentUser, onAuthStateChange } from './supabase';
import { toast } from 'sonner';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const lastEventRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Check current auth status
    const checkUser = async () => {
      try {
        const { user: currentUser, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error getting current user:', error);
          if (mounted) setUser(null);
          return;
        }

        if (mounted) setUser(currentUser);
      } catch (error) {
        console.error('Error in checkUser:', error);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // Subscribe to auth state changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (mounted) {
        setUser(session?.user || null);
        setLoading(false);
      }

      // Only show toast if this is a new event (not just a tab focus)
      if (event !== lastEventRef.current) {
        switch (event) {
          case 'SIGNED_IN':
            toast.success('Successfully signed in!');
            break;
          case 'SIGNED_OUT':
            toast.info('Signed out');
            break;
          case 'USER_UPDATED':
            toast.success('Profile updated');
            break;
        }
        lastEventRef.current = event;
      }
    });

    // Check initial auth state
    checkUser();

    // Cleanup subscription and prevent memory leaks
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 