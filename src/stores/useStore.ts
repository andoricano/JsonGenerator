import { create } from 'zustand';
import { AppState, TOOLS } from './storeType';

export const useStore = create<AppState>((set) => ({
  projectName: "I Love yo yoU",
  lang: "ko",
  activeTool: TOOLS.SCRIPTOR,
  
  setProjectName: (name) => set({ projectName: name }),
  setLang: (lang) => set({ lang }),
  setActiveTool: (tool) => set({ activeTool: tool }),
}));