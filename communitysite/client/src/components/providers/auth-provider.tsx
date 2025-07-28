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
          console.log('Getting fresh token from Clerk...');
          // Always get a fresh token from Clerk
          const token = await getToken({ skipCache: true });
          console.log('Token retrieved:', {
            hasToken: !!token,
            tokenLength: token?.length || 0,
            tokenStart: token ? token.substring(0, 20) + '...' : 'No token',
            isSignedIn
          });
          if (token) {
            setAuthToken(token);
          } else {
            console.warn('Token is null despite being signed in');
            clearAuthToken();
          }
        } catch (error) {
          console.error('Error getting token:', error);
          clearAuthToken();
        }
      } else {
        console.log('User not signed in, clearing token');
        clearAuthToken();
      }
    };

    updateToken();

    // Set up token refresh interval (refresh every 50 minutes)
    const tokenRefreshInterval = setInterval(() => {
      if (isSignedIn) {
        console.log('Refreshing token automatically...');
        updateToken();
      }
    }, 50 * 60 * 1000); // 50 minutes

    // Listen for token refresh events from API interceptor
    const handleTokenRefresh = () => {
      console.log('Token refresh requested by API interceptor');
      updateToken();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('token-refresh-needed', handleTokenRefresh);
    }

    return () => {
      clearInterval(tokenRefreshInterval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('token-refresh-needed', handleTokenRefresh);
      }
    };
  }, [isSignedIn, getToken]);

  return <>{children}</>;
}