import { create } from 'zustand';
import { Lang } from './storeType';

interface AppState {
  projectName: string;
  lang: Lang;
  setProjectName: (name: string) => void;
  setLang: (lang: Lang) => void;
}

export const useStore = create<AppState>((set) => ({
  projectName: "I Love yo yoU",
  lang: "ko",
  setProjectName: (name) => set({ projectName: name }),
  setLang: (lang) => set({ lang }),
}));