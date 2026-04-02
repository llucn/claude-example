import { useAuth } from 'react-oidc-context';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Authentication error: {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) {
    auth.signinRedirect();
    return <div>Redirecting to login...</div>;
  }

  return <>{children}</>;
}
