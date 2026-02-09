import { create } from 'zustand';
import { User, AuthResponse } from '@/types';
import apiClient from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
    const { token, ...user } = response.data;
    
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    set({ user, token: token || null, isAuthenticated: true });
    return user;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await apiClient.post<AuthResponse>('/auth/register', { name, email, password });
    const { token, ...user } = response.data;
    
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    set({ user, token: token || null, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      set({ user, token, isAuthenticated: true });
    }
  },
}));
