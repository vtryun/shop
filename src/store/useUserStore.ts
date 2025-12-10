import { create } from "zustand";
import { login } from "@/api";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  image: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  isAuthenticated: () => boolean;
  login: (data: { username: string; password: string }) => Promise<void>; // 登录通常是异步的
  logout: () => void;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
}

const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  isAuthenticated: () => !!get().accessToken,

  login: async (credentials) => {
    try {
      const authResponse = await login(credentials);
      const { accessToken, refreshToken, ...user } = authResponse;
      set({ user, accessToken, refreshToken });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: () => {
    set({ user: null, accessToken: null, refreshToken: null });
  },

  setTokens: ({ accessToken, refreshToken }) => {
    set({ accessToken, refreshToken });
  },
}));

export default useAuthStore;
