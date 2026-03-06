import { create } from "zustand";
import { User } from "@/types/types";

export interface AuthData {
  access_token: string;
  user: User | null;
}

interface AuthStore {
  token: AuthData | null;
  setToken: (data: AuthData) => void;
  removeToken: () => void;
}

const AUTH_STORAGE_KEY = "horsetrust_auth";

const getAuthFromStorage = (): AuthData | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AuthData;
  } catch (error) {
    console.warn("Failed to parse auth from localStorage:", error);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const authStore = create<AuthStore>()((set) => ({
  token: getAuthFromStorage(),
  setToken: (data: AuthData) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    }
    set({ token: data });
  },
  removeToken: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    set({ token: null });
  },
}));