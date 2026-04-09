import { makeRedirectUri } from 'expo-auth-session';

export const OIDC_AUTHORITY = process.env.EXPO_PUBLIC_OIDC_AUTHORITY;
export const OIDC_CLIENT_ID = process.env.EXPO_PUBLIC_OIDC_CLIENT_ID;
export const OIDC_SCOPE = process.env.EXPO_PUBLIC_OIDC_SCOPE;

export const OIDC_REDIRECT_URI = makeRedirectUri({
  scheme: 'claude-example-mobile',
  path: 'auth',
});

export const OIDC_ENDPOINTS = {
  authorization: `${OIDC_AUTHORITY}/protocol/openid-connect/auth`,
  token: `${OIDC_AUTHORITY}/protocol/openid-connect/token`,
  endSession: `${OIDC_AUTHORITY}/protocol/openid-connect/logout`,
};
