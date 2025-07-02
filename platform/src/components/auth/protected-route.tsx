import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // If auth is required but user is not authenticated, redirect to login
        navigate('/login', { 
          replace: true,
          state: { from: location.pathname }
        });
      } else if (!requireAuth && user) {
        // If auth is not required (login page) but user is authenticated, redirect to home
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, navigate, requireAuth, location]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
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