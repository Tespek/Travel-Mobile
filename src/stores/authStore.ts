import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  loadToken: async () => {
    const token = await SecureStore.getItemAsync("auth_token");
    if (token) {
      set({ token });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/login", { email, password });
      const { token, user } = response.data;
      await SecureStore.setItemAsync("auth_token", token);
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (name, email, phone, password, passwordConfirmation) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/register", {
        name,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
      });
      const { token, user } = response.data;
      await SecureStore.setItemAsync("auth_token", token);
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("auth_token");
    set({ user: null, token: null });
  },
}));
