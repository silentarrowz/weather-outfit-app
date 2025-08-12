import { create } from 'zustand';

interface AppState {
  themeDark: boolean;
  setThemeDark: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  themeDark: false,
  setThemeDark: (v) => set({ themeDark: v }),
}));