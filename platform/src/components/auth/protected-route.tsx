import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // If auth is required but user is not authenticated, redirect to login
        navigate('/login');
      } else if (!requireAuth && user) {
        // If auth is not required (login page) but user is authenticated, redirect to home
        navigate('/');
      }
    }
  }, [user, loading, navigate, requireAuth]);

  // Show nothing while checking auth status
  if (loading) {
    return null;
  }

  // If auth check is complete, render children based on conditions
  if (requireAuth && !user) {
    return null;
  }

  if (!requireAuth && user) {
    return null;
  }

  return <>{children}</>;
} 