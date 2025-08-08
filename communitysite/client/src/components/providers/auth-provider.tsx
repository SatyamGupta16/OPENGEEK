'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { setAuthToken, clearAuthToken } from '@/lib/token-manager';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const updateToken = async () => {
      if (isSignedIn) {
        try {
          // Get fresh token from Clerk - let Clerk handle all expiration logic
          const token = await getToken();
          
          if (token) {
            setAuthToken(token);
          } else {
            clearAuthToken();
          }
        } catch (error) {
          console.error('Error getting token:', error);
          clearAuthToken();
        }
      } else {
        clearAuthToken();
      }
    };

    // Initial token fetch
    updateToken();

    // Listen for token refresh events from API interceptor
    const handleTokenRefresh = () => {
      updateToken();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('token-refresh-needed', handleTokenRefresh);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('token-refresh-needed', handleTokenRefresh);
      }
    };
  }, [isSignedIn, getToken]);

  return <>{children}</>;
}