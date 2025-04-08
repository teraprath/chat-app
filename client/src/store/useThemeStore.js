import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("my-chat-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("my-chat-theme", theme)
    set({ theme })
  }
}));
