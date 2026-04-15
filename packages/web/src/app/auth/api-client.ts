import axios from 'axios';
import type { User } from 'oidc-client-ts';

let getUser: (() => User | null | undefined) | null = null;
let triggerSignin: (() => void) | null = null;

export function configureApiClient(
  getUserFn: () => User | null | undefined,
  signinRedirectFn: () => void
) {
  getUser = getUserFn;
  triggerSignin = signinRedirectFn;
}

export const apiClient = axios.create({
  baseURL: '/api',
});

apiClient.interceptors.request.use((config) => {
  const user = getUser?.();
  if (user?.access_token) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      triggerSignin?.();
    }
    return Promise.reject(error);
  }
);

export interface Issue {
  id: number;
  title: string;
  description: string;
  longitude: number;
  latitude: number;
  address?: string;
  deadline: string;
  recruitCount?: number;
  skillRequirement?: string;
  createdBy: string;
  createdAt: string;
}

export async function fetchIssues(): Promise<Issue[]> {
  const response = await apiClient.get<Issue[]>('/issues');
  return response.data;
}

export async function fetchIssueById(id: number | string): Promise<Issue> {
  const response = await apiClient.get<Issue>(`/issues/${id}`);
  return response.data;
}
