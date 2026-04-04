import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const STORE_ACCESS_TOKEN = 'auth.access_token';

let refreshTokenFn: (() => Promise<boolean>) | null = null;
let navigateToLoginFn: (() => void) | null = null;

export function configureApiClient(
  refreshFn: () => Promise<boolean>,
  navigateToLogin: () => void
) {
  refreshTokenFn = refreshFn;
  navigateToLoginFn = navigateToLogin;
}

export const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(STORE_ACCESS_TOKEN);
  if (!token) {
    navigateToLoginFn?.();
    return Promise.reject(new Error('No access token'));
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401 || isRefreshing) {
      return Promise.reject(error);
    }
    isRefreshing = true;
    try {
      const refreshed = await refreshTokenFn?.();
      if (!refreshed) {
        navigateToLoginFn?.();
        return Promise.reject(error);
      }
      const token = await SecureStore.getItemAsync(STORE_ACCESS_TOKEN);
      error.config.headers.Authorization = `Bearer ${token}`;
      return apiClient.request(error.config);
    } finally {
      isRefreshing = false;
    }
  }
);
