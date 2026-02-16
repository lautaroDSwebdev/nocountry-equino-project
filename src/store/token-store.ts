import { create } from "zustand";

interface Tokens{
    accessToken: string
    refreshToken: string
  }
  
  interface store {
    token: Tokens;
    setToken: (token: Tokens) => void;
    removeToken: () => void;
  }
   
  const tokenStorage =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("token-login")!)
      : "";
  
  export const authStore = create<store>()((set) => ({
    token: tokenStorage,
    setToken: (token: Tokens) => set(() => ({ token })),
    removeToken() {
      window.localStorage.removeItem("token-login");
      return { token: null };
    },
  }));