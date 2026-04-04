import { makeRedirectUri } from 'expo-auth-session';

export const OIDC_AUTHORITY = 'https://auth.developbranch.cn/realms/bsr';
export const OIDC_CLIENT_ID = 'bsr-mobile';
export const OIDC_SCOPE = 'openid profile email';

export const OIDC_REDIRECT_URI = makeRedirectUri({
  scheme: 'claude-example-mobile',
  path: 'auth',
});

export const OIDC_ENDPOINTS = {
  authorization: `${OIDC_AUTHORITY}/protocol/openid-connect/auth`,
  token: `${OIDC_AUTHORITY}/protocol/openid-connect/token`,
  endSession: `${OIDC_AUTHORITY}/protocol/openid-connect/logout`,
};
