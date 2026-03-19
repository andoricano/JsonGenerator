import { create } from 'zustand';

interface AppState {
  projectName: string;
  
  setProjectName: (name: string) => void;
}

export const useStore = create<AppState>((set) => ({
  projectName: "I Love yo yoU",

  setProjectName: (name) => set({ projectName: name }),
}));