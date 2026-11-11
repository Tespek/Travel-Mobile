import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import api from "../services/api";

export interface Mitra {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  mitra?: Mitra;
  mitra_id?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string, passwordConfirmation: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
  loadToken: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  loadToken: async () => {
    const token = await SecureStore.getItemAsync("auth_token");
    if (token) {
      set({ token });
      // Ambil data user dari API agar profil tetap tampil setelah app restart
      try {
        const response = await api.get("/user");
        set({ user: response.data });
      } catch {
        // Token tidak valid, hapus
        await SecureStore.deleteItemAsync("auth_token");
        set({ token: null });
      }
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/login", { email, password });
      console.log("LOGIN RESPONSE:", JSON.stringify(response.data));
      const { token, user } = response.data;
      await SecureStore.setItemAsync("auth_token", token);
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (name, email, phone, password, passwordConfirmation, role = "customer") => {
    set({ isLoading: true });
    try {
      const response = await api.post("/register", {
        name,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });
      console.log("REGISTER RESPONSE:", JSON.stringify(response.data));
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

  // Refresh data user dari server — berguna untuk memuat relasi (mitra, dsb.)
  // yang mungkin belum ada saat login pertama kali.
  refreshUser: async () => {
    try {
      const response = await api.get("/user");
      set({ user: response.data });
    } catch {
      // Abaikan jika gagal, state tetap seperti sebelumnya
    }
  },
}));
