export type Lang = "ko" | "en";

export const SUPPORTED_LANGUAGES: { code: Lang; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
];

export const TOOLS = {
  SCRIPTOR: "SCRIPTOR",
  CHARACTER: "CHARACTER",
  EDITER: "EDITER",
} as const;

export type ToolType = typeof TOOLS[keyof typeof TOOLS];

export interface AppState {
  projectName: string;
  lang: Lang;
  activeTool: ToolType;
  setProjectName: (name: string) => void;
  setLang: (lang: Lang) => void;
  setActiveTool: (tool: ToolType) => void; // 추가
}