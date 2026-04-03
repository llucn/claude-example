import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { configureApiClient } from './api-client';

export function useConfigureApiClient() {
  const auth = useAuth();

  useEffect(() => {
    configureApiClient(
      () => auth.user,
      () => auth.signinRedirect()
    );
  }, [auth]);
}
