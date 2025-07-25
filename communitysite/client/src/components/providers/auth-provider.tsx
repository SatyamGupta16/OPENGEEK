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
          const token = await getToken();
          console.log('Token retrieved:', token ? 'Token exists' : 'Token is null');
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
  }, [isSignedIn, getToken]);

  return <>{children}</>;
}