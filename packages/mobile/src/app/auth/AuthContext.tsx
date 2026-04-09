import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import {
  OIDC_CLIENT_ID,
  OIDC_ENDPOINTS,
  OIDC_REDIRECT_URI,
  OIDC_SCOPE,
} from './oidc-config';

WebBrowser.maybeCompleteAuthSession();

const STORE_ACCESS_TOKEN = 'auth.access_token';
const STORE_REFRESH_TOKEN = 'auth.refresh_token';
const STORE_ID_TOKEN = 'auth.id_token';
const STORE_EXPIRES_AT = 'auth.expires_at';

export interface AuthUser {
  sub: string;
  name?: string;
  preferred_username?: string;
  email?: string;
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
}

interface AuthContextValue extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function parseJwtPayload(token: string): Record<string, unknown> {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const discovery = AuthSession.useAutoDiscovery(
    process.env.EXPO_PUBLIC_OIDC_AUTHORITY
  );

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: OIDC_CLIENT_ID,
      scopes: OIDC_SCOPE.split(' '),
      redirectUri: OIDC_REDIRECT_URI,
      usePKCE: true,
    },
    discovery
  );

  // Task 3.1: refresh token function
  const refreshToken = useCallback(async (): Promise<boolean> => {
    const storedRefreshToken = await SecureStore.getItemAsync(
      STORE_REFRESH_TOKEN
    );
    if (!storedRefreshToken) return false;

    try {
      const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: storedRefreshToken,
        client_id: OIDC_CLIENT_ID,
        scope: OIDC_SCOPE,
      });

      // if (!result.accessToken) return false;
      const res = await fetch(OIDC_ENDPOINTS.token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) {
        throw new Error(`Token refresh failed: ${res.status}`);
      }

      const data = await res.json();
      if (!data.access_token) return false;

      const expiresAt = Date.now() + (data.expires_in ?? 300) * 1000;
      await SecureStore.setItemAsync(STORE_ACCESS_TOKEN, data.access_token);
      if (data.refresh_token) {
        await SecureStore.setItemAsync(STORE_REFRESH_TOKEN, data.refresh_token);
      }
      if (data.id_token) {
        await SecureStore.setItemAsync(STORE_ID_TOKEN, data.id_token);
      }
      await SecureStore.setItemAsync(STORE_EXPIRES_AT, String(expiresAt));

      const payload = parseJwtPayload(data.id_token ?? data.access_token);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: true,
        accessToken: data.access_token,
        user: {
          sub: payload['sub'] as string,
          name: payload['name'] as string | undefined,
          preferred_username: payload[
            'preferred_username'
          ] as string | undefined,
          email: payload['email'] as string | undefined,
        }
      }));
      scheduleRefresh(expiresAt);
      return true;
    } catch {
      await clearTokens();
      setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      });
      return false;
    }
  }, []);

  // Task 3.3: schedule proactive refresh 60s before expiry
  const scheduleRefresh = useCallback(
    (expiresAt: number) => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
      const delay = expiresAt - Date.now() - 60_000;
      if (delay > 0) {
        refreshTimerRef.current = setTimeout(() => {
          refreshToken();
        }, delay);
      }
    },
    [refreshToken]
  );

  async function clearTokens() {
    await SecureStore.deleteItemAsync(STORE_ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(STORE_REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(STORE_ID_TOKEN);
    await SecureStore.deleteItemAsync(STORE_EXPIRES_AT);
  }

  // Task 2.5 + 3.2: restore session on startup
  useEffect(() => {
    (async () => {
      const accessToken = await SecureStore.getItemAsync(STORE_ACCESS_TOKEN);
      const expiresAtStr = await SecureStore.getItemAsync(STORE_EXPIRES_AT);
      const idToken = await SecureStore.getItemAsync(STORE_ID_TOKEN);

      if (!accessToken) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const expiresAt = Number(expiresAtStr ?? 0);
      const isExpired = Date.now() >= expiresAt - 5_000;

      if (isExpired) {
        const ok = await refreshToken();
        if (!ok) setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const payload = parseJwtPayload(idToken ?? accessToken);
      setState({
        isLoading: false,
        isAuthenticated: true,
        accessToken,
        user: {
          sub: payload['sub'] as string,
          name: payload['name'] as string | undefined,
          preferred_username: payload[
            'preferred_username'
          ] as string | undefined,
          email: payload['email'] as string | undefined,
        },
      });
      scheduleRefresh(expiresAt);
    })();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, []);

  // Task 2.4: handle auth code response
  useEffect(() => {
    if (response?.type !== 'success' || !request?.codeVerifier || !discovery)
      return;

    (async () => {
      try {
        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId: OIDC_CLIENT_ID,
            redirectUri: OIDC_REDIRECT_URI,
            code: response.params['code'],
            extraParams: { code_verifier: request.codeVerifier! },
          },
          discovery
        );

        if (!tokenResult.accessToken) return;

        const expiresAt =
          Date.now() + (tokenResult.expiresIn ?? 300) * 1000;
        await SecureStore.setItemAsync(
          STORE_ACCESS_TOKEN,
          tokenResult.accessToken
        );
        if (tokenResult.refreshToken) {
          await SecureStore.setItemAsync(
            STORE_REFRESH_TOKEN,
            tokenResult.refreshToken
          );
        }
        if (tokenResult.idToken) {
          await SecureStore.setItemAsync(STORE_ID_TOKEN, tokenResult.idToken);
        }
        await SecureStore.setItemAsync(STORE_EXPIRES_AT, String(expiresAt));

        const payload = parseJwtPayload(
          tokenResult.idToken ?? tokenResult.accessToken
        );
        setState({
          isLoading: false,
          isAuthenticated: true,
          accessToken: tokenResult.accessToken,
          user: {
            sub: payload['sub'] as string,
            name: payload['name'] as string | undefined,
            preferred_username: payload[
              'preferred_username'
            ] as string | undefined,
            email: payload['email'] as string | undefined,
          },
        });
        scheduleRefresh(expiresAt);
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, [response]);

  // Task 2.3: login
  const login = useCallback(async () => {
    await promptAsync();
  }, [promptAsync]);

  // Task 2.6: logout
  const logout = useCallback(async () => {
    const idToken = await SecureStore.getItemAsync(STORE_ID_TOKEN);
    await clearTokens();
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    setState({
      isLoading: false,
      isAuthenticated: false,
      user: null,
      accessToken: null,
    });
    if (idToken && discovery?.endSessionEndpoint) {
      await WebBrowser.openAuthSessionAsync(
        `${discovery.endSessionEndpoint}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(OIDC_REDIRECT_URI)}`,
        OIDC_REDIRECT_URI
      );
    }
  }, [discovery]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
