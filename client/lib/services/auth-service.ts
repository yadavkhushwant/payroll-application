import { apiClient } from '../api-client';
import { LoginRequest, LoginResponse, User } from '../types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', credentials);
  },

  async googleLogin(code: string): Promise<LoginResponse> {
    return apiClient.get<LoginResponse>(`/auth/google/callback?code=${code}`);
  },

  async checkAuth(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },

  async logout(): Promise<void> {
    await apiClient.get('/auth/logout');
  }
};
