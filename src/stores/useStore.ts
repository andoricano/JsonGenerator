import { create } from 'zustand';

export type Lang = "ko" | "en";

interface AppState {
  projectName: string;
  lang: Lang;
  languages: { code: Lang; label: string }[]; 

  setProjectName: (name: string) => void;
  setLang: (lang: Lang) => void;
}

export const useStore = create<AppState>((set) => ({
  projectName: "I Love yo yoU",
  lang: "ko",
  languages: [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
  ],

  setProjectName: (name) => set({ projectName: name }),
  setLang: (lang) => set({ lang }),
}));