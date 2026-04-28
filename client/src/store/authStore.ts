import { create } from "zustand";
import * as authService from "@/services/auth";

interface AuthState {
  user: authService.AuthUser | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  initialized: false,
  error: null,
  initialize: async () => {
    const state = get();
    if (state.loading || state.initialized) {
      return;
    }

    set({ loading: true, error: null });
    try {
      const { user } = await authService.me();
      set({ user, initialized: true, loading: false, error: null });
    } catch {
      set({ user: null, initialized: true, loading: false, error: null });
    }
  },
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user } = await authService.login({ email, password });
      set({ user, initialized: true, loading: false, error: null });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      set({ loading: false, error: message });
      return false;
    }
  },
  register: async (fullName, email, password) => {
    set({ loading: true, error: null });
    try {
      await authService.register({ fullName, email, password });
      set({ loading: false, error: null });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      set({ loading: false, error: message });
      return false;
    }
  },
  logout: async () => {
    set({ loading: true, error: null });
    try {
      await authService.logout();
    } finally {
      set({ user: null, loading: false, initialized: true });
    }
  },
  updateProfile: async (fullName) => {
    set({ loading: true, error: null });
    try {
      const { user } = await authService.updateMe({ fullName });
      set({ user, loading: false, error: null });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Profile update failed";
      set({ loading: false, error: message });
      return false;
    }
  },
}));
